"use client";

interface HamburgerMenuProps {}

export function HamburgerMenu({}: HamburgerMenuProps) {
  return (
    <div className=" absolute h-screen w-full bg-white z-10">
      <div className="flex flex-col items-start self-stretch"></div>
    </div>
  );
}
