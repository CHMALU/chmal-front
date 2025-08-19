"use client";

import Link from "next/link";
import { TypographyBody } from "../Typography";
import Button from "../Button";

interface ColumnConfig {
  title?: string;
  items: { label: string; href: string }[];
  buttonLabel?: string;
  /** if set, title is rendered after this many items */
  splitAt?: number;
}

const columns: ColumnConfig[] = [
  {
    title: "Usługi",
    items: [
      { label: "Serwis mobilny", href: "/serwis-mobilny" },
      { label: "Serwis opon", href: "/serwis-opon" },
      { label: "Serwis szyb", href: "/serwis-szyb" },
      { label: "Klimatyzacja", href: "/klimatyzacja" },
      { label: "Wymiana oleju", href: "/wymiana-oleju" },
      { label: "Mechanika pojazdowa", href: "/mechanika-pojazdowa" },
      { label: "Geometria zawieszenia", href: "/geometria-zawieszenia" },
      { label: "Label", href: "/" },
    ],
  },
  {
    title: "Produkty",
    splitAt: 2, // ← render title after the first two links
    items: [
      { label: "Label", href: "/test/szyby-samochodowe" },
      { label: "Label", href: "/test" },
      { label: "Opony osobowe, 4x4", href: "/produkty/opony-osobowe-4x4" },
      {
        label: "Felgi aluminiowe i stalowe",
        href: "/produkty/felgi-aluminiowe-i-stalowe",
      },
      { label: "Akumulatory", href: "/produkty/akumulatory" },
      { label: "Szyby samochodowe", href: "/produkty/szyby-samochodowe" },
    ],
  },
  {
    title: "Inne",
    items: [
      { label: "Cennik", href: "/cennik" },
      { label: "Blog", href: "/regulamin" },
      { label: "Kontakt", href: "/polityka-prywatnosci" },
      { label: "O firmie", href: "/faq" },
    ],
    buttonLabel: "Formularze gwarancyjne",
  },
];

export default function FooterColumns() {
  return (
    <div className="flex flex-col gap-4 sm:gap-8 self-stretch sm:flex-row items-center sm:items-start">
      {columns.map((col, idx) => {
        const { splitAt = 0, items, title, buttonLabel } = col;
        const before = items.slice(0, splitAt);
        const after = items.slice(splitAt);

        return (
          <div
            key={idx}
            className={`flex flex-col sm:items-start items-center self-stretch gap-6 ${
              buttonLabel ? "justify-between" : ""
            }`}
          >
            <div
              className={`flex flex-col sm:items-start items-center gap-6 ${
                buttonLabel ? "" : " w-[180px]"
              }`}
            >
              {/* links before title */}
              {before.map(({ label, href }) => (
                <Link key={href} href={href}>
                  <TypographyBody className="text-gray-100 font-bold cursor-pointer hover:text-gray-400 transition">
                    {label}
                  </TypographyBody>
                </Link>
              ))}

              {/* title */}
              {title && (
                <TypographyBody
                  className={
                    `text-gray-400 text-xs font-bold uppercase pb-1 mt-4 sm:mt-0` +
                    (before.length > 0 ? ` pt-1` : ``)
                  }
                >
                  {title}
                </TypographyBody>
              )}

              {/* links after title */}
              {after.map(({ label, href }) => (
                <Link key={href} href={href}>
                  <TypographyBody className="text-gray-100 font-bold cursor-pointer hover:text-gray-400 transition">
                    {label}
                  </TypographyBody>
                </Link>
              ))}
            </div>
            {/* optional button at the bottom */}
            {buttonLabel && (
              <Button
                variant="primaryGray"
                label={buttonLabel}
                onClick={() => console.log("Kliknięto:", buttonLabel)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
