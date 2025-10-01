// PaginationDots.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
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

  // NOWE: pauza z zewnątrz (np. gdy sekcja jest poza viewportem)
  paused?: boolean; // domyślnie false
}

export default function PaginationDots({
  maxDots = 3,
  current = 0,
  withCounter = false,
  onChange,
  auto = false,
  intervalMs = 5000,
  pauseOnHover = true,
  paused = false,
}: PaginationDotsProps) {
  const dots = Array.from({ length: maxDots }, (_, i) => i);
  const [hovered, setHovered] = useState(false);

  // progress aktywnej kropki (0..1)
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);

  // refs do animacji
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(performance.now());

  // reset progresu przy zmianie current/auto/interval
  useEffect(() => {
    setProgress(0);
    progressRef.current = 0;
    startRef.current = performance.now();
  }, [current, auto, intervalMs]);

  // Główna pętla (uwzględnia hover i zewnętrzną pauzę)
  useEffect(() => {
    const shouldRun =
      auto && maxDots > 1 && !(pauseOnHover && hovered) && !paused;

    if (!shouldRun) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      return;
    }

    // WZNOWIENIE BEZ SKOKU — kontynuujemy od `progressRef.current`
    startRef.current = performance.now() - progressRef.current * intervalMs;

    const tick = (t: number) => {
      const elapsed = t - startRef.current;
      const p = Math.min(1, elapsed / intervalMs);
      setProgress(p);
      progressRef.current = p;

      if (p >= 1) {
        const next = (current + 1) % maxDots;
        // przygotuj start na kolejny cykl
        setProgress(0);
        progressRef.current = 0;
        startRef.current = performance.now();
        onChange?.(next);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [
    auto,
    hovered,
    pauseOnHover,
    paused,
    intervalMs,
    maxDots,
    current,
    onChange,
  ]);

  // pauza/wznowienie po najechaniu (bez skoku)
  const onEnter = () => {
    if (!pauseOnHover) return;
    setHovered(true);
  };
  const onLeave = () => {
    if (!pauseOnHover) return;
    startRef.current = performance.now() - progressRef.current * intervalMs;
    setHovered(false);
  };

  const handleClick = (index: number) => {
    if (index === current) return;
    onChange?.(index);
  };

  const Dots = (
    <div
      className="flex justify-center items-center gap-4"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {dots.map((_, index) => {
        const isActive = index === current;
        return (
          <button
            key={index}
            onClick={() => handleClick(index)}
            aria-label={`Pokaż stronę ${index + 1}`}
            className={[
              "group relative h-3 rounded-full overflow-hidden cursor-pointer",
              // szerokość + tło toru
              isActive
                ? "w-9 bg-gray-300/70"
                : "w-3 bg-gray-300 hover:bg-gray-400",
              // podrasowany hover (ring + lekkie powiększenie), żeby “było czuć”
              "transition-[background-color,transform] duration-200",
              "hover:scale-[1.05]",
              isActive ? "ring-1 ring-white/60 hover:ring-white" : "",
            ].join(" ")}
          >
            {/* progress bar tylko na aktywnej kropce */}
            {isActive && (
              <div
                // bez CSS transition na width — sterujemy płynnie z RAF
                style={{ width: `${progress * 100}%` }}
                className="absolute left-0 top-0 h-full bg-gray-700"
              />
            )}
          </button>
        );
      })}
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
