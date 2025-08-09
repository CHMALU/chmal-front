// app/components/SectionTestimonials.tsx
import Container from "@/app/components/Container";
import { Header } from "@/app/components/Header";
import Button from "@/app/components/Button";
import ReviewCard from "./ReviewCard";
import { ButtonSettings, TestimonialsData } from "@/type/acf";
import { getGoogleReviews } from "@/app/libs/googleReviews";
import { google_reviews } from "@prisma/client";

interface SectionTestimonialsProps {
  data: TestimonialsData;
  buttonSettings: ButtonSettings;
}

// Fisher–Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export async function SectionTestimonials({
  data,
  buttonSettings,
}: SectionTestimonialsProps) {
  const reviews: google_reviews[] = await getGoogleReviews();
  const shuffled = shuffleArray(reviews);

  const { title, subtitle } = data;
  const { buttonText, buttonLink } = buttonSettings;

  return (
    <section className="py-12 relative">
      <Container>
        <div className="absolute flex flex-col w-[498px] shrink-0 gap-6 items-start">
          <Header
            title={title}
            subtitle={subtitle}
            left
            noPaddingX
            noPaddingY
          />
          <Button label={buttonText} href={buttonLink} />
        </div>

        <div className="flex flex-col gap-6 flex-wrap h-[778px] justify-end content-end">
          <div className="h-[200px] invisible" />

          {shuffled.length === 0 ? (
            <p className="text-gray-400 col-span-full">
              Brak opinii do wyświetlenia.
            </p>
          ) : (
            shuffled.map((review) => (
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
            ))
          )}
        </div>
      </Container>
    </section>
  );
}
