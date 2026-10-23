# Audit catalog semantics and content

**Priority:** P1

## Objective

Turn structurally valid inherited data into a deliberately modeled and trustworthy catalog.

## Context

The original schemas silently stripped fields that exist in the datasets, including skill notes, surface removals, aliases, nested descriptions and images, nested stats, and status scaling. The status-effect dataset also describes applied positive effects rather than every negative status a skill can remove.

## Work

- Decide which concepts belong in the catalog and name them consistently.
- Review redundant names stored beside identifier references and decide whether to remove or validate them.
- Define numeric constraints for costs, cooldowns, ranges, durations, requirements, amounts, and percentages.
- Decide whether string identifiers remain appropriate or should become branded domain values.
- Audit aliases and normalization rules used by future search behavior.
- Review factual game content against trustworthy sources without silently changing inherited data.
- Separate factual corrections from structural migrations so each change is reviewable.
- Confirm what a range of `0` means. The UI shows every range in meters, including Breathing Bubble, Break the Shackles, and Skin Graft at `0 m`.
- Check whether any other skill should use the explicit `"oncePerCombat"` cooldown. Skin Graft uses it, and a numeric `0` now means no cooldown.
- Check surprising cures, such as Fortify granting immunity to Teleport.

## Acceptance criteria

- Every retained field has an intentional domain meaning.
- Redundant and derived data is removed or checked by an invariant.
- Numeric and identifier constraints are encoded in Effect Schema.
- Factual corrections cite their source and have focused tests where applicable.
- Search consumes canonical names and aliases through one catalog interface.
