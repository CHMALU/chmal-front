"use client";

import Container from "../Container";
import Image from "next/image";
import { TypographyBody, TypographyH3 } from "../Typography";
import StarRating from "../Star";
import { normalizePhone } from "@/app/libs/contactUtils";
import FooterColumns from "./FooterColumns";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface FooterProps {}

export function Footer({}: FooterProps) {
  const rawPhone = "+48 68-479.22(22)";
  const { phoneHref, phoneDisplay } = normalizePhone(rawPhone);

  return (
    <footer className=" py-16 bg-brand-secondary-500">
      <Container>
        <div className="dark-selection flex flex-col items-start gap-6">
          <div className="flex justify-between items-start self-stretch">
            <div className="flex flex-col w-[392px] gap-3 items-start">
              <Image
                src="/images/Logo.png"
                alt="Logo Premio"
                height={60}
                width={200}
                priority={true}
              />
              <TypographyBody className="text-gray-400">
                Profesjonalna wymiana opon i serwis – Twoje bezpieczeństwo na
                drodze.
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

          <div className="flex justify-between items-start self-stretch">
            <div className="flex flex-col items-start gap-3">
              <div className="flex flex-col h-16 items-start">
                <TypographyBody className="text-gray-300 text-xs uppercase font-bold">
                  Kontakt
                </TypographyBody>
                <TypographyH3 variant="secondary">Premio Chmal</TypographyH3>
              </div>

              <address className="not-italic flex flex-col">
                <TypographyBody className="text-gray-400 text-sm">
                  CHMAL Sp.j
                </TypographyBody>
                <TypographyBody className="text-gray-400 text-sm">
                  ul. Gospodarcza 11,
                </TypographyBody>
                <TypographyBody className="text-gray-400 text-sm">
                  68-200 Żary
                </TypographyBody>
                <TypographyBody className="text-gray-400 text-sm">
                  NIP: 925000000
                </TypographyBody>
                <TypographyBody className="text-gray-400 text-sm">
                  REGON: 928371000
                </TypographyBody>
              </address>

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
                href={phoneHref}
                className=" group flex py-2 pr-3 justify-center items-center gap-3"
              >
                <Image
                  src="/svg/phone-yellow.svg"
                  alt="Phone"
                  width={24}
                  height={24}
                />
                <TypographyBody className="text-gray-50 font-bold group-hover:text-gray-300 transition">
                  {phoneDisplay}
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
                  b2b@chmal.pl
                </TypographyBody>
              </a>
            </div>

            <FooterColumns />
          </div>

          <div className="self-stretch h-[1px] bg-gray-700"></div>

          <div className="flex self-stretch gap-2 items-center justify-center flex-wrap">
            <TypographyBody className="text-gray-400 text-center">
              Copyright © 2025 Hurtowania Ogómienia i Szyb Chmal | All Rights
              Reserved
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
