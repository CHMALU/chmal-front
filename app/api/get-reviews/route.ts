import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { google_reviews } from "@prisma/client";

export async function GET() {
  try {
    const fourCount = await prisma.google_reviews.count({
      where: { rating: 4 },
    });

    let randomFour: google_reviews | null = null;

    if (fourCount > 0) {
      const offset = Math.floor(Math.random() * fourCount);

      randomFour = await prisma.google_reviews.findFirst({
        where: { rating: 4 },
        skip: offset, // losowy „offset” od 0 do fourCount‑1
      });
    }

    const fivesNeeded = randomFour ? 4 : 5;

    const latestFives = await prisma.google_reviews.findMany({
      where: { rating: 5 },
      orderBy: { TIME: "desc" },
      take: fivesNeeded,
    });

    const result = randomFour ? [...latestFives, randomFour] : latestFives;

    return NextResponse.json(result);
  } catch (error) {
    console.error("Błąd przy pobieraniu opinii:", error);
    return NextResponse.json(
      { error: "Nie udało się pobrać opinii." },
      { status: 500 }
    );
  }
}

// INSERT INTO `google_reviews` (`id`, `author_name`, `author_url`, `profile_photo_url`, `rating`, `TEXT`, `TIME`, `relative_time_description`, `created_at`) VALUES (NULL, 'Paweł Noskowicz', 'https://www.google.com/maps/contrib/113635443638311969341/reviews', 'https://lh3.googleusercontent.com/a/ACg8ocJLvvjP1lFL_PRE0Oezrz0b55NG_L_4AAaQxCnQd-_qkUlJcg=s128-c0x00000000-cc-rp-mo', '5', 'dzień dobry , mogę polecić warsztat Chmal Żary jako usługodawcę na najwyższym poziomie.Zamówiłem opony na Oponeo ze wskazaniem na Chmal. Umówiony termin i z dokładnością 5 minut auto było już na warsztacie.Strefa dla klienta bardzo przyjazna.Można napić się bardzo dobrej kawy a dzieci mają kącik do układania klocków ,malowania , na zewnątrz piaskowica ,huśtawki a dla palących palarnia.Obsługa miła ,uśmiechnięta /czuć ,że nie pracują tam za karę/p.Halina i p.Dariusz kompetentni, udzielający odpowiezi na każde pytanie.\r\nCała usługa wymiany opon,wymiany oleju 1godz15min.Zajmują się również utylizacją starych opon.Zyskali nowego klienta i najpierw jeżeli coś będzie trzeba wymienić w aucie sprawdzę ,cz Chmal posiada to w swojej ofercie', '2024-10-20 05:45:40', '5 miesięcy temu', '2025-04-17 22:26:02')
