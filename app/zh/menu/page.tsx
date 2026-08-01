import { MenuPage } from "@/components/pages/MenuPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("menu", "zh");

export default function Page() {
  return <MenuPage locale="zh" />;
}
