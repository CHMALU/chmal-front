import prisma from "@/app/libs/prismadb";
import { google_reviews } from "@prisma/client";

export async function getGoogleReviews(): Promise<google_reviews[]> {
  // Pobieramy najnowsze 5 recenzji o ocenie 5 gwiazdek
  return prisma.google_reviews.findMany({
    where: { rating: 5 },
    orderBy: { TIME: "desc" },
    take: 5,
  });
}
