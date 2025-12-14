// app/components/SectionTestimonials.tsx
import Container from "@/app/components/Container";
import { Header } from "@/app/components/Header";
import Button from "@/app/components/Button";
import { ButtonSettings, TestimonialsData } from "@/type/acf";
import { getGoogleReviews, Review } from "@/app/libs/googleReviews";
import SectionReviews from "./SectionReviews";

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
  const reviews: Review[] = await getGoogleReviews();
  const shuffled = shuffleArray(reviews);

  const { title, subtitle } = data;
  const { buttonText, buttonLink } = buttonSettings;

  return (
    <section className="py-12 relative">
      <Container>
        <div className="flex flex-col items-center md:items-start">
          <div className="sm:absolute flex flex-col max-w-[498px] shrink-0 gap-6 items-center md:items-start">
            <Header
              title={title}
              subtitle={subtitle}
              left
              noPaddingX
              noPaddingY
            />
            <div className="hidden md:block">
              <Button label={buttonText} href={buttonLink} />
            </div>
          </div>
          <SectionReviews reviews={shuffled} />
        </div>
      </Container>
    </section>
  );
}
