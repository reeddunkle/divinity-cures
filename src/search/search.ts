import * as A from "effect/Array";
import { pipe } from "effect/Function";
import * as Order from "effect/Order";
import * as Str from "effect/String";

import type { Skill } from "../catalog/catalog.ts";

export type Cure = {
  readonly grantsImmunity: boolean;
  readonly status: string;
};

export type CureSkill = {
  readonly cures: readonly Cure[];
  readonly skill: Skill;
};

export type MatchedCure = Cure & {
  readonly isMatch: boolean;
};

export type SearchResult = {
  readonly cures: readonly MatchedCure[];
  readonly isNameMatch: boolean;
  readonly skill: Skill;
};

const wordCharacter = /[\p{L}\p{N}]/u;

export const normalizeSearchText = (text: string) =>
  pipe(text, Str.normalize("NFKC"), Str.toLowerCase, Str.replace(/\s+/gu, " "), Str.trim);

const isWordStart = (text: string, index: number) =>
  index === 0 || !wordCharacter.test(text.charAt(index - 1));

const matchesQuery = (query: string) => (text: string) => {
  const normalized = normalizeSearchText(text);

  return pipe(
    A.range(0, normalized.length),
    A.some((index) => isWordStart(normalized, index) && Str.startsWith(query, index)(normalized)),
  );
};

const byStatus = Order.mapInput(Order.String, (cure: Cure) => cure.status);

const byCost = [
  Order.mapInput(Order.Number, (cureSkill: CureSkill) => cureSkill.skill.sourcePoints),
  Order.mapInput(Order.Number, (cureSkill: CureSkill) => cureSkill.skill.actionPoints),
  Order.mapInput(Order.String, (cureSkill: CureSkill) => normalizeSearchText(cureSkill.skill.name)),
  Order.mapInput(Order.String, (cureSkill: CureSkill) => cureSkill.skill.id),
] as const;

const expandCures = (skill: Skill): readonly Cure[] => {
  const immunities = A.union(
    skill.immunities,
    A.flatMap(skill.statusEffects, (applied) => applied.statusEffect.immunities),
  );
  const removals = A.union(
    skill.removes,
    A.flatMap(skill.statusEffects, (applied) => applied.statusEffect.removes),
  );

  return pipe(
    A.union(immunities, removals),
    A.map((status) => ({
      grantsImmunity: A.contains(immunities, status),
      status,
    })),
    A.sortBy(byStatus),
  );
};

export const prepareCureSkills = (skills: readonly Skill[]): readonly CureSkill[] =>
  pipe(
    skills,
    A.map((skill) => ({ cures: expandCures(skill), skill })),
    A.filter((cureSkill) => A.isReadonlyArrayNonEmpty(cureSkill.cures)),
    A.sortBy(...byCost),
  );

const toResult = (cureSkill: CureSkill, matches: (text: string) => boolean): SearchResult => ({
  cures: A.map(cureSkill.cures, (cure) => ({ ...cure, isMatch: matches(cure.status) })),
  isNameMatch: matches(cureSkill.skill.name),
  skill: cureSkill.skill,
});

const isMatch = (result: SearchResult) =>
  result.isNameMatch || A.some(result.cures, (cure) => cure.isMatch);

export const searchCures = (
  cureSkills: readonly CureSkill[],
  query: string,
): readonly SearchResult[] => {
  const normalizedQuery = normalizeSearchText(query);

  if (Str.isEmpty(normalizedQuery)) {
    return A.map(cureSkills, (cureSkill) => toResult(cureSkill, () => false));
  }

  return pipe(
    cureSkills,
    A.map((cureSkill) => toResult(cureSkill, matchesQuery(normalizedQuery))),
    A.filter(isMatch),
  );
};
