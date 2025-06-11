"use client";

import Image from "next/image";
import Button from "./Button";
import { FiArrowRight } from "react-icons/fi";

interface ProductTileProps {
  title: string;
  price: number;
  imageUrl?: string;
  imageAlt?: string;
}

export default function ProductTile({
  title,
  price,
  imageUrl,
  imageAlt,
}: ProductTileProps) {
  return (
    <div className=" w-[392px] border border-gray-300 rounded-lg overflow-hidden shadow-sm flex flex-col bg-white shrink-0">
      {/* Obrazek Kafelka */}
      <div className="relative aspect-[16/9] bg-gray-200">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 392px) 100vw, 50vw"
            priority
          />
        )}
        {!imageUrl && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            16:9
          </div>
        )}
      </div>

      {/* Treść kafelka */}
      <div className="p-4 flex flex-col gap-3 self-stretch items-start">
        <h3 className="font-bold text-xl leading-[120%] pb-4 text-gray-900">
          {title}
        </h3>
        <div className=" w-full h-[1px] bg-gray-300"></div>
        <div className="flex items-baseline gap-1">
          <p className="text-sm text-gray-900 leading-[150%]">cena od</p>
          <h3 className=" text-xl font-bold text-gray-900 leading-[120%]">
            {price},00 zł
          </h3>
        </div>
        <Button
          onClick={() => {}}
          icon={FiArrowRight}
          variant="outlineSecondary"
          label="Czytaj więcej"
        />
        {/* → */}
      </div>
    </div>
  );
}
