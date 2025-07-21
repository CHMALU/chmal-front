import Button from "../../components/Button";
import Container from "../../components/Container";
import { Header } from "../../components/Header";
import type {
  ServicesData,
  WPCatalogEntry,
  PageServiceData,
  WPPageUslugi,
} from "@/type/acf";
import CatalogClient from "./CatalogClient";

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

  const pageRes = await fetch(
    "http://localhost/chmal.pl/wp-json/wp/v2/pages?slug=strona-uslugi",
    { next: { revalidate: 60 } }
  );
  const pages: WPPageUslugi[] = await pageRes.json();
  const serviceData: PageServiceData = pages[0].acf.pageServiceData;

  return (
    <section>
      <Container>
        <div className="flex flex-col items-center justify-center pb-16">
          <Header title={title} subtitle={subtitle} />
          <CatalogClient items={items} serviceData={serviceData} />
          <Button
            href={variant === "services" ? "/uslugi" : "/produkty"}
            label={buttonText}
          />
        </div>
      </Container>
    </section>
  );
}
