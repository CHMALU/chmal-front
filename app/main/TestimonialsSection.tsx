"use client";

import Container from "../components/Container";
import useGoogleReviews from "../hooks/useGoogleReviews";
import Image from "next/image";

interface NumberItem {
  value: string;
  label: string;
}
interface TestimonialsSectionProps {
  data2: NumberItem[];
}

export function TestimonialsSection({ data2 }: TestimonialsSectionProps) {
  const { data } = useGoogleReviews({ fetchRating: false, fetchReviews: true });
  const reviews = data?.reviews || [];

  return (
    <section className="py-6">
      <Container>
        <h2 className="text-2xl font-bold mb-6">Opinie klientów</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="border rounded-2xl p-4 shadow-md bg-white flex flex-col items-start"
            >
              <div className="flex items-center mb-4">
                <Image
                  src={review.profile_photo_url}
                  alt={review.author_name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div className="ml-3">
                  <p className="font-semibold">{review.author_name}</p>
                  <p className="text-sm text-gray-500">
                    {review.relative_time_description}
                  </p>
                </div>
              </div>
              <div className="flex mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>{i < review.rating ? "⭐" : "☆"}</span>
                ))}
              </div>
              <p className="text-gray-700 whitespace-pre-line">{review.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
