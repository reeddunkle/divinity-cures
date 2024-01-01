import { promises as fs } from "node:fs";

import type { z } from "zod";

import { skillSchemaArray, statusEffectSchemaArray } from "@/data/skill-schema";
import { schoolSchemaArray } from "@/data/spell-schools-schema";

async function loadJsonToZod<SchemaType extends z.ZodTypeAny>(
  filePath: string,
  schema: SchemaType,
) {
  const jsonFile = await fs.readFile(filePath, "utf8");

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const parsedData = await JSON.parse(jsonFile);

  const parseResult = schema.safeParse(parsedData);

  if (!parseResult.success) {
    console.log("");
    console.log(`!ZOD -- Failed loading ${filePath}.`);
    console.log(parseResult.error.issues);
    console.log("");
  }

  if (parseResult.success) {
    return parseResult.data as Promise<z.infer<typeof schema>>;
  }
}

//

export async function loadSkills() {
  const filePath = `${process.cwd()}/data/skills.json`;

  const skillData = await loadJsonToZod(filePath, skillSchemaArray);

  return skillData;
}

export async function loadStatusEffects() {
  const filePath = `${process.cwd()}/data/statusEffects.json`;

  const skillData = await loadJsonToZod(filePath, statusEffectSchemaArray);

  return skillData;
}

export async function loadSpellSchools() {
  const filePath = `${process.cwd()}/data/spellSchools.json`;

  const skillData = await loadJsonToZod(filePath, schoolSchemaArray);

  return skillData;
}
