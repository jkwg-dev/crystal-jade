import imageUrlBuilder from "@sanity/image-url";
import { createClient, groq, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId, sanityConfigured } from "@/sanity/env";
import { localePath, type Locale } from "@/lib/i18n";
import { PHOTO_TINT_CLASS } from "@/lib/tints";
import type {
  Dish,
  DishCategory,
  InterimImage,
  NavLink,
  PhotoTint,
  Restaurant,
} from "@/types";
import { DISH_CATEGORY_LABEL } from "@/types";
import { dishes as configDishes, signatureDishes as configSignatureDishes } from "./content/dishes";
import { localizeDish, localizeRestaurant, pick } from "./content/localize";
import { restaurant as configRestaurant } from "./content/restaurant";
import type { Localized } from "./content/types";

/**
 * The single content accessor for the Crystal Jade site.
 *
 * Every piece of page content flows through this module: components receive
 * it via props or call a getter in a Server Component, and never hold copy,
 * nav items, hours, or menu data inline.
 *
 * This is one of the two sanctioned Sanity zones (CLAUDE.md): the client,
 * the GROQ queries, and the CMS-to-domain mapping live here and nowhere
 * else; no CMS type escapes this module. The switch is binary per request
 * and per getter, never merged: with the two public env vars set, content
 * comes from the Sanity dataset (published perspective, CDN, 60 second
 * revalidation); with either unset, or when a fetch fails or returns empty
 * at request time, the getter logs and serves the typed config in
 * `lib/content/` exactly as it did before Sanity.
 */

/** The five page links on the rail and chips, in rail order. */
const SITE_PAGES: { label: Localized<string>; path: string }[] = [
  { label: { en: "Our Story", zh: "我們的故事" }, path: "/story" },
  { label: { en: "The Chef", zh: "主廚" }, path: "/chef" },
  { label: { en: "Menu", zh: "菜單" }, path: "/menu" },
  { label: { en: "Banquet", zh: "宴會" }, path: "/banquet" },
  { label: { en: "Reserve", zh: "訂座" }, path: "/reserve" },
];

/** Locale-resolved nav links: zh labels over /zh-prefixed hrefs. */
export function getSitePages(locale: Locale): NavLink[] {
  return SITE_PAGES.map((page) => ({
    label: pick(page.label, locale, `nav ${page.path}`),
    href: localePath(locale, page.path),
  }));
}

/**
 * Book a Table target: the reserve page. Consumed only by the link provider
 * in `lib/reservations.ts`; components never read it directly, they render
 * `ReservationCta` with a provider-resolved target.
 */
export const BOOK_A_TABLE_HREF = "/reserve";

/* ------------------------------------------------------------------ */
/* Sanity internals: client, queries, raw CMS shapes, domain mapping. */
/* ------------------------------------------------------------------ */

const client: SanityClient | null =
  sanityConfigured && projectId && dataset
    ? createClient({ projectId, dataset, apiVersion, useCdn: true })
    : null;

const builder =
  projectId && dataset ? imageUrlBuilder({ projectId, dataset }) : null;

/** Published-only, time-based revalidation (ruling 5; no draft mode). */
const FETCH_OPTIONS = { next: { revalidate: 60 } };

/**
 * Builder target widths per frame class, sized for the widest rendering of
 * each slot at retina density; `next/image` scales down from these via each
 * call site's `sizes`. Dish photos take the portrait width because one
 * upload serves both the 16:10 menu card and the taller landing trio crop.
 */
const IMAGE_WIDTH = {
  hero: 2000,
  portrait: 1400,
  card: 1200,
} as const;

const IMAGE_QUALITY = 80;

const IMAGE_FIELDS = /* groq */ `
  asset,
  crop,
  hotspot,
  alt,
  "metadata": asset->metadata{ dimensions{ width, height }, lqip }
`;

const DISH_FIELDS = /* groq */ `
  "id": slug.current,
  name,
  zhName,
  line,
  category,
  order,
  image{ ${IMAGE_FIELDS} },
  seasonal,
  available,
  frame{ tint }
`;

