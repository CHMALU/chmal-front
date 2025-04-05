"use client";

import Container from "../components/Container";
import { Header } from "../components/Header";

interface SectionCTAProps {
  data: any;
}

export function SectionCTA({ data }: SectionCTAProps) {
  return (
    <section className="py-8">
      <Container>
        <div className=" relative z-20 flex w-full h-[356px] rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-brand-secondary-500 z-0" />

          <div className="absolute inset-0 bg-gradient-to-l from-black/20 via-transparent to-transparent z-10" />
        </div>
      </Container>
    </section>
  );
}
