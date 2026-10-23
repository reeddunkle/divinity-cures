import * as A from "effect/Array";

import type { Skill } from "../catalog/catalog.ts";
import type { SchoolId } from "../catalog/schemas.ts";

export type SchoolRequirement = {
  readonly count: number;
  readonly id: SchoolId;
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

export const cooldownGlyph = (cooldown: Skill["cooldown"]) => {
  if (cooldown === "oncePerCombat") {
    return "1×";
  }

  return cooldown === 0 ? "–" : `${cooldown}`;
};

export const rangeLabel = (range: number) => `${range} m`;

export const schoolRequirements = (skill: Pick<Skill, "schools">): readonly SchoolRequirement[] =>
  A.map(skill.schools, ({ requires, school }) => ({
    count: requires ?? 1,
    id: school.id,
    imageSrc: school.imageSrcColored,
    label: requires === undefined ? school.name : `${school.name} ${requires}`,
    name: school.name,
  }));
