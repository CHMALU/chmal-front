import { ButtonSettings, WPServiceEntry } from "@/type/acf";
import Container from "../components/Container";
import { mapEntriesToCatalogItems } from "../libs/catalog";
import { getList } from "../libs/wp";
import PricingElement from "./PricingElement";
import { Header } from "../components/Header";

interface FullPricingProps {
  buttonSettings: ButtonSettings;
}
export default async function FullPricing({
  buttonSettings,
}: FullPricingProps) {
  const entries = await getList<WPServiceEntry>("uslugi");
  const items = mapEntriesToCatalogItems(entries, "uslugi");

  return (
    <section>
      <Container>
        <Header
          title="Cennik usług"
          subtitle="W naszym serwisie stawiamy na przejrzystość i uczciwość – dlatego udostępniamy szczegółowy cennik naszych usług i produktów. Jeśli masz wątpliwości, skontaktuj się z nami, a pomożemy dobrać najlepsze rozwiązanie dla Twojego pojazdu."
        />
        <div className="flex flex-col gap-4 py-12">
          {items.map((it, i) => (
            <PricingElement
              key={it.id ?? `${it.slug}-${i}`}
              slug={it.slug}
              buttonSettings={buttonSettings}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
