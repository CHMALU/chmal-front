import Button from "../../components/Button";
import Container from "../../components/Container";
import { Header } from "../../components/Header";
import type { ServicesData, PriceCatalogData } from "@/type/acf";
import CatalogClient from "./CatalogClient";
import { getList } from "@/app/libs/wp";

interface SectionCatalogProps {
  data: ServicesData;
  priceCatalogData: PriceCatalogData;
  variant: "services" | "products";
}

export async function SectionCatalog({
  variant,
  data,
  priceCatalogData,
}: SectionCatalogProps) {
  const { title, subtitle, buttonText } = data;

  const endpoint = variant === "services" ? "uslugi" : "produkty";
  const entries = await getList(endpoint);

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
          <CatalogClient items={items} catalogData={priceCatalogData} />
          <Button
            href={variant === "services" ? "/uslugi" : "/produkty"}
            label={buttonText}
          />
        </div>
      </Container>
    </section>
  );
}
