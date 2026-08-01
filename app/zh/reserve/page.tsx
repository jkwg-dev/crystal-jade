import { ReservePage } from "@/components/pages/ReservePage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("reserve", "zh");

export default function Page() {
  return <ReservePage locale="zh" />;
}
