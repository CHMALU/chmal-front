import Container from "@/app/components/Container";
import { AwardsData, ButtonSettings, WPCertificateEntry } from "@/type/acf";
import { getList } from "@/app/libs/wp";
import AwardsCarousel from "./AwardsCarousel";

interface SectionAwardsProps {
  data: AwardsData;
  buttonSettings: ButtonSettings;
}

export async function SectionAwards({
  data,
  buttonSettings,
}: SectionAwardsProps) {
  const { sectionTitle, description } = data;

  const entries = await getList<WPCertificateEntry>("certificate");

  return (
    <section className="relative py-12">
      <Container>
        <div className="flex flex-col gap-12">
          <AwardsCarousel
            entries={entries}
            buttonSettings={buttonSettings}
            sectionTitle={sectionTitle}
            description={description}
          />
        </div>
      </Container>
    </section>
  );
}
