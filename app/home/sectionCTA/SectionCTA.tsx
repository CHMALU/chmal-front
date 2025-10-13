"use client";

import { ButtonSettings, CTAData } from "@/type/acf";
import Button from "../../components/Button";
import Container from "../../components/Container";
import { Header } from "../../components/Header";
import Image from "next/image";
import { MouseFlare } from "./MouseFlare";
import { useRef } from "react";

interface SectionCTAProps {
  data: CTAData;
  buttonSettings: ButtonSettings;
}
export function SectionCTA({ data, buttonSettings }: SectionCTAProps) {
  const { sectionTitle, subtitle } = data;
  const { buttonText, buttonLink } = buttonSettings;

  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-8">
      <Container>
        <div
          ref={trackRef}
          className="relative flex items-center justify-center w-full min-h-[356px] rounded-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-brand-secondary-500 z-0" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent z-10" />

          {/* flara POD treścią, NAD gradientem */}
          <MouseFlare
            trackRef={trackRef}
            size={340}
            smoothing={0.1}
            className="z-20"
          />

          <div className="dark-selection px-4 py-12 z-30 flex w-[816px] flex-col justify-center items-center gap-12">
            <Header
              noPaddingY
              textWhite
              title={sectionTitle}
              subtitle={subtitle}
            />
            <Button label={buttonText} href={buttonLink} />
            <Image
              src="/images/CTA.png"
              alt="CTA Image"
              width={352}
              height={309}
              className="absolute bottom-[-15px] right-[-70px] opacity-50 sm:opacity-100 z-[-10] shrink-0"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
