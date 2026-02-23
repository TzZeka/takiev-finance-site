import { defineType, defineField } from "sanity";

export default defineType({
  name: "teamMember",
  title: "Член на екипа",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Име",
      type: "string",
      validation: (Rule) => Rule.required().error("Името е задължително"),
    }),
    defineField({
      name: "role",
      title: "Длъжност",
      type: "string",
      validation: (Rule) => Rule.required().error("Длъжността е задължителна"),
    }),
    defineField({
      name: "roleType",
      title: "Тип роля",
      type: "string",
      options: {
        list: [
          { title: "Ръководител", value: "leader" },
          { title: "Оперативен счетоводител", value: "operative" },
        ],
        layout: "radio",
      },
      initialValue: "operative",
      validation: (Rule) => Rule.required().error("Изберете тип роля"),
    }),
    defineField({
      name: "education",
      title: "Образование",
      type: "string",
      validation: (Rule) => Rule.required().error("Образованието е задължително"),
    }),
    defineField({
      name: "image",
      title: "Снимка",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error("Снимката е задължителна"),
    }),
    defineField({
      name: "bio",
      title: "Кратка биография",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().error("Биографията е задължителна"),
    }),
    defineField({
      name: "order",
      title: "Подредба",
      type: "number",
      description: "По-малко число = по-напред. Ръководителите винаги са отгоре.",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "По подредба",
      name: "orderAsc",
      by: [
        { field: "roleType", direction: "asc" },
        { field: "order", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      roleType: "roleType",
      media: "image",
    },
    prepare({ title, subtitle, roleType, media }) {
      return {
        title,
        subtitle: `${roleType === "leader" ? "⭐ Ръководител" : "Оперативен"} — ${subtitle}`,
        media,
      };
    },
  },
});
