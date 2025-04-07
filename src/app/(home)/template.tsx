import { SectionFaq } from "app/components/shared/SectionFaq";
import { Prices } from "app/components/home/PricesCards";

export default function HomeTemplate({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      {children}
      <Prices />
      <SectionFaq />
    </main>
  );
}
