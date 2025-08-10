import { SectionAllProducts } from "@/app/produkty/SectionAllProducts";
import { SectionCTA } from "@/app/home/SectionCTA";
import { SectionTestimonials } from "@/app/home/sectionTestimonials/SectionTestimonials";
import { SectionSEO } from "@/app/home/sectionSEO/SetionSEO";
import { SectionTireBrands } from "@/app/produkty/SectionTireBrands";
import { SectionBrands } from "@/app/home/SectionBrands";

import { getList, getPageACF } from "@/app/libs/wp";
import type { WPPage, WPPageCatalog } from "@/type/acf";

type Variant = "uslugi" | "produkty";

export default async function CatalogPage({ variant }: { variant: Variant }) {
  const home = await getPageACF<WPPage["acf"]>("strona-glowna");

  const page = await getPageACF<WPPageCatalog["acf"]>(`strona-${variant}`);

  const entries = await getList(variant);
  const items = entries
    .map((e: any) => e.acf.catalogItem)
    .sort(
      (a: any, b: any) =>
        (parseInt(a?.order as string, 10) || 0) -
        (parseInt(b?.order as string, 10) || 0)
    );

  return (
    <main className="relative">
      <SectionAllProducts
        data={page.allCatalogData}
        items={items}
        priceText={home.priceCatalogData}
      />
      {variant === "produkty" && (
        <SectionTireBrands
          data={page.tireBrandsData}
          buttonSettings={home.buttonSettings}
        />
      )}
      <SectionCTA data={home.ctaData} buttonSettings={home.buttonSettings} />
      <SectionTestimonials
        data={home.testimonialsData}
        buttonSettings={home.buttonSettings}
      />
      <SectionSEO data={home.seoData} />
      {variant === "produkty" && home.brandsData && (
        <SectionBrands data={home.brandsData} />
      )}
    </main>
  );
}
