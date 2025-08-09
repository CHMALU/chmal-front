import { NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/app/libs/prismadb";

export async function GET() {
  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = "ChIJf48-GkyfCEcRw2ZLwDluQ5s";

    // 1) Brak klucza → błąd 500 (misconfig)
    if (!apiKey) {
      return NextResponse.json(
        { error: "Brak GOOGLE_PLACES_API_KEY w env." },
        { status: 500 }
      );
    }

    // 2) Pobranie z Places z minimalnym zakresem pól
    const { data } = await axios.get(
      "https://maps.googleapis.com/maps/api/place/details/json",
      {
        params: {
          place_id: placeId,
          key: apiKey,
          language: "pl",
          fields: "reviews",
        },
        timeout: 10000,
      }
    );

    // 3) Walidacja statusu z Google
    // Typowe: OK | REQUEST_DENIED | INVALID_REQUEST | OVER_QUERY_LIMIT | PERMISSION_DENIED | NOT_FOUND
    if (data.status !== "OK") {
      const msg = data.error_message || "Błąd Google Places";
      const detail = { status: data.status, error_message: data.error_message };

      // REQUEST_DENIED / PERMISSION_DENIED => 401/403
      if (
        data.status === "REQUEST_DENIED" ||
        data.status === "PERMISSION_DENIED"
      ) {
        return NextResponse.json({ error: msg, ...detail }, { status: 403 });
      }

      // OVER_QUERY_LIMIT => 429
      if (data.status === "OVER_QUERY_LIMIT") {
        return NextResponse.json({ error: msg, ...detail }, { status: 429 });
      }

      // Inne błędy Google -> 502 (upstream)
      return NextResponse.json({ error: msg, ...detail }, { status: 502 });
    }

    const reviews = (data.result?.reviews ?? []) as Array<any>;

    // 4) Zapisz tylko nowe (tu masz już swój try/catch na duplikaty)
    const saved = [];
    for (const review of reviews) {
      if (review.rating < 4) continue;
      try {
        const savedReview = await prisma.google_reviews.create({
          data: {
            author_name: review.author_name,
            author_url: review.author_url,
            profile_photo_url: review.profile_photo_url,
            rating: review.rating,
            TEXT: review.text,
            TIME: new Date(review.time * 1000),
            relative_time_description: review.relative_time_description,
          },
        });
        saved.push(savedReview);
      } catch {
        // duplikat — ignorujemy
      }
    }

    return NextResponse.json({
      message: "Synchronizacja OK",
      fetched: reviews.length,
      saved: saved.length,
    });
  } catch (err: any) {
    // 5) Błędy sieci/timeouty/axios → 502
    const status = err?.response?.status;
    const data = err?.response?.data;
    console.error("Places sync error:", status, data, err?.message);
    return NextResponse.json(
      {
        error: "Nie udało się zsynchronizować opinii.",
        detail: data || err?.message,
      },
      { status: 502 }
    );
  }
}

// INSERT INTO `google_reviews` (`id`, `author_name`, `author_url`, `profile_photo_url`, `rating`, `TEXT`, `TIME`, `relative_time_description`, `created_at`) VALUES (NULL, 'Paweł Noskowicz', 'https://www.google.com/maps/contrib/113635443638311969341/reviews', 'https://lh3.googleusercontent.com/a/ACg8ocJLvvjP1lFL_PRE0Oezrz0b55NG_L_4AAaQxCnQd-_qkUlJcg=s128-c0x00000000-cc-rp-mo', '5', 'dzień dobry , mogę polecić warsztat Chmal Żary jako usługodawcę na najwyższym poziomie.Zamówiłem opony na Oponeo ze wskazaniem na Chmal. Umówiony termin i z dokładnością 5 minut auto było już na warsztacie.Strefa dla klienta bardzo przyjazna.Można napić się bardzo dobrej kawy a dzieci mają kącik do układania klocków ,malowania , na zewnątrz piaskowica ,huśtawki a dla palących palarnia.Obsługa miła ,uśmiechnięta /czuć ,że nie pracują tam za karę/p.Halina i p.Dariusz kompetentni, udzielający odpowiezi na każde pytanie.\r\nCała usługa wymiany opon,wymiany oleju 1godz15min.Zajmują się również utylizacją starych opon.Zyskali nowego klienta i najpierw jeżeli coś będzie trzeba wymienić w aucie sprawdzę ,cz Chmal posiada to w swojej ofercie', '2024-10-20 05:45:40', '5 miesięcy temu', '2025-04-17 22:26:02')
