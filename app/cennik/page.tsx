import { WPPageNav } from "@/type/acf";
import Container from "../components/Container";
import { SectionContact } from "../home/sectionContact/SectionContact";
import { SectionCTA } from "../home/sectionCTA/SectionCTA";
import { getPageACF } from "../libs/wp";
import FullPricing from "./FullPricing";

export default async function Page() {
  const { buttonSettings, ctaData, contactData } = await getPageACF(
    "strona-glowna"
  );

  const { navbar } = await getPageACF<WPPageNav["acf"]>("nawigacja-stopka");

  return (
    <section>
      <Container>
        <FullPricing buttonSettings={buttonSettings} />
        <SectionCTA data={ctaData} buttonSettings={buttonSettings} />
        <SectionContact data={contactData} contactHref={navbar} />
      </Container>
    </section>
  );
}
