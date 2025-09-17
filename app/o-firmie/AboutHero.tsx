import Image from "next/image";
import { AboutCompanyData, ButtonSettings } from "@/type/acf";
import Button from "../components/Button";
import Container from "../components/Container";
import { Header } from "../components/Header";
import { TypographyBody } from "../components/Typography";

interface AboutHeroProps {
  data: AboutCompanyData;
  buttonSettings: ButtonSettings;
}
export default async function AboutHero({
  data,
  buttonSettings,
}: AboutHeroProps) {
  const { aboutTitle, aboutSubtitle, aboutText, aboutImage } = data;
  const { buttonText, buttonLink } = buttonSettings;

  return (
    <Container>
      <div className="py-16 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col gap-8 flex-1 max-w-[32rem] justify-center items-center px-6 md:px-0 md:items-start text-center md:text-left">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <TypographyBody className="text-gray-900 text-xs uppercase font-bold">
                {aboutTitle}
              </TypographyBody>
              <Header noPaddingX noPaddingY left title={aboutSubtitle} />
            </div>
            <TypographyBody>{aboutText}</TypographyBody>
          </div>
          <Button label={buttonText} href={buttonLink} />
        </div>

        {/* Obrazek */}
        {aboutImage && (
          <div className="w-full flex-1 max-w-[37.75rem] aspect-square relative grow">
            <Image
              src={aboutImage.url}
              alt={aboutImage.alt || "About company"}
              fill
              className="object-cover rounded-2xl"
              sizes="(max-width: 768px) 100vw, 37.75rem"
            />
          </div>
        )}
      </div>
    </Container>
  );
}
