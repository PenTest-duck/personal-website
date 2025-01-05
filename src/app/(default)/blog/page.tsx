import BlogCard, { BlogCardProps } from "@/components/BlogCard";
import { BLOGS_ROOT_DIR } from "@/lib/constants";
import fs from "fs";

const Blog = () => {
  const getBlogs = () => {
    const blogs = fs
      .readdirSync(BLOGS_ROOT_DIR)
      .filter((blogFileName) => blogFileName.endsWith(".mdx"))
      .map(async (blogFileName) => {
        const { metadata } = await import(`@/blogs/${blogFileName}`);
        metadata["href"] = `/blog/${blogFileName.replace(/\.mdx$/, "")}`;
        return metadata as BlogCardProps;
      });
    return Promise.all(blogs).then((blogs) =>
      blogs.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    );
  };

  return (
    <main className="container mx-auto px-4 py-12">
      <section className="text-center">
        <h2 className="text-4xl font-bold mb-4">Blog</h2>
        <p className="text-xl mb-8">
          Here&apos;s a list of blog posts I&apos;ve written.
        </p>
      </section>
      <section className="max-w-4xl mx-auto px-4 md:px-8 lg:px-12">
        {getBlogs().then((blogs) =>
          blogs.map((blog, index) => <BlogCard key={index} {...blog} />)
        )}
      </section>
    </main>
  );
};

export default Blog;
