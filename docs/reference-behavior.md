# Existing application observations

How the old app behaved. None of this is a compatibility requirement.

- `/` shows cure cards and accepts a `search` query parameter.
- `/about` explains direct and indirect cures.
- Search matches skill names, removed statuses, and granted immunities by prefix.
- Empty search shows every skill considered a cure.
- A query with no matches falls back to results from a previous matching query through module-global state.
- Typing does not update the URL, while clearing navigates to `/`.
- Several render paths sort input arrays in place.
- Invalid catalog data is logged and then hidden behind non-null assertions.

The rewrite keeps the useful routes, content, and shareable searches, and specifies search rules, ordering, failure handling, and URL sync from scratch.
