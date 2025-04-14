import { SectionAwards } from "./main/SectionAwards";
import { SectionBrands } from "./main/SectionBrands";
import { SectionCTA } from "./main/SectionCTA";
import { SectionHero } from "./main/SectionHero";
import { SectionNumbers } from "./main/SectionNumbers";
import { SectionServices } from "./main/SectionServices";
import { TestimonialsSection } from "./main/TestimonialsSection";

export const revalidate = 60;

interface WPPage {
  acf: {
    // Hero section
    hero_title?: string;
    hero_subtitle?: string;
    hero_button_text?: string;
    hero_image?: {
      url: string;
      alt?: string;
    };

    // Numbers section
    years_value?: string;
    years_label?: string;

    clients_value?: string;
    clients_label?: string;

    time_value?: string;
    time_label?: string;

    cta_section_title?: string;
    cta_subtitle?: string;
    cta_button?: string;
  };
}

export default async function HomePage() {
  const res = await fetch(
    "http://localhost/chmal.pl/wp-json/wp/v2/pages?slug=strona-glowna",
    {
      next: { revalidate: 60 },
    }
  );

  const pages: WPPage[] = await res.json();
  const page = pages[0];

  const heroData = {
    title: page.acf?.hero_title ?? "",
    subtitle: page.acf?.hero_subtitle ?? "",
    buttonText: page.acf?.hero_button_text ?? "",
    imageUrl: page.acf?.hero_image?.url ?? "",
    imageAlt: page.acf?.hero_image?.alt ?? "",
  };

  const numbers = [
    {
      value: page.acf?.years_value ?? "",
      label: page.acf?.years_label ?? "",
    },
    {
      value: page.acf?.clients_value ?? "",
      label: page.acf?.clients_label ?? "",
    },
    {
      value: page.acf?.time_value ?? "",
      label: page.acf?.time_label ?? "",
    },
  ];

  const CTA = {
    title: page.acf?.cta_section_title ?? "",
    subtitle: page.acf?.cta_subtitle ?? "",
    cta_button: page.acf?.cta_button ?? "",
  };

  const awards = {
    sectionTitle: "Jakość potwierdzona nagrodami i certyfikatami",
    sectionSubtitle:
      "Nasze doświadczenie i rzetelność doceniono licznymi wyróżnieniami, w tym certyfikatem „Rzetelnego Płatnika” od Goodyear. Stawiamy na najwyższe standardy!",
    imageUrl: "",
    imageAlt: "",
    certificateTitle: "Duma z 32 lat partnerstwa z Goodyear",
    certificateDescription:
      "Jesteśmy zaszczyceni, że od ponad trzech dekad współpracujemy z jednym z liderów branży oponiarskiej. To dowód naszej jakości i zaufania.",
    buttonText: "Umów wizytę online",
    certificatePoints: [
      {
        title: "Certyfikat zaufania",
        description: "Partnerstwo oparte na niezawodności i profesjonalizmie.",
      },
      {
        title: "Jakość w każdym calu",
        description:
          "Współpraca z marką, która wyznacza standardy w branży oponiarskiej.",
      },
      {
        title: "Nieustanny rozwój",
        description:
          "32 lata wspólnych innowacji i ciągłego podnoszenia standardów.",
      },
    ],
  };

  return (
    <main>
      <SectionHero data={heroData} />
      <SectionNumbers data={numbers} />
      <SectionServices />
      <SectionServices />
      <SectionBrands />
      <SectionCTA data={CTA} />
      <SectionAwards data={awards} />
      <TestimonialsSection />
    </main>
  );
}
