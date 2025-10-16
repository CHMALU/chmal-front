"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, animate, useInView } from "framer-motion";
import { TypographyH3 } from "@/app/components/Typography";

interface CircleProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  duration?: number;
  delay?: number;
}

const CircleProgress: React.FC<CircleProgressProps> = ({
  percentage,
  size = 96,
  strokeWidth = 6,
  duration = 1,
  delay = 0,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset =
    circumference * (1 - Math.min(Math.max(percentage, 0), 100) / 100);

  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;

    const timeout = setTimeout(() => {
      const controls = animate(0, percentage, {
        duration,
        ease: "easeOut",
        onUpdate(v) {
          setValue(Math.round(v));
        },
      });
      return () => controls.stop();
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [inView, percentage, duration, delay]);

  return (
    <div ref={ref} className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#D1D5DB"
          strokeWidth={strokeWidth}
          fill="none"
        />
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
          animate={inView ? { strokeDashoffset: dashOffset } : {}}
          transition={{ duration, ease: "easeOut", delay }}
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <TypographyH3>{value}%</TypographyH3>
      </div>
    </div>
  );
};

export default CircleProgress;
