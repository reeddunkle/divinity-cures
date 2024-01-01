import clsx from "clsx";
import Image from "next/image";

import { range } from "@/util/util.ts";

import * as styles from "./point-costs.css.ts";

type PointProps = {
  className: string;
};

function ActionPoint(props: PointProps) {
  return (
    <Image
      alt="Action point icon"
      className={clsx(styles.point, props.className)}
      height="19"
      src="/images/AP.webp"
      width="19"
    />
  );
}

function SourcePoint(props: PointProps) {
  return (
    <Image
      alt="Source point icon"
      className={clsx(styles.point, props.className)}
      height="19"
      src="/images/SP.webp"
      width="19"
    />
  );
}

type PointCostsProps = {
  ap: number;
  className?: string;
  sp: number;
};

export function PointCosts(props: PointCostsProps) {
  return (
    <div className={clsx(styles.pointCosts, props.className)}>
      {range(props.ap).map((_, index) => (
        <ActionPoint className={styles.point} key={index} />
      ))}
      {range(props.sp).map((_, index) => (
        <SourcePoint className={styles.point} key={index} />
      ))}
    </div>
  );
}
