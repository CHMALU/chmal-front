import Image from "next/image";
import { TypographyBody, TypographyH3 } from "@/app/components/Typography";
import { HiOutlineCheck } from "react-icons/hi";
import Button from "@/app/components/Button";
import { WPCertificateEntry, ButtonSettings } from "@/type/acf";

interface CertificateCardProps {
  entry: WPCertificateEntry;
  buttonSettings: ButtonSettings;
}

export default function CertificateCard({
  entry,
  buttonSettings,
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
    <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
      <div className="relative w-full max-w-[604px] lg:h-[604px] aspect-square overflow-hidden rounded-lg bg-gray-300 ">
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

      <div className="flex flex-col justify-center md:items-start items-center md:text-start text-center gap-8 flex-1 px-8 md:px-0">
        <div className="flex flex-col gap-3">
          <TypographyH3>{certificateData.certificateTitle}</TypographyH3>
          <TypographyBody>
            {certificateData.certificateDescription}
          </TypographyBody>
        </div>

        {points.map((p, idx) => (
          <div className="flex gap-3 items-center" key={idx}>
            <HiOutlineCheck className=" hidden md:block text-gray-900 w-6 h-6 flex-shrink-0" />
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
