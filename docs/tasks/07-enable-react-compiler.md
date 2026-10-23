# Enable and measure React Compiler

**Priority:** P1

## Objective

Enable React Compiler after the first interactive React slice exists and verify that it provides value without hiding correctness problems.

## Work

- Resolve React Compiler diagnostics surfaced by `eslint-plugin-react-hooks`.
- Record baseline production build and bundle measurements.
- Enable the compiler through the supported Vite React integration.
- Compare build behavior and output with the baseline.
- Verify routes, forms, and tests with compilation enabled.

## Acceptance criteria

- No unresolved compiler diagnostics remain in application code.
- Production builds and tests pass with the compiler enabled.
- The measured result and decision to retain or remove the compiler are documented.
