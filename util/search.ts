/* eslint-disable no-param-reassign */

import type { Skill, StatusEffect } from "@/data/schemas";

import {
  compareNumbers,
  compareStrings,
  identity,
  isNumber,
  isString,
  keyBy,
  lowerCase,
  startsWith,
  uniqueBy,
} from "./util";

const mapEffectToSkills = (statusEffect: StatusEffect, skills: Skill[]) => {
  const statusRemoves = statusEffect.removes;

  return skills
    .filter((skill) => {
      const skillStatusEffects = skill.statusEffects;

      return skillStatusEffects
        .map(({ name = "" }) => name.toLowerCase())
        .includes(statusEffect.name.toLowerCase());
    })
    .map(({ removes = [], ...rest }) => ({
      ...rest,
      removes: uniqueBy([...statusRemoves, ...removes], identity),
    }));
};

//

type SearchData = {
  skills: Skill[];
  statusEffects: StatusEffect[];
};

export function searchCures(ailment: string, data: SearchData) {
  ailment = lowerCase(ailment);

  const { skills, statusEffects } = data;

  const skillCures = skills.filter(
    (skill) =>
      skill.immunities.some((value) => startsWith(value, ailment)) ||
      skill.removes.some((value) => startsWith(value, ailment)),
  );

  const effectCures = statusEffects.filter(
    ({ immunities = [], removes = [] }) =>
      immunities.some((value) => startsWith(value, ailment)) ||
      removes.some((value) => startsWith(value, ailment)),
  );

  const skillCuresFromEffects = effectCures
    .map((effect) => mapEffectToSkills(effect, skills))
    .flat();

  const results = Object.values({
    ...keyBy(skillCures, (sk) => sk.name.toLowerCase()),
    ...keyBy(skillCuresFromEffects, (sk) => sk.name.toLowerCase()),
  });

  return results;
}

export const compareSkillsBy = (...properties: (keyof Skill)[]) => {
  return (skillA: Skill, skillB: Skill) => {
    return properties.reduce((accumulator, key) => {
      if (isString(skillA[key]) && isString(skillB[key])) {
        const valueA = skillA[key] as string;
        const valueB = skillB[key] as string;

        return accumulator + compareStrings(valueA, valueB);
      }

      if (isNumber(skillA[key]) && isNumber(skillB[key])) {
        const valueA = skillA[key] as number;
        const valueB = skillB[key] as number;

        return accumulator + compareNumbers(valueA, valueB);
      }

      return accumulator;
    }, 0);
  };
};
