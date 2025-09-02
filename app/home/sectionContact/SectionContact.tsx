"use client";

import Container from "@/app/components/Container";
import { Header } from "@/app/components/Header";
import { TypographyBody, TypographyH3 } from "@/app/components/Typography";
import Image from "next/image";
import CircleProgress from "./CircleProgress";
import { HiOutlineCheck } from "react-icons/hi";
import Button from "@/app/components/Button";
import { IoCopyOutline } from "react-icons/io5";
import FirmMap from "./GoogleMap";
import { ContactData, NavbarData } from "@/type/acf";
import GoogleRatingCard from "./GoogleRatingCard";

interface SectionContactProps {
  data: ContactData;
  contactHref: NavbarData;
}

export function SectionContact({ data, contactHref }: SectionContactProps) {
  const points = [
    { bold: data.point1_bold, normal: data.point1_normal },
    { bold: data.point2_bold, normal: data.point2_normal },
    { bold: data.point3_bold, normal: data.point3_normal },
    { bold: data.point4_bold, normal: data.point4_normal },
  ];

  const { emailAddress, navbar_phone_href, navbar_phone } = contactHref;

  return (
    <Container>
      <section className="py-12 h-full lg:h-[882px]">
        <div className="flex flex-col-reverse md:flex-row justify-center items-start gap-8 shrink-0 grow">
          <div className="flex justify-center items-center gap-2 grow md:max-w-[498px] h-[422px] md:h-auto lg:h-[644px] self-stretch bg-gray-200 rounded-lg border border-gray-200 overflow-hidden">
            <FirmMap />
          </div>

          <div className="flex flex-col grow shrink-0 basis-0 justify-between md:items-start self-stretch border border-gray-300 rounded-lg py-8 px-6">
            {/* Nagłówek sekcji */}
            <div className="flex flex-col lg:flex-row justify-end items-center md:items-start self-stretch py-4 lg:py-0 gap-4">
              <div className="flex flex-col items-center md:items-start gap-3 grow">
                <div className="flex flex-col items-center md:items-start gap-2 self-stretch w-[250px]">
                  <TypographyBody className="text-gray-900 text-xs uppercase font-bold">
                    {data.label}
                  </TypographyBody>
                  <Header noPaddingX noPaddingY left title={data.title} />
                </div>
              </div>
              <div className="block md:hidden lg:block">
                <GoogleRatingCard rating={4.7} />
              </div>
            </div>

            {/* Punkty i licznik klientów */}
            <div className="flex flex-col py-4 items-center md:items-start gap-6 self-stretch border-y border-gray-300">
              <div className="flex items-center gap-4 w-72">
                <div className="flex items-center justify-center w-24 h-24 relative">
                  <CircleProgress percentage={95} duration={1} />
                </div>
                <TypographyH3>{data.clientsTitle}</TypographyH3>
              </div>

              <div className="flex flex-col lg:flex-row items-center md:items-start gap-4 lg:gap-8 self-stretch text-center md:text-left">
                {[points.slice(0, 2), points.slice(2, 4)].map((col, i) => (
                  <div
                    key={i}
                    className="flex flex-col justify-center items-start gap-4 grow shrink basis-0"
                  >
                    {col.map((p, idx) => (
                      <div
                        key={idx}
                        className="flex justify-center md:justify-start items-center self-stretch gap-2"
                      >
                        <HiOutlineCheck className="h-6 w-6 shrink-0 opacity-0 md:opacity-100" />
                        <TypographyBody className="text-gray-900 text-sm">
                          <span className="font-bold">{p.bold} </span>
                          {p.normal}
                        </TypographyBody>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Telefon i mail */}
            <div className="flex flex-col lg:flex-row items-center md:items-start gap-8 self-stretch py-4 lg:py-0">
              <div className="flex flex-col items-center md:items-start gap-4 grow">
                <div className="flex items-start gap-2 slef-center md:self-stretch">
                  <Image
                    src="/svg/phone-call.svg"
                    alt="Phone icon"
                    width={24}
                    height={24}
                    priority
                  />
                  <TypographyH3>{data.phoneTitle}</TypographyH3>
                </div>
                <div className="pl-0 md:pl-8">
                  <Button
                    label={navbar_phone}
                    onClick={() => {
                      window.location.href = `tel:${navbar_phone_href}`;
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col items-center md:items-start gap-4 grow">
                <div className="flex items-start gap-2 slef-center md:self-stretch">
                  <Image
                    src="/svg/mail.svg"
                    alt="Mail icon"
                    width={24}
                    height={24}
                    priority
                  />
                  <TypographyH3>{data.emailTitle}</TypographyH3>
                </div>
                <div className="pl-0 md:pl-8">
                  <Button
                    variant="outlineSecondary"
                    label={emailAddress}
                    onClick={() => {
                      window.location.href = `mailto:${emailAddress}`;
                    }}
                    icon={IoCopyOutline}
                  />
                </div>
              </div>
            </div>

            <div className="pl-0 md:pl-8 text-center">
              <TypographyBody>{data.openingHours}</TypographyBody>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
