"use client";
import { useState } from "react";
import AnimateOnScroll from "./AnimateOnScroll";
import { blogPosts, blogCategories } from "./blogsData";

function CategoryPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
        active
          ? "gradient-bg text-white shadow-[0_4px_14px_rgba(91,43,232,0.35)]"
          : "bg-white dark:bg-[#131320] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:border-[#764ba2]/40 hover:text-[#764ba2] dark:hover:text-[#667eea]"
      }`}
    >
      {label}
    </button>
  );
}

export default function BlogsContent() {
  const [activeCat, setActiveCat] = useState("All");
  const featured = blogPosts[0];
  const filtered =
    activeCat === "All"
      ? blogPosts.filter((p) => p.slug !== featured.slug)
      : blogPosts.filter((p) => p.category === activeCat);
  const showFeatured = activeCat === "All";

  return (
    <main className="bg-white dark:bg-[#0a0a0f]">
      {/* HERO */}
      <section className="relative pt-32 pb-14 px-6 overflow-hidden">
        <div className="absolute inset-0 dot-grid dot-fade pointer-events-none" />
        <div className="pointer-events-none absolute -top-24 right-0 w-[30rem] h-[30rem] rounded-full bg-gradient-to-bl from-[#764ba2]/20 via-[#667eea]/10 to-transparent blur-3xl" />

        <div className="relative max-w-7xl mx-auto">
          <AnimateOnScroll>
            <span className="inline-block px-4 py-1.5 mb-5 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs font-bold tracking-[0.2em] uppercase gradient-text shadow-sm">
              Insights
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1] mb-4">
              Ideas that help you{" "}
              <span className="font-serif-display italic gradient-text font-medium">xpand.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl">
              Field notes on web development, design, SEO, and paid growth — written by the team that ships it every day.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* FEATURED POST */}
      {showFeatured && (
        <section className="px-6 pb-16">
          <div className="max-w-7xl mx-auto">
            <AnimateOnScroll>
              <a
                href={`/blogs/${featured.slug}`}
                className="group grid lg:grid-cols-2 rounded-[2rem] overflow-hidden bg-gray-50 dark:bg-[#131320] border border-gray-200 dark:border-gray-800 hover:border-[#764ba2]/40 hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)] transition-all duration-300"
              >
                <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[24rem] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featured.img}
                    alt={featured.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-5 left-5 text-[10px] font-bold tracking-[0.2em] uppercase text-white gradient-bg px-3 py-1.5 rounded-full shadow-lg">
                    Featured
                  </span>
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-xs font-semibold text-gray-400 dark:text-gray-500 mb-4">
                    <span className="gradient-text font-bold uppercase tracking-wider">{featured.category}</span>
                    <span>•</span>
                    <span>{featured.date}</span>
                    <span>•</span>
                    <span>{featured.readTime}</span>
                  </div>
                  <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-4 group-hover:gradient-text transition-all">
                    {featured.title}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-7">{featured.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`w-10 h-10 rounded-full bg-gradient-to-br ${featured.author.color} flex items-center justify-center text-white text-xs font-bold`}>
                        {featured.author.initials}
                      </span>
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{featured.author.name}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">{featured.author.role}</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold gradient-text group-hover:gap-3 transition-all">
                      Read article
                      <svg className="w-4 h-4 text-[#764ba2] dark:text-[#667eea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </div>
                </div>
              </a>
            </AnimateOnScroll>
          </div>
        </section>
      )}

      {/* FILTER + GRID */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll>
            <div className="flex flex-wrap gap-2 mb-12">
              {blogCategories.map((c) => (
                <CategoryPill key={c} label={c} active={c === activeCat} onClick={() => setActiveCat(c)} />
              ))}
            </div>
          </AnimateOnScroll>

          {filtered.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 py-12 text-center">No articles in this category yet — check back soon.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, i) => (
                <AnimateOnScroll key={post.slug} delay={i * 0.06}>
                  <a
                    href={`/blogs/${post.slug}`}
                    className="group flex flex-col h-full rounded-2xl overflow-hidden bg-white dark:bg-[#131320] border border-gray-200 dark:border-gray-800 hover:border-[#764ba2]/40 hover:-translate-y-1.5 hover:shadow-[0_25px_60px_rgba(0,0,0,0.1)] transition-all duration-300"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.img}
                        alt={post.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <span className="absolute top-4 left-4 text-[10px] font-bold tracking-[0.15em] uppercase text-white bg-black/40 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <div className="flex flex-col flex-1 p-6">
                      <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 mb-3">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug mb-3 group-hover:gradient-text transition-all">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6 line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-2.5 pt-4 border-t border-gray-100 dark:border-gray-800">
                        <span className={`w-8 h-8 rounded-full bg-gradient-to-br ${post.author.color} flex items-center justify-center text-white text-[10px] font-bold`}>
                          {post.author.initials}
                        </span>
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{post.author.name}</span>
                        <svg className="w-4 h-4 ml-auto text-[#764ba2] dark:text-[#667eea] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </div>
                  </a>
                </AnimateOnScroll>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <AnimateOnScroll>
            <div className="relative overflow-hidden rounded-[2rem] gradient-bg p-12 md:p-16 text-center text-white">
              <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
              <h2 className="relative text-3xl md:text-4xl font-extrabold leading-tight mb-3">
                Want this kind of thinking on your project?
              </h2>
              <p className="relative text-base md:text-lg opacity-90 max-w-xl mx-auto mb-8">
                Every article comes from real client work. Let&rsquo;s apply the same playbooks to your growth.
              </p>
              <a
                href="/#contact"
                className="relative inline-block bg-white text-gray-900 px-8 py-3.5 rounded-full font-semibold text-base hover:bg-gray-100 hover:-translate-y-0.5 transition-all shadow-lg"
              >
                Book a Call →
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </main>
  );
}
