"use client";

import Link from "next/link";
import Container from "../../Container";
import Image from "next/image";
import { TypographyBody } from "../../Typography";
import Button from "../../Button";
import { ButtonSettings, NavbarData } from "@/type/acf";
import { Phone } from "../Phone";
import { AnimatedMenuIcon } from "./AnimatedMenuIcon";

interface MainBarProps {
  navbar: NavbarData;
  buttonSettings: ButtonSettings;
  onToggleMenu: () => void;
  menuOpen: boolean;
}

export function MainBar({
  navbar,
  buttonSettings,
  onToggleMenu,
  menuOpen,
}: MainBarProps) {
  const { navbar_logo } = navbar;
  const { url: imageUrl, alt: imageAlt } = navbar_logo;
  const { buttonText, buttonLink } = buttonSettings;

  return (
    <div className="bg-brand-secondary-500">
      <Container>
        <div className="flex justify-between items-center gap-12 pb-1 sm:pb-3 mt-1 sm:mt-2 h-[66px] ">
          <div className="flex gap-4 shrink-0 items-center">
            <Link href="/" className="cursor-pointer">
              <Image
                src={imageUrl}
                alt={imageAlt ?? "Chmal Logo"}
                width={174}
                height={45}
                priority={true}
              />
            </Link>
            <div className="hidden sm:block">
              <Phone navbar={navbar} />
            </div>
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
              href="/cennik"
            />
            <Button label={buttonText} href={buttonLink} />
          </nav>

          {/* Ikona hamburgera */}
          <div
            className="flex flex-col sm:hidden self-stretch justify-between items-center gap-1 py-1 cursor-pointer"
            onClick={onToggleMenu}
          >
            <AnimatedMenuIcon open={menuOpen} className="text-white" />
            <TypographyBody className="text-gray-200 text-xs">
              MENU
            </TypographyBody>
          </div>
        </div>
      </Container>
    </div>
  );
}
