import * as E from "effect/Effect";
import * as Schema from "effect/Schema";

const emptyStringArray = Schema.Array(Schema.String).pipe(
  Schema.withDecodingDefaultKey(E.succeed([])),
);

const Stat = Schema.Struct({
  amount: Schema.optionalKey(Schema.Finite),
  name: Schema.String,
  percent: Schema.optionalKey(Schema.Finite),
  scales: Schema.optionalKey(Schema.Boolean),
});

const emptyStats = Schema.Array(Stat).pipe(
  Schema.withDecodingDefaultKey(E.succeed([])),
);

const SchoolAdjustment = Schema.Struct({
  amount: Schema.optionalKey(Schema.Finite),
  percent: Schema.optionalKey(Schema.Finite),
  type: Schema.String,
});

export const SchoolRecord = Schema.Struct({
  description: Schema.String,
  effects: Schema.Array(SchoolAdjustment).pipe(
    Schema.withDecodingDefaultKey(E.succeed([])),
  ),
  id: Schema.String,
  imageSrc: Schema.optionalKey(Schema.String),
  imageSrcColored: Schema.String,
  modifies: Schema.Array(SchoolAdjustment).pipe(
    Schema.withDecodingDefaultKey(E.succeed([])),
  ),
  name: Schema.String,
});

const SkillSchoolReference = Schema.Struct({
  id: Schema.String,
  name: Schema.String,
  requires: Schema.optionalKey(Schema.Finite),
});

const SkillStatusEffectReference = Schema.Struct({
  description: Schema.optionalKey(Schema.String),
  duration: Schema.optionalKey(Schema.Finite),
  id: Schema.String,
  imageSrc: Schema.optionalKey(Schema.String),
  name: Schema.String,
  stats: emptyStats,
});

export const SkillRecord = Schema.Struct({
  actionPoints: Schema.Finite,
  cooldown: Schema.Finite,
  description: Schema.String,
  id: Schema.String,
  imageSrc: Schema.String,
  immunities: emptyStringArray,
  memory: Schema.Finite,
  name: Schema.String,
  notes: emptyStringArray,
  range: Schema.Finite,
  removes: emptyStringArray,
  schools: Schema.Array(SkillSchoolReference),
  sourcePoints: Schema.Finite,
  stats: emptyStats,
  statusEffects: Schema.Array(SkillStatusEffectReference).pipe(
    Schema.withDecodingDefaultKey(E.succeed([])),
  ),
  surfaceRemoves: emptyStringArray,
  surfaces: emptyStringArray,
});

export const StatusEffectRecord = Schema.Struct({
  aliases: emptyStringArray,
  clearedBy: emptyStringArray,
  description: Schema.String,
  givenBy: emptyStringArray,
  id: Schema.String,
  imageSrc: Schema.String,
  immunities: emptyStringArray,
  name: Schema.String,
  removes: emptyStringArray,
  scales: Schema.optionalKey(Schema.Boolean),
  stats: emptyStats,
});

export const SchoolRecords = Schema.Array(SchoolRecord);
export const SkillRecords = Schema.Array(SkillRecord);
export const StatusEffectRecords = Schema.Array(StatusEffectRecord);

export const CatalogRecords = Schema.Struct({
  skills: SkillRecords,
  spellSchools: SchoolRecords,
  statusEffects: StatusEffectRecords,
});

export type SchoolRecord = typeof SchoolRecord.Type;
export type SkillRecord = typeof SkillRecord.Type;
export type StatusEffectRecord = typeof StatusEffectRecord.Type;
