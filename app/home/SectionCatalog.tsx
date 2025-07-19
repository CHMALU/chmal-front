import Button from "../components/Button";
import Container from "../components/Container";
import { Header } from "../components/Header";
import PaginationDots from "../components/PaginationDots";
import ProductTile from "../components/ProductTile";
import { ServicesData } from "@/type/acf";
import { WPCatalogEntry } from "@/type/acf";
import { CatalogItem } from "@/type/acf";

interface SectionCatalogProps {
  data: ServicesData;
  variant: "services" | "products";
}

export async function SectionCatalog({ variant, data }: SectionCatalogProps) {
  const { title, subtitle, buttonText } = data;

  const endpoint =
    variant === "services"
      ? "/wp-json/wp/v2/uslugi"
      : "/wp-json/wp/v2/produkty";

  const res = await fetch(`http://localhost/chmal.pl${endpoint}`);

  let items: CatalogItem[] = [];
  const entries: WPCatalogEntry[] = await res.json();
  items = entries.map((e) => e.acf.catalogItem);

  const sorted = (items as any[])
    .sort((a, b) => {
      const oa = parseInt((a.order as string) || "0", 10);
      const ob = parseInt((b.order as string) || "0", 10);
      return oa - ob;
    })
    .slice(0, 12);

  return (
    <section>
      <Container>
        <div className="flex flex-col items-center justify-center pb-16">
          <Header title={title} subtitle={subtitle} />
          <div className="py-12 flex flex-col justify-center items-center gap-12 self-stretch">
            <div className="w-full flex justify-center items-center gap-8">
              {sorted.map((item, idx) => (
                <ProductTile
                  key={idx}
                  title={item.name}
                  price={parseFloat(item.price)}
                  imageUrl={item.image.url}
                  imageAlt={item.image.alt}
                />
              ))}
            </div>
            <PaginationDots />
          </div>
          <Button href="/uslugi" label={buttonText} />
        </div>
      </Container>
    </section>
  );
}
