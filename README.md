# Divinity Cures

A fresh static application for finding cures in Divinity: Original Sin 2.

The rewrite uses Vite, React, TypeScript 7, TanStack Router, TanStack Form, Effect v4, Panda CSS v2, Oxlint, and Oxfmt. See [`docs/tasks`](./docs/tasks/README.md) for the active backlog.

## Development

```bash
pnpm install
pnpm exec playwright install chromium
pnpm check
```

`pnpm check` runs lint, format checks, unit tests, browser tests in headless Chromium, typecheck, and the production build. See [deployment](./docs/deployment.md) for Netlify.
