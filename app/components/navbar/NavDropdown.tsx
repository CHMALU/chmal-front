"use client";

import Link from "next/link";
import { TypographyBody } from "../Typography";
import { CatalogItem, SubpageVariant } from "@/type/acf";

interface NavDropdownProps {
  data: CatalogItem[];
  variant: SubpageVariant; // "uslugi" | "produkty"
  right?: boolean;
  open?: boolean; // steruje widocznością
  onClose?: () => void;
}

export default function NavDropdown({
  data,
  variant,
  right,
  open = false,
  onClose,
}: NavDropdownProps) {
  return (
    <ul>
      <div
        className={`absolute py-2 px-6 flex-col items-stretch rounded-b-sm border border-gray-300 shadow bg-white z-[-10]
          ${right ? "right-0" : ""}
          transition-all duration-300 ease-in-out
          ${
            open
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-10 pointer-events-none"
          }
        `}
      >
        {data.map((p) => (
          <li
            key={p.id}
            className="px-2 py-3 hover:bg-gray-100 rounded-xl transition duration-300"
          >
            <Link
              href={`/${variant}/${p.slug}`}
              onClick={onClose}
              className="flex py-1 px-0 justify-start items-center self-stretch"
            >
              <TypographyBody className="font-bold text-gray-900 text-sm">
                {p.name || p.slug}
              </TypographyBody>
            </Link>
          </li>
        ))}

        <div className="w-full h-[1px] bg-gray-300" />

        <li>
          <Link
            href={`/${variant}`}
            className="flex px-2 py-4 justify-start items-center self-stretch hover:bg-gray-100 rounded-xl transition duration-300"
          >
            <TypographyBody className="font-bold text-gray-900 text-sm">
              Zobacz wszystkie {variant}
            </TypographyBody>
          </Link>
        </li>
      </div>
    </ul>
  );
}
