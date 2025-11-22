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
  gap = 24, // px przerwy między kaflami
  speed = 0.6, // px per frame @60Hz ~36px/s
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

  // auto-pauza
  const paused = useRef(false);

  // pętla animacji
  const loop = () => {
    if (paused.current || !containerRef.current || !trackRef.current) {
      rafId.current = requestAnimationFrame(loop);
      return;
    }
    const el = containerRef.current;
    el.scrollLeft += speed;

    // reset po połowie szerokości toru (bo duplikujemy listę)
    const half = trackRef.current.scrollWidth / 2;
    if (el.scrollLeft >= half) el.scrollLeft = el.scrollLeft - half;

    rafId.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    paused.current = prefersReduced;

    // start
    rafId.current = requestAnimationFrame(loop);

    // pauzuj, gdy zakładka niewidoczna
    const onVis = () => {
      paused.current = document.hidden || prefersReduced;
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      document.removeEventListener("visibilitychange", onVis);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speed]);

  // sterowanie myszą
  const onMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setDragging(true);
    paused.current = true;
    startX.current = e.pageX - containerRef.current.offsetLeft;
    startLeft.current = containerRef.current.scrollLeft;
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = x - startX.current;
    containerRef.current.scrollLeft = startLeft.current - walk;
  };
  const onMouseUpLeave = () => {
    setDragging(false);
    paused.current = false;
  };

  // sterowanie dotykiem
  const onTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    paused.current = true;
    setDragging(true);
    startX.current = e.touches[0].clientX - containerRef.current.offsetLeft;
    startLeft.current = containerRef.current.scrollLeft;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!dragging || !containerRef.current) return;
    const x = e.touches[0].clientX - containerRef.current.offsetLeft;
    const walk = x - startX.current;
    containerRef.current.scrollLeft = startLeft.current - walk;
  };
  const onTouchEnd = () => {
    setDragging(false);
    paused.current = false;
  };

  // duplikat dla bezszwowej pętli
  const doubled = [...brands, ...brands];

  return (
    <div className="sm:hidden relative -mx-4 px-4 mb-4">
      {/* „cienie” po bokach */}
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
        className="overflow-hidden cursor-grab active:cursor-grabbing"
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
              target="_blank"
              rel="noopener noreferrer"
              title={b.title}
              className="relative w-[128px] h-[36px] shrink-0 rounded-lg overflow-hidden flex items-center justify-center bg-brand-secondary-500/20 transition-transform duration-300 ease-out"
              aria-label={b.title}
            >
              {b.logo?.url ? (
                <Image
                  src={b.logo.url}
                  alt={b.logo.alt || b.title}
                  width={128}
                  height={36}
                  className="w-full h-full object-fill"
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
