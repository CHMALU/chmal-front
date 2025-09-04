"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { TypographyBody } from "../Typography";
import Container from "../Container";
import { CatalogItem } from "@/type/acf";
import SubNavMenuItem from "./SubNavMenuItem";

interface SubNavProps {
  uslugi: CatalogItem[];
  produkty: CatalogItem[];
}

/** Ile kafelków pokazać dla danych szerokości (możesz dostroić) */
const COUNT_BREAKPOINTS = [
  { min: 1280, count: 6 }, // ≥ 1280px → 6
  { min: 1024, count: 5 }, // ≥ 1024px → 5
  { min: 790, count: 4 }, // ≥ 768px  → 4
  { min: 690, count: 3 }, // ≥ 640px  → 3
  { min: 0, count: 2 }, // < 640px  → 2
];

function useVisibleItemsCount(defaultCount = 6) {
  const [count, setCount] = useState(defaultCount);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      const match =
        COUNT_BREAKPOINTS.find((bp) => w >= bp.min) ??
        COUNT_BREAKPOINTS.at(-1)!;
      setCount(match.count);
    };

    // pierwszy pomiar po montażu
    calc();

    // lekki throttle przez RAF
    const onResize = () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(calc);
    };

    window.addEventListener("resize", onResize);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return count;
}

export function SubNav({ uslugi, produkty }: SubNavProps) {
  const [openProdukty, setOpenProdukty] = useState(false);
  const [openWiecej, setOpenWiecej] = useState(false);

  // ile usług pokazać w linii, reszta wpada do "Więcej"
  const visibleCount = useVisibleItemsCount(6);

  const primaryUsługi = uslugi.slice(0, visibleCount);
  const moreUslugi = uslugi.slice(visibleCount);

  const toggleProdukty = () => {
    setOpenProdukty((v) => !v);
    setOpenWiecej(false);
  };
  const toggleWiecej = () => {
    setOpenWiecej((v) => !v);
    setOpenProdukty(false);
  };

  return (
    <nav aria-label="Podmenu serwisu">
      <div className="border-t-4 mt-2 border-brand-primary-500 bg-brand-secondary-500 ">
        <Container>
          <ul className="relative flex justify-between items-center">
            {/* PRODUKTY */}

            <SubNavMenuItem
              id="dropdown-produkty"
              label="Produkty"
              data={produkty}
              variant="produkty"
              open={openProdukty}
              onToggle={toggleProdukty}
              icon
            />

            {/* separator */}
            <svg
              width="2"
              height="29"
              viewBox="0 0 2 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-1"
            >
              <path
                d="M1.38867 1C1.38867 0.723858 1.16481 0.5 0.888672 0.5C0.612529 0.5 0.388672 0.723858 0.388672 1L1.38867 1ZM0.388672 1L0.388673 29L1.38867 29L1.38867 1L0.388672 1Z"
                fill="#D1D5DB"
              />
            </svg>

            {/* dynamiczna liczba usług w linii */}
            {primaryUsługi.map((u) => (
              <li key={u.id} className="px-2 py-4">
                <Link href={`/uslugi/${u.slug}`}>
                  <TypographyBody className="text-white font-bold text-sm">
                    {u.name || u.slug}
                  </TypographyBody>
                </Link>
              </li>
            ))}

            {/* WIĘCEJ – pokazujemy tylko jeśli jest co chować */}
            <SubNavMenuItem
              id="dropdown-wiecej"
              label="Więcej"
              data={moreUslugi}
              variant="uslugi"
              right
              open={openWiecej}
              onToggle={toggleWiecej}
            />
          </ul>
        </Container>
      </div>
    </nav>
  );
}
