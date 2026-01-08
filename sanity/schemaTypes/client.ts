import { defineType, defineField } from "sanity";

export default defineType({
  name: "client",
  title: "Клиенти и Партньори",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Име",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Лого",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "website",
      title: "Уебсайт",
      type: "url",
    }),
    defineField({
      name: "sector",
      title: "Бизнес сектор",
      type: "string",
      options: {
        list: [
          { title: "Електронна търговия и дропшипинг", value: "ecommerce" },
          { title: "Маркетинг и консултантски услуги", value: "marketing" },
          { title: "Технологичен сектор (ИТ)", value: "tech" },
          { title: "Строителство и недвижими имоти", value: "construction" },
          { title: "Фрийлансъри", value: "freelance" },
          { title: "Туризъм (Airbnb/Booking)", value: "tourism" },
          { title: "Лечебни заведения", value: "healthcare" },
          { title: "Творчески индустрии", value: "creative" },
          { title: "Финансови инструменти", value: "finance" },
          { title: "Друго", value: "other" },
        ],
      },
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
      title: "name",
      media: "logo",
      sector: "sector",
    },
    prepare({ title, media, sector }) {
      return {
        title,
        media,
        subtitle: sector,
      };
    },
  },
});
