import Image from "next/image";
import Container from "../components/Container";
import { Header } from "../components/Header";
import { BrandsData, WPBrandEntry } from "@/type/acf";
import { getList } from "../libs/wp";

interface SectionBrandsProps {
  data: BrandsData;
}

export async function SectionBrands({ data }: SectionBrandsProps) {
  const { title } = data;

  const entries = await getList<WPBrandEntry>("brand");
  const brands = entries.map(({ id, acf: { brandFields } }) => {
    const { title, logo, link } = brandFields;
    return { id, title, logo, link };
  });

  return (
    <section className="py-12">
      <Container>
        <Header title={title} />
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          {brands.map(({ id, title, logo, link }) => (
            <a
              key={id}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-[128px] h-[36px] rounded-lg overflow-hidden flex items-center justify-center bg-brand-secondary-500/20 transition-transform duration-300 ease-out hover:scale-110 hover:shadow-lg hover:-translate-y-1"
              title={title}
            >
              {logo?.url ? (
                <Image
                  src={logo.url}
                  alt={logo.alt || title}
                  width={128}
                  height={36}
                  className="w-full h-full object-fill"
                  sizes="128px"
                />
              ) : (
                <div className="bg-gray-200 w-full h-full" />
              )}
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
