# Reduce initial JavaScript

**Priority:** P2

## Objective

Load the cure list with as little JavaScript and as few image requests as the design allows.

## Context

The production entry chunk is 387 kB (126 kB gzip), and the home route chunk adds 107 kB (29 kB gzip) for a catalog of 30 skills. Every visit decodes the bundled JSON with Effect Schema and resolves references at startup through `E.runSync`, although the data never changes after the build. A decode failure throws before the router mounts and leaves a blank page.

The home page renders every result at once, and none of the skill, point, or school images sets `loading="lazy"` or `decoding="async"`.

## Work

- Record the current chunk sizes and a Lighthouse run on a throttled mobile profile.
- Measure what Effect, TanStack Router, and TanStack Form each contribute to the entry chunk.
- Decide whether to validate the catalog at build or test time and ship already-resolved data, keeping `loadCatalog` and its tagged errors as the validation path.
- Lazy-load images that start below the fold.
- Coordinate measurements with task 07 so both use the same baseline.

## Acceptance criteria

- Before and after measurements are recorded in this repository.
- An invalid catalog fails the build or tests rather than the visitor's page load.
- Below-the-fold images don't load until they approach the viewport.
- Tests and the production build pass.
