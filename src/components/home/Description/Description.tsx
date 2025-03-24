"use client";
import Image from "next/image";
import classNames from "classnames/bind";
import { useState } from "react";
import styles from "./Description.module.scss";

export const Description = () => {
  const [hasBorder, setHasBorder] = useState(false);

  const handleMouseEnter = () => setHasBorder(!hasBorder);

  const cx = classNames.bind(styles);

  const buttonStyles = cx("Description__button", {
    "Description__button--border": hasBorder,
  });

  console.log(hasBorder);
  return (
    <section className={styles.Description}>
      <button onClick={handleMouseEnter} className={buttonStyles}>
        <div className={styles.Description__imageContainer}>
          <Image
            src="/images/description.jpeg"
            alt="products marketplace"
            priority={true}
            fill
            placeholder="blur"
            blurDataURL="/images/description.jpeg"
          />
        </div>
      </button>
      <div className={styles.Description_text}>
        <h2>Descriptions</h2>
        <p>
          EasyFWD is a marketplace for digital products. We offer a wide range
          of products, from web templates to mobile apps, e-books, and more.
        </p>
      </div>
    </section>
  );
};
