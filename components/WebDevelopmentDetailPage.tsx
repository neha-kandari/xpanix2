"use client";
import { useState } from "react";
import AnimateOnScroll from "./AnimateOnScroll";
import ContactFormCard from "./ContactFormCard";
import TiltCard from "./TiltCard";
import ReviewsCarousel from "./ReviewsCarousel";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const foundationCards = [
  {
    title: "Conversion Focused",
    desc: "We architect every layout, button, and flow around one goal — turning your visitors into paying customers.",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
  {
    title: "Lightning Speed",
    desc: "A 1-second delay in page load can cost 7% of conversions. We prioritize performance so every visit counts.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    title: "Scale & Security",
    desc: "Built on enterprise-grade architecture that scales from 100 to 1 million users without missing a beat.",
    icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
  },
];

const solutions = [
  {
    title: "Full-Stack Apps",
    desc: "Complex web applications with robust backends and dynamic real-time frontends.",
    tags: ["React", "Node.js", "API"],
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
  },
  {
    title: "E-Commerce",
    desc: "High-converting Shopify or custom storefronts built for serious online sellers.",
    tags: ["Shopify", "Headless", "Cart"],
    icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
  },
  {
    title: "API Development",
    desc: "Secure and scalable REST or GraphQL APIs your whole product can build on.",
    tags: ["REST", "GraphQL", "Auth"],
    icon: "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
  {
    title: "Web3 & DApps",
    desc: "Blockchain-enabled applications built on Ethereum or modern L2 chains.",
    tags: ["Solidity", "Smart Contracts", "Wallets"],
    icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  },
];

const purposes = [
  {
    title: "Corporate Websites",
    desc: "Authoritative digital headquarters for established businesses.",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2m-2 0v-9a2 2 0 00-2-2h-2M5 21H3m2 0v-9a2 2 0 012-2h2m0-4h6m-6 4h6m-3 4v6",
  },
  {
    title: "Startup Landing Pages",
    desc: "High-impact, single-page sites built to validate and launch fast.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    title: "SEO-First Blogs",
    desc: "Content platforms structured to rank and compound organic traffic.",
    icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z",
  },
];

const blueprint = [
  { n: "01", title: "Discovery & Strategy", desc: "We dig into your business model, audience, and competitors to map a winning approach." },
  { n: "02", title: "Architecture & UX", desc: "Sitemaps, user flows, and wireframes that lock structure before a pixel is styled." },
  { n: "03", title: "Design Approval", desc: "High-fidelity, on-brand designs reviewed and signed off — no surprises later." },
  { n: "04", title: "Iterative Coding", desc: "Clean, typed, reviewed code shipped in weekly sprints you can see and test." },
  { n: "05", title: "QA & Performance", desc: "Rigorous testing across devices and browsers, tuned to a 95+ Lighthouse score." },
  { n: "06", title: "Launch & Support", desc: "Zero-downtime deployment, analytics wiring, and ongoing care after go-live." },
];

const standards = [
  { title: "SSL Encryption", desc: "Security is paramount. Every site comes with free SSL setup." },
  { title: "Mobile Responsive", desc: "Seamless experience across mobile, tablet, and desktop." },
  { title: "Speed Optimization", desc: "90+ Google PageSpeed scores targeted by default." },
  { title: "SEO Meta Tags", desc: "Built-in structured data and meta optimization." },
  { title: "CMS Integration", desc: "Easy content editing via Sanity, Strapi, or Shopify." },
  { title: "Analytics Setup", desc: "Google Analytics and heatmap tracking pre-installed." },
];

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const techStack = [
  { name: "React", group: "Frontend", logo: `${DEVICON}/react/react-original.svg` },
  { name: "Next.js", group: "Frontend", logo: `${DEVICON}/nextjs/nextjs-original.svg`, invertDark: true },
  { name: "TypeScript", group: "Frontend", logo: `${DEVICON}/typescript/typescript-original.svg` },
  { name: "Tailwind", group: "Frontend", logo: `${DEVICON}/tailwindcss/tailwindcss-original.svg` },
  { name: "Node.js", group: "Backend", logo: `${DEVICON}/nodejs/nodejs-original.svg` },
  { name: "Express", group: "Backend", logo: `${DEVICON}/express/express-original.svg`, invertDark: true },
  { name: "MongoDB", group: "Database", logo: `${DEVICON}/mongodb/mongodb-original.svg` },
  { name: "PostgreSQL", group: "Database", logo: `${DEVICON}/postgresql/postgresql-original.svg` },
  { name: "Shopify", group: "E-commerce", logo: "https://cdn.simpleicons.org/shopify" },
  { name: "WordPress", group: "CMS", logo: `${DEVICON}/wordpress/wordpress-plain.svg`, invertDark: true },
  { name: "Vercel", group: "Hosting", logo: `${DEVICON}/vercel/vercel-original.svg`, invertDark: true },
  { name: "AWS", group: "Hosting", logo: `${DEVICON}/amazonwebservices/amazonwebservices-original-wordmark.svg`, invertDark: true },
];

const boldProjects = [
  {
    name: "Chinar Logistics",
    desc: "A conversion-focused logistics website with service enquiry flows and a clean, trust-building brand presence.",
    img: "/projects/Chinar.webp",
    tag: "Logistics / Website",
  },
  {
    name: "WoodyPolo Store",
    desc: "A polished e-commerce storefront engineered for fast browsing, smooth checkout, and a premium product feel.",
    img: "/projects/WoodyPolo.webp",
    tag: "E-Commerce",
  },
];

const partnerStats = [
  { value: "98%", label: "Client retention" },
  { value: "12", label: "In-house engineers" },
  { value: "150+", label: "Sites launched" },
  { value: "4.9", label: "Avg. rating" },
];

const partnerPoints = [
  "Direct access to lead developers (no account managers)",
  "Transparent weekly technical updates and demos",
  "100% IP ownership and clean documentation",
];

const faqs = [
  {
    q: "How long does a typical web project take?",
    a: "A landing page ships in about a week. Business websites take 2–4 weeks, and complex web apps or e-commerce builds typically run 4–8 weeks. You get a clear timeline before we start.",
  },
  {
    q: "Do you provide hosting and maintenance?",
    a: "Yes — we handle domain, hosting (Vercel, AWS, Hostinger, or your preference), SSL, deployment, and offer monthly maintenance plans covering updates, backups, and monitoring.",
  },
  {
    q: "Will my site be easy to update myself?",
    a: "Absolutely. We integrate a CMS or admin panel so your team can edit content, publish blogs, and swap images without touching code.",
  },
  {
    q: "Can you help with my existing slow website?",
    a: "Yes. We run a performance audit, fix the bottlenecks (images, scripts, hosting, code), and routinely take sites from failing scores to 90+ on Lighthouse.",
  },
  {
    q: "Will the website be SEO-friendly?",
    a: "Every build follows SEO best practices — semantic HTML, schema markup, fast load times, sitemaps, and on-page optimization for your target keywords.",
  },
];

/* ─────────────────────────────────────────────
   SHARED
───────────────────────────────────────────── */

function SectionKicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-4 py-1.5 mb-5 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs font-bold tracking-[0.2em] uppercase gradient-text shadow-sm">
      {children}
    </span>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */

export default function WebDevelopmentDetailPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      {/* ── 1. HERO ───────────────────────────── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-white dark:bg-[#0a0a0f]">
        <div className="absolute inset-0 dot-grid dot-fade pointer-events-none" />
        <div className="pointer-events-none absolute -top-24 right-0 w-[34rem] h-[34rem] rounded-full bg-gradient-to-bl from-[#764ba2]/25 via-[#667eea]/15 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 w-[28rem] h-[28rem] rounded-full bg-gradient-to-tr from-[#667eea]/20 to-transparent blur-3xl" />

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2">

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white leading-[0.98] mb-3">
              Web Development
            </h1>
            <p className="font-serif-display italic gradient-text font-medium text-3xl md:text-5xl mb-7">
              that converts.
            </p>
            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed mb-9">
              Professional web development services for growing brands. Custom websites,
              e-commerce stores, landing pages, and full-stack web apps — built fast,
              SEO-friendly, and mobile-first.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#cta" className="gradient-bg text-white px-7 py-3.5 rounded-xl font-semibold text-base hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg">
                See packages
              </a>
              <a href="/portfolio" className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 px-7 py-3.5 rounded-xl font-semibold text-base hover:border-[#764ba2] hover:text-[#764ba2] hover:-translate-y-0.5 transition-all">
                View recent work
              </a>
            </div>
          </div>

          <div className="lg:col-span-1 lg:sticky lg:top-28">
            <ContactFormCard service="Web Development" />
          </div>
        </div>
      </section>

      {/* ── 2. WHY YOUR DIGITAL FOUNDATION MATTERS ── */}
      <section className="py-24 px-6 bg-white dark:bg-[#0a0a0f]">
        <div className="max-w-6xl mx-auto text-center">
          <AnimateOnScroll>
            <SectionKicker>Foundation</SectionKicker>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-4">
              Why Your Digital Foundation{" "}
              <span className="gradient-text">Matters</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-16 text-lg">
              Your website is your 24/7 salesperson. We build platforms that don&rsquo;t just look pretty — they drive revenue.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {foundationCards.map((c, i) => (
              <AnimateOnScroll key={c.title} delay={i * 0.1}>
                <TiltCard className="h-full">
                  <article
                    className="group h-full p-8 rounded-2xl text-left bg-gray-50 dark:bg-[#131320] border border-gray-200 dark:border-gray-800 hover:border-[#764ba2]/40 hover:shadow-[0_20px_50px_rgba(91,43,232,0.12)] transition-all"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-6 shadow-md group-hover:scale-110 group-hover:rotate-6 transition-transform"
                      style={{ transform: "translateZ(36px)" }}
                    >
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={c.icon} />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3" style={{ transform: "translateZ(26px)" }}>
                      {c.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed" style={{ transform: "translateZ(16px)" }}>
                      {c.desc}
                    </p>
                  </article>
                </TiltCard>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. END-TO-END WEB SOLUTIONS ───────── */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-[#0d0d15]">
        <div className="max-w-6xl mx-auto text-center">
          <AnimateOnScroll>
            <SectionKicker>Services</SectionKicker>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-4">
              End-to-End Web <span className="gradient-text">Solutions</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-16 text-lg">
              From simple landing pages to complex SaaS architectures, we deliver excellence at every layer.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {solutions.map((s, i) => (
              <AnimateOnScroll key={s.title} delay={i * 0.08}>
                <article className="group h-full p-6 rounded-2xl text-left bg-white dark:bg-[#131320] border border-gray-200 dark:border-gray-800 hover:border-[#764ba2]/40 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#667eea]/15 to-[#764ba2]/15 border border-[#764ba2]/25 flex items-center justify-center mb-5 group-hover:gradient-bg transition-all">
                    <svg className="w-5 h-5 text-[#764ba2] dark:text-[#667eea] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={s.icon} />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{s.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">{s.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {s.tags.map((t) => (
                      <span key={t} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 group-hover:bg-[#764ba2]/10 group-hover:text-[#764ba2] dark:group-hover:text-[#667eea] transition-colors">
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. WEBSITES FOR EVERY PURPOSE ─────── */}
      <section className="relative py-16 px-6 overflow-hidden bg-white dark:bg-[#0a0a0f]">
        <div className="pointer-events-none absolute top-0 right-0 w-[26rem] h-[26rem] rounded-full bg-gradient-to-bl from-[#667eea]/15 to-transparent blur-3xl" />
        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-stretch">
          <div className="flex flex-col">
            <AnimateOnScroll>
              <SectionKicker>Niche</SectionKicker>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-3">
                Websites for Every <span className="gradient-text">Purpose</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                You don&rsquo;t believe in one-size-fits-all. Every project gets a custom blueprint.
              </p>
            </AnimateOnScroll>

            <div className="flex flex-col gap-3">
              {purposes.map((p, i) => (
                <AnimateOnScroll key={p.title} delay={i * 0.1} direction="left">
                  <div className="group flex items-start gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-[#131320] border border-gray-200 dark:border-gray-800 hover:border-[#764ba2]/40 hover:translate-x-1.5 transition-all duration-300 cursor-default">
                    <span className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={p.icon} />
                      </svg>
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">{p.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{p.desc}</p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>

          <AnimateOnScroll direction="right" className="lg:h-full">
            <div className="relative group h-full">
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-[#667eea]/20 to-[#764ba2]/20 blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[260px] rounded-[1.75rem] overflow-hidden border border-gray-200 dark:border-gray-800 shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
                  alt="Team planning a custom website build"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── 5. OUR 6-STEP BLUEPRINT ───────────── */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-[#0d0d15]">
        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll>
            <div className="text-center">
              <SectionKicker>Process</SectionKicker>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-4">
                Our 6-Step <span className="gradient-text">Blueprint</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-16 text-lg">
                A disciplined approach to ensure quality, transparency, and timely delivery.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {blueprint.map((b, i) => (
              <AnimateOnScroll key={b.n} delay={i * 0.07}>
                <article className="group relative h-full p-7 rounded-2xl bg-white dark:bg-[#131320] border border-gray-200 dark:border-gray-800 hover:border-[#764ba2]/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                  <span className="absolute top-4 right-6 text-5xl font-black text-gray-100 dark:text-white/5 group-hover:gradient-text transition-all select-none">
                    {b.n}
                  </span>
                  <div className="relative w-9 h-9 rounded-lg gradient-bg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="relative text-lg font-bold text-gray-900 dark:text-white mb-2">{b.title}</h3>
                  <p className="relative text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{b.desc}</p>
                </article>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. STANDARD IN EVERY PROJECT ──────── */}
      <section className="py-24 px-6 bg-gray-100 dark:bg-[#0d0d15]">
        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll>
            <div className="relative rounded-[2rem] bg-white dark:bg-[#131320] border border-gray-100 dark:border-gray-800 px-8 md:px-14 py-12 md:py-16 overflow-hidden">
              {/* faint code icon top-right (plain icon, no tile) */}
              <svg
                aria-hidden
                className="absolute top-10 right-10 md:top-14 md:right-14 w-16 h-16 md:w-20 md:h-20 text-gray-200 dark:text-white/10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>

              {/* small tag pill */}
              <span className="inline-block px-3 py-1 mb-5 rounded-full bg-[#764ba2]/10 text-[10px] font-bold tracking-[0.15em] uppercase text-[#764ba2] dark:text-[#667eea]">
                Standards
              </span>

              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-3">
                Standard in Every Project
              </h2>
              <p className="text-gray-400 dark:text-gray-500 max-w-xl text-base mb-14">
                We don&rsquo;t treat these as &lsquo;extras&rsquo;. They are the minimum requirement for a professional web presence.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
                {standards.map((s, i) => (
                  <AnimateOnScroll key={s.title} delay={i * 0.05}>
                    <div className="group flex items-start gap-3">
                      {/* outline check-circle icon */}
                      <svg
                        className="w-5 h-5 mt-0.5 flex-shrink-0 text-gray-400 dark:text-gray-500 group-hover:text-[#764ba2] dark:group-hover:text-[#667eea] transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <h3 className="text-[15px] font-bold text-gray-900 dark:text-white mb-1">{s.title}</h3>
                        <p className="text-sm text-gray-400 dark:text-gray-500 leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── 7. THE ENGINE UNDER THE HOOD ──────── */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-[#0d0d15]">
        <div className="max-w-6xl mx-auto text-center">
          <AnimateOnScroll>
            <SectionKicker>Stack</SectionKicker>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-4">
              The Engine Under the <span className="gradient-text">Hood</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-16 text-lg">
              We use the world&rsquo;s most powerful technologies to build future-proof platforms.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {techStack.map((t, i) => (
              <AnimateOnScroll key={t.name} delay={i * 0.04}>
                <div className="group p-5 rounded-2xl bg-white dark:bg-[#131320] border border-gray-200 dark:border-gray-800 hover:border-[#764ba2]/40 hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 cursor-default">
                  <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={t.logo}
                      alt={`${t.name} logo`}
                      loading="lazy"
                      className={`w-10 h-10 object-contain ${t.invertDark ? "dark:invert" : ""}`}
                    />
                  </div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{t.name}</p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider mt-0.5">{t.group}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. BUILT FOR THE BOLD ─────────────── */}
      <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-[#0a0a0f] via-[#15082a] to-[#0a0a0f]">
        <div className="pointer-events-none absolute top-1/4 -left-32 w-[30rem] h-[30rem] rounded-full bg-[#667eea]/15 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 -right-32 w-[30rem] h-[30rem] rounded-full bg-[#764ba2]/20 blur-[120px]" />

        <div className="relative max-w-6xl mx-auto">
          <AnimateOnScroll>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
              <div>
                <span className="inline-block px-4 py-1.5 mb-5 rounded-full bg-white/10 border border-white/15 text-xs font-bold tracking-[0.2em] uppercase text-white backdrop-blur-md">
                  Recent Projects
                </span>
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight mb-3">
                  Built for the <span className="gradient-text">Bold</span>
                </h2>
                <p className="text-gray-400 max-w-xl text-lg">
                  Explore how we&rsquo;ve helped startups and Fortune 500s scale.
                </p>
              </div>
              <a href="/portfolio" className="group inline-flex items-center gap-2 text-sm font-semibold text-white whitespace-nowrap hover:gap-3 transition-all">
                View all Projects
                <svg className="w-4 h-4 text-[#667eea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {boldProjects.map((p, i) => (
              <AnimateOnScroll key={p.name} delay={i * 0.1}>
                <article className="group relative rounded-[1.75rem] overflow-hidden bg-white/[0.06] backdrop-blur-2xl border border-white/10 hover:border-white/25 transition-all cursor-pointer">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.img}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/80 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 text-[10px] font-bold tracking-[0.2em] uppercase text-white bg-white/15 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full">
                      {p.tag}
                    </span>
                  </div>
                  <div className="p-7">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:gradient-text transition-all">{p.name}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-5">{p.desc}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#667eea] group-hover:gap-3 transition-all">
                      View project
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </div>
                </article>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. YOUR TECHNICAL PARTNER ─────────── */}
      <section className="py-24 px-6 bg-white dark:bg-[#0a0a0f]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          {/* Stats */}
          <AnimateOnScroll direction="left">
            <div className="grid grid-cols-2 gap-5">
              {partnerStats.map((s, i) => (
                <TiltCard key={s.label} className={i % 2 === 1 ? "mt-8" : ""}>
                  <div className="p-7 rounded-2xl bg-gray-50 dark:bg-[#131320] border border-gray-200 dark:border-gray-800 text-center hover:border-[#764ba2]/40 transition-colors">
                    <div className="text-4xl font-extrabold gradient-text mb-1">{s.value}</div>
                    <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{s.label}</div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </AnimateOnScroll>

          {/* Copy */}
          <div>
            <AnimateOnScroll direction="right">
              <SectionKicker>Trust</SectionKicker>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-4">
                Your Technical Partner,{" "}
                <span className="gradient-text">Not Just a Vendor</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg">
                We know how you trust your business success on much of your code quality. We&rsquo;re here for the long run.
              </p>
              <ul className="flex flex-col gap-4">
                {partnerPoints.map((p) => (
                  <li key={p} className="group flex items-start gap-3">
                    <span className="w-6 h-6 mt-0.5 rounded-full gradient-bg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-base font-medium text-gray-700 dark:text-gray-200">{p}</span>
                  </li>
                ))}
              </ul>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ── 10. TESTIMONIALS — portfolio brands ── */}
      <ReviewsCarousel
        variant="muted"
        kicker="Testimonials"
        title={<>Trusted by the brands <span className="gradient-text">we build for.</span></>}
        subtitle="Don't take our word for it — here's what the businesses we've built for say."
      />

      {/* ── 11. COMMON QUESTIONS ─────────────── */}
      <section className="py-24 px-6 bg-white dark:bg-[#0a0a0f]">
        <div className="max-w-3xl mx-auto">
          <AnimateOnScroll>
            <div className="text-center">
              <SectionKicker>FAQ</SectionKicker>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-4">
                Common <span className="gradient-text">Questions</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-14 text-lg">
                Everything you want to know about working with our engineering team.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <AnimateOnScroll key={faq.q} delay={i * 0.05}>
                <div
                  className={`rounded-2xl border bg-gray-50 dark:bg-[#131320] transition-all overflow-hidden ${
                    openFaq === i ? "border-[#764ba2]/40 shadow-sm" : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                  >
                    <span className={`text-sm font-semibold ${openFaq === i ? "gradient-text" : "text-gray-800 dark:text-gray-200"}`}>
                      {faq.q}
                    </span>
                    <span
                      className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
                        openFaq === i ? "gradient-bg text-white rotate-45" : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                      </svg>
                    </span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}>
                    <p className="px-6 pb-5 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12. CTA ──────────────────────────── */}
      <section id="cta" className="py-24 px-6 bg-white dark:bg-[#0a0a0f]">
        <div className="max-w-5xl mx-auto">
          <AnimateOnScroll>
            <div className="relative overflow-hidden rounded-[2rem] gradient-bg p-12 md:p-20 text-center text-white shadow-2xl">
              {/* decorative glow */}
              <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />

              <h2 className="relative text-3xl md:text-5xl font-extrabold leading-tight mb-4">
                Ready to build your digital empire?
              </h2>
              <p className="relative text-base md:text-lg opacity-90 max-w-xl mx-auto mb-9">
                Join 150+ brands that have trusted their digital presence with our world-class engineering team.
              </p>
              <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="/#contact"
                  className="bg-white text-gray-900 px-8 py-3.5 rounded-full font-semibold text-base hover:bg-gray-100 hover:-translate-y-0.5 transition-all shadow-lg"
                >
                  Get Your Free Quote
                </a>
                <a
                  href="/#contact"
                  className="border-2 border-white/60 text-white px-8 py-3.5 rounded-full font-semibold text-base hover:bg-white/10 hover:-translate-y-0.5 transition-all"
                >
                  Book a Strategy Call
                </a>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
