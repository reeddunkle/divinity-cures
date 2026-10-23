import * as E from "effect/Effect";

import { loadCatalog } from "./catalog.ts";
import skills from "./data/skills.json";
import spellSchools from "./data/spell-schools.json";
import statusEffects from "./data/status-effects.json";

export const catalog = E.runSync(
  loadCatalog({
    skills,
    spellSchools,
    statusEffects,
  }),
);
