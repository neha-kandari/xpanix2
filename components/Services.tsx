"use client";
import Link from "next/link";
import AnimateOnScroll from "./AnimateOnScroll";

const services = [
  {
    n: "01",
    label: "Build",
    title: "Web Development",
    href: "/services/web-development",
    description:
      "Fast, scalable websites and apps built on modern frameworks — the technical foundation your brand grows on.",
    img: "/projects/Chinar.webp",
  },
  {
    n: "02",
    label: "Design",
    title: "UI/UX Design",
    href: "/services/ui-ux-design",
    description:
      "Interfaces that convert. We design products your users love — from wireframes to polished, pixel-perfect UI.",
    img: "/projects/Finance%20App%20UI.webp",
  },
  {
    n: "03",
    label: "Reach",
    title: "Meta Ads",
    href: "/services/meta-ads",
    description:
      "High-converting Facebook & Instagram campaigns — scroll-stopping creatives and data-driven targeting that scales ROI.",
    img: "/services/metaAds.webp",
  },
  {
    n: "04",
    label: "Discover",
    title: "SEO",
    href: "/services/seo",
    description:
      "Rank higher and get found. We optimize your site end-to-end so the right customers discover you, month after month.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
  },
  {
    n: "05",
    label: "Capture",
    title: "Product Photography",
    href: "/services/product-photography",
    description:
      "Studio-grade product imagery that makes your brand look premium — crisp, styled, and ready for web, ads, and social.",
    img: "https://images.unsplash.com/photo-1520390138845-fd2d229dd553?auto=format&fit=crop&w=900&q=80",
  },
];

function ServiceRow({ s }: { s: (typeof services)[number] }) {
  return (
    <div className="bg-white dark:bg-[#0a0a0f] px-4">
      <div className="max-w-5xl mx-auto pt-10 sm:pt-14 pb-10 sm:pb-16">
        {/* Card — label, title, image, description and CTA all share one container */}
        <div className="group/row relative rounded-2xl sm:rounded-[2rem] bg-gray-50 dark:bg-[#0d0d15] border border-gray-100 dark:border-white/8 px-6 py-6 sm:py-8 md:py-10 hover:border-[#667eea]/30 hover:shadow-[0_20px_60px_rgba(102,126,234,0.12)] transition-all duration-500">
          {/* label + line + number */}
          <div className="flex items-end justify-between gap-6 mb-6 sm:mb-10">
            <div className="relative">
              <span className="block text-xs font-semibold tracking-[0.35em] uppercase text-gray-700 dark:text-gray-300 pb-2">
                {s.label}
              </span>
              <span className="absolute left-0 bottom-0 h-[3px] w-12 bg-gradient-to-r from-[#667eea] to-[#764ba2]" />
            </div>
            <div className="flex-1 h-px bg-gray-200 dark:bg-white/10 mb-[7px]" />
            <span className="text-sm font-medium text-gray-400 dark:text-gray-500 pb-1">/{s.n}</span>
          </div>

          {/* Title */}
          <h2 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1] mb-5 sm:mb-8">
            {s.title}
          </h2>

          {/* image + description + CTA */}
          <div className="grid grid-cols-5 gap-4 sm:gap-8 md:gap-12 items-center">
            {/* LEFT: smaller image */}
            <div className="col-span-2 relative">
              <div className="absolute -inset-2 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#667eea]/25 to-[#764ba2]/25 blur-lg opacity-0 group-hover/row:opacity-100 transition-opacity duration-500" />
              <div className="relative w-full aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.img}
                  alt={s.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/row:scale-105"
                />
              </div>
            </div>

            {/* RIGHT: description + Know more CTA */}
            <div className="col-span-3 flex flex-col gap-4 sm:gap-6">
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-[11px] sm:text-sm md:text-base">
                {s.description}
              </p>
              <Link
                href={s.href}
                className="self-start inline-flex items-center gap-1.5 sm:gap-3 relative overflow-hidden border border-gray-300 dark:border-white/20 hover:border-transparent text-gray-800 dark:text-gray-200 hover:text-white px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold group transition-colors duration-500"
              >
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
                />
                <span className="relative z-10 hidden sm:inline">Know more</span>
                <span className="relative z-10 sm:hidden">More</span>
                <span className="relative z-10 w-5 h-5 sm:w-6 sm:h-6 rounded-full inline-flex items-center justify-center border border-transparent group-hover:border-white/50 group-hover:bg-white/20 transition-all duration-500 shrink-0">
                  <svg
                    className="w-3 h-3 sm:w-3.5 sm:h-3.5 block group-hover:translate-x-0.5 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative bg-white dark:bg-[#0a0a0f] px-4">
      {/* Section heading */}
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-10">
        <AnimateOnScroll>
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">
            Services
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Digital solutions built to
            <br />
            <span className="font-serif-display italic gradient-text font-medium">scale your brand.</span>
          </h2>
        </AnimateOnScroll>
      </div>

      <div className="relative">
        {services.map((s, i) => (
          <div
            key={s.title}
            className="sticky"
            style={{ top: `${72 + i * 18}px`, zIndex: i + 1 }}
          >
            <ServiceRow s={s} />
          </div>
        ))}
      </div>
    </section>
  );
}
