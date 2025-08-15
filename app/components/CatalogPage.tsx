import { SectionAllItems } from "@/app/produkty/SectionAllItems";
import { SectionCTA } from "@/app/home/SectionCTA";
import { SectionTestimonials } from "@/app/home/sectionTestimonials/SectionTestimonials";
import { SectionSEO } from "@/app/home/sectionSEO/SetionSEO";
import { SectionTireBrands } from "@/app/produkty/SectionTireBrands";
import { SectionBrands } from "@/app/home/SectionBrands";

import { getList, getPageACF } from "@/app/libs/wp";
import type {
  CatalogItem,
  SubpageVariant,
  WPPage,
  WPPageCatalog,
} from "@/type/acf";

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
  const items: CatalogItem[] = entries
    .map((e) => ({
      ...e.acf.catalogItem,
      id: e.id,
      slug: e.slug,
      variant,
    }))
    .sort(
      (a, b) =>
        (parseInt(a.order as string, 20) || 0) -
        (parseInt(b.order as string, 20) || 0)
    );

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
