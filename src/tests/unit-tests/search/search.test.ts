import { catalog } from "virtual:bundled-catalog";
import { describe, expect, it } from "vitest";

import type { Skill, StatusEffect } from "@/catalog/catalog.ts";
import { SchoolId, type SchoolRecord, SkillId, StatusEffectId } from "@/catalog/schemas.ts";
import { normalizeSearchText, prepareCureSkills, searchCures } from "@/search/search.ts";

const makeStatusEffect = (overrides: Partial<StatusEffect>): StatusEffect => ({
  aliases: [],
  clearedBy: [],
  description: "",
  givenBy: [],
  id: StatusEffectId.make("status"),
  imageSrc: "",
  immunities: [],
  name: "Status",
  removes: [],
  stats: [],
  ...overrides,
});

const makeSchool = (id: string, name: string): SchoolRecord => ({
  description: "",
  effects: [],
  id: SchoolId.make(id),
  imageSrcColored: "",
  modifies: [],
  name,
});

const geomancer = makeSchool("geomancer", "Geomancer");
const hydrosophist = makeSchool("hydrosophist", "Hydrosophist");
const warfare = makeSchool("warfare", "Warfare");

const makeSkill = (overrides: Partial<Skill>): Skill => ({
  actionPoints: 1,
  cooldown: 1,
  description: "",
  id: SkillId.make("skill"),
  imageSrc: "",
  immunities: [],
  memory: 1,
  name: "Skill",
  notes: [],
  range: 1,
  removes: [],
  schools: [],
  sourcePoints: 0,
  stats: [],
  statusEffects: [],
  surfaceRemoves: [],
  surfaces: [],
  ...overrides,
});

const applied = (statusEffect: StatusEffect) => ({ stats: [], statusEffect });

const fortify = makeSkill({
  id: SkillId.make("fortify"),
  name: "Fortify",
  removes: ["Poisoned", "Burning"],
  schools: [{ requires: 1, school: geomancer }],
});
const firstAid = makeSkill({
  id: SkillId.make("first-aid"),
  name: "First Aid",
  removes: ["Infectious Disease", "Blinded"],
});
const restoration = makeSkill({
  actionPoints: 2,
  id: SkillId.make("restoration"),
  name: "Restoration",
  schools: [
    { requires: 1, school: hydrosophist },
    { requires: 1, school: warfare },
  ],
  statusEffects: [
    applied(
      makeStatusEffect({
        immunities: ["Blinded", "Muted"],
        name: "Rested",
        removes: ["Blinded", "Muted", "Crippled"],
      }),
    ),
  ],
});
const sourceCure = makeSkill({
  actionPoints: 1,
  id: SkillId.make("source-cure"),
  name: "Arcane Cure",
  removes: ["Burning"],
  sourcePoints: 1,
});
const noCures = makeSkill({
  id: SkillId.make("no-cures"),
  name: "Burning Touch",
});

const skills = [sourceCure, restoration, noCures, firstAid, fortify];
const statusAliases = [makeStatusEffect({ aliases: ["Aflame"], name: "Burning" })];
const cureSkills = prepareCureSkills(skills, statusAliases);

const names = (results: ReturnType<typeof searchCures>) =>
  results.map((result) => result.skill.name);

describe("normalizeSearchText", () => {
  it("lowercases, trims, and collapses whitespace", () => {
    expect(normalizeSearchText("  First \t  AID ")).toBe("first aid");
  });

  it("folds compatibility characters", () => {
    expect(normalizeSearchText("ＢＵＲＮ")).toBe("burn");
  });
});

describe("prepareCureSkills", () => {
  it("combines direct cures with cures from applied status effects", () => {
    const restorationCures = cureSkills.find(
      (cureSkill) => cureSkill.skill.id === "restoration",
    )?.cures;

    expect(restorationCures).toEqual([
      { aliases: [], grantsImmunity: true, status: "Blinded" },
      { aliases: [], grantsImmunity: false, status: "Crippled" },
      { aliases: [], grantsImmunity: true, status: "Muted" },
    ]);
  });

  it("excludes skills that cure nothing", () => {
    expect(cureSkills.map((cureSkill) => cureSkill.skill.id)).not.toContain("no-cures");
  });

  it("orders by Source Points, then Action Points, then name", () => {
    expect(cureSkills.map((cureSkill) => cureSkill.skill.name)).toEqual([
      "First Aid",
      "Fortify",
      "Restoration",
      "Arcane Cure",
    ]);
  });

  it("does not mutate its input", () => {
    const frozen = Object.freeze([...skills]);

    expect(() => prepareCureSkills(frozen, statusAliases)).not.toThrow();
    expect(frozen).toEqual(skills);
  });
});

