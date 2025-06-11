import React from "react";
import { FaStar } from "react-icons/fa";

interface StarRatingProps {
  rating: number;
  totalStars?: number;
  size?: number;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  totalStars = 5,
  size = 24,
}) => {
  const safeRating = Math.max(0, Math.min(rating, totalStars));

  const stars = Array.from({ length: totalStars }, (_, i) => {
    const fillAmount = Math.max(0, Math.min(safeRating - i, 1));
    const fillWidth = `${fillAmount * 100}%`;

    return (
      <div
        key={i}
        className="relative inline-block"
        style={{ width: size, height: size }}
      >
        {/* Background filled star in gray */}
        <FaStar size={size} className="text-gray-400" />

        {/* Colored fill overlay */}
        <div
          className="absolute top-0 left-0 overflow-hidden"
          style={{ width: fillWidth, height: size }}
        >
          <FaStar size={size} className="text-yellow-500" />
        </div>
      </div>
    );
  });

  return <div className="flex items-center space-x-[2px]">{stars}</div>;
};

export default StarRating;
