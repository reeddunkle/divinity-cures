# Add continuous integration

**Priority:** P2

## Objective

Run every check on each push, so failures don't depend on someone running `pnpm check` locally.

## Context

Netlify runs only `pnpm build`, which typechecks and builds. Linting, formatting, and the unit and browser tests run only through `pnpm check` on a developer's machine. The browser tests need Playwright's Chromium, which a CI job has to install, ideally with a cache.

## Work

- Choose a CI service, likely GitHub Actions, and pin each third-party action to a full commit SHA.
- Install with `pnpm install --frozen-lockfile`, then install Chromium with `pnpm exec playwright install --with-deps chromium`.
- Run `pnpm check`.
- Cache the pnpm store and the Playwright browser download.

## Acceptance criteria

- Every push and pull request runs `pnpm check` from a clean install.
- A failing lint, format, typecheck, unit test, browser test, or build fails the run.
- Oxfmt is the only formatter the job runs.
