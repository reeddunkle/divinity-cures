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
- Confirm what a range of `0` means. The UI shows every range in meters, including Breathing Bubble, Break the Shackles, and Skin Graft at `0 m`.
- Check whether any other skill should use the explicit `"oncePerCombat"` cooldown. Skin Graft uses it, and a numeric `0` now means no cooldown.
- Check surprising cures, such as Fortify granting immunity to Teleport.
- Reconcile status names that look like duplicates. Peace of Mind shows both "Mad" and "Madness" as separate badges, and the data also has "Infected" beside "Infectious Disease" and "Frightened" beside "Terrified".
- Decide whether removing a beneficial status counts as a cure. Enrage currently lists "Clear-Minded" as a cure.
- Validate every cured status name against a known vocabulary, since the 39 names in `removes` and `immunities` are free strings today.
- Fill in the Skin Graft status description, which is `"MISSING INFO"`, and fix the Enraged stat name `"Critical Change"`.

## Acceptance criteria

- Every retained field has an intentional domain meaning.
- Redundant and derived data is removed or checked by an invariant.
- Factual corrections cite their source and have focused tests where applicable.
- Search consumes canonical names and aliases through one catalog interface.
