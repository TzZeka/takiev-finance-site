import { defineType, defineField } from "sanity";

export default defineType({
  name: "legalServicesContent",
  title: "Правни услуги - Съдържание",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Заглавие на страницата",
      type: "string",
      initialValue: "Правни услуги",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Подзаглавие",
      type: "string",
      initialValue: "Професионална правна подкрепа за вашия бизнес",
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
      name: "sectionTitle",
      title: "Заглавие на секцията с услуги",
      type: "string",
      initialValue: "Правните услуги, за които можем да съдействаме",
    }),
    defineField({
      name: "registrationsTitle",
      title: "Заглавие - Регистрации",
      type: "string",
      initialValue: "Регистрации",
    }),
    defineField({
      name: "registrations",
      title: "Регистрации",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "icon",
              title: "Иконка",
              type: "string",
              options: {
                list: [
                  { title: "Building2 (Дружества)", value: "building2" },
                  { title: "Stamp (Марки)", value: "stamp" },
                  { title: "GitBranch (Клонове)", value: "gitBranch" },
                  { title: "Users (Сдружения)", value: "users" },
                  { title: "Building (Консорциуми)", value: "building" },
                  { title: "UserCheck (ЕТ)", value: "userCheck" },
                  { title: "FileText (Свободни професии)", value: "fileText" },
                ],
              },
            },
            {
              name: "text",
              title: "Текст",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: "text",
            },
          },
        },
      ],
    }),
    defineField({
      name: "appealsTitle",
      title: "Заглавие - Обжалвания",
      type: "string",
      initialValue: "Обжалвания на актове",
    }),
    defineField({
      name: "appeals",
      title: "Обжалвания",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "icon",
              title: "Иконка",
              type: "string",
              options: {
                list: [
                  { title: "FileCheck (Ревизионни актове)", value: "fileCheck" },
                  { title: "AlertTriangle (Наказателни постановления)", value: "alertTriangle" },
                  { title: "Scale (Уволнения)", value: "scale" },
                ],
              },
            },
            {
              name: "text",
              title: "Текст",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: "text",
            },
          },
        },
      ],
    }),
    defineField({
      name: "commercialDealsTitle",
      title: "Заглавие - Търговски сделки",
      type: "string",
      initialValue: "Търговски сделки",
    }),
    defineField({
      name: "commercialDeals",
      title: "Търговски сделки",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "icon",
              title: "Иконка",
              type: "string",
              options: {
                list: [
                  { title: "Briefcase (Продажба)", value: "briefcase" },
                  { title: "ArrowRightLeft (Промяна)", value: "arrowRightLeft" },
                  { title: "ScrollText (Покупко-продажба)", value: "scrollText" },
                  { title: "FileSignature (Договори)", value: "fileSignature" },
                  { title: "Trash2 (Ликвидация)", value: "trash2" },
                  { title: "PenTool (Нотариални актове)", value: "penTool" },
                  { title: "Handshake (Консултация)", value: "handshake" },
                ],
              },
            },
            {
              name: "text",
              title: "Текст",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: "text",
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
      initialValue: "За повече информация относно правните услуги, които предлагаме, можете да се свържете с нас чрез {contactLink} или на посочения телефон за връзка.",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Правни услуги",
        subtitle: "Съдържание на таба",
      };
    },
  },
});
