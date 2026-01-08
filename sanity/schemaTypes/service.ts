import { defineType, defineField } from "sanity";

export default defineType({
  name: "service",
  title: "Услуги",
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
      name: "category",
      title: "Категория",
      type: "string",
      options: {
        list: [
          { title: "Счетоводни", value: "Счетоводни" },
          { title: "Данъчни", value: "Данъчни" },
          { title: "Правни", value: "Правни" },
          { title: "Регистрация", value: "Регистрация" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Кратко описание",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "description",
      title: "Описание",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "packages",
      title: "Пакети",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Име на пакет",
              type: "string",
            },
            {
              name: "description",
              title: "Описание",
              type: "text",
            },
            {
              name: "price",
              title: "Цена",
              type: "string",
            },
            {
              name: "features",
              title: "Функционалности",
              type: "array",
              of: [{ type: "string" }],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "pricing",
      title: "Цена",
      type: "string",
    }),
    defineField({
      name: "icon",
      title: "Иконка",
      type: "string",
      description: "Lucide icon name (напр. 'calculator', 'briefcase')",
    }),
    defineField({
      name: "order",
      title: "Ред",
      type: "number",
      description: "Ред на показване (по-малко число = по-напред)",
    }),
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
    },
    prepare({ title, category }) {
      return {
        title,
        subtitle: category,
      };
    },
  },
});
