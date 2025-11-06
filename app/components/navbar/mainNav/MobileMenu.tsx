"use client";

import Link from "next/link";
import { CatalogItem } from "@/type/acf";
import { TypographyBody } from "../../Typography";
import { HiOutlineWrench } from "react-icons/hi2";
import MenuGroup, { MenuGroupItem } from "./MenuGroups";

interface MobileMenuProps {
  onClose: () => void;
  uslugi: CatalogItem[];
  produkty: CatalogItem[];
}

const mapToItems = (arr: CatalogItem[]): MenuGroupItem[] =>
  arr.map((p) => ({
    id: p.id,
    name: p.name,
    href: `/${p.variant}/${p.slug}`,
  }));

export default function MobileMenu({
  onClose,
  uslugi,
  produkty,
}: MobileMenuProps) {
  return (
    <div className="w-full z-50 bg-white h-[calc(100vh-280px)] overflow-y-scroll">
      <div className="flex flex-col">
        <MenuGroup
          label="Produkty"
          icon={
            <img src="/svg/car.svg" alt="" aria-hidden className="h-5 w-5" />
          }
          items={mapToItems(produkty)}
          onItemClick={onClose}
        />

        <MenuGroup
          label="Usługi"
          icon={<HiOutlineWrench size={24} />}
          items={mapToItems(uslugi)}
          onItemClick={onClose}
        />

        <nav className="flex flex-col">
          {[
            { href: "/blog", label: "Blog" },
            { href: "/o-firmie", label: "O firmie" },
            { href: "/kontakt", label: "Kontakt" },
            {
              href: "/formularze-gwarancyjne",
              label: "Formularze gwarancyjne",
            },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="flex px-5 py-3 border-b border-gray-200 justify-between items-center transition duration-300 hover:bg-gray-200"
              onClick={onClose}
            >
              <TypographyBody className="text-gray-700 font-bold">
                {l.label}
              </TypographyBody>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
