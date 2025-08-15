"use client";
import { useEffect, useState } from "react";
import { BlogCard } from "./BlogCard";
import type { WPBlogEntry } from "@/type/acf";

export default function ClientBlogSlice({
  entries,
}: {
  entries: WPBlogEntry[];
}) {
  const [perPage, setPerPage] = useState(1);

  useEffect(() => {
    const update = () => {
      let p = 1;
      if (window.innerWidth >= 1272) p = 3;
      else if (window.innerWidth >= 848) p = 2;
      setPerPage(p);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <>
      {entries.slice(0, perPage).map((entry) => (
        <BlogCard key={entry.id} id={entry.id} data={entry.acf.blogData} />
      ))}
    </>
  );
}
