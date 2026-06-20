"use client";
import { useState } from "react";
import AnimateOnScroll from "./AnimateOnScroll";
import ContactFormCard from "./ContactFormCard";
import TiltCard from "./TiltCard";
import ReviewsCarousel from "./ReviewsCarousel";

/* ─── DATA ─── */

const whyMatter = [
  {
    title: "Hyper-Granular Targeting",
    desc: "Reach people by interest, behavior, and lookalike audiences with precision no other channel matches.",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Scalable ROI",
    desc: "Once a creative and audience combination proves itself, budget scales without losing efficiency.",
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  },
  {
    title: "Full-Funnel Reach",
    desc: "From cold discovery on Reels to retargeted checkout nudges — one platform covers the whole journey.",
    icon: "M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z",
  },
];

const management = [
  {
    title: "Creative Production",
    desc: "Scroll-stopping statics, video, and UGC-style creatives produced in-house.",
    icon: "M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z",
  },
  {
    title: "Account Audits",
    desc: "Deep, line-item reviews of your account structure, spend, and pixel health.",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  },
  {
    title: "Conversion API",
    desc: "Server-side tracking that survives iOS updates and keeps your data accurate.",
    icon: "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
  {
    title: "Retargeting Magic",
    desc: "Win back cart abandoners and warm audiences with sequenced messaging.",
    icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
  },
];

const industries = [
  {
    key: "ecommerce",
    label: "E-commerce",
    heading: "Optimizing for E-commerce",
    desc: "Catalog-driven campaigns engineered to push products into carts. We implement dynamic product ads and creative angles that show the right item to the right shopper at the right stage of the funnel.",
    points: ["Dynamic Product Ads", "Custom Retention Loops", "CTR-focused creative testing"],
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80",
  },
  {
    key: "saas",
    label: "SaaS",
    heading: "Optimizing for SaaS",
    desc: "Demand-gen campaigns built around free trials and demo bookings. We qualify clicks before they cost you money, and feed CRM data back into the algorithm for compounding lead quality.",
    points: ["Lead-quality scoring loops", "Demo & trial funnels", "CRM-integrated reporting"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
  },
  {
    key: "leads",
    label: "Lead Gen",
    heading: "Optimizing for Lead Gen",
    desc: "Instant forms and landing pages tuned for cost-per-qualified-lead, not vanity volume. Every lead is tracked through to close so spend follows revenue.",
    points: ["Instant form optimization", "Qualified-lead tracking", "Speed-to-lead automations"],
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80",
  },
  {
    key: "local",
    label: "Local Business",
    heading: "Optimizing for Local Business",
    desc: "Radius-targeted campaigns that fill calendars and drive foot traffic. Click-to-call, directions, and bookings measured down to the storefront.",
    points: ["Radius & geo targeting", "Click-to-call campaigns", "Store-visit measurement"],
    img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=80",
  },
];

const growthSteps = [
  { n: "01", title: "Deep-Dive Audit", desc: "We dissect your past spend, creatives, and pixel data to find what's leaking and what's working." },
  { n: "02", title: "Creative Strategy", desc: "Custom angle map and creative batch designed for your audience — never recycled templates." },
  { n: "03", title: "Precision Launch", desc: "Structured campaigns with clean naming, budgets, and exclusions from day one." },
  { n: "04", title: "Optimization Engine", desc: "Daily checks, weekly creative refreshes, and scaling rules driven by ROAS and CPA targets." },
];

const winItems = [
  { title: "Pixel Setup", desc: "Flawless tracking implementation across all events.", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { title: "A/B Testing", desc: "Constant testing of headlines, images, and hooks.", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" },
  { title: "Weekly Reporting", desc: "Clear, jargon-free dashboards on performance.", icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  { title: "24/7 Monitoring", desc: "Automated alerts watch your account around the clock.", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
];

const ecosystem = [
  { name: "Facebook", icon: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
  { name: "Instagram", icon: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M7.5 2h9a5.5 5.5 0 015.5 5.5v9a5.5 5.5 0 01-5.5 5.5h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2z" },
  { name: "Messenger", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
  { name: "WhatsApp", icon: "M3 21l1.65-3.8a9 9 0 113.4 2.9L3 21M9 10a.5.5 0 001 0V9a.5.5 0 00-1 0v1zm0 0a5 5 0 005 5h1a.5.5 0 000-1h-1a.5.5 0 000 1" },
  { name: "Audience Network", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
];

const dataStats = [
  { value: "$50M+", label: "Ad spend managed" },
  { value: "450%", label: "Avg. account growth" },
  { value: "12+", label: "Industry verticals" },
  { value: "98%", label: "Client retention" },
];

const dataPoints = [
  { title: "No Long-Term Contracts", desc: "We earn your business month to month through performance." },
  { title: "Total Transparency", desc: "You own the ad account and see every number we see." },
  { title: "Proactive Communication", desc: "Weekly strategy calls, not just automated reports." },
];

const faqs = [
  {
    q: "What is your typical management fee?",
    a: "We offer flat-fee and percentage-of-spend models depending on the scale of your business. You get a clear quote up front — no hidden costs, and you keep full ownership of the ad account.",
  },
  {
    q: "Do you handle the creative production?",
    a: "Yes — statics, motion graphics, video edits, and UGC-style content are all produced in-house and included in our management scope.",
  },
  {
    q: "How long does it take to see results?",
    a: "Most accounts see meaningful signal within 2–4 weeks as testing concludes, with scaling typically beginning in month two.",
  },
  {
    q: "Will I own the ad account and creative assets?",
    a: "Always. Everything runs inside your Business Manager, and every creative we produce is yours to keep.",
  },
  {
    q: "How do you handle iOS 14.5+ tracking issues?",
    a: "We implement the Conversions API alongside the pixel for server-side tracking, plus UTM frameworks and post-purchase surveys to recover lost attribution.",
  },
];

/* ─── SHARED ─── */

function SectionKicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-4 py-1.5 mb-5 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs font-bold tracking-[0.2em] uppercase gradient-text shadow-sm">
      {children}
    </span>
  );
}

/* ─── PAGE ─── */

export default function MetaAdsDetailPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState(0);
  const tab = industries[activeTab];

  return (
    <>
      {/* 1. HERO */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-white dark:bg-[#0a0a0f]">
        <div className="absolute inset-0 dot-grid dot-fade pointer-events-none" />
        <div className="pointer-events-none absolute -top-24 right-0 w-[34rem] h-[34rem] rounded-full bg-gradient-to-bl from-[#764ba2]/25 via-[#667eea]/15 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 w-[28rem] h-[28rem] rounded-full bg-gradient-to-tr from-[#667eea]/20 to-transparent blur-3xl" />

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2">

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white leading-[0.98] mb-3">
              Meta Ads
            </h1>
            <p className="font-serif-display italic gradient-text font-medium text-3xl md:text-5xl mb-7">
              that scale revenue.
            </p>
            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed mb-9">
              Precision-targeted Facebook & Instagram advertising. We transform browsers into
              loyal customers through rigorous testing, scroll-stopping creative, and
              ROAS-led optimization.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#growth" className="gradient-bg text-white px-7 py-3.5 rounded-xl font-semibold text-base hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg">
                See how we scale
              </a>
              <a href="/portfolio" className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 px-7 py-3.5 rounded-xl font-semibold text-base hover:border-[#764ba2] hover:text-[#764ba2] hover:-translate-y-0.5 transition-all">
                View success stories
              </a>
            </div>
          </div>

          <div className="lg:col-span-1 lg:sticky lg:top-28">
            <ContactFormCard service="Meta Ads" />
          </div>
        </div>
      </section>

      {/* 2. WHY META ADS MATTER */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-[#0d0d15]">
        <div className="max-w-6xl mx-auto text-center">
          <AnimateOnScroll>
            <SectionKicker>The Edge</SectionKicker>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-4">
              Why Meta Ads <span className="gradient-text">Matter</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-16 text-lg">
              Three billion people scroll Facebook and Instagram daily. Your customers are already there.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyMatter.map((c, i) => (
              <AnimateOnScroll key={c.title} delay={i * 0.1}>
                <TiltCard className="h-full">
                  <article className="group h-full p-8 rounded-2xl text-left bg-white dark:bg-[#131320] border border-gray-200 dark:border-gray-800 hover:border-[#764ba2]/40 hover:shadow-[0_20px_50px_rgba(91,43,232,0.12)] transition-all" style={{ transformStyle: "preserve-3d" }}>
                    <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-6 shadow-md group-hover:scale-110 group-hover:rotate-6 transition-transform" style={{ transform: "translateZ(36px)" }}>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={c.icon} />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3" style={{ transform: "translateZ(26px)" }}>{c.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed" style={{ transform: "translateZ(16px)" }}>{c.desc}</p>
                  </article>
                </TiltCard>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FULL-SPECTRUM AD MANAGEMENT */}
      <section className="py-24 px-6 bg-white dark:bg-[#0a0a0f]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-2">
            <AnimateOnScroll direction="left">
              <SectionKicker>Services</SectionKicker>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-4">
                Full-Spectrum Ad <span className="gradient-text">Management</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg">
                We don&rsquo;t just &ldquo;set it and forget it.&rdquo; Our team provides end-to-end management — from creative concepting to technical implementation.
              </p>
              <a href="/#services" className="group inline-flex items-center gap-2 text-sm font-semibold gradient-text hover:gap-3 transition-all">
                Explore all services
                <svg className="w-4 h-4 text-[#764ba2] dark:text-[#667eea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </AnimateOnScroll>
          </div>

          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {management.map((m, i) => (
              <AnimateOnScroll key={m.title} delay={i * 0.07}>
                <article className="group h-full p-6 rounded-2xl bg-gray-50 dark:bg-[#131320] border border-gray-200 dark:border-gray-800 hover:border-[#764ba2]/40 hover:-translate-y-1 transition-all duration-300">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#667eea]/15 to-[#764ba2]/15 border border-[#764ba2]/25 flex items-center justify-center mb-4 group-hover:gradient-bg transition-all">
                    <svg className="w-5 h-5 text-[#764ba2] dark:text-[#667eea] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={m.icon} />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{m.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{m.desc}</p>
                </article>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TAILORED STRATEGIES (interactive tabs) */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-[#0d0d15]">
        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll>
            <div className="text-center">
              <SectionKicker>Industries</SectionKicker>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-4">
                Tailored Strategies for Your <span className="gradient-text">Industry</span>
              </h2>
            </div>
          </AnimateOnScroll>

          {/* Tab buttons */}
          <AnimateOnScroll>
            <div className="flex flex-wrap justify-center gap-2 mt-10 mb-10">
              {industries.map((ind, i) => (
                <button
                  key={ind.key}
                  onClick={() => setActiveTab(i)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    i === activeTab
                      ? "gradient-bg text-white shadow-[0_4px_14px_rgba(91,43,232,0.35)]"
                      : "bg-white dark:bg-[#131320] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:border-[#764ba2]/40 hover:text-[#764ba2] dark:hover:text-[#667eea]"
                  }`}
                >
                  {ind.label}
                </button>
              ))}
            </div>
          </AnimateOnScroll>

          {/* Tab panel */}
          <AnimateOnScroll>
            <div key={tab.key} className="grid lg:grid-cols-2 gap-10 items-center p-8 md:p-12 rounded-[2rem] bg-white dark:bg-[#131320] border border-gray-200 dark:border-gray-800 animate-[fadeIn_0.4s_ease]">
              <div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-4">{tab.heading}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-7">{tab.desc}</p>
                <ul className="flex flex-col gap-3">
                  {tab.points.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-sm font-semibold text-gray-800 dark:text-gray-200">
                      <span className="w-5 h-5 rounded-full gradient-bg flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative group">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-[#667eea]/20 to-[#764ba2]/20 blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={tab.img} alt={tab.heading} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* 5. HOW WE DRIVE GROWTH */}
      <section id="growth" className="py-24 px-6 bg-white dark:bg-[#0a0a0f]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <AnimateOnScroll direction="left">
              <SectionKicker>Process</SectionKicker>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-10">
                How We Drive <span className="gradient-text">Growth</span>
              </h2>
            </AnimateOnScroll>

            <div className="flex flex-col gap-4">
              {growthSteps.map((s, i) => (
                <AnimateOnScroll key={s.n} delay={i * 0.08} direction="left">
                  <div className="group flex items-start gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-[#131320] border border-gray-200 dark:border-gray-800 hover:border-[#764ba2]/40 hover:translate-x-1.5 transition-all duration-300">
                    <span className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0 text-white text-xs font-bold group-hover:scale-110 transition-transform">
                      {s.n}
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">{s.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{s.desc}</p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>

          {/* Floating scaling card */}
          <AnimateOnScroll direction="right">
            <TiltCard>
              <div className="relative p-10 rounded-[2rem] bg-gray-50 dark:bg-[#131320] border border-gray-200 dark:border-gray-800 overflow-hidden" style={{ transformStyle: "preserve-3d" }}>
                <div className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gradient-to-br from-[#667eea]/25 to-[#764ba2]/25 blur-3xl" />
                <div className="relative text-center" style={{ transform: "translateZ(30px)" }}>
                  <div className="w-16 h-16 mx-auto rounded-2xl gradient-bg flex items-center justify-center mb-6 shadow-xl shadow-[#764ba2]/25">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-3">Scaling Horizon</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs mx-auto">
                    Systematic daily and weekly oversight, ensuring 24/7 ROAS — your spend efficiency never sleeps.
                  </p>
                </div>
              </div>
            </TiltCard>
          </AnimateOnScroll>
        </div>
      </section>

      {/* 6. EVERYTHING YOU NEED TO WIN */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-[#0d0d15]">
        <div className="max-w-6xl mx-auto text-center">
          <AnimateOnScroll>
            <SectionKicker>Included</SectionKicker>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-16">
              Everything You Need to <span className="gradient-text">Win</span>
            </h2>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {winItems.map((w, i) => (
              <AnimateOnScroll key={w.title} delay={i * 0.07}>
                <div className="group p-7 rounded-2xl bg-white dark:bg-[#131320] border border-gray-200 dark:border-gray-800 hover:border-[#764ba2]/40 hover:-translate-y-1.5 transition-all duration-300">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-[#667eea]/15 to-[#764ba2]/15 border border-[#764ba2]/25 flex items-center justify-center mb-4 group-hover:gradient-bg transition-all">
                    <svg className="w-6 h-6 text-[#764ba2] dark:text-[#667eea] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={w.icon} />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{w.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{w.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Meta ecosystem band */}
          <AnimateOnScroll>
            <div className="mt-14 p-8 rounded-[2rem] bg-white dark:bg-[#131320] border border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-8">
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">The Meta Ecosystem</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
                  We utilize the entire suite of Meta technologies to ensure your brand is seen everywhere your customers hang out.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {ecosystem.map((e) => (
                  <div key={e.name} className="group flex flex-col items-center gap-1.5 w-20" title={e.name}>
                    <span className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:gradient-bg group-hover:scale-110 transition-all">
                      <svg className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d={e.icon} />
                      </svg>
                    </span>
                    <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400">{e.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* 8. DATA OVER INTUITION (violet band) */}
      <section className="py-24 px-6 bg-white dark:bg-[#0a0a0f]">
        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll>
            <div className="relative overflow-hidden rounded-[2rem] gradient-bg p-10 md:p-14 text-white">
              <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />

              <div className="relative grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">
                    Data Over Intuition.<br />Every Single Time.
                  </h2>
                  <p className="text-white/80 mb-9 max-w-md">
                    Most agencies guess. We test. Our proprietary framework has been refined across $50M+ in ad spend, ensuring we don&rsquo;t just follow best practices — we set them.
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    {dataStats.map((s) => (
                      <div key={s.label} className="group cursor-default">
                        <div className="text-3xl md:text-4xl font-extrabold group-hover:scale-105 transition-transform origin-left">{s.value}</div>
                        <div className="text-xs font-semibold text-white/70 uppercase tracking-wider mt-1">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  {dataPoints.map((p) => (
                    <div key={p.title} className="group flex items-start gap-4 p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/15 hover:translate-x-1.5 transition-all duration-300">
                      <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <div>
                        <h3 className="text-base font-bold mb-0.5">{p.title}</h3>
                        <p className="text-sm text-white/75">{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* 9. TESTIMONIALS — portfolio brands */}
      <ReviewsCarousel
        variant="muted"
        kicker="Testimonials"
        title={<>What our <span className="gradient-text">partners say.</span></>}
        subtitle="Real results, in the words of the brands we've grown."
      />

      {/* 10. FAQ */}
      <section className="py-24 px-6 bg-white dark:bg-[#0a0a0f]">
        <div className="max-w-3xl mx-auto">
          <AnimateOnScroll>
            <div className="text-center">
              <SectionKicker>FAQ</SectionKicker>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-14">
                Frequently Asked <span className="gradient-text">Questions</span>
              </h2>
            </div>
          </AnimateOnScroll>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <AnimateOnScroll key={faq.q} delay={i * 0.05}>
                <div className={`rounded-2xl border bg-gray-50 dark:bg-[#131320] transition-all overflow-hidden ${openFaq === i ? "border-[#764ba2]/40 shadow-sm" : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"}`}>
                  <button type="button" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i} className="w-full text-left px-6 py-5 flex items-center justify-between gap-4">
                    <span className={`text-sm font-semibold ${openFaq === i ? "gradient-text" : "text-gray-800 dark:text-gray-200"}`}>{faq.q}</span>
                    <span className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-300 ${openFaq === i ? "gradient-bg text-white rotate-45" : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"}`}>
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

      {/* 11. CTA */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-[#0d0d15]">
        <div className="max-w-5xl mx-auto">
          <AnimateOnScroll>
            <div className="relative overflow-hidden rounded-[2rem] gradient-bg p-12 md:p-20 text-center text-white shadow-2xl">
              <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
              <h2 className="relative text-3xl md:text-5xl font-extrabold leading-tight mb-4">
                Ready to Scale Your Business?
              </h2>
              <p className="relative text-base md:text-lg opacity-90 max-w-xl mx-auto mb-9">
                Stop guessing and start growing. Book your free ad account audit today and see the potential hidden in your data.
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
    </>
  );
}
