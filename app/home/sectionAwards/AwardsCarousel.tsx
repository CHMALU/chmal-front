"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import PaginationDots from "@/app/components/PaginationDots";
import { Header } from "@/app/components/Header";
import Button from "@/app/components/Button";
import { TypographyBody, TypographyH3 } from "@/app/components/Typography";
import FlipImage from "./FlipImage";
import { WPCertificateEntry, ButtonSettings } from "@/type/acf";
import { HiOutlineCheck } from "react-icons/hi";

interface AwardsCarouselProps {
  entries: WPCertificateEntry[];
  buttonSettings: ButtonSettings;
  sectionTitle: string;
  description: string;
}

export default function AwardsCarousel({
  entries,
  buttonSettings,
  sectionTitle,
  description,
}: AwardsCarouselProps) {
  const [current, setCurrent] = useState(0);
  const prevIndexRef = useRef(0);

  const changeTo = (index: number) => {
    if (index === current) return;
    prevIndexRef.current = current;
    setCurrent(index);
  };

  const curr = entries[current]?.acf?.certificateData;
  const prev = entries[prevIndexRef.current]?.acf?.certificateData;

  const imageNow = {
    url: curr?.certificateImage?.url || "",
    alt: curr?.certificateImage?.alt || curr?.certificateTitle || "",
  };
  const imagePrev = {
    url: prev?.certificateImage?.url || imageNow.url,
    alt: prev?.certificateImage?.alt || imageNow.alt,
  };

  const points = [
    { title: curr?.point1Title, desc: curr?.point1Description },
    { title: curr?.point2Title, desc: curr?.point2Description },
    { title: curr?.point3Title, desc: curr?.point3Description },
  ].filter((p) => p.title || p.desc);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(sectionRef, { amount: 0.5 });

  const [hoverPaused, setHoverPaused] = useState(false);

  return (
    <div className="flex flex-col gap-12">
      <Header noPaddingY title={sectionTitle} subtitle={description} />

      <div
        ref={sectionRef}
        onPointerEnter={() => setHoverPaused(true)}
        onPointerLeave={() => setHoverPaused(false)}
        className="flex flex-col md:flex-row gap-8 justify-center items-center"
      >
        {/* LEWA: flipujące zdjęcie */}
        <div className="relative w-full max-w-[604px] lg:h-[604px] aspect-square rounded-lg ">
          <FlipImage front={imagePrev} back={imageNow} flipKey={current} />
        </div>

        {/* PRAWA: tekst wjeżdża z prawej + fade */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${current}`}
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex flex-col justify-center md:items-start items-center md:text-start text-center gap-8 flex-1 px-8 md:px-0"
          >
            <div className="flex flex-col gap-3">
              <TypographyH3>{curr?.certificateTitle}</TypographyH3>
              <TypographyBody>{curr?.certificateDescription}</TypographyBody>
            </div>

            {points.map((p, idx) => (
              <div className="flex gap-3 items-center" key={idx}>
                <HiOutlineCheck className="hidden md:block text-gray-900 w-6 h-6 flex-shrink-0" />
                <TypographyBody className="text-gray-900">
                  <span className="font-bold">{p.title}:</span> {p.desc}
                </TypographyBody>
              </div>
            ))}

            <Button
              label={buttonSettings.buttonText}
              href={buttonSettings.buttonLink}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* DOTS – kontrolowane + auto + licznik */}
      <PaginationDots
        paused={!inView || hoverPaused}
        maxDots={entries.length}
        current={current}
        onChange={changeTo}
        auto
        intervalMs={5000}
        withCounter
      />
    </div>
  );
}
