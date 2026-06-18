"use client";
import { useState } from "react";
import TiltCard from "./TiltCard";

/* ─── DATA ─── */
const services = [
  {
    n: "01",
    label: "Build",
    title: "Web Development",
    description: "Fast, scalable websites and apps built on modern frameworks — the technical foundation your brand grows on.",
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
    description: "Interfaces that convert. We design products your users love — from wireframes to polished, pixel-perfect UI.",
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
    description: "High-converting Facebook & Instagram campaigns — scroll-stopping creatives and data-driven targeting that scales ROI.",
    features: [
      "Campaign strategy",
      "Scroll-stopping creatives",
      "Audience research",
      "A/B testing pipelines",
      "Funnel optimization",
      "ROAS-focused reporting",
    ],
    img: "/projects/ecomerce%20ui.webp",
  },
  {
    n: "04",
    label: "Discover",
    title: "SEO",
    description: "Rank higher and get found. We optimize your site end-to-end so the right customers discover you, month after month.",
    features: [
      "Technical SEO audit",
      "On-page optimization",
      "Keyword research",
      "Quality link building",
      "Content strategy",
      "Monthly performance reports",
    ],
    img: "/projects/Perfect.webp",
  },
  {
    n: "05",
    label: "Capture",
    title: "Product Photography",
    description: "Studio-grade product imagery that makes your brand look premium — crisp, styled, and ready for web, ads, and social.",
    features: [
      "Studio product shoots",
      "Lifestyle scenes",
      "Professional retouching",
      "360° product spins",
      "Ad-ready variations",
      "Brand-consistent styling",
    ],
    img: "/projects/Opal.webp",
  },
];

/* ─── BIG HERO ─── */
function ServicesBigHero() {
  return (
    <section className="relative pt-32 pb-8 px-6 overflow-hidden bg-white dark:bg-[#0a0a0f]">
      <div className="absolute inset-0 dot-grid dot-fade pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-500 dark:text-gray-400 mb-4">
          — Our offering
        </p>
        <h1 className="font-bold uppercase tracking-tighter leading-[0.85] text-gray-900 dark:text-white text-[20vw] md:text-[17vw]">
          SERVICES
        </h1>
        <p className="mt-6 max-w-2xl text-base md:text-lg text-gray-500 dark:text-gray-400">
          Five capabilities, one team. Tap any section to see how we work and what you&rsquo;ll walk away with.
        </p>
      </div>
    </section>
  );
}

