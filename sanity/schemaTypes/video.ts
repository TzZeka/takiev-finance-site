import { defineType, defineField } from "sanity";

export default defineType({
  name: "video",
  title: "Видео",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Заглавие",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "platform",
      title: "Платформа",
      type: "string",
      options: {
        list: [
          { title: "YouTube", value: "youtube" },
          { title: "TikTok", value: "tiktok" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "videoId",
      title: "Video ID",
      type: "string",
      description: "ID на видеото за embed (за YouTube: v=..., за TikTok: последната част от URL)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "description",
      title: "Описание",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "publishedAt",
      title: "Дата на публикуване",
      type: "datetime",
    }),
    defineField({
      name: "featured",
      title: "Показва се на началната страница",
      type: "boolean",
      initialValue: false,
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
      title: "title",
      media: "thumbnail",
      platform: "platform",
    },
    prepare({ title, media, platform }) {
      return {
        title,
        media,
        subtitle: platform,
      };
    },
  },
});
