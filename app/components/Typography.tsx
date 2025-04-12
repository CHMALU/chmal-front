interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

export function TypographyH3({ children }: TypographyProps) {
  return (
    <h3 className=" text-gray-900 text-xl font-bold leading-[120%]">
      {children}
    </h3>
  );
}

export function TypographyBody({ children, className }: TypographyProps) {
  return (
    <p className={`leading-[150%] ${className ?? "text-gray-600 font-normal"}`}>
      {children}
    </p>
  );
}
