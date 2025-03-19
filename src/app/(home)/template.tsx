import { Hero } from "app/components/home/Hero";
import { Description } from "app/components/home/Description";

export default function HomeTemplate({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <Hero />
      <Description />
      {children}
    </main>
  );
}
