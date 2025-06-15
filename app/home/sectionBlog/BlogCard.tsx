"use client";
import { TypographyBody, TypographyH3 } from "@/app/components/Typography";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  data?: string;
  slug?: string;
}

export function BlogCard({ data, slug = "sample-post" }: BlogCardProps) {
  return (
    <article className="relative group flex flex-col items-start grow shrink-0 basis-0 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Cały komponent jako link, ale bez dublowania <a> */}
      <Link
        href={`/blog/${slug}`}
        className="absolute inset-0 z-10 cursor-pointer"
        aria-label="Przejdź do wpisu blogowego"
      />

      <div className="relative w-[394px]">
        {/* Obrazek */}
        <div className="w-[394px] h-[394px] bg-gray-200 rounded-lg overflow-hidden">
          <Image
            src={
              data ??
              "http://localhost/chmal.pl/wp-content/uploads/2025/03/IMG.pngg"
            }
            alt="Miniaturka wpisu blogowego"
            width={394}
            height={394}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>

        {/* Teksty */}
        <div className="flex flex-col items-start gap-1 self-stretch py-2 px-3">
          <TypographyBody className="text-gray-600 text-xs uppercase">
            28 stycznia 2024
          </TypographyBody>

          <div className="flex flex-col gap-4 items-start self-stretch ">
            <TypographyH3>
              Id quae similique et laudantium ea quia dolor quae in.
            </TypographyH3>

            <TypographyBody className="line-clamp-2 z-20">
              Et ut quo molestias sint qui quisquam adipisci et reprehenderit.
              Voluptatem accusamus quibusdam cupiditate labore. Voluptatem esse
              sed magnam tenetur ipsa et voluptatem. Nobis repellendus aut
              distinctio esse voluptas fugit atque labore ut. Quis aut quisquam
              sit omnis dolorem. Nulla sed amet voluptas deleniti dolor fugiat
              voluptas et ut.
            </TypographyBody>

            <span className="relative  mb-1 text-brand-secondary-500 font-bold leading-[150%] after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-brand-secondary-500 after:transition-all after:duration-300 group-hover:after:w-full">
              Read more
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
