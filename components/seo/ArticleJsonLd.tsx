'use client';

interface ArticleJsonLdProps {
  title: string;
  description: string;
  authorName: string;
  publishedAt: string;
  canonicalUrl: string;
  imageUrl?: string;
  modifiedAt?: string;
}

export function ArticleJsonLd({
  title,
  description,
  authorName,
  publishedAt,
  canonicalUrl,
  imageUrl,
  modifiedAt,
}: ArticleJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    author: {
      '@type': 'Person',
      name: authorName,
      url: 'https://blog.nula.bg/author/nikolai/',
    },
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
    ...(imageUrl && {
      image: {
        '@type': 'ImageObject',
        url: imageUrl,
      },
    }),
    inLanguage: 'bg-BG',
    isAccessibleForFree: true,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
