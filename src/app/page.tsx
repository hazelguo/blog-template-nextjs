import fs from "fs";
import path from "path";
import matter from "gray-matter";
import HomeClient from "../components/HomeClient";

const postsDirectory = path.join(process.cwd(), "src/content/posts");

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

function getPosts(): Post[] {
  const filenames = fs.readdirSync(postsDirectory);
  return filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);
    return {
      ...data,
      slug: filename.replace(/\.md$/, ""),
    } as Post;
  });
}

function getAllTags(posts: Post[]): string[] {
  const tagSet = new Set<string>();
  posts.forEach((post) => {
    if (post.tags) {
      post.tags.forEach((tag: string) => tagSet.add(tag));
    }
  });
  return Array.from(tagSet);
}

export default function Home() {
  const posts = getPosts();
  const allTags = getAllTags(posts);

  return <HomeClient posts={posts} allTags={allTags} />;
}
