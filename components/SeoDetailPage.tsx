"use client";
import { useState } from "react";
import AnimateOnScroll from "./AnimateOnScroll";
import ContactFormCard from "./ContactFormCard";
import TiltCard from "./TiltCard";
import ReviewsCarousel from "./ReviewsCarousel";

/* ─── DATA ─── */

const whyMatters = [
  {
    title: "Intent Driven Traffic",
    desc: "Capture users at the exact moment they're looking for your solution, the highest converting traffic that exists.",
    icon: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
  },
  {
    title: "Long Term Equity",
    desc: "Unlike ads that stop when budgets do, SEO builds a compounding asset that grows in value every single month.",
    icon: "M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941",
  },
  {
    title: "Build Authority",
    desc: "Ranking on page one is a universal signal of trust. We help you become the recognized leader in your industry niche.",
    icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
  },
];

const ecosystemItems = [
  {
    title: "Technical SEO Audit",
    desc: "Deep crawl analysis of site architecture, Core Web Vitals, crawl budget, and indexability to remove ranking blockers.",
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
  },
  {
    title: "Content Strategy",
    desc: "Skyscraper quality content mapped to real search intent, covering topics your buyers actually research.",
    icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z",
  },
  {
    title: "High Authority Backlinks",
    desc: "Ethical, white hat link building through digital PR and content outreach that boosts your domain authority.",
    icon: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1",
  },
  {
    title: "Local SEO Optimization",
    desc: "Dominate the map pack with profile management, local citations, and consistency across the web.",
    icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z",
  },
];

const architectures = [
  "Shopify & Ecommerce",
  "SaaS Platforms",
  "B2B Professional Services",
  "Custom Next.js Web Apps",
  "WordPress Corporate",
  "Local Multi location Brands",
];

const roadmap = [
  {
    n: "01",
    title: "Discovery & Baseline Audit",
    desc: "Month 1: We perform a comprehensive technical audit and establish baseline metrics, identifying the low hanging fruit wins first.",
  },
  {
    n: "02",
    title: "Strategic Architecture",
    desc: "Month 2: Fixing technical errors, optimizing site speed, and implementing initial on page optimizations across primary service pages.",
  },
  {
    n: "03",
    title: "Content & Link Engine",
    desc: "Month 3+: Launching monthly content clusters and outreach campaigns, this is where we start to see initial ranking movement for long tail terms.",
  },
  {
    n: "04",
    title: "Iterative Optimization",
    desc: "Ongoing: Continual A/B testing of meta descriptions, internal link structures, and refreshing old content to maintain dominance.",
  },
];

const planIncludes = [
  "Monthly performance reports",
  "Dedicated SEO account lead",
  "24/7 real time dashboard",
  "Google Search Console setup",
  "Competitor intelligence tracking",
  "Keyword rank monitoring",
  "Conversion rate consulting",
  "XML sitemap management",
  "Schema markup implementation",
];

const trustPoints = [
  { title: "0% Black Hat Tactics", desc: "We strictly follow Google's Webmaster Guidelines to ensure your site is never penalized and grows safely." },
  { title: "ROI Focused Approach", desc: "Rankings are vanity; revenue is sanity. We focus on keywords that actually drive conversions and sales." },
  { title: "Global & Local Expertise", desc: "Whether you need to win the neighborhood or the world, we have the strategies to scale across borders." },
  { title: "Tech First Optimization", desc: "We're built on a deep engineering background to implement fixes, not just recommend them." },
];

