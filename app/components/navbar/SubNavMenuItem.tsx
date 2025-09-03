"use client";

import { useEffect, useRef } from "react";
import { TypographyBody } from "../Typography";
import NavDropdown from "./NavDropdown";
import type { CatalogItem, SubpageVariant } from "@/type/acf";
import { FaChevronDown } from "react-icons/fa";

type Props = {
  label: string;
  data: CatalogItem[];
  variant: SubpageVariant;
  open: boolean;
  onToggle: () => void;
  right?: boolean;
  icon?: boolean;
  id?: string;
};

export default function SubNavMenuItem({
  label,
  data,
  variant,
  open,
  onToggle,
  right,
  icon,
  id,
}: Props) {
  const dropdownId = id ?? `dropdown-${variant}-${label.toLowerCase()}`;
  const ref = useRef<HTMLLIElement>(null);

  // obsługa kliknięcia poza i ESC
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node) && open) {
        onToggle(); // zamknij, jeśli klik poza
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onToggle(); // zamknij po ESC
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onToggle]);

  return (
    <li ref={ref}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={dropdownId}
        className="flex py-4 px-2 justify-center items-center gap-2 cursor-pointer"
      >
        {icon && (
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
        )}
        <TypographyBody className="text-gray-50 font-bold text-sm">
          {label}
        </TypographyBody>
        <FaChevronDown
          className={`text-gray-50 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          size={12}
          aria-hidden="true"
        />
      </button>

      <div id={dropdownId}>
        <NavDropdown
          data={data}
          variant={variant}
          right={right}
          open={open}
          onClose={onToggle} // zamykanie po kliknięciu w link
        />
      </div>
    </li>
  );
}
