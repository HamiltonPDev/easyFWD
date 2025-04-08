// "use client";
import { Hero } from "app/components/home/Hero";
import { Logos } from "app/components/home/Logos";
import { Services } from "app/components/home/Services";

export default async function Home() {
  return (
    <main>
      <Hero />
      <Logos />
      <Services />
    </main>
  );
}
