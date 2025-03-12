// "use client";
import { Hero } from "app/components/home/Hero";
import { MainProducts } from "app/components/home/MainProducts";
import { Description } from "app/components/home/Description";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Hero />
      <Description />
      <MainProducts />
    </div>
  );
}
