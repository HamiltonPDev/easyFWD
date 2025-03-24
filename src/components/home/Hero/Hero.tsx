import Image from "next/image";

import style from "./Hero.module.scss";

export const Hero = () => {
  return (
    <section className={style.Hero}>
      <div></div>
      <h1>Moving is your break!</h1>
      <h2>Empowering Your Tomorrow, Today!</h2>
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
    </section>
  );
};
