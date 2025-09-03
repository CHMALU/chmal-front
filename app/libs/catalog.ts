import type { CatalogItem, WPCatalogEntry, SubpageVariant } from "@/type/acf";

export function mapEntriesToCatalogItems(
  entries: WPCatalogEntry[],
  variant: SubpageVariant,
  limit: number = Infinity
): CatalogItem[] {
  return entries
    .map((e) => ({
      ...e.acf.catalogItem,
      id: e.id,
      slug: e.slug,
      variant,
    }))
    .sort(
      (a, b) =>
        (parseInt(a.order as string, 10) || 0) -
        (parseInt(b.order as string, 10) || 0)
    )
    .slice(0, limit);
}
import { getList } from "./wp";
