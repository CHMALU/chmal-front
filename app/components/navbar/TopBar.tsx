"use client";

import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import Container from "@/app/components/Container";
import { TypographyBody } from "../Typography";
import { ButtonSettings } from "@/type/acf";

interface TopBarProps {
  buttonSettings: ButtonSettings;
  navbar_text: string;
}

export default function TopBar({ buttonSettings }: TopBarProps) {
  const { buttonText, buttonLink } = buttonSettings;

  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="bg-brand-secondary-600">
      <Container>
        <div className="flex flex-col">
          <div className="flex self-stretch justify-between items-center py-1 gap-3">
            <div className="flex items-center gap-6">
              <TypographyBody className="text-gray-50 text-sm">
                Potrzebujesz wymiany opon?
              </TypographyBody>
              <a href={buttonLink} target="_blank" rel="noopener noreferrer">
                <TypographyBody className="text-gray-50 text-sm font-bold underline cursor-pointer">
                  {buttonText}
                </TypographyBody>
              </a>
            </div>

            <button
              onClick={() => setIsVisible(false)}
              aria-label="Zamknij pasek"
              className="cursor-pointer transition text-gray-50 hover:text-gray-400"
            >
              <IoIosClose size={24} />
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}