const RESTAURANT_QUERY = groq`*[_id == "restaurant"][0]{
  name,
  tagline,
  lede,
  intro{ lede, support },
  heroMedia{ ${IMAGE_FIELDS} },
  bands{
    story{ ${IMAGE_FIELDS} },
    menu{ ${IMAGE_FIELDS} },
    banquet{ ${IMAGE_FIELDS} }
  },
  credentials[]{ label, value, detail },
  privateDining{ copy, facts[]{ label, value, detail }, image{ ${IMAGE_FIELDS} } },
  story{
    heritage{ lead, body, image{ ${IMAGE_FIELDS} } },
    footprint,
    footprintNow,
    richmond{ lead, body, image{ ${IMAGE_FIELDS} } },
    philosophy[]{ title, line, image{ ${IMAGE_FIELDS} } }
  },
  chef{
    portrait{ ${IMAGE_FIELDS} },
    intro,
    awards[]{ title, detail, years },
    bio,
    moments,
    quote
  },
  banquet{
    copy,
    facts[]{ label, value, detail },
    occasions,
    menus[]{ label, line, detail },
    enquiryTarget,
    tableImage{ ${IMAGE_FIELDS} },
    courseImage{ ${IMAGE_FIELDS} }
  },
  reserve{ openTableUrl, phone, wechat, hours, address{ name, line } },
  socials[]{ label, url }
}`;

const DISHES_QUERY = groq`*[_type == "dish"] | order(order asc){ ${DISH_FIELDS} }`;

const SIGNATURE_QUERY = groq`*[_id == "restaurant"][0].signatureDishes[]->{ ${DISH_FIELDS} }`;

type SanityImage = {
  asset?: { _ref: string } | null;
  crop?: { top: number; bottom: number; left: number; right: number } | null;
  hotspot?: { x: number; y: number } | null;
  alt?: string | null;
  metadata?: {
    dimensions?: { width: number; height: number } | null;
    lqip?: string | null;
  } | null;
};

/** The `{ en, zh }` locale objects (localeString / localeText documents). */
type SanityLocaleValue = { en?: string | null; zh?: string | null };

type SanityFactRow = {
  label?: SanityLocaleValue | null;
  value?: SanityLocaleValue | null;
  detail?: SanityLocaleValue | null;
};

type SanityDish = {
  id?: string | null;
  name?: string | null;
  zhName?: string | null;
  line?: SanityLocaleValue | null;
  category?: string | null;
  order?: number | null;
  image?: SanityImage | null;
  seasonal?: boolean | null;
  available?: boolean | null;
  frame?: { tint?: string | null } | null;
};

type SanityLeadBody = {
  lead?: SanityLocaleValue | null;
  body?: SanityLocaleValue[] | null;
  image?: SanityImage | null;
};

type SanityRestaurant = {
  name?: string | null;
  tagline?: SanityLocaleValue | null;
  lede?: SanityLocaleValue | null;
  intro?: {
    lede?: SanityLocaleValue | null;
    support?: SanityLocaleValue | null;
  } | null;
  heroMedia?: SanityImage | null;
  bands?: {
    story?: SanityImage | null;
    menu?: SanityImage | null;
    banquet?: SanityImage | null;
  } | null;
  credentials?: SanityFactRow[] | null;
  privateDining?: {
    copy?: SanityLocaleValue | null;
    facts?: SanityFactRow[] | null;
    image?: SanityImage | null;
  } | null;
  story?: {
    heritage?: SanityLeadBody | null;
    footprint?: SanityLocaleValue[] | null;
    footprintNow?: SanityLocaleValue | null;
    richmond?: SanityLeadBody | null;
    philosophy?: {
      title?: SanityLocaleValue | null;
      line?: SanityLocaleValue | null;
      image?: SanityImage | null;
    }[] | null;
  } | null;
  chef?: {
    portrait?: SanityImage | null;
    intro?: SanityLocaleValue | null;
    awards?: {
      title?: SanityLocaleValue | null;
      detail?: SanityLocaleValue | null;
      years?: SanityLocaleValue | null;
    }[] | null;
    bio?: SanityLocaleValue | null;
    moments?: SanityLocaleValue[] | null;
    quote?: SanityLocaleValue | null;
  } | null;
  banquet?: {
    copy?: SanityLocaleValue | null;
    facts?: SanityFactRow[] | null;
    occasions?: SanityLocaleValue[] | null;
    menus?: {
      label?: SanityLocaleValue | null;
      line?: SanityLocaleValue | null;
      detail?: SanityLocaleValue | null;
    }[] | null;
    enquiryTarget?: string | null;
    tableImage?: SanityImage | null;
    courseImage?: SanityImage | null;
  } | null;
  reserve?: {
    openTableUrl?: string | null;
    phone?: string | null;
    wechat?: string | null;
    hours?: SanityLocaleValue[] | null;
    address?: {
      name?: string | null;
      line?: SanityLocaleValue | null;
    } | null;
  } | null;
  socials?: {
    label?: SanityLocaleValue | null;
    url?: string | null;
  }[] | null;
};

