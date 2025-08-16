// app/libs/googleReviews.ts
// fetch z WP REST zamiast Prisma

// Surowe dane z WP (id/rating przychodzą jako stringi)
type RawReview = {
  id: string;
  author_name: string;
  profile_photo_url: string;
  rating: string;
  text: string;
  relative_time_description: string;
  created_at: string;
};

// Znormalizowane dane do UI (ściśle — bez pól opcjonalnych)
export type Review = {
  id: number;
  author_name: string;
  profile_photo_url: string;
  rating: number;
  text: string;
  relative_time_description: string;
  created_at: string;
};

const WP_REVIEWS_URL =
  process.env.NEXT_PUBLIC_WP_REVIEWS_URL ??
  "https://cms.chmal.pl/chmal.pl/wp-json/chmal/v1/google-reviews";

/** PL plural rules */
function plural(n: number, [one, few, many]: [string, string, string]) {
  const mod10 = n % 10,
    mod100 = n % 100;
  if (n === 1) return one;
  if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return few;
  return many;
}

/** „x czasu temu” po PL (fallback, gdyby kiedyś pole nie przyszło) */
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

/** Normalizacja WP → Review */
function normalize(r: RawReview): Review {
  // rating/id przychodzą jako stringi — konwersja
  const id = Number.parseInt(r.id, 10);
  const rating = Number.parseInt(r.rating, 10);

  // fallback na wypadek braku relative_time_description (obecnie jest)
  const rel =
    r.relative_time_description || formatRelativePL(new Date(r.created_at));

  return {
    id,
    author_name: r.author_name,
    profile_photo_url: r.profile_photo_url,
    rating,
    text: r.text,
    relative_time_description: rel,
    created_at: r.created_at,
  };
}

/** Pobiera recenzje z WP, tasuje i zwraca `take` sztuk. */
export async function getGoogleReviews(take = 5): Promise<Review[]> {
  // ISR: odświeżaj co godzinę (zmień wg potrzeb)
  const res = await fetch(WP_REVIEWS_URL, { next: { revalidate: 3600 } });
  if (!res.ok) return [];

  const raw: RawReview[] = await res.json();
  const all = raw.map(normalize);

  return [...all].sort(() => Math.random() - 0.5).slice(0, take);
}
