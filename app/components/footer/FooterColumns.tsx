"use client";

import Link from "next/link";
import { TypographyBody } from "../Typography";
import Button from "../Button";
import type { CatalogItem } from "@/type/acf";

interface FooterColumnsProps {
  uslugi: CatalogItem[];
  produkty: CatalogItem[];
}

export default function FooterColumns({
  uslugi,
  produkty,
}: FooterColumnsProps) {
  // obliczamy punkt podziału
  const total = uslugi.length + produkty.length;
  const splitIndex = Math.ceil(total / 2);

  const uslugiLeft = uslugi.slice(0, splitIndex);
  const uslugiRight = uslugi.slice(splitIndex);

  return (
    <div className="flex flex-col gap-4 sm:gap-8 self-stretch sm:flex-row items-center sm:items-start">
      {/* kolumna 1 - część usług */}
      <div className="flex flex-col sm:items-start items-center  gap-6 sm:w-[180px] ">
        {uslugiLeft.length > 0 && (
          <>
            <TypographyBody className="text-gray-400 text-xs font-bold uppercase pb-1">
              Usługi
            </TypographyBody>
            {uslugiLeft.map((item) => (
              <Link key={item.slug} href={`/uslugi/${item.slug}`}>
                <TypographyBody className="text-gray-100 font-bold cursor-pointer hover:text-gray-400 transition">
                  {item.name}
                </TypographyBody>
              </Link>
            ))}
          </>
        )}
      </div>

      {/* kolumna 2 - reszta usług + produkty */}
      <div className="flex flex-col sm:items-start items-center gap-6 sm:w-[180px]">
        {uslugiRight.map((item) => (
          <Link key={item.slug} href={`/uslugi/${item.slug}`}>
            <TypographyBody className="text-gray-100 font-bold cursor-pointer hover:text-gray-400 transition">
              {item.name}
            </TypographyBody>
          </Link>
        ))}

        {produkty.length > 0 && (
          <>
            <TypographyBody className="text-gray-400 text-xs font-bold uppercase pb-1 mt-4 sm:mt-0">
              Produkty
            </TypographyBody>
            {produkty.map((item) => (
              <Link key={item.slug} href={`/produkty/${item.slug}`}>
                <TypographyBody className="text-gray-100 font-bold cursor-pointer hover:text-gray-400 transition">
                  {item.name}
                </TypographyBody>
              </Link>
            ))}
          </>
        )}
      </div>

      {/* kolumna 3 - inne */}
      <div className="flex flex-col sm:items-start items-center self-stretch gap-6 justify-between">
        <div className="flex flex-col sm:items-start items-center gap-6 max-w-[180px]">
          <TypographyBody className="text-gray-400 text-xs font-bold uppercase pb-1">
            Inne
          </TypographyBody>
          <Link href="/cennik">
            <TypographyBody className="text-gray-100 font-bold cursor-pointer hover:text-gray-400 transition">
              Cennik
            </TypographyBody>
          </Link>
          <Link href="/blog">
            <TypographyBody className="text-gray-100 font-bold cursor-pointer hover:text-gray-400 transition">
              Blog
            </TypographyBody>
          </Link>
          <Link href="/kontakt">
            <TypographyBody className="text-gray-100 font-bold cursor-pointer hover:text-gray-400 transition">
              Kontakt
            </TypographyBody>
          </Link>
          <Link href="/o-firmie">
            <TypographyBody className="text-gray-100 font-bold cursor-pointer hover:text-gray-400 transition">
              O firmie
            </TypographyBody>
          </Link>
        </div>
        <Button
          variant="primaryGray"
          label="Formularze gwarancyjne"
          href="/formularze-gwarancyjne"
        />
      </div>
    </div>
  );
}
