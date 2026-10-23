# Verify and prepare deployment

**Priority:** P2

## Objective

Prove that the rewrite can safely replace the production application.

## Context

The rewrite is live at `https://divinitycures.com/`. On 2026-10-23, both the branch deploy at `https://deploy-preview--divinity-cures.netlify.app/` and production passed the [preview checklist](../deployment.md#preview-checklist):

- Direct requests to `/`, `/about`, `/about/`, and `/?search=first+aid` return 200, and `/missing` returns 404 with the not-found page and its title.
- Hashed assets are Brotli-compressed with a one-year immutable cache, and images are cached for a week.
- No request leaves the site's origin, no image fails to load, and the console has no errors.
- `http://divinitycures.com/` and `https://www.divinitycures.com/` redirect permanently to `https://divinitycures.com/`.

The previous Next.js production deploy remains in Netlify's deploy list as the rollback target.

## Work

- Test high zoom and a mobile screen reader on real devices.
- Decide whether to add a canonical link to `https://divinitycures.com/`. The `www` and `http` redirects already consolidate the main duplicates, so the remaining duplicates are the `divinity-cures.netlify.app` host and branch deploys.
- Remove `NEXT_DISABLE_EDGE_IMAGES` from Netlify once a rollback to the Next.js deploy is no longer expected.

## Acceptance criteria

- Real-device zoom and screen-reader checks pass, or their failures are recorded as tasks.
- The canonical-link decision is recorded, and implemented if adopted.
- No Next.js configuration remains in Netlify.
