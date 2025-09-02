"use client";

import { useState, useEffect } from "react";
import PaginationDots from "@/app/components/PaginationDots";
import CatalogTile from "@/app/components/CatalogTile";
import type { CatalogItem, PriceCatalogData } from "@/type/acf";

interface CatalogClientProps {
  items: CatalogItem[];
  catalogData: PriceCatalogData;
}

export default function CatalogClient({
  items,
  catalogData,
}: CatalogClientProps) {
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [activePage, setActivePage] = useState(0);

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

  // Adjust activePage if out of range when itemsPerPage or items change
  useEffect(() => {
    const maxPage = Math.ceil(items.length / itemsPerPage) - 1;
    if (activePage > maxPage) {
      setActivePage(maxPage);
    }
  }, [items.length, itemsPerPage, activePage]);

  const pageCount = Math.ceil(items.length / itemsPerPage);
  const start = activePage * itemsPerPage;
  const visibleItems = items.slice(start, start + itemsPerPage);

  const handleDotChange = (pageIndex: number) => {
    setActivePage(pageIndex);
  };

  return (
    <div className="py-12 flex flex-col justify-center items-center gap-12 self-stretch">
      <div className="w-full flex flex-wrap justify-center items-center gap-8">
        {visibleItems.map((item, i) => (
          <CatalogTile key={start + i} item={item} priceText={catalogData} />
        ))}
      </div>

      <PaginationDots maxDots={pageCount} onChange={handleDotChange} />
    </div>
  );
}
