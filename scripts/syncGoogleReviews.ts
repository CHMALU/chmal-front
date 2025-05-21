#!/usr/bin/env ts-node
import "dotenv/config"; // <‑‑ wczyta .env poza Next.js
import dotenv from "dotenv";
dotenv.config();

import axios from "axios";
import prisma from "../app/libs/prismadb";

async function syncGoogleReviews() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY!;
  const placeId = "ChIJf48-GkyfCEcRw2ZLwDluQ5s";

  const { data } = await axios.get(
    "https://maps.googleapis.com/maps/api/place/details/json",
    { params: { place_id: placeId, key: apiKey, language: "pl" } }
  );

  const reviews = data?.result?.reviews ?? [];
  let saved = 0;

  for (const r of reviews) {
    if (r.rating < 4) continue;

    try {
      await prisma.google_reviews.create({
        data: {
          author_name: r.author_name,
          author_url: r.author_url,
          profile_photo_url: r.profile_photo_url,
          rating: r.rating,
          TEXT: r.text,
          TIME: new Date(r.time * 1000),
          relative_time_description: r.relative_time_description,
        },
      });
      saved++;
    } catch {
      /* duplikat – ignorujemy */
    }
  }

  console.log(`✓ Zapisano ${saved} nowych opinii`);
}

syncGoogleReviews()
  .catch((e) => {
    console.error("❌ Sync nie powiódł się:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
