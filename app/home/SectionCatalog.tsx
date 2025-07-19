import Button from "../components/Button";
import Container from "../components/Container";
import { Header } from "../components/Header";
import PaginationDots from "../components/PaginationDots";
import ProductTile from "../components/ProductTile";
import type { ServicesData, WPCatalogEntry, CatalogItem } from "@/type/acf";

interface SectionCatalogProps {
  data: ServicesData;
  variant: "services" | "products";
}

export async function SectionCatalog({ variant, data }: SectionCatalogProps) {
  const { title, subtitle, buttonText } = data;
  const endpoint = variant === "services" ? "uslugi" : "produkty";

  const res = await fetch(
    `http://localhost/chmal.pl/wp-json/wp/v2/${endpoint}`
  );
  const entries: WPCatalogEntry[] = await res.json();

  const items = entries
    .map((e) => e.acf.catalogItem)
    .sort(
      (a, b) =>
        (parseInt(a.order as string, 10) || 0) -
        (parseInt(b.order as string, 10) || 0)
    )
    .slice(0, 12);

  return (
    <section>
      <Container>
        <div className="flex flex-col items-center justify-center pb-16">
          <Header title={title} subtitle={subtitle} />
          <div className="py-12 flex flex-col justify-center items-center gap-12 self-stretch">
            <div className="w-full flex justify-center items-center gap-8">
              {items.map((item, i) => (
                <ProductTile key={i} item={item} />
              ))}
            </div>
            <PaginationDots />
          </div>

          <Button
            href={variant === "services" ? "/uslugi" : "/produkty"}
            label={buttonText}
          />
        </div>
      </Container>
    </section>
  );
}
