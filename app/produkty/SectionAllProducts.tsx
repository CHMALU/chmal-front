import Container from "../components/Container";
import ProductTile from "../components/ProductTile";
import { TypographyBody, TypographyH3 } from "../components/Typography";
import type { allCatalogData, CatalogItem, PriceCatalogData } from "@/type/acf";

interface SectionAllProductsProps {
  items: CatalogItem[];
  priceText: PriceCatalogData;
  data: allCatalogData;
}

export function SectionAllProducts({
  items,
  priceText,
  data,
}: SectionAllProductsProps) {
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
            <ProductTile key={idx} item={item} priceText={priceText} />
          ))}
        </div>
      </Container>
    </section>
  );
}
