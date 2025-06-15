"use client";

import Container from "../components/Container";

interface NumberItem {
  value: string;
  label: string;
}

interface SectionNumbersProps {
  data: NumberItem[];
}

export function SectionNumbers({ data }: SectionNumbersProps) {
  return (
    <section className="py-6">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex flex-col px-6 py-8 justify-center gap-1 flex-1 border-b-[10px] border-brand-secondary-500 bg-brand-secondary-50 rounded-sm min-w-[232px]"
            >
              <h1 className=" text-brand-secondary-500 text-5xl font-bold leading-[120%]">
                {item.value}
              </h1>
              <p className=" text-gray-900 font-bold leading-[150%]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
