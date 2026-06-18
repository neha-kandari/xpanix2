import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactContent from "@/components/ContactContent";

export const metadata = {
  title: "Contact Us — Start Your Project | Xpanix",
  description:
    "Tell us about your project. Web development, UI/UX design, SEO, Meta ads, or product photography — get a clear plan, price, and timeline within 48 hours.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <ContactContent />
      <Footer />
    </>
  );
}
