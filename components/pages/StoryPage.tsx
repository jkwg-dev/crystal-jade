import { DiningBand } from "@/components/sections/DiningBand";
import { KitchenPhilosophy } from "@/components/sections/KitchenPhilosophy";
import { StoryHeritage } from "@/components/sections/StoryHeritage";
import { StoryRichmond } from "@/components/sections/StoryRichmond";
import { getRestaurant } from "@/lib/content";
import { getStrings, type Locale } from "@/lib/i18n";

/**
 * `/story` (story mockup v6): hero band, Heritage and the global footprint,
 * Why Richmond Why Now, and the Kitchen Philosophy cards. Rendered by the
 * one-line `/story` and `/zh/story` route wrappers.
 */
export async function StoryPage({ locale }: { locale: Locale }) {
  const strings = getStrings(locale).story;
  const restaurant = await getRestaurant(locale);
  return (
    <>
      <DiningBand
        eyebrow={strings.bandEyebrow}
        title={strings.bandTitle}
        frame={{
          tint: "emerald",
          kicker: strings.bandFrame.kicker,
          name: strings.bandFrame.name,
          tag: strings.bandFrame.tag,
        }}
        media={restaurant.bands?.story}
      />
      <StoryHeritage locale={locale} story={restaurant.story} />
      <StoryRichmond locale={locale} story={restaurant.story} />
      <KitchenPhilosophy locale={locale} cards={restaurant.story.philosophy} />
    </>
  );
}
