import { getList } from "@/app/libs/wp";
import Container from "../../components/Container";
import { Header } from "../../components/Header";
import { BlogCard } from "./BlogCard";
import { WPBlogEntry } from "@/type/acf";

interface SectionBlogProps {
  data: {
    title: string;
    subtitle: string;
  };
}

export async function SectionBlog({ data }: SectionBlogProps) {
  const { title, subtitle } = data;
  const entries = await getList<WPBlogEntry>("blog");

  const latestThree = entries
    .sort(
      (a, b) =>
        new Date(b.acf.blogData.blogDate).getTime() -
        new Date(a.acf.blogData.blogDate).getTime()
    )
    .slice(0, 3);

  return (
    <section className="pb-16 pt-4">
      <Container>
        <div className=" flex flex-col flex-wrap self-stretch content-center items-center justify-center">
          <Header title={title} subtitle={subtitle} />
          <div className="flex justify-center gap-8">
            {latestThree.map((entry) => (
              <BlogCard
                key={entry.id}
                id={entry.id}
                data={entry.acf.blogData}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
