import Link from "next/link";
import BlogForm from "@/components/admin/BlogForm";

export default function NewBlogPostPage() {
  return (
    <div>
      <Link
        href="/admin/blogs"
        className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-gray-400 dark:text-gray-500 hover:text-[#764ba2] dark:hover:text-[#667eea] transition-colors mb-4"
      >
        ← All posts
      </Link>
      <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-8">New post</h1>
      <BlogForm mode="create" />
    </div>
  );
}
