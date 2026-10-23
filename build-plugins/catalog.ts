import * as E from "effect/Effect";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";

import { loadCatalog } from "../src/catalog/catalog.ts";

const publicId = "virtual:bundled-catalog";
const resolvedId = `\0${publicId}`;

const dataFiles = {
  skills: fileURLToPath(new URL("../src/catalog/data/skills.json", import.meta.url)),
  spellSchools: fileURLToPath(new URL("../src/catalog/data/spell-schools.json", import.meta.url)),
  statusEffects: fileURLToPath(new URL("../src/catalog/data/status-effects.json", import.meta.url)),
};

const readJson = async (path: string): Promise<unknown> => JSON.parse(await readFile(path, "utf8"));

export const bundledCatalog = (): Plugin => ({
  async load(id) {
    if (id !== resolvedId) {
      return undefined;
    }

    for (const path of Object.values(dataFiles)) {
      this.addWatchFile(path);
    }

    const catalog = E.runSync(
      loadCatalog({
        skills: await readJson(dataFiles.skills),
        spellSchools: await readJson(dataFiles.spellSchools),
        statusEffects: await readJson(dataFiles.statusEffects),
      }),
    );

    return `export const catalog = JSON.parse(${JSON.stringify(JSON.stringify(catalog))});`;
  },
  name: "divinity-cures:bundled-catalog",
  resolveId(id) {
    return id === publicId ? resolvedId : undefined;
  },
});
