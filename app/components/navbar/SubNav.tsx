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

function NavItem({ item }: { item: SubNavItem }) {
  return (
    <li className="px-2 py-4">
      <Link href={item.href}>
        <TypographyBody className="text-white font-bold text-sm">
          {item.label}
        </TypographyBody>
      </Link>
    </li>
  );
}

function EdgeNavItem({
  item,
  isFirst,
}: {
  item: SubNavItem;
  isFirst: boolean;
}) {
  return (
    <li className="">
      <Link href={item.href}>
        <div className="flex py-4 px-2 justify-center items-center ag-right-aligned-cell gap-2">
          {isFirst ? (
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
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          ) : null}
          <TypographyBody className="text-gray-50 font-bold text-sm">
            {item.label}
          </TypographyBody>

          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.29279 7.29308C5.48031 7.10561 5.73462 7.00029 5.99979 7.00029C6.26495 7.00029 6.51926 7.10561 6.70679 7.29308L9.99979 10.5861L13.2928 7.29308C13.385 7.19757 13.4954 7.12139 13.6174 7.06898C13.7394 7.01657 13.8706 6.98898 14.0034 6.98783C14.1362 6.98668 14.2678 7.01198 14.3907 7.06226C14.5136 7.11254 14.6253 7.18679 14.7192 7.28069C14.8131 7.37458 14.8873 7.48623 14.9376 7.60913C14.9879 7.73202 15.0132 7.8637 15.012 7.99648C15.0109 8.12926 14.9833 8.26048 14.9309 8.38249C14.8785 8.50449 14.8023 8.61483 14.7068 8.70708L10.7068 12.7071C10.5193 12.8946 10.265 12.9999 9.99979 12.9999C9.73462 12.9999 9.48031 12.8946 9.29279 12.7071L5.29279 8.70708C5.10532 8.51955 5 8.26525 5 8.00008C5 7.73492 5.10532 7.48061 5.29279 7.29308Z"
              fill="#F9FAFB"
            />
          </svg>
        </div>
      </Link>
    </li>
  );
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
  const middleItems = navItems.slice(1, -1);
  const firstItem = navItems[0];
  const lastItem = navItems.at(-1)!;

  return (
    <nav aria-label="Podmenu serwisu">
      <div className="border-t-4 border-brand-primary-500 bg-brand-secondary-500">
        <Container>
          <ul className="flex justify-between items-center">
            <EdgeNavItem item={firstItem} isFirst />
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
            {middleItems.map((item) => (
              <NavItem key={item.href} item={item} />
            ))}
            <EdgeNavItem item={lastItem} isFirst={false} />
          </ul>
        </Container>
      </div>
    </nav>
  );
}
