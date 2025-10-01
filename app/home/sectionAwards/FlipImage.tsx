"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface FlipImageProps {
  front: { url: string; alt: string };
  back: { url: string; alt: string };
  flipKey: number; // zmień aby zainicjować animację
  className?: string;
}

export default function FlipImage({
  front,
  back,
  flipKey,
  className,
}: FlipImageProps) {
  return (
    <div
      className={`relative w-full h-full [perspective:1000px] ${
        className || ""
      }`}
    >
      <motion.div
        key={flipKey}
        initial={{ rotateY: 0 }}
        animate={{ rotateY: 180 }}
        transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
        className="absolute inset-0"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT (poprzednie zdjęcie) */}
        <div
          className="absolute inset-0"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Image
            src={front.url}
            alt={front.alt}
            fill
            className="object-cover rounded-lg"
            sizes="(min-width:1024px) 604px, 100vw"
            priority
          />
        </div>

        {/* BACK (docelowe zdjęcie) */}
        <div
          className="absolute inset-0"
          style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
        >
          <Image
            src={back.url}
            alt={back.alt}
            fill
            className="object-cover rounded-lg"
            sizes="(min-width:1024px) 604px, 100vw"
            priority
          />
        </div>
      </motion.div>
    </div>
  );
}
