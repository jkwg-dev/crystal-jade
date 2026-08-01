import type { Metadata } from "next";
import { DiningBand } from "@/components/sections/DiningBand";
import { KitchenPhilosophy } from "@/components/sections/KitchenPhilosophy";
import { StoryHeritage } from "@/components/sections/StoryHeritage";
import { StoryRichmond } from "@/components/sections/StoryRichmond";
import { getRestaurant } from "@/lib/content";
import { getStrings } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "From a single Cantonese kitchen to one of Asia's most respected names in fine dining, now arriving in Richmond.",
};

/**
 * `/story` (story mockup v6): hero band, Heritage and the global footprint,
 * Why Richmond Why Now, and the Kitchen Philosophy cards.
 */
export default async function StoryPage() {
  const locale = "en";
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
