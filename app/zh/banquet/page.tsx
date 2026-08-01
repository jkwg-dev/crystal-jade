import { BanquetPage } from "@/components/pages/BanquetPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("banquet", "zh");

export default function Page() {
  return <BanquetPage locale="zh" />;
}
