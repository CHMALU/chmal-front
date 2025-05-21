import { NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/app/libs/prismadb";

export async function GET() {
  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = "ChIJf48-GkyfCEcRw2ZLwDluQ5s";

    const { data } = await axios.get(
      "https://maps.googleapis.com/maps/api/place/details/json",
      {
        params: {
          place_id: placeId,
          key: apiKey,
          language: "pl",
        },
      }
    );

    const reviews = data?.result?.reviews ?? [];

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
      } catch (err) {
        // Prawdopodobnie duplikat
        console.log(`Pomijam duplikat: ${review.author_name} (${review.time})`);
      }
    }

    return NextResponse.json({
      message: "Zapisano opinie",
      count: saved.length,
    });
  } catch (error) {
    console.error("Błąd przy pobieraniu/zapisywaniu opinii:", error);
    return NextResponse.json(
      { error: "Nie udało się zsynchronizować opinii." },
      { status: 500 }
    );
  }
}
