import * as A from "effect/Array";
import * as E from "effect/Effect";
import { pipe } from "effect/Function";
import * as O from "effect/Option";
import * as R from "effect/Record";
import * as Schema from "effect/Schema";

import {
  BrokenCatalogReferenceError,
  type CatalogError,
  CatalogDecodeError,
  type DatasetName,
  DuplicateCatalogIdError,
} from "./errors.ts";
import {
  CatalogRecords,
  type SchoolRecord,
  type SkillRecord,
  type StatusEffectRecord,
} from "./schemas.ts";

export type CatalogInput = {
  readonly skills: unknown;
  readonly spellSchools: unknown;
  readonly statusEffects: unknown;
};

export type SkillSchool = {
  readonly requires?: number;
  readonly school: SchoolRecord;
};

export type AppliedStatusEffect = {
  readonly description?: string;
  readonly duration?: number;
  readonly imageSrc?: string;
  readonly stats: SkillRecord["statusEffects"][number]["stats"];
  readonly statusEffect: StatusEffectRecord;
};

export type Skill = Omit<SkillRecord, "schools" | "statusEffects"> & {
  readonly schools: ReadonlyArray<SkillSchool>;
  readonly statusEffects: ReadonlyArray<AppliedStatusEffect>;
};

export type Catalog = {
  readonly schools: ReadonlyArray<SchoolRecord>;
  readonly skills: ReadonlyArray<Skill>;
  readonly statusEffects: ReadonlyArray<StatusEffectRecord>;
};

type CatalogRecord = {
  readonly id: string;
};

const decodeOptions = {
  errors: "all",
  onExcessProperty: "error",
} as const;

const decodeCatalog = (input: CatalogInput) =>
  Schema.decodeUnknownEffect(
    CatalogRecords,
    decodeOptions,
  )(input).pipe(
    E.mapError(
      (error) =>
        new CatalogDecodeError({
          message: error.message,
        }),
    ),
  );

const validateUniqueIds = (dataset: DatasetName, records: ReadonlyArray<CatalogRecord>) => {
  const duplicateId = pipe(
    records,
    A.groupBy((record) => record.id),
    R.values,
    A.findFirst((group) => group.length > 1),
    O.map((group) => group[0].id),
  );

  if (O.isSome(duplicateId)) {
    return E.fail(
      new DuplicateCatalogIdError({
        dataset,
        id: duplicateId.value,
      }),
    );
  }

  return E.succeed(undefined);
};

const brokenReference = (
  sourceDataset: DatasetName,
  sourceId: string,
  targetDataset: DatasetName,
  targetId: string,
) =>
  new BrokenCatalogReferenceError({
    sourceDataset,
    sourceId,
    targetDataset,
    targetId,
  });

const resolveSkill = E.fnUntraced(function* (
  skill: SkillRecord,
  schoolsById: ReadonlyMap<string, SchoolRecord>,
  statusEffectsById: ReadonlyMap<string, StatusEffectRecord>,
): E.fn.Return<Skill, BrokenCatalogReferenceError> {
  const schools = yield* E.all(
    pipe(
      skill.schools,
      A.map((reference) => {
        const school = schoolsById.get(reference.id);

        if (school === undefined) {
          return E.fail(brokenReference("skills", skill.id, "spellSchools", reference.id));
        }

        return E.succeed({
          ...(reference.requires === undefined ? {} : { requires: reference.requires }),
          school,
        });
      }),
    ),
  );

  const statusEffects = yield* E.all(
    pipe(
      skill.statusEffects,
      A.map((reference) => {
        const statusEffect = statusEffectsById.get(reference.id);

        if (statusEffect === undefined) {
          return E.fail(brokenReference("skills", skill.id, "statusEffects", reference.id));
        }

        return E.succeed({
          ...(reference.description === undefined ? {} : { description: reference.description }),
          ...(reference.duration === undefined ? {} : { duration: reference.duration }),
          ...(reference.imageSrc === undefined ? {} : { imageSrc: reference.imageSrc }),
          stats: reference.stats,
          statusEffect,
        });
      }),
    ),
  );

  return {
    ...skill,
    schools,
    statusEffects,
  };
});

export const loadCatalog: (input: CatalogInput) => E.Effect<Catalog, CatalogError> = E.fnUntraced(
  function* (input) {
    const decoded = yield* decodeCatalog(input);

    yield* E.all([
      validateUniqueIds("skills", decoded.skills),
      validateUniqueIds("spellSchools", decoded.spellSchools),
      validateUniqueIds("statusEffects", decoded.statusEffects),
    ]);

    const schoolsById = new Map(
      pipe(
        decoded.spellSchools,
        A.map((school) => [school.id, school] as const),
      ),
    );
    const statusEffectsById = new Map(
      pipe(
        decoded.statusEffects,
        A.map((statusEffect) => [statusEffect.id, statusEffect] as const),
      ),
    );
    const skills = yield* E.all(
      pipe(
        decoded.skills,
        A.map((skill) => resolveSkill(skill, schoolsById, statusEffectsById)),
      ),
    );

    return {
      schools: decoded.spellSchools,
      skills,
      statusEffects: decoded.statusEffects,
    };
  },
);
