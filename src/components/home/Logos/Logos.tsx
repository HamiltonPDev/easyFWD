"use client";

import Image from "next/image";
import styles from "./Logos.module.scss";
import content from "./logos.json";

export const Logos = () => {
  const { header, logos } = content;

  return (
    <section className={styles.Logos__section} aria-labelledby="logos-title">
      <div className={styles.Logos__sectionContainer}>
        <div className={styles.Logos}>
          <h1 id="logos-title">{header.title}</h1>
          <ul className={styles.Logos__list}>
            {logos.map((logo, index) => (
              <li key={index} className={styles.Logos__item}>
                <figure>
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                  />
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
