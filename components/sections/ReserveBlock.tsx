import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { FactRows } from "@/components/ui/FactRows";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { ReservationCta } from "@/components/ui/ReservationCta";
import { getStrings, localePath, type Locale } from "@/lib/i18n";
import type { ReservationTarget } from "@/lib/reservations";
import type { RestaurantReserve } from "@/types";
import { DiningHead } from "./DiningHead";

/**
 * Reserve page body (mockup `.res-grid`): contact rows (all placeholders as
 * configured), the Book a Table CTA (target resolved by the reservation
 * provider, the embed-placeholder anchor today), and the banquet crosslink.
 */
export function ReserveBlock({
  locale,
  reserve,
  bookTarget,
}: {
  locale: Locale;
  reserve: RestaurantReserve;
  bookTarget: ReservationTarget;
}) {
  const strings = getStrings(locale);
  const rows = [
    {
      label: strings.reserve.telephone,
      value: reserve.phone,
      detail: strings.reserve.placeholder,
    },
    {
      label: strings.reserve.wechat,
      value: reserve.wechat,
      detail: strings.reserve.placeholder,
    },
    {
      label: strings.reserve.hours,
      value: reserve.hours.join(" · "),
      detail: strings.reserve.placeholderDaily,
    },
    {
      label: strings.reserve.address,
      value: reserve.address.name,
      detail: reserve.address.line,
    },
  ];

  return (
    <section className="dine-sec">
      <div className="grid grid-cols-[1.05fr_1fr] items-center gap-[5vw] max-[900px]:grid-cols-1 max-[900px]:gap-11">
        <div>
          {/* The band-less pages promote the section head to the page h1. */}
          <DiningHead
            eyebrow={strings.reserve.eyebrow}
            title={strings.reserve.title}
            as="h1"
          />
          <Reveal as="div" delay={160}>
            <FactRows
              accent="jade"
              facts={rows}
              className="mt-[34px] mb-[38px]"
            />
          </Reveal>
          <Reveal as="div" delay={400} className="mt-2">
            <ReservationCta target={bookTarget}>
              {strings.chrome.bookATable}
            </ReservationCta>
          </Reveal>
          <Reveal as="div" delay={460}>
            <Link
              href={localePath(locale, "/banquet")}
              className="text-mist border-champagne/40 hover:text-ivory mt-[30px] inline-block border-b pb-1.5 text-[10px] leading-none font-medium tracking-[0.24em] uppercase transition-colors"
            >
              {strings.reserve.crosslink}
            </Link>
          </Reveal>
        </div>
        <Reveal as="div" delay={200} id="reservations">
          <PhotoFrame
            tint="jade"
            showMark
            label={{
              kicker: strings.reserve.embedFrame.kicker,
              name: strings.reserve.embedFrame.name,
            }}
            className="aspect-[16/10]"
          />
        </Reveal>
      </div>
    </section>
  );
}
