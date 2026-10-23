# Serve page metadata without JavaScript

**Priority:** P2

## Objective

Give crawlers, link previews, and no-JavaScript visitors a complete page for every route.

## Context

Netlify serves the same `index.html` for `/` and `/about`. Its body is an empty `#root`, and its title, description, and lack of a canonical link are the same for every path. Per-route titles and canonical links only appear after React renders. Link unfurlers such as Slack, Discord, and most social networks don't run JavaScript, so they see none of it. The page has no Open Graph or Twitter card tags.

`site.description` is defined but unused. `index.html` hardcodes the same text.

The root route picks its title with `matches.length === 1`, which assumes that only the not-found page has a single match. Any future layout route breaks that assumption.

## Work

- Prerender `/` and `/about` to static HTML at build time while keeping the deploy fully static.
- Emit each route's title, description, and canonical link into its prerendered HTML.
- Add Open Graph and Twitter card tags, including a share image that respects the asset rules in `docs/assets.md`.
- Use `site.description` as the single source of the description.
- Set the not-found title from the not-found component's route state rather than from the match count.
- Add a sitemap and reference it from `robots.txt`.
- Update the Netlify redirects so prerendered files are served directly.

## Acceptance criteria

- `curl` of each production route returns its title, description, canonical link, Open Graph tags, and visible main content.
- The client hydrates the prerendered markup without hydration warnings.
- Unknown paths still return a 404 status with the not-found page.
- Every page metadata string has one source in code.
