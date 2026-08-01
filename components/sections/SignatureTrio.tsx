import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { ReservationCta } from "@/components/ui/ReservationCta";
import { SiteImage } from "@/components/ui/SiteImage";
import { getStrings, localePath, type Locale } from "@/lib/i18n";
import type { ReservationTarget } from "@/lib/reservations";
import { DINING_SLOT_TINTS } from "@/lib/tints";
import type { Dish } from "@/types";
import { DiningHead } from "./DiningHead";

/**
 * Signature Dishes trio on the landing page (mockup `.trio`): three name-only
 * dish frames and the Book a Table / View the Full Menu CTAs.
 */
export function SignatureTrio({
  locale,
  dishes,
  bookTarget,
}: {
  locale: Locale;
  dishes: Dish[];
  bookTarget: ReservationTarget;
}) {
  const strings = getStrings(locale);
  return (
    <section className="dine-sec">
      <DiningHead
        eyebrow={strings.home.trioEyebrow}
        title={strings.home.trioTitle}
        className="mb-12"
      />

      <div className="grid grid-cols-3 gap-7 max-[760px]:grid-cols-1 max-[760px]:gap-10">
        {dishes.map((dish, index) => (
          <Reveal as="figure" key={dish.id} delay={index * 120}>
            <PhotoFrame
              tint={DINING_SLOT_TINTS[index % DINING_SLOT_TINTS.length]}
              label={
                dish.image
                  ? undefined
                  : { kicker: strings.home.trioPhotoKicker, name: dish.name }
              }
              className="aspect-[4/5] max-[760px]:aspect-[4/3]"
            >
              {dish.image && (
                <SiteImage
                  image={dish.image}
                  alt=""
                  fill
                  sizes="(max-width: 760px) 88vw, 30vw"
                  lqip={dish.image.lqip}
                  className="z-[1] object-cover"
                />
              )}
            </PhotoFrame>
            <figcaption className="mt-[18px] text-center font-serif text-[20px] font-medium tracking-[0.02em]">
              {dish.name}
            </figcaption>
          </Reveal>
        ))}
      </div>

      <Reveal as="div" className="mt-14 flex flex-wrap justify-center gap-3.5">
        <ReservationCta target={bookTarget}>
          {strings.chrome.bookATable}
        </ReservationCta>
        <Button href={localePath(locale, "/menu")} variant="ghost">
          {strings.home.viewFullMenu}
        </Button>
      </Reveal>
    </section>
  );
}
