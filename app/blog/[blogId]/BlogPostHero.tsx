import Container from "@/app/components/Container";
import { TypographyH1 } from "@/app/components/Typography";
import { BlogItem } from "@/type/acf";
import Image from "next/image";

interface BlogPostHeroProps {
  data: BlogItem;
}

export default async function BlogPostHero({ data }: BlogPostHeroProps) {
  const { blogTitle, blogImage } = data;
  const { url, alt } = blogImage;

  return (
    <section>
      <div className="relative mb-36 h-[35rem] w-full">
        <Image
          src={url}
          alt={alt ?? blogTitle}
          fill
          priority
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-gray-900/80" />

        <Container>
          <div className="relative z-10 h-[35rem] flex items-center justify-center">
            <TypographyH1 className="text-white text-center">
              {blogTitle}
            </TypographyH1>
          </div>
        </Container>
      </div>
    </section>
  );
}
