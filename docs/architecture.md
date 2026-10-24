# Rewrite architecture

## Product boundary

Divinity Cures is a static client-side app with no server, database, authentication, or background work. The old Next.js app is a content and product reference, not a behavioral spec.

## Modules

### Catalog

The catalog module decodes raw game data, validates cross-record invariants, joins related records, and exposes immutable domain data. Callers never touch raw datasets or Effect Schema. The `build-plugins/catalog.ts` Vite plugin runs `loadCatalog` at build and test time and serves the result as `virtual:bundled-catalog`, so an invalid catalog fails the build and tests instead of a visitor's page load. [Catalog content](./catalog-content.md) records data corrections and open questions.

- Identifiers are non-empty strings branded per dataset as `SkillId`, `StatusEffectId`, and `SchoolId`, so one kind can't stand in for another. Every reference must point at an existing record whose name matches the name stored beside it.
- Every name in `removes` or `immunities` must be a status record's canonical name. An alias or unknown name fails the build. Status names and aliases are unique across records. The loader derives a status's `clearedBy` from other statuses' `removes`.
- Action points, memory, and numeric cooldowns are whole numbers of at least 0, and a cooldown of 0 means none. Source points are 0 to 3, the size of the Source pool. Ranges are meters of at least 0 and may be fractional. School requirements and status durations are whole numbers of at least 1. Stat amounts and percentages are signed because penalties are negative.

### Search

The search module owns normalization, cure expansion, filtering, highlighting, and ordering as pure functions. React and TanStack Router call it but don't define its rules. Its tests are the spec. In summary:

- A skill's cures are the statuses it removes or grants immunity to, plus those of the statuses it applies, harmful or helpful. Skills without cures never appear.
- Search NFKC-normalizes, lowercases, trims, and collapses whitespace in both queries and searched text.
- A query matches the start of any word in skill names, removed statuses, and granted immunities, so `disease` matches `Infectious Disease` but `isease` doesn't. Status aliases match too, so `madness` finds `Mad` and highlights the canonical name.
- An empty query returns every cure skill without highlights. A query with no matches returns nothing.
- Results sort by Source Points, Action Points, name, then identifier. Cures within a result sort by status name.

### URL state

TanStack Router owns the shareable `search` query parameter. TanStack Form owns transient input state. The route syncs them, not the search module.

- Search parameters parse as plain strings. The browser decodes `search` with Effect `Predicate` guards instead of Schema, because it's the only value decoded client-side and Schema would add about 19 kB gzipped to the first load. A non-string value becomes an empty query. Whitespace is trimmed and collapsed, and an empty query is left out of the URL.
- Every edit updates the URL, so the visible results can always be reloaded or shared.
- The first edit after a committed search pushes a draft history entry, and later edits replace it. Submitting or clearing commits it, so the next edit pushes again.
- Navigation that doesn't change the query adds no entry.
- When the URL changes from elsewhere, such as Back or a link, the form adopts its query unless the two differ only by insignificant whitespace.
- The form has no validator because every string is a valid query, so it skips TanStack Form's Standard Schema integration.

### Presentation

React renders routes and interaction. Panda CSS owns tokens, recipes, and extracted styles. Presentation code takes prepared domain values, not raw catalog records.

