import * as A from "effect/Array";
import { catalog } from "virtual:bundled-catalog";
import { describe, expect, it } from "vitest";

import indexHtml from "../index.html?raw";
import { uiImages } from "./assets.ts";

const publicFiles = A.map(Object.keys(import.meta.glob("/public/**/*")), (path) =>
  path.replace(/^\/public/u, ""),
);

const catalogImages = [
  ...A.flatMap(catalog.skills, (skill) => [
    skill.imageSrc,
    ...A.flatMap(skill.statusEffects, (applied) =>
      applied.imageSrc === undefined ? [] : [applied.imageSrc],
    ),
  ]),
  ...A.flatMap(catalog.schools, (school) =>
    school.imageSrc === undefined
      ? [school.imageSrcColored]
      : [school.imageSrc, school.imageSrcColored],
  ),
  ...A.flatMap(catalog.statusEffects, (statusEffect) =>
    statusEffect.imageSrc === undefined ? [] : [statusEffect.imageSrc],
  ),
];

const documentAssets = A.map(
  [...indexHtml.matchAll(/(?:href|src)="(\/[^"]*\.(?:ico|png|webp|jpg|svg))"/gu)],
  (match) => match[1] ?? "",
);

const references = A.dedupe([...catalogImages, ...Object.values(uiImages), ...documentAssets]);

describe("static assets", () => {
  it("references only repository-owned paths", () => {
    expect(A.filter(references, (reference) => !reference.startsWith("/"))).toStrictEqual([]);
  });

  it("references only files that exist under public", () => {
    expect(A.filter(references, (reference) => !publicFiles.includes(reference))).toStrictEqual([]);
  });

  it("ships no unreferenced public images", () => {
    expect(
      A.filter(
        publicFiles,
        (file) => /\.(?:ico|png|webp|jpg|svg)$/u.test(file) && !references.includes(file),
      ),
    ).toStrictEqual([]);
  });
});
