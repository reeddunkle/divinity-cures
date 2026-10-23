# Vite rewrite tasks

This directory contains only outstanding work. Tasks are ordered by dependency and risk rather than visual impact.

| Priority | Task                                                                                            | Outcome                                             |
| -------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| P1       | [05 — Rebuild routes, assets, and presentation](./05-rebuild-routes-assets-and-presentation.md) | A complete accessible UI with self-hosted assets    |
| P1       | [07 — Enable and measure React Compiler](./07-enable-react-compiler.md)                         | An evidence-based compiler adoption decision        |
| P1       | [08 — Audit catalog semantics and content](./08-audit-catalog-semantics-and-content.md)         | Deliberate domain rules and trustworthy source data |
| P1       | [09 — Remove barrel files](./09-remove-barrel-files.md)                                         | Explicit module paths enforced by Oxlint            |
| P2       | [06 — Verify and prepare deployment](./06-verify-and-prepare-deployment.md)                     | Production checks and a safe Netlify cutover plan   |

## Working principles

- Treat the Next.js app as a high-level content and product reference, not as a behavioral specification or structure to copy.
- Approach every feature afresh. Odd legacy behavior is neither intentional nor correct unless the new design independently justifies it.
- Lean into Effect v4, including its collection and utility modules, when they replace handwritten logic clearly.
- Use tagged errors for expected failures and leave defects as defects.
- Keep catalog and search logic independent from React, TanStack Router, and Panda CSS.
- Preserve useful URLs and content deliberately; record intentional changes.
- Keep the application deployable as static files.
- Add packages only in the task that needs them, using current stable releases after checking provenance and compatibility.
- Complete P0 tasks before investing heavily in visual polish.

## Task lifecycle

- Add or update a task whenever implementation reveals valuable work outside the current task's scope.
- Give new tasks a priority and a verifiable outcome.
- Keep acceptance criteria current as understanding changes.
- Delete a task file and remove its index entry as soon as every acceptance criterion is satisfied.
- Use Git history rather than a completed-task archive.
