"use client";

import Image from "next/image";
import Button from "./Button";
import { FiArrowRight } from "react-icons/fi";
import type { CatalogItem, PriceCatalogData } from "@/type/acf";
import { formatPrice } from "../libs/formaters";

interface CatalogTileProps {
  item: CatalogItem;
  priceText: PriceCatalogData;
}

export default function CatalogTile({ item, priceText }: CatalogTileProps) {
  const { variant, slug, name, price } = item;
  const { url, alt } = item.image || {};
  const { prefixCeny, walutaCeny } = priceText;

  return (
    <div
      className={[
        "w-[clamp(220px,392px,100%)] border border-gray-300 rounded-lg overflow-hidden",
        "shadow-sm flex flex-col bg-white shrink-0 group",
        "transition-shadow duration-300 hover:shadow-md",
        "hover:ring-1 hover:ring-gray-200/70",
      ].join(" ")}
    >
      {/* IMAGE */}
      <div className="relative aspect-[16/9] bg-gray-200 overflow-hidden">
        {url ? (
          <Image
            src={url}
            alt={alt || ""}
            fill
            // delikatny zoom tylko obrazka (nie rusza układu)
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 392px) 100vw, 50vw"
            priority
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            Brak obrazu
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col gap-3 self-stretch items-start">
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

        {/* PRZYCISK: bez przesuwania. Opcjonalnie ożywiamy samą ikonę wewnątrz (nie wpływa na layout). */}
        <Button
          href={`/${variant}/${slug}`}
          icon={FiArrowRight}
          variant="outlineSecondary"
          label="Czytaj więcej"
          className="[&_svg]:transition-transform [&_svg]:duration-300 group-hover:[&_svg]:translate-x-0.5"
        />
      </div>
    </div>
  );
}
