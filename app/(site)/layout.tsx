import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { DiningInfoStrip } from "@/components/sections/DiningInfoStrip";
import { getRestaurant, getSitePages } from "@/lib/content";
import { getStrings, localePath } from "@/lib/i18n";
import { getReservationProvider } from "@/lib/reservations";

/**
 * Published content only, time-based ISR (ruling 5): every content route
 * under the (site) group revalidates on this window. The Studio route sits
 * outside the group and is untouched.
 */
export const revalidate = 60;

export const metadata: Metadata = {
  title: {
    default: "Crystal Jade Palace",
    template: "%s · Crystal Jade Palace",
  },
  description:
    "Cantonese fine dining at GreenTee Richmond Center. The first Crystal Jade Palace in North America, led by a Michelin-starred kitchen.",
};

/**
 * Site shell: skip link, the sticky top header (hamburger menu at 1024px and
 * below), the jade page wash around a single centered content column, and
 * the restaurant details strip closing the page. Lives in the (site) route
 * group so the embedded Studio at /studio renders without site chrome.
 */
export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = "en";
  const strings = getStrings(locale);
  const [restaurant, bookTarget] = await Promise.all([
    getRestaurant(locale),
    getReservationProvider().book(locale),
  ]);
  return (
    <>
      <a href="#content" className="skip-link">
        {strings.chrome.skipToContent}
      </a>
      <div id="top" className="dine-bg pb-16">
        <SiteHeader
          locale={locale}
          homeHref={localePath(locale, "/")}
          pages={getSitePages(locale)}
          bookTarget={bookTarget}
          strings={strings.chrome.header}
        />
        <div className="dine-shell">
          <main id="content" tabIndex={-1} className="dine-main outline-none">
            {children}
          </main>
        </div>
        <DiningInfoStrip locale={locale} restaurant={restaurant} />
      </div>
    </>
  );
}
