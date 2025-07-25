"use client";

import React from "react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  left?: boolean;
  textWhite?: boolean;
  noPaddingY?: boolean;
  noPaddingX?: boolean;
}

export function Header({
  title,
  subtitle,
  left,
  textWhite,
  noPaddingY,
  noPaddingX,
}: HeaderProps) {
  return (
    <div
      className={`flex flex-col gap-4 self-stretch ${
        left ? "items-start text-left" : "items-center text-center"
      } ${noPaddingY ? "" : "py-12"} ${noPaddingX ? "" : "px-[120px]"}`}
    >
      <h2
        className={`text-4xl font-bold leading-[120%] ${
          textWhite ? "text-gray-50" : "text-gray-900"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`${textWhite ? "text-gray-50" : "text-gray-700"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
