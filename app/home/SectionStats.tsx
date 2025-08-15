import Container from "../components/Container";
import { StatsData } from "@/type/acf";

interface SectionStatsProps {
  data: StatsData;
}

export function SectionStats({ data }: SectionStatsProps) {
  const items = [
    { value: data.value1, label: data.label1 },
    { value: data.value2, label: data.label2 },
    { value: data.value3, label: data.label3 },
  ];

  return (
    <section className="sm:px-0 px-4 py-6">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col px-6 py-8 justify-center sm:text-start text-center gap-1 flex-1 border-b-[10px] border-brand-secondary-500 bg-brand-secondary-50 rounded-sm min-w-[232px]"
            >
              <h1 className="text-brand-secondary-500 text-5xl font-bold leading-[120%]">
                {item.value}
              </h1>
              <p className="text-gray-900 font-bold leading-[150%]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
