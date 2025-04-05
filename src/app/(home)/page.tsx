// "use client";
import { MainProducts } from "app/components/home/MainProducts";
import {SectionFaq} from "app/components/shared/SectionFaq";

export default async function Home() {
  return (
    <main>
      <MainProducts />
      <SectionFaq />
    </main>
  );
}
