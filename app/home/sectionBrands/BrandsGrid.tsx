// components/BrandsGrid.tsx
"use client";

import Image from "next/image";

interface BrandsGridProps {
  brands: {
    id: number;
    title: string;
    logo?: { url?: string; alt?: string };
    link?: string;
  }[];
}

export default function BrandsGrid({ brands }: BrandsGridProps) {
  return (
    <ul className="hidden sm:flex flex-wrap justify-center gap-6 mt-8">
      {brands.map(({ id, title, logo, link }) => (
        <li key={id}>
          <a
            key={id}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-[128px] h-[36px] rounded-lg overflow-hidden flex items-center justify-center bg-brand-secondary-500/20 transition-transform duration-300 ease-out hover:scale-110 hover:shadow-lg hover:-translate-y-1"
            title={title}
          >
            {logo?.url ? (
              <Image
                src={logo.url}
                alt={logo.alt || title}
                width={128}
                height={36}
                className="w-full h-full object-fill"
                sizes="128px"
              />
            ) : (
              <div className="bg-gray-200 w-full h-full" />
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}
