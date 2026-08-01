import { RootDocument } from "@/components/layout/RootDocument";

/**
 * Studio branch root layout: the shared html/body shell without site
 * chrome, exactly as the pre-Z1 root layout served it. Authoring
 * infrastructure, not site experience.
 */
export default function StudioLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
