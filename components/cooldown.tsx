import * as styles from "./cooldown.css.ts";

type CooldownProps = React.HTMLProps<HTMLDivElement> & {
  cooldown: number;
};

export function Cooldown(props: CooldownProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.border}>
        <div className={styles.cooldownText}>{props.cooldown}</div>
      </div>
      <div className={styles.tickTop} />
      <div className={styles.tickRight} />
    </div>
  );
}
