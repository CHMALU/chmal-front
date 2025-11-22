import { SectionAllItems } from "@/app/produkty/SectionAllItems";
import { SectionCTA } from "../home/sectionCTA/SectionCTA";
import { SectionTestimonials } from "@/app/home/sectionTestimonials/SectionTestimonials";
import { SectionSEO } from "@/app/home/sectionSEO/SetionSEO";
import { SectionTireBrands } from "@/app/produkty/SectionTireBrands";
import { SectionBrands } from "@/app/home/sectionBrands/SectionBrands";

import { getList, getPageACF } from "@/app/libs/wp";
import type { SubpageVariant, WPPage, WPPageCatalog } from "@/type/acf";
import { mapEntriesToCatalogItems } from "../libs/catalog";

interface SectionHeroProps {
  variant: SubpageVariant;
}
export default async function CatalogPage({ variant }: SectionHeroProps) {
  const {
    buttonSettings,
    priceCatalogData,
    ctaData,
    testimonialsData,
    seoData,
    brandsData,
  } = await getPageACF<WPPage["acf"]>("strona-glowna");

  const { allCatalogData, tireBrandsData } = await getPageACF<
    WPPageCatalog["acf"]
  >(`strona-${variant}`);

  const entries = await getList(variant);
  const items = mapEntriesToCatalogItems(entries, variant);

  return (
    <main className="relative">
      <SectionAllItems
        data={allCatalogData}
        items={items}
        priceText={priceCatalogData}
      />
      {variant === "produkty" && (
        <SectionTireBrands
          data={tireBrandsData}
          buttonSettings={buttonSettings}
        />
      )}
      <SectionCTA data={ctaData} buttonSettings={buttonSettings} />
      <SectionTestimonials
        data={testimonialsData}
        buttonSettings={buttonSettings}
      />
      <SectionSEO data={seoData} />
      {variant === "produkty" && brandsData && (
        <SectionBrands data={brandsData} />
      )}
    </main>
  );
}
