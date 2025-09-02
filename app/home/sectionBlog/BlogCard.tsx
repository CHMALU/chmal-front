"use client";

import { TypographyBody, TypographyH3 } from "@/app/components/Typography";
import Image from "next/image";
import Link from "next/link";
import { BlogItem } from "@/type/acf";

interface BlogCardProps {
  id: number | string;
  data: BlogItem;
}

export function BlogCard({ id, data }: BlogCardProps) {
  const { blogImage, blogDate, blogTitle, blogContent } = data;

  const firstParagraphMatch = blogContent.match(/<p>(.*?)<\/p>/i);
  const previewText = firstParagraphMatch
    ? firstParagraphMatch[1]
    : blogContent.replace(/<[^>]+>/g, " ");

  return (
    <article className="relative group flex flex-col items-start grow  basis-0 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow max-w-[394px]">
      <Link
        href={`/blog/${id}`}
        className="absolute inset-0 z-10 cursor-pointer"
        aria-label={`Przejdź do wpisu ${blogTitle}`}
      />

      <div className="relative max-w-[394px] flex flex-col grow">
        <div className="max-w-[394px] h-[394px] bg-gray-200 rounded-lg overflow-hidden">
          <Image
            src={blogImage.url}
            alt={blogImage.alt ?? blogTitle}
            width={394}
            height={394}
            loading="lazy"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="flex flex-col grow items-start gap-1 self-stretch py-2 px-3">
          <TypographyBody className="text-gray-600 text-xs uppercase">
            {new Date(blogDate).toLocaleDateString("pl-PL", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </TypographyBody>

          <div className="flex flex-col grow gap-4 items-start justify-between self-stretch">
            <div className="flex flex-col gap-4 items-start self-stretch">
              <TypographyH3>{blogTitle}</TypographyH3>

              <TypographyBody className="line-clamp-2 z-20">
                {previewText}
              </TypographyBody>
            </div>

            <span className="relative mb-1 text-brand-secondary-500 font-bold leading-[150%] after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-brand-secondary-500 after:transition-all after:duration-300 group-hover:after:w-full">
              Czytaj więcej
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
