import Image from "next/image";
import { WorkshopData } from "@/type/acf";
import Container from "../components/Container";
import { Header } from "../components/Header";

interface WorkshopGalleryProps {
  data: WorkshopData;
}

export default async function WorkshopGallery({ data }: WorkshopGalleryProps) {
  const {
    workshopTitle,
    workshopSubtitle,
    workshopPhoto1,
    workshopPhoto2,
    workshopPhoto3,
    workshopPhoto4,
    workshopPhoto5,
    workshopPhoto6,
  } = data;

  const photos = [
    workshopPhoto1,
    workshopPhoto2,
    workshopPhoto3,
    workshopPhoto4,
    workshopPhoto5,
    workshopPhoto6,
  ];

  return (
    <Container>
      <Header title={workshopTitle} subtitle={workshopSubtitle} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pt-0 md:pt-16 py-12 md:py-16 px-4 md:px-0">
        {photos.map((photo, i) => (
          <div
            key={i}
            className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center"
          >
            {photo ? (
              <Image
                src={photo.url}
                alt={photo.alt || `Workshop photo ${i + 1}`}
                width={800}
                height={800}
                className="w-full h-full object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <span className="text-gray-400 text-sm">Brak zdjęcia</span>
            )}
          </div>
        ))}
      </div>
    </Container>
  );
}
