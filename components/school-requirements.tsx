import { clsx } from "clsx";
import Image from "next/image";
import * as React from "react";

import type { Skill } from "@/data/skill-schema.ts";
import type { ClassName } from "@/types/react.ts";
import { compareStrings, range } from "@/util/util.ts";

import * as styles from "./school-requirements.css.ts";

export function SchoolsAndReqs(
  props: ClassName & { schools: Skill["schools"] },
) {
  const sortedSchools = props.schools
    .sort((schoolA, schoolB) => {
      return compareStrings(schoolA.name, schoolB.name);
    })
    .sort((schoolA, schoolB) => {
      const requiresA = schoolA.requires ?? 0;
      const requiresB = schoolB.requires ?? 0;

      return requiresA > requiresB ? 1 : -1;
    });

  const schoolRequirements = sortedSchools.flatMap((school) => {
    const reqNumber = school.requires ?? 1;

    return range(reqNumber).map(() => school);
  });

  return (
    <div className={clsx(styles.schoolsAndReqs, props.className)}>
      {schoolRequirements.map((school, i) => {
        return (
          <Image
            alt={`Icon for ${school.name}`}
            className={styles.schoolImage}
            height={styles.SCHOOL_IMAGE_SIZE_PX}
            key={`${school.id}-${i}`}
            src={school.imageSrcColored}
            width={styles.SCHOOL_IMAGE_SIZE_PX}
          />
        );
      })}
    </div>
  );
}
