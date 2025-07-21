import { SectionAwards } from "./home/SectionAwards";
import { SectionBlog } from "./home/sectionBlog/SectionBlog";
import { SectionBrands } from "./home/SectionBrands";
import { SectionContact } from "./home/sectionContact/SectionContact";
import { SectionCTA } from "./home/SectionCTA";
import { SectionFAQ } from "./home/sectionFAQ/SectionFAQ";
import { SectionHero } from "./home/SectionHero";
import { SectionStats } from "./home/SectionStats";
import { SectionSEO } from "./home/sectionSEO/SetionSEO";
import { SectionCatalog } from "./home/sectionCatalog/SectionCatalog";
import { SectionTestimonials } from "./home/sectionTestimonials/SectionTestimonials";
import { WPPage } from "@/type/acf";

export const revalidate = 60;

export default async function HomePage() {
  const res = await fetch(
    "http://localhost/chmal.pl/wp-json/wp/v2/pages?slug=strona-glowna",
    { next: { revalidate } }
  );
  const pages: WPPage[] = await res.json();
  const { acf } = pages[0];

  const { heroData, statsData, servicesData, productsData, ctaData } = acf;

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
      <SectionStats data={statsData} />
      <SectionCatalog variant="services" data={servicesData} />
      <SectionCatalog variant="products" data={productsData} />
      <SectionBrands />
      <SectionCTA data={ctaData} />
      <SectionAwards data={awards} />
      <SectionTestimonials />
      <SectionBlog />
      <SectionFAQ />
      <SectionSEO />
      <SectionContact />
    </main>
  );
}
