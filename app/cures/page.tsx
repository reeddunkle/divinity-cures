import "server-only";

import Link from "next/link";

import { SearchCures } from "@/components/search.tsx";
import {
  loadSkills,
  loadSpellSchools,
  loadStatusEffects,
} from "@/data/loaders.ts";
import type { BaseSkill, Skill } from "@/data/skill-schema.ts";
import type { School } from "@/data/spell-schools-schema.ts";
import type { StatusEffect } from "@/data/status-effect-schema.ts";
import { keyBy } from "@/util/util.ts";

import * as styles from "./page.css.ts";

export default async function HomePage() {
  const skills: BaseSkill[] = (await loadSkills())!; // eslint-disable-line @typescript-eslint/no-non-null-assertion

  const statusEffects: StatusEffect[] = (await loadStatusEffects())!; // eslint-disable-line @typescript-eslint/no-non-null-assertion

  const spellSchools: School[] = (await loadSpellSchools())!; // eslint-disable-line @typescript-eslint/no-non-null-assertion

  const spellSchoolsById = keyBy(spellSchools, (school) => school.id);

  const skillsWithSchools = skills.map((skill) => ({
    ...skill,
    schools: skill.schools.map((school) => ({
      ...school,
      ...spellSchoolsById[school.id],
    })),
  })) as Skill[];

  return (
    <main className={styles.main}>
      <h1 className={styles.h1}>
        <Link href="/" prefetch={false}>
          Divinity Original Sin: 2
        </Link>
      </h1>
      <SearchCures skills={skillsWithSchools} statusEffects={statusEffects} />
    </main>
  );
}
