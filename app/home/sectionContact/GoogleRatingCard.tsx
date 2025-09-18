import { TypographyBody } from "@/app/components/Typography";
import StarRating from "@/app/components/Star";
import Image from "next/image";

interface GoogleRatingCardProps {
  rating: number; // np. 4.7
}

export default function GoogleRatingCard({ rating }: GoogleRatingCardProps) {
  return (
    <div className="flex flex-col justify-center items-start gap-1 p-[19px] rounded-[9.5px] custom-shadow">
      <div className="flex items-center gap-6">
        <TypographyBody className="hidden sm:block text-yellow-500 text-center text-[28.96px] font-extrabold plus-jakarta">
          {rating.toFixed(1)}
        </TypographyBody>
        <StarRating rating={rating} size={33} />
      </div>
      <div className="flex items-center gap-6">
        <Image
          src="/svg/google-logo.svg"
          alt="Google logo"
          width={34}
          height={34}
          priority
        />
        <div className="w-32">
          <TypographyBody className="text-gray-700 text-[19px] font-bold plus-jakarta">
            Google
          </TypographyBody>
          <TypographyBody className="text-blue-500 text-[14.5px] plus-jakarta">
            Customer Reviews
          </TypographyBody>
        </div>
      </div>
    </div>
  );
}
