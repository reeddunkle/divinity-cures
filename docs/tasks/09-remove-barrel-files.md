# Remove barrel files

**Priority:** P1

## Objective

Replace barrel exports with intentional public module paths before catalog and search imports spread throughout the application.

## Work

- Replace `src/catalog/index.ts` with an explicit public module design.
- Update application and test imports to use the chosen module paths.
- Keep domain implementation details private without relying on re-export-only files.
- Enable `oxc/no-barrel-file` after the existing barrel has been removed.

## Acceptance criteria

- No source file exists only to re-export symbols from other modules.
- Application imports communicate which domain module they depend on.
- `oxc/no-barrel-file` is enabled and passes.
- Typechecking, linting, tests, and the production build pass.
