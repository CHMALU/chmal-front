import { useState } from "react";
import { TypographyBody } from "./Typography";

interface PaginationDotsProps {
  maxDots?: number;
  withCounter?: boolean;
}

export default function PaginationDots({
  maxDots = 3,
  withCounter = false,
}: PaginationDotsProps) {
  const [active, setActive] = useState(0);
  const dots = Array.from({ length: maxDots }, (_, i) => i);

  const Dots = (
    <div className="flex justify-center gap-4">
      {dots.map((_, index) => (
        <button
          key={index}
          onClick={() => setActive(index)}
          aria-label={`Pokaż zdjęcie ${index + 1}`}
          className={`w-3 h-3 rounded-full transition-colors
            ${active === index ? "bg-gray-900" : "bg-gray-300"}
            hover:bg-gray-600 cursor-pointer duration-300`}
        />
      ))}
    </div>
  );

  if (!withCounter) return Dots;

  return (
    <div className="w-[603px] flex justify-center items-center gap-32">
      {Dots}
      <div className="flex gap-4">
        <TypographyBody className="font-bold">{active + 1}</TypographyBody>
        <TypographyBody>/</TypographyBody>
        <TypographyBody>{maxDots}</TypographyBody>
      </div>
    </div>
  );
}
