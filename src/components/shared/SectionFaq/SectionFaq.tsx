'use client';

import Link from "next/link";
import styles from "./SectionFaq.module.scss";
import { FaPlus, FaMinus } from "react-icons/fa6";
import content from "./sectionFaq.json";

export const SectionFaq = () => {
  const {header, faqs, cta} = content;

  return (
    <section className={styles.faqSection} aria-labelledby="faq-title">
      <div className={styles.faqSectionContainer}>
        <header className={styles.faqHeader}>
          <h1 id="faq-title">{header.title}</h1>
          <p>{header.description}</p>
        </header>
        <dl className={styles.faqList}>
          {faqs.map((faq, index) => (
            <details key={index}>
              <summary>
                {faq.question}
                <span>
                  <FaPlus className={styles.plusIcon} />
                  <FaMinus className={styles.minusIcon} />
                </span>
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </dl>
        <div className={styles.faqCTA}>
          <header>
            <h2>{cta.title}</h2>
            <p>{cta.description}</p>
          </header>
          <Link href={cta.linkHref} className={styles.faqBottom}>
            {cta.linkText}
          </Link>
        </div>
      </div>
    </section>
  );
};
