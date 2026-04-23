import Anthropic from '@anthropic-ai/sdk'

export interface ExtractedDate {
  _key: string
  date: string
  description: string
  type: 'deadline' | 'effective' | 'submission' | 'other'
}

export interface AIArticleData {
  aiTitle: string
  aiSummary: string
  keyPoints: string[]
  extractedDates: ExtractedDate[]
  affectedEntities: 'individuals' | 'companies' | 'both'
  actionRequired: boolean
  actionDescription: string | null
}

function stripNoise(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<nav[\s\S]*?<\/nav>/gi, '')
    .replace(/<header[\s\S]*?<\/header>/gi, '')
    .replace(/<footer[\s\S]*?<\/footer>/gi, '')
    .replace(/<aside[\s\S]*?<\/aside>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
}

function toPlainText(html: string): string {
  return html
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

function extractArticleText(html: string): string {
  const clean = stripNoise(html)

  // Ordered list of selectors — first match with enough text wins
  const SELECTORS = [
    /<article[\s\S]*?<\/article>/i,
    /<main[\s\S]*?<\/main>/i,
    /<div[^>]+(?:class|id)="[^"]*(?:article|content|body|text|news|post|entry|single)[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    /<div[^>]+(?:class|id)='[^']*(?:article|content|body|text|news|post|entry|single)[^']*'[^>]*>([\s\S]*?)<\/div>/i,
  ]

  for (const re of SELECTORS) {
    const m = clean.match(re)
    if (m) {
      const text = toPlainText(m[0])
      if (text.length > 200) return text.slice(0, 8000)
    }
  }

  // Fallback: collect all <p> tags
  const paragraphs = [...clean.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
  if (paragraphs.length > 2) {
    const text = toPlainText(paragraphs.map((m) => m[1]).join(' '))
    if (text.length > 200) return text.slice(0, 8000)
  }

  // Last resort: strip all tags from the entire cleaned HTML
  return toPlainText(clean).slice(0, 8000)
}

export async function extractArticleDataWithAI(
  html: string,
  sourceLabel: string
): Promise<AIArticleData> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY не е конфигуриран')

  const anthropic = new Anthropic({ apiKey })
  const articleText = extractArticleText(html)

  const response = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    temperature: 0.1,
    system: `Ти си финансов редактор на takiev.bg — счетоводна и финансова консултантска фирма в България.
Анализираш официални новини от ${sourceLabel} и ги структурираш за бизнес аудитория.
Отговаряй САМО с валиден JSON — без никакъв допълнителен текст преди или след него.`,
    messages: [
      {
        role: 'user',
        content: `Статия от ${sourceLabel}:\n\n${articleText}\n\nВърни САМО валиден JSON:
{
  "aiTitle": "SEO заглавие до 12 думи с ключови думи",
  "summary": "2-3 изречения на обикновен език за практическото значение за бизнеса",
  "keyPoints": ["точка 1", "точка 2"],
  "dates": [{"date": "ДД.ММ.ГГГГ", "description": "какво означава тази дата", "type": "deadline|effective|submission|other"}],
  "affectedEntities": "individuals|companies|both",
  "actionRequired": true,
  "actionDescription": "какво конкретно да направи читателят или null"
}
Правила: само на български, keyPoints 2-4 кратки изречения, dates всички дати от статията (ако няма = []), type: deadline=краен срок, effective=влизане в сила, submission=подаване, other=друго`,
      },
    ],
  })

  const text = response.content[0].type === 'text' ? response.content[0].text : ''
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('No JSON in Claude response')

  const parsed = JSON.parse(jsonMatch[0])

  const rawDates = Array.isArray(parsed.dates) ? parsed.dates : []
  const extractedDates: ExtractedDate[] = rawDates.map(
    (d: { date?: string; description?: string; type?: string }, i: number) => ({
      _key: `d${i}`,
      date: String(d.date ?? '').trim(),
      description: String(d.description ?? '').trim(),
      type: ['deadline', 'effective', 'submission', 'other'].includes(d.type ?? '')
        ? (d.type as ExtractedDate['type'])
        : 'other',
    })
  )

  return {
    aiTitle: String(parsed.aiTitle ?? '').trim().slice(0, 120),
    aiSummary: String(parsed.summary ?? '').trim().slice(0, 600),
    keyPoints: (Array.isArray(parsed.keyPoints) ? parsed.keyPoints : [])
      .slice(0, 4)
      .map(String),
    extractedDates,
    affectedEntities: ['individuals', 'companies', 'both'].includes(parsed.affectedEntities)
      ? (parsed.affectedEntities as AIArticleData['affectedEntities'])
      : 'both',
    actionRequired: Boolean(parsed.actionRequired),
    actionDescription:
      parsed.actionDescription && parsed.actionDescription !== 'null'
        ? String(parsed.actionDescription)
        : null,
  }
}

export async function fetchAndExtractArticle(
  url: string,
  sourceLabel: string
): Promise<AIArticleData> {
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'bg-BG,bg;q=0.9,en;q=0.8',
      'Cache-Control': 'no-cache',
    },
    next: { revalidate: 0 },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} при fetch на ${url}`)
  const html = await res.text()
  return extractArticleDataWithAI(html, sourceLabel)
}
