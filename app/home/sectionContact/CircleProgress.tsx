"use client";

import React, { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";
import { TypographyH3 } from "@/app/components/Typography";

interface CircleProgressProps {
  /** wartość docelowa w % (0–100) */
  percentage: number;
  /** rozmiar SVG w px (domyślnie 96 ⇒ Tailwind w-24 h-24) */
  size?: number;
  /** grubość kreski w px (domyślnie 6) */
  strokeWidth?: number;
  /** czas animacji w sekundach (domyślnie 1s) */
  duration?: number;
}

const CircleProgress: React.FC<CircleProgressProps> = ({
  percentage,
  size = 96,
  strokeWidth = 6,
  duration = 1,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset =
    circumference * (1 - Math.min(Math.max(percentage, 0), 100) / 100);

  // stan dla liczby
  const [value, setValue] = useState(0);

  useEffect(() => {
    // animacja licznika od 0 do percentage
    const controls = animate(0, percentage, {
      duration,
      ease: "easeOut",
      onUpdate(v) {
        setValue(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [percentage, duration]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* szare tło */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#D1D5DB"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* animowane wypełnienie */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#000"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration, ease: "easeOut" }}
        />
      </svg>

      {/* licznik w środku */}
      <div className="absolute inset-0 flex items-center justify-center">
        <TypographyH3>{value}%</TypographyH3>
      </div>
    </div>
  );
};

export default CircleProgress;
