import { defineType, defineField } from "sanity";

export default defineType({
  name: "accountingServicesContent",
  title: "Счетоводни услуги - Съдържание",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Заглавие на страницата",
      type: "string",
      initialValue: "Счетоводни услуги",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Подзаглавие",
      type: "string",
      initialValue: "Професионално счетоводно обслужване за фирми и физически лица",
    }),
    defineField({
      name: "introTitle",
      title: "Заглавие на въведението",
      type: "string",
      description: "Например: Нашият екип предлага експертни счетоводни услуги в следните пакети:",
    }),
    defineField({
      name: "introParagraphs",
      title: "Въведение (параграфи)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "text",
              title: "Текст",
              type: "text",
              rows: 3,
            },
            {
              name: "highlighted",
              title: "Удебелен текст",
              type: "string",
              description: "Част от текста, която да бъде удебелена",
            },
          ],
          preview: {
            select: {
              title: "text",
            },
            prepare({ title }) {
              return {
                title: title?.substring(0, 80) + "..." || "Параграф",
              };
            },
          },
        },
      ],
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
              title: "Име на пакета",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "icon",
              title: "Иконка",
              type: "string",
              description: "Lucide icon name: rocket, building2, users, userCog, clipboardList",
              options: {
                list: [
                  { title: "Ракета (Стартиране)", value: "rocket" },
                  { title: "Сграда (Месечно обслужване)", value: "building2" },
                  { title: "Хора (Физически лица)", value: "users" },
                  { title: "Потребител с настройки (Външен счетоводител)", value: "userCog" },
                  { title: "Списък (ТРЗ)", value: "clipboardList" },
                ],
              },
            },
            {
              name: "description",
              title: "Кратко описание",
              type: "text",
              rows: 2,
            },
            {
              name: "price",
              title: "Цена (напр. 'от 50')",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "currency",
              title: "Валута",
              type: "string",
              initialValue: "EUR",
              options: {
                list: [
                  { title: "EUR", value: "EUR" },
                  { title: "BGN", value: "BGN" },
                ],
              },
            },
            {
              name: "billingPeriod",
              title: "Период на плащане",
              type: "string",
              options: {
                list: [
                  { title: "Еднократно", value: "еднократно" },
                  { title: "Месец", value: "месец" },
                  { title: "Година", value: "година" },
                ],
              },
            },
            {
              name: "color",
              title: "Цвят на пакета",
              type: "string",
              options: {
                list: [
                  { title: "Primary (Тюркоаз)", value: "primary" },
                  { title: "Син", value: "blue" },
                  { title: "Кехлибарен", value: "amber" },
                  { title: "Лилав", value: "violet" },
                ],
              },
              initialValue: "primary",
            },
            {
              name: "features",
              title: "Включени функционалности",
              type: "array",
              of: [{ type: "string" }],
              validation: (Rule) => Rule.required().min(1),
            },
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "price",
            },
            prepare({ title, subtitle }) {
              return {
                title: `Пакет „${title}"`,
                subtitle: subtitle,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "ctaText",
      title: "CTA текст",
      type: "text",
      rows: 2,
      description: "Текст в края на страницата (може да съдържа {contactLink} за линк към контактната форма)",
      initialValue: "За повече информация относно счетоводните услуги, които предлагаме, можете да се свържете с нас чрез {contactLink} или на посочения телефон за връзка.",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Счетоводни услуги",
        subtitle: "Съдържание на таба",
      };
    },
  },
});