/** Required-field guard: a missing essential aborts the mapping, and the
 * thrown error routes the request to the typed config fallback. */
function req<T>(value: T | null | undefined, label: string): T {
  if (value === null || value === undefined) {
    throw new Error(`missing ${label}`);
  }
  return value;
}

/**
 * Resolve a required locale object per locale. The en value is essential
 * (missing en aborts to the config fallback via `req`); a missing zh
 * resolves to the document's en value with the same logged `[content]`
 * line as the config resolver's `pick`.
 */
function locValue(
  value: SanityLocaleValue | null | undefined,
  locale: Locale,
  label: string,
): string {
  const section = req(value, label);
  if (locale === "zh") {
    if (section.zh !== null && section.zh !== undefined) return section.zh;
    console.error(`[content] missing zh for ${label}; serving the en value.`);
  }
  return req(section.en, `${label}.en`);
}

/** Optional locale object: absent stays absent, present resolves. */
function locOptional(
  value: SanityLocaleValue | null | undefined,
  locale: Locale,
  label: string,
): string | undefined {
  return value === null || value === undefined
    ? undefined
    : locValue(value, locale, label);
}

function isDishCategory(value: string): value is DishCategory {
  return value in DISH_CATEGORY_LABEL;
}

function isPhotoTint(value: string): value is PhotoTint {
  return value in PHOTO_TINT_CLASS;
}

const percent = (fraction: number) => `${Math.round(fraction * 10000) / 100}%`;

/**
 * Sanity image to the component-facing `InterimImage`. The URL comes from
 * the image-url builder, which applies the editor's crop rect; the hotspot
 * maps to CSS object-position so the Phase 2b per-breakpoint frame ratios
 * (PhotoFrame CSS, `object-cover`) keep the focal point in view. No asset
 * (or no usable metadata) returns undefined and the designed pending frame
 * renders exactly as before.
 */
function mapImage(
  image: SanityImage | null | undefined,
  targetWidth: number,
): InterimImage | undefined {
  if (!image?.asset || !builder) return undefined;
  const dimensions = image.metadata?.dimensions;
  if (!dimensions) return undefined;
  const src = builder
    .image({
      asset: image.asset,
      crop: image.crop ?? undefined,
      hotspot: image.hotspot ?? undefined,
    })
    .width(targetWidth)
    .fit("max")
    .quality(IMAGE_QUALITY)
    .auto("format")
    .url();
  return {
    src,
    alt: image.alt ?? "",
    width: dimensions.width,
    height: dimensions.height,
    position: image.hotspot
      ? `${percent(image.hotspot.x)} ${percent(image.hotspot.y)}`
      : undefined,
    lqip: image.metadata?.lqip ?? undefined,
  };
}

function mapFactRows(
  rows: SanityFactRow[] | null | undefined,
  locale: Locale,
  label: string,
) {
  return req(rows, label).map((row, index) => ({
    label: locValue(row.label, locale, `${label}[${index}].label`),
    value: locValue(row.value, locale, `${label}[${index}].value`),
    detail: locOptional(row.detail, locale, `${label}[${index}].detail`),
  }));
}

function mapDish(raw: SanityDish, locale: Locale): Dish {
  const id = req(raw.id, "dish slug");
  const category = req(raw.category, `dish ${id} category`);
  if (!isDishCategory(category)) {
    throw new Error(`dish ${id} has unknown category "${category}"`);
  }
  const tint = req(raw.frame?.tint, `dish ${id} frame tint`);
  if (!isPhotoTint(tint)) {
    throw new Error(`dish ${id} has unknown frame tint "${tint}"`);
  }
  return {
    id,
    name: req(raw.name, `dish ${id} name`),
    zhName: req(raw.zhName, `dish ${id} zhName`),
    line: locValue(raw.line, locale, `dish ${id} line`),
    category,
    order: req(raw.order, `dish ${id} order`),
    image: mapImage(raw.image, IMAGE_WIDTH.portrait),
    seasonal: raw.seasonal ?? undefined,
    available: raw.available ?? undefined,
    frame: { tint },
  };
}

