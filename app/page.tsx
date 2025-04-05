import { SectionBrands } from "./main/SectionBrands";
import { SectionHero } from "./main/SectionHero";
import { SectionNumbers } from "./main/SectionNumbers";
import { SectionServices } from "./main/SectionServices";

export const revalidate = 60;

interface WPPage {
  acf: {
    // Hero section
    hero_title?: string;
    hero_subtitle?: string;
    hero_button_text?: string;
    hero_image?: {
      url: string;
      alt?: string;
    };

    // Numbers section
    years_value?: string;
    years_label?: string;

    clients_value?: string;
    clients_label?: string;

    time_value?: string;
    time_label?: string;
  };
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

  const heroData = {
    title: page.acf?.hero_title ?? "",
    subtitle: page.acf?.hero_subtitle ?? "",
    buttonText: page.acf?.hero_button_text ?? "",
    imageUrl: page.acf?.hero_image?.url ?? "",
    imageAlt: page.acf?.hero_image?.alt ?? "",
  };

  const numbers = [
    {
      value: page.acf?.years_value ?? "",
      label: page.acf?.years_label ?? "",
    },
    {
      value: page.acf?.clients_value ?? "",
      label: page.acf?.clients_label ?? "",
    },
    {
      value: page.acf?.time_value ?? "",
      label: page.acf?.time_label ?? "",
    },
  ];

  return (
    <main>
      <SectionHero data={heroData} />
      <SectionNumbers data={numbers} />
      <SectionServices />
      <SectionServices />
      <SectionBrands />
    </main>
  );
}
