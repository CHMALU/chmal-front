"use client";

import { useEffect, useState, useMemo } from "react";
import ReviewCard from "./ReviewCard";
import { Review } from "@/app/libs/googleReviews";

type SectionReviewsProps = {
  reviews: Review[];
};

function useWindowWidth() {
  const [w, setW] = useState<number | null>(null);
  useEffect(() => {
    const handle = () => setW(window.innerWidth);
    handle();
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);
  return w;
}

export default function SectionReviews({ reviews }: SectionReviewsProps) {
  const w = useWindowWidth();

  // domyślnie (przed pierwszym pomiarem) pokaż 5, żeby nie migało
  const count = useMemo(() => {
    if (w == null) return 5; // SSR/hydration safety
    if (w >= 1024) return 5; // lg
    if (w >= 768) return 4; // md
    return 3; // < md
  }, [w]);

  const visible = reviews.slice(0, count);

  if (visible.length === 0) {
    return (
      <p className="text-gray-400 col-span-full">
        Brak opinii do wyświetlenia.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6 flex-wrap md:h-[924px] lg:h-[778px] md:self-end items-center md:justify-end md:content-end">
      <div className="sm:h-[200px] invisible" />

      {visible.map((review) => (
        <ReviewCard
          key={review.id}
          profile_photo_url={review.profile_photo_url ?? undefined}
          author_name={review.author_name ?? "Anonim"}
          relative_time_description={review.relative_time_description ?? ""}
          text={review.text}
        />
      ))}
    </div>
  );
}
