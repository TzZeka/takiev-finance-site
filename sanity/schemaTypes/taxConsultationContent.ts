import { defineType, defineField } from "sanity";

export default defineType({
  name: "taxConsultationContent",
  title: "Данъчни консултации - Съдържание",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Заглавие на страницата",
      type: "string",
      initialValue: "Данъчни консултации",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Подзаглавие",
      type: "string",
      initialValue: "Експертни данъчни консултации за фирми и физически лица",
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
      name: "companyServicesTitle",
      title: "Заглавие - Услуги за търговски дружества",
      type: "string",
      initialValue: "Данъчни консултации за търговски дружества",
    }),
    defineField({
      name: "companyServicesIntro",
      title: "Въведение - Услуги за търговски дружества",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "text",
              title: "Текст",
              type: "text",
              rows: 2,
            },
          ],
          preview: {
            select: {
              title: "text",
            },
            prepare({ title }) {
              return {
                title: title?.substring(0, 60) + "..." || "Параграф",
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "companyServices",
      title: "Услуги за търговски дружества",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "icon",
              title: "Иконка",
              type: "string",
              description: "Lucide icon name",
              options: {
                list: [
                  { title: "Receipt (ДДС)", value: "receipt" },
                  { title: "Building2 (ЗКПО)", value: "building2" },
                  { title: "Globe (Международни)", value: "globe" },
                  { title: "Search (Одит)", value: "search" },
                  { title: "FileCheck (Становища)", value: "fileCheck" },
                  { title: "AlertTriangle (Обжалване)", value: "alertTriangle" },
                ],
              },
            },
            {
              name: "text",
              title: "Текст на услугата",
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
      name: "individualServicesTitle",
      title: "Заглавие - Услуги за физически лица",
      type: "string",
      initialValue: "Данъчни консултации за физически лица",
    }),
    defineField({
      name: "individualServicesIntro",
      title: "Въведение - Услуги за физически лица",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "text",
              title: "Текст",
              type: "text",
              rows: 2,
            },
          ],
          preview: {
            select: {
              title: "text",
            },
            prepare({ title }) {
              return {
                title: title?.substring(0, 60) + "..." || "Параграф",
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "individualServices",
      title: "Услуги за физически лица",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "icon",
              title: "Иконка",
              type: "string",
              description: "Lucide icon name",
              options: {
                list: [
                  { title: "FileText (Доходи)", value: "fileText" },
                  { title: "Calendar (Декларация)", value: "calendar" },
                  { title: "Gift (Облекчения)", value: "gift" },
                  { title: "Briefcase (Фрийлансъри)", value: "briefcase" },
                  { title: "UserCheck (СОЛ)", value: "userCheck" },
                  { title: "UserPlus (Свободна професия)", value: "userPlus" },
                  { title: "Receipt (ЗДДС)", value: "receipt" },
                  { title: "TrendingUp (Финансови инструменти)", value: "trendingUp" },
                  { title: "Scale (Трудови)", value: "scale" },
                  { title: "Heart (Осигуряване)", value: "heart" },
                  { title: "Stamp (Патентен данък)", value: "stamp" },
                  { title: "FileSignature (Двойно облагане)", value: "fileSignature" },
                ],
              },
            },
            {
              name: "text",
              title: "Текст на услугата",
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
      initialValue: "За повече информация относно данъчните консултации, които предлагаме, можете да се свържете с нас чрез {contactLink} или на посочения телефон за връзка.",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Данъчни консултации",
        subtitle: "Съдържание на таба",
      };
    },
  },
});
