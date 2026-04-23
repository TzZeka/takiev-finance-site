import type { Metadata } from "next";
import { getNewsArticles, getRecentBlogPostsForLinking } from "@/lib/sanity/queries";
import { fetchAndExtractArticle, extractArticleDataWithAI } from "@/lib/claude-news";
import { writeClient } from "@/lib/sanity/writeClient";
import { NEWS_SOURCES, SanityNewsArticle, RichNewsItem } from "@/types/novini";
import { NoviniPageClient } from "./NoviniPageClient";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Новини от НАП и НОИ | Takiev Finance",
  description:
    "Актуални новини за бизнеса от Националната агенция за приходите и Националния осигурителен институт — обобщени с AI, с важни срокове и практични насоки.",
  keywords: [
    "новини НАП",
    "новини НОИ",
    "данъчни новини",
    "осигурителни новини",
    "НАП съобщения",
    "бизнес новини България",
    "данъчни срокове",
    "счетоводни новини",
  ],
  alternates: {
    canonical: "https://takiev.bg/novini",
  },
  openGraph: {
    title: "Новини от НАП и НОИ | Takiev Finance",
    description:
      "Актуални новини от официалните финансови институции — обобщени с AI, с важни дати и практични насоки за вашия бизнес.",
    url: "https://takiev.bg/novini",
    type: "website",
    locale: "bg_BG",
    siteName: "Takiev Finance",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

async function processArticle(article: SanityNewsArticle): Promise<RichNewsItem> {
  const slug = article.slug?.current ?? null

  // Already processed by AI — use Sanity data directly
  if (article.aiProcessedAt && article.aiSummary) {
    return {
      _id: article._id,
      source: article.source,
      url: article.url,
      title: article.title,
      slug: slug ?? undefined,
      publishedAt: article.publishedAt,
      aiTitle: article.aiTitle ?? null,
      aiSummary: article.manualSummary ?? article.aiSummary,
      keyPoints: article.keyPoints ?? [],
      extractedDates: article.extractedDates ?? [],
      affectedEntities: article.affectedEntities ?? 'both',
      actionRequired: article.actionRequired ?? false,
      actionDescription: article.actionDescription ?? null,
    }
  }

  // Manual summary only — no AI extraction
  if (article.manualSummary && !article.aiProcessedAt) {
    return {
      _id: article._id,
      source: article.source,
      url: article.url,
      title: article.title,
      slug: slug ?? undefined,
      publishedAt: article.publishedAt,
      aiTitle: null,
      aiSummary: article.manualSummary,
      keyPoints: [],
      extractedDates: [],
      affectedEntities: 'both',
      actionRequired: false,
      actionDescription: null,
    }
  }

  // Not yet processed — use articleBody if available, otherwise fetch URL
  try {
    const sourceLabel =
      NEWS_SOURCES.find((s) => s.id === article.source)?.label ?? article.source

    const data = article.articleBody
      ? await extractArticleDataWithAI(article.articleBody, sourceLabel)
      : await fetchAndExtractArticle(article.url, sourceLabel)

    // Save AI results back to Sanity (best-effort, non-blocking)
    writeClient
      .patch(article._id)
      .set({
        aiTitle: data.aiTitle,
        aiSummary: data.aiSummary,
        keyPoints: data.keyPoints,
        extractedDates: data.extractedDates,
        affectedEntities: data.affectedEntities,
        actionRequired: data.actionRequired,
        actionDescription: data.actionDescription,
        aiProcessedAt: new Date().toISOString(),
      })
      .commit()
      .catch((err: unknown) =>
        console.error('[AI] Грешка при запис в Sanity:', err)
      )

    return {
      _id: article._id,
      source: article.source,
      url: article.url,
      title: article.title,
      slug: slug ?? undefined,
      publishedAt: article.publishedAt,
      aiTitle: data.aiTitle,
      aiSummary: data.aiSummary,
      keyPoints: data.keyPoints,
      extractedDates: data.extractedDates,
      affectedEntities: data.affectedEntities,
      actionRequired: data.actionRequired,
      actionDescription: data.actionDescription,
    }
  } catch {
    return {
      _id: article._id,
      source: article.source,
      url: article.url,
      title: article.title,
      slug: slug ?? undefined,
      publishedAt: article.publishedAt,
      aiTitle: null,
      aiSummary: null,
      keyPoints: [],
      extractedDates: [],
      affectedEntities: 'both',
      actionRequired: false,
      actionDescription: null,
      summaryError: true,
    }
  }
}

export default async function NoviniPage() {
  const [articles, recentBlogPosts] = await Promise.all([
    getNewsArticles(),
    getRecentBlogPostsForLinking(3),
  ]);
  const items = await Promise.all(articles.map(processArticle));
  return <NoviniPageClient items={items} recentBlogPosts={recentBlogPosts} />;
}
