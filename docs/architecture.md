# Rewrite architecture

## Product boundary

Divinity Cures is a static client-side reference application. It has no server runtime, database, authentication, or background work. The existing Next.js application is a content and product reference, not a behavioral specification.

## Modules

### Catalog

The catalog module owns decoding raw game data, validating cross-record invariants, joining related records, and exposing immutable domain data. Callers do not coordinate raw datasets or depend on Effect Schema details. The `build-plugins/catalog.ts` Vite plugin runs `loadCatalog` at build and test time and serves the decoded catalog as the `virtual:bundled-catalog` module, so an invalid catalog fails the build and the tests rather than a visitor's page load. [Catalog content](./catalog-content.md) records sourced corrections to the inherited data and the questions that remain open.

- Identifiers are non-empty strings branded per dataset as `SkillId`, `StatusEffectId`, and `SchoolId`, so one kind cannot stand in for another. Every reference must point at an existing record whose name matches the name stored beside the reference.
- Action points, memory, and numeric cooldowns are whole numbers of at least 0; a cooldown of 0 means none. Source points are whole numbers from 0 to 3, the size of the Source pool. Ranges are meters of at least 0 and may be fractional. School requirements and applied-status durations are whole numbers of at least 1. Stat amounts and percentages stay signed because penalties are negative.

### Search

The search module owns normalization, cure expansion, filtering, highlighting, and ordering as pure domain transformations. React and TanStack Router call its interface but do not define its rules. Its tests are the specification; in summary:

- A skill's cures are its removed statuses and granted immunities, plus those of the status effects it applies. Skills without cures are never results.
- Queries and searched text are NFKC-normalized, lowercased, trimmed, and whitespace-collapsed.
- A query matches skill names, removed statuses, and granted immunities at the start of any word, so `disease` matches `Infectious Disease` but `isease` does not. A status also matches through the aliases on its status record, so `madness` finds `Mad`, and the canonical name is highlighted.
- An empty query returns every cure skill without highlights. A query with no matches returns no results.
- Results are ordered by Source Points, Action Points, name, then identifier. Cures within a result are ordered by status name.

### URL state

TanStack Router owns durable, shareable search state in the `search` query parameter. TanStack Form owns transient input interaction. Their synchronization belongs at the route seam rather than inside the search module.

- Search parameters are always parsed as plain strings. The `search` parameter is decoded with Effect's `Predicate` guards rather than Effect Schema, because it is the only value the browser decodes and Schema would add about 19 kB gzipped to the first load; a non-string value is treated as an empty query. Whitespace is trimmed and collapsed, and an empty query is omitted from the URL.
- Every edit updates the URL, so the visible results can always be reloaded or shared.
- The first edit after a committed search pushes a history entry marked as a draft; later edits replace it. Submitting or clearing commits the entry, so the next edit pushes again.
- Navigation that does not change the query adds no entry.
- When the URL changes from elsewhere, such as browser navigation or a link, the form adopts the URL query. Form values that differ from the URL only by insignificant whitespace are kept.
- The form has no validator because every string is a valid query, so TanStack Form's Standard Schema integration is not used.

### Presentation

React renders routes and interaction. Panda CSS owns tokens, recipes, and extracted styles. Presentation modules consume prepared domain values instead of interpreting raw catalog records.

- `src/theme` defines semantic tokens, global styles, and the recipes for shared visual patterns: `button`, `textLink`, `cureBadge`, and the `card` slot recipe. Components refer to semantic tokens such as `surface.raised` or `cure.immunity.background` rather than palette steps.
- `src/skill-details` turns skill values into display text, such as cost, cooldown, range, and school requirement labels, and is tested without React.
- The root route owns the skip link, landmarks, document titles through `HeadContent`, and focus. Moving to a different pathname focuses `<main>`, while search edits on `/` leave focus alone. A navigation that removes the focused element, such as following a cure badge, which remounts the results list, also focuses `<main>` rather than leaving focus on the page body. The first load leaves focus alone.
- Images are served from `public/` by root-relative path. See [assets](./assets.md).

## Effect policy

Effect v4 is the default TypeScript standard library for schema decoding, typed failures, collection operations, ordering, optionality, matching, and other domain transformations where it improves clarity. Stable and unstable modules are both allowed.

Effect Schema decodes data at build and test time, where its size costs nothing. Browser code avoids Schema because it pulls in much of Effect; small runtime guards use the `Predicate` module instead.

Expected failures use tagged errors. Defects remain defects. The Effect runtime is used for typed failure, dependencies, resources, concurrency, or observability rather than wrapping every synchronous value.

## Tooling policy

TypeScript 7 is the project compiler. Effect TSGo patches the TypeScript compiler during installation and applies Effect language-service diagnostics through the separate `tsconfig.effect.json`; unstable API diagnostics remain disabled. Oxlint stays on its native TypeScript-aware engine rather than receiving the Effect TSGo patch.

Oxlint owns correctness, suspicious-code, React Compiler, Panda CSS, and selected maintainability rules. Oxfmt owns formatting and side-effect-safe import organization; lint rules do not duplicate formatter policy.

React Compiler is not enabled. On 2026-10-23 it was measured through `@vitejs/plugin-react`'s native `oxc-transform-react` integration. Every component compiled without diagnostics, and tests and the production build passed. It added about 2.7 kB gzipped across the JavaScript chunks and left build time unchanged. In a profiled session of typing, submitting, following a cure badge, and clearing, it changed neither the number of commits nor the render time, beyond run-to-run noise. The results list is keyed by the query, so every edit remounts every card, and search returns new result objects for each query, so memoization has nothing to skip. Oxlint's React Compiler rules stay on so the code remains compatible. Revisit the decision if the results list stops remounting on each query or the interface gains expensive components that re-render with unchanged props.

## Dependency direction

Presentation depends on URL state and domain interfaces. URL state depends on TanStack Router. Search depends on catalog domain types. Catalog implementation depends on Effect and raw static data. Dependencies do not point back toward presentation.

## Generated code

TanStack Router's generated route tree is tracked because application source imports it. Panda's `styled-system` output is ignored and regenerated during installation and builds.
