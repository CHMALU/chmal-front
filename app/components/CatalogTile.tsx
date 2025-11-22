"use client";

import Link from "next/link";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import type { CatalogItem, PriceCatalogData } from "@/type/acf";
import { formatPrice } from "../libs/formaters";
import Button from "./Button";

interface CatalogTileProps {
  item: CatalogItem;
  priceText: PriceCatalogData;
}

export default function CatalogTile({ item, priceText }: CatalogTileProps) {
  const { variant, slug, name, price } = item;
  const { url, alt } = item.image || {};
  const { prefixCeny, walutaCeny } = priceText;

  const href = `/${variant}/${slug}`;

  return (
    <Link
      href={href}
      className={[
        "group w-[clamp(220px,392px,100%)] border border-gray-300 rounded-lg overflow-hidden",
        "shadow-sm flex flex-col bg-white shrink-0",
        "transition-shadow duration-300 hover:shadow-md",
        "hover:ring-1 hover:ring-gray-200/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/60",
      ].join(" ")}
      aria-label={`${name} – przejdź do szczegółów`}
    >
      {/* IMAGE */}
      <div className="relative aspect-[16/9] bg-gray-200 overflow-hidden">
        {url ? (
          <Image
            src={url}
            alt={alt || ""}
            width={392}
            height={220}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 392px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            Brak obrazu
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col gap-3 self-stretch items-start grow justify-between">
        <h3 className="font-bold text-xl leading-[120%] pb-4 text-gray-900">
          {name}
        </h3>

        <div className="h-[1px] w-full bg-gray-300" />

        <div className="flex items-baseline gap-1">
          <p className="text-sm text-gray-900 leading-[150%]">{prefixCeny}</p>
          <h3 className="text-xl font-bold text-gray-900 leading-[120%]">
            {formatPrice(price)} {walutaCeny}
          </h3>
        </div>

        <Button
          icon={FiArrowRight}
          variant="outlineSecondary"
          label="Czytaj więcej"
          className="[&_svg]:transition-transform [&_svg]:duration-300 group-hover:[&_svg]:translate-x-0.5"
        />
      </div>
    </Link>
  );
}
