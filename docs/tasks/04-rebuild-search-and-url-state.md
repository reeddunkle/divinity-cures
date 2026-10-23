# Rebuild search, form, and URL state

**Priority:** P0

## Objective

Implement deterministic cure search with TanStack Form and URLs that can be shared, reloaded, and navigated through browser history.

## Work

- Define search behavior afresh rather than preserving legacy matching or fallback behavior automatically.
- Extract normalization, cure expansion, filtering, highlighting, and ordering into pure functions.
- Prefer Effect v4 collection, ordering, optionality, matching, and string utilities over equivalent handwritten helpers when they make the rules clearer.
- Specify matching for skill names, removed statuses, and granted immunities.
- Decide the no-results behavior instead of copying the previous-result fallback.
- Use TanStack Form rather than React Hook Form for search input state and submission behavior.
- Keep router search parameters as the durable source of shareable state and define synchronization with transient form state.
- Model the query with TanStack Router's typed search parameters and Effect Schema where runtime decoding is required.
- Decide when edits replace or push history entries.
- Evaluate TanStack Form's Standard Schema integration with Effect Schema; use it only where form validation benefits from a schema.
- Test empty queries, partial matches, casing, ordering, no results, URL restoration, submission, clearing, and navigation.

## References

- [TanStack Form React quick start](https://tanstack.com/form/latest/docs/framework/react/quick-start)
- [TanStack Form validation and Effect Schema support](https://tanstack.com/form/latest/docs/framework/react/guides/validation)

## Acceptance criteria

- The rewrite does not depend on React Hook Form.
- Search rules are explicitly documented by tests rather than inferred from the old app.
- Results do not depend on module-global or previous-render state.
- Sorting never mutates catalog data or component inputs.
- Reloading a URL restores the same query, form value, and results.
- Browser navigation restores prior search state without duplicate history entries.
