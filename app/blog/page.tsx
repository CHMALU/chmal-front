import { WPBlogEntry } from "@/type/acf";
import { getList } from "../libs/wp";
import BlogTopbar from "./BlogTopbar";
import BlogPagination from "./BlogPagination";
import BlogListing from "./BlogListing";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams; // 👈 rozpakowanie Promise

  const entries = await getList<WPBlogEntry>("blog");
  const sorted = entries.sort(
    (a, b) =>
      new Date(b.acf.blogData.blogDate).getTime() -
      new Date(a.acf.blogData.blogDate).getTime()
  );

  const PER_PAGE = 9;
  const totalPages = Math.ceil(sorted.length / PER_PAGE);

  // 👇 obsługa ?page=...
  const pageParam = Array.isArray(sp.page) ? sp.page[0] : sp.page;
  const currentPage = Math.max(1, Math.min(totalPages, Number(pageParam) || 1));

  const start = (currentPage - 1) * PER_PAGE;
  const end = start + PER_PAGE;
  const paginatedPosts = sorted.slice(start, end);

  return (
    <main className="pb-24">
      <BlogTopbar />
      <BlogPagination totalPages={totalPages} currentPage={currentPage} />
      <BlogListing posts={paginatedPosts} />
      <BlogPagination
        hideNumber
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </main>
  );
}
