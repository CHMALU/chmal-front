"use client";

import Link from "next/link";
import Container from "../Container";
import Image from "next/image";
import { TypographyBody } from "../Typography";
import Button from "../Button";

interface MainNavProps {
  text?: undefined;
}

export function MainNav({ text }: MainNavProps) {
  return (
    <div className="bg-brand-secondary-500 py-2 pb-4">
      <Container>
        <div className="flex justify-between items-center gap-12">
          <div className="flex gap-4 shrink-0 items-center">
            <Link className=" cursor-pointer" href="/">
              <Image
                src="/images/Logo.png"
                alt="Logo Premio"
                width={174}
                height={45}
                priority={true}
              />
            </Link>
            <div className="flex gap-2 items-center">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.7322 7.99984C20.0345 8.25392 21.2314 8.89085 22.1697 9.82908C23.1079 10.7673 23.7448 11.9642 23.9989 13.2665M18.7322 2.6665C21.4379 2.96709 23.961 4.17874 25.8872 6.10251C27.8134 8.02629 29.0282 10.5479 29.3322 13.2532M13.6349 18.4839C12.0328 16.8818 10.7677 15.0703 9.83972 13.1375C9.7599 12.9712 9.71998 12.8881 9.68932 12.7829C9.58036 12.4091 9.65863 11.9501 9.88531 11.6335C9.9491 11.5444 10.0253 11.4682 10.1777 11.3158C10.6439 10.8497 10.8769 10.6166 11.0293 10.3822C11.604 9.49837 11.604 8.35893 11.0293 7.47508C10.8769 7.24071 10.6439 7.00764 10.1777 6.5415L9.91789 6.28167C9.2093 5.57308 8.85501 5.21879 8.4745 5.02633C7.71775 4.64357 6.82407 4.64357 6.06732 5.02633C5.68681 5.21879 5.33251 5.57308 4.62392 6.28167L4.41375 6.49185C3.70758 7.19801 3.3545 7.5511 3.08484 8.03114C2.78561 8.56381 2.57046 9.39114 2.57228 10.0021C2.57391 10.5527 2.68072 10.929 2.89433 11.6816C4.04229 15.7261 6.20826 19.5426 9.39223 22.7266C12.5762 25.9105 16.3927 28.0765 20.4372 29.2245C21.1898 29.4381 21.5661 29.5449 22.1167 29.5465C22.7277 29.5483 23.555 29.3332 24.0877 29.034C24.5677 28.7643 24.9208 28.4112 25.6269 27.7051L25.8371 27.4949C26.5457 26.7863 26.9 26.432 27.0925 26.0515C27.4752 25.2947 27.4752 24.401 27.0925 23.6443C26.9 23.2638 26.5457 22.9095 25.8371 22.2009L25.5773 21.9411C25.1112 21.4749 24.8781 21.2419 24.6437 21.0895C23.7599 20.5148 22.6204 20.5148 21.7366 21.0895C21.5022 21.2419 21.2691 21.4749 20.803 21.9411C20.6506 22.0935 20.5744 22.1697 20.4853 22.2335C20.1687 22.4602 19.7097 22.5384 19.3359 22.4295C19.2307 22.3988 19.1476 22.3589 18.9813 22.2791C17.0485 21.3511 15.237 20.086 13.6349 18.4839Z"
                  stroke="#FFCD00"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex flex-col items-start">
                <TypographyBody className="text-gray-50 font-bold">
                  +48 68 479 2222
                </TypographyBody>
                <TypographyBody className="text-gray-300 text-xs font-bold uppercase">
                  Pon-Pt: 9:00-17:00 So: 10:00-15:00
                </TypographyBody>
              </div>
            </div>
          </div>
          <nav className="flex items-center gap-2">
            <div className="flex items-center gap-3">
              <div className="flex p-3 cursor-pointer">
                <TypographyBody className="text-gray-200 hover:text-brand-primary-500 text-sm">
                  BLOG
                </TypographyBody>
              </div>
              <div className="flex p-3 cursor-pointer">
                <TypographyBody className="text-gray-200 hover:text-brand-primary-500 text-sm">
                  O FIRMIE
                </TypographyBody>
              </div>
              <div className="flex p-3 cursor-pointer">
                <TypographyBody className="text-gray-200 hover:text-brand-primary-500 text-sm">
                  KONTAKT
                </TypographyBody>
              </div>
            </div>
            <Button
              variant="outlinePrimary"
              label="Cennik Usług"
              onClick={() => {}}
            />
            <Button label="Umów wizytę online" onClick={() => {}} />
          </nav>
        </div>
      </Container>
    </div>
  );
}
