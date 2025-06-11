"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const typographyH3Variants = cva("font-bold leading-[120%]", {
  variants: {
    variant: {
      default: "text-gray-900",
      secondary: "text-gray-100",
      accent: "text-brand-primary-500",
    },
    size: {
      default: "text-xl",
      sm: "text-lg",
      lg: "text-2xl",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface TypographyH3Props
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof typographyH3Variants> {
  /**
   * Dodatkowe klasy Tailwind do nadpisania lub rozszerzenia
   */
  className?: string;
}

export function TypographyH3({
  children,
  variant,
  size,
  className,
  ...props
}: TypographyH3Props) {
  return (
    <h3
      className={clsx(typographyH3Variants({ variant, size }), className)}
      {...props}
    >
      {children}
    </h3>
  );
}

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

export function TypographyBody({ children, className }: TypographyProps) {
  return (
    <p
      className={clsx(
        "leading-[150%]",
        className ?? "text-gray-600 font-normal"
      )}
    >
      {children}
    </p>
  );
}
