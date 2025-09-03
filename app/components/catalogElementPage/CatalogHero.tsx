import Image from "next/image";
import Container from "@/app/components/Container";
import {
  TypographyBody,
  TypographyH1,
  TypographyH3,
} from "@/app/components/Typography";
import Button from "@/app/components/Button";
import { ButtonSettings, CatalogItemACF, PriceCatalogData } from "@/type/acf";
import { formatPrice, splitParagraphs } from "@/app/libs/formaters";

export interface CatalogHeroProps {
  data: CatalogItemACF;
  buttonSettings: ButtonSettings;
  priceCatalogData: PriceCatalogData;
}

export default function CatalogHero({
  data,
  buttonSettings,
  priceCatalogData,
}: CatalogHeroProps) {
  const { name, image, price, promise, explanation, descTitle, description } =
    data;
  const { url: imageUrl, alt: imageAlt } = image;
  const { buttonText, buttonLink } = buttonSettings;

  const { prefixCeny, walutaCeny } = priceCatalogData;

  return (
    <section className="relative">
      <Container>
        <div className="flex justify-between items-center py-16">
          {/* Lewa kolumna */}
          <div className="flex flex-col gap-8 justify-center items-start max-w-[31.125rem]">
            <div className="flex flex-col justify-center items-start gap-4 self-stretch">
              <div className="flex flex-col gap-2">
                <TypographyBody className="text-gray-500 text-xs uppercase font-bold">
                  {name}
                </TypographyBody>

                <TypographyH3 size={"xl"}>{promise}</TypographyH3>
              </div>

              <TypographyBody>{explanation}</TypographyBody>

              <div className="flex flex-col self-stretch gap-3">
                <div className="h-[1px] w-full bg-gray-300" />
                <div className="flex items-baseline gap-1">
                  <p className="text-sm text-gray-900 leading-[150%]">
                    {prefixCeny}
                  </p>
                  <h3 className="text-xl font-bold text-gray-900 leading-[120%]">
                    {formatPrice(price)} {walutaCeny}
                  </h3>
                </div>
              </div>
            </div>
            <Button label={buttonText} href={buttonLink} />
          </div>

          {/* Prawa kolumna */}
          <div className="h-[37.5rem] w-[37.5rem] shrink-0 bg-gray-200 rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={imageAlt || name}
              width={600}
              height={600}
              className="object-cover h-full w-full"
            />
          </div>
        </div>

        {/* Opis usługi */}
        <div className="py-6 pb-12">
          <div className="flex flex-col gap-4 max-w-[57.625rem]">
            <TypographyH1 small className="text-gray-900">
              {descTitle}
            </TypographyH1>
            {splitParagraphs(description).map((p, i) => (
              <TypographyBody
                key={i}
                className="whitespace-pre-line text-gray-700"
              >
                {p}
              </TypographyBody>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
