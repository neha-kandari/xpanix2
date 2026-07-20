import { getAllPosts } from "@/lib/blogStore";
import BlogsList from "@/components/admin/BlogsList";

export const dynamic = "force-dynamic";

export default async function AdminBlogsListPage() {
  const posts = await getAllPosts();
  return <BlogsList posts={posts} />;
}
