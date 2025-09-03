import CatalogBenefits from "@/app/components/catalogElementPage/CatalogBenefits";
import CatalogHero from "@/app/components/catalogElementPage/CatalogHero";
import { SectionBrands } from "@/app/home/SectionBrands";
import { SectionCTA } from "@/app/home/SectionCTA";
import { SectionSEO } from "@/app/home/sectionSEO/SetionSEO";
import { SectionTestimonials } from "@/app/home/sectionTestimonials/SectionTestimonials";
import { SectionTireBrands } from "@/app/produkty/SectionTireBrands";
import { getOneBySlug, getPageACF } from "@/app/libs/wp";
import type { SubpageVariant, WPPage, WPPageCatalog } from "@/type/acf";
import { notFound } from "next/navigation";
import PricingElement from "@/app/cennik/PricingElement";

interface CatalogElementPageProps {
  variant: SubpageVariant;
  slug: string;
}

export default async function CatalogElementPage({
  variant,
  slug,
}: CatalogElementPageProps) {
  const {
    buttonSettings,
    priceCatalogData,
    ctaData,
    testimonialsData,
    seoData,
    brandsData,
  } = await getPageACF<WPPage["acf"]>("strona-glowna");

  const { pageServiceDataBenefits, tireBrandsData } = await getPageACF<
    WPPageCatalog["acf"]
  >(`strona-${variant}`);

  const item = await getOneBySlug(variant, slug);

  if (!item?.acf?.catalogItem) notFound();

  return (
    <main>
      <CatalogHero
        data={item.acf.catalogItem}
        buttonSettings={buttonSettings}
        priceCatalogData={priceCatalogData}
      />
      {variant === "uslugi" && <PricingElement slug={slug} />}

      <CatalogBenefits data={pageServiceDataBenefits} />
      <SectionCTA data={ctaData} buttonSettings={buttonSettings} />

      {variant === "produkty" && tireBrandsData && (
        <SectionTireBrands
          data={tireBrandsData}
          buttonSettings={buttonSettings}
        />
      )}
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
