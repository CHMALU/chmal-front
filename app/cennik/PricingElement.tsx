import { ButtonSettings, VariantACF, WPServiceEntry } from "@/type/acf";
import Container from "../components/Container";
import { getOneBySlug } from "../libs/wp";
import PricingElementClient from "./PricingElementClient";

interface PricingElementProps {
  buttonSettings: ButtonSettings;
  slug: string;
  defaultState?: boolean;
}

export default async function PricingElement({
  buttonSettings,
  slug,
  defaultState = false,
}: PricingElementProps) {
  const item = await getOneBySlug<WPServiceEntry>("uslugi", slug);

  if (!item) {
    return (
      <section>
        <Container>
          <p>Brak danych dla {slug}</p>
        </Container>
      </section>
    );
  }

  const variants = Array.from({ length: 25 }, (_, i) => {
    const v = item.acf.catalogItem[
      `variant${i + 1}` as keyof typeof item.acf.catalogItem
    ] as VariantACF;

    return v && v.title && v.title.trim() !== "" ? v : null;
  }).filter(Boolean) as VariantACF[];

  if (variants.length === 0) {
    return null;
  }

  return (
    <PricingElementClient
      name={item.acf.catalogItem.name}
      buttonSettings={buttonSettings}
      variants={variants}
      defaultState={defaultState}
    />
  );
}
