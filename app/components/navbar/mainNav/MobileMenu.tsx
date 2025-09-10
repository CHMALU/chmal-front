"use client";

import Link from "next/link";
import { useState } from "react";
import { CatalogItem } from "@/type/acf";
import { TypographyBody } from "../../Typography";
import { RiArrowDownSLine } from "react-icons/ri";

interface MobileMenuProps {
  onClose: () => void;
  uslugi: CatalogItem[];
  produkty: CatalogItem[];
}

export default function MobileMenu({
  onClose,
  uslugi,
  produkty,
}: MobileMenuProps) {
  const [showProducts, setShowProducts] = useState(false);

  return (
    <div className="w-full z-50 bg-white h-[calc(100vh-280px)] overflow-y-scroll">
      <div className="flex flex-col">
        {/* Inne linki */}
        <div className="flex flex-col">
          <Link
            href="/blog"
            className="flex px-5 py-3 border-b border-gray-200 justify-between items-center cursor-pointer transition duration-300 hover:bg-gray-200"
            onClick={onClose}
          >
            <TypographyBody className="text-gray-700 font-bold">
              Blog
            </TypographyBody>
          </Link>
          <Link
            href="/o-firmie"
            className="flex px-5 py-3 border-b border-gray-200 justify-between items-center cursor-pointer transition duration-300 hover:bg-gray-200"
            onClick={onClose}
          >
            <TypographyBody className="text-gray-700 font-bold">
              O firmie
            </TypographyBody>
          </Link>
          <Link
            href="/kontakt"
            className="flex px-5 py-3 border-b border-gray-200 justify-between items-center cursor-pointer transition duration-300 hover:bg-gray-200"
            onClick={onClose}
          >
            <TypographyBody className="text-gray-700 font-bold">
              Kontakt
            </TypographyBody>
          </Link>
          <Link
            href="/formularze-gwarancyjne"
            className="flex px-5 py-3 border-b border-gray-200 justify-between items-center cursor-pointer transition duration-300 hover:bg-gray-200"
            onClick={onClose}
          >
            <TypographyBody className="text-gray-700 font-bold">
              Formularze gwarancyjne
            </TypographyBody>
          </Link>
        </div>

        <div
          className="flex px-5 py-3 border-b border-gray-200 justify-between items-center cursor-pointer transition duration-300 hover:bg-gray-200"
          onClick={() => setShowProducts((p) => !p)}
        >
          <div className="flex gap-3">
            <img src="/svg/car.svg" alt="Ikona samochodu" />
            <TypographyBody className="font-bold">Produkty</TypographyBody>
          </div>
          <RiArrowDownSLine size={20} />
        </div>

        <div
          className={`flex flex-col transition-all duration-300 ease-in-out overflow-hidden ${
            showProducts ? "h-[194px]" : "h-0"
          }`}
        >
          {produkty.map((p) => (
            <Link
              key={p.id}
              href={`/${p.variant}/${p.slug}`}
              className="flex px-9 py-3 border-b border-gray-200 justify-between items-center cursor-pointer transition duration-300 bg-gray-100 hover:bg-gray-200"
              onClick={onClose}
            >
              <TypographyBody className="text-gray-900">
                {p.name}
              </TypographyBody>
            </Link>
          ))}
        </div>

        {/* Usługi */}
        <div className="flex flex-col">
          {uslugi.map((u) => (
            <Link
              key={u.id}
              href={`/${u.variant}/${u.slug}`}
              className="flex px-5 py-3 border-b border-gray-200 justify-between items-center cursor-pointer transition duration-300 hover:bg-gray-200"
              onClick={onClose}
            >
              <TypographyBody className="text-gray-700">
                {u.name}
              </TypographyBody>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
