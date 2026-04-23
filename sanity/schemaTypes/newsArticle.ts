import { defineType, defineField } from 'sanity'
import { LinkIcon } from '@sanity/icons'

export default defineType({
  name: 'newsArticle',
  title: 'Новини (НАП / НОИ)',
  type: 'document',
  icon: LinkIcon,
  fields: [
    // --- Core fields (editor fills these) ---
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
      name: 'slug',
      title: 'URL (slug)',
      type: 'slug',
      description: 'Генерира се автоматично от заглавието — използва се за страницата /novini/...',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Дата на публикуване',
      type: 'datetime',
      options: { dateFormat: 'DD.MM.YYYY', timeFormat: 'HH:mm' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'articleBody',
      title: 'Текст на статията (за AI обработване)',
      type: 'text',
      rows: 12,
      description: 'Копирай и постави тук пълния текст на статията от НАП/НОИ. AI ще го прочете и генерира резюме автоматично при зареждане на страницата.',
    }),
    defineField({
      name: 'manualSummary',
      title: 'Ръчно резюме (незадължително)',
      type: 'text',
      rows: 4,
      description: 'Ако е попълнено, замества AI резюмето. Остави празно за автоматично обработване.',
    }),

    // --- AI-generated fields (auto-filled, editable if needed) ---
    defineField({
      name: 'aiTitle',
      title: 'AI Заглавие (SEO)',
      type: 'string',
      description: 'Генерира се автоматично с AI — оптимизирано за търсачки.',
    }),
    defineField({
      name: 'aiSummary',
      title: 'AI Резюме',
      type: 'text',
      rows: 4,
      description: 'Генерира се автоматично с AI при първо зареждане на страницата.',
    }),
    defineField({
      name: 'keyPoints',
      title: 'Ключови точки (AI)',
      type: 'array',
      of: [{ type: 'string' }],
      description: '2–4 най-важни точки, генерирани с AI.',
    }),
    defineField({
      name: 'extractedDates',
      title: 'Важни дати (AI)',
      type: 'array',
      description: 'Крайни срокове, дати на влизане в сила и др., открити в статията.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'date', title: 'Дата', type: 'string' }),
            defineField({ name: 'description', title: 'Описание', type: 'string' }),
            defineField({
              name: 'type',
              title: 'Тип',
              type: 'string',
              options: {
                list: [
                  { title: 'Краен срок', value: 'deadline' },
                  { title: 'Влизане в сила', value: 'effective' },
                  { title: 'Срок за подаване', value: 'submission' },
                  { title: 'Друго', value: 'other' },
                ],
              },
            }),
          ],
          preview: {
            select: { title: 'date', subtitle: 'description' },
          },
        },
      ],
    }),
    defineField({
      name: 'affectedEntities',
      title: 'Засегнати лица (AI)',
      type: 'string',
      options: {
        list: [
          { title: 'Физически лица', value: 'individuals' },
          { title: 'Фирми', value: 'companies' },
          { title: 'И двете', value: 'both' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'actionRequired',
      title: 'Нужно действие (AI)',
      type: 'boolean',
      initialValue: false,
      description: 'Дали статията изисква конкретно действие от читателя.',
    }),
    defineField({
      name: 'actionDescription',
      title: 'Описание на действието (AI)',
      type: 'text',
      rows: 2,
      description: 'Какво конкретно трябва да направи читателят.',
    }),
    defineField({
      name: 'aiProcessedAt',
      title: 'Обработено от AI на',
      type: 'datetime',
      description: 'Дата и час на последно AI обработване — не редактирайте ръчно.',
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
      aiProcessedAt: 'aiProcessedAt',
      articleBody: 'articleBody',
    },
    prepare({
      title,
      source,
      publishedAt,
      aiProcessedAt,
      articleBody,
    }: Record<string, string>) {
      const sourceLabel = source === 'nap' ? '🔵 НАП' : '🟢 НОИ'
      const aiStatus = aiProcessedAt ? ' · ✓ AI' : articleBody ? ' · 📋 Готов за AI' : ''
      return {
        title,
        subtitle: `${sourceLabel}${aiStatus} · ${publishedAt ? new Date(publishedAt).toLocaleDateString('bg-BG') : 'Без дата'}`,
      }
    },
  },
})
