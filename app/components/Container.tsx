"use client";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div
      className="
        max-w-[1240px]
        mx-auto
        h-full
        px-4 xl:px-0
      "
    >
      {children}
    </div>
  );
};

export default Container;
