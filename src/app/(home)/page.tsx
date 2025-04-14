// "use client";
import { Hero } from "app/components/home/Hero";
import { Logos } from "app/components/shared/Logos";
import { Services } from "app/components/home/Services";
import { Prices } from "app/components/home/PricesCards";

export default async function Home() {
  return (
    <main>
      <Hero />
      <Prices />
      <Logos />
      <Services />
    </main>
  );
}
