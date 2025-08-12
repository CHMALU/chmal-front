// lib/wp.ts
import { WPCatalogEntry, WPPage } from "@/type/acf";

export const WP_API_BASE =
  process.env.WP_API_BASE_URL || "http://localhost/chmal.pl";

/**
 * Pobiera pojedynczą stronę (z właściwością `acf`).
 */
export async function getPageACF<ACF = WPPage["acf"]>(
  slug: string,
  revalidate = 60
): Promise<ACF> {
  const res = await fetch(
    `${WP_API_BASE}/wp-json/wp/v2/pages?slug=${slug}&_fields=id,slug,title,acf`,
    {
      next: { revalidate },
    }
  );
  if (!res.ok) throw new Error(`WP API error: ${res.status}`);
  const pages: { acf: ACF }[] = await res.json();
  return pages[0].acf;
}

/**
 * Pobiera listę wpisów z dowolnego custom post type endpoint.
 */
export async function getList<ACF = WPCatalogEntry>(
  endpoint: string,
  revalidate = 60
): Promise<ACF[]> {
  const res = await fetch(
    `${WP_API_BASE}/wp-json/wp/v2/${endpoint}?_fields=id,title,acf,slug`,
    {
      next: { revalidate },
    }
  );
  if (!res.ok) throw new Error(`WP API error: ${res.status}`);
  return (await res.json()) as ACF[];
}

export async function getOneBySlug<ACF = WPCatalogEntry>(
  endpoint: string,
  slug: string,
  revalidate = 60
): Promise<ACF | null> {
  const res = await fetch(
    `${WP_API_BASE}/wp-json/wp/v2/${endpoint}?slug=${encodeURIComponent(
      slug
    )}&per_page=1&_fields=id,title,acf,slug`,
    { next: { revalidate } }
  );
  if (!res.ok) throw new Error(`WP API error: ${res.status}`);
  const arr = (await res.json()) as ACF[];
  return arr[0] ?? null;
}
