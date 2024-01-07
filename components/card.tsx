import { clsx } from "clsx";
import Image from "next/image";

import { PointCosts } from "@/components/point-costs.tsx";
import type { Skill } from "@/data/skill-schema.ts";
import { compareStrings } from "@/util/util.ts";

import * as styles from "./card.css.ts";
import { Cooldown } from "./cooldown.tsx";
import { CuresList } from "./cures-list.tsx";
import { Range } from "./range.tsx";
import { SchoolsAndReqs } from "./school-requirements.tsx";

export function Card(
  props: Skill & {
    className?: string;
    searchText: string;
  },
) {
  const removes = props.removes.sort(compareStrings);
  const immunities = props.immunities.sort(compareStrings);

  return (
    <div className={clsx(styles.card, props.className)}>
      <div className={styles.col1}>
        <Image
          alt={`Spell icon for ${props.name}`}
          className={styles.skillImage}
          height={styles.SPELL_IMAGE_SIZE_PX}
          src={props.imageSrc}
          width={styles.SPELL_IMAGE_SIZE_PX}
        />
        <PointCosts ap={props.actionPoints} sp={props.sourcePoints} />
        <Cooldown cooldown={props.cooldown} />
        <Range range={props.range} />
      </div>
      <div className={styles.col2}>
        <div className={styles.title}>{props.name}</div>
        <CuresList
          immunities={immunities}
          removes={removes}
          searchText={props.searchText}
        />
      </div>
      <div className={styles.col3}>
        <SchoolsAndReqs schools={props.schools} />
        {/* <CollapsibleSection title="Description" text={props.description} /> */}
      </div>
    </div>
  );
}
