# Existing application observations

These observations help us understand the former application. They are not compatibility requirements.

- `/` shows cure cards and accepts a `search` query parameter.
- `/about` explains direct and indirect cures.
- Search matches skill names, removed statuses, and granted immunities by prefix.
- Empty search shows every skill considered a cure.
- A query with no matches falls back to results from a previous matching query through module-global state.
- Typing does not update the URL, while clearing navigates to `/`.
- Several render paths sort input arrays in place.
- Invalid catalog data is logged and then hidden behind non-null assertions.

The rewrite will retain the useful routes, content, and shareable-search goal. Search rules, ordering, failure handling, and URL synchronization will be specified afresh.
