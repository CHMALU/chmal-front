import { NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/app/libs/prismadb";
import type { google_reviews } from "@prisma/client";

// --- typy odpowiedzi z Google ---
type PlaceReviewAPI = {
  author_name: string;
  author_url?: string;
  profile_photo_url?: string;
  rating?: number; // bywa pominięte -> opcjonalne
  relative_time_description?: string;
  text?: string;
  time?: number; // UNIX seconds (opcjonalne)
};

type PlacesDetailsResponse = {
  status:
    | "OK"
    | "REQUEST_DENIED"
    | "INVALID_REQUEST"
    | "OVER_QUERY_LIMIT"
    | "PERMISSION_DENIED"
    | "NOT_FOUND"
    | string;
  error_message?: string;
  result?: { reviews?: PlaceReviewAPI[] };
};

export async function GET() {
  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = "ChIJf48-GkyfCEcRw2ZLwDluQ5s";

    if (!apiKey) {
      return NextResponse.json(
        { error: "Brak GOOGLE_PLACES_API_KEY w env." },
        { status: 500 }
      );
    }

    const { data } = await axios.get<PlacesDetailsResponse>(
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

    if (data.status !== "OK") {
      const msg = data.error_message || "Błąd Google Places";
      const detail = { status: data.status, error_message: data.error_message };
      if (
        data.status === "REQUEST_DENIED" ||
        data.status === "PERMISSION_DENIED"
      ) {
        return NextResponse.json({ error: msg, ...detail }, { status: 403 });
      }
      if (data.status === "OVER_QUERY_LIMIT") {
        return NextResponse.json({ error: msg, ...detail }, { status: 429 });
      }
      return NextResponse.json({ error: msg, ...detail }, { status: 502 });
    }

    const rawReviews: PlaceReviewAPI[] = data.result?.reviews ?? [];
    const saved: google_reviews[] = [];

    for (const r of rawReviews) {
      // zawężenia (bezpieczne typowo)
      const rating = r.rating ?? 0;
      const timeSec = r.time;
      if (rating < 4 || !timeSec) continue;

      const payload = {
        author_name: r.author_name,
        author_url: r.author_url ?? "",
        profile_photo_url: r.profile_photo_url ?? "",
        rating,
        TEXT: r.text ?? "",
        TIME: new Date(timeSec * 1000),
        relative_time_description: r.relative_time_description ?? "",
      };

      const existing = await prisma.google_reviews.findUnique({
        where: {
          author_url_TIME: {
            author_url: payload.author_url,
            TIME: payload.TIME,
          },
        },
      });

      if (!existing) {
        const created = await prisma.google_reviews.create({ data: payload });
        console.log("➕ NOWY wpis:", {
          author: created.author_name,
          time: created.TIME,
          desc: created.relative_time_description,
        });
        saved.push(created);
      } else if (
        existing.relative_time_description !== payload.relative_time_description
      ) {
        const updated = await prisma.google_reviews.update({
          where: {
            author_url_TIME: {
              author_url: payload.author_url,
              TIME: payload.TIME,
            },
          },
          data: {
            relative_time_description: payload.relative_time_description,
          },
        });
        console.log("♻️ ZAKTUALIZOWANO opis:", {
          author: updated.author_name,
          time: updated.TIME,
          old_desc: existing.relative_time_description,
          new_desc: updated.relative_time_description,
        });
        saved.push(updated);
      } else {
        console.log("✅ BEZ ZMIAN:", {
          author: existing.author_name,
          time: existing.TIME,
          desc: existing.relative_time_description,
        });
      }
    }

    return NextResponse.json({
      message: "Synchronizacja OK",
      fetched: rawReviews.length,
      saved_or_updated: saved.length,
    });
  } catch (err: unknown) {
    let status: number | undefined;
    let detail: unknown;

    if (axios.isAxiosError(err)) {
      status = err.response?.status;
      detail = err.response?.data ?? err.message;
    } else if (err instanceof Error) {
      detail = err.message;
    }

    console.error("Places sync error:", status, detail);
    return NextResponse.json(
      { error: "Nie udało się zsynchronizować opinii.", detail },
      { status: 502 }
    );
  }
}
