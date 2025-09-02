import { WPBlogEntry } from "@/type/acf";
import { getList } from "../libs/wp";
import BlogTopbar from "./BlogTopbar";
import BlogPagination from "./BlogPagination";
import BlogListing from "./BlogListing";

export default async function Page() {
  const entries = await getList<WPBlogEntry>("blog");

  const sorted = entries.sort(
    (a, b) =>
      new Date(b.acf.blogData.blogDate).getTime() -
      new Date(a.acf.blogData.blogDate).getTime()
  );

  return (
    <main className="pb-24">
      <BlogTopbar />
      <BlogPagination />
      <BlogListing posts={sorted} />
      <BlogPagination hideNumber />
    </main>
  );
}
