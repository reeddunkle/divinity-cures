# Verify and prepare deployment

**Priority:** P2

## Objective

Prove that the rewrite can safely replace the production application.

## Work

- Run strict type checking, ESLint, formatting checks, tests, and a clean production build.
- Verify the ESLint configuration uses the latest stable release and has React Compiler diagnostics enabled.
- Verify the chosen ESLint Stylistic and Prettier arrangement has no conflicting rules or duplicate formatting workflow.
- Compare the rewrite against the parity checklist at representative viewport sizes.
- Verify Netlify direct-route handling and SPA fallback configuration.
- Check asset paths, caching, compression, bundle composition, and unexpected third-party requests.
- Check accessibility, metadata, favicons, canonical URL expectations, and basic indexing behavior.
- Deploy a preview without changing production.
- Document cutover and rollback steps.

## Acceptance criteria

- All checks pass from a clean install.
- ESLint reports React correctness and React Compiler compatibility issues.
- One documented command checks formatting consistently in local development and CI.
- `/`, `/about`, and valid search URLs work directly in the deployed preview.
- The parity checklist has no unexplained failures.
- The cutover can be reversed without reconstructing the old application.

