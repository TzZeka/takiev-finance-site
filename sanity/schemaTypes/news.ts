import { defineType, defineField } from "sanity";

export default defineType({
  name: "news",
  title: "Фирмени новини",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Заглавие",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Резюме",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: "publishedAt",
      title: "Дата",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tag",
      title: "Категория",
      type: "string",
      options: {
        list: [
          { title: "Данъци", value: "Данъци" },
          { title: "Счетоводство", value: "Счетоводство" },
          { title: "Регулации", value: "Регулации" },
          { title: "Компанията", value: "Компанията" },
        ],
      },
    }),
    defineField({
      name: "priority",
      title: "Приоритет",
      type: "string",
      initialValue: "medium",
      options: {
        list: [
          { title: "Висок", value: "high" },
          { title: "Среден", value: "medium" },
          { title: "Нисък", value: "low" },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      publishedAt: "publishedAt",
      priority: "priority",
    },
    prepare({ title, publishedAt, priority }) {
      const priorityLabel =
        priority === "high" ? "🔴" : priority === "medium" ? "🟡" : "🟢";
      return {
        title: `${priorityLabel} ${title}`,
        subtitle: publishedAt
          ? new Date(publishedAt).toLocaleDateString("bg-BG")
          : "Без дата",
      };
    },
  },
});
