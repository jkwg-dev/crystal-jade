import { defineField, defineType } from "sanity";

/**
 * Label / value / optional detail row. Serves both `CredentialRow` and
 * `RestaurantFact`, which share this exact shape (hero credentials, private
 * dining facts, banquet facts).
 */
export const factRow = defineType({
  name: "factRow",
  title: "Fact row",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "detail",
      title: "Detail",
      type: "string",
      description: 'Optional second line, e.g. "Placeholder, confirm count".',
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "value" },
  },
});
