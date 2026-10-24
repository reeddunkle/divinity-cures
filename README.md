# Divinity Cures

A static site for finding cures in Divinity: Original Sin 2.

It uses Vite, React, TypeScript 7, TanStack Router, TanStack Form, Effect v4, Panda CSS v2, Oxlint, and Oxfmt. See [`docs/tasks`](./docs/tasks/README.md) for the active backlog.

## History

Two annotated Git tags mark the rewrite boundary. `vite-rewrite-start` is the direct child of `nextjs-final`.

| Tag                  | Commit    | Marks                                               |
| -------------------- | --------- | --------------------------------------------------- |
| `nextjs-final`       | `34eb28e` | The last commit of the original Next.js application |
| `vite-rewrite-start` | `630c9f4` | The first commit of the Vite single-page rewrite    |

Check out `nextjs-final` to run the old app. `git diff nextjs-final vite-rewrite-start` shows where the rewrite began.

## Design

- [Typography](./docs/typography.md)
- [Color palette](https://paletton.com/#uid=14n0u0ktPiAlqqgpXmxBddWN28G) from the original Next.js application

## Development

```bash
pnpm install
pnpm exec playwright install chromium
pnpm check
```

`pnpm check` runs lint, format checks, unit tests, headless Chromium browser tests, typecheck, and the production build. GitHub Actions runs it from a clean install on every push and pull request. See [deployment](./docs/deployment.md) for Netlify.
