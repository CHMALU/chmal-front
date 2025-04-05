"use client";

import React from "react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  left?: boolean;
}

export function Header({ title, subtitle, left }: HeaderProps) {
  return (
    <div
      className={`py-12 px-[120px] w-full flex flex-col gap-4 self-stretch ${
        left ? "items-start text-left" : "items-center text-center"
      }`}
    >
      <h2 className="text-4xl font-bold leading-[120%] text-gray-900">
        {title}
      </h2>
      {subtitle && <p className="text-gray-700">{subtitle}</p>}
    </div>
  );
}
