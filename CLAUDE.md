# CLAUDE.md · Crystal Jade Palace Web

Standalone Next.js (App Router) + TypeScript strict + Tailwind v4 site for
Crystal Jade Palace, the Cantonese fine dining restaurant at GreenTee Richmond
Center. Split out of the GreenTee site to live on its own domain, its own
Vercel project, and its own Sanity project (never the GreenTee one). English
lives at the root routes; Traditional Chinese lives under `/zh` (see
Localization). The header EN / 中文 indicator stays inert until the Z3
toggle phase lands.

Routes: `/` (landing), `/story`, `/chef`, `/menu`, `/banquet`, `/reserve`.
These map one-to-one to the former GreenTee `/dining` and `/dining/*` pages.
The same six pages exist in Traditional Chinese under `/zh` (`/zh`,
`/zh/story`, and so on), rendered by the same shared page components.

## The standalone rule

This folder is a complete, self-contained project. It may temporarily sit
inside the GreenTee repo, but nothing in here may reference anything outside
this folder: no imports, no symlinks, no shared config, no workspace
membership. The extraction test is the contract: moving this folder anywhere
and running `pnpm install && pnpm build` inside it must succeed unchanged.

- Package manager is **pnpm** with `pnpm-lock.yaml`, pinned via the
  `packageManager` field (ruling of 2026-07-30; npm before that). Still no
  workspace file in here: this stays a single standalone package.
- Code shared with the GreenTee site (tokens, primitives, motion) exists here
  as intentional duplication. Never "fix" that by importing across the
  boundary; copy and adapt.
- While nested, the parent repo excludes this folder from its tsconfig,
  eslint, and prettier. Keep it that way.

## Content accessor rule

All content flows through typed getters in `lib/content.ts` (Sanity-backed,
with the typed config in `lib/content/` as the fallback). Components never
hold copy, nav items, hours, prices, or menu data inline, and never see a
CMS type.

- **Two Sanity zones, no more.** Exactly two areas of this repo may import
  from Sanity packages. One: `lib/content.ts`, the only module that fetches
  content; the Sanity client, GROQ queries, and CMS-to-domain mapping live
  here and nowhere else, behind the unchanged async getter signatures. Two:
  the Studio zone (`sanity.config.ts`, `sanity/schemas/**`, the `/studio`
  route, and the local-only seed script `scripts/seed.ts`), which is
  authoring infrastructure, not site code. No
  component, page, or lib outside these two zones imports anything from a
  Sanity package, and nothing outside `lib/content.ts` fetches content.
- **Typed config is the fallback, not dead code.** When
  `NEXT_PUBLIC_SANITY_PROJECT_ID` or `NEXT_PUBLIC_SANITY_DATASET` is unset,
  the accessor serves the typed config in `lib/content/` exactly as it did
  before Sanity. The no-env build must stay green: `pnpm install && pnpm
  build` with no `.env` succeeds, all routes prerender, and the site renders
  the config content. The extraction test doubles as this fallback test. At
  request time, a failed or empty Sanity fetch logs and falls back to typed
  config rather than rendering a broken page.
- **Getters take a locale.** Every getter takes a required `locale`
  (`"en" | "zh"`) and returns fully resolved domain types; components stay
  locale-blind as well as source-blind. Translatable prose lives as
  `{ en, zh }` locale objects in the typed config; structural fields stay
  flat; `Dish.zhName` stays a plain bilingual design field on both locales.
  A missing zh value resolves to the en value and logs a `[content]` line.
  Until the Z2 schema localization lands, the zh locale is served wholesale
  from typed config even when Sanity is configured; en keeps the S3 binary
  Sanity-or-config switch unchanged.
- **Public read, no tokens in the app.** The dataset is public read
  (marketing content only). The app fetches without a token; no Sanity
  secret ever reaches client code, and no env vars beyond the two public
  identifiers are consumed by the app or the deploy. The seed script's write
  token is script-only and local-only. Studio authentication is Sanity's own
  login.
- **Published content only, time-based revalidation.** No draft mode, no
  live preview. Content routes revalidate on a timer (`revalidate = 60`);
  the on-demand revalidation webhook is a recorded follow-up, not built.
- **`/studio` stays out of the site experience.** Route-level robots
  noindex, no link to it anywhere in the site chrome, and any future sitemap
  excludes it.
- **One image serves both ratios.** Photo slots render breakpoint-aware
  aspect ratios (shorter at mobile widths), and there is no mandatory
  separate mobile image per slot: the Sanity project will rely on hotspot
  and crop so a single upload serves the desktop and mobile ratios, cropped
  around the editor's focal point. `InterimImage.mobileImage` is the
  optional art-directed override seam for the slots where hotspot cropping
  will not be enough (composed heroes, anything with in-image text); it is
  unused today and stays optional forever.
- Client components never import from `lib/content.ts` directly; content and
  nav reach client leaves as props from a Server Component, so a future
  server-only CMS client inside the accessor can never break the client
  boundary.
- No database. No secrets in client bundles. No env vars beyond the two
  public Sanity identifiers and the script-only seed token without a ruling.

## Localization

- Two locales only: English at the root routes, Traditional Chinese
  (zh-Hant) under `/zh`. Simplified Chinese is explicitly out of scope.
  `html lang` is `en` at root and `zh-Hant` under `/zh`.
