import { WPPageNav } from "@/type/acf";
import { SectionContact } from "../home/sectionContact/SectionContact";
import { getPageACF } from "../libs/wp";

export default async function Page() {
  const { contactData } = await getPageACF("strona-glowna");

  const { navbar } = await getPageACF<WPPageNav["acf"]>("nawigacja-stopka");

  return (
    <main>
      <SectionContact data={contactData} contactHref={navbar} />
    </main>
  );
}
