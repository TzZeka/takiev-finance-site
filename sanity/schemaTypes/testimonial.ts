import { defineType, defineField } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Клиентски мнения",
  type: "document",
  fields: [
    defineField({
      name: "clientName",
      title: "Име на клиент",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "clientCompany",
      title: "Компания",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "clientRole",
      title: "Позиция",
      type: "string",
    }),
    defineField({
      name: "content",
      title: "Мнение",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Оценка",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: "avatar",
      title: "Снимка на клиент",
      type: "image",
      options: {
        hotspot: true,
      },
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
      title: "clientName",
      subtitle: "clientCompany",
      media: "avatar",
    },
  },
});
