# Review the catalog schema

**Priority:** P2

## Objective

Reshape the catalog schema so hand-edited data stays easy to write and the loader catches every mistake it can.

## Context

The [data model](../catalog-content.md#data-model) documents each field, and the loader checks status names and references. Several inherited shapes stayed because changing them was outside the semantic audit.

## Work

- Weigh plain canonical-name strings in `removes` and `immunities` against `{ id, name }` references like `statusEffects`, considering hand-editing cost and rename safety.
- Decide whether a status's `scales` flag duplicates the `scales` flags on its stats, as on Clear-Minded, and remove or check whichever is redundant.
- Decide whether a stat may have both an `amount` and a `percent`, or neither, and encode the answer in the schema.
- Decide whether the per-skill `description`, `imageSrc`, and `stats` overrides on applied statuses should stay on the reference or move to their own records.
- Consider a surface vocabulary for `surfaces`, `surfaceRemoves`, and `givenBy`, which are free strings today.
- Consider whether numeric string identifiers should become readable slugs.
- Consider checking that cures named in a skill's tooltip text appear in its structured data.

## Acceptance criteria

- Each item above is either changed with a migration that leaves the facts unchanged, or recorded as a deliberate decision.
- The data model in catalog content matches the schema.
