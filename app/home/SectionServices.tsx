"use client";

import Button from "../components/Button";
import Container from "../components/Container";
import { Header } from "../components/Header";
import PaginationDots from "../components/PaginationDots";
import ProductTile from "../components/ProductTile";

interface SectionServicesProps {
  data: any;
}

export function SectionServices({ data }: SectionServicesProps) {
  return (
    <section>
      <Container>
        <div className="flex flex-col items-center justify-center pb-16 ">
          <Header
            title="Kompleksowe usługi serwisowe"
            subtitle="Od wymiany opon po naprawy mechaniczne – zadbamy o Twój pojazd
              kompleksowo i profesjonalnie."
          />
          <div className=" py-12 flex flex-col justify-center items-center gap-12 self-stretch">
            <div className=" w-full flex justify-center items-center gap-8">
              <ProductTile
                title="Opony zimowe 205/55 R16"
                price={123}
                imageUrl="http://localhost/chmal.pl/wp-content/uploads/2025/03/IMG.png"
              />
              <ProductTile
                title="Opony zimowe 205/55 R16"
                price={123}
                imageUrl="http://localhost/chmal.pl/wp-content/uploads/2025/03/IMG.png"
              />
              <ProductTile
                title="Opony zimowe 205/55 R16"
                price={123}
                imageUrl="http://localhost/chmal.pl/wp-content/uploads/2025/03/IMG.png"
              />
            </div>
            <PaginationDots />
          </div>
          <Button href="/uslugi" label="Wszystkie usługi" />
        </div>
      </Container>
    </section>
  );
}
