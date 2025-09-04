import { ButtonSettings, VariantACF, WPServiceEntry } from "@/type/acf";
import Container from "../components/Container";
import { getOneBySlug } from "../libs/wp";
import { TypographyBody, TypographyH3 } from "../components/Typography";
import Button from "../components/Button";
import { TbCashRegister } from "react-icons/tb";
import { formatPrice } from "../libs/formaters";

interface PricingElementProps {
  buttonSettings: ButtonSettings;
  slug: string;
}
export default async function PricingElement({
  buttonSettings,
  slug,
}: PricingElementProps) {
  const { buttonText, buttonLink } = buttonSettings;

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

  const variants = Array.from({ length: 10 }, (_, i) => {
    const v = item.acf.catalogItem[
      `variant${i + 1}` as keyof typeof item.acf.catalogItem
    ] as VariantACF;

    return v && v.title && v.title.trim() !== "" ? v : null;
  }).filter(Boolean) as VariantACF[];

  if (variants.length === 0) {
    return null;
  }

  return (
    <section>
      <Container>
        <div className="flex flex-col justify-center">
          <div className="flex py-4 px-6 items-center gap-4">
            <div className="flex items-center gap-3 grow">
              <TbCashRegister size={24} />
              <TypographyH3>{item.acf.catalogItem.name}</TypographyH3>
            </div>
            <Button href={buttonLink} label={buttonText} />
          </div>

          {variants.map((v, idx) => (
            <div
              key={idx}
              className={`pl-10 flex items-center gap-2 border-gray-900 ${
                idx === 0 ? "border-t-2" : "border-t"
              }`}
            >
              <div className="flex flex-col items-start justify-center gap-4 p-6 grow self-stretch">
                <TypographyH3>{v.title}</TypographyH3>
                <TypographyBody className=" text-gray-700">
                  {v.subtitle}
                </TypographyBody>
              </div>
              <div className="flex flex-col w-48 p-6 gap-4 shrink-0 self-stretch">
                <div className="flex h-12 items-center self-stretch">
                  <TypographyH3>{formatPrice(v.price)} zł</TypographyH3>
                </div>
                <TypographyBody className=" text-gray-700">
                  {v.time} minut
                </TypographyBody>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
