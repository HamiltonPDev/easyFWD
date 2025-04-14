"use client";
import { SectionFaq } from "app/components/shared/SectionFaq";

export default function HomeTemplate({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  return (
    <main>
      {children}
      <SectionFaq />
    </main>
  );
}
