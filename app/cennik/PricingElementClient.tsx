"use client";

import { useState } from "react";
import { ButtonSettings, VariantACF } from "@/type/acf";
import Container from "../components/Container";
import { TypographyBody, TypographyH3 } from "../components/Typography";
import Button from "../components/Button";
import { TbCashRegister } from "react-icons/tb";
import { formatPrice } from "../libs/formaters";
import { FaChevronDown } from "react-icons/fa";

interface PricingElementClientProps {
  name: string;
  buttonSettings: ButtonSettings;
  variants: VariantACF[];
  defaultState?: boolean;
}

export default function PricingElementClient({
  name,
  buttonSettings,
  variants,
  defaultState = false,
}: PricingElementClientProps) {
  const { buttonText, buttonLink } = buttonSettings;
  const [isOpen, setIsOpen] = useState(defaultState);

  return (
    <section>
      <Container>
        <div className="flex flex-col justify-center">
          {/* Klikany header */}
          <div
            className="flex py-4 px-6 items-center gap-4 cursor-pointer border-b border-gray-900"
            onClick={() => setIsOpen((o) => !o)}
          >
            <div className="flex items-center gap-3 grow">
              {/* Ikona toggle */}
              <div className="relative w-6 h-6">
                {/* ChevronDown przy closed */}
                <FaChevronDown
                  className={`absolute inset-0 text-gray-900 transform transition-all duration-300 ${
                    isOpen
                      ? "opacity-0 rotate-180 scale-75"
                      : "opacity-100 rotate-0 scale-75"
                  }`}
                  size={24}
                  aria-hidden="true"
                />
                <TbCashRegister
                  className={`absolute inset-0 text-gray-900 transform transition-all duration-300 ${
                    isOpen
                      ? "opacity-100 rotate-0 scale-100"
                      : "opacity-0 -rotate-90 scale-75"
                  }`}
                  size={24}
                  aria-hidden="true"
                />
              </div>

              <TypographyH3>{name}</TypographyH3>
            </div>

            <div className="hidden sm:block">
              <Button href={buttonLink} label={buttonText} />
            </div>
          </div>

          {/* Rozwijane warianty (grid trick) */}
          <div
            className={`grid transition-all duration-300 ease-in-out ${
              isOpen
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              {variants.map((v, idx) => (
                <div
                  key={idx}
                  className="pl-0 sm:pl-10 flex items-center gap-2 border-gray-900 border-t"
                >
                  <div className="flex flex-col items-start justify-center gap-4 py-6 px-4 sm:p-6 grow self-stretch">
                    <TypographyH3>{v.title}</TypographyH3>
                    <TypographyBody className="text-gray-700">
                      {v.subtitle}
                    </TypographyBody>
                  </div>
                  <div className="flex flex-col items-end justify-center py-6 mr-4 sm:mr-0 sm:p-6 gap-2 sm:gap-4 shrink-0 self-stretch">
                    <div className="flex h-12 items-center self-stretch">
                      <TypographyH3>{formatPrice(v.price)} zł</TypographyH3>
                    </div>
                    <TypographyBody className="text-gray-700">
                      {v.time} minut
                    </TypographyBody>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
