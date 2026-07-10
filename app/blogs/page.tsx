import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogsContent from "@/components/BlogsContent";

export const metadata = {
  title: "Blog, Growth, Design & Engineering Insights | Xpanix",
  description:
    "Field notes on web development, UI/UX design, SEO, Meta ads, and product photography, written by the Xpanix team from real client work.",
  alternates: { canonical: "/blogs" },
};

export default function BlogsPage() {
  return (
    <>
      <Navbar />
      <BlogsContent />
      <Footer />
    </>
  );
}
