import { WPPage, WPPageCatalog } from "@/type/acf";
import { SectionBrands } from "../home/SectionBrands";
import { SectionCTA } from "../home/SectionCTA";
import { SectionSEO } from "../home/sectionSEO/SetionSEO";
import { SectionTestimonials } from "../home/sectionTestimonials/SectionTestimonials";
import { getList, getPageACF } from "../libs/wp";
import { SectionAllProducts } from "./SectionAllProducts";
import { SectionTireBrands } from "./SectionTireBrands";

export default async function ServicesPage() {
  const { ctaData, priceCatalogData } = await getPageACF<WPPage["acf"]>(
    "strona-glowna"
  );

  const entries = await getList("produkty");
  const items = entries
    .map((e) => e.acf.catalogItem)
    .sort(
      (a, b) =>
        (parseInt(a.order as string, 10) || 0) -
        (parseInt(b.order as string, 10) || 0)
    );

  // **Przykładowe dane dla SectionTireBrands**
  const tireBrandsData = {
    sectionTitle: "Nasze Marki Opon – Jakość, Innowacja, Niezawodność",
    sectionSubtitle:
      "W naszej ofercie znajdziesz szeroki wybór opon renomowanych producentów oraz nasze własne marki premium, które łączą innowacyjność i najwyższą jakość. Dzięki wieloletniemu doświadczeniu w branży oferujemy rozwiązania dopasowane do różnych potrzeb i warunków drogowych.",
    imageUrl: "http://localhost/chmal.pl/wp-content/uploads/2025/03/IMGg.png",
    imageAlt: "Zdjęcie jednej z naszych marek opon",
    certificateTitle: "Certyfikat Jakości 2024",
    certificateDescription:
      "Opony WELLPLUS powstają w oparciu o doświadczenie zespołu z ponad 15-letnim stażem w branży. Dzięki współpracy z fabryką Shandong zapewniamy nowoczesne rozwiązania dla samochodów osobowych (PCR) oraz ciężarowych i autobusów (TBR).",
    certificatePoints: [
      { title: "Tourador", description: "uznane na globalnym rynku" },
      {
        title: "POWER S",
        description:
          "bieżnik o niskich oporach toczenia, doskonałej przyczepności i trwałości",
      },
      {
        title: "Zaawansowane mieszanki",
        description:
          "zwiększona odporność i bezpieczeństwo na śliskich nawierzchniach",
      },
    ],
    primaryButtonLabel: "Umów wizytę online",
    secondaryButtonLabel: "Czytaj więcej",
  };

  return (
    <main className="relative">
      <SectionAllProducts items={items} priceText={priceCatalogData} />
      <SectionTireBrands data={tireBrandsData} />
      <SectionTireBrands data={tireBrandsData} />
      <SectionCTA data={ctaData} />
      <SectionTestimonials />
      <SectionSEO />
      {/* <SectionBrands /> */}
    </main>
  );
}
