"use client";

import { HiOutlineCheck } from "react-icons/hi";
import Container from "../components/Container";
import { Header } from "../components/Header";
import { TypographyBody } from "../components/Typography";
import Button from "../components/Button";
import Image from "next/image";

interface CertificatePoint {
  title: string;
  description: string;
}

interface SectionTireBrandsData {
  sectionTitle: string;
  sectionSubtitle: string;
  imageUrl: string;
  imageAlt: string;
  certificateDescription: string;
  certificatePoints: CertificatePoint[];
  primaryButtonLabel: string;
  secondaryButtonLabel: string;
}

interface SectionTireBrandsProps {
  data: SectionTireBrandsData;
}

export function SectionTireBrands({ data }: SectionTireBrandsProps) {
  return (
    <section className="relative py-12">
      <Container>
        <Header title={data.sectionTitle} subtitle={data.sectionSubtitle} />
        <div className="flex gap-8 shrink-0 items-start mt-12">
          <div className="bg-gray-300 rounded-lg overflow-hidden">
            <Image
              src={data.imageUrl}
              width={604}
              height={403}
              alt={data.imageAlt}
            />
          </div>

          <div className="flex flex-col justify-center items-start gap-4 grow basis-0 shrink-0 self-stretch">
            <Image
              src="/images/WellPlus.png"
              width={211}
              height={32}
              alt="WellPlus logo"
            />
            <TypographyBody>{data.certificateDescription}</TypographyBody>

            {data.certificatePoints.map((point, idx) => (
              <div key={idx} className="flex gap-3 items-center">
                <HiOutlineCheck className="text-gray-900 w-6 h-6 flex-shrink-0" />
                <TypographyBody className="text-gray-900">
                  <span className="font-bold">{point.title}:</span>{" "}
                  {point.description}
                </TypographyBody>
              </div>
            ))}

            <div className="flex gap-3">
              <Button
                variant="outlineSecondary"
                label={data.secondaryButtonLabel}
                onClick={() => {}}
              />
              <Button label={data.primaryButtonLabel} onClick={() => {}} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
