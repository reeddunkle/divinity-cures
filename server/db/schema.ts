import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const spellSchools = sqliteTable("spellSchools", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  description: text("description"),
  imageSrc: text("imageSrc"),
  imageSrcColored: text("imageSrcColored"),
  name: text("name"),
});

export const skillSchoolRequirements = sqliteTable("spellSchools", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  requires: integer("requires"),
  spellSchoolId: integer("spellSchoolId").references(() => spellSchools.id),
});

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

export const skillRelations = relations(skills, ({ many }) => ({
  immunities: many(statusEffects),
  removes: many(statusEffects),
  schools: many(skillSchoolRequirements),
  statusEffects: many(statusEffects),
}));

export const statusEffectRelations = relations(statusEffects, ({ many }) => ({
  clearedBy: many(statusEffects),
  immunities: many(statusEffects),
  removes: many(statusEffects),
}));
