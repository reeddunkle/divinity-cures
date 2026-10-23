import * as A from "effect/Array";

import type { Skill } from "../catalog/catalog.ts";

export type SchoolRequirement = {
  readonly id: string;
  readonly imageSrc: string;
  readonly label: string;
  readonly name: string;
};

const count = (amount: number, singular: string, plural: string) =>
  `${amount} ${amount === 1 ? singular : plural}`;

export const costLabel = (skill: Pick<Skill, "actionPoints" | "sourcePoints">) =>
  `${count(skill.actionPoints, "action point", "action points")}, ${count(
    skill.sourcePoints,
    "source point",
    "source points",
  )}`;

export const cooldownLabel = (cooldown: Skill["cooldown"]) => {
  if (cooldown === "oncePerCombat") {
    return "Once per combat";
  }

  return cooldown === 0 ? "None" : count(cooldown, "turn", "turns");
};

export const rangeLabel = (range: number) => `${range} m`;

export const schoolRequirements = (skill: Pick<Skill, "schools">): readonly SchoolRequirement[] =>
  A.map(skill.schools, ({ requires, school }) => ({
    id: school.id,
    imageSrc: school.imageSrcColored,
    label: requires === undefined ? school.name : `${school.name} ${requires}`,
    name: school.name,
  }));
