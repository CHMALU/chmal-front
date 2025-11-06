"use client";

import { useState, useEffect, useRef } from "react";
import MainNav from "./mainNav/MainNav";
import TopBar from "./TopBar";
import { SubNav } from "./SubNav";
import { ButtonSettings, CatalogItem, NavbarData } from "@/type/acf";

interface NavbarProps {
  navbar: NavbarData;
  buttonSettings: ButtonSettings;
  uslugi: CatalogItem[];
  produkty: CatalogItem[];
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
      console.log("hide");
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
        transition-transform duration-300 ease-in-out
        ${show ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      <div className="hidden sm:block">
        <TopBar
          navbar_text={navbar.navbar_text}
          buttonSettings={buttonSettings}
        />
      </div>
      <MainNav
        uslugi={uslugi}
        produkty={produkty}
        navbar={navbar}
        buttonSettings={buttonSettings}
      />
      <div className="hidden sm:block bg-brand-secondary-500 ">
        <SubNav uslugi={uslugi} produkty={produkty} />
      </div>
    </header>
  );
}
