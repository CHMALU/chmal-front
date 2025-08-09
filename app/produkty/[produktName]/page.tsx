import Container from "@/app/components/Container";

// app/produkty/[produktName]/page.tsx
interface IParams {
  produktName: string;
}

export default async function Template({ params }: { params: IParams }) {
  // 1. Zamieniamy myślniki na spacje…
  const withSpaces = params.produktName.replace(/-/g, " ");
  // 2. …a potem dużą literę na początku całego ciągu
  const title = withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);

  return (
    <section className="relative p-4">
      <Container>
        <h1 className="text-3xl font-bold">{title}</h1>
      </Container>{" "}
      {/* np. dalsze szczegóły produktu */}
    </section>
  );
}
