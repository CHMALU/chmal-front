import Container from "../components/Container";
import { BlogCard } from "../home/sectionBlog/BlogCard";
import type { WPBlogEntry } from "@/type/acf";

export default function BlogListing({ posts }: { posts: WPBlogEntry[] }) {
  return (
    <section>
      <Container>
        <div className="gap-x-8 gap-y-6 py-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-fit mx-auto">
          {posts.map((entry) => (
            <BlogCard key={entry.id} id={entry.id} data={entry.acf.blogData} />
          ))}
        </div>
      </Container>
    </section>
  );
}
