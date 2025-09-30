import { getList, getPageACF } from "./libs/wp";
import { SectionHero } from "./home/SectionHero";
import { SectionStats } from "./home/SectionStats";
import { SectionCatalog } from "./home/sectionCatalog/SectionCatalog";
import { SectionBrands } from "./home/SectionBrands";
import { SectionCTA } from "./home/SectionCTA";
import { SectionAwards } from "./home/sectionAwards/SectionAwards";
import { SectionTestimonials } from "./home/sectionTestimonials/SectionTestimonials";
import { SectionBlog } from "./home/sectionBlog/SectionBlog";
import { SectionFAQ } from "./home/sectionFAQ/SectionFAQ";
import { SectionSEO } from "./home/sectionSEO/SetionSEO";
import { SectionContact } from "./home/sectionContact/SectionContact";
import { WPPageBaner, WPPageNav } from "@/type/acf";

export const revalidate = 60;

export default async function HomePage() {
  const {
    heroData,
    buttonSettings,
    statsData,
    priceCatalogData,
    servicesData,
    productsData,
    brandsData,
    ctaData,
    awardsData,
    testimonialsData,
    blogData,
    faqData,
    seoData,
    contactData,
  } = await getPageACF("strona-glowna", revalidate);

  const { navbar } = await getPageACF<WPPageNav["acf"]>("nawigacja-stopka");

  const baner = await getList<WPPageBaner>("baner");

  return (
    <main>
      <SectionHero
        data={heroData}
        buttonSettings={buttonSettings}
        baner={baner}
      />
      <SectionStats data={statsData} />
      <SectionCatalog
        variant="uslugi"
        data={servicesData}
        priceCatalogData={priceCatalogData}
      />
      <SectionCatalog
        variant="produkty"
        data={productsData}
        priceCatalogData={priceCatalogData}
      />
      <SectionBrands data={brandsData} />
      <SectionCTA data={ctaData} buttonSettings={buttonSettings} />
      <SectionAwards data={awardsData} buttonSettings={buttonSettings} />
      <SectionTestimonials
        data={testimonialsData}
        buttonSettings={buttonSettings}
      />
      <SectionBlog data={blogData} />
      <SectionFAQ data={faqData} buttonSettings={buttonSettings} />
      <SectionSEO data={seoData} />
      <SectionContact data={contactData} contactHref={navbar} />
    </main>
  );
}
