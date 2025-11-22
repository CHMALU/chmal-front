// CatalogClient.tsx
"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import PaginationDots from "@/app/components/PaginationDots";
import CatalogTile from "@/app/components/CatalogTile";
import type { CatalogItem, PriceCatalogData } from "@/type/acf";

const MOBILE_MAX_ITEMS = 7;
const SWIPE_PX = 40; // próg
const MAX_SLOPE = 0.5; // |dy/dx|, żeby nie łapać scrolla pionowego

export default function CatalogClient({
  items,
  catalogData,
}: {
  items: CatalogItem[];
  catalogData: PriceCatalogData;
}) {
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [activePage, setActivePage] = useState(0);
  const [hoverPaused, setHoverPaused] = useState(false);

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

  const isMobile = itemsPerPage === 1;

  // --- SWIPE ---
  const startX = useRef(0);
  const startY = useRef(0);
  const dragging = useRef(false);
  const locked = useRef(false); // zablokuj pionowy scroll tylko przy poziomym geście

  const onTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;
    const t = e.touches[0];
    startX.current = t.clientX;
    startY.current = t.clientY;
    dragging.current = true;
    locked.current = false;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isMobile || !dragging.current) return;
    const t = e.touches[0];
    const dx = t.clientX - startX.current;
    const dy = t.clientY - startY.current;

    // jeśli gest poziomy dominuje, blokuj scroll pionowy
    if (
      !locked.current &&
      Math.abs(dx) > 8 &&
      Math.abs(dy) / Math.abs(dx) < MAX_SLOPE
    ) {
      locked.current = true;
      e.preventDefault(); // React touch listeners nie są passive, więc zadziała
    }
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!isMobile || !dragging.current) return;
    dragging.current = false;

    const dx = e.changedTouches?.[0]?.clientX - startX.current;
    if (dx === undefined) return;

    if (dx <= -SWIPE_PX && activePage < pageCount - 1) {
      setActivePage((p) => p + 1); // swipe w lewo → następna strona
    } else if (dx >= SWIPE_PX && activePage > 0) {
      setActivePage((p) => p - 1); // swipe w prawo → poprzednia strona
    }
  };
  // --- /SWIPE ---

  // limit widocznych elementów na mobilu do 7
  const visibleItems = useMemo(
    () => (isMobile ? items.slice(0, MOBILE_MAX_ITEMS) : items),
    [items, isMobile]
  );

  const pages = useMemo(() => {
    const out: CatalogItem[][] = [];
    for (let i = 0; i < visibleItems.length; i += itemsPerPage) {
      out.push(visibleItems.slice(i, i + itemsPerPage));
    }
    return out.length ? out : [[]];
  }, [visibleItems, itemsPerPage]);

  const pageCount = Math.max(1, Math.ceil(visibleItems.length / itemsPerPage));
  const dotsCount = isMobile
    ? Math.min(pageCount, MOBILE_MAX_ITEMS)
    : pageCount;

  // skoryguj aktywną stronę po zmianie liczby stron
  useEffect(() => {
    const maxPage = pageCount - 1;
    if (activePage > maxPage) setActivePage(0);
  }, [pageCount]); // reset przy zmianie układu/limitu

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
      className="pt-0 pb-8 sm:pt-12 sm:pb-12 flex flex-col justify-center items-center gap-8 sm:gap-12 self-stretch"
    >
      {/* VIEWPORT */}
      <div
        className="relative w-full overflow-x-hidden"
        onPointerEnter={() => setHoverPaused(true)}
        onPointerLeave={() => setHoverPaused(false)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
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
                  "w-full shrink-0 transition-opacity duration-700 flex",
                  isActive ? "opacity-100" : "opacity-35",
                ].join(" ")}
                style={{ opacity: isActive ? 1 : 0.35 }}
              >
                <motion.div
                  key={`page-${pIdx}-${isActive ? "active" : "idle"}`}
                  variants={pageVariants}
                  initial="hidden"
                  animate={isActive ? "show" : "hidden"}
                  className="flex flex-nowrap justify-center items-stretch grow gap-8"
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

      {/* DOTS */}
      <PaginationDots
        maxDots={dotsCount}
        current={activePage}
        onChange={setActivePage}
        auto
        intervalMs={5000}
        paused={!inView || hoverPaused}
      />
    </div>
  );
}
