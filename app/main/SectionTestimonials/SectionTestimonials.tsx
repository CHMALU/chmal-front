"use client";

import { useEffect } from "react";
import Button from "../../components/Button";
import Container from "../../components/Container";
import { Header } from "../../components/Header";
import { useGoogleReviews } from "../../hooks/useGoogleReviews";
import ReviewCard from "./ReviewCard";

interface NumberItem {
  value: string;
  label: string;
}

interface SectionTestimonialsProps {
  data2: NumberItem[];
}

export function SectionTestimonials({ data2 }: SectionTestimonialsProps) {
  const { reviews, loading, error } = useGoogleReviews();

  useEffect(() => {
    if (!loading && reviews.length > 0) {
      console.log("Reviews:", reviews);
    }
  }, [loading, reviews]);

  return (
    <section className="py-6">
      <Container>
        <div className="absolute flex flex-col w-[498px] shrink-0 gap-6 items-start">
          <Header
            title="Klienci nas polecają"
            subtitle="Twoje zaufanie to nasza największa motywacja – sprawdź, co mówią o nas nasi klienci."
            left
            noPaddingX
            noPaddingY
          />
          <Button label="Umów wizytę online" onClick={() => {}} />
        </div>

        <div className="flex flex-col gap-6 flex-wrap h-[778px] justify-end content-end">
          {loading && <p className="text-gray-500">Ładowanie opinii...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading &&
            !error &&
            reviews.map((review) => (
              <ReviewCard
                key={review.id}
                profile_photo_url={review.profile_photo_url ?? undefined}
                author_name={review.author_name ?? "Anonim"}
                relative_time_description={
                  review.relative_time_description ?? ""
                }
                rating={review.rating ?? 0}
                text={review.TEXT ?? ""}
              />
            ))}

          {!loading && !error && reviews.length === 0 && (
            <p className="text-gray-400 col-span-full">
              Brak opinii do wyświetlenia.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
