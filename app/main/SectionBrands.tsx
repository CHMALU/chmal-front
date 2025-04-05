"use client";

import Container from "../components/Container";
import { Header } from "../components/Header";

interface SectionBrandsProps {
  data: any;
}

export function SectionBrands({ data }: SectionBrandsProps) {
  return (
    <section>
      <Container>
        <Header title="Współpracujemy z najlepszymi markami" />
        <div className="flex justify-center content-center gap-3 self-stretch flex-wrap pb-12">
          <div className="w-32 h-9 bg-gray-200"></div>
          <div className="w-32 h-9 bg-gray-200"></div>
          <div className="w-32 h-9 bg-gray-200"></div>
          <div className="w-32 h-9 bg-gray-200"></div>
          <div className="w-32 h-9 bg-gray-200"></div>
          <div className="w-32 h-9 bg-gray-200"></div>
          <div className="w-32 h-9 bg-gray-200"></div>
          <div className="w-32 h-9 bg-gray-200"></div>
          <div className="w-32 h-9 bg-gray-200"></div>
          <div className="w-32 h-9 bg-gray-200"></div>
          <div className="w-32 h-9 bg-gray-200"></div>
          <div className="w-32 h-9 bg-gray-200"></div>
        </div>
      </Container>
    </section>
  );
}
