"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface PaginationDotsProps {
  maxDots?: number;
  withCounter?: boolean;
  onChange?: (index: number) => void;
}

export default function PaginationDots({
  maxDots = 3,
  withCounter = false,
  onChange,
}: PaginationDotsProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleClick = (index: number) => {
    if (index === current) return;
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
    onChange?.(index);
  };

  const dots = Array.from({ length: maxDots }, (_, i) => i);

  const Dots = (
    <div className="flex justify-center gap-4">
      {dots.map((_, index) => (
        <button
          key={index}
          onClick={() => handleClick(index)}
          aria-label={`Pokaż stronę ${index + 1}`}
          className={`w-3 h-3 rounded-full transition-colors ${
            current === index ? "bg-gray-900" : "bg-gray-300"
          } hover:bg-gray-600 cursor-pointer duration-300`}
        />
      ))}
    </div>
  );

  if (!withCounter) return Dots;

  return (
    <div className="w-full md:w-[603px] flex justify-center items-center gap-12 md:gap-32">
      {Dots}
      <div className="flex gap-4 overflow-hidden h-[24px] relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ y: 20 * direction, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {current + 1}
          </motion.div>
        </AnimatePresence>
        <span>/</span>
        <span>{maxDots}</span>
      </div>
    </div>
  );
}
