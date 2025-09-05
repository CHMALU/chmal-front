"use client";

import Container from "../Container";
import Image from "next/image";
import { TypographyBody, TypographyH3 } from "../Typography";
import StarRating from "../Star";
import FooterColumns from "./FooterColumns";
import { FooterData, NavbarData, CatalogItem } from "@/type/acf";

interface FooterProps {
  uslugi: CatalogItem[];
  produkty: CatalogItem[];
  navbar: NavbarData;
  footer: FooterData;
}

export function Footer({ footer, navbar, uslugi, produkty }: FooterProps) {
  const {
    footer_text_under_logo,
    footer_title,
    footer_contact_text,
    footer_copyright_text,
  } = footer;

  const { navbar_phone, navbar_phone_href, emailAddress, navbar_logo } = navbar;
  const { url: imageUrl, alt: imageAlt } = navbar_logo;

  return (
    <footer className=" py-16 bg-brand-secondary-500">
      <Container>
        <div className="dark-selection flex flex-col items-start gap-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:gap-0 gap-6 justify-between items-center  self-stretch">
            <div className="flex flex-col max-w-[392px] gap-3 items-center text-center sm:text-start sm:items-start">
              <Image
                src={imageUrl}
                alt={imageAlt ?? "Chmal Logo"}
                height={60}
                width={200}
                priority={true}
              />
              <TypographyBody className="text-gray-400">
                {footer_text_under_logo}
              </TypographyBody>
            </div>
            <div className="flex p-4 items-center gap-2 bg-white/10 rounded-lg custom-shadow">
              <div className="flex flex-col items-center">
                <TypographyBody className="text-white text-center text-5xl font-extrabold plus-jakarta">
                  4.7
                </TypographyBody>
                <div className="flex">
                  <StarRating rating={4.6} size={21} />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <Image
                  src="/svg/google-logo.svg"
                  alt="Google logo"
                  width={36}
                  height={36}
                  priority
                />
                <TypographyBody className="text-gray-50 text-center text-lg font-bold plus-jakarta">
                  Google
                </TypographyBody>
                <TypographyBody className="text-gray-50  plus-jakarta text-[9px]">
                  average rating
                </TypographyBody>
              </div>
            </div>
          </div>

          <div className="self-stretch h-[1px] bg-gray-700"></div>

          <div className="flex flex-col items-center justify-between text-center self-stretch gap-12 md:flex-row md:items-start md:gap-0 md:text-start">
            <div className="flex flex-col sm:items-start items-center gap-3 self-stretch justify-between">
              <div className="flex flex-col sm:items-start items-center gap-3">
                <div className="flex flex-col h-16 md:items-start items-center">
                  <TypographyBody className="text-gray-300 text-xs uppercase font-bold">
                    Kontakt
                  </TypographyBody>
                  <TypographyH3 variant="secondary">
                    {footer_title}
                  </TypographyH3>
                </div>

                <address className="not-italic flex flex-col">
                  {footer_contact_text
                    ?.split("\n")
                    .filter((line) => line.trim() !== "")
                    .map((line, idx) => (
                      <TypographyBody
                        key={idx}
                        className="text-gray-400 text-sm"
                      >
                        {line}
                      </TypographyBody>
                    ))}
                </address>
              </div>

              <div className="flex flex-col sm:items-start items-center gap-3">
                <a
                  href="https://www.facebook.com/premiochmal/?locale=pl_PL"
                  className=" group flex py-2 pr-3 justify-center items-center gap-3"
                >
                  <Image
                    src="/svg/facebook-yellow.svg"
                    alt="Facebook"
                    width={24}
                    height={24}
                  />
                  <TypographyBody className="text-gray-50 font-bold group-hover:text-gray-300 transition">
                    Facebook
                  </TypographyBody>
                </a>

                <a
                  href={`tel:${navbar_phone_href}`}
                  target="_self"
                  className="group flex py-2 pr-3 justify-center items-center gap-3"
                >
                  <Image
                    src="/svg/phone-yellow.svg"
                    alt="Phone"
                    width={24}
                    height={24}
                  />
                  <TypographyBody className="text-gray-50 font-bold group-hover:text-gray-300 transition">
                    {navbar_phone}
                  </TypographyBody>
                </a>

                <a
                  href="mailto:b2b@chmal.pl"
                  className=" group flex py-2 pr-3 justify-center items-center gap-3"
                >
                  <Image
                    src="/svg/mail-yellow.svg"
                    alt="Email"
                    width={24}
                    height={24}
                  />
                  <TypographyBody className="text-gray-50 font-bold group-hover:text-gray-300 transition">
                    {emailAddress}
                  </TypographyBody>
                </a>
              </div>
            </div>

            <FooterColumns uslugi={uslugi} produkty={produkty} />
          </div>

          <div className="self-stretch h-[1px] bg-gray-700"></div>

          <div className="flex self-stretch gap-2 items-center justify-center flex-wrap">
            <TypographyBody className="text-gray-400 text-center">
              Copyright © {new Date().getFullYear()} {footer_copyright_text} |
              All Rights Reserved
            </TypographyBody>
            <TypographyBody className="text-gray-400">|</TypographyBody>
            <TypographyBody className="text-gray-50 cursor-pointer hover:text-gray-300">
              Terms and Conditions
            </TypographyBody>
            <TypographyBody className="text-gray-400">|</TypographyBody>
            <TypographyBody className="text-gray-50 cursor-pointer hover:text-gray-300">
              Privacy Policy
            </TypographyBody>
          </div>
        </div>
      </Container>
    </footer>
  );
}
