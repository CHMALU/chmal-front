// app/libs/googleReviews.ts
// fetch z WP REST zamiast Prisma

export type Review = {
  id: number;
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
  created_at: string;
  TIME: string; // gdybyś miał taką kolumnę
  profile_photo_url: string;
};

// Możesz też wrzucić to do ENV: NEXT_PUBLIC_WP_REVIEWS_URL
const WP_REVIEWS_URL =
  process.env.NEXT_PUBLIC_WP_REVIEWS_URL ||
  "https://cms.chmal.pl/chmal.pl/wp-json/chmal/v1/google-reviews";

/** PL plural rules */
function plural(n: number, [one, few, many]: [string, string, string]) {
  const mod10 = n % 10,
    mod100 = n % 100;
  if (n === 1) return one;
  if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return few;
  return many;
}

/** „x czasu temu” po PL */
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
 * Pobiera recenzje z WP, tasuje i zwraca `take` sztuk.
 * (bez minRating — wszystkie lecą z endpointu)
 */
export async function getGoogleReviews(take = 5): Promise<Review[]> {
  // ISR: odświeżaj co godzinę (możesz zmienić lub usunąć)
  const res = await fetch(WP_REVIEWS_URL, { next: { revalidate: 3600 } });
  if (!res.ok) return [];

  const all: Review[] = await res.json();
  console.log("Fetched reviews:", all);

  // Tasowanie + przycięcie
  const shuffled = [...all].sort(() => Math.random() - 0.5).slice(0, take);

  // Uzupełnij relative_time_description jeśli brak
  const now = new Date();
  for (const r of shuffled) {
    if (!r.relative_time_description) {
      const when = r.created_at || (r.TIME as any);
      if (when)
        r.relative_time_description = formatRelativePL(new Date(when), now);
    }
  }
  return shuffled;
}
