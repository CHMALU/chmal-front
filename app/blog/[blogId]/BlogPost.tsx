import { BlogItem } from "@/type/acf";
import BlogPostHero from "./BlogPostHero";
import BlogPostContent from "./BlogPostContent";

interface BlogPostProps {
  data: BlogItem;
}

export default async function BlogPost({ data }: BlogPostProps) {
  return (
    <>
      <BlogPostHero data={data} />
      <BlogPostContent data={data} />
    </>
  );
}
