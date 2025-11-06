"use client";

import { useState, ReactNode } from "react";
import { TypographyBody } from "../../Typography";
import { RiArrowDownSLine } from "react-icons/ri";

export interface MenuGroupItem {
  id: string | number;
  name: string;
  href: string; // przekaż gotowy link lub zbuduj go wyżej
}

interface MenuGroupProps {
  label: string;
  icon?: ReactNode;
  items: MenuGroupItem[];
  onItemClick?: () => void;
  defaultOpen?: boolean;
  className?: string;
}

export default function MenuGroup({
  label,
  icon,
  items,
  onItemClick,
  defaultOpen = false,
  className = "",
}: MenuGroupProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={className}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="w-full flex px-5 py-3 border-b border-gray-200 justify-between items-center transition duration-300 hover:bg-gray-200"
      >
        <div className="flex gap-3 items-center">
          {icon}
          <TypographyBody className="font-bold">{label}</TypographyBody>
        </div>
        <RiArrowDownSLine
          size={20}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden flex flex-col">
          {items.map((it) => (
            <a
              key={it.id}
              href={it.href}
              className="flex px-9 py-3 border-b border-gray-200 justify-between items-center transition duration-300 bg-gray-100 hover:bg-gray-200"
              onClick={onItemClick}
            >
              <TypographyBody className="text-gray-900">
                {it.name}
              </TypographyBody>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
