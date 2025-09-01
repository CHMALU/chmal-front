"use client";

import Link from "next/link";
import Container from "../Container";
import Image from "next/image";
import { TypographyBody } from "../Typography";
import Button from "../Button";
import { ButtonSettings, NavbarData } from "@/type/acf";
import { Phone } from "./Phone";

interface MainNavProps {
  navbar: NavbarData;
  buttonSettings: ButtonSettings;
}

export function MainNav({ navbar, buttonSettings }: MainNavProps) {
  const { navbar_logo } = navbar;

  const { url: imageUrl, alt: imageAlt } = navbar_logo;

  const { buttonText, buttonLink } = buttonSettings;

  return (
    <div className="bg-brand-secondary-500 py-2 ">
      <Container>
        <div className="flex justify-between items-center gap-12">
          <div className="flex gap-4 shrink-0 items-center">
            <Link className=" cursor-pointer" href="/">
              <Image
                src={imageUrl}
                alt={imageAlt ?? "Chmal Logo"}
                width={174}
                height={45}
                priority={true}
              />
            </Link>
            <Phone navbar={navbar} />
          </div>
          <nav className="hidden lg:flex items-center gap-2">
            <div className="flex items-center gap-3">
              <Link href="/blog">
                <div className="flex p-3 cursor-pointer">
                  <TypographyBody className="text-gray-200 hover:text-brand-primary-500 text-sm">
                    BLOG
                  </TypographyBody>
                </div>
              </Link>
              <Link href="/o-firmie">
                <div className="flex p-3 cursor-pointer">
                  <TypographyBody className="text-gray-200 hover:text-brand-primary-500 text-sm">
                    O FIRMIE
                  </TypographyBody>
                </div>
              </Link>

              <Link href="/kontakt">
                <div className="flex p-3 cursor-pointer">
                  <TypographyBody className="text-gray-200 hover:text-brand-primary-500 text-sm">
                    KONTAKT
                  </TypographyBody>
                </div>
              </Link>
            </div>

            <Button
              variant="outlinePrimary"
              label="Cennik Usług"
              href="/uslugi"
            />
            <Button label={buttonText} href={buttonLink} />
          </nav>
          <div className="flex flex-col sm:hidden self-stretch w-16 px-8 justify-center items-center gap-[6px] cursor-pointer">
            <div className="flex flex-col items-center pt-1 gap-1 w-6 ">
              <span className="block h-[2px] w-full bg-white rounded"></span>
              <span className="block h-[2px] w-full bg-white rounded"></span>
              <span className="block h-[2px] w-full bg-white rounded"></span>
            </div>
            <TypographyBody className=" text-white font-medium text-xs">
              Menu
            </TypographyBody>
          </div>
        </div>
      </Container>
    </div>
  );
}
