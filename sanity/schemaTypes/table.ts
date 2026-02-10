import { defineType, defineField } from "sanity";

export default defineType({
  name: "table",
  title: "Таблица",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Заглавие на таблицата",
      type: "string",
      description: "Незадължително заглавие, показва се над таблицата",
    }),
    defineField({
      name: "hasHeaderRow",
      title: "Заглавен ред",
      type: "boolean",
      description: "Дали първият ред е заглавен",
      initialValue: true,
    }),
    defineField({
      name: "rows",
      title: "Редове",
      type: "array",
      of: [
        {
          type: "object",
          name: "row",
          title: "Ред",
          fields: [
            defineField({
              name: "cells",
              title: "Клетки",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
          preview: {
            select: { cells: "cells" },
            prepare({ cells }) {
              return {
                title: cells?.join(" | ") || "Празен ред",
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title", rows: "rows" },
    prepare({ title, rows }) {
      const rowCount = rows?.length || 0;
      return {
        title: title || "Таблица",
        subtitle: `${rowCount} ${rowCount === 1 ? "ред" : "реда"}`,
      };
    },
  },
});
