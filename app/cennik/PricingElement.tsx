import { VariantACF, WPServiceEntry } from "@/type/acf";
import Container from "../components/Container";
import { getOneBySlug } from "../libs/wp";

export default async function PricingElement({ slug }: { slug: string }) {
  const item = await getOneBySlug<WPServiceEntry>("uslugi", slug);
  console.log(item);

  if (!item) {
    return (
      <section>
        <Container>
          <p>Brak danych dla {slug}</p>
        </Container>
      </section>
    );
  }

  const variants = Array.from({ length: 10 }, (_, i) => {
    const v = item.acf.catalogItem[
      `variant${i + 1}` as keyof typeof item.acf.catalogItem
    ] as VariantACF;

    return v && v.title && v.title.trim() !== "" ? v : null;
  }).filter(Boolean);

  return (
    <section>
      <Container>
        <h2 className="text-xl font-bold mb-4">
          {item.acf.catalogItem.name} ----- style do poprawienia
        </h2>
        <div className="space-y-4">
          {variants.map((v, idx) => (
            <div key={idx} className="border-b pb-2">
              <h3 className="font-semibold">{v?.title}</h3>
              {v?.subtitle && (
                <p className="text-sm text-gray-600">{v.subtitle}</p>
              )}
              <div className="text-sm">
                {v?.price && <span className="mr-4">{v.price} zł</span>}
                {v?.time && <span>{v.time} min</span>}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
