"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { TypographyBody } from "./Typography";

interface PaginationDotsProps {
  maxDots?: number;
  withCounter?: boolean;
}

export default function PaginationDots({
  maxDots = 3,
  withCounter = false,
}: PaginationDotsProps) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const dots = Array.from({ length: maxDots }, (_, i) => i);

  // Aktualizujemy kierunek przy kliknięciu
  const handleClick = (index: number) => {
    if (index === active) return;
    setDirection(index > active ? 1 : -1);
    setActive(index);
  };

  const Dots = (
    <div className="flex justify-center gap-4">
      {dots.map((_, index) => (
        <button
          key={index}
          onClick={() => handleClick(index)}
          aria-label={`Pokaż zdjęcie ${index + 1}`}
          className={`w-3 h-3 rounded-full transition-colors
            ${active === index ? "bg-gray-900" : "bg-gray-300"}
            hover:bg-gray-600 cursor-pointer duration-300`}
        />
      ))}
    </div>
  );

  if (!withCounter) return Dots;

  return (
    <div className="w-[603px] flex justify-center items-center gap-32">
      {Dots}
      <div className="flex gap-4 overflow-hidden h-[24px] relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ y: 20 * direction, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <TypographyBody className="font-bold">{active + 1}</TypographyBody>
          </motion.div>
        </AnimatePresence>
        <TypographyBody>/</TypographyBody>
        <TypographyBody>{maxDots}</TypographyBody>
      </div>
    </div>
  );
}