- `src/theme` defines semantic tokens, global styles, and the shared recipes `button`, `textLink`, `cureBadge`, and the `card` slot recipe. Components use semantic tokens such as `surface.raised`, not palette steps.
- `src/skill-details` formats cost, cooldown, range, and school requirement labels, and is tested without React.
- `pageHead` in `src/site.ts` builds every page's title, description, canonical link, and Open Graph and Twitter tags. Each route's `head` calls it. The root route calls it only for the not-found page, which it detects with the router's `_notFound` match flag. The Oxlint config allows that name because the router has no public equivalent.
- `src/entry-server.tsx` prerenders `/`, `/about`, and the not-found page without TanStack's dehydration scripts, so the pages need no inline script. The server moves React's hoisted head tags into `<head>` and marks them `data-prerendered`. On load, the client loads the router, removes the marked tags so `HeadContent` owns the head, and hydrates only when the page's prerender key, its location or `not-found`, matches the markup. Otherwise, as for `/?search=burn`, it renders from scratch. `prepareForHydration` sets `router.ssr` so the client, like the server, renders matches without Suspense boundaries.
- The root route owns the skip link, landmarks, document titles through `HeadContent`, and focus. A pathname change focuses `<main>`. Search edits on `/` and the first load leave focus alone. When a navigation removes the focused element, as following a cure badge remounts the results list, `<main>` takes focus instead of the page body. Moving focus never scrolls.
- `src/scroll/scroll-policy.ts` owns programmatic scrolling and supplies the router's scroll options, so callers never pass `resetScroll`. Form searches use `searchFromInput`, which scrolls only the results list to its top, so the page never moves while typing, submitting, or clearing. Cure badges and school icons render `SearchLink`, whose `followSearchLink` resets the window, `<main>`, and the results list. Modified clicks still open the link natively. Other links start the new page at the top, and Back and Forward restore earlier positions. Programmatic scrolls are instant. The global smooth `scroll-behavior` applies only to in-page anchors such as the skip link. The results list is keyed by the query, but scrolling doesn't depend on that remount.
- Images are served from `public/` by root-relative path. See [assets](./assets.md).

## Effect policy

Effect v4 is the default standard library for decoding, typed failures, collections, ordering, optionality, matching, and other domain transformations where it reads more clearly. Stable and unstable modules are both allowed.

Effect Schema runs at build and test time, where its size costs nothing. Browser code avoids it because it pulls in much of Effect, and uses `Predicate` guards instead.

Expected failures use tagged errors, and defects stay defects. Use the Effect runtime for typed failure, dependencies, resources, concurrency, or observability, not to wrap every synchronous value.

## Tooling policy

TypeScript 7 compiles the project. Effect TSGo patches it on install and reports Effect language-service diagnostics through `tsconfig.effect.json`, with unstable API diagnostics off. Oxlint uses its own TypeScript-aware engine without the patch.

Oxlint covers correctness, suspicious code, React Compiler, Panda CSS, and selected maintainability rules. Oxfmt owns formatting and side-effect-safe import sorting, and lint rules don't duplicate it.

React Compiler is off. On 2026-10-23 it was measured through `@vitejs/plugin-react`'s `oxc-transform-react` integration. Every component compiled without diagnostics, and the tests and build passed. It added about 2.7 kB gzipped and didn't change build time. A profiled session of typing, submitting, following a cure badge, and clearing showed no change in commit count or render time beyond noise. The results list remounts every card on each query, and search returns new objects per query, so memoization has nothing to skip. Oxlint's React Compiler rules stay on to keep the code compatible. Revisit if the list stops remounting per query or expensive components start re-rendering with unchanged props.

## Tests

Tests live in `src/tests`, apart from the code they cover.

- `unit-tests` runs in Node and mirrors the source modules, such as `unit-tests/search`.
- `browser-tests` holds the `*.browser.test.tsx` files, which run in headless Chromium with the app's real styles.
- `common` holds helpers that two or more test files share. `createTestRouter` loads the app router on a memory history, and `renderApp` also renders it. A helper stays in its test file until a second file needs it.

Vitest picks the project by file suffix anywhere under `src`, so a test outside `src/tests` still runs.

## Imports

Under `src`, import from the same directory with `./` and from anywhere else through an alias: `@/` for `src` and `styled-system/` for Panda output. Both aliases live in `tsconfig.json` `paths`, which Vite and Vitest read through `resolve.tsconfigPaths`. Oxlint rejects `../` imports under `src`. Files outside `src`, such as `build-plugins`, use relative imports because Node loads them before Vite resolves aliases.

## Dependency direction

Presentation depends on URL state and domain interfaces. URL state depends on TanStack Router. Search depends on catalog types. The catalog depends on Effect and raw data. Nothing depends on presentation.

## Generated code

Git tracks TanStack Router's generated route tree because source imports it. Git ignores Panda's `styled-system` output, which install and build regenerate.
