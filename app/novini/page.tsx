import type { Metadata } from "next";
import { getNewsArticles } from "@/lib/sanity/queries";
import { getCachedArticleSummary } from "@/lib/gemini";
import { NEWS_SOURCES, AINewsItem } from "@/types/novini";
import { NoviniPageClient } from "./NoviniPageClient";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Новини от НАП и НОИ | Takiev Finance",
  description:
    "Актуални новини за бизнеса от Националната агенция за приходите и Националния осигурителен институт, обобщени с AI.",
  keywords: [
    "новини НАП",
    "новини НОИ",
    "данъчни новини",
    "осигурителни новини",
    "НАП съобщения",
    "бизнес новини България",
  ],
  alternates: {
    canonical: "https://takiev.bg/novini",
  },
  openGraph: {
    title: "Новини от НАП и НОИ | Takiev Finance",
    description:
      "Актуални новини от официалните финансови институции, обобщени с AI за бизнеса.",
    url: "https://takiev.bg/novini",
    type: "website",
    locale: "bg_BG",
    siteName: "Takiev Finance",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default async function NoviniPage() {
  const articles = await getNewsArticles();

  const items: AINewsItem[] = await Promise.all(
    articles.map(async (article) => {
      // Editor provided manual summary — use it directly
      if (article.manualSummary) {
        return {
          _id: article._id,
          source: article.source,
          url: article.url,
          title: article.title,
          publishedAt: article.publishedAt,
          aiSummary: article.manualSummary,
        };
      }

      // No manual summary — fetch article page and summarize with Gemini
      try {
        const source = NEWS_SOURCES.find((s) => s.id === article.source);
        const ai = await getCachedArticleSummary(
          article.url,
          source?.label ?? article.source
        );
        return {
          _id: article._id,
          source: article.source,
          url: article.url,
          title: article.title,
          publishedAt: article.publishedAt,
          aiSummary: ai.summary,
        };
      } catch {
        return {
          _id: article._id,
          source: article.source,
          url: article.url,
          title: article.title,
          publishedAt: article.publishedAt,
          aiSummary: null,
          summaryError: true,
        };
      }
    })
  );

  return <NoviniPageClient items={items} />;
}
