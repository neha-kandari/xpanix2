"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimateOnScroll from "./AnimateOnScroll";

type Project = { name: string; tag: string; img: string; url?: string };

const projects: Project[] = [
  { name: "Chinar Logistics", tag: "Logistics Website", img: "/projects/Chinar.webp", url: "https://chinarroadlines.com/" },
  { name: "Finance App UI", tag: "Mobile App UI", img: "/projects/Finance%20App%20UI.webp" },
  { name: "Opal Institute", tag: "Education Website", img: "/projects/Opal.webp", url: "https://crush-album-78322793.figma.site" },
  { name: "Perfect Group", tag: "Corporate Website", img: "/projects/Perfect.webp", url: "https://www.perfectplastotech.com/" },
  { name: "Ruhani Trips", tag: "Travel Website", img: "/projects/RuhaniTrips%20(1).webp", url: "https://www.ruhanitrips.com/" },
  { name: "Tripsee", tag: "Travel Platform", img: "/projects/Tripsee%20(3).webp", url: "https://www.tripseetravel.in/" },
];

const AUTO_ROTATE_MS = 4500;

export default function Portfolio() {
  const [active, setActive] = useState(0);
  const current = projects[active];

  useEffect(() => {
    const timer = setTimeout(() => {
      setActive((i) => (i + 1) % projects.length);
    }, AUTO_ROTATE_MS);
    return () => clearTimeout(timer);
  }, [active]);

  return (
    <section className="py-14 px-4 bg-white dark:bg-[#0a0a0f]" id="works">
      <div className="max-w-5xl mx-auto px-6">
        <AnimateOnScroll>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">Portfolio</p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
                Collaboration that
                <br />
                <span className="font-serif-display italic gradient-text font-medium">moved the needle.</span>
              </h2>
            </div>
            {/* view full portfolio CTA */}
            <a
              href="/portfolio"
              className="inline-flex items-center gap-2 gradient-bg text-white font-semibold px-6 py-3 rounded-full text-sm hover:opacity-90 transition-all shadow-md hover:shadow-lg self-start sm:self-auto"
            >
              View full portfolio
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </AnimateOnScroll>

        {/* spotlight carousel */}
        <AnimateOnScroll>
          <div className="grid lg:grid-cols-[1.6fr_1fr] gap-5 items-stretch">
            {/* LEFT: featured project */}
            <div className="relative rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#131320] shadow-sm">
              <div className="relative aspect-[16/10] overflow-hidden">
                <AnimatePresence mode="sync">
                  <motion.img
                    key={current.name}
                    src={current.img}
                    alt={current.name}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* thumbnail filmstrip */}
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {projects.map((p, i) => (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-label={`Show ${p.name}`}
                      className={`relative w-11 h-11 sm:w-14 sm:h-14 rounded-lg overflow-hidden border-2 transition-all ${
                        i === active ? "border-white shadow-lg scale-105" : "border-white/40 opacity-70 hover:opacity-100"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 p-5">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#764ba2] dark:text-[#667eea]">
                    {current.tag}
                  </p>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">{current.name}</h3>
                </div>
                <a
                  href={current.url || "/portfolio"}
                  target={current.url ? "_blank" : undefined}
                  rel={current.url ? "noopener noreferrer" : undefined}
                  className="flex-shrink-0 inline-flex items-center gap-1.5 gradient-bg text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-md hover:opacity-90 transition-all"
                >
                  View project
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>

            {/* RIGHT: project list */}
            <div className="flex flex-col gap-2">
              {projects.map((p, i) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`group relative flex items-center gap-3 rounded-2xl border p-2.5 text-left overflow-hidden transition-colors duration-300 ${
                    i === active
                      ? "border-[#764ba2]/40 bg-gray-50 dark:bg-[#131320]"
                      : "border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700"
                  }`}
                >
                  {/* light gradient fill sweep while this project is active */}
                  {i === active && (
                    <span
                      key={active}
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-r from-[#667eea]/10 to-[#764ba2]/10 animate-progress-fill pointer-events-none"
                    />
                  )}
                  <span className="relative w-12 h-12 flex-shrink-0 rounded-xl overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.img} alt="" className="w-full h-full object-cover" />
                  </span>
                  <span className="relative min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-gray-900 dark:text-white truncate">{p.name}</span>
                    <span className="block text-xs text-gray-400 dark:text-gray-500 truncate">{p.tag}</span>
                  </span>
                </button>
              ))}

              <a
                href="/portfolio"
                className="inline-flex items-center gap-1.5 text-sm font-semibold gradient-text mt-2 px-1 hover:gap-2.5 transition-all"
              >
                Explore more projects
                <svg className="w-3.5 h-3.5 text-[#764ba2] dark:text-[#667eea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
