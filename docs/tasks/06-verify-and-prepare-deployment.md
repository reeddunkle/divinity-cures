# Verify and prepare deployment

**Priority:** P2

## Objective

Prove that the rewrite can safely replace the production application.

## Context

Local verification is done. A clean install passes `pnpm check`, which runs lint, format, unit and browser tests, typecheck, and the build. The branch deploy at `https://deploy-preview--divinity-cures.netlify.app/` passed the [preview checklist](../deployment.md#preview-checklist) on 2026-10-23:

- Direct requests to `/`, `/about`, `/about/`, and `/?search=first+aid` return 200, and `/missing` returns 404 with the not-found page and its title.
- Hashed assets are Brotli-compressed with a one-year immutable cache, and images are cached for a week.
- No request leaves the site's origin, and no image fails to load.
- Netlify doesn't add `noindex` to branch deploys, which [the deployment guide](../deployment.md) now records.

## Work

- Cut over by pushing `main`, then repeat the preview checklist against production.
- Test high zoom and a mobile screen reader on real devices.
- Record the production domain, and decide whether to add a canonical link.
- Remove `NEXT_DISABLE_EDGE_IMAGES` from Netlify once a rollback to the Next.js deploy is no longer expected.

## Acceptance criteria

- `/`, `/about`, and valid search URLs work directly in production, and unknown paths return 404.
- Every row of the preview checklist passes in production, or its failure is explained.
- Real-device zoom and screen-reader checks pass, or their failures are recorded as tasks.
- The cutover can be reversed without reconstructing the old application.
