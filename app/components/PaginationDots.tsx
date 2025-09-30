"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface PaginationDotsProps {
  maxDots?: number;
  current?: number; // kontrolowany index
  withCounter?: boolean;
  onChange?: (index: number) => void;

  // auto-slide
  auto?: boolean; // włącz/wyłącz auto-przewijanie
  intervalMs?: number; // domyślnie 5000 ms
  pauseOnHover?: boolean; // domyślnie true
}

export default function PaginationDots({
  maxDots = 3,
  current = 0,
  withCounter = false,
  onChange,
  auto = false,
  intervalMs = 5000,
  pauseOnHover = true,
}: PaginationDotsProps) {
  const dots = Array.from({ length: maxDots }, (_, i) => i);
  const [hovered, setHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // AUTO-SLIDE: restartuje się za każdym razem, gdy zmienia się `current`
  useEffect(() => {
    if (!auto || maxDots <= 1) return;
    if (pauseOnHover && hovered) return;

    // wyczyść poprzedni interwał
    if (timerRef.current) clearInterval(timerRef.current);

    // ustaw nowy interwał – korzysta z aktualnego `current` (efekt zależy od `current`)
    timerRef.current = setInterval(() => {
      const next = (current + 1) % maxDots;
      onChange?.(next);
    }, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [auto, intervalMs, current, maxDots, hovered, pauseOnHover, onChange]);

  const handleClick = (index: number) => {
    if (index === current) return;
    // kliknięcie zmienia `current` → efekt wyżej się wykona ponownie i zresetuje timer
    onChange?.(index);
  };

  const Dots = (
    <div
      className="flex justify-center gap-4"
      onMouseEnter={() => pauseOnHover && setHovered(true)}
      onMouseLeave={() => pauseOnHover && setHovered(false)}
    >
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
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
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
