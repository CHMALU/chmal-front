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
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

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
        className={`${
          menuOpen ? "h-[calc(100vh-66px)]" : "h-0"
        }  mt-[66px] absolute w-full overflow-hidden transition-all duration-300 ease-in-out `}
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
