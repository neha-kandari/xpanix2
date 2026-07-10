"use client";
import AnimateOnScroll from "./AnimateOnScroll";

const metrics = [
  { label: "Organic Traffic", sub: "Last 30 days", value: "+48%", badge: "bg-green-100 text-green-700" },
  { label: "Meta Ads ROAS", sub: "Active campaign", value: "4.2x", badge: "bg-blue-100 text-blue-700" },
  { label: "Conversion Rate", sub: "Checkout flow", value: "+2.8%", badge: "bg-green-100 text-green-700" },
  { label: "Keyword Rankings", sub: "Top positions", value: "Top 3", badge: "bg-purple-100 text-purple-700" },
  { label: "Page Speed", sub: "Core Web Vitals", value: "98/100", badge: "bg-green-100 text-green-700" },
  { label: "New Leads", sub: "This week", value: "1,240", badge: "bg-blue-100 text-blue-700" },
];

function Row({ m }: { m: (typeof metrics)[number] }) {
  return (
    <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gradient-to-r hover:from-[#667eea]/5 hover:to-[#764ba2]/5 dark:hover:from-[#667eea]/10 dark:hover:to-[#764ba2]/10 transition-colors cursor-pointer group">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-tight">{m.label}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">{m.sub}</p>
        </div>
      </div>
      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${m.badge}`}>{m.value}</span>
    </div>
  );
}

export default function Process() {
  const doubled = [...metrics, ...metrics];

  return (
    <section className="relative py-24 px-4 bg-white dark:bg-[#0a0a0f] overflow-hidden">
      {/* dot-grid background that fades out from the edges */}
      <div className="absolute inset-0 dot-grid dot-fade pointer-events-none" />
      <div className="relative max-w-5xl mx-auto px-6">
        <AnimateOnScroll>
          {/* gradient border wrapper */}
          <div className="rounded-[2rem] p-[1.5px] bg-gradient-to-br from-[#667eea] to-[#764ba2] shadow-[0_30px_80px_rgba(111,91,222,0.18)]">
            <div className="rounded-[2rem] bg-white dark:bg-[#131320] p-6 md:p-12 grid md:grid-cols-2 gap-10 items-center">
              {/* Left: live performance mockup */}
              <div className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-xl bg-white dark:bg-[#0f0f18]">
                {/* browser top bar */}
                <div className="bg-gray-900 px-4 py-3 flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  {/* <div className="flex-1 bg-gray-700/60 rounded-md px-3 py-1 text-xs text-gray-300">
                    yourbrand.com/performance
                  </div> */}
                  <span className="flex items-center gap-1.5 text-[10px] font-semibold text-green-400">
                    <span className="relative flex w-2 h-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                    </span>
                    LIVE
                  </span>
                </div>

                {/* auto-scrolling metrics list */}
                <div className="relative h-72 overflow-hidden portfolio-fade bg-white dark:bg-[#0f0f18]">
                  <div className="animate-scroll-up">
                    {doubled.map((m, i) => (
                      <Row key={`${m.label}-${i}`} m={m} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: copy */}
              <div className="text-center md:text-left">
                <p className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">
                  Real Time Results
                </p>
                <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight mb-5">
                  Your digital growth,{" "}
                  <span className="gradient-text">always Xpanding.</span>
                </h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
                  Track every campaign, build, and metric for your website, and watch your growth compound in real time.
                </p>
                <a
                  href="https://wa.me/918930005190?text=Hi%20Xpanix!%20I'm%20ready%20to%20start%20growing%20my%20brand.%20Let's%20build%20something%20my%20competitors%20will%20envy!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 gradient-bg text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Start Growing
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
