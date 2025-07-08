import Container from "../components/Container";
import ProductTile from "../components/ProductTile";
import { TypographyBody, TypographyH3 } from "../components/Typography";

interface SectionAllProductsProps {
  text?: undefined;
}

export function SectionAllProducts({ text }: SectionAllProductsProps) {
  return (
    <section className="relative">
      <Container>
        <div className="py-12 flex flex-col mx-auto gap-4 max-w-5xl">
          <TypographyH3>Wszystkie produkty</TypographyH3>
          <div className="">
            <TypographyBody>
              Oferujemy szeroką gamę produktów motoryzacyjnych, w tym opony i
              felgi do samochodów osobowych, ciężarowych, maszyn rolniczych oraz
              motocykli. Nasze produkty pochodzą od renomowanych producentów
              takich jak Michelin, Goodyear, Continental, Alcar, zapewniając
              doskonałą jakość i niezawodność. W naszym asortymencie znajdziesz
              opony o różnych parametrach felgi stalowe i aluminiowe, a także...
            </TypographyBody>
          </div>
        </div>
        <div
          className="
          grid
          justify-center
          gap-x-8 gap-y-24
          py-12
          [grid-template-columns:repeat(auto-fit,_392px)]
        "
        >
          {Array.from({ length: 8 }).map((_, idx) => (
            <ProductTile
              key={idx}
              title="Opony zimowe 205/55 R16"
              price={123}
              imageUrl="http://localhost/chmal.pl/wp-content/uploads/2025/03/IMG.png"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
