"use client";
import type { ReactNode } from "react";
import { portfolioReviews, type PortfolioReview } from "./portfolioReviews";

type Props = {
  kicker?: string;
  title?: ReactNode;
  subtitle?: string;
  /** Section background. "muted" = subtle gray panel, "white" = base. */
  variant?: "white" | "muted";
};

function ReviewCard({ r }: { r: PortfolioReview }) {
  return (
    <div className="shrink-0 w-[300px] sm:w-[360px] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#131320] shadow-[0_2px_12px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.4)] flex flex-col">
      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-1 mb-5">
        &ldquo;{r.quote}&rdquo;
      </p>

      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${r.from}, ${r.to})` }}
        >
          {r.initials}
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900 dark:text-white">{r.company}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">{r.category}</p>
        </div>
      </div>
    </div>
  );
}

export default function ReviewsCarousel({
  kicker = "Testimonials",
  title,
  subtitle = "Real words from the brands we've designed, built, and grown.",
  variant = "white",
}: Props) {
  const loop = [...portfolioReviews, ...portfolioReviews];
  const bg = variant === "muted" ? "bg-gray-50 dark:bg-[#0d0d15]" : "bg-white dark:bg-[#0a0a0f]";
  const fadeFrom = variant === "muted" ? "from-gray-50 dark:from-[#0d0d15]" : "from-white dark:from-[#0a0a0f]";

  return (
    <section className={`py-24 ${bg} overflow-hidden`}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes xpx-reviews-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
            .xpx-reviews-track { display: flex; gap: 20px; width: max-content; animation: xpx-reviews-marquee 50s linear infinite; }
            .xpx-reviews-track:hover { animation-play-state: paused; }
            @media (prefers-reduced-motion: reduce) { .xpx-reviews-track { animation: none; } }
          `,
        }}
      />
      <div className="px-6 max-w-7xl mx-auto text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
          {kicker}
        </p>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-4">
          {title ?? (
            <>
              Trusted by the brands <span className="gradient-text">we build for.</span>
            </>
          )}
        </h2>
        {subtitle && (
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-16 text-lg">{subtitle}</p>
        )}
      </div>

      <div className="relative">
        <div className={`pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r ${fadeFrom} to-transparent`} />
        <div className={`pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l ${fadeFrom} to-transparent`} />
        <div className="xpx-reviews-track">
          {loop.map((r, i) => (
            <ReviewCard key={i} r={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
