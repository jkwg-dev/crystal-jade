import {
  createClient,
  type IdentifiedSanityDocumentStub,
} from "@sanity/client";
import {
  dishes as dishesContent,
  signatureDishIds,
} from "../lib/content/dishes";
import { restaurant as restaurantContent } from "../lib/content/restaurant";
import type { Localized } from "../lib/content/types";
import { apiVersion, dataset, projectId } from "../sanity/env";

/**
 * Projects the typed config in `lib/content/` into the Sanity dataset. The
 * config is canonical; this seed is a pure projection of it. Local only:
 * requires the script-only SANITY_SEED_TOKEN write token, which the app,
 * the build, and the deploy never need.
 *
 * Id scheme: the restaurant singleton at the pinned id `restaurant`; each
 * dish at `dish-<config id>` with `slug.current` set to the config id;
 * signature trio as references keyed by config id. `createOrReplace`
 * throughout, and every generated `_key` is deterministic, so reruns are
 * idempotent and never duplicate documents.
 *
 * Translatable fields project as `{ en, zh }` locale objects
 * (localeString / localeText per the schema); structural fields stay flat
 * and `zhName` stays a plain bilingual design field.
 *
 * Image fields are read-merged: `createOrReplace` clears any field absent
 * from the replacement document (proven on probe documents, 2026-08-04),
 * so before writing, the seed reads every existing image field (restaurant
 * slots, philosophy card images by `_key`, dish photos) and carries them
 * into the projected documents. Uploads made in Studio therefore survive
 * a reseed. No image assets are ever seeded; photography is uploaded in
 * Studio, not through the seed.
 */

function fail(message: string): never {
  console.error(`Seed aborted: ${message}`);
  process.exit(1);
}

if (!projectId) {
  fail(
    "NEXT_PUBLIC_SANITY_PROJECT_ID is unset. Put the public project id in .env or .env.local (see .env.example).",
  );
}
if (!dataset) {
  fail(
    "NEXT_PUBLIC_SANITY_DATASET is unset. Put the public dataset name in .env or .env.local (see .env.example).",
  );
}
const token = process.env.SANITY_SEED_TOKEN;
if (!token) {
  fail(
    "SANITY_SEED_TOKEN is unset. Create a write token in Sanity Manage (Editor permissions) and put it in .env or .env.local. It is script-only: the app, the build, and the deploy never need it.",
  );
}

/* ------------------------------------------------------------------ */
/* Locale-object projection helpers.                                  */
/* ------------------------------------------------------------------ */

const locStr = (value: Localized<string>) => ({
  _type: "localeString",
  en: value.en,
  ...(value.zh !== undefined && { zh: value.zh }),
});

const locText = (value: Localized<string>) => ({
  _type: "localeText",
  en: value.en,
  ...(value.zh !== undefined && { zh: value.zh }),
});

/** Keyed localeString array member (footprint, moments, occasions, hours). */
const locStrList = (values: Localized<string>[], prefix: string) =>
  values.map((value, index) => ({
    _key: `${prefix}-${index}`,
    ...locStr(value),
  }));

/** Keyed localeText array member (heritage and richmond body paragraphs). */
const locTextList = (values: Localized<string>[], prefix: string) =>
  values.map((value, index) => ({
    _key: `${prefix}-${index}`,
    ...locText(value),
  }));

type FactRowSource = {
  label: Localized<string>;
  value: Localized<string>;
  detail?: Localized<string>;
};

const factRows = (rows: FactRowSource[]) =>
  rows.map((row, index) => ({
    _key: `row-${index}`,
    _type: "factRow",
    label: locStr(row.label),
    value: locStr(row.value),
    ...(row.detail !== undefined && { detail: locStr(row.detail) }),
  }));

/* ------------------------------------------------------------------ */
/* Read-merge of existing image fields (absent fields are cleared by  */
/* createOrReplace, so uploads must be carried into the projection).  */
/* ------------------------------------------------------------------ */

type ExistingImages = {
  restaurant: {
    heroMedia?: unknown;
    bands?: unknown;
    privateDiningImage?: unknown;
    heritageImage?: unknown;
    richmondImage?: unknown;
    philosophy?: { _key: string; image?: unknown }[] | null;
    chefPortrait?: unknown;
    tableImage?: unknown;
    courseImage?: unknown;
  } | null;
  dishes: { _id: string; image?: unknown }[];
};

const EXISTING_IMAGES_QUERY = /* groq */ `{
  "restaurant": *[_id == "restaurant"][0]{
    heroMedia,
    bands,
    "privateDiningImage": privateDining.image,
    "heritageImage": story.heritage.image,
    "richmondImage": story.richmond.image,
    "philosophy": story.philosophy[]{ _key, image },
    "chefPortrait": chef.portrait,
    "tableImage": banquet.tableImage,
    "courseImage": banquet.courseImage
  },
  "dishes": *[_type == "dish"]{ _id, image }
}`;

const present = (value: unknown) => value !== null && value !== undefined;

/** Spread helper: include `field: value` only when an image exists. */
const keep = (field: string, value: unknown) =>
  present(value) ? { [field]: value } : {};

/* ------------------------------------------------------------------ */
/* Projection and transaction.                                        */
/* ------------------------------------------------------------------ */

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

