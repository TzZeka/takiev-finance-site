'use client'

export function LocalBusinessJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AccountingService',
    name: 'Takiev Finance',
    alternateName: ['Такиев Финанс', 'Takiev', 'Такиев'],
    description: 'Избери своя доверен бизнес партньор. Счетоводството е движеща сила за всеки успешен бизнес. Счетоводни услуги, данъчни консултации, регистрация на фирми.',
    url: 'https://takiev.bg',
    logo: 'https://takiev.bg/logo.png',
    image: 'https://takiev.bg/opengraph-image',
    telephone: '+359899080016', 
    email: 'office@takiev.bg', 
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'бул. „Александър Стамболийски" 30Б',
      addressLocality: 'София',
      addressRegion: 'София-град',
      postalCode: '1000',
      addressCountry: 'BG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 42.6977078,
      longitude: 23.3198778,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    priceRange: '$$',
    currenciesAccepted: 'BGN, EUR',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
    areaServed: {
      '@type': 'Country',
      name: 'Bulgaria',
    },
    serviceType: [
      'Счетоводни услуги',
      'Данъчни консултации',
      'Регистрация на фирми',
      'Правни услуги',
      'ТРЗ услуги',
      'Годишно приключване',
    ],
    sameAs: [
      'https://www.facebook.com/n.takiev',
      'https://www.linkedin.com/company/takiev-finance/',
      'https://www.youtube.com/@nikolaytakiev6221',
      'https://www.tiktok.com/@n.takiev',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function OrganizationJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Takiev Finance',
    alternateName: ['Такиев Финанс', 'Takiev', 'Такиев'],
    url: 'https://takiev.bg',
    logo: 'https://takiev.bg/logo.png',
    founder: {
      '@type': 'Person',
      name: 'Nikolay Takiev',
    },
    foundingDate: '2021',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+359899080016',
      contactType: 'customer service',
      availableLanguage: ['Bulgarian', 'English'],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function WebSiteJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Takiev Finance',
    alternateName: 'Такиев Финанс',
    url: 'https://takiev.bg',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://takiev.bg/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
