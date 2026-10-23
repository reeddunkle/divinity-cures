# Audit catalog semantics and content

**Priority:** P1

## Objective

Turn structurally valid inherited data into a deliberately modeled and trustworthy catalog.

## Context

The original schemas silently stripped fields that exist in the datasets, including skill notes, surface removals, aliases, nested descriptions and images, nested stats, and status scaling. The status-effect dataset also describes applied positive effects rather than every negative status a skill can remove.

## Work

- Decide which concepts belong in the catalog and name them consistently.
- Audit aliases and normalization rules used by future search behavior.
- Review factual game content against trustworthy sources without silently changing inherited data.
- Separate factual corrections from structural migrations so each change is reviewable.
- Settle the open questions in [catalog content](../catalog-content.md#open-questions): Infected versus Infectious Disease, Frightened versus Terrified, and Peace of Mind's extra cures. Mad and Madness are reconciled.
- Decide whether removing a beneficial status counts as a cure. Enrage currently lists "Clear-Minded" as a cure, as the Next.js application did.
- Validate every cured status name against a known vocabulary, since the 38 names in `removes` and `immunities` are free strings today.

## Acceptance criteria

- Every retained field has an intentional domain meaning.
- Redundant and derived data is removed or checked by an invariant.
- Factual corrections cite their source and have focused tests where applicable.
- Every cured status name resolves to a canonical status, and aliases live only on status records.
