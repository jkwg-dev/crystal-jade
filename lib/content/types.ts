import type { DishCategory, PhotoTint } from "@/types";

/**
 * Authoring shapes for the typed config: the domain types with every
 * translatable prose field wrapped as a `{ en, zh }` locale object
 * (CLAUDE.md, Localization). Structural fields (ids, hrefs, numbers,
 * phone, handles, tints) stay flat, and `zhName` stays a plain bilingual
 * design field. `zh` is optional: a missing value resolves to `en` with a
 * logged `[content]` line (see `localize.ts`). These shapes never reach
 * components; the accessor resolves them to flat domain types per locale.
 */

export type Localized<T> = {
  en: T;
  zh?: T;
};

/** Localized label / value / detail row (credentials, facts). */
export type LocalizedFact = {
  label: Localized<string>;
  value: Localized<string>;
  detail?: Localized<string>;
};

export type RestaurantContent = {
  /** Brand name; stays English until an official Chinese name is ruled. */
  name: string;
  tagline: Localized<string>;
  lede: Localized<string>;
  intro: { lede: Localized<string>; support: Localized<string> };
  credentials: LocalizedFact[];
  privateDining: { copy: Localized<string>; facts: LocalizedFact[] };
  story: {
    heritage: { lead: Localized<string>; body: Localized<string>[] };
    footprint: Localized<string>[];
    footprintNow: Localized<string>;
    richmond: { lead: Localized<string>; body: Localized<string>[] };
    philosophy: { title: Localized<string>; line: Localized<string> }[];
  };
  chef: {
    intro: Localized<string>;
    awards: {
      title: Localized<string>;
      detail?: Localized<string>;
      years: Localized<string>;
    }[];
    bio: Localized<string>;
    moments: Localized<string>[];
    quote: Localized<string>;
  };
  banquet: {
    copy: Localized<string>;
    facts: LocalizedFact[];
    occasions: Localized<string>[];
    menus: {
      label: Localized<string>;
      line: Localized<string>;
      detail?: Localized<string>;
    }[];
    /** Internal route; the accessor applies the /zh prefix per locale. */
    enquiryTarget: string;
  };
  reserve: {
    openTableUrl?: string;
    phone: string;
    wechat: string;
    hours: Localized<string>[];
    /** Venue name stays English (brand); the line localizes. */
    address: { name: string; line: Localized<string> };
  };
  socials: { label: Localized<string>; url: string }[];
};

export type DishContent = {
  id: string;
  name: string;
  /** Plain bilingual design field, rendered identically on both locales. */
  zhName: string;
  line: Localized<string>;
  category: DishCategory;
  order: number;
  seasonal?: boolean;
  available?: boolean;
  frame: { tint: PhotoTint };
};
