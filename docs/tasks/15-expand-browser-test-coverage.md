# Expand browser test coverage

**Priority:** P3

## Objective

Cover each route and the layout behavior that unit tests can't reach.

## Context

`src/home-route.browser.test.tsx` covers the home search form thoroughly. Nothing in the browser suite renders the About page, the not-found page, or the route error component. Nothing checks the focus move to `<main>` on route changes, the skip link, or the layout that switches the results list to its own scroll area at the `md` breakpoint.

## Work

- Render `/about` and check its title, canonical link, and link to a prefilled search.
- Render an unknown path and check the not-found title and the absence of a canonical link.
- Force a route error and check that "Try again" recovers.
- Check that navigating between routes focuses `<main>`, and that the skip link targets it.
- Check that the results list scrolls independently at a desktop viewport and with the page at a mobile viewport.

## Acceptance criteria

- Each route and fallback has at least one browser test.
- Focus management and both responsive layouts are tested.
- `pnpm check` passes.
