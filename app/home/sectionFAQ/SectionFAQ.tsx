"use client";

import Button from "@/app/components/Button";
import Container from "@/app/components/Container";
import { Header } from "@/app/components/Header";
import { FaqAccordion } from "./FaqAccordion";

interface SectionFAQProps {
  data?: undefined;
}

export function SectionFAQ({ data }: SectionFAQProps) {
  return (
    <section className="py-12">
      <Container>
        <div className="flex flex-col gap-9 justify-center items-center">
          <Header
            noPaddingY
            title="Najczęściej Zadawane Pytania"
            subtitle="Masz wątpliwości? Sprawdź odpowiedzi na pytania, które najczęściej zadają nasi klienci."
          />
          <div className="flex flex-col w-[1028px]">
            <FaqAccordion
              question="Jakie opony powinienem wybrać do mojego samochodu?"
              answer="Wybór opon zależy od wielu czynników, takich jak marka i model samochodu, styl jazdy oraz warunki pogodowe. Nasi eksperci chętnie doradzą Ci najlepszy wybór."
            />
            <FaqAccordion
              question="Jakie opony powinienem wybrać do mojego samochodu?"
              answer="Wybór opon zależy od wielu czynników, takich jak marka i model samochodu, styl jazdy oraz warunki pogodowe. Nasi eksperci chętnie doradzą Ci najlepszy wybór."
            />
            <FaqAccordion
              question="Jakie opony powinienem wybrać do mojego samochodu?"
              answer="Wybór opon zależy od wielu czynników, takich jak marka i model samochodu, styl jazdy oraz warunki pogodowe. Nasi eksperci chętnie doradzą Ci najlepszy wybór."
            />
            <FaqAccordion
              question="Jakie opony powinienem wybrać do mojego samochodu?"
              answer="Wybór opon zależy od wielu czynników, takich jak marka i model samochodu, styl jazdy oraz warunki pogodowe. Nasi eksperci chętnie doradzą Ci najlepszy wybór."
            />
          </div>
          <Button label="Umów wizytę online" onClick={() => {}} />
        </div>
      </Container>
    </section>
  );
}
