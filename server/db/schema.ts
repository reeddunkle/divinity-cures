/* eslint-disable sort-keys */

import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const spellSchools = sqliteTable("spellSchools", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  description: text("description"),
  imageSrc: text("imageSrc"),
  imageSrcColored: text("imageSrcColored"),
  name: text("name"),
});

export const skillSchoolRequirements = sqliteTable("skillSchoolRequirements", {
  pointsRequired: integer("pointsRequired"),
  spellSchoolId: integer("spellSchoolId").references(() => spellSchools.id),
  skillId: integer("skillId").references(() => skills.id),
});

export const skillSchoolRequirementsRelations = relations(
  skillSchoolRequirements,
  ({ one }) => ({
    spellSchool: one(spellSchools, {
      fields: [skillSchoolRequirements.spellSchoolId],
      references: [spellSchools.id],
    }),

    skill: one(skills, {
      fields: [skillSchoolRequirements.skillId],
      references: [skills.id],
    }),
  }),
);

export const statusEffects = sqliteTable("statusEffects", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  description: text("description"),
  imageSrc: text("imageSrc"),
  name: text("name"),
});

export const skills = sqliteTable("skills", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  actionPoints: integer("actionPoints"),
  cooldown: integer("cooldown"),
  description: text("description"),
  imageSrc: text("imageSrc"),
  memory: integer("memory"),
  name: text("name"),
  range: integer("range"),
  sourcePoints: integer("sourcePoints"),
});

export const skillImmunities = sqliteTable("skillImmunities", {
  skillId: integer("skillId")
    .notNull()
    .references(() => skills.id),
  immuneToStatusEffectId: integer("immuneToStatusEffectId")
    .notNull()
    .references(() => statusEffects.id),
});

export const skillImmunitiesRelations = relations(
  skillImmunities,
  ({ one }) => ({
    skill: one(skills, {
      fields: [skillImmunities.skillId],
      references: [skills.id],
    }),
    statusEffect: one(statusEffects, {
      fields: [skillImmunities.immuneToStatusEffectId],
      references: [statusEffects.id],
    }),
  }),
);

export const skillRemoves = sqliteTable("skillRemoves", {
  skillId: integer("skillId")
    .notNull()
    .references(() => skills.id),
  removesStatusEffectId: integer("removesStatusEffectId")
    .notNull()
    .references(() => statusEffects.id),
});

export const skillRemovesRelations = relations(skillRemoves, ({ one }) => ({
  skill: one(skills, {
    fields: [skillRemoves.skillId],
    references: [skills.id],
  }),
  statusEffect: one(statusEffects, {
    fields: [skillRemoves.removesStatusEffectId],
    references: [statusEffects.id],
  }),
}));

export const skillStatusEffects = sqliteTable("skillStatusEffects", {
  skillId: integer("skillId")
    .notNull()
    .references(() => skills.id),
  appliesStatusEffectId: integer("appliesStatusEffectId")
    .notNull()
    .references(() => statusEffects.id),
});

export const skillStatusEffectsRelations = relations(
  skillStatusEffects,
  ({ one }) => ({
    skill: one(skills, {
      fields: [skillStatusEffects.skillId],
      references: [skills.id],
    }),
    statusEffect: one(statusEffects, {
      fields: [skillStatusEffects.appliesStatusEffectId],
      references: [statusEffects.id],
    }),
  }),
);

export const statusEffectImmunities = sqliteTable("statusEffectImmunities", {
  statusEffectId: integer("statusEffectId")
    .notNull()
    .references(() => statusEffects.id),
  immuneToStatusEffectId: integer("immuneToStatusEffectId")
    .notNull()
    .references(() => statusEffects.id),
});

export const statusEffectImmunitiesRelations = relations(
  statusEffectImmunities,
  ({ one }) => ({
    skill: one(statusEffects, {
      fields: [statusEffectImmunities.statusEffectId],
      references: [statusEffects.id],
    }),
    statusEffect: one(statusEffects, {
      fields: [statusEffectImmunities.immuneToStatusEffectId],
      references: [statusEffects.id],
    }),
  }),
);

export const statusEffectRemoves = sqliteTable("statusEffectRemoves", {
  statusEffectId: integer("statusEffectId")
    .notNull()
    .references(() => statusEffects.id),
  removesStatusEffectId: integer("removesStatusEffectId")
    .notNull()
    .references(() => statusEffects.id),
});

export const statusEffectRemovesRelations = relations(
  statusEffectRemoves,
  ({ one }) => ({
    skill: one(statusEffects, {
      fields: [statusEffectRemoves.statusEffectId],
      references: [statusEffects.id],
    }),
    statusEffect: one(statusEffects, {
      fields: [statusEffectRemoves.removesStatusEffectId],
      references: [statusEffects.id],
    }),
  }),
);

export const skillRelations = relations(skills, ({ many }) => ({
  immunities: many(skillImmunities),
  removes: many(skillRemoves),
  schools: many(skillSchoolRequirements),
  statusEffects: many(skillStatusEffects),
}));

export const statusEffectRelations = relations(statusEffects, ({ many }) => ({
  immunities: many(statusEffectImmunities),
  removes: many(statusEffectRemoves),

  skillImmunities: many(skillImmunities),
  skillRemoves: many(skillRemoves),
  skillStatusEffects: many(skillStatusEffects),
}));
