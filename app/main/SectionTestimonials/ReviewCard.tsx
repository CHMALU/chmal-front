// app/main/SectionTestimonials/ReviewCard.tsx
import { TypographyBody } from "@/app/components/Typography";
import Image from "next/image";

interface ReviewCardProps {
  profile_photo_url?: string; // URL do zdjęcia autora
  author_name: string; // Imię i nazwisko
  relative_time_description?: string; // Ile temu wystawiono opinię (np. "2 tygodnie temu")
  rating: number; // Ilość gwiazdek (1–5)
  text: string; // Treść opinii
}

export default function ReviewCard({
  profile_photo_url,
  author_name,
  relative_time_description,
  rating,
  text,
}: ReviewCardProps) {
  return (
    <div className="flex flex-col w-[286px] p-4 items-start gap-6 rounded-lg border-[1px] border-gray-300 bg-white">
      <div className="max-h-[400px] overflow-y-scroll">
        <TypographyBody>{text}</TypographyBody>
      </div>
      <div className="flex items-start gap-3">
        {profile_photo_url ? (
          <Image
            src={profile_photo_url}
            alt={author_name}
            width={48}
            height={48}
            className="flex justify-center items-center rounded-lg bg-gray-100 p-1.5"
          />
        ) : (
          <div className="w-12 h-12 rounded-lg bg-gray-200" />
        )}
        <div className="flex flex-col items-start gap-1">
          <TypographyBody className="font-bold text-gray-900 leading-[150%]">
            {author_name}
          </TypographyBody>
          <TypographyBody className="text-sm text-gray-900 leading-[150%]">
            {relative_time_description}
          </TypographyBody>
        </div>
      </div>
      {/*  */}
    </div>
  );
}
