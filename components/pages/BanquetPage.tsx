import { BanquetFacts } from "@/components/sections/BanquetFacts";
import { BespokeMenus } from "@/components/sections/BespokeMenus";
import { DiningBand } from "@/components/sections/DiningBand";
import { getRestaurant } from "@/lib/content";
import { getStrings, type Locale } from "@/lib/i18n";

/**
 * `/banquet` (banquet mockup v6): hero band, Banquet Services facts and
 * occasions beside the photo slot, and the Bespoke Menus panel. Rendered by
 * the one-line `/banquet` and `/zh/banquet` route wrappers.
 */
export async function BanquetPage({ locale }: { locale: Locale }) {
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
