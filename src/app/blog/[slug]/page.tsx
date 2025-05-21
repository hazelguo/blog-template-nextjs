import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import Image from "next/image";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getAvatarPath(author: string) {
  // Place your avatar images in public/avatars/ as 'author_name.png' (e.g., hazel_guo.png)
  return `/avatars/${author.toLowerCase().replace(/\s+/g, "_")}.png`;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const postPath = path.join(process.cwd(), "src/content/posts", `${slug}.md`);
  const file = fs.readFileSync(postPath, "utf8");
  const { data, content } = matter(file);

  const baseUrl = "https://your-blog.vercel.app";
  const postUrl = `${baseUrl}/blog/${slug}`;
  const encodedTitle = encodeURIComponent(data.title);
  const encodedUrl = encodeURIComponent(postUrl);

  const twitterShareUrl = `https://twitter.com/share?text=${encodedTitle}&url=${encodedUrl}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;

  return (
    <div className="bg-white min-h-screen flex flex-col items-center px-4">
      <div className="w-full max-w-4xl mx-auto pt-20 pb-16">
        <Link href="/" className="text-gray-500 text-base hover:underline mb-8 block">
          ← All posts
        </Link>
        <h1 className="text-5xl font-extrabold mb-8 leading-tight text-gray-900">{data.title}</h1>
        <div className="flex items-center gap-3 mb-1">
          <Image
            src={getAvatarPath(data.author)}
            alt={data.author}
            width={40}
            height={40}
            className="rounded-full border border-gray-200"
          />
          <div>
            <div className="font-semibold text-lg text-gray-800">{data.author}</div>
            <div className="text-gray-500 text-base">{data.authorTitle}</div>
          </div>
        </div>
        <div className="text-gray-500 text-base my-5">
          {data.readTime} min read &middot; {formatDate(data.date)}
        </div>
        <div className="mb-1">
          <div className="text-xs font-semibold text-gray-400 my-2 tracking-wider">
            SHARE THIS POST
          </div>
          <div className="flex gap-3">
            {/* X (Twitter) */}
            <a href={twitterShareUrl} aria-label="Share on X" className="text-gray-500 hover:text-black">
              <svg width="22" height="18" fill="currentColor" viewBox="0 0 15 13"><path d="M11.787.523h2.109L9.289 5.788l5.42 7.164h-4.244L7.142 8.607 3.34 12.952H1.23l4.927-5.631L.958.523H5.31l3.004 3.972L11.787.523Zm-.74 11.167h1.169L4.674 1.719H3.421l7.626 9.971Z" /></svg>
            </a>
            {/* LinkedIn */}
            <a href={linkedinShareUrl} aria-label="Share on LinkedIn" className="text-gray-500 hover:text-black">
              <svg width="20" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M14.81 0H1.18C.53 0 0 .52 0 1.15v13.69C0 15.48.53 16 1.18 16h13.63c.65 0 1.18-.52 1.18-1.15V1.15c0-.64-.53-1.15-1.18-1.15ZM4.75 13.63H2.38V5.99h2.37v7.64ZM3.56 4.96c-.76 0-1.38-.62-1.38-1.37s.62-1.37 1.38-1.37 1.37.62 1.37 1.37-.62 1.37-1.37 1.37Zm10.07 8.67h-2.37V9.92c0-.88-.02-2.02-1.23-2.02s-1.42.97-1.42 1.96v3.77H6.24V5.99h2.27v1.04h.03c.32-.6 1.09-1.23 2.24-1.23 2.4 0 2.85 1.58 2.85 3.64v4.19Z" /></svg>
            </a>
            {/* Facebook */}
            {/* <a href="#" aria-label="Share on Facebook" className="text-gray-500 hover:text-black">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.326v21.348c0 .733.592 1.326 1.325 1.326h11.495v-9.294h-3.128v-3.622h3.128v-2.672c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12v9.294h6.116c.733 0 1.325-.593 1.325-1.326v-21.349c0-.733-.592-1.326-1.325-1.326z"/></svg>
            </a> */}
            {/* Email */}
            {/* <a href="#" aria-label="Share by Email" className="text-gray-500 hover:text-black">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 13.065l-11.99-7.065v14h23.98v-14l-11.99 7.065zm11.99-9.065h-23.98l11.99 7.065 11.99-7.065z"/></svg>
            </a> */}
          </div>
        </div>
        <hr className="my-7 border-t-1 border-gray-200 w-1/4" />
        <article className="prose prose-xl max-w-none mb-16 text-gray-900">
          <ReactMarkdown>{content}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
}