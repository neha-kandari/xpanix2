import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { servicesData, getService } from "@/components/servicesData";
import WebDevelopmentDetailPage from "@/components/WebDevelopmentDetailPage";
import UiUxDetailPage from "@/components/UiUxDetailPage";
import MetaAdsDetailPage from "@/components/MetaAdsDetailPage";
import SeoDetailPage from "@/components/SeoDetailPage";
import ProductShootDetailPage from "@/components/ProductShootDetailPage";
import ServiceDetailPage from "@/components/ServiceDetailPage";

const detailComponents: Record<string, () => React.JSX.Element> = {
  "web-development": WebDevelopmentDetailPage,
  "ui-ux-design": UiUxDetailPage,
  "meta-ads": MetaAdsDetailPage,
  "seo": SeoDetailPage,
  "product-photography": ProductShootDetailPage,
};

export function generateStaticParams() {
  return servicesData.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service — Xpanix" };
  return {
    title: `${service.title} — Xpanix`,
    description: service.short,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const Detail = detailComponents[slug];

  return (
    <>
      <Navbar />
      {Detail ? <Detail /> : <ServiceDetailPage service={service!} />}
      <Footer />
    </>
  );
}
