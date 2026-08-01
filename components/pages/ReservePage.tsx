import { ReserveBlock } from "@/components/sections/ReserveBlock";
import { getRestaurant } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { getReservationProvider } from "@/lib/reservations";

/**
 * `/reserve` (reserve mockup v6): contact rows, the Book a Table CTA, the
 * banquet crosslink, and the OpenTable embed placeholder. Rendered by the
 * one-line `/reserve` and `/zh/reserve` route wrappers.
 */
export async function ReservePage({ locale }: { locale: Locale }) {
  const [restaurant, bookTarget] = await Promise.all([
    getRestaurant(locale),
    getReservationProvider().reserve(locale),
  ]);
  return (
    <ReserveBlock
      locale={locale}
      reserve={restaurant.reserve}
      bookTarget={bookTarget}
    />
  );
}
