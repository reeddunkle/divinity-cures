import * as E from "effect/Effect";
import { describe, expect, it } from "vitest";

import skills from "./data/skills.json";
import spellSchools from "./data/spell-schools.json";
import statusEffects from "./data/status-effects.json";
import { loadCatalog } from "./catalog.ts";

const validInput = {
  skills,
  spellSchools,
  statusEffects,
};

describe("loadCatalog", () => {
  it("loads and resolves the current catalog", () => {
    const catalog = E.runSync(loadCatalog(validInput));

    expect(catalog.skills).toHaveLength(30);
    expect(catalog.schools).toHaveLength(12);
    expect(catalog.statusEffects).toHaveLength(21);
    expect(catalog.skills[0]?.schools[0]?.school.name).toBe("Geomancer");
    expect(catalog.skills[0]?.statusEffects[0]?.statusEffect.name).toBe(
      "Fortified",
    );
  });

  it("rejects unknown fields and reports every decoding issue", () => {
    const error = E.runSync(
      E.flip(
        loadCatalog({
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
        }),
      ),
    );

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
    const error = E.runSync(
      E.flip(
        loadCatalog({
          ...validInput,
          spellSchools: [spellSchools[0], spellSchools[0]],
        }),
      ),
    );

    expect(error).toMatchObject({
      _tag: "DuplicateCatalogIdError",
      dataset: "spellSchools",
      id: "0",
    });
  });

  it("rejects broken school references", () => {
    const error = E.runSync(
      E.flip(
        loadCatalog({
          ...validInput,
          skills: [
            {
              ...skills[0],
              schools: [{ id: "missing", name: "Missing" }],
            },
          ],
        }),
      ),
    );

    expect(error).toMatchObject({
      _tag: "BrokenCatalogReferenceError",
      sourceDataset: "skills",
      targetDataset: "spellSchools",
      targetId: "missing",
    });
  });

  it("rejects broken applied-status references", () => {
    const error = E.runSync(
      E.flip(
        loadCatalog({
          ...validInput,
          skills: [
            {
              ...skills[0],
              statusEffects: [{ id: "missing", name: "Missing" }],
            },
          ],
        }),
      ),
    );

    expect(error).toMatchObject({
      _tag: "BrokenCatalogReferenceError",
      sourceDataset: "skills",
      targetDataset: "statusEffects",
      targetId: "missing",
    });
  });
});
