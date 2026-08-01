import { Reveal } from "@/components/motion/Reveal";
import { DiningHero } from "@/components/sections/DiningHero";
import { PrivatePreview } from "@/components/sections/PrivatePreview";
import { SignatureTrio } from "@/components/sections/SignatureTrio";
import { getRestaurant, getSignatureDishes } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { getReservationProvider } from "@/lib/reservations";

/**
 * Landing page (dining mockup v6): full-screen hero, restaurant intro, the
 * Signature Dishes trio, and the Private Dining preview. Rendered by the
 * one-line `/` and `/zh` route wrappers.
 */
export async function HomePage({ locale }: { locale: Locale }) {
  const [restaurant, trio, bookTarget] = await Promise.all([
    getRestaurant(locale),
    getSignatureDishes(locale),
    getReservationProvider().book(locale),
  ]);
  return (
    <>
      <DiningHero
        locale={locale}
        title={restaurant.name}
        tagline={restaurant.tagline}
        media={restaurant.heroMedia}
      />

      <section id="intro" className="dine-sec text-center">
        <div className="mx-auto max-w-[820px]">
          <Reveal
            as="p"
            className="text-ivory/90 font-serif text-[clamp(1.45rem,2.6vw,2rem)] leading-[1.5]"
          >
            {restaurant.intro.lede}
          </Reveal>
          <Reveal
            as="p"
            delay={140}
            className="text-mist mx-auto mt-5 max-w-[620px] text-[14.5px]"
          >
            {restaurant.intro.support}
          </Reveal>
        </div>
      </section>

      <SignatureTrio locale={locale} dishes={trio} bookTarget={bookTarget} />
      <PrivatePreview locale={locale} privateDining={restaurant.privateDining} />
    </>
  );
}