function mapLeadBody(
  raw: SanityLeadBody | null | undefined,
  locale: Locale,
  label: string,
  imageWidth: number,
) {
  const section = req(raw, label);
  return {
    lead: locValue(section.lead, locale, `${label}.lead`),
    body: req(section.body, `${label}.body`).map((paragraph, index) =>
      locValue(paragraph, locale, `${label}.body[${index}]`),
    ),
    image: mapImage(section.image, imageWidth),
  };
}

function mapRestaurant(raw: SanityRestaurant, locale: Locale): Restaurant {
  const intro = req(raw.intro, "intro");
  const privateDining = req(raw.privateDining, "privateDining");
  const story = req(raw.story, "story");
  const chef = req(raw.chef, "chef");
  const banquet = req(raw.banquet, "banquet");
  const reserve = req(raw.reserve, "reserve");
  const address = req(reserve.address, "reserve.address");
  return {
    name: req(raw.name, "name"),
    tagline: locValue(raw.tagline, locale, "tagline"),
    lede: locValue(raw.lede, locale, "lede"),
    intro: {
      lede: locValue(intro.lede, locale, "intro.lede"),
      support: locValue(intro.support, locale, "intro.support"),
    },
    heroMedia: mapImage(raw.heroMedia, IMAGE_WIDTH.hero),
    bands: raw.bands
      ? {
          story: mapImage(raw.bands.story, IMAGE_WIDTH.hero),
          menu: mapImage(raw.bands.menu, IMAGE_WIDTH.hero),
          banquet: mapImage(raw.bands.banquet, IMAGE_WIDTH.hero),
        }
      : undefined,
    credentials: mapFactRows(raw.credentials, locale, "credentials"),
    privateDining: {
      copy: locValue(privateDining.copy, locale, "privateDining.copy"),
      facts: mapFactRows(privateDining.facts, locale, "privateDining.facts"),
      image: mapImage(privateDining.image, IMAGE_WIDTH.card),
    },
    story: {
      heritage: mapLeadBody(
        story.heritage,
        locale,
        "story.heritage",
        IMAGE_WIDTH.card,
      ),
      footprint: req(story.footprint, "story.footprint").map((stop, index) =>
        locValue(stop, locale, `story.footprint[${index}]`),
      ),
      footprintNow: locValue(story.footprintNow, locale, "story.footprintNow"),
      richmond: mapLeadBody(
        story.richmond,
        locale,
        "story.richmond",
        IMAGE_WIDTH.portrait,
      ),
      philosophy: req(story.philosophy, "story.philosophy").map(
        (card, index) => ({
          title: locValue(card.title, locale, `philosophy[${index}].title`),
          line: locValue(card.line, locale, `philosophy[${index}].line`),
          image: mapImage(card.image, IMAGE_WIDTH.card),
        }),
      ),
    },
    chef: {
      portrait: mapImage(chef.portrait, IMAGE_WIDTH.portrait),
      intro: locValue(chef.intro, locale, "chef.intro"),
      awards: req(chef.awards, "chef.awards").map((award, index) => ({
        title: locValue(award.title, locale, `chef.awards[${index}].title`),
        detail: locOptional(
          award.detail,
          locale,
          `chef.awards[${index}].detail`,
        ),
        years: locValue(award.years, locale, `chef.awards[${index}].years`),
      })),
      bio: locValue(chef.bio, locale, "chef.bio"),
      moments: req(chef.moments, "chef.moments").map((moment, index) =>
        locValue(moment, locale, `chef.moments[${index}]`),
      ),
      quote: locValue(chef.quote, locale, "chef.quote"),
    },
    banquet: {
      copy: locValue(banquet.copy, locale, "banquet.copy"),
      facts: mapFactRows(banquet.facts, locale, "banquet.facts"),
      occasions: req(banquet.occasions, "banquet.occasions").map(
        (occasion, index) =>
          locValue(occasion, locale, `banquet.occasions[${index}]`),
      ),
      menus: req(banquet.menus, "banquet.menus").map((menu, index) => ({
        label: locValue(menu.label, locale, `banquet.menus[${index}].label`),
        line: locValue(menu.line, locale, `banquet.menus[${index}].line`),
        detail: locOptional(
          menu.detail,
          locale,
          `banquet.menus[${index}].detail`,
        ),
      })),
      enquiryTarget: localePath(
        locale,
        req(banquet.enquiryTarget, "banquet.enquiryTarget"),
      ),
      tableImage: mapImage(banquet.tableImage, IMAGE_WIDTH.portrait),
      courseImage: mapImage(banquet.courseImage, IMAGE_WIDTH.card),
    },
    reserve: {
      openTableUrl: reserve.openTableUrl ?? undefined,
      phone: req(reserve.phone, "reserve.phone"),
      wechat: req(reserve.wechat, "reserve.wechat"),
      hours: req(reserve.hours, "reserve.hours").map((window, index) =>
        locValue(window, locale, `reserve.hours[${index}]`),
      ),
      address: {
        name: req(address.name, "reserve.address.name"),
        line: locValue(address.line, locale, "reserve.address.line"),
      },
    },
    socials: req(raw.socials, "socials").map((social, index) => ({
      label: locValue(social.label, locale, `socials[${index}].label`),
      url: req(social.url, `socials[${index}].url`),
    })),
  };
}

