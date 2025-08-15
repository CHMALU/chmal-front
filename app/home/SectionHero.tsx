import Image from "next/image";
import Container from "../components/Container";
import Button from "../components/Button";
import PaginationDots from "../components/PaginationDots";
import { TypographyBody, TypographyH1 } from "../components/Typography";
import { ButtonSettings, HeroData } from "@/type/acf";

interface SectionHeroProps {
  data: HeroData;
  buttonSettings: ButtonSettings;
}

export function SectionHero({ data, buttonSettings }: SectionHeroProps) {
  const { title, subtitle, image } = data;
  const { url: imageUrl, alt: imageAlt } = image;
  const { buttonText, buttonLink } = buttonSettings;

  return (
    <section className="pb-6">
      <div className="flex flex-col gap-9">
        <div className="relative h-full">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={imageAlt ?? ""}
              fill
              className="absolute z-0 object-cover object-bottom shrink-0"
              sizes="100vw"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/40 z-10" />
          <div className="w-full min-[1240px]:w-[calc((100vw-1240px)/2+604px+16px)] absolute h-full bg-white/50 shrink-0 blur-[6px]" />

          <Container>
            <div className="relative z-20 flex flex-col gap-12 h-[560px] max-w-[604px] mr-4 justify-center sm:items-start items-center sm:text-start text-center shrink-0">
              <div className="flex flex-col items-start gap-3 self-stretch">
                <TypographyH1 className="text-gray-50">{title}</TypographyH1>
                <TypographyBody className="text-gray-50 text-sm">
                  {subtitle}
                </TypographyBody>
              </div>
              <Button href={buttonLink} label={buttonText} />
            </div>
          </Container>
        </div>
        <PaginationDots />
      </div>
    </section>
  );
}
