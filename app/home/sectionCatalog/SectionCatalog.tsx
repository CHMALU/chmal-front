import Button from "../../components/Button";
import Container from "../../components/Container";
import { Header } from "../../components/Header";
import type {
  ServicesData,
  PriceCatalogData,
  SubpageVariant,
} from "@/type/acf";
import CatalogClient from "./CatalogClient";
import { getList } from "@/app/libs/wp";
import { mapEntriesToCatalogItems } from "@/app/libs/catalog";

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
  const items = mapEntriesToCatalogItems(entries, variant, 20);

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
