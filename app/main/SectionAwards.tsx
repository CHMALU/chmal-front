"use client";

import { title } from "process";
import Container from "../components/Container";
import { Header } from "../components/Header";
import Image from "next/image";
import { TypographyBody, TypographyH3 } from "../components/Typography";
import { HiOutlineCheck } from "react-icons/hi";
import Button from "../components/Button";
import PaginationDots from "../components/PaginationDots";

interface CertificatePoint {
  title: string;
  description: string;
}

interface AwardsItem {
  sectionTitle: string;
  sectionSubtitle: string;
  imageUrl: string;
  imageAlt: string;
  certificateTitle: string;
  certificateDescription: string;
  certificatePoints: CertificatePoint[];
  buttonText: string;
}

interface SectionAwardsProps {
  data: AwardsItem;
}

export function SectionAwards({ data }: SectionAwardsProps) {
  return (
    <section className="py-12">
      <Container>
        <div className=" flex flex-col gap-12">
          <Header
            noPaddingY
            title={data.sectionTitle}
            subtitle={data.sectionSubtitle}
          />
          <div className="flex gap-8 shrink-0 items-start ">
            <div className="bg-gray-300 rounded-lg overflow-hidden">
              <Image
                src="http://localhost/chmal.pl/wp-content/uploads/2025/03/IMG.pngg"
                width={604}
                height={604}
                alt="Awards Image"
              />
            </div>
            <div className="flex flex-col justify-center items-start gap-8 grow basis-0 shrink-0">
              <div className=" flex flex-col gap-3">
                <TypographyH3>{data.certificateTitle}</TypographyH3>
                <TypographyBody>{data.certificateDescription}</TypographyBody>
              </div>
              {data.certificatePoints.map((certificatePoint, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <HiOutlineCheck className="text-gray-900 w-6 h-6 flex-shrink-0" />
                  <TypographyBody className="text-gray-900">
                    <span className="font-bold">{certificatePoint.title}:</span>{" "}
                    {certificatePoint.description}
                  </TypographyBody>
                </div>
              ))}
              <Button label="Umów wizytę online" onClick={() => {}} />
            </div>
          </div>
          <div className=" w-[603px] flex justify-center items-center gap-32">
            <PaginationDots maxDots={6} withCounter />
          </div>
        </div>
      </Container>
    </section>
  );
}
