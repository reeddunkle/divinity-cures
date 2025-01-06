import Link from "next/link";

import { siteConfig } from "@/config/site.ts";

import * as styles from "./page.css.ts";

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <header>
        <h2>About</h2>
      </header>
      <p>
        Currently, a <b>&quot;Cure&quot;</b> is modelled as a spell that can
        remove a&nbsp;
        <b>&quot;Status Effect&quot;</b> in one or more ways:
      </p>
      <ul className={styles.list}>
        <li className={styles.listItem}>Directly removes a status effect.</li>
        <li className={styles.listItem}>
          <div className={styles.multiParagraph}>
            <p>
              Indirectly removes a negative status effect by applying a
              different status effect, which in turn removes a negative status
              effect.
            </p>
            <ul className={styles.list}>
              <li>
                Often, this also grants immunity to these status effects
                (denoted by an asterisk *).
              </li>
            </ul>
          </div>
        </li>
      </ul>
      <div>
        <p>Example:</p>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <b>First Aid</b> removes the status effects <b>Disarmed</b> and{" "}
            <b>Knocked Down</b>, and it grants <b>Rested</b>.
          </li>
          <li className={styles.listItem}>
            <b>Rested</b> grants immunity to (and removes) <b>Blinded</b>,{" "}
            <b>Crippled</b>, <b>Knocked Down</b>, and <b>Muted</b>.
          </li>
          <li className={styles.listItem}>
            <b>First Aid</b> cures all of these{" "}
            <Link className={styles.link} href="/?search=first+aid">
              (and more)
            </Link>
            .
          </li>
        </ul>
      </div>
      <p>
        The line blurs between direct and indirect, so I treat them equally as a{" "}
        <b>&quot;Cure&quot;</b>.
      </p>
      <p>
        I hand-coded this data. If I missed anything, please{" "}
        <Link className={styles.siteLink} href={siteConfig.nav.issues.href}>
          let me know.
        </Link>
      </p>
    </main>
  );
}
