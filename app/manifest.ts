import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Takiev Finance - Счетоводна Кантора',
    short_name: 'Takiev Finance',
    description: 'Избери своя доверен бизнес партньор. Счетоводството е движеща сила за всеки успешен бизнес.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#19BFB7',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
