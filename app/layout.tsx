import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "./components/navbar/Navbar";
import { Footer } from "./components/footer/Footer";
import { getList, getPageACF } from "./libs/wp";
import { WPCatalogEntry, WPPageNav } from "@/type/acf";
import { mapEntriesToCatalogItems } from "./libs/catalog";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Serwis Opon i Mechanika Samochodowa Żary | Premio Chmal",
  description:
    "Premio Chmal w Żarach – profesjonalny serwis wymiany opon, mechanika pojazdowa, diagnostyka, geometria zawieszenia, wymiana oleju, klimatyzacja oraz usługi mobilne. Obok znajduje się Hurtownia Ogumienia i Szyb Chmal oferująca szeroki wybór opon i szyb samochodowych. Fachowość, terminowość, atrakcyjne ceny.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { navbar, footer } = await getPageACF<WPPageNav["acf"]>(
    "nawigacja-stopka"
  );

  const { buttonSettings } = await getPageACF("strona-glowna");

  const uslugi = await getList<WPCatalogEntry>("uslugi", 60);
  const produkty = await getList<WPCatalogEntry>("produkty", 60);

  const sortedUslugi = mapEntriesToCatalogItems(uslugi, "uslugi");
  const sortedProdukty = mapEntriesToCatalogItems(produkty, "produkty");

  return (
    <html lang="pl">
      <body className="font-sans text-gray-900 antialiased">
        <Navbar
          uslugi={sortedUslugi}
          produkty={sortedProdukty}
          navbar={navbar}
          buttonSettings={buttonSettings}
        />
        {children}
        <Footer
          uslugi={sortedUslugi}
          produkty={sortedProdukty}
          navbar={navbar}
          footer={footer}
        />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
