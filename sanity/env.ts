/**
 * The two public Sanity identifiers, read as literal `process.env`
 * expressions so Next.js can inline them into client bundles (the Studio
 * config is a client module). This module imports nothing from Sanity
 * packages, so code outside the sanctioned Sanity zones (`lib/content.ts`)
 * may share these reads without touching Sanity code.
 */

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

/** Pinned API version for every content query; bump deliberately. */
export const apiVersion = "2026-07-01";

/**
 * Both identifiers present: the embedded Studio (and, once the accessor
 * switch lands, the Sanity content backing) is on. Either absent: the site
 * serves the typed config in `lib/content/` and `/studio` renders a plain
 * unconfigured notice, keeping the no-env extraction build green.
 */
export const sanityConfigured = Boolean(projectId && dataset);
