import { z } from "zod";

import { skillStatSchema, statusEffectNameSchema } from "./schemas";
import { schoolSchema } from "./spell-schools-schema";
import type { School } from "./spell-schools-schema";

const skillStatusEffectSchema = z.object({
  duration: z.number().optional(),
  id: z.string(),
  name: statusEffectNameSchema,
});

const skillSchoolSchema = z.object({
  id: z.string(),
  name: z.string(),
  requires: z.number().optional(),
});

export const skillSchema = z.object({
  actionPoints: z.number(),
  cooldown: z.number(),
  description: z.string(),
  id: z.string(),
  imageSrc: z.string(),
  immunities: z.array(z.string()).default([]),
  memory: z.number(),
  name: z.string(),
  range: z.number(),
  removes: z.array(z.string()).default([]),
  schools: z.array(skillSchoolSchema),
  sourcePoints: z.number(),
  stats: z.array(skillStatSchema).default([]),
  statusEffects: z.array(skillStatusEffectSchema).default([]),
  surfaces: z.array(z.string()).default([]),
});

export const skillSchemaArray = z.array(skillSchema);

type BaseSkillSchool = z.infer<typeof skillSchoolSchema>;

export type BaseSkill = z.infer<typeof skillSchema>;

export const skillWithSchoolSchema = skillSchema.merge(
  z.object({
    schools: z.array(skillSchoolSchema.merge(schoolSchema)),
  }),
);

export type Skill = z.infer<typeof skillWithSchoolSchema>;

export type SkillSchool = BaseSkillSchool & School;
