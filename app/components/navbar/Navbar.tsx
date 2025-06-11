import { MainNav } from "./MainNav";
import TopBar from "./TopBar";

interface NavbarProps {
  text?: undefined;
}

export function Navbar({ text }: NavbarProps) {
  return (
    <header className="relative z-50 ">
      <TopBar />
      <MainNav />
    </header>
  );
}
