import { z } from "zod";

import { ATTRIBUTES, STATUS_EFFECTS } from "@/util/constants";

const normalizedStatusEffects = STATUS_EFFECTS.map((se) => se.toLowerCase());

const normalizedAttributes = ATTRIBUTES.map((attribute) =>
  attribute.toLowerCase(),
);

const attributeNameSchema = z.string().refine(
  (value) => normalizedAttributes.includes(value.toLowerCase()),
  (value) => ({
    message: `${value} must be a valid Attribute.`,
  }),
);

export const statusEffectNameSchema = z.string().refine(
  (value) => normalizedStatusEffects.includes(value.toLowerCase()),
  (value) => ({
    message: `${value} must be a valid Status Effect.`,
  }),
);

export const skillStatSchema = z.object({
  amount: z.number().optional(),
  name: attributeNameSchema,
  percent: z.number().optional(),
  scales: z.boolean().optional(),
});
