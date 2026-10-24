# Adopt the import alias across the app

**Priority:** P3

## Objective

Import application modules through the `@/` alias so imports read the same from every directory and survive file moves.

## Context

The tests in `src/tests/` import source through `@/`, which maps to `src/` in the Vite and TypeScript configuration. Application code still uses relative imports, and 16 of its files reach into parent directories with `../`.

## Work

- Decide whether `@/` replaces every relative import or only those that leave the importing file's directory.
- Rewrite application imports to match the decision.
- Consider enforcing the decision with a lint rule so new relative parent imports fail `pnpm lint`.

## Acceptance criteria

- Application imports follow one documented rule.
- `pnpm check` passes.
