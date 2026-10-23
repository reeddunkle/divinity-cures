# Rewrite architecture

## Product boundary

Divinity Cures is a static client-side reference application. It has no server runtime, database, authentication, or background work. The existing Next.js application is a content and product reference, not a behavioral specification.

## Modules

### Catalog

The catalog module owns decoding raw game data, validating cross-record invariants, joining related records, and exposing immutable domain data. Callers do not coordinate raw datasets or depend on Effect Schema details.

### Search

The search module owns normalization, cure expansion, filtering, highlighting, and ordering as pure domain transformations. React and TanStack Router call its interface but do not define its rules. Its tests are the specification; in summary:

- A skill's cures are its removed statuses and granted immunities, plus those of the status effects it applies. Skills without cures are never results.
- Queries and searched text are NFKC-normalized, lowercased, trimmed, and whitespace-collapsed.
- A query matches skill names, removed statuses, and granted immunities at the start of any word, so `disease` matches `Infectious Disease` but `isease` does not.
- An empty query returns every cure skill without highlights. A query with no matches returns no results.
- Results are ordered by Source Points, Action Points, name, then identifier. Cures within a result are ordered by status name.

### URL state

TanStack Router owns durable, shareable search state in the `search` query parameter. TanStack Form owns transient input interaction. Their synchronization belongs at the route seam rather than inside the search module.

- Search parameters are always parsed as plain strings and decoded with Effect Schema. Whitespace is trimmed and collapsed, and an empty query is omitted from the URL.
- Every edit updates the URL, so the visible results can always be reloaded or shared.
- The first edit after a committed search pushes a history entry marked as a draft; later edits replace it. Submitting or clearing commits the entry, so the next edit pushes again.
- Navigation that does not change the query adds no entry.
- When the URL changes from elsewhere, such as browser navigation or a link, the form adopts the URL query. Form values that differ from the URL only by insignificant whitespace are kept.
- The form has no validator because every string is a valid query, so TanStack Form's Standard Schema integration is not used.

### Presentation

React renders routes and interaction. Panda CSS owns tokens, recipes, and extracted styles. Presentation modules consume prepared domain values instead of interpreting raw catalog records.

## Effect policy

Effect v4 is the default TypeScript standard library for schema decoding, typed failures, collection operations, ordering, optionality, matching, and other domain transformations where it improves clarity. Stable and unstable modules are both allowed.

Expected failures use tagged errors. Defects remain defects. The Effect runtime is used for typed failure, dependencies, resources, concurrency, or observability rather than wrapping every synchronous value.

## Tooling policy

TypeScript 7 is the project compiler. Effect TSGo patches the TypeScript compiler during installation and applies Effect language-service diagnostics through the separate `tsconfig.effect.json`; unstable API diagnostics remain disabled. Oxlint stays on its native TypeScript-aware engine rather than receiving the Effect TSGo patch.

Oxlint owns correctness, suspicious-code, React Compiler, Panda CSS, and selected maintainability rules. Oxfmt owns formatting and side-effect-safe import organization; lint rules do not duplicate formatter policy.

## Dependency direction

Presentation depends on URL state and domain interfaces. URL state depends on TanStack Router. Search depends on catalog domain types. Catalog implementation depends on Effect and raw static data. Dependencies do not point back toward presentation.

## Generated code

TanStack Router's generated route tree is tracked because application source imports it. Panda's `styled-system` output is ignored and regenerated during installation and builds.
