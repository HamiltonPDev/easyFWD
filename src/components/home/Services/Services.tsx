"use client";

import styles from "./Services.module.scss";
import content from "./services.json";
import Image from "next/image";
import { Button } from "../../shared/button/Button";

export const Services = () => {
  const { header, services } = content;

  return (
    <section
      className={styles.Services__section}
      aria-labelledby="services-title"
    >
      <div className={styles.Services__sectionContainer}>
        <div className={styles.Services}>
          <header className={styles.Services__header}>
            <h2>{header.subheading}</h2>
            <h1 id="services-title">{header.title}</h1>
            <p>{header.description}</p>
          </header>
          <ul className={styles.Services__list}>
            {services.map((service, index) => (
              <li key={index} className={styles.Services__item}>
                <div className={styles.Services__itemContainer}>
                  <div className={styles.Services__card}>
                    <figure className={styles.Services__icon}>
                      <Image
                        src={service.icon.src}
                        alt={service.icon.alt}
                        width={service.icon.width}
                        height={service.icon.height}
                      />
                    </figure>
                    <h2>{service.title}</h2>
                    <p>{service.description}</p>
                  </div>
                  <div className={styles.Services__cta}>
                    <Button
                      href={service["cta-button"].linkHref}
                      text={service["cta-button"].linkText}
                      color="transparent"
                      size="medium"
                      onClick={() => {}}
                    />
                    <Button
                      href={service["cta-button-1"].linkHref}
                      text={service["cta-button-1"].linkText}
                      color="secondary"
                      size="medium"
                      onClick={() => {}}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
