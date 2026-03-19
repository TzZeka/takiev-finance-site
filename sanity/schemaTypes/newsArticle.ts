import { defineType, defineField } from 'sanity'
import { LinkIcon } from '@sanity/icons'

export default defineType({
  name: 'newsArticle',
  title: 'Новини (НАП / НОИ)',
  type: 'document',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'source',
      title: 'Източник',
      type: 'string',
      options: {
        list: [
          { title: 'НАП — Национална агенция за приходите', value: 'nap' },
          { title: 'НОИ — Национален осигурителен институт', value: 'noi' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Линк към статията',
      type: 'url',
      description: 'Копирай линка директно от официалния сайт на НАП или НОИ',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Заглавие',
      type: 'string',
      description: 'Заглавието от оригиналната статия',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Дата на публикуване',
      type: 'datetime',
      options: { dateFormat: 'DD.MM.YYYY', timeFormat: 'HH:mm' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'manualSummary',
      title: 'Резюме (незадължително)',
      type: 'text',
      rows: 4,
      description: 'Ако е попълнено, се показва вместо AI-генерираното резюме. Остави празно за автоматично резюме.',
    }),
  ],
  orderings: [
    {
      title: 'По дата (ново първо)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      source: 'source',
      publishedAt: 'publishedAt',
    },
    prepare({ title, source, publishedAt }: Record<string, string>) {
      const sourceLabel = source === 'nap' ? '🔵 НАП' : '🟢 НОИ'
      return {
        title,
        subtitle: `${sourceLabel} · ${publishedAt ? new Date(publishedAt).toLocaleDateString('bg-BG') : 'Без дата'}`,
      }
    },
  },
})
