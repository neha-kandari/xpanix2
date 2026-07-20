import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/blogStore";
import BlogForm from "@/components/admin/BlogForm";

export const dynamic = "force-dynamic";

export default async function EditBlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div>
      <Link
        href="/admin/blogs"
        className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-gray-400 dark:text-gray-500 hover:text-[#764ba2] dark:hover:text-[#667eea] transition-colors mb-4"
      >
        ← All posts
      </Link>
      <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-8">Edit post</h1>
      <BlogForm mode="edit" initialPost={post} />
    </div>
  );
}
