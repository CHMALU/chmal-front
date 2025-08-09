import Image from "next/image";
import { Header } from "@/app/components/Header";
import { TypographyBody, TypographyH3 } from "@/app/components/Typography";
import { HiOutlineCheck } from "react-icons/hi";
import Button from "@/app/components/Button";
import { WPCertificateEntry, ButtonSettings } from "@/type/acf";

interface CertificateCardProps {
  entry: WPCertificateEntry;
  buttonSettings: ButtonSettings;
  sectionTitle: string;
  description: string;
}

export default function CertificateCard({
  entry,
  buttonSettings,
  sectionTitle,
  description,
}: CertificateCardProps) {
  const { certificateData } = entry.acf;
  const { buttonText, buttonLink } = buttonSettings;

  const points = [
    {
      title: certificateData.point1Title,
      desc: certificateData.point1Description,
    },
    {
      title: certificateData.point2Title,
      desc: certificateData.point2Description,
    },
    {
      title: certificateData.point3Title,
      desc: certificateData.point3Description,
    },
  ];

  return (
    <div className="flex gap-8 items-start">
      <div className="relative w-[604px] h-[604px] overflow-hidden rounded-lg bg-gray-300 ">
        <Image
          src={certificateData.certificateImage.url}
          alt={
            certificateData.certificateImage.alt ||
            certificateData.certificateTitle
          }
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>

      <div className="flex flex-col justify-center items-start gap-8 flex-1">
        <div className="flex flex-col gap-3">
          <TypographyH3>{certificateData.certificateTitle}</TypographyH3>
          <TypographyBody>
            {certificateData.certificateDescription}
          </TypographyBody>
        </div>

        {points.map((p, idx) => (
          <div className="flex gap-3 items-center" key={idx}>
            <HiOutlineCheck className="text-gray-900 w-6 h-6 flex-shrink-0" />
            <TypographyBody className="text-gray-900">
              <span className="font-bold">{p.title}:</span> {p.desc}
            </TypographyBody>
          </div>
        ))}

        <Button label={buttonText} href={buttonLink} />
      </div>
    </div>
  );
}
