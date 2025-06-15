"use client";
import Image from "next/image";
import Container from "../components/Container";
import Button from "../components/Button";
import PaginationDots from "../components/PaginationDots";
import { TypographyBody } from "../components/Typography";

interface HeroItem {
  title: string;
  subtitle: string;
  buttonText: string;
  imageUrl: string;
  imageAlt: string;
}

interface SectionHeroProps {
  data: HeroItem;
}

export function SectionHero({ data }: SectionHeroProps) {
  if (!data) {
    return <p>Ładowanie...</p>;
  }

  return (
    <section className="pb-6">
      <div className="flex flex-col gap-9">
        <div className=" relative h-full">
          {data.imageUrl && (
            <Image
              src={data.imageUrl}
              alt={data.imageAlt}
              fill
              className="absolute z-0 object-cover shrink-0"
              sizes="100vw"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/40 z-10"></div>
          <div className="w-[clamp(620px,calc((100vw-1240px)/2+604px+16px),100%)] absolute h-full bg-white/40 shrink-0 blur-[6px]"></div>

          <Container>
            <div className="relative z-20 flex flex-col gap-12 h-[560px] w-[604px] mr-4 justify-center items-start shrink-0">
              <div className="flex flex-col items-start gap-3 self-stretch">
                <h1 className=" text-gray-50 text-5xl font-bold leading-[120%]">
                  {data.title}
                </h1>
                <TypographyBody className="text-gray-50 text-sm">
                  {data.subtitle}
                </TypographyBody>
              </div>
              <Button onClick={() => {}} label={data.buttonText} />
            </div>
          </Container>
        </div>
        <PaginationDots />
      </div>
    </section>
  );
}
