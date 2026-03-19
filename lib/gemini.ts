import Groq from 'groq-sdk'
import { unstable_cache } from 'next/cache'

function extractArticleText(html: string): string {
  // 1. Remove noise blocks entirely before extracting text
  let cleaned = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<nav[\s\S]*?<\/nav>/gi, '')
    .replace(/<header[\s\S]*?<\/header>/gi, '')
    .replace(/<footer[\s\S]*?<\/footer>/gi, '')
    .replace(/<aside[\s\S]*?<\/aside>/gi, '')

  // 2. Try to isolate the main article body
  const articleMatch =
    cleaned.match(/<article[\s\S]*?<\/article>/i) ??
    cleaned.match(/<main[\s\S]*?<\/main>/i)

  if (articleMatch) {
    cleaned = articleMatch[0]
  } else {
    // Fallback: extract only paragraph text
    const paragraphs = [...cleaned.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    if (paragraphs.length > 2) {
      cleaned = paragraphs.map((m) => m[1]).join(' ')
    }
  }

  // 3. Strip remaining tags and decode entities
  return cleaned
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

function parseAIResponse(text: string): { title: string; summary: string } {
  const jsonMatch = text.match(/\{[\s\S]*"title"[\s\S]*"summary"[\s\S]*\}/)
  if (!jsonMatch) throw new Error('No valid JSON in AI response')

  const parsed = JSON.parse(jsonMatch[0])

  if (typeof parsed.title !== 'string' || typeof parsed.summary !== 'string') {
    throw new Error('Invalid AI response shape')
  }

  const title = parsed.title.trim().slice(0, 120)
  const summary = parsed.summary.trim().slice(0, 500)

  if (!title || !summary) throw new Error('Empty fields in AI response')

  return { title, summary }
}

async function _summarizeText(
  text: string,
  sourceLabel: string
): Promise<{ title: string; summary: string }> {
  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    console.error('[AI] GROQ_API_KEY липсва в .env.local')
    throw new Error('GROQ_API_KEY не е конфигуриран')
  }

  const groq = new Groq({ apiKey })
  const articleText = extractArticleText(text).slice(0, 3000)

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content:
            'Ти си финансов редактор на takiev.bg. Получаваш текст от официална новина на НАП или НОИ и трябва да я преразкажеш за бизнес аудитория. ' +
            'Винаги отговаряй САМО с валиден JSON обект без никакъв допълнителен текст преди или след него. ' +
            'Формат: {"title": "...", "summary": "..."}',
        },
        {
          role: 'user',
          content:
            `Новина от ${sourceLabel}:\n\n${articleText}\n\n` +
            'Напиши:\n' +
            '- "title": заглавие до 10 думи, ясно и конкретно за бизнеса\n' +
            '- "summary": точно 2 изречения за практическото значение за фирмите и предприемачите\n' +
            'Отговори само с JSON, без обяснения.',
        },
      ],
      temperature: 0.2,
      max_tokens: 256,
    })

    const responseText = completion.choices[0]?.message?.content ?? ''
    const parsed = parseAIResponse(responseText)
    console.log(`[AI] ✓ ${sourceLabel}: "${parsed.title}"`)
    return parsed
  } catch (err) {
    console.error(`[AI] ГРЕШКА за ${sourceLabel}:`, err)
    throw err
  }
}

// Fetches the article page and summarizes it with AI.
// Cached per URL for 24h — repeated page loads don't call the API again.
export const getCachedArticleSummary = unstable_cache(
  async (url: string, sourceLabel: string) => {
    console.log(`[AI] Fetching article: ${url}`)

    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'bg-BG,bg;q=0.9,en;q=0.8',
        'Accept-Encoding': 'gzip, deflate',
        'Cache-Control': 'no-cache',
      },
    })

    if (!res.ok) throw new Error(`HTTP ${res.status} при fetch на ${url}`)

    const html = await res.text()
    return _summarizeText(html, sourceLabel)
  },
  ['ai-article-summary'],
  { revalidate: 86400 }
)
