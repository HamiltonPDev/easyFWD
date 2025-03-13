import { Hero } from "app/components/home/Hero";
import { Description } from "app/components/home/Description";

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Hero />
      <Description />
      {children}
    </div>
  );
}
