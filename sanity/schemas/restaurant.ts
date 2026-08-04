import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * The restaurant singleton document, field-for-field with the `Restaurant`
 * domain type: copy, credentials, story, chef, banquet, reserve, socials.
 * Edited in place at a fixed document id; the Studio structure pins it and
 * the config filters its creation template.
 */
export const restaurant = defineType({
  name: "restaurant",
  title: "Restaurant",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "localeString",
      description: "Credential line under the hero H1.",
    }),
    defineField({
      name: "lede",
      title: "Lede",
      type: "localeText",
      description:
        "One-paragraph positioning line, reused in previews and metadata.",
    }),
    defineField({
      name: "intro",
      title: "Landing intro",
      type: "object",
      fields: [
        defineField({ name: "lede", title: "Lede", type: "localeText" }),
        defineField({
          name: "support",
          title: "Support",
          type: "localeText",
        }),
      ],
    }),
    defineField({
      name: "heroMedia",
      title: "Hero media",
      type: "siteImage",
      description:
        "Landing hero image. Leave empty until photography lands; the designed pending frame renders instead. Upload JPG or WebP, at least 2400 by 1400 pixels, wide landscape. Compose with generous room around the subject: phones show a much taller, tighter crop around the focal point.",
    }),
    defineField({
      name: "bands",
      title: "Page bands",
      type: "object",
      description:
        "Header band images for the story, menu, and banquet pages. Leave empty until photography lands; the designed pending frames render instead.",
      fields: [
        defineField({
          name: "story",
          title: "Story page band",
          type: "siteImage",
          description:
            "Upload JPG or WebP, at least 2400 by 900 pixels, very wide. Keep the subject near the focal point with room around it: phones crop this band to nearly a square.",
        }),
        defineField({
          name: "menu",
          title: "Menu page band",
          type: "siteImage",
          description:
            "Upload JPG or WebP, at least 2400 by 900 pixels, very wide. Keep the subject near the focal point with room around it: phones crop this band to nearly a square.",
        }),
        defineField({
          name: "banquet",
          title: "Banquet page band",
          type: "siteImage",
          description:
            "Upload JPG or WebP, at least 2400 by 900 pixels, very wide. Keep the subject near the focal point with room around it: phones crop this band to nearly a square.",
        }),
      ],
    }),
    defineField({
      name: "credentials",
      title: "Credentials",
      type: "array",
      of: [defineArrayMember({ type: "factRow" })],
      description: "Michelin / accolade / private-dining credential rows.",
    }),
    defineField({
      name: "privateDining",
      title: "Private dining",
      type: "object",
      fields: [
        defineField({ name: "copy", title: "Copy", type: "localeText" }),
        defineField({
          name: "facts",
          title: "Facts",
          type: "array",
          of: [defineArrayMember({ type: "factRow" })],
        }),
        defineField({
          name: "image",
          title: "Private dining room photograph",
          type: "siteImage",
          description:
            "Room photograph in the landing Private Dining panel. Leave empty until photography lands; the pending frame renders instead. Upload JPG or WebP, at least 1200 by 900 pixels (4:3). The frame keeps this ratio at every width; a little margin around the subject keeps the focal crop clean.",
        }),
      ],
    }),
    defineField({
      name: "story",
      title: "Story",
      type: "object",
      fields: [
        defineField({
          name: "heritage",
          title: "Heritage",
          type: "object",
          fields: [
            defineField({
              name: "lead",
              title: "Lead",
              type: "localeText",
            }),
            defineField({
              name: "body",
              title: "Body paragraphs",
              type: "array",
              of: [defineArrayMember({ type: "localeText" })],
            }),
            defineField({
              name: "image",
              title: "Heritage image",
              type: "siteImage",
              description:
                "Map or brand imagery beside the heritage narrative. Leave empty until photography lands; the pending frame renders instead. Upload JPG or WebP, at least 1200 by 825 pixels (16:11). The frame keeps this ratio at every width.",
            }),
          ],
        }),
        defineField({
          name: "footprint",
          title: "Footprint",
          type: "array",
          of: [defineArrayMember({ type: "localeString" })],
          description: "Global footprint stops, in display order.",
        }),
        defineField({
          name: "footprintNow",
          title: "Footprint now",
          type: "localeString",
          description: 'The highlighted closing stop, "Now, Richmond".',
        }),
        defineField({
          name: "richmond",
          title: "Why Richmond",
          type: "object",
          fields: [
            defineField({
              name: "lead",
              title: "Lead",
              type: "localeText",
            }),
            defineField({
              name: "body",
              title: "Body paragraphs",
              type: "array",
              of: [defineArrayMember({ type: "localeText" })],
            }),
            defineField({
              name: "image",
              title: "Richmond image",
              type: "siteImage",
              description:
                "Imagery beside the Why Richmond narrative. Leave empty until photography lands; the pending frame renders instead. Upload JPG or WebP, at least 1400 by 1750 pixels (4:5 portrait). Leave breathing room around the subject: below 900 pixels wide the frame crops to a square around the focal point.",
            }),
          ],
        }),
        defineField({
          name: "philosophy",
          title: "Kitchen philosophy",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "philosophyCard",
              title: "Philosophy card",
              fields: [
                defineField({
                  name: "title",
                  title: "Title",
                  type: "localeString",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "line",
                  title: "Line",
                  type: "localeText",
                }),
                defineField({
                  name: "image",
                  title: "Image",
                  type: "siteImage",
                  description:
                    "Concept image for this card. Upload JPG or WebP, at least 1200 by 825 pixels (16:11). The frame keeps this ratio at every width.",
                }),
              ],
              preview: { select: { title: "title.en", subtitle: "line.en" } },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "chef",
      title: "Chef",
      type: "object",
      fields: [
        defineField({
          name: "portrait",
          title: "Portrait",
          type: "siteImage",
          description:
            "Kitchen-setting portrait, explicitly not a studio headshot. Upload JPG or WebP, at least 1400 by 1750 pixels (4:5 portrait). Leave breathing room around the chef: below 900 pixels wide the frame crops to a square around the focal point.",
        }),
        defineField({
          name: "intro",
          title: "Intro heading",
          type: "localeText",
          description:
            'Heading line. Newlines break lines; asterisks mark the italic span, e.g. "A journey measured\\nin quiet *decades*."',
        }),
        defineField({
          name: "awards",
          title: "Awards",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "chefAward",
              title: "Award",
              fields: [
                defineField({
                  name: "title",
                  title: "Title",
                  type: "localeString",
                  description:
                    "Award titles keep their English forms in both locales (ruling of 2026-08-04) until official Chinese names arrive.",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "detail",
                  title: "Detail",
                  type: "localeString",
                  description:
                    'e.g. "Four consecutive years", "Individual Supreme Gold Award".',
                }),
                defineField({
                  name: "years",
                  title: "Years",
                  type: "localeString",
                  description:
                    'Ranges written "2022 to 2025" (zh: "2022 至 2025"), never a dash.',
                  validation: (rule) => rule.required(),
                }),
              ],
              preview: { select: { title: "title.en", subtitle: "years.en" } },
            }),
          ],
        }),
        defineField({ name: "bio", title: "Bio", type: "localeText" }),
        defineField({
          name: "moments",
          title: "Notable moments",
          type: "array",
          of: [defineArrayMember({ type: "localeString" })],
        }),
        defineField({
          name: "quote",
          title: "Quote",
          type: "localeText",
          description: "Placeholder pending the chef interview.",
        }),
      ],
    }),
    defineField({
      name: "banquet",
      title: "Banquet",
      type: "object",
      fields: [
        defineField({ name: "copy", title: "Copy", type: "localeText" }),
        defineField({
          name: "facts",
          title: "Facts",
          type: "array",
          of: [defineArrayMember({ type: "factRow" })],
        }),
        defineField({
          name: "occasions",
          title: "Occasions",
          type: "array",
          of: [defineArrayMember({ type: "localeString" })],
        }),
        defineField({
          name: "menus",
          title: "Bespoke menus",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "banquetMenu",
              title: "Menu format",
              fields: [
                defineField({
                  name: "label",
                  title: "Label",
                  type: "localeString",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "line",
                  title: "Line",
                  type: "localeString",
                }),
                defineField({
                  name: "detail",
                  title: "Detail",
                  type: "localeString",
                  description: 'e.g. "Pricing on enquiry".',
                }),
              ],
              preview: { select: { title: "label.en", subtitle: "line.en" } },
            }),
          ],
        }),
        defineField({
          name: "enquiryTarget",
          title: "Enquiry target",
          type: "string",
          description:
            "Enquire Now destination; the reserve page until a dedicated flow exists.",
        }),
        defineField({
          name: "tableImage",
          title: "Banquet table photograph",
          type: "siteImage",
          description:
            "Table photograph beside the Banquet Services narrative. Leave empty until photography lands; the pending frame renders instead. Upload JPG or WebP, at least 1400 by 1750 pixels (4:5 portrait). Leave breathing room around the setting: below 900 pixels wide the frame crops to a square around the focal point.",
        }),
        defineField({
          name: "courseImage",
          title: "Composed course photograph",
          type: "siteImage",
          description:
            "Course photograph in the Bespoke Menus panel. Leave empty until photography lands; the pending frame renders instead. Upload JPG or WebP, at least 1200 by 900 pixels (4:3). The frame keeps this ratio at every width; a little margin around the plate keeps the focal crop clean.",
        }),
      ],
    }),
    defineField({
      name: "reserve",
      title: "Reserve",
      type: "object",
      fields: [
        defineField({
          name: "openTableUrl",
          title: "OpenTable URL",
          type: "url",
          description: "Leave empty until the OpenTable account is live.",
          validation: (rule) => rule.uri({ scheme: ["https"] }),
        }),
        defineField({ name: "phone", title: "Phone", type: "string" }),
        defineField({ name: "wechat", title: "WeChat", type: "string" }),
        defineField({
          name: "hours",
          title: "Hours",
          type: "array",
          of: [defineArrayMember({ type: "localeString" })],
          description: 'Service windows, e.g. "Lunch 11:00 to 14:30".',
        }),
        defineField({
          name: "address",
          title: "Address",
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              description: "Venue brand name; stays English in both locales.",
            }),
            defineField({
              name: "line",
              title: "Line",
              type: "localeString",
              description:
                "Keeps its English form in both locales (ruling of 2026-08-04) until an official Chinese address arrives.",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "socials",
      title: "Socials",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "socialLink",
          title: "Social link",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "localeString",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "string",
              description: 'Stub "#" until the real profiles land.',
            }),
          ],
          preview: { select: { title: "label.en", subtitle: "url" } },
        }),
      ],
    }),
    defineField({
      name: "signatureDishes",
      title: "Signature dishes",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "dish" }] })],
      description:
        "The landing Signature Dishes trio, in landing order; drag to reorder.",
      validation: (rule) => rule.unique().max(3),
    }),
  ],
  preview: {
    select: { title: "name" },
  },
});
