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
      "
    >
      {children}
    </div>
  );
};

export default Container;
