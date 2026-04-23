export interface NewsSource {
  id: 'nap' | 'noi'
  label: string
  fullName: string
  color: string
  textColor: string
}

export const NEWS_SOURCES: NewsSource[] = [
  {
    id: 'nap',
    label: 'НАП',
    fullName: 'Национална агенция за приходите',
    color: 'bg-blue-600',
    textColor: 'text-white',
  },
  {
    id: 'noi',
    label: 'НОИ',
    fullName: 'Национален осигурителен институт',
    color: 'bg-emerald-600',
    textColor: 'text-white',
  },
]

export interface SanityExtractedDate {
  _key: string
  date: string
  description: string
  type: 'deadline' | 'effective' | 'submission' | 'other'
}

export interface SanityNewsArticle {
  _id: string
  source: 'nap' | 'noi'
  url: string
  title: string
  slug?: { current: string }
  publishedAt: string
  articleBody?: string
  manualSummary?: string
  // AI-generated fields (filled after first processing)
  aiTitle?: string
  aiSummary?: string
  keyPoints?: string[]
  extractedDates?: SanityExtractedDate[]
  affectedEntities?: 'individuals' | 'companies' | 'both'
  actionRequired?: boolean
  actionDescription?: string
  aiProcessedAt?: string
}

export interface RichNewsItem {
  _id: string
  source: 'nap' | 'noi'
  url: string
  title: string
  slug?: string
  publishedAt: string
  aiTitle: string | null
  aiSummary: string | null
  keyPoints: string[]
  extractedDates: SanityExtractedDate[]
  affectedEntities: 'individuals' | 'companies' | 'both'
  actionRequired: boolean
  actionDescription: string | null
  summaryError?: boolean
}

// Legacy — kept for backward compatibility during migration
export interface AINewsItem {
  _id: string
  source: 'nap' | 'noi'
  url: string
  title: string
  slug?: string
  publishedAt: string
  aiSummary: string | null
  summaryError?: boolean
}
