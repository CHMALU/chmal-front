"use client";

import Container from "../../components/Container";
import { Header } from "../../components/Header";
import { BlogCard } from "./BlogCard";

interface CTAItem {
  title: string;
  subtitle: string;
  cta_button: string;
}
interface SectionBlogProps {
  data?: CTAItem;
}

export function SectionBlog({ data }: SectionBlogProps) {
  return (
    <section className="py-16">
      <Container>
        <div className=" flex flex-col flex-wrap self-stretch content-center items-center justify-center">
          <Header
            title="Porady i nowości ze świata motoryzacji"
            subtitle="Odkryj praktyczne wskazówki, ciekawostki i aktualności, które pomogą Ci lepiej zadbać o Twój samochód."
          />
          <div className="flex justify-center items-center gap-8">
            <BlogCard />
            <BlogCard />
            <BlogCard />
          </div>
        </div>
      </Container>
    </section>
  );
}
