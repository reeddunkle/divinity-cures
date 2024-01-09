"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";
import { z } from "zod";

import { Card } from "@/components/card.tsx";
import { SearchInput } from "@/components/search-input.tsx";
import type { Skill } from "@/data/skill-schema.ts";
import type { StatusEffect } from "@/data/status-effect-schema.ts";
import { useUrlState } from "@/hooks/useUrlState.tsx";
import { buildSkills, compareSkillsBy, filterSkills } from "@/util/search.ts";
import { startsWith } from "@/util/util.ts";

import * as styles from "./search.css.ts";

const MIN_SEARCH_CHARACTERS = 3;

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
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchResultsRef = useRef<HTMLDivElement>(null);

  const urlState = useUrlState(searchParamSchema);
  const urlSearchState = urlState.search ?? "";

  const { control, handleSubmit, setValue, watch } = useForm<IFormState>({
    defaultValues: {
      searchText: urlSearchState,
    },
    mode: "onChange",
  });

  const searchText = watch("searchText");

  const isQueryDirty = urlSearchState !== searchText;

  useEffect(() => {
    if (isQueryDirty) {
      setValue(SEARCH_INPUT_NAME, urlSearchState);
    }
  }, [urlSearchState]); // eslint-disable-line

  const onFormSubmit: SubmitHandler<IFormState> = (data, event) => {
    event?.stopPropagation(); // Stop async call

    if (searchInputRef.current) {
      searchInputRef.current.blur();
      searchResultsRef.current;
    }
  };

  const scrollToTop = () => {
    if (searchResultsRef.current) {
      searchResultsRef.current.scroll({
        behavior: "smooth",
        top: 0,
      });
    }
  };

  const debouncedScroll = useDebouncedCallback(
    () => {
      scrollToTop();
    },
    1000,
    { leading: true, trailing: false },
  );

  useEffect(() => {
    if (isQueryDirty) {
      debouncedScroll();
    }
  }, [searchText]); // eslint-disable-line

  const merged = buildSkills({
    skills: props.skills,
    statusEffects: props.statusEffects,
  });

  let filteredResults = merged.filter((skill) => {
    if (searchText.length === 0) {
      return true;
    }

    return (
      skill.immunities.some((se) => startsWith(se, searchText)) ||
      skill.removes.some((se) => startsWith(se, searchText)) ||
      startsWith(skill.name, searchText)
    );
  });

  const sortedSearchResults = filteredResults
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
          canClear={searchText.length > 0}
          className={styles.input}
          control={control}
          id="searchInput"
          name={SEARCH_INPUT_NAME}
          onClear={() => {
            router.push("/");
          }}
          placeholder='"Burning", "Decaying", etc.'
          ref={searchInputRef}
        />
      </form>
      {sortedSearchResults.length > 0 ?
        <div className={styles.searchResults} ref={searchResultsRef}>
          {sortedSearchResults.map((skill) => {
            return (
              <div className={styles.resultWrapper} key={skill.id}>
                <Card
                  className={styles.resultCard}
                  isCureHighlighted={(cure: string) =>
                    searchText.length > MIN_SEARCH_CHARACTERS &&
                    startsWith(cure, searchText)
                  }
                  searchText={searchText}
                  skill={skill}
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
