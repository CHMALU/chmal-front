"use client";

import Link from "next/link";
import { TypographyBody } from "../Typography";
import type { SubpageVariant, WPCatalogEntryNav } from "@/type/acf";

interface NavDropdownProps {
  data: WPCatalogEntryNav[];
  variant: SubpageVariant; // "uslugi" | "produkty"
  right?: boolean;
  open?: boolean; // NEW: steruje widocznością
}

export default function NavDropdown({
  data,
  variant,
  right,
  open = false,
}: NavDropdownProps) {
  return (
    <ul>
      <div
        className={`absolute ${
          open ? "inline-flex" : "hidden"
        } py-2 px-6 flex-col items-stretch rounded-b-sm border border-gray-300 shadow bg-white z-50 ${
          right ? "right-0" : ""
        }`}
      >
        {data.map((p) => (
          <li
            key={p.id}
            className="px-2 py-3 hover:bg-gray-100 rounded-xl transition duration-300"
          >
            <Link
              href={`/${variant}/${p.slug}`}
              className="flex py-1 px-0 justify-start items-center self-stretch"
            >
              <TypographyBody className="font-bold text-gray-900 text-sm">
                {p.title.rendered || p.slug}
              </TypographyBody>
            </Link>
          </li>
        ))}

        <div className="w-full h-[1px] bg-gray-300" />

        <li className="">
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
