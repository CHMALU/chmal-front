"use client";

import { TypographyBody, TypographyH3 } from "@/app/components/Typography";
import Image from "next/image";
import { useState } from "react";

interface FaqAccordionProps {
  question: string;
  answer: string;
}

export function FaqAccordion({ question, answer }: FaqAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-start self-stretch border-t-[1px] border-gray-300">
      <button
        type="button"
        className={`flex items-center justify-between self-stretch cursor-pointer pt-6 px-6 transition-all transition-500 ${
          isOpen ? "pb-4" : "pb-6"
        }`}
        onClick={() => setIsOpen((o) => !o)}
        aria-expanded={isOpen}
      >
        <TypographyH3>{question}</TypographyH3>
        <div
          className={`flex shrink-0 w-12 h-12 p-3 items-center justify-center transform transition duration-300 ease-in-out ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <Image
            src="/svg/chevron-down.svg"
            alt="Chevron up"
            width={24}
            height={24}
            priority
          />
        </div>
      </button>
      <div
        className={` overflow-hidden transition-all duration-500 ease-in-out px-6 ${
          isOpen ? "max-h-96 opacity-100 pb-6 " : "max-h-0 opacity-0 "
        }`}
      >
        <TypographyBody>{answer}</TypographyBody>
      </div>
    </div>
  );
}
