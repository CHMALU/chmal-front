"use client";

import Link from "next/link";
import { TypographyBody } from "../Typography";
import Container from "../Container";
import { GiPaintBrush } from "react-icons/gi";
import { FaCar } from "react-icons/fa";
import { MdBrush } from "react-icons/md";

export interface SubNavItem {
  label: string;
  href: string;
}

export interface SubNavProps {
  items?: SubNavItem[];
}

export function SubNav({ items }: SubNavProps) {
  const defaultItems: SubNavItem[] = [
    { label: "Produkty", href: "/produkty" },
    { label: "Serwis mobilny", href: "/serwis-mobilny" },
    { label: "Serwis opon", href: "/serwis-opon" },
    { label: "Serwis szyb", href: "/serwis-szyb" },
    { label: "Klimatyzacja", href: "/klimatyzacja" },
    { label: "Wymiana oleju", href: "/wymiana-oleju" },
    { label: "Mechanika pojazdowa", href: "/mechanika-pojazdowa" },
    { label: "Geometria zawieszenia", href: "/geometria-zawieszenia" },
    { label: "Więcej", href: "/uslugi" },
  ];

  const navItems = items && items.length > 0 ? items : defaultItems;

  return (
    <nav aria-label="Podmenu serwisu">
      <div className="border-t-4 border-brand-primary-500 bg-brand-secondary-500">
        <Container>
          <ul className="flex justify-between p-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>
                  <TypographyBody className="text-white font-bold text-sm">
                    {item.label}
                  </TypographyBody>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </nav>
  );
}
