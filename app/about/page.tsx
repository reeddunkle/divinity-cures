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
                <b>Often, this also grants immunity</b> to these status effects.
              </li>
            </ul>
          </div>
        </li>
      </ul>
      <p>
        For example, the spell&nbsp;<b>First Aid</b>
        &nbsp;removes <b>Disarmed</b> and <b>Knocked Down</b>, and grants the
        Status Effect&nbsp;<b>Rested</b>.
      </p>
      <p>
        <b>Rested</b>, in turn, grants immunity to&nbsp;<b>Blinded</b>,&nbsp;
        <b>Crippled</b>,&nbsp;<b>Knocked Down</b>,&nbsp;<b>Muted</b>.
      </p>
      <p>
        The line blurs between direct and indirect, so I treat them equally as
        a&nbsp;<b>&quot;Cure&quot;</b>.
      </p>
      <p>
        I hand-coded this data. If I missed anything, please&nbsp;
        <Link className={styles.siteLink} href={siteConfig.nav.issues.href}>
          let me know.
        </Link>
      </p>
    </main>
  );
}
