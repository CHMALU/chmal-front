import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Serwis Opon i Mechanika Samochodowa Żary | Premio Chmal",
  description:
    "Premio Chmal w Żarach – profesjonalny serwis wymiany opon, mechanika pojazdowa, diagnostyka, geometria zawieszenia, wymiana oleju, klimatyzacja oraz usługi mobilne. Obok znajduje się Hurtownia Ogumienia i Szyb Chmal oferująca szeroki wybór opon i szyb samochodowych. Fachowość, terminowość, atrakcyjne ceny.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className="font-sans text-gray-900 antialiased">{children}</body>
    </html>
  );
}
