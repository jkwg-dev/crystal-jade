import { ChefIntro } from "@/components/sections/ChefIntro";
import { getRestaurant } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

/**
 * `/chef` (chef mockup v6): kitchen-setting portrait slot, the three
 * gold-gradient credential bars, His Story with Notable Moments, and the
 * In His Own Words quote block. Rendered by the one-line `/chef` and
 * `/zh/chef` route wrappers.
 */
export async function ChefPage({ locale }: { locale: Locale }) {
  const restaurant = await getRestaurant(locale);
  return <ChefIntro locale={locale} chef={restaurant.chef} />;
}
