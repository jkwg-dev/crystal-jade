"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemas";

/**
 * Embedded Studio configuration. Loaded only by the `/studio` route, and
 * only when the two public env vars are set; the route guards with a
 * dynamic import, so the no-env extraction build never evaluates this
 * module. The restaurant document is a singleton: the structure pins it to
 * a fixed document id and the template filter removes it from creation.
 */

if (!projectId || !dataset) {
  throw new Error(
    "sanity.config.ts loaded without NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET; the /studio route guard should have prevented this.",
  );
}

export default defineConfig({
  basePath: "/studio",
  title: "Crystal Jade Palace",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter((template) => template.schemaType !== "restaurant"),
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Restaurant")
              .id("restaurant")
              .child(
                S.document()
                  .schemaType("restaurant")
                  .documentId("restaurant"),
              ),
            S.divider(),
            S.listItem()
              .title("Dishes")
              .id("dishes")
              .schemaType("dish")
              .child(
                S.documentTypeList("dish")
                  .title("Dishes")
                  .defaultOrdering([{ field: "order", direction: "asc" }]),
              ),
          ]),
    }),
  ],
});
