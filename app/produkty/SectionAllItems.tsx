import Container from "../components/Container";
import CatalogTile from "../components/CatalogTile";
import { TypographyBody, TypographyH3 } from "../components/Typography";
import type { allCatalogData, CatalogItem, PriceCatalogData } from "@/type/acf";

interface SectionAllItemsProps {
  items: CatalogItem[];
  priceText: PriceCatalogData;
  data: allCatalogData;
}

export function SectionAllItems({
  items,
  priceText,
  data,
}: SectionAllItemsProps) {
  const { sectionTitle, subtitle } = data;

  return (
    <section className="relative">
      <Container>
        <div className="py-12 mx-auto max-w-5xl flex flex-col gap-4">
          <TypographyH3>{sectionTitle}</TypographyH3>
          <TypographyBody>{subtitle}</TypographyBody>
        </div>

        <div className="grid justify-center gap-x-8 gap-y-24 py-12 [grid-template-columns:repeat(auto-fit,_392px)]">
          {items.map((item, idx) => (
            <CatalogTile key={idx} item={item} priceText={priceText} />
          ))}
        </div>
      </Container>
    </section>
  );
}
