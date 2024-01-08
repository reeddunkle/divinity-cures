import { clsx } from "clsx";

import type { Skill } from "@/data/skill-schema.ts";
import { addAsterisk, identity, startsWith } from "@/util/util.ts";

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
  return (
    <div className={clsx(styles.listGrid, props.className)}>
      {props.removes.length > 0 && (
        <div>
          <div className={styles.listTitle}>Removes:</div>
          <CuresUl
            cures={props.removes}
            isHighlighted={(statusEffect) =>
              props.searchText.length > MIN_SEARCH_CHARACTERS &&
              startsWith(statusEffect, props.searchText)
            }
          />
        </div>
      )}
      {props.immunities.length > 0 && (
        <div>
          <div className={styles.listTitle}>Immunities (*):</div>
          <CuresUl
            cures={props.immunities}
            format={addAsterisk}
            isHighlighted={(statusEffect) =>
              props.searchText.length > MIN_SEARCH_CHARACTERS &&
              startsWith(statusEffect, props.searchText)
            }
          />
        </div>
      )}
    </div>
  );
}
