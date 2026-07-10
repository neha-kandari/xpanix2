"use client";
import { useEffect, useState } from "react";
import AnimateOnScroll from "./AnimateOnScroll";
import { blogPosts, type BlogPost, type BlogBlock } from "./blogsData";

/* Reading progress bar pinned under the navbar */
function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? Math.min(100, (el.scrollTop / total) * 100) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-[#667eea] to-[#764ba2] transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white mt-12 mb-5">
          {block.text}
        </h2>
      );
    case "list":
      return (
        <ul className="my-6 flex flex-col gap-3">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-gray-600 dark:text-gray-300 leading-relaxed">
              <span className="w-5 h-5 mt-1 rounded-full gradient-bg flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              {item}
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="my-10 relative rounded-2xl bg-gray-50 dark:bg-[#131320] border border-gray-200 dark:border-gray-800 p-7 pl-9">
          <span aria-hidden className="absolute left-0 top-4 bottom-4 w-1 rounded-full bg-gradient-to-b from-[#667eea] to-[#764ba2]" />
          <p className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100 leading-relaxed italic">
            &ldquo;{block.text}&rdquo;
          </p>
        </blockquote>
      );
    default:
      return <p className="text-gray-600 dark:text-gray-300 leading-[1.85] my-5 text-[17px]">{block.text}</p>;
  }
}

export default function BlogPostContent({ post }: { post: BlogPost }) {
  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <main className="bg-white dark:bg-[#0a0a0f]">
      <ReadingProgress />

      {/* HERO */}
      <section className="relative pt-32 pb-10 px-6 overflow-hidden">
        <div className="absolute inset-0 dot-grid dot-fade pointer-events-none" />
        <div className="pointer-events-none absolute -top-24 right-0 w-[30rem] h-[30rem] rounded-full bg-gradient-to-bl from-[#764ba2]/20 via-[#667eea]/10 to-transparent blur-3xl" />

        <div className="relative max-w-3xl mx-auto">
          <AnimateOnScroll>
            <a
              href="/blogs"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-gray-500 dark:text-gray-400 hover:text-[#764ba2] dark:hover:text-[#667eea] transition-colors mb-6"
            >
              ← All articles
            </a>

            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-gray-400 dark:text-gray-500 mb-5">
              <span className="gradient-bg text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase">
                {post.category}
              </span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.15] mb-7">
              {post.title}
            </h1>

            <div className="flex items-center gap-3 pb-2">
              <span className={`w-11 h-11 rounded-full bg-gradient-to-br ${post.author.color} flex items-center justify-center text-white text-xs font-bold`}>
                {post.author.initials}
              </span>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">{post.author.name}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{post.author.role}, Xpanix</p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* HERO IMAGE */}
      <section className="px-4 pb-12">
        <div className="max-w-5xl mx-auto px-6">
          <AnimateOnScroll>
            <div className="relative aspect-[21/9] rounded-[1.75rem] overflow-hidden border border-gray-200 dark:border-gray-800 shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.img} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ARTICLE BODY */}
      <article className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <AnimateOnScroll>
            <div>
              {post.content.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </div>
          </AnimateOnScroll>

          {/* Author footer card */}
          <AnimateOnScroll>
            <div className="mt-14 flex items-center gap-5 p-7 rounded-2xl bg-gray-50 dark:bg-[#131320] border border-gray-200 dark:border-gray-800">
              <span className={`w-14 h-14 rounded-full bg-gradient-to-br ${post.author.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                {post.author.initials}
              </span>
              <div className="flex-1">
                <p className="text-base font-bold text-gray-900 dark:text-white">{post.author.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {post.author.role} at Xpanix, writing from the trenches of real client projects.
                </p>
              </div>
              <a
                href="/#contact"
                className="hidden sm:inline-flex items-center gap-2 gradient-bg text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 hover:-translate-y-0.5 transition-all whitespace-nowrap"
              >
                Work with us
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </article>

      {/* RELATED POSTS */}
      <section className="px-4 pb-24 bg-gray-50 dark:bg-[#0d0d15] pt-20">
        <div className="max-w-5xl mx-auto px-6">
          <AnimateOnScroll>
            <div className="flex items-end justify-between gap-4 mb-10">
              <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Keep <span className="gradient-text">reading</span>
              </h2>
              <a href="/blogs" className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap hover:gap-3 transition-all">
                All articles
                <svg className="w-4 h-4 text-[#764ba2] dark:text-[#667eea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((p, i) => (
              <AnimateOnScroll key={p.slug} delay={i * 0.07}>
                <a
                  href={`/blogs/${p.slug}`}
                  className="group flex flex-col h-full rounded-2xl overflow-hidden bg-white dark:bg-[#131320] border border-gray-200 dark:border-gray-800 hover:border-[#764ba2]/40 hover:-translate-y-1.5 hover:shadow-[0_25px_60px_rgba(0,0,0,0.1)] transition-all duration-300"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.img} alt={p.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <span className="absolute top-4 left-4 text-[10px] font-bold tracking-[0.15em] uppercase text-white bg-black/40 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full">
                      {p.category}
                    </span>
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 mb-3">
                      <span>{p.date}</span>
                      <span>•</span>
                      <span>{p.readTime}</span>
                    </div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug group-hover:gradient-text transition-all">
                      {p.title}
                    </h3>
                  </div>
                </a>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
