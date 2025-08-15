"use client";

import { useState } from "react";
import Link from "next/link";
import { TypographyBody } from "../Typography";
import Container from "../Container";
import { WPCatalogEntryNav } from "@/type/acf";
import NavDropdown from "./NavDropdown";
import { FaChevronDown } from "react-icons/fa";

interface SubNavProps {
  uslugi: WPCatalogEntryNav[];
  produkty: WPCatalogEntryNav[];
}

export function SubNav({ uslugi, produkty }: SubNavProps) {
  const [openProdukty, setOpenProdukty] = useState(false);
  const [openWiecej, setOpenWiecej] = useState(false);

  // proste zamykanie – otwarcie jednego zamyka drugi
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
      <div className="border-t-4 border-brand-primary-500 bg-brand-secondary-500">
        <Container>
          <ul className="relative flex justify-between items-center">
            {/* PRODUKTY */}
            <li>
              <button
                type="button"
                onClick={toggleProdukty}
                aria-expanded={openProdukty}
                aria-controls="dropdown-produkty"
              >
                <div className="relative flex py-4 px-2 justify-center items-center gap-2 cursor-pointer">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.16602 10.8335H6.66602M1.66602 7.50016L3.33268 8.3335L4.39155 5.15689C4.61011 4.50121 4.71939 4.17336 4.92209 3.93098C5.10108 3.71694 5.33095 3.55126 5.5906 3.44914C5.88465 3.3335 6.23022 3.3335 6.92137 3.3335H13.0773C13.7685 3.3335 14.1141 3.3335 14.4081 3.44914C14.6678 3.55126 14.8976 3.71694 15.0766 3.93098C15.2793 4.17336 15.3886 4.50121 15.6071 5.15689L16.666 8.3335L18.3327 7.50016M13.3327 10.8335H15.8327M5.66602 8.3335H14.3327C15.7328 8.3335 16.4329 8.3335 16.9677 8.60598C17.4381 8.84566 17.8205 9.22811 18.0602 9.69852C18.3327 10.2333 18.3327 10.9334 18.3327 12.3335V14.5835C18.3327 14.9707 18.3327 15.1643 18.3007 15.3253C18.1691 15.9865 17.6523 16.5033 16.9912 16.6348C16.8302 16.6668 16.6366 16.6668 16.2493 16.6668H15.8327C14.9122 16.6668 14.166 15.9206 14.166 15.0002C14.166 14.77 13.9795 14.5835 13.7493 14.5835H6.24935C6.01923 14.5835 5.83268 14.77 5.83268 15.0002C5.83268 15.9206 5.08649 16.6668 4.16602 16.6668H3.74935C3.36214 16.6668 3.16853 16.6668 3.00753 16.6348C2.34638 16.5033 1.82955 15.9865 1.69804 15.3253C1.66602 15.1643 1.66602 14.9707 1.66602 14.5835V12.3335C1.66602 10.9334 1.66602 10.2333 1.9385 9.69852C2.17818 9.22811 2.56063 8.84566 3.03104 8.60598C3.56582 8.3335 4.26588 8.3335 5.66602 8.3335Z"
                      stroke="#F9FAFB"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <TypographyBody className="text-gray-50 font-bold text-sm">
                    Produkty
                  </TypographyBody>
                  <FaChevronDown
                    className={`text-gray-50 transition-transform ${
                      openProdukty ? "rotate-180" : ""
                    }`}
                    size={12}
                  />
                </div>
              </button>

              <div id="dropdown-produkty">
                <NavDropdown
                  data={produkty}
                  variant="produkty"
                  open={openProdukty}
                />
              </div>
            </li>

            {/* separator */}
            <svg
              width="2"
              height="29"
              viewBox="0 0 2 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.38867 1C1.38867 0.723858 1.16481 0.5 0.888672 0.5C0.612529 0.5 0.388672 0.723858 0.388672 1L1.38867 1ZM0.388672 1L0.388673 29L1.38867 29L1.38867 1L0.388672 1Z"
                fill="#D1D5DB"
              />
            </svg>

            {/* pierwsze 6 usług */}
            {uslugi.slice(0, 6).map((u) => (
              <li key={u.id} className="px-2 py-4">
                <Link href={`/uslugi/${u.slug}`}>
                  <TypographyBody className="text-white font-bold text-sm">
                    {u.title.rendered || u.slug}
                  </TypographyBody>
                </Link>
              </li>
            ))}

            {/* WIĘCEJ */}
            <li>
              <button
                type="button"
                onClick={toggleWiecej}
                aria-expanded={openWiecej}
                aria-controls="dropdown-wiecej"
              >
                <div className="relative flex py-4 px-2 justify-center items-center gap-2 cursor-pointer">
                  <TypographyBody className="text-gray-50 font-bold text-sm">
                    Więcej
                  </TypographyBody>
                  <FaChevronDown
                    className={`text-gray-50 transition-transform ${
                      openWiecej ? "rotate-180" : ""
                    }`}
                    size={12}
                  />
                </div>
              </button>

              <div id="dropdown-wiecej">
                <NavDropdown
                  data={uslugi.slice(6)}
                  variant="uslugi"
                  right
                  open={openWiecej}
                />
              </div>
            </li>
          </ul>
        </Container>
      </div>
    </nav>
  );
}
