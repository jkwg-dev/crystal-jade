"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

/**
 * Client boundary for the embedded Studio. Imported dynamically by the
 * route only when the two public Sanity env vars are set, so the no-env
 * extraction build never evaluates the Studio config.
 */
export function StudioApp() {
  return <NextStudio config={config} />;
}
