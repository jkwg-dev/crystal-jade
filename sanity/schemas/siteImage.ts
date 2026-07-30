import { defineField, defineType } from "sanity";

/**
 * The shared image shape for every photo slot. One upload serves the desktop
 * ratio and the mobile ratios: every slot renders through breakpoint-aware
 * frames, and the crop follows the editor's focal point via hotspot. Maps to
 * the `InterimImage` domain type; `mobileImage` is the reserved art-directed
 * override seam and stays empty in normal use.
 */
export const siteImage = defineType({
  name: "siteImage",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      description:
        "Describes the image for screen readers. Decorative placements may render it empty at the call site.",
    }),
    defineField({
      name: "mobileImage",
      title: "Mobile override image",
      type: "image",
      options: { hotspot: true },
      description:
        "Last resort only, for slots where focal cropping of the single upload is not enough (composed heroes, in-image text). Leave empty everywhere else; the main image with its hotspot serves both the desktop and mobile ratios.",
    }),
  ],
});
