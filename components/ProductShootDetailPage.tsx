"use client";
import { useState } from "react";
import AnimateOnScroll from "./AnimateOnScroll";
import ContactFormCard from "./ContactFormCard";
import TiltCard from "./TiltCard";
import ReviewsCarousel from "./ReviewsCarousel";

/* ─── DATA ─── */

const visualPoints = [
  {
    title: "First Impressions",
    desc: "Shoppers decide in seconds. A crisp, professional hero image is the difference between a scroll-past and a click.",
    icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
  },
  {
    title: "Conversion Uplift",
    desc: "Listings with high-quality, multi-angle imagery consistently convert higher and return fewer products.",
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  },
  {
    title: "Brand Authority",
    desc: "Consistent, art-directed visuals across your catalog and ads make your brand instantly recognizable.",
    icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
  },
];

const specialized = [
  { title: "E-commerce White Background", desc: "Clean, marketplace-compliant images for Amazon, Shopify, and beyond.", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { title: "Lifestyle Contextual", desc: "Real-world scenes that help shoppers picture your product in their lives.", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { title: "Creative Hero Shots", desc: "Bold, art-directed compositions designed for campaigns and launches.", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { title: "Macro Detail", desc: "Extreme close-ups that showcase texture, stitching, and craftsmanship.", icon: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" },
  { title: "360° Product Spins", desc: "Interactive spins that let customers inspect every angle online.", icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" },
  { title: "Post-Production", desc: "Color grading, retouching, and clipping paths handled in-house.", icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" },
];

const shotNeeds = [
  {
    category: "Apparel & Fashion",
    items: ["Ghost mannequin", "Flat lays", "On-model shoots", "Fabric details"],
    icon: "M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2m4-2v4m-4 4h8",
  },
  {
    category: "Tech & Electronics",
    items: ["Reflective surfaces", "Screen compositing", "Exploded views", "Scale shots"],
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    category: "Beauty & Personal Care",
    items: ["Texture smears", "Liquid pours", "Ingredient styling", "Set design"],
    icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  },
  {
    category: "Jewelry & Luxury",
    items: ["Focus stacking", "Sparkle control", "Premium props", "Black backgrounds"],
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

const processSteps = [
  { n: "1", title: "Unwrap & Check-In", desc: "We receive, inspect, and catalog your products the day they arrive." },
  { n: "2", title: "Sample Intake", desc: "Shot list confirmed, styling references locked, and lighting tests run." },
  { n: "3", title: "Production Day", desc: "Your full catalog is shot under colour-calibrated studio conditions." },
  { n: "4", title: "Post-Processing", desc: "Retouching, color grading, and delivery in every format you need." },
];

const whiteGlove = [
  "Unlimited image rights",
  "High-res JPEG & TIFF files",
  "Color accuracy match",
  "Web-ready optimization",
  "Marketplace compliance checks",
  "7-day turnaround standard",
];

const gearBrands = ["CANON", "PHASE ONE", "PROFOTO", "ADOBE", "CAPTURE ONE", "GODOX"];

const partnerReasons = [
  { n: "1", title: "Strategic Art Direction", desc: "Every frame is planned against your brand guidelines and conversion goals before the shutter clicks." },
  { n: "2", title: "Advanced Color Science", desc: "Calibrated monitors and controlled lighting guarantee your products look identical on screen and in hand." },
  { n: "3", title: "Scalable Production", desc: "From 10 SKUs to 1,000 — our pipeline keeps quality consistent at any catalog size." },
];

const faqs = [
  {
    q: "How do I get my products to you?",
    a: "Ship them directly to our studio — we confirm arrival with a check-in photo set. Local clients can also book a drop-off or schedule an on-location shoot.",
  },
  {
    q: "What is your typical turnaround time?",
    a: "Standard delivery is 7 days from shoot completion. Rush 48-hour delivery is available for launches and campaigns.",
  },
  {
    q: "Who owns the rights to the photos?",
    a: "You do — full, unlimited commercial rights to every delivered image, forever. No licensing fees, no renewals.",
  },
  {
    q: "Can you match my existing brand lighting?",
    a: "Yes. Send reference images and we'll replicate the lighting setup and grade so new shots blend seamlessly into your existing catalog.",
  },
  {
    q: "Do you handle product returns?",
    a: "Of course. After the shoot we securely repackage and ship your products back, or store them for future shoots if you prefer.",
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

export default function ProductShootDetailPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      {/* 1. HERO */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-white dark:bg-[#0a0a0f]">
        <div className="absolute inset-0 dot-grid dot-fade pointer-events-none" />
        <div className="pointer-events-none absolute -top-24 right-0 w-[34rem] h-[34rem] rounded-full bg-gradient-to-bl from-[#764ba2]/25 via-[#667eea]/15 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 w-[28rem] h-[28rem] rounded-full bg-gradient-to-tr from-[#667eea]/20 to-transparent blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-6 grid lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2">

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white leading-[0.98] mb-3">
              Product Shoot
            </h1>
            <p className="font-serif-display italic gradient-text font-medium text-3xl md:text-5xl mb-7">
              that sells the story.
            </p>
            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed">
              Capture the essence of your brand. High-end product photography crafted with
              studio lighting, meticulous styling, and post-production that makes every
              SKU look premium.
            </p>
          </div>

          <div className="lg:col-span-1 lg:sticky lg:top-28">
            <ContactFormCard service="Product Photography" />
          </div>
        </div>
      </section>

      {/* 2. VISUALS SPEAK LOUDER THAN SPECS */}
      <section className="py-24 px-4 bg-gray-50 dark:bg-[#0d0d15]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <AnimateOnScroll>
            <SectionKicker>Why Imagery</SectionKicker>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-4">
              Visuals Speak Louder Than <span className="gradient-text">Specs</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-16 text-lg">
              In a digital world, your product photography is your salesperson. We make sure it&rsquo;s pitching perfectly.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visualPoints.map((c, i) => (
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

      {/* 3. SPECIALIZED SOLUTIONS */}
      <section className="py-24 px-4 bg-white dark:bg-[#0a0a0f]">
        <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-2 lg:sticky lg:top-28">
            <AnimateOnScroll direction="left">
              <SectionKicker>Solutions</SectionKicker>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-4">
                Specialized <span className="gradient-text">Solutions</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg">
                We provide a comprehensive suite of photography services tailored to different platforms and marketing goals.
              </p>
              <a href="/#contact" className="group inline-flex items-center gap-2 text-sm font-semibold gradient-text hover:gap-3 transition-all">
                Discuss a custom shoot
                <svg className="w-4 h-4 text-[#764ba2] dark:text-[#667eea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </AnimateOnScroll>
          </div>

          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {specialized.map((s, i) => (
              <AnimateOnScroll key={s.title} delay={i * 0.05}>
                <article className="group h-full p-6 rounded-2xl bg-gray-50 dark:bg-[#131320] border border-gray-200 dark:border-gray-800 hover:border-[#764ba2]/40 hover:-translate-y-1 transition-all duration-300">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#667eea]/15 to-[#764ba2]/15 border border-[#764ba2]/25 flex items-center justify-center mb-4 group-hover:gradient-bg transition-all">
                    <svg className="w-5 h-5 text-[#764ba2] dark:text-[#667eea] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={s.icon} />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{s.desc}</p>
                </article>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE RIGHT SHOT FOR EVERY NEED */}
      <section className="py-24 px-4 bg-gray-50 dark:bg-[#0d0d15]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <AnimateOnScroll>
            <SectionKicker>Categories</SectionKicker>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-4">
              The Right Shot for Every <span className="gradient-text">Need</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-16 text-lg">
              We adapt our studio setup and lighting techniques to the specific requirements of your product category.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {shotNeeds.map((c, i) => (
              <AnimateOnScroll key={c.category} delay={i * 0.07}>
                <article className="group h-full p-6 rounded-2xl text-left bg-white dark:bg-[#131320] border border-gray-200 dark:border-gray-800 hover:border-[#764ba2]/40 hover:-translate-y-1.5 transition-all duration-300">
                  <div className="w-11 h-11 rounded-xl gradient-bg flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-md">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={c.icon} />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3">{c.category}</h3>
                  <ul className="flex flex-col gap-2">
                    {c.items.map((it) => (
                      <li key={it} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#667eea] to-[#764ba2] flex-shrink-0" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </article>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SEAMLESS FROM BOX TO BINARY */}
      <section className="py-24 px-4 bg-white dark:bg-[#0a0a0f]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <AnimateOnScroll>
            <SectionKicker>Workflow</SectionKicker>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-4">
              Seamless From Box to <span className="gradient-text">Binary</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-16 text-lg">
              Our streamlined production pipeline ensures high-volume consistency without sacrificing artistic quality.
            </p>
          </AnimateOnScroll>

          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* connector line */}
            <span aria-hidden className="hidden lg:block absolute top-7 left-[12%] right-[12%] h-px bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#667eea] opacity-40" />
            {processSteps.map((s, i) => (
              <AnimateOnScroll key={s.n} delay={i * 0.1}>
                <div className="group relative">
                  <span className="relative z-10 w-14 h-14 mx-auto rounded-full gradient-bg flex items-center justify-center text-white text-lg font-extrabold shadow-lg shadow-[#764ba2]/25 group-hover:scale-110 transition-transform">
                    {s.n}
                  </span>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mt-5 mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-[16rem] mx-auto">{s.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHITE-GLOVE SERVICE */}
      <section className="py-24 px-4 bg-gray-50 dark:bg-[#0d0d15]">
        <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <AnimateOnScroll direction="left">
              <SectionKicker>Standard</SectionKicker>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-4">
                White-Glove Service as <span className="gradient-text">Standard</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-10 text-lg">
                Every shoot is a partnership. We don&rsquo;t just deliver files — we deliver a finished, ready-to-publish catalog.
              </p>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {whiteGlove.map((item, i) => (
                <AnimateOnScroll key={item} delay={i * 0.05} direction="left">
                  <div className="group flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-[#131320] border border-gray-200 dark:border-gray-800 hover:border-[#764ba2]/40 hover:translate-x-1 transition-all duration-300">
                    <span className="w-6 h-6 rounded-full gradient-bg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{item}</span>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>

          <AnimateOnScroll direction="right">
            <div className="relative group">
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-[#667eea]/20 to-[#764ba2]/20 blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="relative aspect-[4/3] rounded-[1.75rem] overflow-hidden border border-gray-200 dark:border-gray-800 shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1000&q=80"
                  alt="Studio photography setup with professional lighting"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* gear brands band */}
      <section className="py-12 px-4 bg-white dark:bg-[#0a0a0f] border-y border-gray-100 dark:border-gray-800/60">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {gearBrands.map((b) => (
              <span key={b} className="text-sm font-bold tracking-[0.25em] text-gray-300 dark:text-gray-600 hover:text-gray-500 dark:hover:text-gray-400 transition-colors cursor-default">
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 8. WHY BRANDS PARTNER WITH US */}
      <section className="py-24 px-4 bg-gray-50 dark:bg-[#0d0d15]">
        <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
          <AnimateOnScroll direction="left">
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-[1.75rem] overflow-hidden border border-gray-200 dark:border-gray-800 shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1520390138845-fd2d229dd553?auto=format&fit=crop&w=1000&q=80"
                  alt="Photographer working in studio"
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-8 -right-4 sm:right-8 w-44 rounded-2xl overflow-hidden border-4 border-white dark:border-[#0d0d15] shadow-xl hidden sm:block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=500&q=80"
                  alt="Retouching detail work"
                  loading="lazy"
                  className="w-full aspect-square object-cover"
                />
              </div>
            </div>
          </AnimateOnScroll>

          <div>
            <AnimateOnScroll direction="right">
              <SectionKicker>Partnership</SectionKicker>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-4">
                Why Brands Partner <span className="gradient-text">With Us</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-10 text-lg">
                We go beyond the lens. Our production process is built around your scaling needs.
              </p>
            </AnimateOnScroll>

            <div className="flex flex-col gap-4 mb-9">
              {partnerReasons.map((r, i) => (
                <AnimateOnScroll key={r.n} delay={i * 0.08} direction="right">
                  <div className="group flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-[#131320] border border-gray-200 dark:border-gray-800 hover:border-[#764ba2]/40 hover:translate-x-1.5 transition-all duration-300">
                    <span className="w-9 h-9 rounded-full gradient-bg flex items-center justify-center flex-shrink-0 text-white text-sm font-bold group-hover:scale-110 transition-transform">
                      {r.n}
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">{r.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{r.desc}</p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>

            <AnimateOnScroll direction="right">
              <a href="/#contact" className="inline-flex items-center gap-2 gradient-bg text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg">
                Start Your Project
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS — portfolio brands */}
      <ReviewsCarousel
        variant="muted"
        kicker="Voices"
        title={<>Voices of <span className="gradient-text">Success.</span></>}
        subtitle="See how our work formed the bedrock for these growing brands."
      />

      {/* 10. CTA */}
      <section className="py-24 px-4 bg-white dark:bg-[#0a0a0f]">
        <div className="max-w-5xl mx-auto px-6">
          <AnimateOnScroll>
            <div className="relative overflow-hidden rounded-[2rem] gradient-bg p-12 md:p-20 text-center text-white shadow-2xl">
              <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
              <h2 className="relative text-3xl md:text-5xl font-extrabold leading-tight mb-4">
                Ready to Elevate Your Catalog?
              </h2>
              <p className="relative text-base md:text-lg opacity-90 max-w-xl mx-auto mb-9">
                Join the hundreds of brands using our high-end photography to drive revenue and build trust.
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

      {/* 11. COMMON QUESTIONS */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-[#0d0d15]">
        <div className="max-w-3xl mx-auto">
          <AnimateOnScroll>
            <div className="text-center">
              <SectionKicker>FAQ</SectionKicker>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-4">
                Common <span className="gradient-text">Questions</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-14 text-lg">
                Everything you need to know about our photography production and deliverables.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <AnimateOnScroll key={faq.q} delay={i * 0.05}>
                <div className={`rounded-2xl border bg-white dark:bg-[#131320] transition-all overflow-hidden ${openFaq === i ? "border-[#764ba2]/40 shadow-sm" : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"}`}>
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
    </>
  );
}
