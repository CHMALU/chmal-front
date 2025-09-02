import Container from "@/app/components/Container";
import { getOneById } from "@/app/libs/wp";
import { TypographyBody } from "@/app/components/Typography";

type IParams = { blogId: string };
type PageProps = { params: Promise<IParams> };

export default async function Page({ params }: PageProps) {
  const { blogId } = await params; // ✅ trzeba awaitować

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

  const item = await getOneById("blog", id);

  if (!item) {
    return (
      <main>
        <Container>
          <TypographyBody>Nie ma takiego wpisu na blogu.</TypographyBody>
        </Container>
      </main>
    );
  }

  return (
    <main>
      <Container>
        <TypographyBody>{item.title?.rendered ?? `Wpis #${id}`}</TypographyBody>
      </Container>
    </main>
  );
}
