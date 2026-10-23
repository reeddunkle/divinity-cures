# Fix broken catalog references

**Priority:** P0

## Objective

Make every skill reference the record its data claims, and fail the catalog load when a reference and its stored name disagree.

## Context

Enrage applies status effect `"15"` under the name `"Enraged"`, but `"15"` is the Skin Graft status, whose description is `"MISSING INFO"`. The real Enraged record is `"16"`. Neither record currently removes or grants immunity to anything, so search results look correct today, but any data added to either record would attach to the wrong skill.

`loadCatalog` checks that each referenced ID exists. It ignores the `name` stored beside each school and status-effect reference, so this mismatch passes every check. Task 08 decides whether those names stay in the data long term. Until then they are the only signal that catches this class of mistake.

## Work

- Point Enrage's status-effect reference at `"16"`.
- Add a tagged error for a reference whose stored name differs from the target record's name, and fail `loadCatalog` with it.
- Cover both school and status-effect references with focused tests.

## Acceptance criteria

- Enrage resolves to the Enraged status effect.
- A mismatched reference name fails `loadCatalog` with a tagged error that names the source and target records.
- The shipped datasets load without errors.
