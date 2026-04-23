import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNewsArticleBySlug, getAllNewsArticleSlugs, getRecentBlogPostsForLinking } from "@/lib/sanity/queries";
import { fetchAndExtractArticle, extractArticleDataWithAI } from "@/lib/claude-news";
import { writeClient } from "@/lib/sanity/writeClient";
import { NEWS_SOURCES, SanityNewsArticle, RichNewsItem } from "@/types/novini";
import { NewsArticlePageClient } from "./NewsArticlePageClient";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllNewsArticleSlugs();
  return slugs.map((s) => ({ slug: s.slug.current }));
}

async function resolveArticleData(article: SanityNewsArticle): Promise<RichNewsItem> {
  const slug = article.slug?.current ?? undefined;

  if (article.aiProcessedAt && article.aiSummary) {
    return {
      _id: article._id,
      source: article.source,
      url: article.url,
      title: article.title,
      slug,
      publishedAt: article.publishedAt,
      aiTitle: article.aiTitle ?? null,
      aiSummary: article.manualSummary ?? article.aiSummary,
      keyPoints: article.keyPoints ?? [],
      extractedDates: article.extractedDates ?? [],
      affectedEntities: article.affectedEntities ?? "both",
      actionRequired: article.actionRequired ?? false,
      actionDescription: article.actionDescription ?? null,
    };
  }

  if (article.manualSummary) {
    return {
      _id: article._id,
      source: article.source,
      url: article.url,
      title: article.title,
      slug,
      publishedAt: article.publishedAt,
      aiTitle: null,
      aiSummary: article.manualSummary,
      keyPoints: [],
      extractedDates: [],
      affectedEntities: "both",
      actionRequired: false,
      actionDescription: null,
    };
  }

  try {
    const sourceLabel =
      NEWS_SOURCES.find((s) => s.id === article.source)?.label ?? article.source;
    const data = article.articleBody
      ? await extractArticleDataWithAI(article.articleBody, sourceLabel)
      : await fetchAndExtractArticle(article.url, sourceLabel);

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
        console.error("[AI] Грешка при запис в Sanity:", err)
      );

    return {
      _id: article._id,
      source: article.source,
      url: article.url,
      title: article.title,
      slug,
      publishedAt: article.publishedAt,
      aiTitle: data.aiTitle,
      aiSummary: data.aiSummary,
      keyPoints: data.keyPoints,
      extractedDates: data.extractedDates,
      affectedEntities: data.affectedEntities,
      actionRequired: data.actionRequired,
      actionDescription: data.actionDescription,
    };
  } catch {
    return {
      _id: article._id,
      source: article.source,
      url: article.url,
      title: article.title,
      slug,
      publishedAt: article.publishedAt,
      aiTitle: null,
      aiSummary: null,
      keyPoints: [],
      extractedDates: [],
      affectedEntities: "both",
      actionRequired: false,
      actionDescription: null,
      summaryError: true,
    };
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsArticleBySlug(slug);
  if (!article) return {};

  const sourceLabel =
    NEWS_SOURCES.find((s) => s.id === article.source)?.fullName ?? article.source;
  const seoTitle = article.aiTitle ?? article.title;
  const seoDescription = article.aiSummary
    ? `${article.aiSummary.slice(0, 155)}...`
    : `Новина от ${sourceLabel} — прочетете резюме и важни срокове на takiev.bg`;

  return {
    title: `${seoTitle} | Новини | Takiev Finance`,
    description: seoDescription,
    alternates: {
      canonical: `https://takiev.bg/novini/${slug}`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://takiev.bg/novini/${slug}`,
      type: "article",
      locale: "bg_BG",
      siteName: "Takiev Finance",
      publishedTime: article.publishedAt,
      tags: ["НАП", "НОИ", "данъци", "осигуровки", "бизнес", "счетоводство"],
    },
  };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getNewsArticleBySlug(slug);
  if (!article) notFound();

  const [item, recentBlogPosts] = await Promise.all([
    resolveArticleData(article),
    getRecentBlogPostsForLinking(3),
  ]);

  const sourceInfo = NEWS_SOURCES.find((s) => s.id === article.source);

  // JSON-LD: NewsArticle
  const newsArticleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: item.aiTitle ?? item.title,
    description: item.aiSummary ?? "",
    datePublished: article.publishedAt,
    dateModified: article.aiProcessedAt ?? article.publishedAt,
    author: {
      "@type": "Organization",
      name: "Takiev Finance",
      url: "https://takiev.bg",
    },
    publisher: {
      "@type": "Organization",
      name: "Takiev Finance",
      url: "https://takiev.bg",
      logo: {
        "@type": "ImageObject",
        url: "https://takiev.bg/firm-logo/takiev-logo.png",
      },
    },
    url: `https://takiev.bg/novini/${slug}`,
    isBasedOn: article.url,
    about: {
      "@type": "Organization",
      name: sourceInfo?.fullName ?? article.source.toUpperCase(),
    },
  };

  // JSON-LD: Events for deadlines
  const deadlines = item.extractedDates.filter((d) => d.type === "deadline");
  const eventJsonLds = deadlines.map((d) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: d.description,
    startDate: d.date,
    description: `Краен срок свързан с: ${item.aiTitle ?? item.title}`,
    organizer: {
      "@type": "Organization",
      name: sourceInfo?.fullName ?? article.source.toUpperCase(),
    },
  }));

  // JSON-LD: FAQPage from key points
  const faqJsonLd =
    item.keyPoints.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: item.keyPoints.map((point, i) => ({
            "@type": "Question",
            name: i === 0 ? `Какво трябва да знам за: ${item.aiTitle ?? item.title}?` : `Точка ${i + 1}`,
            acceptedAnswer: {
              "@type": "Answer",
              text: point,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleJsonLd) }}
      />
      {eventJsonLds.map((ev, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ev) }}
        />
      ))}
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <NewsArticlePageClient item={item} originalUrl={article.url} recentBlogPosts={recentBlogPosts} />
    </>
  );
}
