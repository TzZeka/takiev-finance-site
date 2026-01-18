import { defineType, defineField } from "sanity";

export default defineType({
  name: "companyRegistrationContent",
  title: "Регистрация на фирми - Съдържание",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Заглавие на страницата",
      type: "string",
      initialValue: "Регистрация на фирми",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Подзаглавие",
      type: "string",
      initialValue: "Професионална помощ при регистрация на търговско дружество или едноличен търговец",
    }),

    // Introduction Section
    defineField({
      name: "introductionTitle",
      title: "Заглавие - Въведение",
      type: "string",
      initialValue: "Трудно ли е да регистрираш собствена фирма?",
    }),
    defineField({
      name: "introductionContent",
      title: "Въведение - Съдържание",
      type: "array",
      of: [{ type: "block" }],
      description: "Текстово съдържание за въведението",
    }),

    // Business Forms Section
    defineField({
      name: "businessFormsTitle",
      title: "Заглавие - Форми на търговска дейност",
      type: "string",
      initialValue: "Форми на търговска дейност",
    }),
    defineField({
      name: "businessFormsContent",
      title: "Форми на търговска дейност - Съдържание",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "businessFormsOptions",
      title: "Опции за търговска дейност",
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
                  { title: "User (Физическо лице)", value: "user" },
                  { title: "Building (Юридическо лице)", value: "building" },
                ],
              },
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
          preview: {
            select: {
              title: "title",
            },
          },
        },
      ],
    }),

    // Company Registration Section
    defineField({
      name: "companyRegistrationTitle",
      title: "Заглавие - Регистрация на търговско дружество",
      type: "string",
      initialValue: "Регистрация на търговско дружество",
    }),
    defineField({
      name: "companyRegistrationContent",
      title: "Регистрация на търговско дружество - Съдържание",
      type: "array",
      of: [{ type: "block" }],
    }),

    // Company Types
    defineField({
      name: "companyTypesTitle",
      title: "Заглавие - Видове търговски дружества",
      type: "string",
      initialValue: "Видове търговски дружества",
    }),
    defineField({
      name: "companyTypes",
      title: "Видове търговски дружества",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "abbr",
              title: "Абревиатура",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "name",
              title: "Пълно име",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "popular",
              title: "Популярен избор",
              type: "boolean",
              initialValue: false,
            },
          ],
          preview: {
            select: {
              title: "abbr",
              subtitle: "name",
            },
          },
        },
      ],
    }),

    // OOD vs EOOD
    defineField({
      name: "oodEoodTitle",
      title: "Заглавие - Разлика между ООД и ЕООД",
      type: "string",
      initialValue: "Каква е разликата между ООД и ЕООД?",
    }),
    defineField({
      name: "oodEoodContent",
      title: "ООД vs ЕООД - Съдържание",
      type: "array",
      of: [{ type: "block" }],
    }),

    // Registration Steps
    defineField({
      name: "registrationStepsTitle",
      title: "Заглавие - Стъпки за регистрация",
      type: "string",
      initialValue: "Стъпки за регистрация на търговско дружество",
    }),
    defineField({
      name: "registrationSteps",
      title: "Стъпки за регистрация",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Заглавие на стъпката",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              title: "Описание",
              type: "text",
              rows: 2,
            },
          ],
          preview: {
            select: {
              title: "title",
            },
          },
        },
      ],
    }),

    // ET Registration Section
    defineField({
      name: "etRegistrationTitle",
      title: "Заглавие - Регистрация на едноличен търговец",
      type: "string",
      initialValue: "Регистрация на едноличен търговец",
    }),
    defineField({
      name: "etRegistrationContent",
      title: "Регистрация на ЕТ - Съдържание",
      type: "array",
      of: [{ type: "block" }],
    }),

    // ET How to Start
    defineField({
      name: "etHowToStartTitle",
      title: "Заглавие - Как да започна като ЕТ",
      type: "string",
      initialValue: "Как да упражнявам търговска дейност като физическо лице?",
    }),
    defineField({
      name: "etHowToStartContent",
      title: "Как да започна като ЕТ - Съдържание",
      type: "array",
      of: [{ type: "block" }],
    }),

    // ET Accounting
    defineField({
      name: "etAccountingTitle",
      title: "Заглавие - Счетоводство на ЕТ",
      type: "string",
      initialValue: "Счетоводство на едноличен търговец",
    }),
    defineField({
      name: "etAccountingContent",
      title: "Счетоводство на ЕТ - Съдържание",
      type: "array",
      of: [{ type: "block" }],
    }),

    // Without Registration
    defineField({
      name: "withoutRegistrationTitle",
      title: "Заглавие - Дейност без регистрация",
      type: "string",
      initialValue: "Мога ли да извършвам търговска дейност без регистрация?",
    }),
    defineField({
      name: "withoutRegistrationContent",
      title: "Дейност без регистрация - Съдържание",
      type: "array",
      of: [{ type: "block" }],
    }),

    // ET Service
    defineField({
      name: "etServiceTitle",
      title: "Заглавие - Услуга за регистрация на ЕТ",
      type: "string",
      initialValue: "Услуга за регистрация на едноличен търговец",
    }),
    defineField({
      name: "etServiceContent",
      title: "Услуга за регистрация на ЕТ - Съдържание",
      type: "array",
      of: [{ type: "block" }],
    }),

    defineField({
      name: "ctaText",
      title: "CTA текст",
      type: "text",
      rows: 2,
      description: "Текст в края на страницата (може да съдържа {contactLink} за линк към контактната форма)",
      initialValue: "За повече информация можете да се свържете с нас на посочения телефон или чрез {contactLink} на нашия сайт.",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Регистрация на фирми",
        subtitle: "Съдържание на таба",
      };
    },
  },
});
