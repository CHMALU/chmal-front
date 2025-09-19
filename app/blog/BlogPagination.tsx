"use client";

import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Container from "../components/Container";
import { TypographyBody } from "../components/Typography";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface BlogPaginationProps {
  hideNumber?: boolean;
  totalPages?: number;
  currentPage?: number;
}

export default function BlogPagination({
  hideNumber,
  totalPages = 1,
  currentPage = 1,
}: BlogPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function getPaginationRange(
    current: number,
    total: number
  ): (number | string)[] {
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    if (current <= 2) {
      return [1, 2, 3, "...", total];
    }

    if (current === 3) {
      return [1, 2, 3, 4, "...", total];
    }

    if (current === total - 2) {
      return [1, "...", total - 3, total - 2, total - 1, total];
    }

    if (current >= total - 1) {
      return [1, "...", total - 2, total - 1, total];
    }

    return [1, "...", current - 1, current, current + 1, "...", total];
  }

  const pages = getPaginationRange(currentPage, totalPages);

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <section className="mt-6">
      <Container>
        <div className="flex justify-center sm:justify-between mx-4 sm:mx-8">
          {!hideNumber && (
            <div className="gap-3 hidden sm:flex items-center ">
              <TypographyBody className="text-gray-900">Strona</TypographyBody>
              <div className="flex w-12 h-12 py-3 px-4 rounded-sm border border-gray-200 bg-gray-50 items-center justify-center">
                <TypographyBody className="text-gray-900">
                  {currentPage}
                </TypographyBody>
              </div>
              <TypographyBody className="text-gray-900">
                z {totalPages}
              </TypographyBody>
            </div>
          )}

          {/* DESKTOP full pagination */}
          <div
            className={`${
              hideNumber ? "justify-between grow" : ""
            } hidden sm:flex gap-3`}
          >
            {/* strzałka w lewo */}
            <div
              onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
              className="flex items-center justify-center w-12 h-12 p-3 bg-brand-primary-500 hover:bg-brand-primary-600 transition cursor-pointer rounded-sm"
            >
              <FiArrowLeft size={18} />
            </div>

            {/* numery stron */}
            <div className="flex gap-3">
              {pages.map((p, idx) =>
                typeof p === "number" ? (
                  <div
                    key={idx}
                    onClick={() => goToPage(p)}
                    className={`flex items-center justify-center w-12 h-12 p-3 rounded-sm cursor-pointer transition duration-300 ${
                      p === currentPage ? "bg-gray-200" : "hover:bg-gray-100"
                    }`}
                  >
                    <TypographyBody className="text-gray-900">
                      {p}
                    </TypographyBody>
                  </div>
                ) : (
                  <div
                    key={idx}
                    className="flex items-center justify-center w-12 h-12 rounded-sm"
                  >
                    <TypographyBody className="text-gray-900">
                      ...
                    </TypographyBody>
                  </div>
                )
              )}
            </div>

            {/* strzałka w prawo */}
            <div
              onClick={() =>
                currentPage < totalPages && goToPage(currentPage + 1)
              }
              className="flex items-center justify-center w-12 h-12 p-3 bg-brand-primary-500 hover:bg-brand-primary-600 transition cursor-pointer rounded-sm"
            >
              <FiArrowRight size={18} />
            </div>
          </div>

          {/* MOBILE compact pagination (<500px) */}
          <div className="flex sm:hidden gap-3">
            {/* strzałka w lewo */}
            <div
              onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
              className="flex items-center justify-center w-12 h-12 p-3 bg-brand-primary-500 hover:bg-brand-primary-600 transition cursor-pointer rounded-sm"
            >
              <FiArrowLeft size={18} />
            </div>

            {/* numery stron w mobile */}
            {currentPage === 1 ? (
              <>
                <div className="flex items-center justify-center w-12 h-12 p-3 bg-gray-200 rounded-sm">
                  <TypographyBody className="text-gray-900">1</TypographyBody>
                </div>
                {totalPages >= 2 && (
                  <div
                    onClick={() => goToPage(2)}
                    className="flex items-center justify-center w-12 h-12 p-3 rounded-sm cursor-pointer hover:bg-gray-100"
                  >
                    <TypographyBody className="text-gray-900">2</TypographyBody>
                  </div>
                )}
                {totalPages >= 3 && (
                  <div
                    onClick={() => goToPage(3)}
                    className="flex items-center justify-center w-12 h-12 p-3 rounded-sm cursor-pointer hover:bg-gray-100"
                  >
                    <TypographyBody className="text-gray-900">3</TypographyBody>
                  </div>
                )}
              </>
            ) : currentPage === totalPages ? (
              <>
                {totalPages >= 3 && (
                  <div
                    onClick={() => goToPage(totalPages - 2)}
                    className="flex items-center justify-center w-12 h-12 p-3 rounded-sm cursor-pointer hover:bg-gray-100"
                  >
                    <TypographyBody className="text-gray-900">
                      {totalPages - 2}
                    </TypographyBody>
                  </div>
                )}
                {totalPages >= 2 && (
                  <div
                    onClick={() => goToPage(totalPages - 1)}
                    className="flex items-center justify-center w-12 h-12 p-3 rounded-sm cursor-pointer hover:bg-gray-100"
                  >
                    <TypographyBody className="text-gray-900">
                      {totalPages - 1}
                    </TypographyBody>
                  </div>
                )}
                <div className="flex items-center justify-center w-12 h-12 p-3 bg-gray-200 rounded-sm">
                  <TypographyBody className="text-gray-900">
                    {totalPages}
                  </TypographyBody>
                </div>
              </>
            ) : (
              <>
                <div
                  onClick={() => goToPage(currentPage - 1)}
                  className="flex items-center justify-center w-12 h-12 p-3 rounded-sm cursor-pointer hover:bg-gray-100"
                >
                  <TypographyBody className="text-gray-900">
                    {currentPage - 1}
                  </TypographyBody>
                </div>
                <div className="flex items-center justify-center w-12 h-12 p-3 bg-gray-200 rounded-sm">
                  <TypographyBody className="text-gray-900">
                    {currentPage}
                  </TypographyBody>
                </div>
                <div
                  onClick={() => goToPage(currentPage + 1)}
                  className="flex items-center justify-center w-12 h-12 p-3 rounded-sm cursor-pointer hover:bg-gray-100"
                >
                  <TypographyBody className="text-gray-900">
                    {currentPage + 1}
                  </TypographyBody>
                </div>
              </>
            )}

            {/* strzałka w prawo */}
            <div
              onClick={() =>
                currentPage < totalPages && goToPage(currentPage + 1)
              }
              className="flex items-center justify-center w-12 h-12 p-3 bg-brand-primary-500 hover:bg-brand-primary-600 transition cursor-pointer rounded-sm"
            >
              <FiArrowRight size={18} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
