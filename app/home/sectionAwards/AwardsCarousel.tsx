"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PaginationDots from "@/app/components/PaginationDots";
import CertificateCard from "./CertificateCard";
import { WPCertificateEntry, ButtonSettings } from "@/type/acf";
import { Header } from "@/app/components/Header";

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
  const [direction, setDirection] = useState(1);

  const handleChange = (index: number) => {
    if (index === current) return;
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  return (
    <div className="flex flex-col gap-12">
      <Header noPaddingY title={sectionTitle} subtitle={description} />

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ x: 300 * direction, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300 * direction, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <CertificateCard
            entry={entries[current]}
            buttonSettings={buttonSettings}
            sectionTitle={sectionTitle}
            description={description}
          />
        </motion.div>
      </AnimatePresence>

      <div className="w-[603px] flex justify-center items-center gap-32">
        <PaginationDots
          maxDots={entries.length}
          withCounter
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
