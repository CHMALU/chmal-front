import { WPPageAbout, WPPageCatalog, WPPageNav } from "@/type/acf";
import { SectionStats } from "../home/sectionStats/SectionStats";
import { getPageACF } from "../libs/wp";
import AboutHero from "./AboutHero";
import WorkshopGallery from "./WorkshopGallery";
import { SectionCTA } from "../home/sectionCTA/SectionCTA";
import { SectionTestimonials } from "../home/sectionTestimonials/SectionTestimonials";
import { SectionContact } from "../home/sectionContact/SectionContact";
import CatalogBenefits from "../components/catalogElementPage/CatalogBenefits";
import { SectionTireBrands } from "../produkty/SectionTireBrands";

export default async function Page() {
  const { aboutCompany, workshop, pageServiceDataBenefits } = await getPageACF<
    WPPageAbout["acf"]
  >("o-firmie");

  const { statsData, buttonSettings, ctaData, testimonialsData, contactData } =
    await getPageACF("strona-glowna");

  const { tireBrandsData } = await getPageACF<WPPageCatalog["acf"]>(
    `strona-produkty`
  );

  const { navbar } = await getPageACF<WPPageNav["acf"]>("nawigacja-stopka");

  return (
    <main>
      <AboutHero data={aboutCompany} buttonSettings={buttonSettings} />
      <SectionStats data={statsData} />
      <WorkshopGallery data={workshop} />
      <CatalogBenefits data={pageServiceDataBenefits} />
      <SectionCTA data={ctaData} buttonSettings={buttonSettings} />
      <SectionTireBrands
        data={tireBrandsData}
        buttonSettings={buttonSettings}
      />
      <SectionTestimonials
        data={testimonialsData}
        buttonSettings={buttonSettings}
      />
      <SectionContact data={contactData} contactHref={navbar} />
    </main>
  );
}
