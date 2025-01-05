import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import fs from "fs";
import { BLOGS_ROOT_DIR } from "@/lib/constants";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  const blogExists = fs.readdirSync(BLOGS_ROOT_DIR).includes(`${slug}.mdx`);
  if (!blogExists) {
    return notFound();
  }

  const { default: Post } = await import(`@/blogs/${slug}.mdx`);
  if (!Post) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/blog" className="flex flex-row items-center">
        <ArrowLeft className="w-5 h-5" />
        <p className="ml-1">Back to all blogs</p>
      </Link>
      <Post />
    </div>
  );
}
