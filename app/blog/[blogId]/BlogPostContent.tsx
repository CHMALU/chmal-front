import Container from "@/app/components/Container";
import { TypographyBody, TypographyH3 } from "@/app/components/Typography";
import { splitParagraphs } from "@/app/libs/formaters";
import { BlogItem } from "@/type/acf";
import { FaRegLightbulb } from "react-icons/fa";
import { HiLightBulb } from "react-icons/hi";
import { MdLightbulbOutline, MdOutlineLightbulb } from "react-icons/md";

interface BlogPostContentProps {
  data: BlogItem;
}

export default async function BlogPostContent({ data }: BlogPostContentProps) {
  const { blogTitle, blogContent, blogDate } = data;

  const paragraphs = splitParagraphs(blogContent);

  return (
    <section>
      <Container>
        <div className="flex gap-8 items-start py-6">
          <div className="flex flex-col justify-center items-start gap-6">
            <div className="flex flex-col items-start gap-2 self-stretch">
              <TypographyBody className="text-xs font-bold uppercase text-gray-600">
                {new Date(blogDate).toLocaleDateString("pl-PL", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </TypographyBody>
              <TypographyH3 size={"sm"}>{blogTitle}</TypographyH3>
            </div>

            <div className="flex flex-col gap-2">
              {paragraphs.map((p, i) => {
                // Nagłówek (np. **Podsumowanie**)
                if (p.startsWith("**") && p.endsWith("**")) {
                  const text = p.replace(/\*\*/g, "");
                  return (
                    <TypographyH3 key={i} className="text-gray-700" size={"md"}>
                      {text}
                    </TypographyH3>
                  );
                }

                // Separator (np. ---)
                if (p.trim() === "---") {
                  return (
                    <div key={i} className="h-[1px] w-full bg-gray-300 my-3" />
                  );
                }

                // Normalny paragraf
                return (
                  <TypographyBody
                    key={i}
                    className="whitespace-pre-line text-gray-500"
                  >
                    {p}
                  </TypographyBody>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col w-[18rem] justify-center items-start gap-6 shrink-0 shadow-sm hover:shadow-md transition-shadow p-4">
            <div className="flex items-center gap-3">
              <HiLightBulb className=" text-brand-primary-500 h-8 w-8" />
              <TypographyBody className="text-gray-500 font-bold text-sm">
                Ciekawostka prosto z serwisu
              </TypographyBody>
            </div>
            <TypographyBody className="text-gray-500 text-sm">
              Mało kto wie, że jazda na oponach niedopasowanych do sezonu
              zwiększa opory toczenia i zużycie paliwa. Letnie opony zimą tracą
              przyczepność, a zimowe latem szybciej się ścierają i podnoszą
              spalanie. Regularna wymiana to inwestycja w bezpieczeństwo i
              oszczędności.
            </TypographyBody>
          </div>
        </div>
      </Container>
    </section>
  );
}
