// CatalogClient.tsx
"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import PaginationDots from "@/app/components/PaginationDots";
import CatalogTile from "@/app/components/CatalogTile";
import type { CatalogItem, PriceCatalogData } from "@/type/acf";

export default function CatalogClient({
  items,
  catalogData,
}: {
  items: CatalogItem[];
  catalogData: PriceCatalogData;
}) {
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [activePage, setActivePage] = useState(0);

  // === WATCH VISIBILITY ===
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(sectionRef, { amount: 0.5 });

  // responsive items per page
  useEffect(() => {
    const updateItemsPerPage = () => {
      let perPage = 3;
      if (window.innerWidth >= 1272) perPage = 3;
      else if (window.innerWidth >= 848) perPage = 2;
      else perPage = 1;
      setItemsPerPage(perPage);
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const pageCount = Math.max(1, Math.ceil(items.length / itemsPerPage));

  useEffect(() => {
    const maxPage = pageCount - 1;
    if (activePage > maxPage) setActivePage(maxPage);
  }, [pageCount, activePage]);

  const pages = useMemo(() => {
    const out: CatalogItem[][] = [];
    for (let i = 0; i < items.length; i += itemsPerPage) {
      out.push(items.slice(i, i + itemsPerPage));
    }
    return out.length ? out : [[]];
  }, [items, itemsPerPage]);

  const itemBasis =
    itemsPerPage === 3
      ? "basis-1/3"
      : itemsPerPage === 2
      ? "basis-1/2"
      : "basis-full";

  const pageVariants = {
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
  };
  const itemVariants = {
    hidden: { opacity: 0.1 },
    show: { opacity: 1, transition: { duration: 0.28, ease: "easeInOut" } },
  };

  return (
    <div
      ref={sectionRef}
      className="py-12 flex flex-col justify-center items-center gap-12 self-stretch"
    >
      {/* VIEWPORT */}
      <div className="relative w-full overflow-hidden">
        {/* TRACK */}
        <div
          className="flex w-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${activePage * 100}%)` }}
        >
          {pages.map((page, pIdx) => {
            const isActive = pIdx === activePage;
            return (
              <div
                key={pIdx}
                className={[
                  "w-full shrink-0 transition-opacity duration-700",
                  isActive ? "opacity-100" : "opacity-35",
                ].join(" ")}
                style={{ opacity: isActive ? 1 : 0.35 }}
              >
                <motion.div
                  key={`page-${pIdx}-${isActive ? "active" : "idle"}`}
                  variants={pageVariants}
                  initial="hidden"
                  animate={isActive ? "show" : "hidden"}
                  className="w-full flex flex-nowrap justify-center items-stretch gap-8"
                >
                  {page.map((item, i) => (
                    <motion.div
                      key={`${pIdx}-${i}`}
                      variants={itemVariants}
                      className={`${itemBasis} flex justify-center`}
                    >
                      <CatalogTile item={item} priceText={catalogData} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DOTS – kontrolowane + auto + progress kreska, PAUSE poza viewportem */}
      <PaginationDots
        maxDots={pageCount}
        current={activePage}
        onChange={setActivePage}
        auto
        intervalMs={5000}
        paused={!inView} // <— kluczowa linia
      />
    </div>
  );
}
