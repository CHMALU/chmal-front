import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "./components/navbar/Navbar";
import { Footer } from "./components/footer/Footer";
import { getList, getPageACF } from "./libs/wp";
import { WPCatalogEntryNav, WPPageNav } from "@/type/acf";

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
  const { navbar } = await getPageACF<WPPageNav["acf"]>("nawigacja-stopka");

  const { buttonSettings } = await getPageACF("strona-glowna");

  const uslugi = await getList<WPCatalogEntryNav>("uslugi", 60, false);
  const produkty = await getList<WPCatalogEntryNav>("produkty", 60, false);

  return (
    <html lang="pl">
      <body className="font-sans text-gray-900 antialiased">
        <Navbar
          uslugi={uslugi}
          produkty={produkty}
          navbar={navbar}
          buttonSettings={buttonSettings}
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}
