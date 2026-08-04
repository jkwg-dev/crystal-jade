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
 * Sticky top header: mark left, the five page links, the EN / 中文 locale
 * toggle (two links, active locale in champagne with aria-current, targets
 * preserving the current path across the trees), and the Book a Table CTA
 * right. At 1024px and below the menu collapses to a hamburger opening the
 * full-screen MobileMenu. Active state is route-driven; nav data and
 * strings arrive via props from the layout (props-over-import).
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

  // Locale toggle targets: the same page in the other tree. Computed from
  // the pathname so deep pages map to their twin (/story to /zh/story).
  const onZh = pathname === "/zh" || pathname.startsWith("/zh/");
  const zhHref = onZh ? pathname : pathname === "/" ? "/zh" : `/zh${pathname}`;
  const enHref = pathname === "/zh" ? "/" : onZh ? pathname.slice(3) : pathname;

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

        <nav
          aria-label={strings.languageAria}
          className="flex gap-3 text-[9.5px] leading-none font-medium tracking-[0.16em] max-[1024px]:hidden"
        >
          <Link
            href={enHref}
            aria-current={locale === "en" ? "page" : undefined}
            className={cn(
              "-m-1 p-1 transition-colors",
              locale === "en"
                ? "text-champagne"
                : "text-mist/50 hover:text-ivory",
            )}
          >
            EN
          </Link>
          <Link
            href={zhHref}
            aria-current={locale === "zh" ? "page" : undefined}
            className={cn(
              "font-zh -m-1 p-1 transition-colors",
              locale === "zh"
                ? "text-champagne"
                : "text-mist/50 hover:text-ivory",
            )}
          >
            中文
          </Link>
        </nav>

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
        enHref={enHref}
        zhHref={zhHref}
        onClose={() => setOpen(false)}
        toggleRef={toggleRef}
      />
    </>
  );
}
