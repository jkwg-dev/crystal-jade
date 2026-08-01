"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { CrystalJadeMark } from "@/components/sections/CrystalJadeMark";
import { ReservationCta } from "@/components/ui/ReservationCta";
import type { HeaderStrings, Locale } from "@/lib/i18n";
import type { ReservationTarget } from "@/lib/reservations";
import { cn } from "@/lib/utils";
import type { NavLink } from "@/types";
import { MobileMenu } from "./MobileMenu";

/**
 * Sticky top header: mark left, the five page links, the static EN / 中文
 * indicator (the active locale carries champagne; the real toggle is the Z3
 * phase), and the Book a Table CTA right. At 1024px and below the menu
 * collapses to a hamburger opening the full-screen MobileMenu. Active state
 * is route-driven; nav data and strings arrive via props from the layout
 * (props-over-import).
 */
export function SiteHeader({
  locale,
  homeHref,
  pages,
  bookTarget,
  strings,
}: {
  locale: Locale;
  homeHref: string;
  pages: NavLink[];
  bookTarget: ReservationTarget;
  strings: HeaderStrings;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Route change closes the drawer (state adjusted during render, covering
  // back/forward navigation as well as link clicks).
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  // The drawer is a sibling of <header>, not a child: the header's
  // backdrop-filter makes it a containing block for fixed descendants, which
  // would trap the full-screen panel inside the bar.
  return (
    <>
      <header className="site-header">
        <CrystalJadeMark href={homeHref} size="sm" rule={false} />

        <nav
          aria-label={strings.navAria}
          className="ml-auto flex max-[1024px]:hidden"
        >
          {pages.map((page) => {
            const active = pathname === page.href;
            return (
              <Link
                key={page.href}
                href={page.href}
                aria-current={active ? "page" : undefined}
                className={cn("sh-link", active && "active")}
              >
                <span>{page.label}</span>
              </Link>
            );
          })}
        </nav>

        <p className="text-mist/50 flex cursor-default gap-3 text-[9.5px] leading-none font-medium tracking-[0.16em] max-[1024px]:hidden">
          <span className={cn(locale === "en" && "text-champagne")}>EN</span>
          <span className={cn("font-zh", locale === "zh" && "text-champagne")}>
            中文
          </span>
        </p>

        <ReservationCta
          target={bookTarget}
          size="sm"
          className="max-[1024px]:hidden"
        >
          {strings.bookATable}
        </ReservationCta>

        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls="cj-mobile-menu"
          aria-label={open ? strings.closeMenu : strings.openMenu}
          onClick={() => setOpen((value) => !value)}
          className="sh-burger ml-auto min-[1025px]:hidden"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </header>

      <MobileMenu
        id="cj-mobile-menu"
        open={open}
        locale={locale}
        pages={pages}
        bookTarget={bookTarget}
        strings={strings}
        onClose={() => setOpen(false)}
        toggleRef={toggleRef}
      />
    </>
  );
}
