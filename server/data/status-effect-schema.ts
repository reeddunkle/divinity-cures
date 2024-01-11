import { z } from "zod";

import { skillStatSchema, statusEffectNameSchema } from "./schemas";

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
