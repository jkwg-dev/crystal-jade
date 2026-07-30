# Crystal Jade Palace

Standalone website for Crystal Jade Palace, the Cantonese fine dining
restaurant at GreenTee Richmond Center. Next.js (App Router), TypeScript
strict, Tailwind v4.

This folder is fully self-contained: it has its own `package.json`, pnpm
lockfile, and configs, and imports nothing from outside the folder. It has
its own repository, its own Vercel deployment, and its own Sanity project.
The extraction test: move this folder anywhere and `pnpm install && pnpm
build` succeeds unchanged.

## Scripts

```
pnpm dev             # local dev server
pnpm build           # production build
pnpm lint            # eslint
pnpm typecheck       # tsc --noEmit
pnpm format          # prettier --write .
```

## Environment

None required. `NEXT_PUBLIC_SANITY_PROJECT_ID` and
`NEXT_PUBLIC_SANITY_DATASET` (see `.env.example`) point the site at the
separate Crystal Jade Sanity project and enable the embedded Studio at
`/studio`; real values live in `.env.local`, never committed. With the vars
unset, content comes from the typed config in `lib/content/` and the build
stays green; that is the standing extraction test.

## Architecture notes

- All content flows through typed getters in `lib/content.ts`; components
  never hold copy or see CMS types. See `CLAUDE.md` for the working rules
  (standalone rule, content accessor, Sanity-later, OpenTable-later, GSAP,
  accessibility).
