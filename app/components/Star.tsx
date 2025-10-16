"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import { motion, useInView } from "framer-motion";

interface StarRatingProps {
  rating: number;
  totalStars?: number;
  size?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  totalStars = 5,
  size = 24,
  duration = 0.5,
  stagger = 0.08,
  delay = 0,
}) => {
  const safeRating = Math.max(0, Math.min(rating, totalStars));
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, margin: "-10% 0px" });

  // stan pozwalający rozpocząć animacje dopiero po "wejściu"
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const timeout = setTimeout(() => setStart(true), delay * 1000); // globalny delay
    return () => clearTimeout(timeout);
  }, [inView, delay]);

  return (
    <div
      ref={rootRef}
      className="flex items-center space-x-[2px]"
      aria-label={`Ocena ${rating.toFixed(1)} na ${totalStars}`}
    >
      {Array.from({ length: totalStars }, (_, i) => {
        const fillAmount = Math.max(0, Math.min(safeRating - i, 1));
        const fillWidth = `${fillAmount * 100}%`;

        return (
          <motion.div
            key={i}
            className="relative inline-block"
            style={{ width: size, height: size }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={
              start ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }
            }
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 24,
              delay: i * stagger * 0.6,
            }}
          >
            {/* tło gwiazdki */}
            <FaStar size={size} className="text-gray-300" />

            {/* wypełnienie */}
            <motion.div
              className="absolute top-0 left-0 overflow-hidden"
              style={{ height: size }}
              initial={{ width: 0 }}
              animate={start ? { width: fillWidth } : { width: 0 }}
              transition={{
                duration,
                ease: "easeOut",
                delay: i * stagger,
              }}
            >
              <FaStar size={size} className="text-yellow-500 drop-shadow-sm" />

              {/* subtelny blink na końcu */}
              {fillAmount > 0.95 && (
                <motion.span
                  className="absolute right-0 top-1/2 -translate-y-1/2 block rounded-full bg-yellow-300"
                  style={{
                    width: size * 0.12,
                    height: size * 0.12,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={
                    start
                      ? { scale: 1, opacity: 0.7 }
                      : { scale: 0, opacity: 0 }
                  }
                  transition={{
                    duration: 0.25,
                    ease: "easeOut",
                    delay: i * stagger + duration - 0.2,
                  }}
                />
              )}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StarRating;
