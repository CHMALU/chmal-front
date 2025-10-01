"use client";

import { useRef, useState, useEffect } from "react";
import clsx from "clsx";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTiltDeg?: number; // maksymalny przechył (np. 12–14 dla mocniejszego efektu)
  scale?: number; // skala na hover (np. 1.04)
  glare?: boolean; // włącz połysk
  perspective?: number; // mniejsza wartość => większa głębia (np. 700)
  glareStrength?: number; // 0..1 siła hotspotu (np. 0.55)
  glareRadius?: number; // px promień hotspotu (np. 520)
  shadowLift?: boolean; // włącz kierunkowy cień zależny od tiltu
}

export default function TiltCard({
  children,
  className,
  maxTiltDeg = 12,
  scale = 1.03,
  glare = true,
  perspective = 1200, // było 1000 — zmniejszamy, by zwiększyć „głębię”
  glareStrength = 0.55, // mocniejszy połysk
  glareRadius = 520,
  shadowLift = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [transform, setTransform] = useState<string>(
    `perspective(${perspective}px)`
  );
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({
    opacity: 0,
  });
  const [shadowStyle, setShadowStyle] = useState<React.CSSProperties>({});

  const reset = () => {
    setTransform(
      `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`
    );
    setGlareStyle({ opacity: 0 });
    setShadowStyle({});
  };

  useEffect(() => {
    // accessibility
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) reset();
  }, []);

  useEffect(() => {
    // gdy zmienisz prop `perspective` w runtime
    setTransform((t) =>
      t.replace(/perspective\([^)]*\)/, `perspective(${perspective}px)`)
    );
  }, [perspective]);

  let raf = 0;
  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    cancelAnimationFrame(raf);

    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    const rxn = (py / rect.height) * 2 - 1; // -1..1
    const ryn = (px / rect.width) * 2 - 1; // -1..1

    const rotateX = -rxn * maxTiltDeg;
    const rotateY = ryn * maxTiltDeg;

    // siła efektu (0..1) do cienia itp.
    const mag = Math.min(1, Math.hypot(rxn, ryn));

    raf = requestAnimationFrame(() => {
      // główny transform
      setTransform(
        `perspective(${perspective}px) rotateX(${rotateX.toFixed(
          2
        )}deg) rotateY(${rotateY.toFixed(2)}deg) scale(${scale})`
      );

      // kierunkowy cień (soft, rosnący z mag)
      if (shadowLift) {
        const x = ryn * 12; // px przesunięcia cienia w poziomie
        const y = rxn * 12; // px w pionie
        const blur = 28 + mag * 10;
        const spread = 0;
        const alpha = 0.16 + mag * 0.1; // 0.16–0.26
        setShadowStyle({
          boxShadow: `${-x}px ${-y}px ${blur}px ${spread}px rgba(0,0,0,${alpha.toFixed(
            2
          )})`,
        });
      }

      if (glare) {
        // mocniejszy, radialny hotspot + delikatna smuga kierunkowa
        const cx = Math.max(0, Math.min(rect.width, px));
        const cy = Math.max(0, Math.min(rect.height, py));

        // Hotspot: radial-gradient przy kursorrze
        const radius = glareRadius;
        const strength = glareStrength; // 0..1
        const hotspot = `radial-gradient(${radius}px ${radius}px at ${cx}px ${cy}px,
          rgba(255,255,255,${0.75 * strength}),
          rgba(255,255,255,${0.35 * strength}) 35%,
          rgba(255,255,255,0) 60%)`;

        // Smuga: subtelny linear-gradient zgodny z kierunkiem przechyłu
        const angle = Math.atan2(cy - rect.height / 2, cx - rect.width / 2);
        const deg = (angle * 180) / Math.PI;
        const streak = `linear-gradient(${deg}deg,
          rgba(255,255,255,${0.15 * strength}) 0%,
          rgba(255,255,255,0) 40%)`;

        setGlareStyle({
          opacity: 1,
          backgroundImage: `${hotspot}, ${streak}`,
          // lekka mieszanka, by nie przepalało kolorów
          mixBlendMode: "soft-light",
        });
      }
    });
  };

  const onLeave = () => {
    cancelAnimationFrame(raf);
    reset();
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={clsx(
        "relative will-change-transform transform-gpu transition-transform duration-200 ease-out rounded-sm",
        className
      )}
      style={{ transform, ...shadowStyle }}
    >
      {/* połysk */}
      {glare && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-sm transition-opacity duration-150"
          style={glareStyle}
        />
      )}
      {children}
    </div>
  );
}
