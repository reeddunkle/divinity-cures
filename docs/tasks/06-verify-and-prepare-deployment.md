# Verify and prepare deployment

**Priority:** P2

## Objective

Prove that the rewrite can safely replace the production application.

## Context

Local verification is done. A clean install passes `pnpm check`, which runs lint, format, unit and browser tests, typecheck, and the build. Oxlint reports React hooks and refs issues, type-aware rules, and Panda CSS rules, while TypeScript reports Effect diagnostics and strict Panda tokens. [`netlify.toml`](../../netlify.toml), the [deployment guide](../deployment.md), and the [parity checklist](../parity-checklist.md) are in place.

## Work

- Deploy a branch deploy or Deploy Preview from `vite-rewrite` without changing production, following the [deployment guide](../deployment.md).
- Run the guide's preview checklist against the deployed URL, including status codes, caching and compression headers, `noindex` on previews, and third-party requests.
- Test high zoom and a mobile screen reader on real devices.
- Record the production domain, and decide whether to add a canonical link.

## Acceptance criteria

- `/`, `/about`, and valid search URLs work directly in the deployed preview, and unknown paths return 404.
- Every row of the preview checklist passes, or its failure is explained.
- The parity checklist has no unexplained failures.
- The cutover can be reversed without reconstructing the old application.
