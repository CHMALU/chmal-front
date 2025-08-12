export function formatPrice(raw: string): string {
  const normalized = raw.replace(",", ".");
  const value = Number(normalized);
  if (Number.isNaN(value)) return raw;
  return value.toFixed(2).replace(".", ",");
}

export function splitParagraphs(text: string): string[] {
  return text
    .split(/\r?\n\r?\n/) // akapit = pusta linia
    .map((p) => p.trim())
    .filter(Boolean);
}
