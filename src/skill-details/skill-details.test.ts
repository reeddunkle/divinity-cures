import { describe, expect, it } from "vitest";

import { catalog } from "../catalog/index.ts";
import { cooldownLabel, costLabel, rangeLabel, schoolRequirements } from "./skill-details.ts";

const skillNamed = (name: string) => {
  const skill = catalog.skills.find((candidate) => candidate.name === name);

  if (skill === undefined) {
    throw new Error(`Missing skill ${name}`);
  }

  return skill;
};

describe("costLabel", () => {
  it("names both point types with singular and plural forms", () => {
    expect(costLabel({ actionPoints: 1, sourcePoints: 0 })).toBe("1 action point, 0 source points");
    expect(costLabel({ actionPoints: 2, sourcePoints: 1 })).toBe("2 action points, 1 source point");
  });
});

describe("cooldownLabel", () => {
  it("describes once-per-combat skills", () => {
    expect(cooldownLabel("oncePerCombat")).toBe("Once per combat");
    expect(cooldownLabel(skillNamed("Skin Graft").cooldown)).toBe("Once per combat");
  });

  it("describes a zero cooldown as none", () => {
    expect(cooldownLabel(0)).toBe("None");
  });

  it("counts turns", () => {
    expect(cooldownLabel(1)).toBe("1 turn");
    expect(cooldownLabel(4)).toBe("4 turns");
  });
});

describe("rangeLabel", () => {
  it("formats meters", () => {
    expect(rangeLabel(13)).toBe("13 m");
  });
});

describe("schoolRequirements", () => {
  it("keeps catalog order and includes required levels", () => {
    expect(schoolRequirements(skillNamed("Mass Cleanse Wounds"))).toMatchObject([
      { label: "Hydrosophist 2", name: "Hydrosophist" },
      { label: "Warfare 2", name: "Warfare" },
    ]);
  });

  it("omits the level for schools without one", () => {
    expect(schoolRequirements(skillNamed("Bless"))).toMatchObject([
      { label: "Sourcery", name: "Sourcery" },
    ]);
  });
});
