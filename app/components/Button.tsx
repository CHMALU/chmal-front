"use client";

import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  outline?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  outline,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative cursor-pointer h-12 py-3 px-6 flex gap-3 items-center justify-center rounded-lg font-bold leading-[150%] duration-300 ${
        outline
          ? "self-stretch text-brand-secondary-500 border-2 border-brand-secondary-500 hover:bg-gray-100"
          : "bg-brand-primary-500 hover:bg-brand-primary-400 text-gray-900 shrink-0"
      } `}
    >
      {label}
      {Icon && <Icon size={24} className="" />}
    </button>
  );
};

export default Button;
