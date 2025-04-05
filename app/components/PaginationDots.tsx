import { useState } from "react";

export default function PaginationDots() {
  const [active, setActive] = useState(0);
  const dots = [0, 1, 2];

  return (
    <div className="flex w-full justify-center gap-4">
      {dots.map((dot, index) => (
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
}
