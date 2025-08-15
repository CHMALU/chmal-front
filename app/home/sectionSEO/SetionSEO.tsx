import React from "react";
import Container from "@/app/components/Container";
import { TypographyBody, TypographyH3 } from "@/app/components/Typography";
import { seoData } from "@/type/acf";

export interface SectionSEOProps {
  data: seoData;
}

export async function SectionSEO({ data }: SectionSEOProps) {
  const {
    title,
    description,
    steps_title,
    steps_description,
    premium_title,
    premium_description,
    why_title,
    why_point,
    fleet_title,
    fleet_description,
    warranty_title,
    warranty_description,
  } = data;

  return (
    <section className="py-12">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Lewa kolumna */}
          <div className="flex flex-col gap-4">
            <TypographyH3>{title}</TypographyH3>
            <TypographyBody>{description}</TypographyBody>

            <TypographyH3>{steps_title}</TypographyH3>
            <TypographyBody>{steps_description}</TypographyBody>

            <TypographyH3>{premium_title}</TypographyH3>
            <TypographyBody>{premium_description}</TypographyBody>
          </div>

          {/* Prawa kolumna */}
          <div className="flex flex-col gap-4">
            <TypographyH3>{why_title}</TypographyH3>
            <TypographyBody>{why_point}</TypographyBody>

            <TypographyH3>{fleet_title}</TypographyH3>
            <TypographyBody>{fleet_description}</TypographyBody>

            <TypographyH3>{warranty_title}</TypographyH3>
            <TypographyBody>{warranty_description}</TypographyBody>
          </div>
        </div>
      </Container>
    </section>
  );
}