const faqs = [
  {
    q: "How long does it take to see results from SEO?",
    a: "SEO is a compounding channel. Quick technical wins land in the first month, meaningful ranking movement typically shows in months 2 to 4, and significant traffic growth compounds from month 4 onward.",
  },
  {
    q: "Do you guarantee #1 rankings on Google?",
    a: "No honest agency can guarantee specific rankings. Google's algorithm isn't for sale. What we do guarantee is a proven, transparent process and measurable month over month growth.",
  },
  {
    q: "How is SEO different from PPC (Google Ads)?",
    a: "PPC buys visibility that stops the moment you stop paying. SEO earns visibility that keeps working. Each month of effort builds permanent equity in your domain.",
  },
  {
    q: "What is the difference between On Page and Technical SEO?",
    a: "On page SEO optimizes the content users see: titles, copy, internal links. Technical SEO optimizes what crawlers see: speed, structure, schema, and indexability. Winning requires both.",
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

export default function SeoDetailPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      {/* 1. HERO */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-white dark:bg-[#0a0a0f]">
        <div className="absolute inset-0 dot-grid dot-fade pointer-events-none" />
        <div className="pointer-events-none absolute -top-24 right-0 w-[34rem] h-[34rem] rounded-full bg-gradient-to-bl from-[#764ba2]/25 via-[#667eea]/15 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 w-[28rem] h-[28rem] rounded-full bg-gradient-to-tr from-[#667eea]/20 to-transparent blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-6 grid lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-3">

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white leading-[0.98] mb-3">
              SEO
            </h1>
            <p className="font-serif-display italic gradient-text font-medium text-3xl md:text-5xl mb-7">
              that compounds.
            </p>
            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed">
              Dominate search results organically. We don&rsquo;t just chase rankings. We drive
              revenue with data led SEO strategies that put your brand exactly where your
              customers are looking.
            </p>
          </div>

          <div className="lg:col-span-2 lg:sticky lg:top-28">
            <ContactFormCard service="SEO" />
          </div>
        </div>
      </section>

      {/* 2. WHY SEO MATTERS */}
      <section className="py-24 px-4 bg-gray-50 dark:bg-[#0d0d15]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <AnimateOnScroll>
            <SectionKicker>Why SEO</SectionKicker>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-4">
              Why SEO Matters for Your <span className="gradient-text">Brand</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-16 text-lg">
              Search is the start of almost every digital journey. If you aren&rsquo;t visible, you don&rsquo;t exist in the mind of the consumer.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyMatters.map((c, i) => (
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

      {/* 3. COMPREHENSIVE SEARCH ECOSYSTEM */}
      <section className="py-24 px-4 bg-white dark:bg-[#0a0a0f]">
        <div className="max-w-5xl mx-auto px-6">
          <AnimateOnScroll>
            <div className="text-center">
              <SectionKicker>Capabilities</SectionKicker>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-4">
                A Comprehensive Search <span className="gradient-text">Ecosystem</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-16 text-lg">
                We handle every technical and creative facet of SEO to ensure your growth is sustainable and scalable.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ecosystemItems.map((e, i) => (
              <AnimateOnScroll key={e.title} delay={i * 0.06}>
                <article className="group flex items-start gap-5 p-7 rounded-2xl bg-gray-50 dark:bg-[#131320] border border-gray-200 dark:border-gray-800 hover:border-[#764ba2]/40 hover:-translate-y-1 transition-all duration-300">
                  <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#667eea]/15 to-[#764ba2]/15 border border-[#764ba2]/25 flex items-center justify-center flex-shrink-0 group-hover:gradient-bg transition-all">
                    <svg className="w-6 h-6 text-[#764ba2] dark:text-[#667eea] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={e.icon} />
                    </svg>
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{e.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{e.desc}</p>
                  </div>
                </article>
              </AnimateOnScroll>
            ))}
          </div>

          {/* architecture chips */}
          <AnimateOnScroll>
            <div className="mt-14 text-center">
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-400 dark:text-gray-500 mb-6">
                Optimized for every architecture
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {architectures.map((a) => (
                  <span
                    key={a}
                    className="px-5 py-2.5 rounded-full text-sm font-semibold bg-gray-50 dark:bg-[#131320] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:border-[#764ba2]/50 hover:text-[#764ba2] dark:hover:text-[#667eea] hover:-translate-y-0.5 transition-all cursor-default"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* 4. SUCCESS ROADMAP (timeline) */}
      <section id="roadmap" className="py-24 px-4 bg-gray-50 dark:bg-[#0d0d15]">
        <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-5 gap-14">
          <div className="lg:col-span-2">
            <AnimateOnScroll direction="left">
              <SectionKicker>Methodology</SectionKicker>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-4">
                Our Success <span className="gradient-text">Roadmap</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg">
                SEO isn&rsquo;t magic, it&rsquo;s a process. We follow a proven timeline that ensures every action leads toward sustainable growth.
              </p>
              <a href="/contact" className="inline-flex items-center gap-2 gradient-bg text-white px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg">
                Know More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </AnimateOnScroll>
          </div>

          {/* vertical timeline */}
          <div className="lg:col-span-3 relative">
            <span aria-hidden className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-[#667eea] via-[#764ba2] to-transparent" />
            <div className="flex flex-col gap-8">
              {roadmap.map((r, i) => (
                <AnimateOnScroll key={r.n} delay={i * 0.1} direction="right">
                  <div className="group relative flex items-start gap-6">
                    <span className="relative z-10 w-10 h-10 rounded-full gradient-bg flex items-center justify-center flex-shrink-0 text-white text-xs font-bold shadow-lg shadow-[#764ba2]/25 group-hover:scale-110 transition-transform">
                      {r.n}
                    </span>
                    <div className="flex-1 p-6 rounded-2xl bg-white dark:bg-[#131320] border border-gray-200 dark:border-gray-800 group-hover:border-[#764ba2]/40 group-hover:translate-x-1.5 transition-all duration-300">
                      <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1.5">{r.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{r.desc}</p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. EVERY PLAN INCLUDES */}
      <section className="py-24 px-4 bg-white dark:bg-[#0a0a0f]">
        <div className="max-w-5xl mx-auto px-6">
          <AnimateOnScroll>
            <div className="relative rounded-[2rem] bg-gray-50 dark:bg-[#131320] border border-gray-200 dark:border-gray-800 px-8 md:px-14 py-12 md:py-16 overflow-hidden">
              <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gradient-to-br from-[#667eea]/15 to-transparent blur-3xl" />

              <div className="text-center mb-12">
                <SectionKicker>Deliverables</SectionKicker>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-3">
                  Every Plan Includes
                </h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                  We believe in full transparency and total accountability. No hidden fees, no black box tactics.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6">
                {planIncludes.map((item, i) => (
                  <AnimateOnScroll key={item} delay={i * 0.04}>
                    <div className="group flex items-center gap-3">
                      <svg className="w-5 h-5 flex-shrink-0 text-gray-400 dark:text-gray-500 group-hover:text-[#764ba2] dark:group-hover:text-[#667eea] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{item}</span>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* 7. WHY BUSINESSES TRUST (violet band) */}
      <section className="py-24 px-4 bg-white dark:bg-[#0a0a0f]">
        <div className="max-w-5xl mx-auto px-6">
          <AnimateOnScroll>
            <div className="relative overflow-hidden rounded-[2rem] gradient-bg p-10 md:p-14 text-white">
              <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />

              <h2 className="relative text-3xl md:text-4xl font-extrabold leading-tight mb-10 text-center">
                Why Businesses Trust Our SEO Team
              </h2>

              <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-5">
                {trustPoints.map((p) => (
                  <div key={p.title} className="group flex items-start gap-4 p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/15 hover:-translate-y-0.5 transition-all duration-300">
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
          </AnimateOnScroll>
        </div>
      </section>

      {/* 8. TESTIMONIALS, portfolio brands */}
      <ReviewsCarousel
        variant="muted"
        kicker="Testimonials"
        title={<>What our <span className="gradient-text">partners say.</span></>}
        subtitle="Real stories from the brands we've helped grow."
      />

      {/* 9. CTA */}
      <section className="py-24 px-4 bg-gray-50 dark:bg-[#0d0d15]">
        <div className="max-w-5xl mx-auto px-6">
          <AnimateOnScroll>
            <div className="relative overflow-hidden rounded-[2rem] gradient-bg p-12 md:p-20 text-center text-white shadow-2xl">
              <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
              <h2 className="relative text-3xl md:text-5xl font-extrabold leading-tight mb-4">
                Stop Being Invisible.<br />Start Growing Today.
              </h2>
              <p className="relative text-base md:text-lg opacity-90 max-w-xl mx-auto mb-9">
                Join 200+ companies that have scaled their organic presence with our specialized SEO frameworks.
              </p>
              <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="https://wa.me/918930005190?text=Hi%20Xpanix!%20%F0%9F%91%8B%20I'm%20ready%20to%20skyrocket%20my%20brand's%20digital%20presence.%20Let's%20connect!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-gray-900 px-8 py-3.5 rounded-full font-bold text-base hover:bg-gray-100 hover:-translate-y-0.5 transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center gap-2.5"
                >
                  Let&rsquo;s Connect
                </a>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="py-24 px-6 bg-white dark:bg-[#0a0a0f]">
        <div className="max-w-3xl mx-auto">
          <AnimateOnScroll>
            <div className="text-center">
              <SectionKicker>FAQ</SectionKicker>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-4">
                Frequently Asked <span className="gradient-text">Questions</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-14 text-lg">
                Everything you need to know about starting your SEO journey with us.
              </p>
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
    </>
  );
}
