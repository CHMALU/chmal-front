import Button from "../../components/Button";
import Container from "../../components/Container";
import { Header } from "../../components/Header";
import type {
  ServicesData,
  PriceCatalogData,
  SubpageVariant,
  CatalogItem,
} from "@/type/acf";
import CatalogClient from "./CatalogClient";
import { getList } from "@/app/libs/wp";

interface SectionCatalogProps {
  data: ServicesData;
  priceCatalogData: PriceCatalogData;
  variant: SubpageVariant;
}

export async function SectionCatalog({
  data,
  priceCatalogData,
  variant,
}: SectionCatalogProps) {
  const { title, subtitle, buttonText } = data;

  const entries = await getList(variant);

  const items: CatalogItem[] = entries
    .map((e) => ({
      ...e.acf.catalogItem,
      id: e.id,
      slug: e.slug,
      variant,
    }))
    .sort(
      (a, b) =>
        (parseInt(a.order as string, 10) || 0) -
        (parseInt(b.order as string, 10) || 0)
    )
    .slice(0, 20);

  return (
    <section>
      <Container>
        <div className="flex flex-col items-center justify-center pb-16">
          <Header title={title} subtitle={subtitle} />
          <CatalogClient items={items} catalogData={priceCatalogData} />
          <Button href={`/${variant}`} label={buttonText} />
        </div>
      </Container>
    </section>
  );
}
