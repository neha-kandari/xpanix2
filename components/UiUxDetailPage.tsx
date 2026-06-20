"use client";
import { useState } from "react";
import AnimateOnScroll from "./AnimateOnScroll";
import ReviewsCarousel from "./ReviewsCarousel";
import ContactFormCard from "./ContactFormCard";
import TiltCard from "./TiltCard";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const ambassadorPoints = [
  {
    title: "First Impressions",
    desc: "Users form an opinion of your site in about 50 milliseconds. We make every one of those count.",
  },
  {
    title: "Reduced Friction",
    desc: "Intuitive navigation leads to higher conversion rates and dramatically fewer drop-offs.",
  },
  {
    title: "User Loyalty",
    desc: "Consistency and accessibility build trust, turning one-time visitors into lifetime users.",
  },
];

const impactStats = [
  { value: "400%", label: "ROI delivered by design-led companies" },
  { value: "75%", label: "Of credibility judgments come from design" },
  { value: "88%", label: "Of users won't return after a bad experience" },
  { value: "2.5s", label: "Average attention span for first impressions" },
];

const designSolutions = [
  {
    title: "User Research",
    desc: "Interviews, surveys, and analytics that uncover what your users actually need — not what we assume.",
    icon: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
  },
  {
    title: "Information Architecture",
    desc: "Sitemaps and user flows that organize content so the right thing is always one tap away.",
    icon: "M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2",
  },
  {
    title: "Interaction Design",
    desc: "Micro-animations and transitions that guide attention and make every action feel effortless.",
    icon: "M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122",
  },
  {
    title: "Design Systems",
    desc: "Reusable token-based component libraries that keep your product consistent as it scales.",
    icon: "M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z",
  },
  {
    title: "Mobile-First Design",
    desc: "Seamless experiences designed for the smallest screen first, then scaled up gracefully.",
    icon: "M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z",
  },
  {
    title: "Accessibility (a11y)",
    desc: "WCAG-compliant color, contrast, and keyboard flows so every user can use your product.",
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  },
];

