import Image from "next/image";

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

type BlogCardProps = {
  post: Post;
};

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="flex flex-col max-w-xl">
      <div className="w-full pb-2">
        <div className="bg-white rounded-md border border-gray-200 overflow-hidden w-full aspect-[4/2.2] relative max-h-64">
          <Image
            src={post.image}
            alt={post.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="rounded-md"
          />
        </div>
      </div>
      <div className="p-0 flex flex-col flex-1">
        <h3 className="text-lg font-bold mb-1 leading-snug line-clamp-2 transition-colors duration-200 hover:text-blue-600 cursor-pointer">
          {post.title}
        </h3>
        <p className="text-gray-600 mb-3 flex-1 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
        <span className="text-xs text-gray-500 font-medium">By {post.author}</span>
      </div>
    </div>
  );
} 