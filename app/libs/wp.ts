// lib/wp.ts
import { WPPage } from "@/type/acf";

export const WP_API_BASE =
  process.env.WP_API_BASE_URL || "http://localhost/chmal.pl";

/**
 * Pobiera stronę z WP po slug i zwraca obiekt `acf`.
 *
 * @template P – interfejs strony, musi mieć pole `acf`.
 *              Domyślnie WPPage.
 */
export async function getPageACF<P extends { acf: any } = WPPage>(
  slug: string,
  revalidate = 60
): Promise<P["acf"]> {
  const res = await fetch(`${WP_API_BASE}/wp-json/wp/v2/${slug}`, {
    next: { revalidate },
  });
  if (!res.ok) {
    throw new Error(`WP API error: ${res.status}`);
  }
  const pages: P[] = await res.json();
  return pages[0].acf;
}
