import prisma from "@/app/libs/prismadb";
import type { google_reviews } from "@prisma/client";

/** PL plural rules */
function plural(n: number, [one, few, many]: [string, string, string]) {
  const mod10 = n % 10,
    mod100 = n % 100;
  if (n === 1) return one;
  if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return few;
  return many;
}

/** „x czasu temu” po PL, zgrubne miesiące/lata */
function formatRelativePL(from: Date, to: Date = new Date()): string {
  const diffMs = to.getTime() - from.getTime();
  const s = Math.max(0, Math.floor(diffMs / 1000));
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);
  const d = Math.floor(h / 24);
  const w = Math.floor(d / 7);
  const mo = Math.floor(d / 30);
  const y = Math.floor(d / 365);

  if (s < 60) return `${s} ${plural(s, ["sekundę", "sekundy", "sekund"])} temu`;
  if (m < 60) return `${m} ${plural(m, ["minutę", "minuty", "minut"])} temu`;
  if (h < 24) return `${h} ${plural(h, ["godzinę", "godziny", "godzin"])} temu`;
  if (d < 7) return `${d} ${plural(d, ["dzień", "dni", "dni"])} temu`;
  if (w < 5)
    return `${w} ${plural(w, ["tydzień", "tygodnie", "tygodni"])} temu`;
  if (mo < 12)
    return `${mo} ${plural(mo, ["miesiąc", "miesiące", "miesięcy"])} temu`;
  return `${y} ${plural(y, ["rok", "lata", "lat"])} temu`;
}

/**
 * Pobiera losowe recenzje i PRZED zwróceniem
 * wylicza relative_time_description w pamięci (bez update'u w DB).
 */
export async function getGoogleReviews(
  take = 5,
  minRating = 5
): Promise<google_reviews[]> {
  // Pobierz wszystkie spełniające warunek
  const all = await prisma.google_reviews.findMany({
    where: { rating: { gte: minRating } },
  });

  // Wymieszaj kolejność i weź pierwsze `take`
  const shuffled = all.sort(() => Math.random() - 0.5).slice(0, take);

  const now = new Date();

  // Nadpisz relative_time_description w pamięci (bez update w DB)
  for (const r of shuffled) {
    r.relative_time_description = formatRelativePL(r.TIME, now);
  }

  return shuffled;
}
