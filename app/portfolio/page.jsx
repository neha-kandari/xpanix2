import Navbar from "@/components/Navbar";
import HeroScrollEffect from "@/components/HeroScrollEffect";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Portfolio — Xpanix",
};

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <HeroScrollEffect />
      <Footer />
    </>
  );
}
