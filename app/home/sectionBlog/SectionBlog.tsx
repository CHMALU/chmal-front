import { getList } from "@/app/libs/wp";
import Container from "../../components/Container";
import { Header } from "../../components/Header";
import { BlogData, WPBlogEntry } from "@/type/acf";
import Button from "@/app/components/Button";
import ClientBlogSlice from "./ClientBlogSlice";

interface SectionBlogProps {
  data: BlogData;
}

export async function SectionBlog({ data }: SectionBlogProps) {
  const { title, subtitle } = data;
  const entries = await getList<WPBlogEntry>("blog");

  const sorted = entries.sort(
    (a, b) =>
      new Date(b.acf.blogData.blogDate).getTime() -
      new Date(a.acf.blogData.blogDate).getTime()
  );

  const buttonText = "Zobacz wsyzstkie wpisy";
  const buttonLink = "/blog";
  return (
    <section className="pb-16 pt-4">
      <Container>
        <div className=" flex flex-col self-stretch content-center items-center justify-center">
          <div className="flex flex-col gap-6 items-center py-12">
            <Header noPaddingY title={title} subtitle={subtitle} />
            <Button label={buttonText} href={buttonLink} />
          </div>
          <div className="flex justify-center gap-8">
            <ClientBlogSlice entries={sorted} />
          </div>
        </div>
      </Container>
    </section>
  );
}
