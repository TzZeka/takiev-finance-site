import { defineType, defineField } from "sanity";

export default defineType({
  name: "homeContent",
  title: "Начална Страница Съдържание",
  type: "document",
  fields: [
    defineField({
      name: "heroVideo",
      title: "Корпоративно видео (файл)",
      type: "file",
      options: {
        accept: "video/*",
      },
    }),
    defineField({
      name: "heroVideoUrl",
      title: "Корпоративно видео (URL)",
      type: "url",
      description: "Алтернатива на файл - URL към видео",
    }),
    defineField({
      name: "motto",
      title: "Мото",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
      initialValue:
        "Избери своя доверен бизнес партньор. Счетоводството е движеща сила за всеки успешен бизнес. Нашият екип ще осигури сигурност, защита и експертно счетоводно обслужване на Вашия бизнес.",
    }),
    defineField({
      name: "messages",
      title: "Послания",
      type: "array",
      description: "Основните неща, с които се отличаваме",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "icon",
              title: "Иконка",
              type: "string",
              description: "Lucide icon name (напр. 'users', 'shield', 'zap')",
            },
            {
              name: "title",
              title: "Заглавие",
              type: "string",
            },
            {
              name: "description",
              title: "Описание",
              type: "text",
              rows: 2,
            },
          ],
        },
      ],
      initialValue: [
        {
          icon: "users",
          title: "Индивидуален подход към всеки клиент",
          description: "Разбираме уникалните нужди на Вашия бизнес",
        },
        {
          icon: "award",
          title: "Висока професионална експертиза",
          description: "Опитен екип с дълогодишна практика",
        },
        {
          icon: "laptop",
          title: "Дигитализиране на Вашето счетоводство",
          description: "Край на хартиените документи",
        },
      ],
    }),
    defineField({
      name: "ctaText",
      title: "Call to Action текст",
      type: "string",
      initialValue: "Готови ли сте да започнете?",
    }),
    defineField({
      name: "ctaButtonText",
      title: "Call to Action бутон текст",
      type: "string",
      initialValue: "Изпрати запитване",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Начална Страница",
      };
    },
  },
});