/* ─── SERVICE ROW (plain row — no card, no border, no shadow) ─── */
function ServiceRow({ s }: { s: (typeof services)[number] }) {
  return (
    <div className="bg-white dark:bg-[#0a0a0f]">
      {/* GLASS TOP STRIP — backdrop spans full width, content aligns with hero container */}
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

      {/* BODY — same max-w-7xl px-6 container, so left edge aligns with hero "services" */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-20">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1] mb-14">
          {s.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-12 md:gap-24">
          {/* LEFT: image + description */}
          <div>
            <div className="relative w-full max-w-sm aspect-[16/10] rounded-2xl overflow-hidden mb-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm text-[15px] md:text-base">
              {s.description}
            </p>
          </div>

          {/* RIGHT: feature list */}
          <ul className="flex flex-col gap-7 md:pt-1">
            {s.features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-4 text-base md:text-lg text-gray-800 dark:text-gray-100"
              >
                <span className="text-[#667eea] font-bold text-xl leading-none translate-y-[1px]">+</span>
                <span className="font-medium">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ─── STICKY STACK — plain rows, sticky stacking ─── */
function ServicesStack() {
  return (
    <section className="relative bg-white dark:bg-[#0a0a0f]">
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

/* ─── WHY CHOOSE US (3D tilt cards) ─── */
const reasons = [
  {
    title: "Outcome-focused",
    desc: "Every decision is tied to measurable growth — traffic, conversion, revenue — not just deliverables on a checklist.",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    stat: "+48%",
    statLabel: "Avg traffic lift",
  },
  {
    title: "Senior team only",
    desc: "You work directly with experienced designers, developers, and strategists. No juniors, no agency middlemen.",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
    stat: "10+ yrs",
    statLabel: "Avg experience",
  },
  {
    title: "Fast turnarounds",
    desc: "Lean workflows let us ship in days, not months. No bureaucracy, no endless rounds — just polished work, fast.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    stat: "48h",
    statLabel: "First draft",
  },
  {
    title: "One team, end-to-end",
    desc: "Brand, web, ads, content, and analytics under one roof. One point of contact, one bill, zero hand-off friction.",
    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2",
    stat: "5-in-1",
    statLabel: "Disciplines",
  },
  {
    title: "Transparent process",
    desc: "Weekly check-ins, a live dashboard, and clear scopes mean you always know exactly where things stand.",
    icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
    stat: "100%",
    statLabel: "Visibility",
  },
  {
    title: "Built to compound",
    desc: "Every project is engineered to keep paying off — SEO that ranks higher monthly, ads that learn, code that scales.",
    icon: "M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941",
    stat: "3.4x",
    statLabel: "Avg ROAS",
  },
];

function WhyChooseUs() {
  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-white to-gray-50 dark:from-[#0a0a0f] dark:to-[#0a0a0f] overflow-hidden">
      {/* ambient color blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[28rem] h-[28rem] rounded-full bg-gradient-to-br from-[#667eea]/15 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[28rem] h-[28rem] rounded-full bg-gradient-to-br from-[#764ba2]/15 to-transparent blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-500 dark:text-gray-400 mb-4">
            — Why Xpanix
          </p>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.05] mb-5">
            Why teams choose{" "}
            <span className="font-serif-display italic gradient-text font-medium">to xpand</span>{" "}
            with us.
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Six reasons ambitious brands keep coming back — and bring their friends.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r) => (
            <TiltCard key={r.title} className="h-full">
              <div
                className="group relative h-full p-7 rounded-2xl bg-white dark:bg-[#131320] border border-gray-100 dark:border-gray-800 overflow-hidden"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* hover gradient ring */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ring-1 ring-inset ring-[#764ba2]/30" />
                {/* corner glow */}
                <div className="pointer-events-none absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br from-[#667eea]/25 to-[#764ba2]/25 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* icon */}
                <div
                  className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mb-6 shadow-lg shadow-[#764ba2]/20 group-hover:scale-110 transition-transform duration-300"
                  style={{ transform: "translateZ(50px)" }}
                >
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={r.icon} />
                  </svg>
                </div>

                <h3
                  className="text-xl font-bold text-gray-900 dark:text-white mb-2"
                  style={{ transform: "translateZ(36px)" }}
                >
                  {r.title}
                </h3>
                <p
                  className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-5"
                  style={{ transform: "translateZ(22px)" }}
                >
                  {r.desc}
                </p>

                {/* stat footer */}
                <div
                  className="flex items-end gap-2 pt-4 border-t border-gray-100 dark:border-gray-800"
                  style={{ transform: "translateZ(28px)" }}
                >
                  <span className="text-2xl font-extrabold gradient-text leading-none">{r.stat}</span>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-0.5">
                    {r.statLabel}
                  </span>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ─── */
function ServicesCTA() {
  return (
    <section className="py-24 px-6 bg-white dark:bg-[#0a0a0f]">
      <div className="max-w-5xl mx-auto">
        <div className="relative overflow-hidden rounded-[2rem] gradient-bg p-12 md:p-16 text-center text-white shadow-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest opacity-75 mb-3">
            Let&rsquo;s build something
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
            Ready to grow?
          </h2>
          <p className="text-base md:text-lg opacity-90 max-w-xl mx-auto mb-8">
            Tell us what you&rsquo;re working on. We&rsquo;ll come back with a plan, a price, and a clear path forward.
          </p>
          <a
            href="/#contact"
            className="inline-block bg-white text-gray-900 px-8 py-3.5 rounded-full font-semibold text-base hover:bg-gray-100 transition-all shadow-lg"
          >
            Book a Call →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── ROOT ─── */
export default function ServicesContent() {
  return (
    <>
      <ServicesBigHero />
      <ServicesStack />
      <WhyChooseUs />
      <ServicesCTA />
    </>
  );
}