- Route files are one-line delegations. Every `app/(site)/*/page.tsx` and
  `app/zh/*/page.tsx` only exports metadata built by `lib/seo.ts` and
  renders its shared page component from `components/pages/` with a
  `locale` prop. Page JSX, fetches, and copy never live in a route file, so
  the two trees cannot drift.
- Metadata, canonicals, and the hreflang pairs are authored once in
  `lib/seo.ts`; both wrappers of a page call the same builder.
- Chrome strings (nav labels, buttons, section heads, aria labels,
  pending-frame labels, meta titles) live in the typed dictionary in
  `lib/i18n.ts`. Server Components read it through their `locale` prop;
  client leaves receive resolved strings as props and never import the
  dictionary or the accessor (props-over-import).
- zh-Hant copy is drafted in a Hong Kong fine dining register (米芝蓮,
  never 米其林) and is pending native review; every drafted string will be
  tracked in `docs/zh-review.md` when Z3 lands. Brand and place names
  without a confirmed official Chinese name (Crystal Jade Palace, GreenTee
  Richmond Center) stay in English inside zh copy: never invent a Chinese
  trade name. English placeholder copy stays placeholder in zh.
- The no-dash and no-exclamation rules apply in both languages: no 破折號,
  ranges written "2022 至 2025" in zh. Chinese prose uses full-width
  punctuation.
- Typography adjustments for CJK (font stacks, italics, tracking) happen
  only by checkpoint ruling, never silently.

## Reservations: OpenTable later

- `ReservationCta` is the single component for every reservation action
  (header button, hero, footer, contact). No ad-hoc reservation links.
- `lib/reservations.ts` defines the `ReservationProvider` interface; the
  active implementation is the link provider: `book()` routes to `/reserve`,
  and the reserve page's `reserve()` goes to the configured OpenTable URL
  (new tab) or the on-page embed anchor until one exists. An OpenTable
  provider replaces it later.
- No component outside `lib/reservations.ts` may know which provider is
  active. Targets are resolved in Server Components via
  `getReservationProvider()` and reach `ReservationCta` as props, per the
  props-over-import rule. Do not install any OpenTable SDK, embed, or script
  until that phase is explicitly opened.

## Design rules

The GreenTee dining mockups v6 (`docs/mockups/greentee-dining*.html`) define
the look, motion, and copy tone. They are read-only reference: port, never
paste, never edit them as a form of implementation. Mockup base64 images are
mockup-only. Cross-links between mockup files stand in for this site's routes
(`greentee-dining-story.html` means `/story`); links to other GreenTee pages
stand in for the main site's domain.

- Background `--color-noir`, primary text `--color-ivory`. Jade and jade-text
  are first-class accents here (the whole site is Crystal Jade content);
  champagne carries CTAs and hairlines as in the mockups.
- Type: Cormorant Garamond for display, Inter for body and UI. Chinese
  strings use the system `--zh` stack. No other fonts.
- Buttons only via the copied `Button` variants (`solid` | `ghost` | `light`,
  plus `sm`). No new button styles, no gradient buttons, no card shadows, no
  white background sections.
- Every image renders inside the placeholder frame (`PhotoFrame`): the
  designed pending state while the slot's Sanity asset is absent, and
  `SiteImage` (fed a mapped `InterimImage` whose URL the accessor builds
  with crop and hotspot respected) inside the same frame once it exists.
  Never a bare `<img>`, never stock imagery in a designed pending slot
  (chef portrait, dishes, private rooms).
- No literal florals, no regular repeating decorative patterns; grain only
  via the irregular fractal-noise overlay recipe.
- Copy: English at the root routes, Traditional Chinese under `/zh`. Never
  an em dash or an en dash anywhere in either language; write ranges as
  "2022 to 2025" (zh: "2022 至 2025") and times as "6:00 to 6:30 PM". No
  exclamation points anywhere on this site, in either language. No
  membership language, no "media art".

## GSAP rules

- All GSAP work inside `useGSAP` (from `@gsap/react`) for scoped cleanup.
- `once: true` only inside the `scrollTrigger` config object, never as a
  tween-level property.
- Animate transforms and opacity, not `clip-path`, not layout properties.
- Pinned ScrollTriggers are a last resort; keep them minimal and always set
  `invalidateOnRefresh: true`.
- Call `ScrollTrigger.refresh()` after fonts load.
- `prefers-reduced-motion` disables entrance motion and scroll effects; the
  reduced path renders final values and is part of done for every section.

## Accessibility

- Semantic landmarks (`header`, `nav`, `main`, `footer`); exactly one `h1`
  per page.
- Nav and mobile menu fully keyboard operable: focus trap while the drawer is
  open, close on Escape and on route change, `aria-expanded` on the toggle.
- Visible focus states everywhere; decorative visuals `aria-hidden`.
- Touch targets at least 44px; hover effects gated behind
  `(hover: hover) and (pointer: fine)`.

## Conventions

- Server Components by default; `'use client'` only at leaves that need
  interaction or motion. TypeScript strict, no `any`. Named exports, one
  component per file. Components past roughly 150 lines or three
  responsibilities get split. Search `components/` before creating anything.
- Verify every UI task at 1440 and 390. No horizontal overflow at any width.
- Commit gate: `pnpm lint && pnpm typecheck` must pass.
