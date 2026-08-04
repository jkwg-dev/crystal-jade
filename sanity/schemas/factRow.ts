import { defineField, defineType } from "sanity";

/**
 * Label / value / optional detail row. Serves both `CredentialRow` and
 * `RestaurantFact`, which share this exact shape (hero credentials, private
 * dining facts, banquet facts). All three parts are editor-facing prose and
 * localize as locale objects.
 */
export const factRow = defineType({
  name: "factRow",
  title: "Fact row",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "value",
      title: "Value",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "detail",
      title: "Detail",
      type: "localeString",
      description: 'Optional second line, e.g. "Placeholder, confirm count".',
    }),
  ],
  preview: {
    select: { title: "label.en", subtitle: "value.en" },
  },
});
