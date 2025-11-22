import Container from "@/app/components/Container";
import { Header } from "@/app/components/Header";
import BrandsGrid from "./BrandsGrid";
import BrandsMarquee from "./BrandsMarquee";
import { getList } from "@/app/libs/wp";
import type { WPBrandEntry, BrandsData } from "@/type/acf";

interface SectionBrandsProps {
  data: BrandsData;
}

export async function SectionBrands({ data }: SectionBrandsProps) {
  const { title } = data;
  const entries = await getList<WPBrandEntry>("brand");
  const brands = entries.map(({ id, acf: { brandFields } }) => {
    const { title, logo, link } = brandFields;
    return { id, title, logo, link };
  });

  return (
    <section className="py-6 sm:py-12">
      <Container>
        <Header title={title} />

        {/* MOBILE marquee (sm:hidden) */}
        <BrandsMarquee brands={brands} speed={1} />

        {/* DESKTOP grid (hidden on mobile) */}
        <BrandsGrid brands={brands} />
      </Container>
    </section>
  );
}

export default SectionBrands;
