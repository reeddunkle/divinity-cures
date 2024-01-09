import type { Skill } from "@/data/skill-schema";
import type { StatusEffect } from "@/data/status-effect-schema";

import {
  compareNumbers,
  compareStrings,
  isNumber,
  isString,
  keyBy,
} from "./util";

const uniqueArrayString = (arr: string[]) => {
  return Array.from(new Set(arr));
};

export function buildSkills({
  skills,
  statusEffects,
}: {
  skills: Skill[];
  statusEffects: StatusEffect[];
}): Skill[] {
  const seByName = keyBy(statusEffects, (se) => se.name);

  return skills.map((skill) => {
    const removesSet = uniqueArrayString([
      ...skill.removes,
      ...(seByName[skill.name]?.removes ?? []),
    ]);

    const immunitiesSet = uniqueArrayString([
      ...skill.immunities,
      ...(seByName[skill.name]?.immunities ?? []),
    ]);

    return {
      ...skill,
      immunities: immunitiesSet,
      removes: removesSet,
    };
  });
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
