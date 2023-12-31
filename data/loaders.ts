import { promises as fs } from "node:fs";

import { skillSchemaArray, statusEffectSchemaArray } from "@/data/schemas.ts";

async function loadSkills() {
  const filePath = `${process.cwd()}/data/skills.json`;

  const skillsFile = await fs.readFile(filePath, "utf8");

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const parsedSkillsFile = await JSON.parse(skillsFile);

  const parseResult = skillSchemaArray.safeParse(parsedSkillsFile);

  if (!parseResult.success) {
    console.log("");
    console.log(`!ZOD -- Failed loading ${filePath}.`);
    console.log(parseResult.error.issues);
    console.log("");
  }

  if (parseResult.success) {
    return parseResult.data;
  }
}

async function loadStatusEffects() {
  const filePath = `${process.cwd()}/data/statusEffects.json`;

  const statusEffectsFile = await fs.readFile(filePath, "utf8");

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const parsedStatusEffectsFile = await JSON.parse(statusEffectsFile);

  const parseResult = statusEffectSchemaArray.safeParse(
    parsedStatusEffectsFile,
  );

  if (!parseResult.success) {
    console.log("");
    console.log(`!ZOD -- Failed loading ${filePath}.`);
    console.log(parseResult.error.issues);
    console.log("");
  }

  if (parseResult.success) {
    return parseResult.data;
  }
}

export { loadSkills, loadStatusEffects };
