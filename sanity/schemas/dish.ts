import { defineField, defineType } from "sanity";
import { PHOTO_TINT_CLASS } from "@/lib/tints";
import { DISH_CATEGORY_LABEL } from "@/types";

/**
 * Menu dish document, field-for-field with the `Dish` domain type. Dishes
 * are separate documents so seasonal menu updates stay pure content edits;
 * they feed the `/menu` grid (sorted by `order`) and the landing signature
 * trio (curated on the restaurant singleton).
 */

const categoryOptions = Object.entries(DISH_CATEGORY_LABEL).map(
  ([value, title]) => ({ title, value }),
);

const tintOptions = Object.keys(PHOTO_TINT_CLASS).map((tint) => ({
  title: tint.charAt(0).toUpperCase() + tint.slice(1),
  value: tint,
}));

export const dish = defineType({
  name: "dish",
  title: "Dish",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "zhName",
      title: "Chinese name",
      type: "string",
      description: "Rendered in the system Chinese type stack.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      description: "Stable identifier; generate from the name and leave alone.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "line",
      title: "Line",
      type: "string",
      description:
        'One line under the name, e.g. "Lacquered skin, carved to order."',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: categoryOptions, layout: "radio" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Menu order",
      type: "number",
      description: "Position in the menu grid; lower numbers first.",
      validation: (rule) => rule.required().integer().positive(),
    }),
    defineField({
      name: "image",
      title: "Photograph",
      type: "siteImage",
      description:
        "Editorial dish photo. Leave empty until photography lands; the designed pending frame renders instead. Upload JPG or WebP, at least 1400 by 875 pixels (16:10). The same photo also appears in the landing Signature trio at a taller 4:5 crop (4:3 on phones), so frame the dish with vertical headroom around the focal point.",
    }),
    defineField({
      name: "seasonal",
      title: "Seasonal",
      type: "boolean",
    }),
    defineField({
      name: "available",
      title: "Available",
      type: "boolean",
    }),
    defineField({
      name: "frame",
      title: "Pending frame",
      type: "object",
      description:
        "The designed placeholder frame shown until the photograph is filled.",
      fields: [
        defineField({
          name: "tint",
          title: "Tint",
          type: "string",
          options: { list: tintOptions },
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Menu order",
      name: "menuOrder",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "zhName" },
  },
});
