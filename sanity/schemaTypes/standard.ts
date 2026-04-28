import { defineType, defineField } from "sanity";

export default defineType({
  name: "standard",
  title: "Международни стандарти",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Заглавие",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Категория",
      type: "string",
      options: {
        list: [
          { title: "МСС (IAS)", value: "mcc" },
          { title: "МСФО (IFRS)", value: "msfo" },
          { title: "Разяснения на КРМСФО", value: "interpretation" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Описание",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Нормален текст",       value: "normal" },
            { title: "Заглавие 2",           value: "h2" },
            { title: "Заглавие 3",           value: "h3" },
            { title: "Заглавие 4",           value: "h4" },
            { title: "Цитат",               value: "blockquote" },
            { title: "← Вляво",            value: "textLeft" },
            { title: "↔ Двустранно",        value: "textJustify" },
            { title: "→ Вдясно",            value: "textRight" },
            { title: "↕ Центрирано",        value: "textCenter" },
          ],
          lists: [
            { title: "Списък с точки",  value: "bullet" },
            { title: "Номериран списък", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Удебелен",   value: "strong" },
              { title: "Курсив",     value: "em" },
              { title: "Подчертан",  value: "underline" },
              { title: "Зачертан",   value: "strike-through" },
              { title: "Код",        value: "code" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Връзка",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                ],
              },
            ],
          },
        },
      ],
    }),
    defineField({
      name: "file",
      title: "PDF Файл",
      type: "file",
      options: {
        accept: ".pdf",
      },
    }),
    defineField({
      name: "orderNumber",
      title: "Пореден номер",
      type: "number",
      validation: (Rule) => Rule.required().positive().integer(),
    }),
    defineField({
      name: "lastUpdated",
      title: "Последна актуализация",
      type: "date",
    }),
  ],
  orderings: [
    {
      title: "Пореден номер (нарастващо)",
      name: "orderNumberAsc",
      by: [{ field: "orderNumber", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      orderNumber: "orderNumber",
    },
    prepare(selection) {
      const { title, category, orderNumber } = selection as {
        title: string;
        category: string;
        orderNumber: string;
      };
      const categoryMap: Record<string, string> = {
        mcc: "МСС",
        msfo: "МСФО",
        interpretation: "Разяснение",
      };
      return {
        title,
        subtitle: `${categoryMap[category] ?? category} · № ${orderNumber}`,
      };
    },
  },
});
