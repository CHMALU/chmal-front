import Image from "next/image";
import Container from "../components/Container";
import { Header } from "../components/Header";
import { TypographyBody } from "../components/Typography";
import Button from "../components/Button";
import { HiOutlineCheck } from "react-icons/hi";
import type {
  TireBrandsData,
  TireBrand,
  TireBrandsPoint,
  ButtonSettings,
} from "@/type/acf";

interface SectionTireBrandsProps {
  data: TireBrandsData;
  buttonSettings: ButtonSettings;
}

export function SectionTireBrands({
  data,
  buttonSettings,
}: SectionTireBrandsProps) {
  const { buttonText, buttonLink } = buttonSettings;

  const brands: TireBrand[] = [data.brand1, data.brand2];

  return (
    <section className="relative bg-gray-100">
      <Container>
        <Header title={data.sectionTitle} subtitle={data.sectionSubtitle} />

        <div className="flex flex-col gap-16 py-12">
          {brands.map((b, idx) => {
            const certificatePoints: TireBrandsPoint[] = [
              b.point1,
              b.point2,
              b.point3,
            ];

            return (
              <div key={idx} className="flex gap-8 items-start max-lg:flex-col">
                <div className="bg-gray-300 rounded-lg overflow-hidden w-[604px] h-[403px] max-lg:w-full max-lg:h-auto">
                  <Image
                    src={b.imageUrl}
                    alt={b.imageAlt}
                    width={604}
                    height={403}
                    className="w-[604px] h-[403px] object-cover object-center max-lg:w-full max-lg:h-auto"
                  />
                </div>

                <div className="flex flex-col justify-center items-center sm:items-start text-center sm:text-left gap-4 grow basis-0 shrink-0 self-stretch">
                  <Image
                    src={b.brandLogoUrl}
                    width={211}
                    height={32}
                    alt={b.brandLogoAlt}
                  />

                  <TypographyBody>{b.certificateDescription}</TypographyBody>

                  {certificatePoints.map((point, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <HiOutlineCheck className="w-6 h-6 flex-shrink-0 mt-0.5" />
                      <TypographyBody className="text-gray-900">
                        <span className="font-bold">{point.title}</span>
                        {" – "}
                        {point.description}
                      </TypographyBody>
                    </div>
                  ))}

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button
                      variant="outlineSecondary"
                      label={b.secondaryButtonLabel}
                      href={b.secondaryButtonUrl}
                    />
                    <Button
                      variant="primary"
                      label={buttonText}
                      href={buttonLink}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
