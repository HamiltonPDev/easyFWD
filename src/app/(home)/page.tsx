// "use client";
import { Hero } from "app/components/home/Hero";
import { Logos } from "app/components/home/Logos";

export default async function Home() {
  return (
    <main>
      <Hero />
      <Logos />
    </main>
  );
}
