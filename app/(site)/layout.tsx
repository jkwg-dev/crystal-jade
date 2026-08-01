import { SiteShell } from "@/components/layout/SiteShell";
import { layoutMetadata } from "@/lib/seo";

/**
 * English site root layout: a one-line delegation into the shared
 * `SiteShell` (CLAUDE.md, Localization). Published content only,
 * time-based ISR (ruling 5): every content route under the group
 * revalidates on this window. The Studio branch has its own root layout.
 */
export const revalidate = 60;

export const metadata = layoutMetadata("en");

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SiteShell locale="en">{children}</SiteShell>;
}
