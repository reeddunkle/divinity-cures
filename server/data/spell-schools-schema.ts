import { z } from "zod";

const schoolModifierSchema = z.object({
  amount: z.number().optional(),
  percent: z.number().optional(),
  type: z.string(),
});

const schoolEffectSchema = z.object({
  amount: z.number().optional(),
  percent: z.number().optional(),
  type: z.string(),
});

export const schoolSchema = z.object({
  description: z.string(),
  effects: z.array(schoolEffectSchema).optional().default([]),
  id: z.string(),
  imageSrc: z.string().optional(),
  imageSrcColored: z.string(),
  modifies: z.array(schoolModifierSchema).optional().default([]),
  name: z.string(),
});

export const schoolSchemaArray = z.array(schoolSchema);

export type School = z.infer<typeof schoolSchema>;
