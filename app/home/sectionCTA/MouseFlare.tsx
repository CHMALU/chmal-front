"use client";
import { useEffect, useRef, useState } from "react";

type ReadableRef<T extends Element = HTMLElement> = {
  readonly current: T | null;
};

type MouseFlareProps = {
  trackRef: ReadableRef;
  size?: number;
  smoothing?: number;
  className?: string;
};

export function MouseFlare({
  trackRef,
  size = 320,
  smoothing = 0.12,
  className = "",
}: MouseFlareProps) {
  const [visible, setVisible] = useState(false);

  // Refs dla pozycji
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  const raf = useRef<number | null>(null);
  const elRef = useRef<HTMLDivElement | null>(null); // To będzie nasz wrapper

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      target.current.x = e.clientX - r.left - size / 2;
      target.current.y = e.clientY - r.top - size / 2;
    };

    const enter = (e: MouseEvent) => {
      // FIX 1: Natychmiastowa teleportacja do kursora przy wejściu.
      // Zapobiega "przylatywaniu" flary z rogu (0,0).
      const r = el.getBoundingClientRect();
      const startX = e.clientX - r.left - size / 2;
      const startY = e.clientY - r.top - size / 2;

      target.current = { x: startX, y: startY };
      pos.current = { x: startX, y: startY };

      // Wymuś update pozycji DOM natychmiast, zanim React przetworzy state visible
      if (elRef.current) {
        elRef.current.style.transform = `translate(${startX}px, ${startY}px)`;
      }

      setVisible(true);
    };

    const leave = () => setVisible(false);

    el.addEventListener("mousemove", move);
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);

    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
    };
  }, [trackRef, size]);

  useEffect(() => {
    const tick = () => {
      // Interpolacja LERP (Linear Interpolation)
      pos.current.x += (target.current.x - pos.current.x) * smoothing;
      pos.current.y += (target.current.y - pos.current.y) * smoothing;

      if (elRef.current) {
        // JS steruje TYLKO pozycją wrappera
        elRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);

    return () => {
      if (raf.current !== null) {
        cancelAnimationFrame(raf.current);
        raf.current = null;
      }
    };
  }, [smoothing]);

  return (
    <div
      ref={elRef}
      className={`absolute top-0 left-0 pointer-events-none will-change-transform ${className}`}
      style={{
        width: size,
        height: size,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          opacity: visible ? 0.35 : 0,
          transform: visible ? "scale(1)" : "scale(0.5)",
          transition: "opacity 300ms ease-out, transform 300ms ease-out",
          filter: "blur(66px)",
        }}
        className="rounded-full bg-brand-primary-500 mix-blend-screen"
      />
    </div>
  );
}
