import { HeroSection } from "./main/HeroSection";

export const revalidate = 60;

interface WPPage {
  acf: {
    hero_title?: string;
    hero_subtitle?: string;
    hero_button_text?: string;
    hero_image?: {
      url: string;
      alt?: string;
    };
  };
  // inne pola, jeżeli potrzebne
}

export default async function HomePage() {
  const res = await fetch(
    "http://localhost/chmal.pl/wp-json/wp/v2/pages?slug=strona-glowna",
    {
      next: { revalidate: 60 },
    }
  );

  const pages: WPPage[] = await res.json();
  const page = pages[0];

  const heroData = [
    {
      title: page.acf?.hero_title ?? "",
      subtitle: page.acf?.hero_subtitle ?? "",
      buttonText: page.acf?.hero_button_text ?? "",
      imageUrl: page.acf?.hero_image?.url ?? "",
      imageAlt: page.acf?.hero_image?.alt ?? "",
    },
  ];

  // Możesz też dodać kolejne sekcje jako osobne tablice,

  return (
    <main>
      <HeroSection data={heroData} />
    </main>
  );
}
