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
    color: 'bg-blue-50',
    textColor: 'text-blue-700',
  },
  {
    id: 'noi',
    label: 'НОИ',
    fullName: 'Национален осигурителен институт',
    color: 'bg-emerald-50',
    textColor: 'text-emerald-700',
  },
]

export interface SanityNewsArticle {
  _id: string
  source: 'nap' | 'noi'
  url: string
  title: string
  publishedAt: string
  manualSummary?: string
}

export interface AINewsItem {
  _id: string
  source: 'nap' | 'noi'
  url: string
  title: string
  publishedAt: string
  aiSummary: string | null
  summaryError?: boolean
}
