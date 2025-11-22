"use client";

import { useEffect, useState } from "react";
import { ButtonSettings, CatalogItem, NavbarData } from "@/type/acf";
import { MainBar } from "./MainBar";
import HambuergerFooter from "./HamburgerFooter";
import MobileMenu from "./MobileMenu";

interface MainNavProps {
  uslugi: CatalogItem[];
  produkty: CatalogItem[];
  navbar: NavbarData;
  buttonSettings: ButtonSettings;
}

export default function MainNav({
  uslugi,
  produkty,
  navbar,
  buttonSettings,
}: MainNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="sm:h-auto flex flex-col justify-between">
      <MainBar
        navbar={navbar}
        buttonSettings={buttonSettings}
        onToggleMenu={() => setMenuOpen((prev) => !prev)}
        menuOpen={menuOpen}
      />
      <div
        className={`
          ${menuOpen ? "h-[calc(100dvh-66px)]" : "h-0"}
          flex flex-col overflow-hidden
          transition-all duration-300 ease-in-out
        `}
      >
        <MobileMenu
          uslugi={uslugi}
          produkty={produkty}
          onClose={() => setMenuOpen(false)}
        />

        <HambuergerFooter navbar={navbar} buttonSettings={buttonSettings} />
      </div>
    </div>
  );
}
