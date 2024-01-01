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

import * as styles from "./_styles/page.css.ts";

function SearchBarFallback() {
  return <>Loading...</>;
}

export default async function HomePage() {
  const skillsData: Skill[] = (await loadSkills())!; // eslint-disable-line @typescript-eslint/no-non-null-assertion

  const statusEffectsData: StatusEffect[] = (await loadStatusEffects())!; // eslint-disable-line @typescript-eslint/no-non-null-assertion

  const spellSchoolsData: SpellSchool[] = (await loadSpellSchools())!; // eslint-disable-line @typescript-eslint/no-non-null-assertion

  return (
    <main className={styles.main}>
      <h1 className={styles.h1}>
        <Link href="/" prefetch={false}>
          Divinity Original Sin: 2
        </Link>
      </h1>
      <Suspense fallback={<SearchBarFallback />}>
        <SearchCures
          skills={skillsData}
          spellSchools={spellSchoolsData}
          statusEffects={statusEffectsData}
        />
      </Suspense>
    </main>
  );
}
