# Verify and prepare deployment

**Priority:** P2

## Objective

Prove that the rewrite can safely replace the production application.

## Work

- Run Effect-aware TypeScript 7 checking, type-aware Oxlint, Oxfmt checks, tests, and a clean production build.
- Verify a clean install patches TypeScript with Effect TSGo while leaving Oxlint on its native engine.
- Verify Oxlint reports React correctness and React Compiler diagnostics.
- Verify Panda CSS diagnostics run through its Oxlint plugin.
- Compare the rewrite against the parity checklist at representative viewport sizes.
- Verify Netlify direct-route handling and SPA fallback configuration.
- Check asset paths, caching, compression, bundle composition, and unexpected third-party requests.
- Check accessibility, metadata, favicons, canonical URL expectations, and basic indexing behavior.
- Deploy a preview without changing production.
- Document cutover and rollback steps.

## Acceptance criteria

- All checks pass from a clean install.
- Oxlint reports React correctness, React Compiler compatibility, TypeScript-aware, and Panda CSS issues.
- Oxfmt is the only formatting workflow used locally and in CI.
- `/`, `/about`, and valid search URLs work directly in the deployed preview.
- The parity checklist has no unexplained failures.
- The cutover can be reversed without reconstructing the old application.
