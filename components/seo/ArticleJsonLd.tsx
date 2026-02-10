'use client';

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
    '@type': 'Article',
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
    isAccessibleForFree: true,
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