const ecosystems = [
  { title: "SaaS Dashboards", desc: "Data-dense UIs that stay clear", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  { title: "E-commerce", desc: "Checkout flows that convert", icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" },
  { title: "Mobile Apps", desc: "Native-feeling iOS & Android", icon: "M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z" },
  { title: "Marketing Sites", desc: "Stories that sell your brand", icon: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" },
];

const visionSteps = [
  { n: "01", title: "Discovery", desc: "Stakeholder interviews, user research, and competitive audits to define the problem space." },
  { n: "02", title: "Strategy", desc: "User personas, journey maps, and flows that turn the research into a clear direction." },
  { n: "03", title: "Design", desc: "Wireframes evolving into polished, high-fidelity UI with motion and interaction detail." },
  { n: "04", title: "Iteration", desc: "Usability testing and refinement loops until the experience performs in the real world." },
];

const packageItems = [
  "Clickable interactive prototypes",
  "Full design system & component library",
  "User research & interview documentation",
  "Accessibility & compliance report",
  "High-fidelity UI mockups for developers",
  "Style guides & typography scales",
];

const designTools = [
  { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
  { name: "Adobe XD", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/xd/xd-original.svg" },
  { name: "Framer", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg", invertDark: true },
  { name: "Sketch", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sketch/sketch-original.svg" },
  { name: "Miro", logo: "https://cdn.simpleicons.org/miro" },
];

const transformations = [
  {
    name: "FitTrack Dashboard",
    type: "SaaS / Health",
    desc: "A complete redesign of a fitness analytics platform — task success rate up 64%, support tickets cut in half.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "LuxeWear Mobile",
    type: "E-commerce / Fashion",
    desc: "A mobile-first shopping experience for a premium fashion label — checkout completion improved 2.1x.",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&q=80",
  },
];

const convertPoints = [
  {
    title: "Data-Backed Decisions",
    desc: "We don't guess. Every pixel placement is informed by user testing and analytics — not opinions.",
  },
  {
    title: "Pixel Perfection",
    desc: "Our obsessive attention to spacing, hierarchy, and rhythm is what separates good from unforgettable.",
  },
  {
    title: "Long-Term Scalability",
    desc: "Token-based systems mean your design evolves with your product instead of breaking under it.",
  },
];

const faqs = [
  {
    q: "How long does a typical UI/UX project take?",
    a: "A focused app or website design takes 2–4 weeks. Larger products with research, testing, and a full design system typically run 4–8 weeks. You get a clear timeline before we start.",
  },
  {
    q: "Will we own the design source files?",
    a: "Yes — 100%. You get the complete Figma files, the design system, all assets, and full IP ownership at handoff.",
  },
  {
    q: "Do you provide development services too?",
    a: "We do. Our in-house engineering team can take the designs straight to production, or we hand off developer-ready specs to your own team.",
  },
  {
    q: "How do you handle revisions and feedback?",
    a: "Design is shared in weekly review sessions with structured feedback rounds. Each milestone includes revision cycles, so nothing moves forward without your sign-off.",
  },
  {
    q: "Can you design for existing products?",
    a: "Absolutely. We frequently audit and redesign live products — improving usability and conversion without disrupting your existing users.",
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

export default function UiUxDetailPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      {/* ── 1. HERO (same layout as web dev page) ── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-white dark:bg-[#0a0a0f]">
        <div className="absolute inset-0 dot-grid dot-fade pointer-events-none" />
        <div className="pointer-events-none absolute -top-24 right-0 w-[34rem] h-[34rem] rounded-full bg-gradient-to-bl from-[#764ba2]/25 via-[#667eea]/15 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 w-[28rem] h-[28rem] rounded-full bg-gradient-to-tr from-[#667eea]/20 to-transparent blur-3xl" />

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2">

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white leading-[0.98] mb-3">
              UI/UX Design
            </h1>
            <p className="font-serif-display italic gradient-text font-medium text-3xl md:text-5xl mb-7">
              that feels right.
            </p>
            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed mb-9">
              We create human-centric design experiences that bridge the gap between your
              brand and business objectives. Beautiful, functional, and intuitive —
              from first wireframe to final pixel.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#package" className="gradient-bg text-white px-7 py-3.5 rounded-xl font-semibold text-base hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg">
                Explore our process
              </a>
              <a href="/portfolio" className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 px-7 py-3.5 rounded-xl font-semibold text-base hover:border-[#764ba2] hover:text-[#764ba2] hover:-translate-y-0.5 transition-all">
                View recent work
              </a>
            </div>
          </div>

          <div className="lg:col-span-1 lg:sticky lg:top-28">
            <ContactFormCard service="UI/UX Design" />
          </div>
        </div>
      </section>

      {/* ── 2. DESIGN IS THE SILENT AMBASSADOR ── */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-[#0d0d15]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          {/* Left: copy + bullets */}
          <div>
            <AnimateOnScroll direction="left">
              <SectionKicker>Value</SectionKicker>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-4">
                Design is the Silent Ambassador of{" "}
                <span className="gradient-text">Your Brand</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-10 text-lg">
                In a digital-first world, your interface is often the first interaction a
                customer has with your business. Good design isn&rsquo;t a luxury — it&rsquo;s a
                competitive necessity.
              </p>
            </AnimateOnScroll>

            <div className="flex flex-col gap-4">
              {ambassadorPoints.map((p, i) => (
                <AnimateOnScroll key={p.title} delay={i * 0.1} direction="left">
                  <div className="group flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-[#131320] border border-gray-200 dark:border-gray-800 hover:border-[#764ba2]/40 hover:translate-x-1.5 transition-all duration-300 cursor-default">
                    <span className="w-9 h-9 rounded-full gradient-bg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
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

          {/* Right: impact stats with tilt */}
          <AnimateOnScroll direction="right">
            <div className="grid grid-cols-2 gap-5">
              {impactStats.map((s, i) => (
                <TiltCard key={s.label} className={i % 2 === 1 ? "mt-8" : ""}>
                  <div className="p-7 rounded-2xl bg-white dark:bg-[#131320] border border-gray-200 dark:border-gray-800 text-center hover:border-[#764ba2]/40 hover:shadow-[0_20px_40px_rgba(91,43,232,0.1)] transition-all">
                    <div className="text-4xl font-extrabold gradient-text mb-2">{s.value}</div>
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400 leading-snug">{s.label}</div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── 3. COMPREHENSIVE DESIGN SOLUTIONS ── */}
      <section className="py-24 px-6 bg-white dark:bg-[#0a0a0f]">
        <div className="max-w-6xl mx-auto text-center">
          <AnimateOnScroll>
            <SectionKicker>Solutions</SectionKicker>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-4">
              Comprehensive Design <span className="gradient-text">Solutions</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-16 text-lg">
              From initial user research to pixel-perfect high-fidelity prototypes, we cover every stage of the design lifecycle.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {designSolutions.map((s, i) => (
              <AnimateOnScroll key={s.title} delay={i * 0.06}>
                <article className="group h-full p-7 rounded-2xl text-left bg-gray-50 dark:bg-[#131320] border border-gray-200 dark:border-gray-800 hover:border-[#764ba2]/40 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#667eea]/15 to-[#764ba2]/15 border border-[#764ba2]/25 flex items-center justify-center mb-5 group-hover:gradient-bg transition-all">
                    <svg className="w-5 h-5 text-[#764ba2] dark:text-[#667eea] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={s.icon} />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{s.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                </article>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. DESIGN FOR EVERY ECOSYSTEM ────── */}
      <section className="relative py-24 px-6 overflow-hidden bg-gray-50 dark:bg-[#0d0d15]">
        <div className="pointer-events-none absolute top-0 left-1/4 w-[26rem] h-[26rem] rounded-full bg-gradient-to-br from-[#667eea]/15 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 w-[26rem] h-[26rem] rounded-full bg-gradient-to-br from-[#764ba2]/15 to-transparent blur-3xl" />

        <div className="relative max-w-6xl mx-auto text-center">
          <AnimateOnScroll>
            <SectionKicker>Versatility</SectionKicker>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-4">
              Design for Every <span className="gradient-text">Ecosystem</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-16 text-lg">
              We specialize in creating cohesive experiences across every product surface.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ecosystems.map((e, i) => (
              <AnimateOnScroll key={e.title} delay={i * 0.07}>
                <div className="group p-6 rounded-2xl bg-white/70 dark:bg-[#131320]/70 backdrop-blur-xl border border-white/60 dark:border-white/10 hover:border-[#764ba2]/40 hover:-translate-y-1.5 transition-all duration-300 cursor-default">
                  <div className="w-12 h-12 mx-auto rounded-xl gradient-bg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-md">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={e.icon} />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">{e.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{e.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. HOW WE BUILD YOUR VISION ──────── */}
      <section className="py-24 px-6 bg-white dark:bg-[#0a0a0f]">
        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll>
            <div className="text-center">
              <SectionKicker>Process</SectionKicker>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-4">
                How We Build Your <span className="gradient-text">Vision</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-16 text-lg">
                Our systematic approach ensures that creativity is backed by logic and strategy at every step.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {visionSteps.map((v, i) => (
              <AnimateOnScroll key={v.n} delay={i * 0.08}>
                <article className="group relative h-full p-7 rounded-2xl bg-gray-50 dark:bg-[#131320] border border-gray-200 dark:border-gray-800 hover:border-[#764ba2]/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                  <span className="absolute top-4 right-6 text-5xl font-black text-gray-200 dark:text-white/5 group-hover:gradient-text transition-all select-none">
                    {v.n}
                  </span>
                  <h3 className="relative text-lg font-bold text-gray-900 dark:text-white mb-2 mt-8">{v.title}</h3>
                  <p className="relative text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{v.desc}</p>
                </article>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. WHAT YOU GET WITH OUR PACKAGE ─── */}
      <section id="package" className="py-16 px-6 bg-gray-50 dark:bg-[#0d0d15]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-stretch">
          {/* Left: image — matches the height of the right column */}
          <AnimateOnScroll direction="left" className="lg:h-full">
            <div className="relative group h-full">
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-[#667eea]/20 to-[#764ba2]/20 blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[260px] rounded-[1.75rem] overflow-hidden border border-gray-200 dark:border-gray-800 shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=1000&q=80"
                  alt="Minimal designer workspace"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </AnimateOnScroll>

          {/* Right: checklist */}
          <div className="flex flex-col">
            <AnimateOnScroll direction="right">
              <SectionKicker>Deliverables</SectionKicker>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-3">
                What You Get with Our{" "}
                <span className="gradient-text">UI/UX Package</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                We don&rsquo;t just deliver mockups. We deliver a complete blueprint for your product&rsquo;s success.
              </p>
            </AnimateOnScroll>

            <div className="flex flex-col gap-2.5">
              {packageItems.map((item, i) => (
                <AnimateOnScroll key={item} delay={i * 0.06} direction="right">
                  <div className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-white dark:bg-[#131320] border border-gray-200 dark:border-gray-800 hover:border-[#764ba2]/40 hover:translate-x-1.5 transition-all duration-300">
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
        </div>
      </section>

      {/* ── 7. TOOLS BAND ─────────────────────── */}
      <section className="py-16 px-6 bg-white dark:bg-[#0a0a0f] border-y border-gray-100 dark:border-gray-800/60">
        <div className="max-w-5xl mx-auto text-center">
          <AnimateOnScroll>
            <p className="text-xs font-semibold tracking-[0.35em] uppercase text-gray-400 dark:text-gray-500 mb-10">
              Powered by industry-leading design tools
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-8">
              {designTools.map((t) => (
                <div key={t.name} className="group flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-default">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.logo}
                    alt={`${t.name} logo`}
                    loading="lazy"
                    className={`w-7 h-7 object-contain group-hover:scale-110 transition-transform ${t.invertDark ? "dark:invert" : ""}`}
                  />
                  <span className="text-base font-bold text-gray-700 dark:text-gray-300">{t.name}</span>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── 8. RECENT DESIGN TRANSFORMATIONS ─── */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-[#0d0d15]">
        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
              <div>
                <SectionKicker>Showcase</SectionKicker>
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-3">
                  Recent Design <span className="gradient-text">Transformations</span>
                </h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-xl text-lg">
                  A glimpse into the digital experiences we&rsquo;ve crafted for world-class brands.
                </p>
              </div>
              <a href="/portfolio" className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap hover:gap-3 transition-all">
                View all Projects
                <svg className="w-4 h-4 text-[#764ba2] dark:text-[#667eea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {transformations.map((p, i) => (
              <AnimateOnScroll key={p.name} delay={i * 0.1}>
                <article className="group rounded-[1.75rem] overflow-hidden bg-white dark:bg-[#131320] border border-gray-200 dark:border-gray-800 hover:border-[#764ba2]/40 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] transition-all duration-300 cursor-pointer">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.img}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <span className="absolute top-4 left-4 text-[10px] font-bold tracking-[0.2em] uppercase text-white bg-black/40 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full">
                      {p.type}
                    </span>
                  </div>
                  <div className="p-7">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:gradient-text transition-all">{p.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-5">{p.desc}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#764ba2] dark:text-[#667eea] group-hover:gap-3 transition-all">
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

      {/* ── 9. WHY OUR DESIGNS CONVERT BETTER ── */}
      <section className="py-24 px-6 bg-white dark:bg-[#0a0a0f]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-stretch">
          {/* Left: points */}
          <div>
            <AnimateOnScroll direction="left">
              <SectionKicker>Conversion</SectionKicker>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-10">
                Why Our Designs <span className="gradient-text">Convert Better</span>
              </h2>
            </AnimateOnScroll>

            <div className="flex flex-col gap-4">
              {convertPoints.map((p, i) => (
                <AnimateOnScroll key={p.title} delay={i * 0.1} direction="left">
                  <div className="group flex items-start gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-[#131320] border border-gray-200 dark:border-gray-800 hover:border-[#764ba2]/40 hover:translate-x-1.5 transition-all duration-300">
                    <span className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M13 10V3L4 14h7v7l9-11h-7z" />
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

          {/* Right: violet quote card */}
          <AnimateOnScroll direction="right">
            <div className="relative h-full min-h-[22rem] rounded-[2rem] gradient-bg p-10 md:p-12 flex flex-col justify-center overflow-hidden group">
              <div className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-3xl group-hover:bg-white/15 transition-colors" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />

              <svg className="relative w-10 h-10 text-white/40 mb-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <blockquote className="relative text-2xl md:text-3xl font-bold text-white leading-snug mb-6">
                &ldquo;Design is the intermediary between information and understanding.&rdquo;
              </blockquote>
              <p className="relative text-white/70 text-sm font-semibold">— Hans Hofmann</p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── 10. TESTIMONIALS — portfolio brands ── */}
      <ReviewsCarousel
        variant="muted"
        kicker="Social Proof"
        title={<>What our <span className="gradient-text">partners say.</span></>}
        subtitle="The brands we've designed and built for, in their own words."
      />

      {/* ── 11. FAQ (split layout) ────────────── */}
      <section className="py-24 px-6 bg-white dark:bg-[#0a0a0f]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-12">
          {/* Left: heading + support card */}
          <div className="lg:col-span-2">
            <AnimateOnScroll direction="left">
              <SectionKicker>FAQ</SectionKicker>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-4">
                Frequently Asked <span className="gradient-text">Questions</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg">
                Everything you need to know about our design process and partnership model.
              </p>

              <div className="group p-6 rounded-2xl bg-gray-50 dark:bg-[#131320] border border-gray-200 dark:border-gray-800 hover:border-[#764ba2]/40 transition-colors">
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">Still have questions?</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  We&rsquo;d love to walk you through our design process on a quick call.
                </p>
                <a href="/#contact" className="inline-flex items-center gap-2 text-sm font-semibold gradient-text group-hover:gap-3 transition-all">
                  Contact Support
                  <svg className="w-4 h-4 text-[#764ba2] dark:text-[#667eea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Right: accordion */}
          <div className="lg:col-span-3 flex flex-col gap-3">
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
      <section className="py-24 px-6 bg-gray-50 dark:bg-[#0d0d15]">
        <div className="max-w-5xl mx-auto">
          <AnimateOnScroll>
            <div className="relative overflow-hidden rounded-[2rem] bg-white dark:bg-[#131320] border border-gray-200 dark:border-gray-800 p-12 md:p-20 text-center">
              <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gradient-to-br from-[#667eea]/20 to-transparent blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-gradient-to-tr from-[#764ba2]/20 to-transparent blur-3xl" />

              <h2 className="relative text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-4">
                Ready to build something{" "}
                <span className="font-serif-display italic gradient-text font-medium">extraordinary?</span>
              </h2>
              <p className="relative text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-9">
                Let&rsquo;s craft an experience that gives your product the edge your competitors will envy.
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
