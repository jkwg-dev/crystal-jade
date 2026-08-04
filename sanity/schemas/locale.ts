import { defineField, defineType } from "sanity";

/**
 * The two shared locale objects (CLAUDE.md, Localization): every
 * translatable prose field on the documents is one of these, `{ en, zh }`.
 * English is required (the site's base language and the fallback); the
 * Traditional Chinese input is optional, and a missing zh value serves the
 * en value at request time with a logged `[content]` line. Structural
 * fields (ids, hrefs, numbers, phone, handles) stay flat, and the dish
 * `zhName` stays a plain bilingual design field.
 */

export const localeString = defineType({
  name: "localeString",
  title: "Localized string",
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "zh",
      title: "Traditional Chinese",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "en", subtitle: "zh" },
  },
});

export const localeText = defineType({
  name: "localeText",
  title: "Localized text",
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "zh",
      title: "Traditional Chinese",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: { title: "en", subtitle: "zh" },
  },
});
