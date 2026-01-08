import { defineType, defineField } from "sanity";

export default defineType({
  name: "blogPost",
  title: "Блог Статии",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Заглавие",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Автор",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "publishedAt",
      title: "Дата на публикуване",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Основна снимка",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Алтернативен текст",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "excerpt",
      title: "Кратко описание",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "body",
      title: "Съдържание",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "nulaBgUrl",
      title: "NulaBG URL",
      type: "url",
      description: "Връзка към статията в NulaBG блог",
    }),
    defineField({
      name: "tags",
      title: "Тагове",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "featured",
      title: "Показва се на началната страница",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
      publishedAt: "publishedAt",
    },
    prepare({ title, media, publishedAt }) {
      return {
        title,
        media,
        subtitle: publishedAt
          ? new Date(publishedAt).toLocaleDateString("bg-BG")
          : "Без дата",
      };
    },
  },
});
