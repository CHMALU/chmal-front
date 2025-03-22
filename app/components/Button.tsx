"use client";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className=" flex h-12 py-3 px-6 items-center shrink-0 rounded-lg bg-brand-primary-500 font-bold leading-[150%] gap-36"
    >
      {label}
    </button>
  );
};

export default Button;