describe("searchCures", () => {
  it("returns every cure skill without highlights for an empty query", () => {
    const results = searchCures(cureSkills, "");

    expect(names(results)).toEqual(["First Aid", "Fortify", "Restoration", "Arcane Cure"]);
    expect(
      results.every(
        (result) =>
          !result.isNameMatch &&
          result.matchedSchoolIds.length === 0 &&
          result.cures.every((cure) => !cure.isMatch),
      ),
    ).toBe(true);
  });

  it("treats a whitespace-only query as empty", () => {
    expect(searchCures(cureSkills, "   ")).toEqual(searchCures(cureSkills, ""));
  });

  it("matches removed statuses by prefix and highlights only the matching cures", () => {
    const results = searchCures(cureSkills, "burn");

    expect(names(results)).toEqual(["Fortify", "Arcane Cure"]);
    expect(results[0]?.cures).toEqual([
      { aliases: ["Aflame"], grantsImmunity: false, isMatch: true, status: "Burning" },
      { aliases: [], grantsImmunity: false, isMatch: false, status: "Poisoned" },
    ]);
  });

  it("matches granted immunities", () => {
    const results = searchCures(cureSkills, "mut");

    expect(names(results)).toEqual(["Restoration"]);
    expect(results[0]?.cures.find((cure) => cure.isMatch)).toEqual({
      aliases: [],
      grantsImmunity: true,
      isMatch: true,
      status: "Muted",
    });
  });

  it("matches a status by its alias and highlights the canonical name", () => {
    const results = searchCures(cureSkills, "aflame");

    expect(names(results)).toEqual(["Fortify", "Arcane Cure"]);
    expect(results[0]?.cures.filter((cure) => cure.isMatch).map((cure) => cure.status)).toEqual([
      "Burning",
    ]);
  });

  it("ignores casing and surrounding whitespace", () => {
    expect(names(searchCures(cureSkills, "  BuRnInG "))).toEqual(["Fortify", "Arcane Cure"]);
  });

  it("matches the start of any word", () => {
    expect(names(searchCures(cureSkills, "disease"))).toEqual(["First Aid"]);
  });

  it("does not match inside a word", () => {
    expect(searchCures(cureSkills, "urning")).toEqual([]);
  });

  it("matches queries that span words", () => {
    expect(names(searchCures(cureSkills, "infectious dis"))).toEqual(["First Aid"]);
  });

  it("matches skill names without highlighting their cures", () => {
    const results = searchCures(cureSkills, "first aid");

    expect(names(results)).toEqual(["First Aid"]);
    expect(results[0]?.isNameMatch).toBe(true);
    expect(results[0]?.cures.every((cure) => !cure.isMatch)).toBe(true);
  });

  it("matches school names by prefix without highlighting the name or cures", () => {
    const results = searchCures(cureSkills, "geo");

    expect(names(results)).toEqual(["Fortify"]);
    expect(results[0]?.matchedSchoolIds).toEqual(["geomancer"]);
    expect(results[0]?.isNameMatch).toBe(false);
    expect(results[0]?.cures.every((cure) => !cure.isMatch)).toBe(true);
  });

  it("matches a skill when any of its schools matches", () => {
    const results = searchCures(cureSkills, "warfare");

    expect(names(results)).toEqual(["Restoration"]);
    expect(results[0]?.matchedSchoolIds).toEqual(["warfare"]);
  });

  it("does not record school matches for other fields", () => {
    expect(
      searchCures(cureSkills, "burn").every((result) => result.matchedSchoolIds.length === 0),
    ).toBe(true);
  });

  it("never returns skills that cure nothing, even when their name matches", () => {
    expect(names(searchCures(cureSkills, "burning touch"))).toEqual([]);
  });

  it("returns no results instead of falling back to an earlier query", () => {
    searchCures(cureSkills, "burn");

    expect(searchCures(cureSkills, "zzz")).toEqual([]);
  });

  it("keeps the prepared order", () => {
    expect(names(searchCures(cureSkills, "b"))).toEqual([
      "First Aid",
      "Fortify",
      "Restoration",
      "Arcane Cure",
    ]);
  });

  it("finds cures in the real catalog", () => {
    const catalogCures = prepareCureSkills(catalog.skills, catalog.statusEffects);

    expect(names(searchCures(catalogCures, "first aid"))).toContain("First Aid");
    expect(searchCures(catalogCures, "burning").length).toBeGreaterThan(0);
  });

  it("finds every cure skill of a school in the real catalog", () => {
    const catalogCures = prepareCureSkills(catalog.skills, catalog.statusEffects);
    const hydrosophistSkills = catalogCures.filter((cureSkill) =>
      cureSkill.skill.schools.some(({ school }) => school.name === "Hydrosophist"),
    );

    expect(hydrosophistSkills.length).toBeGreaterThan(0);
    expect(names(searchCures(catalogCures, "Hydrosophist"))).toEqual(
      hydrosophistSkills.map((cureSkill) => cureSkill.skill.name),
    );
  });

  it("finds Mad cures in the real catalog by its Madness alias", () => {
    const catalogCures = prepareCureSkills(catalog.skills, catalog.statusEffects);

    expect(names(searchCures(catalogCures, "madness"))).toEqual(
      names(searchCures(catalogCures, "mad")),
    );
  });
});
