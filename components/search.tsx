"use client";

import React, { useEffect, useRef } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Card } from "@/components/card.tsx";
import { SearchInput } from "@/components/search-input.tsx";
import type { Skill } from "@/data/skill-schema.ts";
import type { StatusEffect } from "@/data/status-effect-schema.ts";
import { useUrlState } from "@/hooks/useUrlState.tsx";
import { compareSkillsBy, searchCures } from "@/util/search.ts";

import * as styles from "./search.css.ts";

type IFormState = {
  searchText: string;
};

type SearchCuresProps = {
  skills: Skill[];
  statusEffects: StatusEffect[];
};

const searchParamSchema = z.object({
  search: z.coerce.string().optional(),
});

const SEARCH_INPUT_NAME = "searchText";

export function SearchCures(props: SearchCuresProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const urlState = useUrlState(searchParamSchema);
  const urlSearchState = urlState.search ?? "";

  const { control, handleSubmit, setValue, watch } = useForm<IFormState>({
    defaultValues: {
      searchText: urlSearchState,
    },
    mode: "onChange",
  });

  useEffect(() => {
    setValue(SEARCH_INPUT_NAME, urlSearchState);
  }, [urlSearchState]); // eslint-disable-line

  const searchText = watch("searchText");

  const onFormSubmit: SubmitHandler<IFormState> = (data, event) => {
    event?.stopPropagation(); // Stop async call

    if (searchInputRef.current) {
      searchInputRef.current.blur();
    }
  };

  const searchResults = searchCures(searchText, {
    skills: props.skills,
    statusEffects: props.statusEffects,
  });

  const sortedSearchResults = searchResults
    .sort(compareSkillsBy("name"))
    .sort(compareSkillsBy("actionPoints"))
    .sort(compareSkillsBy("sourcePoints"));

  return (
    <div className={styles.searchWrapper}>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <label className={styles.inputLabel} htmlFor="searchInput">
          Find cures for...
        </label>
        <SearchInput
          className={styles.input}
          control={control}
          id="searchInput"
          name={SEARCH_INPUT_NAME}
          placeholder='"Burning", "Decaying", etc."'
          ref={searchInputRef}
        />
      </form>
      {sortedSearchResults.length > 0 ?
        <div className={styles.searchResults}>
          {sortedSearchResults.map((skill) => {
            return (
              <div className={styles.resultWrapper} key={skill.name}>
                <Card
                  className={styles.resultCard}
                  searchText={searchText}
                  {...skill}
                />
                <div className={styles.hr} />
              </div>
            );
          })}
        </div>
      : null}
    </div>
  );
}
