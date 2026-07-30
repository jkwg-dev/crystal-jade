import {
  createClient,
  type IdentifiedSanityDocumentStub,
} from "@sanity/client";
import { dishes, signatureDishIds } from "../lib/content/dishes";
import { restaurant } from "../lib/content/restaurant";
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
 * No image assets are seeded: photo fields stay unset so every frame keeps
 * rendering its designed pending state through the same path as today.
 * Photography is uploaded later in Studio, not through the seed.
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

type FactRowSource = { label: string; value: string; detail?: string };

const factRows = (rows: FactRowSource[]) =>
  rows.map((row, index) => ({
    _key: `row-${index}`,
    _type: "factRow",
    label: row.label,
    value: row.value,
    ...(row.detail !== undefined && { detail: row.detail }),
  }));

const restaurantDoc = {
  _id: "restaurant",
  _type: "restaurant",
  name: restaurant.name,
  tagline: restaurant.tagline,
  lede: restaurant.lede,
  intro: {
    lede: restaurant.intro.lede,
    support: restaurant.intro.support,
  },
  credentials: factRows(restaurant.credentials),
  privateDining: {
    copy: restaurant.privateDining.copy,
    facts: factRows(restaurant.privateDining.facts),
  },
  story: {
    heritage: {
      lead: restaurant.story.heritage.lead,
      body: [...restaurant.story.heritage.body],
    },
    footprint: [...restaurant.story.footprint],
    footprintNow: restaurant.story.footprintNow,
    richmond: {
      lead: restaurant.story.richmond.lead,
      body: [...restaurant.story.richmond.body],
    },
    philosophy: restaurant.story.philosophy.map((card, index) => ({
      _key: `card-${index}`,
      _type: "philosophyCard",
      title: card.title,
      line: card.line,
    })),
  },
  chef: {
    intro: restaurant.chef.intro,
    awards: restaurant.chef.awards.map((award, index) => ({
      _key: `award-${index}`,
      _type: "chefAward",
      title: award.title,
      ...(award.detail !== undefined && { detail: award.detail }),
      years: award.years,
    })),
    bio: restaurant.chef.bio,
    moments: [...restaurant.chef.moments],
    quote: restaurant.chef.quote,
  },
  banquet: {
    copy: restaurant.banquet.copy,
    facts: factRows(restaurant.banquet.facts),
    occasions: [...restaurant.banquet.occasions],
    menus: restaurant.banquet.menus.map((menu, index) => ({
      _key: `menu-${index}`,
      _type: "banquetMenu",
      label: menu.label,
      line: menu.line,
      ...(menu.detail !== undefined && { detail: menu.detail }),
    })),
    enquiryTarget: restaurant.banquet.enquiryTarget,
  },
  reserve: {
    ...(restaurant.reserve.openTableUrl !== undefined && {
      openTableUrl: restaurant.reserve.openTableUrl,
    }),
    phone: restaurant.reserve.phone,
    wechat: restaurant.reserve.wechat,
    hours: [...restaurant.reserve.hours],
    address: {
      name: restaurant.reserve.address.name,
      line: restaurant.reserve.address.line,
    },
  },
  socials: restaurant.socials.map((social, index) => ({
    _key: `social-${index}`,
    _type: "socialLink",
    label: social.label,
    url: social.url,
  })),
  signatureDishes: signatureDishIds.map((id) => ({
    _key: id,
    _type: "reference",
    _ref: `dish-${id}`,
  })),
};

const dishDocs = dishes.map((dish) => ({
  _id: `dish-${dish.id}`,
  _type: "dish",
  name: dish.name,
  zhName: dish.zhName,
  slug: { _type: "slug", current: dish.id },
  line: dish.line,
  category: dish.category,
  order: dish.order,
  ...(dish.seasonal !== undefined && { seasonal: dish.seasonal }),
  ...(dish.available !== undefined && { available: dish.available }),
  frame: { tint: dish.frame.tint },
}));

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

async function seed() {
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
  console.log(`Transaction ${result.transactionId} committed.`);
}

seed().catch((error: unknown) => {
  console.error(
    "Seed failed:",
    error instanceof Error ? error.message : error,
  );
  process.exit(1);
});
