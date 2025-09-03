import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Container from "../components/Container";
import { TypographyBody } from "../components/Typography";

interface BlogPaginationProps {
  hideNumber?: boolean;
}

export default function BlogPagination({ hideNumber }: BlogPaginationProps) {
  return (
    <section className="mt-6">
      <Container>
        <div className="flex justify-center sm:justify-between mx-4 sm:mx-8">
          {!hideNumber && (
            <div className="gap-3 hidden sm:flex items-center ">
              <TypographyBody className="text-gray-900">Strona</TypographyBody>

              <div className="flex w-12 h-12 py-3 px-4 rounded-sm border border-gray-200 bg-gray-50 items-center justify-center">
                <TypographyBody className="text-gray-900">1</TypographyBody>
              </div>

              <TypographyBody className="text-gray-900">z 43</TypographyBody>
            </div>
          )}

          <div
            className={`${
              hideNumber ? "justify-between grow" : ""
            } flex gap-3 `}
          >
            <div className="flex items-center justify-center w-12 h-12 p-3 bg-brand-primary-500 hover:bg-brand-primary-600 transition cursor-pointer rounded-sm">
              <FiArrowLeft size={18} />
            </div>

            <div className="flex gap-3">
              <div className="flex items-center justify-center w-12 h-12 p-3 bg-gray-200 rounded-sm">
                <TypographyBody className="text-gray-900">1</TypographyBody>
              </div>
              <div className="flex items-center justify-center w-12 h-12 p-3 rounded-sm cursor-pointer hover:bg-gray-100 transition duration-300">
                <TypographyBody className="text-gray-900">2</TypographyBody>
              </div>
              <div className="flex items-center justify-center w-12 h-12 p-3 rounded-sm ">
                <TypographyBody className="text-gray-900">...</TypographyBody>
              </div>
              <div className="flex items-center justify-center w-12 h-12 p-3 rounded-sm cursor-pointer hover:bg-gray-100 transition duration-300">
                <TypographyBody className="text-gray-900">42</TypographyBody>
              </div>
              <div className="flex items-center justify-center w-12 h-12 p-3 rounded-sm cursor-pointer hover:bg-gray-100 transition duration-300">
                <TypographyBody className="text-gray-900">43</TypographyBody>
              </div>
            </div>

            <div className="flex items-center justify-center w-12 h-12 p-3 bg-brand-primary-500 hover:bg-brand-primary-600 transition cursor-pointer rounded-sm">
              <FiArrowRight size={18} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
