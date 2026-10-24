import * as A from "effect/Array";
import * as E from "effect/Effect";
import { identity, pipe } from "effect/Function";
import * as O from "effect/Option";
import * as R from "effect/Record";
import * as Schema from "effect/Schema";

import {
  BrokenCatalogReferenceError,
  type CatalogError,
  CatalogDecodeError,
  AliasedStatusNameError,
  type DatasetName,
  DuplicateCatalogIdError,
  DuplicateStatusNameError,
  InconsistentStatusRemovalError,
  MismatchedCatalogReferenceError,
  type StatusNameField,
  UnknownStatusNameError,
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
  readonly schools: readonly SkillSchool[];
  readonly statusEffects: readonly AppliedStatusEffect[];
};

export type Catalog = {
  readonly schools: readonly SchoolRecord[];
  readonly skills: readonly Skill[];
  readonly statusEffects: readonly StatusEffectRecord[];
};

type CatalogRecord = {
  readonly id: string;
};

type NamedCatalogRecord = CatalogRecord & {
  readonly name: string;
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

const validateUniqueIds = (dataset: DatasetName, records: readonly CatalogRecord[]) => {
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

  return E.void;
};

const validateUniqueStatusNames = (statusEffects: readonly StatusEffectRecord[]) => {
  const duplicateName = pipe(
    statusEffects,
    A.flatMap((statusEffect) => [statusEffect.name, ...statusEffect.aliases]),
    A.groupBy(identity),
    R.values,
    A.findFirst((group) => group.length > 1),
    O.map((group) => group[0]),
  );

  if (O.isSome(duplicateName)) {
    return E.fail(new DuplicateStatusNameError({ statusName: duplicateName.value }));
  }

  return E.void;
};

type StatusNameUsage = {
  readonly field: StatusNameField;
  readonly sourceDataset: DatasetName;
  readonly sourceId: string;
  readonly statusName: string;
};

const statusNameUsages = <Field extends StatusNameField>(
  sourceDataset: DatasetName,
  records: readonly (CatalogRecord & Readonly<Record<Field, readonly string[]>>)[],
  fields: readonly Field[],
): readonly StatusNameUsage[] =>
  A.flatMap(records, (record) =>
    A.flatMap(fields, (field) =>
      A.map(record[field], (statusName) => ({
        field,
        sourceDataset,
        sourceId: record.id,
        statusName,
      })),
    ),
  );

const validateStatusNames = (
  skills: readonly SkillRecord[],
  statusEffects: readonly StatusEffectRecord[],
) => {
  const canonicalNames = new Set(A.map(statusEffects, (statusEffect) => statusEffect.name));
  const canonicalNameByAlias = new Map(
    A.flatMap(statusEffects, (statusEffect) =>
      A.map(statusEffect.aliases, (alias) => [alias, statusEffect.name] as const),
    ),
  );
  const usages = [
    ...statusNameUsages("skills", skills, ["immunities", "removes"]),
    ...statusNameUsages("statusEffects", statusEffects, ["clearedBy", "immunities", "removes"]),
  ];

  return E.forEach(
    usages,
    (usage) => {
      if (canonicalNames.has(usage.statusName)) {
        return E.void;
      }

      const canonicalName = canonicalNameByAlias.get(usage.statusName);

      return E.fail(
        canonicalName === undefined
          ? new UnknownStatusNameError(usage)
          : new AliasedStatusNameError({ ...usage, canonicalName }),
      );
    },
    { discard: true },
  );
};

const validateStatusRemovals = (statusEffects: readonly StatusEffectRecord[]) => {
  const statusEffectsByName = new Map(
    A.map(statusEffects, (statusEffect) => [statusEffect.name, statusEffect] as const),
  );
  const pairs = [
    ...A.flatMap(statusEffects, (removed) =>
      A.map(removed.clearedBy, (removerName) => ({
        missingFrom: "removes" as const,
        removedName: removed.name,
        removerName,
      })),
    ),
    ...A.flatMap(statusEffects, (remover) =>
      A.map(remover.removes, (removedName) => ({
        missingFrom: "clearedBy" as const,
        removedName,
        removerName: remover.name,
      })),
    ),
  ];

  return E.forEach(
    pairs,
    (pair) => {
      const isConsistent =
        pair.missingFrom === "removes"
          ? A.contains(statusEffectsByName.get(pair.removerName)?.removes ?? [], pair.removedName)
          : A.contains(
              statusEffectsByName.get(pair.removedName)?.clearedBy ?? [],
              pair.removerName,
            );

      return isConsistent ? E.void : E.fail(new InconsistentStatusRemovalError(pair));
    },
    { discard: true },
  );
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

const resolveReference = <Target extends NamedCatalogRecord>(
  skill: SkillRecord,
  targetDataset: DatasetName,
  targetsById: ReadonlyMap<string, Target>,
  reference: NamedCatalogRecord,
): E.Effect<Target, BrokenCatalogReferenceError | MismatchedCatalogReferenceError> => {
  const target = targetsById.get(reference.id);

  if (target === undefined) {
    return E.fail(brokenReference("skills", skill.id, targetDataset, reference.id));
  }

  if (target.name !== reference.name) {
    return E.fail(
      new MismatchedCatalogReferenceError({
        referenceName: reference.name,
        sourceDataset: "skills",
        sourceId: skill.id,
        targetDataset,
        targetId: reference.id,
        targetName: target.name,
      }),
    );
  }

  return E.succeed(target);
};

const resolveSkill = E.fnUntraced(function* (
  skill: SkillRecord,
  schoolsById: ReadonlyMap<string, SchoolRecord>,
  statusEffectsById: ReadonlyMap<string, StatusEffectRecord>,
): E.fn.Return<Skill, BrokenCatalogReferenceError | MismatchedCatalogReferenceError> {
  const schools = yield* E.all(
    pipe(
      skill.schools,
      A.map((reference) =>
        E.map(resolveReference(skill, "spellSchools", schoolsById, reference), (school) => ({
          ...(reference.requires === undefined ? {} : { requires: reference.requires }),
          school,
        })),
      ),
    ),
  );

  const statusEffects = yield* E.all(
    pipe(
      skill.statusEffects,
      A.map((reference) =>
        E.map(
          resolveReference(skill, "statusEffects", statusEffectsById, reference),
          (statusEffect) => ({
            ...(reference.description === undefined ? {} : { description: reference.description }),
            ...(reference.duration === undefined ? {} : { duration: reference.duration }),
            ...(reference.imageSrc === undefined ? {} : { imageSrc: reference.imageSrc }),
            stats: reference.stats,
            statusEffect,
          }),
        ),
      ),
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
    yield* validateUniqueStatusNames(decoded.statusEffects);
    yield* validateStatusNames(decoded.skills, decoded.statusEffects);
    yield* validateStatusRemovals(decoded.statusEffects);

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
