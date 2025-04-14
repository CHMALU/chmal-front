import axios from "axios";
import { NextResponse } from "next/server";

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
        },
      }
    );
    const result = data.result;

    return NextResponse.json({
      rating: result.rating,
      reviews: result.reviews,
    });
  } catch (error) {
    console.error("Google Reviews API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}
