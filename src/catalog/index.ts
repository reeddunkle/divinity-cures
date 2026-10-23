import * as E from "effect/Effect";

import skills from "./data/skills.json";
import spellSchools from "./data/spell-schools.json";
import statusEffects from "./data/status-effects.json";
import { loadCatalog } from "./catalog.ts";

export type { AppliedStatusEffect, Catalog, CatalogInput, Skill, SkillSchool } from "./catalog.ts";
export { loadCatalog } from "./catalog.ts";
export type { CatalogError } from "./errors.ts";
export {
  BrokenCatalogReferenceError,
  CatalogDecodeError,
  DuplicateCatalogIdError,
} from "./errors.ts";

export const catalog = E.runSync(
  loadCatalog({
    skills,
    spellSchools,
    statusEffects,
  }),
);
