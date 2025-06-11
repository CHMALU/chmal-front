/**
 * Normalizuje telefon:
 * - phoneHref: "tel:+48123123123"
 * - phoneDisplay: "+48 123 123 123"
 */
export function normalizePhone(raw: string): {
  phoneHref: string;
  phoneDisplay: string;
} {
  // 1) Wyciągamy tylko cyfry i '+' na początku
  let cleaned = raw.replace(/[^\d+]/g, "");
  if (!cleaned.startsWith("+")) {
    cleaned = "+" + cleaned;
  }

  // 2) href
  const phoneHref = `tel:${cleaned}`;

  // 3) display: bez '+' grupujemy od końca co 3 cyfry
  const hasPlus = cleaned.startsWith("+");
  const digits = hasPlus ? cleaned.slice(1) : cleaned;

  // Wstawia spację przed każdą grupą 3 cyfr licząc od końca
  const grouped = digits.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const phoneDisplay = (hasPlus ? "+" : "") + grouped;

  return { phoneHref, phoneDisplay };
}
