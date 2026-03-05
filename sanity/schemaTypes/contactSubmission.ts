import { defineField, defineType } from "sanity";

const statusEmoji: Record<string, string> = {
  нов: "🔵",
  отговорен: "✅",
  архивиран: "🗄️",
};

export default defineType({
  name: "contactSubmission",
  title: "Запитвания",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Име",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Имейл",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "phone",
      title: "Телефон",
      type: "string",
    }),
    defineField({
      name: "company",
      title: "Фирма",
      type: "string",
    }),
    defineField({
      name: "subject",
      title: "Тема",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "message",
      title: "Съобщение",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "submittedAt",
      title: "Дата на запитване",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Статус",
      type: "string",
      options: {
        list: [
          { title: "🔵 Нов", value: "нов" },
          { title: "✅ Отговорен", value: "отговорен" },
          { title: "🗄️ Архивиран", value: "архивиран" },
        ],
        layout: "radio",
      },
      initialValue: "нов",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "emailSent",
      title: "Имейл изпратен",
      type: "boolean",
      initialValue: false,
      description: "Дали офис имейлът е изпратен успешно",
    }),
    defineField({
      name: "notes",
      title: "Вътрешни бележки",
      type: "text",
      description: "Само за вътрешна употреба от екипа",
    }),
  ],
  preview: {
    select: {
      name: "name",
      subject: "subject",
      status: "status",
    },
    prepare({ name, subject, status }) {
      const emoji = statusEmoji[status] ?? "❓";
      return {
        title: `${emoji} ${name}`,
        subtitle: subject,
      };
    },
  },
  orderings: [
    {
      title: "Дата (най-нови първо)",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
});
