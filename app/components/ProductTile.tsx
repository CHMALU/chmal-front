"use client";

import Image from "next/image";
import Button from "./Button";
import { FiArrowRight } from "react-icons/fi";
import type { CatalogItem, PageServiceData } from "@/type/acf";

interface ProductTileProps {
  item: CatalogItem;
  priceText: PageServiceData;
}

function formatPrice(raw: string): string {
  const normalized = raw.replace(",", ".");
  const value = Number(normalized);
  if (Number.isNaN(value)) return raw;
  return value.toFixed(2).replace(".", ",");
}

export default function ProductTile({ item, priceText }: ProductTileProps) {
  const {
    name,
    price,
    image: { url, alt },
  } = item;

  const { prefixCeny, walutaCeny } = priceText;

  const formatted = formatPrice(price);

  return (
    <div className="w-[392px] border border-gray-300 rounded-lg overflow-hidden shadow-sm flex flex-col bg-white shrink-0">
      <div className="relative aspect-[16/9] bg-gray-200">
        {url ? (
          <Image
            src={url}
            alt={alt || ""}
            fill
            className="object-cover"
            sizes="(max-width: 392px) 100vw, 50vw"
            priority
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            16:9
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-3 self-stretch items-start">
        <h3 className="font-bold text-xl leading-[120%] pb-4 text-gray-900">
          {name}
        </h3>
        <div className="w-full h-[1px] bg-gray-300" />
        <div className="flex items-baseline gap-1">
          <p className="text-sm text-gray-900 leading-[150%]">{prefixCeny}</p>
          <h3 className="text-xl font-bold text-gray-900 leading-[120%]">
            {formatted} {walutaCeny}
          </h3>
        </div>
        <Button
          onClick={() => {}}
          icon={FiArrowRight}
          variant="outlineSecondary"
          label="Czytaj więcej"
        />
      </div>
    </div>
  );
}