/**
 * The binary per-request switch. No client: typed config. Fetch or mapping
 * failure, or an empty result: log and serve typed config. Success: Sanity,
 * wholesale. The two sources never merge.
 */
async function fromSanity<T>(
  label: string,
  fetcher: (activeClient: SanityClient) => Promise<T | null | undefined>,
  fallback: T,
): Promise<T> {
  if (!client) return fallback;
  try {
    const mapped = await fetcher(client);
    if (
      mapped === null ||
      mapped === undefined ||
      (Array.isArray(mapped) && mapped.length === 0)
    ) {
      console.error(
        `[content] Sanity returned no ${label}; serving the typed config fallback.`,
      );
      return fallback;
    }
    return mapped;
  } catch (error) {
    console.error(
      `[content] Sanity fetch for ${label} failed; serving the typed config fallback.`,
      error,
    );
    return fallback;
  }
}

/* ------------------------------------------------------------------ */
/* Public getters: async signatures kept, plus the required locale.   */
/* ------------------------------------------------------------------ */

/*
 * Both locales fetch through the same GROQ query (so the 60 second fetch
 * cache is shared between the trees) and the mapper resolves the locale
 * objects per request. The binary Sanity-or-config switch is per locale:
 * a failed or empty fetch, or a document a locale cannot map, serves that
 * locale's typed-config resolution wholesale. The sources never merge.
 */

/** The restaurant singleton: copy, credentials, story, chef, banquet, reserve. */
export async function getRestaurant(locale: Locale): Promise<Restaurant> {
  return fromSanity(
    `restaurant (${locale})`,
    async (activeClient) => {
      const raw = await activeClient.fetch<SanityRestaurant | null>(
        RESTAURANT_QUERY,
        {},
        FETCH_OPTIONS,
      );
      return raw ? mapRestaurant(raw, locale) : null;
    },
    localizeRestaurant(configRestaurant, locale),
  );
}

/** All menu dishes, in menu order; the grid also sorts by `order`. */
export async function getDishes(locale: Locale): Promise<Dish[]> {
  return fromSanity(
    `dishes (${locale})`,
    async (activeClient) => {
      const raw = await activeClient.fetch<SanityDish[] | null>(
        DISHES_QUERY,
        {},
        FETCH_OPTIONS,
      );
      return raw?.map((dish) => mapDish(dish, locale));
    },
    configDishes.map((dish) => localizeDish(dish, locale)),
  );
}

/**
 * The landing Signature Dishes trio, in landing order. Sanity path: the
 * singleton's `signatureDishes` references, resolved and ordered by the
 * editor. Fallback path: the config `signatureDishIds`. Per the S2
 * precedence ruling the active source wins wholesale.
 */
export async function getSignatureDishes(locale: Locale): Promise<Dish[]> {
  return fromSanity(
    `signature dishes (${locale})`,
    async (activeClient) => {
      const raw = await activeClient.fetch<SanityDish[] | null>(
        SIGNATURE_QUERY,
        {},
        FETCH_OPTIONS,
      );
      return raw?.map((dish) => mapDish(dish, locale));
    },
    configSignatureDishes.map((dish) => localizeDish(dish, locale)),
  );
}
