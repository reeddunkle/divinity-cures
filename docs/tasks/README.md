# Vite rewrite tasks

Only outstanding work lives here, ordered by dependency and risk, not visual impact.

| Priority | Task                                                           | Outcome                                         |
| -------- | -------------------------------------------------------------- | ----------------------------------------------- |
| P2       | [14. Review the catalog schema](./14-review-catalog-schema.md) | Easy-to-edit data whose mistakes fail the build |

## Working principles

- Treat the Next.js app as a content and product reference, not a behavioral spec or structure to copy.
- Design every feature from scratch. Don't assume odd legacy behavior is intended or correct unless the new design justifies it on its own.
- Use Effect v4, including its collection and utility modules, where it reads more clearly than handwritten logic.
- Use tagged errors for expected failures and leave defects as defects.
- Keep catalog and search logic free of React, TanStack Router, and Panda CSS.
- Keep useful URLs and content, and record intentional changes.
- Keep the app deployable as static files.
- Add packages only in the task that needs them, as current stable releases, after checking provenance and compatibility.
- Finish P0 tasks before heavy visual polish.

## Task lifecycle

- Add or update a task when implementation turns up work outside the current task.
- Give new tasks a priority and a verifiable outcome.
- Keep acceptance criteria current.
- Delete a task file and its index entry once every acceptance criterion passes.
- Git history is the archive of completed tasks.
