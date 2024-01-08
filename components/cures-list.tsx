import { clsx } from "clsx";

import type { Skill } from "@/data/skill-schema.ts";
import {
  addAsterisk,
  compareStrings,
  identity,
  startsWith,
} from "@/util/util.ts";

import { CureBadge } from "./cure-badge.tsx";
import * as styles from "./cures-list.css.ts";

function CuresUl(props: {
  cures: string[];
  format?: (text: string) => string;
  isHighlighted?: (text: string) => boolean;
}) {
  const format = props.format ?? identity;

  return (
    <div className={styles.list}>
      {props.cures.map((statusEffect) => {
        const href = `?search=${statusEffect.toLowerCase()}`;

        return (
          <CureBadge
            cure={format(statusEffect)}
            href={href}
            isHighlighted={props.isHighlighted}
            key={statusEffect}
          />
        );
      })}
    </div>
  );
}

const MIN_SEARCH_CHARACTERS = 3;

export function CuresList(props: {
  className?: string;
  removes: Skill["removes"];
  immunities: Skill["immunities"];
  searchText: string;
}) {
  const hasImmunities = props.immunities.length > 0;
  const isImmunity = (se: string) => props.immunities.includes(se);

  const mergedList = [...props.immunities, ...props.removes].sort(
    compareStrings,
  );

  const highlighted = mergedList.filter((statusEffect) => {
    // console.log("Comparing: ", statusEffect, ": ", props.searchText);

    const res = startsWith(statusEffect, props.searchText);

    // console.log({ res });

    return res;
  });

  console.log({ searchText: props.searchText, highlighted });

  const foundImmunity = highlighted.some((highlightedStatusEffect) =>
    isImmunity(highlightedStatusEffect),
  );

  return (
    <div className={clsx(styles.listGrid, props.className)}>
      <div className={styles.titleRow}>
        <div className={styles.listTitle}>Cures</div>
        {hasImmunities && (
          <div
            className={clsx(styles.immunityLabel, {
              [`${styles.green}`]: foundImmunity,
            })}
          >
            (*) Immunity
          </div>
        )}
      </div>
      {mergedList.length > 0 && (
        <CuresUl
          cures={mergedList}
          format={(se) => {
            return isImmunity(se) ? addAsterisk(se) : se;
          }}
          isHighlighted={(statusEffect) =>
            props.searchText.length > MIN_SEARCH_CHARACTERS &&
            startsWith(statusEffect, props.searchText)
          }
        />
      )}
    </div>
  );
}
