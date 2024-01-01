import "server-only";

import Link from "next/link";
import { Suspense } from "react";

import { SearchCures } from "@/components/search.tsx";
import {
  loadSkills,
  loadSpellSchools,
  loadStatusEffects,
} from "@/data/loaders.ts";
import type { Skill, SpellSchool, StatusEffect } from "@/data/schemas.ts";
import { keyBy } from "@/util/util.ts";

import * as styles from "./_styles/page.css.ts";

// function SearchBarFallback() {
//   return <>Loading...</>;
// }

export default async function HomePage() {
  const skills: Skill[] = (await loadSkills())!; // eslint-disable-line @typescript-eslint/no-non-null-assertion

  const statusEffects: StatusEffect[] = (await loadStatusEffects())!; // eslint-disable-line @typescript-eslint/no-non-null-assertion

  const spellSchools: SpellSchool[] = (await loadSpellSchools())!; // eslint-disable-line @typescript-eslint/no-non-null-assertion

  const spellSchoolsById = keyBy(spellSchools, (school) => school.id);

  return (
    <main className={styles.main}>
      <h1 className={styles.h1}>
        <Link href="/" prefetch={false}>
          Divinity Original Sin: 2
        </Link>
      </h1>
      <SearchCures
        skills={skills}
        spellSchools={spellSchoolsById}
        statusEffects={statusEffects}
      />
    </main>
  );
}
