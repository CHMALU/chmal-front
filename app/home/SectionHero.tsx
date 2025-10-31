"use client";

import { useState } from "react";
import Image from "next/image";
import Container from "../components/Container";
import Button from "../components/Button";
import PaginationDots from "../components/PaginationDots";
import { TypographyBody, TypographyH1 } from "../components/Typography";
import { ButtonSettings, HeroData, WPPageBaner } from "@/type/acf";

interface SectionHeroProps {
  data: HeroData;
  buttonSettings: ButtonSettings;
  baner: WPPageBaner[];
}

export function SectionHero({ data, buttonSettings, baner }: SectionHeroProps) {
  const { title, subtitle } = data;
  const { buttonText, buttonLink } = buttonSettings;

  const banerImages = (baner ?? []).map((item) => {
    const hero = item.acf?.baner?.hero_image;
    const y = item.acf?.baner?.y_position || "50";
    return {
      url: hero?.url || "",
      alt: hero?.alt || "",
      objectPosition: `center ${y}%`,
    };
  });

  const [current, setCurrent] = useState(0);

  return (
    <section className="pb-6 overflow-hidden">
      <div className="flex flex-col gap-9">
        <div className="relative h-[560px] w-full">
          {/* SLIDES WRAPPER */}
          <div
            className="absolute flex h-full w-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}vw)` }}
          >
            {banerImages.map((img, i) => (
              <div
                key={`${img.url}-${i}`}
                className="relative shrink-0 w-screen h-full"
              >
                <Image
                  src={img.url}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  style={{ objectPosition: img.objectPosition }}
                  sizes="100vw"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>

          {/* OVERLAY wspólny */}
          <div className="absolute inset-0 z-10">
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/50" />
            <div className="w-full min-[1240px]:w-[calc((100vw-1240px)/2+604px+16px)] absolute h-full bg-black/20 blur-[6px]" />
          </div>

          {/* CONTENT */}
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

        <PaginationDots
          maxDots={banerImages.length}
          current={current}
          onChange={setCurrent}
          auto
          intervalMs={5000}
        />
      </div>
    </section>
  );
}
