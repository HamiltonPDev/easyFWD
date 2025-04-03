import { Hero } from "app/components/home/Hero";
import { Prices } from "app/components/home/Description/Prices";

export default function HomeTemplate({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <Hero />
      <Prices />
      {children}
    </main>
  );
}
