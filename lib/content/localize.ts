// Relative import so the seed script's tsx runtime resolves it without
// consulting the tsconfig path alias.
import { localePath, type Locale } from "../i18n";
import type { Dish, Restaurant, RestaurantFact } from "@/types";
import type {
  DishContent,
  Localized,
  LocalizedFact,
  RestaurantContent,
} from "./types";

/**
 * Locale resolution for the typed config: `{ en, zh }` authoring shapes in,
 * flat domain types out. Components stay locale-blind; the only fallback
 * seam is `pick`, which serves the en value and logs when a zh value is
 * missing (CLAUDE.md, Localization).
 */

/** Resolve one localized value; a missing zh serves en with a logged line. */
export function pick<T>(value: Localized<T>, locale: Locale, path: string): T {
  if (locale === "zh") {
    if (value.zh !== undefined) return value.zh;
    console.error(`[content] missing zh for ${path}; serving the en value.`);
  }
  return value.en;
}

function pickFacts(
  facts: LocalizedFact[],
  locale: Locale,
  path: string,
): RestaurantFact[] {
  return facts.map((fact, index) => ({
    label: pick(fact.label, locale, `${path}[${index}].label`),
    value: pick(fact.value, locale, `${path}[${index}].value`),
    detail: fact.detail
      ? pick(fact.detail, locale, `${path}[${index}].detail`)
      : undefined,
  }));
}

export function localizeRestaurant(
  content: RestaurantContent,
  locale: Locale,
): Restaurant {
  return {
    name: content.name,
    tagline: pick(content.tagline, locale, "tagline"),
    lede: pick(content.lede, locale, "lede"),
    intro: {
      lede: pick(content.intro.lede, locale, "intro.lede"),
      support: pick(content.intro.support, locale, "intro.support"),
    },
    credentials: pickFacts(content.credentials, locale, "credentials"),
    privateDining: {
      copy: pick(content.privateDining.copy, locale, "privateDining.copy"),
      facts: pickFacts(
        content.privateDining.facts,
        locale,
        "privateDining.facts",
      ),
    },
    story: {
      heritage: {
        lead: pick(content.story.heritage.lead, locale, "story.heritage.lead"),
        body: content.story.heritage.body.map((paragraph, index) =>
          pick(paragraph, locale, `story.heritage.body[${index}]`),
        ),
      },
      footprint: content.story.footprint.map((stop, index) =>
        pick(stop, locale, `story.footprint[${index}]`),
      ),
      footprintNow: pick(content.story.footprintNow, locale, "footprintNow"),
      richmond: {
        lead: pick(content.story.richmond.lead, locale, "story.richmond.lead"),
        body: content.story.richmond.body.map((paragraph, index) =>
          pick(paragraph, locale, `story.richmond.body[${index}]`),
        ),
      },
      philosophy: content.story.philosophy.map((card, index) => ({
        title: pick(card.title, locale, `philosophy[${index}].title`),
        line: pick(card.line, locale, `philosophy[${index}].line`),
      })),
    },
    chef: {
      intro: pick(content.chef.intro, locale, "chef.intro"),
      awards: content.chef.awards.map((award, index) => ({
        title: pick(award.title, locale, `chef.awards[${index}].title`),
        detail: award.detail
          ? pick(award.detail, locale, `chef.awards[${index}].detail`)
          : undefined,
        years: pick(award.years, locale, `chef.awards[${index}].years`),
      })),
      bio: pick(content.chef.bio, locale, "chef.bio"),
      moments: content.chef.moments.map((moment, index) =>
        pick(moment, locale, `chef.moments[${index}]`),
      ),
      quote: pick(content.chef.quote, locale, "chef.quote"),
    },
    banquet: {
      copy: pick(content.banquet.copy, locale, "banquet.copy"),
      facts: pickFacts(content.banquet.facts, locale, "banquet.facts"),
      occasions: content.banquet.occasions.map((occasion, index) =>
        pick(occasion, locale, `banquet.occasions[${index}]`),
      ),
      menus: content.banquet.menus.map((menu, index) => ({
        label: pick(menu.label, locale, `banquet.menus[${index}].label`),
        line: pick(menu.line, locale, `banquet.menus[${index}].line`),
        detail: menu.detail
          ? pick(menu.detail, locale, `banquet.menus[${index}].detail`)
          : undefined,
      })),
      enquiryTarget: localePath(locale, content.banquet.enquiryTarget),
    },
    reserve: {
      openTableUrl: content.reserve.openTableUrl,
      phone: content.reserve.phone,
      wechat: content.reserve.wechat,
      hours: content.reserve.hours.map((window, index) =>
        pick(window, locale, `reserve.hours[${index}]`),
      ),
      address: {
        name: content.reserve.address.name,
        line: pick(content.reserve.address.line, locale, "reserve.address.line"),
      },
    },
    socials: content.socials.map((social, index) => ({
      label: pick(social.label, locale, `socials[${index}].label`),
      url: social.url,
    })),
  };
}

export function localizeDish(content: DishContent, locale: Locale): Dish {
  return {
    id: content.id,
    name: content.name,
    zhName: content.zhName,
    line: pick(content.line, locale, `dish ${content.id} line`),
    category: content.category,
    order: content.order,
    seasonal: content.seasonal,
    available: content.available,
    frame: content.frame,
  };
}
