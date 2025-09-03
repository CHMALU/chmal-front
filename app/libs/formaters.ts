export function formatPrice(raw: string): string {
  const normalized = raw.replace(",", ".");
  const value = Number(normalized);
  if (Number.isNaN(value)) return raw;
  return value.toFixed(2).replace(".", ",");
}

export function splitParagraphs(text: string): string[] {
  return text
    .replace(/\r\n/g, "\n") // normalizacja CRLF → LF
    .split(/\n{2,}/) // 2+ nowych linii = nowy akapit
    .map((p) => p.trim())
    .filter(Boolean);
}
