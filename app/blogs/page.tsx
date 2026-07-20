import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogsContent from "@/components/BlogsContent";
import { getAllPosts } from "@/lib/blogStore";
import { blogCategories } from "@/components/blogsData";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog, Growth, Design & Engineering Insights | Xpanix",
  description:
    "Field notes on web development, UI/UX design, SEO, Meta ads, and product photography, written by the Xpanix team from real client work.",
  alternates: { canonical: "/blogs" },
};

export default async function BlogsPage() {
  const posts = await getAllPosts();
  return (
    <>
      <Navbar />
      <BlogsContent posts={posts} categories={blogCategories} />
      <Footer />
    </>
  );
}
