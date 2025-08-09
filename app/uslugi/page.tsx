// app/uslugi/page.tsx

import { getPageACF, getList } from "../libs/wp";
import { SectionAllProducts } from "../produkty/SectionAllProducts";
import { SectionCTA } from "../home/SectionCTA";
import { SectionTestimonials } from "../home/sectionTestimonials/SectionTestimonials";
import { SectionSEO } from "../home/sectionSEO/SetionSEO";
import type { WPPage, WPPageCatalog } from "@/type/acf";

export const revalidate = 60;

export default async function ServicesPage() {
  const { ctaData, priceCatalogData } = await getPageACF<WPPage["acf"]>(
    "strona-glowna",
    revalidate
  );

  const entries = await getList("uslugi");
  const items = entries
    .map((e) => e.acf.catalogItem)
    .sort(
      (a, b) =>
        (parseInt(a.order as string, 10) || 0) -
        (parseInt(b.order as string, 10) || 0)
    );

  return (
    <main className="relative">
      <SectionAllProducts items={items} priceText={priceCatalogData} />
      <SectionCTA data={ctaData} />
      <SectionTestimonials />
      <SectionSEO />
    </main>
  );
}
