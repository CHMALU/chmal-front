import { ButtonSettings, NavbarData } from "@/type/acf";
import { Phone } from "../Phone";
import Button from "../../Button";

interface HambuergerFooterProps {
  buttonSettings: ButtonSettings;
  navbar: NavbarData;
}
export default function HambuergerFooter({
  buttonSettings,
  navbar,
}: HambuergerFooterProps) {
  const { buttonText, buttonLink } = buttonSettings;

  return (
    <div className="bottom-0 sm:hidden w-full flex flex-col bg-brand-secondary-500">
      <div className="p-4">
        <Phone navbar={navbar} />
      </div>
      <div className="flex flex-col p-4 gap-2 border-t-4 border-brand-primary-500 self-stretch">
        <Button label={buttonText} href={buttonLink} />
        <Button variant="outlinePrimary" label="Cennik Usług" href="/cennik" />
      </div>
    </div>
  );
}
