import { clsx } from "clsx";

import type { Skill } from "@/data/skill-schema.ts";
import { addAsterisk, compareStrings, identity } from "@/util/util.ts";

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

export function CuresList(props: {
  className?: string;
  isCureHighlighted: (cure: string) => boolean;
  removes: Skill["removes"];
  immunities: Skill["immunities"];
}) {
  const isImmunity = (se: string) => props.immunities.includes(se);

  const mergedList = [...props.immunities, ...props.removes].sort(
    compareStrings,
  );

  return (
    <div className={clsx(styles.listGrid, props.className)}>
      <p className={styles.listTitle}>Cures:</p>
      {mergedList.length > 0 && (
        <CuresUl
          cures={mergedList}
          format={(se) => {
            return isImmunity(se) ? addAsterisk(se) : se;
          }}
          isHighlighted={props.isCureHighlighted}
        />
      )}
    </div>
  );
}
