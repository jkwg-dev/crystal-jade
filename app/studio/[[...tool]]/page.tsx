import type { Metadata } from "next";
import { metadata as studioMetadata, viewport } from "next-sanity/studio";
import { sanityConfigured } from "@/sanity/env";

/**
 * Embedded Sanity Studio: authoring infrastructure, not site experience.
 * Static shell (the Studio itself loads client-side), robots noindex, no
 * link to it anywhere in the site chrome, and any future sitemap excludes
 * it. Without the two public env vars, the route renders a plain notice
 * instead of loading `sanity.config.ts`, keeping the no-env extraction
 * build green.
 */

export const dynamic = "force-static";

export const metadata: Metadata = {
  ...studioMetadata,
  title: "Studio",
  robots: { index: false, follow: false },
};

export { viewport };

export default async function StudioPage() {
  if (!sanityConfigured) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <p className="text-ivory/70 max-w-md text-center text-sm">
          Studio is not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID and
          NEXT_PUBLIC_SANITY_DATASET, then rebuild.
        </p>
      </main>
    );
  }
  const { StudioApp } = await import("./StudioApp");
  return <StudioApp />;
}
