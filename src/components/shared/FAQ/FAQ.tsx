import Link from "next/link";
import styles from "./FAQ.module.scss";

export const FAQ = () => {
  return (
    <section className={styles.faqSection} aria-labelledby="faq-title">
      <div className={styles.faqSectionContainer}>
        <header className={styles.faqHeader}>
          <h1 id="faq-title">Frequently Asked Questions</h1>
          <p>
            These are general FAQs. If you’re looking for more in-depth answers, head over to our extended FAQ page.
          </p>
        </header>
        <dl className={styles.faqList}>
          <details>
            <summary>What is a web application?</summary>
            <p>
              A web application is an application that runs on a web server and can be accessed via a web browser.
            </p>
          </details>
          <details>
            <summary>What about privacy?</summary>
            <p>
              We take privacy seriously and comply with GDPR legislation.
            </p>
          </details>
          <details>
            <summary>The versions of EasyFWD.</summary>
            <p>
              There are three versions of EasyFWD: Bronze, Silver, and Gold.
            </p>
          </details>
          <details>
            <summary>What does the vitality meter say?</summary>
            <p>
              The vitality meter indicates how vital you are.
            </p>
          </details>
          <details>
            <summary>How do I order EasyFWD?</summary>
            <p>
              You can order EasyFWD through our website.
            </p>
          </details>
        </dl>
        <div className={styles.faqCTA}>
          <header>
            <h2>Still have questions?</h2>
            <p>Check out our full detailed FAQ page.</p>
          </header>
          <Link href="/faq" className={styles.faqBottom}>
            Visit FAQ
          </Link>
        </div>
      </div>
    </section>
  );
};