import { ChefPage } from "@/components/pages/ChefPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("chef", "zh");

export default function Page() {
  return <ChefPage locale="zh" />;
}
