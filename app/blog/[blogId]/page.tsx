import Container from "@/app/components/Container";
import { getOneById, getPageACF } from "@/app/libs/wp";
import { TypographyBody } from "@/app/components/Typography";
import { WPBlogEntry } from "@/type/acf";
import BlogPost from "./BlogPost";
import { SectionCatalog } from "@/app/home/sectionCatalog/SectionCatalog";
import { SectionBlog } from "@/app/home/sectionBlog/SectionBlog";

type IParams = { blogId: string };
type PageProps = { params: Promise<IParams> };

export default async function Page({ params }: PageProps) {
  const { blogId } = await params;

  const id = Number(blogId);

  if (isNaN(id)) {
    return (
      <main>
        <Container>
          <TypographyBody>Nieprawidłowy identyfikator wpisu.</TypographyBody>
        </Container>
      </main>
    );
  }

  const item = await getOneById<WPBlogEntry>("blog", id);

  if (!item) {
    return (
      <main>
        <Container>
          <TypographyBody>Nie ma takiego wpisu na blogu.</TypographyBody>
        </Container>
      </main>
    );
  }

  const { productsData, priceCatalogData, blogData } = await getPageACF(
    "strona-glowna"
  );

  return (
    <main>
      <BlogPost data={item.acf.blogData} />
      <SectionCatalog
        variant="uslugi"
        data={productsData}
        priceCatalogData={priceCatalogData}
      />
      <SectionBlog data={blogData} />
    </main>
  );
}
