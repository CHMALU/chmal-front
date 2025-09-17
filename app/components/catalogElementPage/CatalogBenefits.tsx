import Container from "@/app/components/Container";
import { TypographyBody, TypographyH3 } from "@/app/components/Typography";
import { Header } from "../Header";
import { HiOutlineCheck } from "react-icons/hi";
import type { catalogBenefitsData } from "@/type/acf";

export interface CatalogBenefitsProps {
  data: catalogBenefitsData;
}

export default function CatalogBenefits({ data }: CatalogBenefitsProps) {
  const benefits = [
    { title: data.benefit1Naglowek, desc: data.benefit1Opis },
    { title: data.benefit2Naglowek, desc: data.benefit2Opis },
    { title: data.benefit3Naglowek, desc: data.benefit3Opis },
    { title: data.benefit4Naglowek, desc: data.benefit4Opis },
  ].filter((b) => b.title || b.desc);

  const mid = Math.ceil(benefits.length / 2);
  const colLeft = benefits.slice(0, mid);
  const colRight = benefits.slice(mid);

  return (
    <section className="relative">
      <Container>
        <Header title={data.tytulSekcjiBenefity} />
        <div className="py-12 flex flex-col sm:flex-row gap-8 items-center">
          {/* lewa kolumna */}
          <div className="flex flex-col p-4 gap-8 grow rounded-lg border border-gray-300">
            {colLeft.map((b, i) => (
              <div
                key={`left-${i}`}
                className="flex flex-col justify-center gap-2 self-stretch"
              >
                <div className="flex items-center gap-2 self-stretch">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-primary-500">
                    <HiOutlineCheck className="text-gray-900 w-5 h-5 flex-shrink-0" />
                  </div>
                  <TypographyH3>{b.title}</TypographyH3>
                </div>
                <TypographyBody>{b.desc}</TypographyBody>
              </div>
            ))}
          </div>

          {/* prawa kolumna */}
          <div className="flex flex-col p-4 gap-8 grow rounded-lg border border-gray-300">
            {colRight.map((b, i) => (
              <div
                key={`right-${i}`}
                className="flex flex-col justify-center gap-2 self-stretch"
              >
                <div className="flex items-center gap-2 self-stretch">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-primary-500">
                    <HiOutlineCheck className="text-gray-900 w-5 h-5 flex-shrink-0" />
                  </div>
                  <TypographyH3>{b.title}</TypographyH3>
                </div>
                <TypographyBody>{b.desc}</TypographyBody>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
