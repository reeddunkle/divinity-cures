import * as styles from "./cooldown.css.ts";
import { Infin } from "./icons/infinity.tsx";

type CooldownProps = React.HTMLProps<HTMLDivElement> & {
  cooldown: number;
};

export function Cooldown(props: CooldownProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.border}>
        <div className={styles.cooldownText}>
          {props.cooldown === 0 ?
            <Infin />
          : props.cooldown}
        </div>
      </div>
      {/* <div className={styles.tickTop} /> */}
      <div className={styles.arrowHeadRight} />
      <div className={styles.arrowHeadLeft} />
    </div>
  );
}
