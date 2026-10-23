# Rewrite architecture

## Product boundary

Divinity Cures is a static client-side reference application. It has no server runtime, database, authentication, or background work. The existing Next.js application is a content and product reference, not a behavioral specification.

## Modules

### Catalog

The catalog module owns decoding raw game data, validating cross-record invariants, joining related records, and exposing immutable domain data. Callers do not coordinate raw datasets or depend on Effect Schema details.

### Search

The search module will own normalization, cure expansion, filtering, highlighting, and ordering as pure domain transformations. React and TanStack Router will call its interface but will not define its rules.

### URL state

TanStack Router will own durable, shareable search state. TanStack Form will own transient input interaction. Their synchronization belongs at the route seam rather than inside the search module.

### Presentation

React renders routes and interaction. Panda CSS owns tokens, recipes, and extracted styles. Presentation modules consume prepared domain values instead of interpreting raw catalog records.

## Effect policy

Effect v4 is the default TypeScript standard library for schema decoding, typed failures, collection operations, ordering, optionality, matching, and other domain transformations where it improves clarity. Stable and unstable modules are both allowed.

Expected failures use tagged errors. Defects remain defects. The Effect runtime is used for typed failure, dependencies, resources, concurrency, or observability rather than wrapping every synchronous value.

## Tooling policy

TypeScript 7 is the project compiler. Oxlint uses its native TypeScript-aware engine for correctness, suspicious code, React Compiler validation, and Panda CSS diagnostics. Oxfmt owns formatting; lint rules do not duplicate formatter policy.

## Dependency direction

Presentation depends on URL state and domain interfaces. URL state depends on TanStack Router. Search depends on catalog domain types. Catalog implementation depends on Effect and raw static data. Dependencies do not point back toward presentation.

## Generated code

TanStack Router's generated route tree is tracked because application source imports it. Panda's `styled-system` output is ignored and regenerated during installation and builds.
