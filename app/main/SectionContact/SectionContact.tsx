"use client";

import Container from "@/app/components/Container";
import { Header } from "@/app/components/Header";
import { TypographyBody, TypographyH3 } from "@/app/components/Typography";
import Image from "next/image";
import CircleProgress from "./CircleProgress";
import { HiOutlineCheck } from "react-icons/hi";
import Button from "@/app/components/Button";
import { IoCopyOutline } from "react-icons/io5";
import StarRating from "@/app/components/Star";

interface SectionContactProps {
  data?: undefined;
}

export function SectionContact({ data }: SectionContactProps) {
  return (
    <Container>
      <section className="py-12 h-[882px]">
        <div className="flex justify-center items-start gap-8 shrink-0 grow">
          <div className="flex justify-center items-center gap-2 shrink-0 w-[498px] h-[644px] p-6 bg-gray-200 rounded-lg border-[1px] border-gray-200">
            FORM
          </div>

          <div className="flex flex-col grow shrink-0 basis-0 justify-between items-start self-stretch border-[1px] border-gray-300 rounded-lg py-8 px-6">
            <div className="flex justify-end items-start self-stretch">
              <div className="flex flex-col items-start gap-3 grow">
                <div className="flex flex-col items-start gap-2 self-stretch w-[250px]">
                  <TypographyBody className="text-gray-900 text-xs uppercase font-bold">
                    Szybki kontakt
                  </TypographyBody>
                  <Header
                    noPaddingX
                    noPaddingY
                    left
                    title="Skontaktuj się z nami"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center items-start gap-1 p-[19px] rounded-[9.5px] custom-shadow">
                <div className="flex items-center gap-6">
                  <TypographyBody className="text-yellow-500 text-center text-[28.96px] font-extrabold plus-jakarta">
                    4.7
                  </TypographyBody>
                  <StarRating rating={4.6} size={33} />
                </div>
                <div className="flex items-center gap-6">
                  <Image
                    src="/svg/google-logo.svg"
                    alt="Google logo"
                    width={34}
                    height={34}
                    priority
                  />
                  <div className="w-32">
                    <TypographyBody className="text-gray-700 text-[19px] font-bold plus-jakarta">
                      Google
                    </TypographyBody>
                    <TypographyBody className="text-blue-500 text-[14.5px] plus-jakarta">
                      Customer Reviews
                    </TypographyBody>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col py-4 items-start gap-6 self-stretch border-y-[1px] border-gray-300">
              <div className="flex items-center gap-4 w-72">
                <div className="flex items-center justify-center w-24 h-24 relative">
                  <CircleProgress percentage={95} duration={1} />
                </div>
                <TypographyH3>Zadowolonych klientów</TypographyH3>
              </div>
              <div className="flex items-start gap-8 self-stretch">
                <div className="flex flex-col justify-center items-start gap-4 grow shrink basis-0">
                  <div className="flex justify-start items-center self-stretch gap-2">
                    <HiOutlineCheck className="h-6 w-6 shrink-0" />
                    <TypographyBody className="text-gray-900 text-sm">
                      <span className="font-bold ">
                        Indywidualne podejście:{" "}
                      </span>
                      Każdy klient to dla nas priorytet.
                    </TypographyBody>
                  </div>
                  <div className="flex justify-start items-center self-stretch gap-2">
                    <HiOutlineCheck className="h-6 w-6 shrink-0" />
                    <TypographyBody className="text-gray-900 text-sm">
                      <span className="font-bold ">
                        Profesjonalne doradztwo:{" "}
                      </span>
                      Eksperci gotowi rozwiać Twoje wątpliwości.
                    </TypographyBody>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-start gap-4 grow shrink basis-0">
                  <div className="flex justify-start items-center self-stretch gap-2">
                    <HiOutlineCheck className="h-6 w-6 shrink-0" />
                    <TypographyBody className="text-gray-900 text-sm">
                      <span className="font-bold ">Szybka reakcja: </span>
                      Odpowiadamy na Twoje zapytania w ekspresowym tempie.
                    </TypographyBody>
                  </div>
                  <div className="flex justify-start items-center self-stretch gap-2">
                    <HiOutlineCheck className="h-6 w-6 shrink-0" />
                    <TypographyBody className="text-gray-900 text-sm">
                      <span className="font-bold ">Dogodna lokalizacja: </span>
                      Łatwy dojazd i parking na miejscu.
                    </TypographyBody>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-8 self-stretch">
              <div className="flex flex-col items-start gap-4 grow">
                <div className="flex items-start gap-2 self-stretch">
                  <Image
                    src="/svg/phone-call.svg"
                    alt="Google logo"
                    width={24}
                    height={24}
                    priority
                  />
                  <TypographyH3>Zadzwoń</TypographyH3>
                </div>
                <div className="pl-8">
                  <Button label="+48 123 456 789" onClick={() => {}} />
                </div>
              </div>
              <div className="flex flex-col items-start gap-4 grow">
                <div className="flex items-start gap-2 self-stretch">
                  <Image
                    src="/svg/mail.svg"
                    alt="Google logo"
                    width={24}
                    height={24}
                    priority
                  />
                  <TypographyH3>Kontakt mailowy</TypographyH3>
                </div>
                <div className="pl-8">
                  <Button
                    outline
                    label="constact@company.pl"
                    onClick={() => {}}
                    icon={IoCopyOutline}
                  />
                </div>
              </div>
            </div>
            <div className="pl-8">
              <TypographyBody>
                Pon-Pt: 9:00-17:00 So: 10:00-15:00
              </TypographyBody>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
