"use client";

import Link from "next/link";
import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  href?: string;
  variant?: "primary" | "primaryGray" | "outlineSecondary" | "outlinePrimary";
  icon?: IconType;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  href,
  variant = "primary",
  icon: Icon,
  className,
}) => {
  const baseClasses =
    "relative cursor-pointer h-12 py-3 px-6 flex gap-3 items-center justify-center rounded-lg font-bold leading-[150%] duration-300";

  const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary:
      "bg-brand-primary-500 hover:bg-brand-primary-400 text-gray-900 shrink-0",
    primaryGray: "bg-gray-400 hover:bg-gray-300 text-gray-900 shrink-0",
    outlineSecondary:
      "self-stretch text-brand-secondary-500 border-2 border-brand-secondary-500 hover:bg-gray-100",
    outlinePrimary:
      "self-stretch text-brand-primary-500 border-2 border-brand-primary-500 hover:text-brand-primary-400 hover:border-brand-primary-400",
  };

  const classes = `${className ?? ""} ${baseClasses} ${
    variantClasses[variant]
  }`;
  const content = (
    <>
      {label}
      {Icon && <Icon size={24} />}
    </>
  );

  if (href) {
    const isExternal = /^https?:\/\//.test(href);
    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      );
    }
    // internal
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  // Domyślnie <button> do akcji
  return (
    <button onClick={onClick} className={classes}>
      {content}
    </button>
  );
};

export default Button;
