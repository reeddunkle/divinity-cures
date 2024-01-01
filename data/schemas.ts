import { z } from "zod";

import { ATTRIBUTES, SKILL_SCHOOLS, STATUS_EFFECTS } from "@/util/constants";

const normalizedStatusEffects = STATUS_EFFECTS.map((se) => se.toLowerCase());

const normalizedAttributes = ATTRIBUTES.map((attribute) =>
  attribute.toLowerCase(),
);

//

const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);

type Literal = z.infer<typeof literalSchema>;

type Json = Literal | { [key: string]: Json } | Json[];

export const jsonSchema: z.ZodType<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]),
);

//

const attributeNameSchema = z.string().refine(
  (value) => normalizedAttributes.includes(value.toLowerCase()),
  (value) => ({
    message: `${value} must be a valid Attribute.`,
  }),
);

const statusEffectNameSchema = z.string().refine(
  (value) => normalizedStatusEffects.includes(value.toLowerCase()),
  (value) => ({
    message: `${value} must be a valid Status Effect.`,
  }),
);

// Skills

const requirementSchema = z.object({
  id: z.string(),
  name: z.string(),
  number: z.number(),
});

const skillStatSchema = z.object({
  amount: z.number().optional(),
  name: attributeNameSchema,
  percent: z.number().optional(),
  scales: z.boolean().optional(),
});

const skillStatusEffectSchema = z.object({
  duration: z.number().optional(),
  id: z.string(),
  name: statusEffectNameSchema,
});

const skillSchoolSchema = z.object({
  id: z.string(),
  name: z.string(),
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
  requirements: z.array(requirementSchema).default([]),
  schools: z.array(skillSchoolSchema),
  sourcePoints: z.number(),
  stats: z.array(skillStatSchema).default([]),
  statusEffects: z.array(skillStatusEffectSchema).default([]),
  surfaces: z.array(z.string()).default([]),
});

export const skillSchemaArray = z.array(skillSchema);

export type Skill = z.infer<typeof skillSchema>;

export type SkillSchool = z.infer<typeof skillSchoolSchema>;

// Status Effects

const statusEffectSchema = z.object({
  clearedBy: z.array(statusEffectNameSchema).default([]),
  description: z.string(),
  givenBy: z.array(z.string()).default([]),
  id: z.string(),
  imageSrc: z.string(),
  immunities: z.array(statusEffectNameSchema).default([]),
  name: statusEffectNameSchema,
  removes: z.array(statusEffectNameSchema).default([]),
  stats: z.array(skillStatSchema).default([]),
});

export const statusEffectSchemaArray = z.array(statusEffectSchema);

export type StatusEffect = z.infer<typeof statusEffectSchema>;

// Spell Schools

const spellSchoolModifierSchema = z.object({
  amount: z.number().optional(),
  percent: z.number().optional(),
  type: z.string(),
});

const spellSchoolEffectSchema = z.object({
  amount: z.number().optional(),
  percent: z.number().optional(),
  type: z.string(),
});

const spellSchoolSchema = z.object({
  description: z.string(),
  effects: z.array(spellSchoolEffectSchema).optional().default([]),
  id: z.string(),
  imageSrc: z.string().optional(),
  imageSrcColored: z.string(),
  modifies: z.array(spellSchoolModifierSchema).optional().default([]),
  name: z.string(),
});

export const spellSchoolSchemaArray = z.array(spellSchoolSchema);

export type SpellSchool = z.infer<typeof spellSchoolSchema>;
