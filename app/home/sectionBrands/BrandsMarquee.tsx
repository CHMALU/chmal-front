"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Brand = {
  id: number;
  title: string;
  logo?: { url?: string; alt?: string };
  link?: string;
};

export default function BrandsMarqueeAuto({
  brands,
  gap = 24,
  speed = 0.6,
}: {
  brands: Brand[];
  gap?: number;
  speed?: number;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const rafId = useRef<number | null>(null);

  // drag
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const startLeft = useRef(0);

  // FIX 1: Flaga sprawdzająca, czy faktycznie nastąpiło przesunięcie
  const hasMoved = useRef(false);

  // auto-pauza
  const paused = useRef(false);

  const loop = () => {
    if (paused.current || !containerRef.current || !trackRef.current) {
      rafId.current = requestAnimationFrame(loop);
      return;
    }
    // Jeśli trzymamy myszkę (dragging), nie przesuwamy automatycznie
    if (!dragging) {
      const el = containerRef.current;
      el.scrollLeft += speed;

      const half = trackRef.current.scrollWidth / 2;
      if (el.scrollLeft >= half) el.scrollLeft = el.scrollLeft - half;
    }

    rafId.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    paused.current = prefersReduced;

    rafId.current = requestAnimationFrame(loop);

    const onVis = () => {
      paused.current = document.hidden || prefersReduced;
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      document.removeEventListener("visibilitychange", onVis);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speed, dragging]); // Dodano dragging do zależności, choć refy by wystarczyły, tu bezpieczniej dla loopa

  // sterowanie myszą
  const onMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setDragging(true);
    hasMoved.current = false; // Reset flagi ruchu
    paused.current = true;
    startX.current = e.pageX - containerRef.current.offsetLeft;
    startLeft.current = containerRef.current.scrollLeft;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = x - startX.current;

    // FIX 1 cd: Jeśli przesunięcie > 5px, uznajemy to za drag, a nie kliknięcie
    if (Math.abs(walk) > 5) {
      hasMoved.current = true;
    }

    containerRef.current.scrollLeft = startLeft.current - walk;
  };

  const onMouseUpLeave = () => {
    setDragging(false);
    paused.current = false;
    // Nie resetujemy hasMoved tutaj, jest potrzebne w onClick
  };

  // sterowanie dotykiem
  const onTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    paused.current = true;
    setDragging(true);
    hasMoved.current = false; // Reset flagi
    startX.current = e.touches[0].clientX - containerRef.current.offsetLeft;
    startLeft.current = containerRef.current.scrollLeft;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!dragging || !containerRef.current) return;
    const x = e.touches[0].clientX - containerRef.current.offsetLeft;
    const walk = x - startX.current;

    if (Math.abs(walk) > 5) {
      hasMoved.current = true;
    }

    containerRef.current.scrollLeft = startLeft.current - walk;
  };

  const onTouchEnd = () => {
    setDragging(false);
    paused.current = false;
  };

  // Funkcja blokująca kliknięcie linku, jeśli był drag
  const handleLinkClick = (e: React.MouseEvent) => {
    if (hasMoved.current) {
      e.preventDefault(); // Blokuje przejście
      e.stopPropagation();
    }
  };

  const doubled = [...brands, ...brands];

  return (
    <div className="sm:hidden relative -mx-4 px-4 mb-4">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-10 z-10"
      >
        <div className="h-full w-full bg-gradient-to-r from-white to-transparent" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-10 z-10"
      >
        <div className="h-full w-full bg-gradient-to-l from-white to-transparent" />
      </div>

      <div
        ref={containerRef}
        className={`overflow-hidden ${
          dragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUpLeave}
        onMouseLeave={onMouseUpLeave}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          ref={trackRef}
          className="flex select-none items-center"
          style={{ gap: `${gap}px` }}
        >
          {doubled.map((b, i) => (
            <a
              key={`${b.id}-${i}`}
              href={b.link}
              onClick={handleLinkClick} // FIX 2: Podpięcie blokady
              target="_blank"
              rel="noopener noreferrer"
              title={b.title}
              // FIX 3: draggable="false" na linku też pomaga w niektórych przeglądarkach
              draggable="false"
              className="relative w-[128px] h-[36px] shrink-0 rounded-lg overflow-hidden flex items-center justify-center bg-brand-secondary-500/20 transition-transform duration-300 ease-out select-none"
              aria-label={b.title}
            >
              {b.logo?.url ? (
                <Image
                  src={b.logo.url}
                  alt={b.logo.alt || b.title}
                  width={128}
                  height={36}
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  className="w-full h-full object-fill pointer-events-none"
                  sizes="128px"
                />
              ) : (
                <div className="bg-gray-200 w-full h-full" />
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
