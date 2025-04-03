"use client";
import Image from "next/image";
import { Button } from "app/components/shared/button/Button";

import style from "./Hero.module.scss";

export const Hero = () => {
  return (
    <section className={style.Hero}>
      <div className={style.Hero__content}>
        <div className={style.Hero__text}>
          <h1>Moving is your break!</h1>
          <p>
            Boost your health and productivity with ergonomic reminders and
            smart workplace solutions.
          </p>
          <div className={style.Hero__buttons}>
            <Button
              href="/"
              text="Book Demo"
              color="secondary"
              size="medium"
              onClick={() => {}}
            />
            <Button
              href="/"
              text="Book Demo"
              color="transparent"
              size="medium"
              onClick={() => {}}
            />
          </div>
        </div>
        <div className={style.Hero__imageContainer}>
          <Image
            src="/images/Hero.png"
            alt="hero"
            priority={true}
            fill
            placeholder="blur"
            blurDataURL="/images/hero.jpeg"
          />
        </div>
      </div>
    </section>
  );
};
