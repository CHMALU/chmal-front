"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

interface TypographyH1Props extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
  children: React.ReactNode;
  small?: boolean; // <- nowy prop
}

export function TypographyH1({
  children,
  className,
  small = false,
  ...props
}: TypographyH1Props) {
  return (
    <h1
      className={clsx(
        "text-gray-50 font-bold leading-[120%]",
        small ? "text-xl " : "text-3xl sm:text-5xl",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

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
      md: "text-base",
      lg: "text-2xl",
      xl: "sm:text-5xl text-3xl",
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
