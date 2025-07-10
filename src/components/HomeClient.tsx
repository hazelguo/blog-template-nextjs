"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "./Sidebar";
import BlogCard from "./BlogCard";

type Post = {
  title: string;
  date: string;
  author: string;
  authorTitle: string;
  readTime: number;
  excerpt: string;
  image: string;
  tags?: string[];
  slug: string;
};

type HomeClientProps = {
  posts: Post[];
  allTags: string[];
};

export default function HomeClient({ posts, allTags }: HomeClientProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  const filteredPosts = selectedTag 
    ? posts.filter((post: Post) => post.tags && post.tags.includes(selectedTag))
    : posts;

  return (
    <div className="bg-white min-h-screen px-16 py-22 flex justify-center">
      <div className="w-full max-w-7xl flex gap-0">
        <aside className="w-[150px] min-w-[130px] max-w-[150px] pb-8">
          <Sidebar 
            tags={allTags}
            selectedTag={selectedTag}
            onTagClick={setSelectedTag}
          />
        </aside>
        <div className="border-l border-gray-200 h-auto mx-12" />
        <main className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
            {filteredPosts.map((post: Post) => (
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