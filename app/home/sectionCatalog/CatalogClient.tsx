"use client";

import { useState, useEffect } from "react";
import PaginationDots from "@/app/components/PaginationDots";
import ProductTile from "@/app/components/ProductTile";
import type { CatalogItem, PageServiceData } from "@/type/acf";

interface CatalogClientProps {
  items: CatalogItem[];
  serviceData: PageServiceData;
}

export default function CatalogClient({
  items,
  serviceData,
}: CatalogClientProps) {
  // Initial default items-per-page; will update on mount
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [activePage, setActivePage] = useState(0);

  // Update itemsPerPage on mount and on window resize
  useEffect(() => {
    const updateItemsPerPage = () => {
      let perPage = 1;
      if (window.innerWidth >= 1240) perPage = 3;
      else if (window.innerWidth >= 816) perPage = 2;
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
    console.log("Wybrana strona:", pageIndex);
    setActivePage(pageIndex);
  };

  return (
    <div className="py-12 flex flex-col justify-center items-center gap-12 self-stretch">
      <div className="w-full flex flex-wrap justify-center items-center gap-8">
        {visibleItems.map((item, i) => (
          <ProductTile key={start + i} item={item} priceText={serviceData} />
        ))}
      </div>

      <PaginationDots maxDots={pageCount} onChange={handleDotChange} />
    </div>
  );
}
