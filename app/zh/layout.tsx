import { SiteShell } from "@/components/layout/SiteShell";
import { layoutMetadata } from "@/lib/seo";

/**
 * Traditional Chinese site root layout under /zh: a one-line delegation
 * into the shared `SiteShell` (CLAUDE.md, Localization), `html lang`
 * zh-Hant. Same ISR window as the en tree.
 */
export const revalidate = 60;

export const metadata = layoutMetadata("zh");

export default function ZhSiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SiteShell locale="zh">{children}</SiteShell>;
}
