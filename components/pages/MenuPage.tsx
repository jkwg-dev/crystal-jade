import { Reveal } from "@/components/motion/Reveal";
import { DiningBand } from "@/components/sections/DiningBand";
import { DishGrid } from "@/components/sections/DishGrid";
import { getDishes, getRestaurant } from "@/lib/content";
import { getStrings, type Locale } from "@/lib/i18n";

/**
 * `/menu` (menu mockup v6): hero band over the category-filtered dish grid.
 * Rendered by the one-line `/menu` and `/zh/menu` route wrappers.
 */
export async function MenuPage({ locale }: { locale: Locale }) {
  const strings = getStrings(locale).menu;
  const [dishes, restaurant] = await Promise.all([
    getDishes(locale),
    getRestaurant(locale),
  ]);
  return (
    <>
      <DiningBand
        eyebrow={strings.bandEyebrow}
        title={strings.bandTitle}
        line={strings.bandLine}
        frame={{
          tint: "champagne",
          kicker: strings.bandFrame.kicker,
          name: strings.bandFrame.name,
          tag: strings.bandFrame.tag,
        }}
        media={restaurant.bands?.menu}
      />
      <section className="dine-sec">
        <DishGrid dishes={dishes} strings={strings.grid} />
        <Reveal
          as="p"
          className="text-champagne-bright/85 mt-16 text-center font-serif text-base italic"
        >
          {strings.closing}
        </Reveal>
      </section>
    </>
  );
}
