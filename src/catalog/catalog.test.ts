import * as E from "effect/Effect";
import { describe, expect, it } from "vitest";

import { loadCatalog } from "./catalog.ts";
import skills from "./data/skills.json";
import spellSchools from "./data/spell-schools.json";
import statusEffects from "./data/status-effects.json";
import type { SkillId, StatusEffectId } from "./schemas.ts";

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

  it("resolves Enrage to the Enraged status effect", () => {
    const catalog = loadCatalog(validInput).pipe(E.runSync);
    const enrage = catalog.skills.find((skill) => skill.name === "Enrage");

    expect(enrage?.statusEffects.map((applied) => applied.statusEffect.name)).toEqual(["Enraged"]);
  });

  it("decodes once-per-combat cooldowns and rejects other cooldown labels", () => {
    const catalog = loadCatalog(validInput).pipe(E.runSync);

    expect(catalog.skills.find((skill) => skill.name === "Skin Graft")?.cooldown).toBe(
      "oncePerCombat",
    );

    const error = loadCatalog({
      ...validInput,
      skills: [{ ...skills[0], cooldown: "infinite" }],
    }).pipe(E.flip, E.runSync);

    expect(error).toMatchObject({ _tag: "CatalogDecodeError" });
    expect(error.message).toContain("cooldown");
  });

  it.each([
    ["negative action points", { actionPoints: -1 }, "actionPoints"],
    ["fractional action points", { actionPoints: 1.5 }, "actionPoints"],
    ["more source points than the pool holds", { sourcePoints: 4 }, "sourcePoints"],
    ["negative memory", { memory: -1 }, "memory"],
    ["a negative cooldown", { cooldown: -2 }, "cooldown"],
    ["a fractional cooldown", { cooldown: 2.5 }, "cooldown"],
    ["a negative range", { range: -1 }, "range"],
    ["an empty identifier", { id: "" }, "id"],
    [
      "a school requirement below 1",
      { schools: [{ id: spellSchools[0]?.id, name: spellSchools[0]?.name, requires: 0 }] },
      "requires",
    ],
    [
      "an applied status lasting no turns",
      { statusEffects: [{ ...skills[0]?.statusEffects?.[0], duration: 0 }] },
      "duration",
    ],
  ])("rejects a skill with %s", (_case, override, field) => {
    const error = loadCatalog({
      ...validInput,
      skills: [{ ...skills[0], ...override }],
    }).pipe(E.flip, E.runSync);

    expect(error).toMatchObject({ _tag: "CatalogDecodeError" });
    expect(error.message).toContain(field);
  });

  it("keeps identifiers from different datasets apart", () => {
    const catalog = loadCatalog(validInput).pipe(E.runSync);
    const skillId: SkillId | undefined = catalog.skills[0]?.id;
    // @ts-expect-error A skill identifier is not a status-effect identifier.
    const statusEffectId: StatusEffectId | undefined = skillId;

    expect(statusEffectId).toBe("0");
  });

  it("accepts fractional ranges", () => {
    const catalog = loadCatalog({
      ...validInput,
      skills: [{ ...skills[0], range: 2.5 }],
    }).pipe(E.runSync);

    expect(catalog.skills[0]?.range).toBe(2.5);
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

  it("rejects school references whose name differs from the school", () => {
    const error = loadCatalog({
      ...validInput,
      skills: [
        {
          ...skills[0],
          schools: [{ id: "0", name: "Pyrokinetic" }],
        },
      ],
    }).pipe(E.flip, E.runSync);

    expect(error).toMatchObject({
      _tag: "MismatchedCatalogReferenceError",
      referenceName: "Pyrokinetic",
      sourceDataset: "skills",
      sourceId: skills[0]?.id,
      targetDataset: "spellSchools",
      targetId: "0",
      targetName: spellSchools[0]?.name,
    });
  });

  it("rejects applied-status references whose name differs from the status effect", () => {
    const skinGraft = statusEffects.find((statusEffect) => statusEffect.name === "Skin Graft");

    const error = loadCatalog({
      ...validInput,
      skills: [
        {
          ...skills[0],
          statusEffects: [{ id: skinGraft?.id ?? "", name: "Enraged" }],
        },
      ],
    }).pipe(E.flip, E.runSync);

    expect(error).toMatchObject({
      _tag: "MismatchedCatalogReferenceError",
      referenceName: "Enraged",
      sourceDataset: "skills",
      sourceId: skills[0]?.id,
      targetDataset: "statusEffects",
      targetId: skinGraft?.id,
      targetName: "Skin Graft",
    });
  });
});
