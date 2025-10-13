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
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);
  const elRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      target.current.x = e.clientX - r.left - size / 2;
      target.current.y = e.clientY - r.top - size / 2;
    };
    const enter = () => setVisible(true);
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
      pos.current.x += (target.current.x - pos.current.x) * smoothing;
      pos.current.y += (target.current.y - pos.current.y) * smoothing;
      if (elRef.current) {
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
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <div
        ref={elRef}
        style={{
          width: size,
          height: size,
          opacity: visible ? 0.35 : 0,
          transition: "opacity 160ms ease",
          filter: "blur(66px)",
        }}
        className="absolute rounded-full bg-brand-primary-500 mix-blend-screen"
      />
    </div>
  );
}
