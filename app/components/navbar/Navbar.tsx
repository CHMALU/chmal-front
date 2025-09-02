"use client";

import { useState, useEffect, useRef } from "react";
import { MainNav } from "./MainNav";
import TopBar from "./TopBar";
import { SubNav } from "./SubNav";
import { ButtonSettings, NavbarData, WPCatalogEntry } from "@/type/acf";

interface NavbarProps {
  navbar: NavbarData;
  buttonSettings: ButtonSettings;
  uslugi: WPCatalogEntry[];
  produkty: WPCatalogEntry[];
}

export function Navbar({
  navbar,
  buttonSettings,
  uslugi,
  produkty,
}: NavbarProps) {
  const [show, setShow] = useState(true);
  const lastScrollY = useRef(0);

  const controlNavbar = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY.current && currentScrollY > 250) {
      setShow(false);
    } else {
      setShow(true);
    }
    lastScrollY.current = currentScrollY;
  };

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", controlNavbar, { passive: true });
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, []);

  return (
    <header
      className={`
        sticky z-50 top-0
        transition-transform duration-300 ease-in-out bg-brand-secondary-500
        ${show ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      <div className="hidden sm:block">
        <TopBar
          navbar_text={navbar.navbar_text}
          buttonSettings={buttonSettings}
        />
      </div>
      <MainNav navbar={navbar} buttonSettings={buttonSettings} />
      <div className="hidden sm:block">
        <SubNav uslugi={uslugi} produkty={produkty} />
      </div>
    </header>
  );
}
