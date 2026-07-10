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
    title: "Full Stack",
    desc: "End-to-end web applications with robust backends, real-time frontends, APIs, and cloud infrastructure — built to last.",
    tags: ["React", "Node.js", "API"],
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
  },
  {
    title: "Shopify",
    desc: "Expert Shopify development — custom themes, app integrations, and headless storefronts that turn browsers into buyers.",
    tags: ["Shopify", "Liquid", "Headless"],
    icon: "M16 11c0 2.209-1.791 4-4 4s-4-1.791-4-4 1.791-4 4-4 4 1.791 4 4zm5-5H3v13a2 2 0 002 2h14a2 2 0 002-2V6zm-9-4H3v2h18V2h-9z",
  },
  {
    title: "Wordpress",
    desc: "High-converting custom storefronts and online stores built to scale — fast checkout, smart product pages, and seamless payments.",
    tags: ["Custom Store", "Payments", "Cart"],
    icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
  },
  {
    title: "Framer",
    desc: "Stunning, interactive websites built in Framer — pixel-perfect animations, no-code CMS, and blazing-fast delivery.",
    tags: ["Framer", "Motion", "CMS"],
    icon: "M5 3h14l-7 7-7-7zm7 7l7 11H5l7-11z",
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
    url: "https://chinarroadlines.com/",
  },
  {
    name: "Rudraksh Travel",
    desc: "An immersive travel website with curated tour packages and a story-driven layout that turns visitors into booked trips.",
    img: "/projects/Rudraksh%20Travles.webp",
    tag: "Travel / Website",
    url: "https://www.rudrakshtravelspnp.com/",
  },
  {
    name: "Perfect Group",
    desc: "A polished corporate website that positions the brand as an authority in its industry.",
    img: "/projects/Perfect.webp",
    tag: "Corporate / Website",
    url: "https://www.perfectplastotech.com/",
  },
  {
    name: "WoodyPolo",
    desc: "A custom e-commerce storefront built for fast browsing and frictionless checkout.",
    img: "/projects/WoodyPolo.webp",
    tag: "E-commerce / Website",
    url: "https://neha-kandari.github.io/photoframe/",
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
      <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-white dark:bg-[#0a0a0f]">
        <div className="absolute inset-0 dot-grid dot-fade pointer-events-none" />
        <div className="pointer-events-none absolute -top-24 right-0 w-[34rem] h-[34rem] rounded-full bg-gradient-to-bl from-[#764ba2]/25 via-[#667eea]/15 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 w-[28rem] h-[28rem] rounded-full bg-gradient-to-tr from-[#667eea]/20 to-transparent blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-6 grid lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2">

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white leading-[0.98] mb-3">
              Web Development
            </h1>
            <p className="font-serif-display italic gradient-text font-medium text-3xl md:text-5xl mb-7">
              that converts.
            </p>
            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed">
              Professional web development services for growing brands. Custom websites,
              e-commerce stores, landing pages, and full-stack web apps — built fast,
              SEO-friendly, and mobile-first.
            </p>
          </div>

          <div className="lg:col-span-1 lg:sticky lg:top-28">
            <ContactFormCard service="Web Development" />
          </div>
        </div>
      </section>

      {/* ── 2. WHY YOUR DIGITAL FOUNDATION MATTERS ── */}
      <section className="py-24 px-4 bg-white dark:bg-[#0a0a0f]">
        <div className="max-w-5xl mx-auto px-6 text-center">
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
      <section className="py-24 px-4 bg-gray-50 dark:bg-[#0d0d15]">
        <div className="max-w-5xl mx-auto px-6 text-center">
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

      {/* ── 5. OUR 6-STEP BLUEPRINT ───────────── */}
      <section className="py-24 px-4 bg-gray-50 dark:bg-[#0d0d15]">
        <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-5 gap-14">
          {/* LEFT: heading — sticky while the timeline scrolls past */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-28">
              <AnimateOnScroll direction="left">
                <SectionKicker>Process</SectionKicker>
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-4">
                  Our 6-Step <span className="gradient-text">Blueprint</span>
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  A disciplined approach to ensure quality, transparency, and timely delivery.
                </p>
              </AnimateOnScroll>
            </div>
          </div>

          {/* RIGHT: vertical timeline on desktop, horizontal swipe on mobile */}
          <div className="lg:col-span-3">
            {/* Mobile: horizontally scrollable cards */}
            <div className="flex lg:hidden gap-4 overflow-x-auto snap-x snap-mandatory pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {blueprint.map((b) => (
                <div
                  key={b.n}
                  className="shrink-0 snap-start w-[78%] sm:w-[45%] p-6 rounded-2xl bg-white dark:bg-[#131320] border border-gray-200 dark:border-gray-800"
                >
                  <span className="inline-flex w-9 h-9 rounded-lg gradient-bg items-center justify-center mb-4 text-white text-xs font-bold">
                    {b.n}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{b.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>

            {/* Desktop: vertical timeline */}
            <div className="hidden lg:block relative">
              <span aria-hidden className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-[#667eea] via-[#764ba2] to-transparent" />
              <div className="flex flex-col gap-8">
                {blueprint.map((b, i) => (
                  <AnimateOnScroll key={b.n} delay={i * 0.08} direction="right">
                    <div className="group relative flex items-start gap-6">
                      <span className="relative z-10 w-10 h-10 rounded-full gradient-bg flex items-center justify-center flex-shrink-0 text-white text-xs font-bold shadow-lg shadow-[#764ba2]/25 group-hover:scale-110 transition-transform">
                        {b.n}
                      </span>
                      <div className="flex-1 p-6 rounded-2xl bg-white dark:bg-[#131320] border border-gray-200 dark:border-gray-800 group-hover:border-[#764ba2]/40 group-hover:translate-x-1.5 transition-all duration-300">
                        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1.5">{b.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{b.desc}</p>
                      </div>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. STANDARD IN EVERY PROJECT ──────── */}
      <section className="py-24 px-4 bg-gray-100 dark:bg-[#0d0d15]">
        <div className="max-w-5xl mx-auto px-6">
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
      <section className="relative py-24 overflow-hidden bg-gray-50 dark:bg-[#0d0d15]">
        <div className="max-w-5xl mx-auto px-6 text-center mb-16">
          <AnimateOnScroll>
            <SectionKicker>Stack</SectionKicker>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-4">
              The Engine Under the <span className="gradient-text">Hood</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              We use the world&rsquo;s most powerful technologies to build future-proof platforms.
            </p>
          </AnimateOnScroll>
        </div>

        {/* horizontal auto-scrolling strip */}
        <div className="relative w-full">
          <div className="flex gap-4 w-max animate-marquee">
            {[...techStack, ...techStack].map((t, i) => (
              <div
                key={`${t.name}-${i}`}
                className="group w-32 sm:w-36 flex-shrink-0 p-5 rounded-2xl bg-white dark:bg-[#131320] border border-gray-200 dark:border-gray-800 hover:border-[#764ba2]/40 hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 cursor-default text-center"
              >
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
            ))}
          </div>

          {/* edge fades */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 dark:from-[#0d0d15] to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 dark:from-[#0d0d15] to-transparent pointer-events-none" />
        </div>
      </section>

      {/* ── 8. BUILT FOR THE BOLD ─────────────── */}
      <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-b from-[#0a0a0f] via-[#15082a] to-[#0a0a0f]">
        <div className="pointer-events-none absolute top-1/4 -left-32 w-[30rem] h-[30rem] rounded-full bg-[#667eea]/15 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 -right-32 w-[30rem] h-[30rem] rounded-full bg-[#764ba2]/20 blur-[120px]" />

        <div className="relative max-w-5xl mx-auto px-6">
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

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {boldProjects.map((p, i) => (
              <AnimateOnScroll key={p.name} delay={i * 0.1}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block rounded-2xl overflow-hidden bg-white/[0.06] backdrop-blur-2xl border border-white/10 hover:border-white/25 transition-all cursor-pointer"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.img}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/80 via-transparent to-transparent" />
                    <span className="absolute top-2.5 left-2.5 text-[9px] font-bold tracking-[0.15em] uppercase text-white bg-white/15 backdrop-blur-md border border-white/20 px-2 py-0.5 rounded-full">
                      {p.tag}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-white mb-1.5 group-hover:gradient-text transition-all">{p.name}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed mb-3 line-clamp-2">{p.desc}</p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#667eea] group-hover:gap-2.5 transition-all">
                      View project
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </div>
                </a>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. YOUR TECHNICAL PARTNER ─────────── */}
      <section className="py-24 px-4 bg-white dark:bg-[#0a0a0f]">
        <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
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

      {/* ── 11. CTA ──────────────────────────── */}
      <section id="cta" className="py-24 px-4 bg-white dark:bg-[#0a0a0f]">
        <div className="max-w-5xl mx-auto px-6">
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
                  href="https://wa.me/918930005190?text=Hi%20Xpanix!%20%F0%9F%91%8B%20I'm%20ready%20to%20skyrocket%20my%20brand's%20digital%20presence.%20Let's%20connect!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-gray-900 px-8 py-3.5 rounded-full font-bold text-base hover:bg-gray-100 hover:-translate-y-0.5 transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center gap-2.5"
                >
                  Let&rsquo;s Connect
                  <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                </a>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── 12. COMMON QUESTIONS ─────────────── */}
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
    </>
  );
}
