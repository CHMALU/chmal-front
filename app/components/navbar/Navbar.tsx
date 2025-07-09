"use client";

import { useState, useEffect, useRef } from "react";
import { MainNav } from "./MainNav";
import TopBar from "./TopBar";
import { SubNav } from "./SubNav";

interface NavbarProps {
  text?: undefined;
}

export function Navbar({ text }: NavbarProps) {
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
        transition-transform duration-300 ease-in-out
        ${show ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      <TopBar />
      <MainNav />
      <SubNav />
    </header>
  );
}
