import * as E from "effect/Effect";
import * as Schema from "effect/Schema";

const emptyStringArray = Schema.Array(Schema.String).pipe(
  Schema.withDecodingDefaultKey(E.succeed([])),
);

const Identifier = Schema.String.check(Schema.isMinLength(1));

export const SchoolId = Identifier.pipe(Schema.brand("SchoolId"));
export const SkillId = Identifier.pipe(Schema.brand("SkillId"));
export const StatusEffectId = Identifier.pipe(Schema.brand("StatusEffectId"));

export type SchoolId = typeof SchoolId.Type;
export type SkillId = typeof SkillId.Type;
export type StatusEffectId = typeof StatusEffectId.Type;

const AtLeastOne = Schema.Natural.check(Schema.isGreaterThanOrEqualTo(1));

const SourcePoints = Schema.Natural.check(Schema.isLessThanOrEqualTo(3));

const Meters = Schema.Finite.check(Schema.isGreaterThanOrEqualTo(0));

const Stat = Schema.Struct({
  amount: Schema.optionalKey(Schema.Finite),
  name: Schema.String,
  percent: Schema.optionalKey(Schema.Finite),
  scales: Schema.optionalKey(Schema.Boolean),
});

const emptyStats = Schema.Array(Stat).pipe(Schema.withDecodingDefaultKey(E.succeed([])));

const Cooldown = Schema.Union([Schema.Natural, Schema.Literal("oncePerCombat")]);

const SchoolAdjustment = Schema.Struct({
  amount: Schema.optionalKey(Schema.Finite),
  percent: Schema.optionalKey(Schema.Finite),
  type: Schema.String,
});

export const SchoolRecord = Schema.Struct({
  description: Schema.String,
  effects: Schema.Array(SchoolAdjustment).pipe(Schema.withDecodingDefaultKey(E.succeed([]))),
  id: SchoolId,
  imageSrc: Schema.optionalKey(Schema.String),
  imageSrcColored: Schema.String,
  modifies: Schema.Array(SchoolAdjustment).pipe(Schema.withDecodingDefaultKey(E.succeed([]))),
  name: Schema.String,
});

const SkillSchoolReference = Schema.Struct({
  id: SchoolId,
  name: Schema.String,
  requires: Schema.optionalKey(AtLeastOne),
});

const SkillStatusEffectReference = Schema.Struct({
  description: Schema.optionalKey(Schema.String),
  duration: Schema.optionalKey(AtLeastOne),
  id: StatusEffectId,
  imageSrc: Schema.optionalKey(Schema.String),
  name: Schema.String,
  stats: emptyStats,
});

export const SkillRecord = Schema.Struct({
  actionPoints: Schema.Natural,
  cooldown: Cooldown,
  description: Schema.String,
  id: SkillId,
  imageSrc: Schema.String,
  immunities: emptyStringArray,
  memory: Schema.Natural,
  name: Schema.String,
  notes: emptyStringArray,
  range: Meters,
  removes: emptyStringArray,
  schools: Schema.Array(SkillSchoolReference),
  sourcePoints: SourcePoints,
  stats: emptyStats,
  statusEffects: Schema.Array(SkillStatusEffectReference).pipe(
    Schema.withDecodingDefaultKey(E.succeed([])),
  ),
  surfaceRemoves: emptyStringArray,
  surfaces: emptyStringArray,
});

export const StatusEffectRecord = Schema.Struct({
  aliases: emptyStringArray,
  description: Schema.optionalKey(Schema.String),
  givenBy: emptyStringArray,
  id: StatusEffectId,
  imageSrc: Schema.optionalKey(Schema.String),
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
