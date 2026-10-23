import * as E from "effect/Effect";
import { describe, expect, it } from "vitest";

import { loadCatalog } from "./catalog.ts";
import skills from "./data/skills.json";
import spellSchools from "./data/spell-schools.json";
import statusEffects from "./data/status-effects.json";

const validInput = {
  skills,
  spellSchools,
  statusEffects,
};

describe("loadCatalog", () => {
  it("loads and resolves the current catalog", () => {
    const catalog = loadCatalog(validInput).pipe(E.runSync);

    expect(catalog.skills).toHaveLength(30);
    expect(catalog.schools).toHaveLength(12);
    expect(catalog.statusEffects).toHaveLength(21);
    expect(catalog.skills[0]?.schools[0]?.school.name).toBe("Geomancer");
    expect(catalog.skills[0]?.statusEffects[0]?.statusEffect.name).toBe("Fortified");
  });

  it("rejects unknown fields and reports every decoding issue", () => {
    const error = loadCatalog({
      skills: [
        {
          ...skills[0],
          actionPoints: "one",
        },
      ],
      spellSchools: [
        {
          ...spellSchools[0],
          description: 42,
          unexpected: true,
        },
      ],
      statusEffects,
    }).pipe(E.flip, E.runSync);

    expect(error).toMatchObject({
      _tag: "CatalogDecodeError",
    });
    expect(error.message).toContain("skills");
    expect(error.message).toContain("actionPoints");
    expect(error.message).toContain("spellSchools");
    expect(error.message).toContain("description");
    expect(error.message).toContain("unexpected");
  });

  it("rejects duplicate identifiers", () => {
    const error = loadCatalog({
      ...validInput,
      spellSchools: [spellSchools[0], spellSchools[0]],
    }).pipe(E.flip, E.runSync);

    expect(error).toMatchObject({
      _tag: "DuplicateCatalogIdError",
      dataset: "spellSchools",
      id: "0",
    });
  });

  it("rejects broken school references", () => {
    const error = loadCatalog({
      ...validInput,
      skills: [
        {
          ...skills[0],
          schools: [{ id: "missing", name: "Missing" }],
        },
      ],
    }).pipe(E.flip, E.runSync);

    expect(error).toMatchObject({
      _tag: "BrokenCatalogReferenceError",
      sourceDataset: "skills",
      targetDataset: "spellSchools",
      targetId: "missing",
    });
  });

  it("rejects broken applied-status references", () => {
    const error = loadCatalog({
      ...validInput,
      skills: [
        {
          ...skills[0],
          statusEffects: [{ id: "missing", name: "Missing" }],
        },
      ],
    }).pipe(E.flip, E.runSync);

    expect(error).toMatchObject({
      _tag: "BrokenCatalogReferenceError",
      sourceDataset: "skills",
      targetDataset: "statusEffects",
      targetId: "missing",
    });
  });
});
