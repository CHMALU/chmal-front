"use client";
import { RiMenu4Line, RiCloseLine } from "react-icons/ri";

export function AnimatedMenuIcon({
  open,
  size = 30,
  className = "",
}: {
  open: boolean;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className="relative inline-block"
      style={{ width: size, height: size }}
    >
      <RiMenu4Line
        size={size}
        className={`absolute inset-0 transition-all duration-300 ease-out ${
          open
            ? "opacity-0 -rotate-90 scale-75"
            : "opacity-100 rotate-0 scale-100"
        } ${className}`}
        aria-hidden
      />
      <RiCloseLine
        size={size}
        className={`absolute inset-0 transition-all duration-300 ease-out ${
          open
            ? "opacity-100 rotate-0 scale-100"
            : "opacity-0 rotate-90 scale-75"
        } ${className}`}
        aria-hidden
      />
    </span>
  );
}
