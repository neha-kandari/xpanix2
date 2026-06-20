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
    features: [
      "Landing pages that convert",
      "Full-stack Next.js & React",
      "Shopify stores that scale",
      "Web apps & dashboards",
      "API integrations",
      "Performance optimization",
    ],
    img: "/projects/Chinar.webp",
  },
  {
    n: "02",
    label: "Design",
    title: "UI/UX Design",
    href: "/services/ui-ux-design",
    description:
      "Interfaces that convert. We design products your users love — from wireframes to polished, pixel-perfect UI.",
    features: [
      "User research & journeys",
      "Wireframes & prototypes",
      "Polished Figma UI",
      "Reusable design systems",
      "Developer-ready handoff",
      "Usability testing",
    ],
    img: "/projects/Finance%20App%20UI.webp",
  },
  {
    n: "03",
    label: "Reach",
    title: "Meta Ads",
    href: "/services/meta-ads",
    description:
      "High-converting Facebook & Instagram campaigns — scroll-stopping creatives and data-driven targeting that scales ROI.",
    features: [
      "Campaign strategy",
      "Scroll-stopping creatives",
      "Audience research",
      "A/B testing pipelines",
      "Funnel optimization",
      "ROAS-focused reporting",
    ],
    img: "/services/metaAds.webp",
  },
  {
    n: "04",
    label: "Discover",
    title: "SEO",
    href: "/services/seo",
    description:
      "Rank higher and get found. We optimize your site end-to-end so the right customers discover you, month after month.",
    features: [
      "Technical SEO audit",
      "On-page optimization",
      "Keyword research",
      "Quality link building",
      "Content strategy",
      "Monthly performance reports",
    ],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
  },
  {
    n: "05",
    label: "Capture",
    title: "Product Photography",
    href: "/services/product-photography",
    description:
      "Studio-grade product imagery that makes your brand look premium — crisp, styled, and ready for web, ads, and social.",
    features: [
      "Studio product shoots",
      "Lifestyle scenes",
      "Professional retouching",
      "360° product spins",
      "Ad-ready variations",
      "Brand-consistent styling",
    ],
    img: "https://images.unsplash.com/photo-1520390138845-fd2d229dd553?auto=format&fit=crop&w=900&q=80",
  },
];

function ServiceRow({ s }: { s: (typeof services)[number] }) {
  return (
    <div className="bg-white dark:bg-[#0a0a0f]">
      {/* GLASS TOP STRIP */}
      <div className="relative backdrop-blur-2xl bg-white/70 dark:bg-[#0a0a0f]/70 pt-6 pb-0">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between gap-6">
            <div className="relative">
              <span className="block text-xs font-semibold tracking-[0.35em] uppercase text-gray-700 dark:text-gray-300 pb-2">
                {s.label}
              </span>
              <span className="absolute left-0 bottom-0 h-[3px] w-12 bg-gradient-to-r from-[#667eea] to-[#764ba2]" />
            </div>
            <div className="flex-1 h-px bg-gray-200 dark:bg-white/10 mb-[7px]" />
            <span className="text-sm font-medium text-gray-400 dark:text-gray-500 pb-1">/{s.n}</span>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-6 sm:pt-8 pb-10 sm:pb-16">
        {/* Title row with Know more button aligned right */}
        <div className="flex items-center justify-between gap-2 sm:gap-6 mb-5 sm:mb-8">
          <h2 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1]">
            {s.title}
          </h2>
          <Link
            href={s.href}
            className="flex-shrink-0 inline-flex items-center gap-1.5 sm:gap-3 relative overflow-hidden border border-gray-300 dark:border-white/20 hover:border-transparent text-gray-800 dark:text-gray-200 hover:text-white px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold group transition-colors duration-500"
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

        {/* Always 2-column grid — scaled for each breakpoint */}
        <div className="grid grid-cols-2 gap-3 sm:gap-8 md:gap-12 lg:gap-20 items-stretch">
          {/* LEFT: image + description */}
          <div className="flex flex-col">
            <div className="relative w-full flex-1 min-h-[130px] sm:min-h-[200px] md:min-h-[260px] rounded-xl sm:rounded-2xl overflow-hidden mb-2 sm:mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-[11px] sm:text-sm md:text-base">
              {s.description}
            </p>
          </div>

          {/* RIGHT: feature list */}
          <ul className="flex flex-col gap-1.5 sm:gap-2.5 justify-between">
            {s.features.map((f) => (
              <li
                key={f}
                className="group flex items-center gap-2 sm:gap-3 bg-white dark:bg-[#131320] border border-gray-100 dark:border-white/8 rounded-lg sm:rounded-xl px-2 sm:px-4 py-1.5 sm:py-2 cursor-default transition-all duration-300 hover:border-[#667eea]/40 hover:shadow-[0_4px_20px_rgba(102,126,234,0.1)] hover:-translate-y-0.5"
              >
                <span
                  className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
                >
                  <svg
                    className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="font-semibold text-[11px] sm:text-sm text-gray-800 dark:text-gray-100 group-hover:text-[#667eea] dark:group-hover:text-[#667eea] transition-colors duration-300 leading-tight">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative bg-white dark:bg-[#0a0a0f]">
      {/* Section heading */}
      <div className="pt-24 pb-10 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll>
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">
              What We Do
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Digital solutions built to
              <br />
              <span className="font-serif-display italic gradient-text font-medium">scale your brand.</span>
            </h2>
          </AnimateOnScroll>
        </div>
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
