// "use client";
import { Hero } from "app/components/home/Hero";
import { MainProducts } from "app/components/home/MainProducts";
import { Description } from "app/components/home/Description";

export default function Home() {
  return (
    <div>
      <Hero />
      <Description />
      <MainProducts />
    </div>
  );
}