function buildDocs(existing: ExistingImages) {
  const images = existing.restaurant;
  const dishImages = new Map(
    existing.dishes.map((dish) => [dish._id, dish.image]),
  );
  const philosophyImages = new Map(
    (images?.philosophy ?? [])
      .filter((card) => present(card.image))
      .map((card) => [card._key, card.image]),
  );

  const restaurantDoc = {
    _id: "restaurant",
    _type: "restaurant",
    name: restaurantContent.name,
    tagline: locStr(restaurantContent.tagline),
    lede: locText(restaurantContent.lede),
    intro: {
      lede: locText(restaurantContent.intro.lede),
      support: locText(restaurantContent.intro.support),
    },
    ...keep("heroMedia", images?.heroMedia),
    ...keep("bands", images?.bands),
    credentials: factRows(restaurantContent.credentials),
    privateDining: {
      copy: locText(restaurantContent.privateDining.copy),
      facts: factRows(restaurantContent.privateDining.facts),
      ...keep("image", images?.privateDiningImage),
    },
    story: {
      heritage: {
        lead: locText(restaurantContent.story.heritage.lead),
        body: locTextList(restaurantContent.story.heritage.body, "para"),
        ...keep("image", images?.heritageImage),
      },
      footprint: locStrList(restaurantContent.story.footprint, "stop"),
      footprintNow: locStr(restaurantContent.story.footprintNow),
      richmond: {
        lead: locText(restaurantContent.story.richmond.lead),
        body: locTextList(restaurantContent.story.richmond.body, "para"),
        ...keep("image", images?.richmondImage),
      },
      philosophy: restaurantContent.story.philosophy.map((card, index) => ({
        _key: `card-${index}`,
        _type: "philosophyCard",
        title: locStr(card.title),
        line: locText(card.line),
        ...keep("image", philosophyImages.get(`card-${index}`)),
      })),
    },
    chef: {
      ...keep("portrait", images?.chefPortrait),
      intro: locText(restaurantContent.chef.intro),
      awards: restaurantContent.chef.awards.map((award, index) => ({
        _key: `award-${index}`,
        _type: "chefAward",
        title: locStr(award.title),
        ...(award.detail !== undefined && { detail: locStr(award.detail) }),
        years: locStr(award.years),
      })),
      bio: locText(restaurantContent.chef.bio),
      moments: locStrList(restaurantContent.chef.moments, "moment"),
      quote: locText(restaurantContent.chef.quote),
    },
    banquet: {
      copy: locText(restaurantContent.banquet.copy),
      facts: factRows(restaurantContent.banquet.facts),
      occasions: locStrList(restaurantContent.banquet.occasions, "occasion"),
      menus: restaurantContent.banquet.menus.map((menu, index) => ({
        _key: `menu-${index}`,
        _type: "banquetMenu",
        label: locStr(menu.label),
        line: locStr(menu.line),
        ...(menu.detail !== undefined && { detail: locStr(menu.detail) }),
      })),
      enquiryTarget: restaurantContent.banquet.enquiryTarget,
      ...keep("tableImage", images?.tableImage),
      ...keep("courseImage", images?.courseImage),
    },
    reserve: {
      ...(restaurantContent.reserve.openTableUrl !== undefined && {
        openTableUrl: restaurantContent.reserve.openTableUrl,
      }),
      phone: restaurantContent.reserve.phone,
      wechat: restaurantContent.reserve.wechat,
      hours: locStrList(restaurantContent.reserve.hours, "hours"),
      address: {
        name: restaurantContent.reserve.address.name,
        line: locStr(restaurantContent.reserve.address.line),
      },
    },
    socials: restaurantContent.socials.map((social, index) => ({
      _key: `social-${index}`,
      _type: "socialLink",
      label: locStr(social.label),
      url: social.url,
    })),
    signatureDishes: signatureDishIds.map((id) => ({
      _key: id,
      _type: "reference",
      _ref: `dish-${id}`,
    })),
  };

  const dishDocs = dishesContent.map((dish) => ({
    _id: `dish-${dish.id}`,
    _type: "dish",
    name: dish.name,
    zhName: dish.zhName,
    slug: { _type: "slug", current: dish.id },
    line: locStr(dish.line),
    category: dish.category,
    order: dish.order,
    ...keep("image", dishImages.get(`dish-${dish.id}`)),
    ...(dish.seasonal !== undefined && { seasonal: dish.seasonal }),
    ...(dish.available !== undefined && { available: dish.available }),
    frame: { tint: dish.frame.tint },
  }));

  const merged =
    [
      images?.heroMedia,
      images?.bands,
      images?.privateDiningImage,
      images?.heritageImage,
      images?.richmondImage,
      images?.chefPortrait,
      images?.tableImage,
      images?.courseImage,
    ].filter(present).length +
    philosophyImages.size +
    [...dishImages.values()].filter(present).length;

  return { restaurantDoc, dishDocs, merged };
}

async function seed() {
  const existing = await client.fetch<ExistingImages>(EXISTING_IMAGES_QUERY);
  const { restaurantDoc, dishDocs, merged } = buildDocs(existing);
  const docs: IdentifiedSanityDocumentStub[] = [...dishDocs, restaurantDoc];
  const transaction = docs.reduce(
    (trx, doc) => trx.createOrReplace(doc),
    client.transaction(),
  );
  const result = await transaction.commit();
  console.log(
    `Seeded ${docs.length} documents into ${projectId}/${dataset} (createOrReplace, one transaction):`,
  );
  for (const doc of docs) {
    console.log(`  ${doc._id}`);
  }
  console.log(`Existing image fields read-merged: ${merged}.`);
  console.log(`Transaction ${result.transactionId} committed.`);
}

seed().catch((error: unknown) => {
  console.error(
    "Seed failed:",
    error instanceof Error ? error.message : error,
  );
  process.exit(1);
});
