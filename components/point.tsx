import clsx from "clsx";
import Image from "next/image";

import * as styles from "./point.css.ts";

type PointProps = {
  className: string;
};

export function ActionPoint(props: PointProps) {
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

export function SourcePoint(props: PointProps) {
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
