import type { Metadata } from "next";
import { getStrings, localePath, type Locale } from "./i18n";

/**
 * Metadata authored once for both locale trees (CLAUDE.md, Localization).
 * Every route wrapper, en and zh, calls the same builder, so titles,
 * descriptions, canonicals, and the hreflang pairs can never drift between
 * the trees. Hrefs are site-relative until a production domain ruling
 * lands a `metadataBase`.
 */

export type RouteKey =
  | "home"
  | "story"
  | "chef"
  | "menu"
  | "banquet"
  | "reserve";

const ROUTE_PATH: Record<RouteKey, string> = {
  home: "/",
  story: "/story",
  chef: "/chef",
  menu: "/menu",
  banquet: "/banquet",
  reserve: "/reserve",
};

function alternatesFor(route: RouteKey, locale: Locale) {
  const path = ROUTE_PATH[route];
  return {
    canonical: localePath(locale, path),
    languages: {
      en: localePath("en", path),
      "zh-Hant": localePath("zh", path),
      "x-default": localePath("en", path),
    },
  };
}

/** Layout-level metadata: the title template and site description. */
export function layoutMetadata(locale: Locale): Metadata {
  const { meta } = getStrings(locale);
  return {
    title: {
      default: meta.titleDefault,
      template: meta.titleTemplate,
    },
    description: meta.siteDescription,
  };
}

/** Page-level metadata with the canonical and hreflang pair for the route. */
export function pageMetadata(route: RouteKey, locale: Locale): Metadata {
  const { meta } = getStrings(locale);
  const page = route === "home" ? null : meta[route];
  return {
    ...(page
      ? { title: page.title, description: page.description }
      : { description: meta.siteDescription }),
    alternates: alternatesFor(route, locale),
  };
}
