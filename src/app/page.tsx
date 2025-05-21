import Sidebar from "../components/Sidebar";
import BlogCard from "../components/BlogCard";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

const postsDirectory = path.join(process.cwd(), "src/content/posts");

function getPosts() {
  const filenames = fs.readdirSync(postsDirectory);
  return filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);
    return {
      ...data,
      slug: filename.replace(/\.md$/, ""),
    };
  });
}

export default function Home() {
  const posts = getPosts();
  return (
    <div className="bg-white min-h-screen px-16 py-22 flex justify-center">
      <div className="w-full max-w-7xl flex gap-0">
        <aside className="w-[150px] min-w-[130px] max-w-[150px] pb-8">
          <Sidebar />
        </aside>
        <div className="border-l border-gray-200 h-auto mx-12" />
        <main className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {posts.map((post: any) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="block hover:opacity-80 transition">
                <BlogCard post={post} />
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
