"use client";
import Image from "next/image";
import Container from "../components/Container";

interface HeroItem {
  title: string;
  subtitle: string;
  buttonText: string;
  imageUrl: string;
  imageAlt: string;
}

interface HeroSectionProps {
  data: HeroItem[];
}

export function HeroSection({ data }: HeroSectionProps) {
  return (
    <section className=" relative h-[100vh] w-full">
      {data.map((item, index) => (
        <div key={index} className=" relative w-full h-full">
          {item.imageUrl && (
            <Image
              src={item.imageUrl}
              alt={item.imageAlt}
              fill
              style={{ objectFit: "cover" }}
              sizes="100vw"
              priority
            />
          )}
          <Container>
            <h2>{item.title}</h2>
            <p>{item.subtitle}</p>
            <button>{item.buttonText}</button>
          </Container>
        </div>
      ))}
    </section>
  );
}
