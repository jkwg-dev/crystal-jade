import { DiningInfoStrip } from "@/components/sections/DiningInfoStrip";
import { getRestaurant, getSitePages } from "@/lib/content";
import { getStrings, localePath, type Locale } from "@/lib/i18n";
import { getReservationProvider } from "@/lib/reservations";
import { RootDocument } from "./RootDocument";
import { SiteHeader } from "./SiteHeader";

/**
 * The full site experience for one locale: the html/body shell via
 * `RootDocument`, skip link, the sticky top header (hamburger menu at
 * 1024px and below), the jade page wash around a single centered content
 * column, and the restaurant details strip closing the page. Both site
 * root layouts (en at the root, zh under /zh) are one-line delegations
 * into this component, so the two trees cannot drift. The Studio branch
 * renders `RootDocument` without this chrome.
 */
export async function SiteShell({
  locale,
  children,
}: Readonly<{ locale: Locale; children: React.ReactNode }>) {
  const strings = getStrings(locale);
  const [restaurant, bookTarget] = await Promise.all([
    getRestaurant(locale),
    getReservationProvider().book(locale),
  ]);
  return (
    <RootDocument locale={locale}>
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
    </RootDocument>
  );
}
