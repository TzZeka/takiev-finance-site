// Server Component — JSON-LD must be SSR'd so crawlers see it in raw HTML
interface ArticleJsonLdProps {
  title: string;
  description: string;
  authorName: string;
  authorBio?: string;
  authorImageUrl?: string;
  publishedAt: string;
  canonicalUrl: string;
  imageUrl?: string;
  modifiedAt?: string;
  tags?: string[];
}

export function ArticleJsonLd({
  title,
  description,
  authorName,
  authorBio,
  authorImageUrl,
  publishedAt,
  canonicalUrl,
  imageUrl,
  modifiedAt,
  tags,
}: ArticleJsonLdProps) {
  const author: Record<string, unknown> = {
    '@type': 'Person',
    name: authorName,
    url: 'https://blog.nula.bg/author/nikolai/',
    jobTitle: 'Счетоводител',
    worksFor: {
      '@type': 'Organization',
      name: 'Takiev Finance',
      url: 'https://takiev.bg',
    },
  };

  if (authorBio) author.description = authorBio;
  if (authorImageUrl) author.image = authorImageUrl;

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    author,
    publisher: {
      '@type': 'Organization',
      name: 'Takiev Finance',
      url: 'https://takiev.bg',
      logo: {
        '@type': 'ImageObject',
        url: 'https://takiev.bg/logo.png',
      },
    },
    datePublished: publishedAt,
    dateModified: modifiedAt || publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    inLanguage: 'bg-BG',
    // "True" as string — Google's Rich Results requires Schema.org Boolean
    // value (string), NOT the JS boolean `true`. Using `true` causes the
    // Rich Results Test to flag the article as paywalled content.
    isAccessibleForFree: 'True',
  };

  if (imageUrl) {
    jsonLd.image = {
      '@type': 'ImageObject',
      url: imageUrl,
    };
  }

  if (tags && tags.length > 0) {
    jsonLd.keywords = tags.join(', ');
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
