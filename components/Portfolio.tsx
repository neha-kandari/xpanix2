"use client";
import AnimateOnScroll from "./AnimateOnScroll";

type Project = { name: string; tag: string; img: string; gradient: string; h: string; url?: string };

const columns: Project[][] = [
  [
    { name: "Chinar Logistics", tag: "Logistics website", img: "/projects/Chinar.webp", gradient: "from-emerald-300 to-teal-400", h: "h-52", url: "https://chinarroadlines.com/" },
    { name: "Finance App", tag: "Mobile app UI", img: "/projects/Finance%20App%20UI.webp", gradient: "from-blue-300 to-indigo-400", h: "h-72" },
    { name: "Ruhani Trips", tag: "Travel website", img: "/projects/RuhaniTrips%20(1).webp", gradient: "from-sky-300 to-blue-400", h: "h-56", url: "https://www.ruhanitrips.com/" },
    { name: "WoodyPolo", tag: "E-commerce store", img: "/projects/WoodyPolo.webp", gradient: "from-amber-200 to-orange-300", h: "h-64", url: "https://neha-kandari.github.io/photoframe/" },
  ],
  [
    { name: "Opal Institute", tag: "Education website", img: "/projects/Opal.webp", gradient: "from-rose-300 to-pink-400", h: "h-64", url: "https://crush-album-78322793.figma.site" },
    { name: "Travel Explorer", tag: "Travel app UI", img: "/projects/Travel%20Ui.webp", gradient: "from-cyan-300 to-sky-400", h: "h-72" },
    { name: "Perfect Group", tag: "Corporate website", img: "/projects/Perfect.webp", gradient: "from-violet-300 to-indigo-400", h: "h-56", url: "https://www.perfectplastotech.com/" },
    { name: "Shopfront", tag: "E-commerce UI", img: "/projects/ecomerce%20ui.webp", gradient: "from-fuchsia-300 to-pink-400", h: "h-60" },
  ],
  [
    { name: "Tripsee", tag: "Travel platform", img: "/projects/Tripsee%20(3).webp", gradient: "from-sky-300 to-blue-400", h: "h-60", url: "https://www.tripseetravel.in/" },
    { name: "Nagpal Tours", tag: "Travel website", img: "/projects/NagpalToursTravels.webp", gradient: "from-blue-300 to-indigo-400", h: "h-56", url: "https://nagpal-tour-travel.vercel.app/" },
    { name: "Wanderlust", tag: "Landing page UI", img: "/projects/Travel%20landaing%20Ui%20Design.webp", gradient: "from-cyan-300 to-sky-400", h: "h-60" },
  ],
];

function Card({ p }: { p: Project }) {
  const external = Boolean(p.url);
  return (
    <a
      href={p.url || "/portfolio"}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={`View ${p.name}`}
      className={`group relative block ${p.h} w-full rounded-2xl overflow-hidden bg-gradient-to-br ${p.gradient} shadow-sm`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={p.img}
        alt={p.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* dark overlay for text legibility */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />
      {/* text + CTA */}
      <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between gap-2">
        <div>
          <p className="text-white font-semibold text-sm leading-tight">{p.name}</p>
          <p className="text-white/70 text-xs">{p.tag}</p>
        </div>
        <span className="flex-shrink-0 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 bg-[#764ba2] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
          View →
        </span>
      </div>
    </a>
  );
}

function ScrollColumn({ items, direction }: { items: Project[]; direction: "up" | "down" }) {
  const doubled = [...items, ...items];
  return (
    <div className={`flex flex-col gap-4 ${direction === "up" ? "animate-scroll-up" : "animate-scroll-down"}`}>
      {doubled.map((p, i) => (
        <Card key={`${p.name}-${i}`} p={p} />
      ))}
    </div>
  );
}

export default function Portfolio() {
  return (
    <section className="py-14 px-6 bg-white dark:bg-[#0a0a0f]" id="works">
      <div className="max-w-6xl mx-auto">
        <AnimateOnScroll>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">Works</p>
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

        {/* vertical auto-scroll masonry */}
        <AnimateOnScroll>
          <div className="relative h-[380px] md:h-[430px] overflow-hidden portfolio-fade">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <ScrollColumn items={columns[0]} direction="up" />
              <ScrollColumn items={columns[1]} direction="down" />
              <div className="hidden md:block">
                <ScrollColumn items={columns[2]} direction="up" />
              </div>
            </div>
          </div>
        </AnimateOnScroll>

      </div>
    </section>
  );
}
