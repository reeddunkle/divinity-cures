"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";

import { Card } from "@/components/card.tsx";
import { Input } from "@/components/input.tsx";
import type { Skill, SpellSchool, StatusEffect } from "@/data/schemas.ts";
import { useUrlState } from "@/hooks/useUrlState.tsx";
import { compareSkillsBy, searchCures } from "@/util/search.ts";

import * as styles from "./search.css.ts";

type SearchCuresProps = {
  skills: Skill[];
  statusEffects: StatusEffect[];
  spellSchools: Record<string, SpellSchool>;
};

const searchParamSchema = z.object({
  search: z.coerce.string().optional(),
});

// const DEBOUNCE_DELAY_MS = 200;

export function SearchCures(props: SearchCuresProps) {
  const urlState = useUrlState(searchParamSchema);

  const urlSearchState = urlState.search ?? "";

  const [searchText, setSearchText] = useState(urlSearchState);

  const searchResults = searchCures(searchText, {
    skills: props.skills,
    statusEffects: props.statusEffects,
  });

  const sortedSearchResults = searchResults
    .sort(compareSkillsBy("name"))
    .sort(compareSkillsBy("actionPoints"))
    .sort(compareSkillsBy("sourcePoints"));

  // Read URL State
  useEffect(() => {
    setSearchText(urlSearchState);
  }, [urlSearchState]);

  return (
    <div className={styles.searchWrapper}>
      <label className={styles.inputLabel} htmlFor="SearchCuresInput">
        Find cures for...
      </label>
      <Input
        className={styles.input}
        id="SearchCuresInput"
        onChange={(event) => {
          const inputText = event.target.value;

          setSearchText(inputText);
        }}
        placeholder='"Burning", "Decaying", etc."'
        value={searchText}
      />
      {sortedSearchResults.length > 0 ? (
        <div className={styles.searchResults}>
          {sortedSearchResults.map((skill) => {
            const spellSchools = skill.schools.map((skillSchool) => {
              const result = props.spellSchools[skillSchool.id];

              if (!result) {
                throw new Error("Spell school not found!");
              }

              return result;
            });

            return (
              <div className={styles.resultWrapper} key={skill.name}>
                <Card
                  className={styles.resultCard}
                  searchText={searchText}
                  spellSchools={spellSchools}
                  {...skill}
                />
                <div className={styles.hr} />
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
