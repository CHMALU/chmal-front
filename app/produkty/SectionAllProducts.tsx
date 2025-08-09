// components/SectionAllProducts.tsx
import Container from "../components/Container";
import ProductTile from "../components/ProductTile";
import { TypographyBody, TypographyH3 } from "../components/Typography";
import type { CatalogItem, PageCatalogData, WPCatalogEntry } from "@/type/acf";

interface SectionAllProductsProps {
  items: CatalogItem[];
  priceText: PageCatalogData;
}

export function SectionAllProducts({
  items,
  priceText,
}: SectionAllProductsProps) {
  return (
    <section className="relative">
      <Container>
        {/* Nagłówek sekcji */}
        <div className="py-12 mx-auto max-w-5xl flex flex-col gap-4">
          <TypographyH3>Wszystkie produkty</TypographyH3>
          <TypographyBody>
            Oferujemy szeroką gamę produktów motoryzacyjnych: opony i felgi do
            samochodów osobowych, ciężarowych, maszyn rolniczych oraz motocykli.
            Nasze produkty pochodzą od renomowanych marek takich jak Michelin,
            Goodyear, Continental czy Alcar — gwarantując najwyższą jakość i
            niezawodność.
          </TypographyBody>
        </div>

        {/* Kafelki produktów */}
        <div
          className="
            grid
            justify-center
            gap-x-8 gap-y-24
            py-12
            [grid-template-columns:repeat(auto-fit,_392px)]
          "
        >
          {items.map((item, idx) => (
            <ProductTile key={idx} item={item} priceText={priceText} />
          ))}
        </div>
      </Container>
    </section>
  );
}
