import type { Metadata } from "next";
import { BanquetFacts } from "@/components/sections/BanquetFacts";
import { BespokeMenus } from "@/components/sections/BespokeMenus";
import { DiningBand } from "@/components/sections/DiningBand";
import { getRestaurant } from "@/lib/content";
import { getStrings } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Banquet",
  description:
    "Private rooms, dedicated service, and bespoke banquet menus composed for the table.",
};

/**
 * `/banquet` (banquet mockup v6): hero band, Banquet Services facts and
 * occasions beside the photo slot, and the Bespoke Menus panel.
 */
export default async function BanquetPage() {
  const locale = "en";
  const strings = getStrings(locale).banquet;
  const restaurant = await getRestaurant(locale);
  return (
    <>
      <DiningBand
        eyebrow={strings.bandEyebrow}
        title={strings.bandTitle}
        line={strings.bandLine}
        frame={{
          tint: "emerald",
          kicker: strings.bandFrame.kicker,
          name: strings.bandFrame.name,
          tag: strings.bandFrame.tag,
        }}
        media={restaurant.bands?.banquet}
      />
      <BanquetFacts locale={locale} banquet={restaurant.banquet} />
      <BespokeMenus locale={locale} banquet={restaurant.banquet} />
    </>
  );
}
