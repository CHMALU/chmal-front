"use client";

import { TypographyBody, TypographyH3 } from "@/app/components/Typography";
import Image from "next/image";
import { useId, useState } from "react";

interface FaqAccordionProps {
  question: string;
  answer: string;
}

export function FaqAccordion({ question, answer }: FaqAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = useId();

  return (
    <div className="flex flex-col items-start self-stretch border-t border-gray-300">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        className={`flex items-center justify-between self-stretch cursor-pointer pt-6 px-6 transition-all duration-200 ease-out hover:bg-gray-50 ${
          isOpen ? "pb-4" : "pb-6"
        }`}
        onClick={() => setIsOpen((o) => !o)}
      >
        <TypographyH3 className="transition-colors hover:text-brand-primary">
          {question}
        </TypographyH3>
        <div
          className={`flex shrink-0 w-12 h-12 p-3 items-center justify-center transform transition duration-300 ease-in-out ${
            isOpen ? "rotate-180" : "hover:-translate-y-0.5"
          }`}
        >
          <Image
            src="/svg/chevron-down.svg"
            alt="Chevron icon"
            width={24}
            height={24}
            priority
          />
        </div>
      </button>

      <div
        id={contentId}
        className={`grid transition-all duration-300 ease-in-out px-6 ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 pb-6"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <TypographyBody>{answer}</TypographyBody>
        </div>
      </div>
    </div>
  );
}
