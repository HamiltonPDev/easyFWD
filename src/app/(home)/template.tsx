"use client";
import { SectionFaq } from "app/components/shared/SectionFaq";
import { usePathname } from "next/navigation";
import { Prices } from "app/components/home/PricesCards";

export default function HomeTemplate({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const isEasyFWD = pathname === "/";

  return (
    <main>
      {children}
      {isEasyFWD && <Prices />}
      <SectionFaq />
    </main>
  );
}
