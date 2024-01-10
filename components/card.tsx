import { clsx } from "clsx";
import Image from "next/image";

import { PointCosts } from "@/components/point-costs.tsx";
import type { Skill } from "@/data/skill-schema.ts";
import type { ClassName } from "@/types/react.ts";
import { compareStrings } from "@/util/util.ts";

import * as styles from "./card.css.ts";
import { CollapsibleSection } from "./collapsible-section.tsx";
import { Cooldown } from "./cooldown.tsx";
import { CuresList } from "./cures-list.tsx";
import { Range } from "./range.tsx";
import { SchoolsAndReqs } from "./school-requirements.tsx";

function SkillInfo(
  props: ClassName & {
    actionPoints: number;
    cooldown: number;
    imageSrc: string;
    name: string;
    range: number;
    sourcePoints: number;
  },
) {
  return (
    <div className={props.className}>
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
  );
}

export function Card(
  props: ClassName & {
    isCureHighlighted: (cure: string) => boolean;
    skill: Skill;
  },
) {
  const immunities = props.skill.immunities.sort(compareStrings);

  const removes = props.skill.removes
    .filter((rm) => !immunities.includes(rm))
    .sort(compareStrings);

  const hasCures = immunities.length > 0 || removes.length > 0;

  return (
    <div className={clsx(styles.wrapper, props.className)}>
      <div className={styles.body}>
        <div className={styles.title}>{props.skill.name}</div>
        <div className={styles.mainGrid}>
          <SkillInfo className={styles.col1} {...props.skill} />
          <div className={styles.col2}>
            {hasCures && (
              <CuresList
                isCureHighlighted={props.isCureHighlighted}
                immunities={immunities}
                removes={removes}
              />
            )}
            <CollapsibleSection
              className={styles.description}
              text={props.skill.description}
              title="Description"
            />
          </div>
        </div>
      </div>
      <SchoolsAndReqs className={styles.gutter} schools={props.skill.schools} />
    </div>
  );
}
