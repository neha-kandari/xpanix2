"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import ReviewsCarousel from "./ReviewsCarousel";

/* ═══════════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════════ */

type HeroCard = {
  id: string;
  title: string;
  category: string;
  color: string;
  img: string;
};

type RecentProject = {
  name: string;
  tag: string;
  desc: string;
  accent: string;
  img: string;
  url?: string;
};

type ScatterPosition = {
  left: number;
  top: number;
  rotate: number;
  z: number;
};

type CardFaceProps = {
  card: HeroCard;
};

type WhyChooseItem = {
  icon: ReactNode;
  title: string;
  desc: string;
};

type FAQ = {
  q: string;
  a: string;
};

/* ═══════════════════════════════════════════════════════
   THEME — reacts to the `dark` class on <html>
═══════════════════════════════════════════════════════ */
function useDarkMode(): boolean {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const el = document.documentElement;
    const update = () => setDark(el.classList.contains("dark"));
    update();
    const obs = new MutationObserver(update);
    obs.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return dark;
}

/* Viewport helper — `mobile` < 768px, `tablet` < 1024px */
function useViewport(): { mobile: boolean; tablet: boolean } {
  const [vp, setVp] = useState<{ mobile: boolean; tablet: boolean }>({ mobile: false, tablet: false });
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setVp({ mobile: w < 768, tablet: w < 1024 });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return vp;
}

type Theme = {
  pageBg: string;
  sectionAlt: string;
  heroBg: string;
  dot: string;
  text: string;
  textMuted: string;
  textSub: string;
  cardBg: string;
  cardBorder: string;
  pillBg: string;
  pillText: string;
  iconBg: string;
  divider: string;
};

function getTheme(dark: boolean): Theme {
  return dark
    ? {
        pageBg: "#0a0a0f",
        sectionAlt: "#0e0e16",
        heroBg: "#0a0a0f",
        dot: "rgba(255,255,255,0.06)",
        text: "#f5f5f7",
        textMuted: "#9ca3af",
        textSub: "#a0a0b0",
        cardBg: "#15151f",
        cardBorder: "rgba(255,255,255,0.08)",
        pillBg: "#1a1a26",
        pillText: "#cfcfd8",
        iconBg: "#1d1733",
        divider: "rgba(255,255,255,0.10)",
      }
    : {
        pageBg: "#fafafa",
        sectionAlt: "#fafafa",
        heroBg: "#fff",
        dot: "rgba(0,0,0,0.07)",
        text: "#111",
        textMuted: "#9ca3af",
        textSub: "#666",
        cardBg: "#fff",
        cardBorder: "#ebebeb",
        pillBg: "#f5f5f5",
        pillText: "#555",
        iconBg: "#f5f3ff",
        divider: "#eee",
      };
}

/* ═══════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════ */
const HERO_CARDS = [
  { id: "1", title: "Chinar Logistics", category: "Logistics website", color: "#10B981", img: "/projects/Chinar.webp" },
  { id: "2", title: "Finance App", category: "Mobile app UI", color: "#4B6BFB", img: "/projects/Finance%20App%20UI.webp" },
  { id: "3", title: "Opal Institute", category: "Education website", color: "#EC4899", img: "/projects/Opal.webp" },
  { id: "4", title: "Shopfront", category: "E-commerce UI", color: "#F59E0B", img: "/projects/ecomerce%20ui.webp" },
  { id: "5", title: "Tripsee", category: "Travel platform", color: "#06B6D4", img: "/projects/Tripsee%20(3).webp" },
  { id: "6", title: "WoodyPolo", category: "E-commerce store", color: "#EF4444", img: "/projects/WoodyPolo.webp" },
];

const RECENT_WEB_PROJECTS: RecentProject[] = [
  {
    name: "Rudraksh Travel",
    tag: "Travel website",
    desc: "An immersive travel website with curated tour packages and a story-driven layout that inspires visitors to book their next pilgrimage and journey.",
    accent: "#F59E0B",
    img: "/projects/Rudraksh%20Travles.webp",
    url: "https://www.rudrakshtravelspnp.com/",
  },
  {
    name: "Chinar Logistics",
    tag: "Logistics website",
    desc: "A fast, conversion-focused logistics platform with a quote-request flow and shipment tracking — built to turn visitors into booked shipments.",
    accent: "#10B981",
    img: "/projects/Chinar.webp",
  },
  {
    name: "Tripsee",
    tag: "Travel platform",
    desc: "A modern travel platform with rich destination discovery and a seamless booking experience that keeps users exploring from the first scroll.",
    accent: "#06B6D4",
    img: "/projects/Tripsee%20(3).webp",
    url: "https://www.tripseetravel.in/",
  },
  {
    name: "Opal Institute",
    tag: "Education website",
    desc: "A modern education platform with course discovery and an admissions funnel designed to grow student enrollment.",
    accent: "#EC4899",
    img: "/projects/Opal.webp",
  },
];

const ALL_PROJECTS = [
  { id: "p1", name: "Chinar Logistics", cat: "Web Dev", tag: "Logistics website", color: "#10B981", img: "/projects/Chinar.webp" },
  { id: "p2", name: "Nagpal Tours", cat: "Web Dev", tag: "Travel website", color: "#667eea", img: "/projects/NagpalToursTravels.webp", url: "https://nagpal-tour-travel.vercel.app/" },
  { id: "p3", name: "Opal Institute", cat: "Web Dev", tag: "Education website", color: "#EC4899", img: "/projects/Opal.webp" },
  { id: "p4", name: "Perfect Group", cat: "Web Dev", tag: "Corporate website", color: "#764ba2", img: "/projects/Perfect.webp", url: "https://www.perfectplastotech.com/" },
  { id: "p5", name: "Pmake", cat: "Web Dev", tag: "Brand website", color: "#0EA5E9", img: "/projects/Pmake.webp" },
  { id: "p6", name: "Rajasthan Auto", cat: "Web Dev", tag: "Distributor website", color: "#F59E0B", img: "/projects/RajasthanAutoDistributor.webp", url: "https://www.rajasthanautodistributors.com/" },
  { id: "p7", name: "Ruhani Trips", cat: "Web Dev", tag: "Travel website", color: "#06B6D4", img: "/projects/RuhaniTrips%20(1).webp", url: "https://www.ruhanitrips.com/" },
  { id: "p8", name: "Tripsee", cat: "Web Dev", tag: "Travel platform", color: "#667eea", img: "/projects/Tripsee%20(3).webp", url: "https://www.tripseetravel.in/" },
  { id: "p9", name: "WoodyPolo", cat: "Web Dev", tag: "E-commerce store", color: "#EF4444", img: "/projects/WoodyPolo.webp", url: "https://neha-kandari.github.io/photoframe/" },
  { id: "p10", name: "Finance App", cat: "UI/UX", tag: "Mobile app UI", color: "#4B6BFB", img: "/projects/Finance%20App%20UI.webp" },
  { id: "p11", name: "Photographer Studio", cat: "UI/UX", tag: "Portfolio UI", color: "#8B5CF6", img: "/projects/PhotographerUi%20Design.webp", url: "https://crush-album-78322793.figma.site" },
  { id: "p12", name: "Travel Explorer", cat: "UI/UX", tag: "Travel app UI", color: "#06B6D4", img: "/projects/Travel%20Ui.webp" },
  { id: "p13", name: "Wanderlust", cat: "UI/UX", tag: "Landing page UI", color: "#7C3AED", img: "/projects/Travel%20landaing%20Ui%20Design.webp" },
  { id: "p14", name: "Shopfront", cat: "UI/UX", tag: "E-commerce UI", color: "#F97316", img: "/projects/ecomerce%20ui.webp" },
];

/* Fan — shifted right, vertically centered to align with hero heading */
const SCATTER = [
  { left: 10, top: 20, rotate: -22, z: 1 },
  { left: 19, top: 17, rotate: -13, z: 2 },
  { left: 28, top: 15, rotate: -5, z: 3 },
  { left: 37, top: 16, rotate: 4, z: 4 },
  { left: 46, top: 15, rotate: 12, z: 5 },
  { left: 53, top: 20, rotate: 20, z: 6 },
];

const CARD_W = 290;
const CARD_H = 215;

/* ═══════════════════════════════════════════════════════
   CARD FACE
═══════════════════════════════════════════════════════ */
function CardFace({ card }: { card: typeof HERO_CARDS[0] }) {
  const dark = useDarkMode();
  const t = getTheme(dark);
  return (
    <div style={{
      width: "100%", height: "100%",
      background: t.cardBg,
      borderRadius: 12,
      border: `1px solid ${t.cardBorder}`,
      boxShadow: dark ? "0 6px 24px rgba(0,0,0,0.5)" : "0 6px 24px rgba(0,0,0,0.10)",
      overflow: "hidden",
      display: "flex", flexDirection: "column",
    }}>
      <div style={{ flex: "0 0 72%", position: "relative", overflow: "hidden", background: card.color }}>
        <img
          src={card.img} alt={card.title} loading="lazy"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div style={{ flex: "1 1 28%", padding: "10px 13px" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: t.text, lineHeight: 1.3 }}>{card.title}</div>
        <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>{card.category}</div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SCATTER CARD — static fan card in the hero
═══════════════════════════════════════════════════════ */
function ScatterCard({ card, index }: { card: HeroCard; index: number }) {
  const s = SCATTER[index];
  return (
    <div
      style={{
        position: "absolute",
        left: `${s.left}%`,
        top: `${s.top}%`,
        width: CARD_W,
        height: CARD_H,
        transform: `rotate(${s.rotate}deg)`,
        transformOrigin: "center center",
        zIndex: s.z,
      }}
    >
      <CardFace card={card} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   RECENT WEB PROJECTS — scroll-driven showcase
═══════════════════════════════════════════════════════ */
function RecentWebProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number>(0);
  const dark = useDarkMode();
  const t = getTheme(dark);
  const { mobile } = useViewport();

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
      const scrollInSection = window.scrollY - sectionTop;
      const perStep = window.innerHeight * 0.6;
      const next = Math.min(
        RECENT_WEB_PROJECTS.length - 1,
        Math.max(0, Math.floor(scrollInSection / perStep))
      );
      setActive(next);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const project = RECENT_WEB_PROJECTS[active];

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        height: `${RECENT_WEB_PROJECTS.length * 60 + 20}vh`,
        background: "transparent",
        zIndex: 2,
      }}
    >
      {/* Section heading — aligned to the navbar/hero 1280px container */}
      <div style={{ padding: mobile ? "40px 20px 24px" : "56px max(24px, calc((100vw - 1280px) / 2 + 24px)) 32px", boxSizing: "border-box" }}>
        <p style={{
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#9ca3af",
          margin: "0 0 12px",
        }}>
          What we do
        </p>
        <h2 style={{
          fontSize: "clamp(34px, 4vw, 56px)",
          fontWeight: 700,
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
          color: t.text,
          margin: 0,
        }}>
          Recent Web Dev{" "}
          <span style={{
            fontStyle: "italic",
            fontWeight: 700,
            background: "linear-gradient(135deg,#667eea 0%,#764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            Projects.
          </span>
        </h2>
      </div>

      <div style={{
        position: "sticky",
        top: mobile ? "12vh" : "15vh",
        height: mobile ? "82vh" : "64vh",
        display: "flex",
        flexDirection: mobile ? "column" : "row",
        padding: mobile ? "0 20px" : "0 max(24px, calc((100vw - 1280px) / 2 + 24px))",
        gap: mobile ? "1rem" : "1.5rem",
        boxSizing: "border-box",
      }}>

        {/* LEFT — project info */}
        <div style={{
          width: mobile ? "100%" : "38%",
          flexShrink: 0,
          background: "linear-gradient(155deg, #241a42 0%, #1a1530 60%, #2d1b4e 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "1.25rem",
          padding: mobile ? "1.25rem" : "2rem",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
        }}>
          {/* Stacked project info — active item flows in-place (defines
              height), the rest stay absolutely overlaid for the crossfade */}
          <div style={{ position: "relative", flex: mobile ? "0 0 auto" : "1 1 auto", display: "flex", flexDirection: "column", justifyContent: "center", margin: mobile ? "0 0 1.25rem" : "1.5rem 0" }}>
            {RECENT_WEB_PROJECTS.map((p, i) => (
              <div key={i} style={{
                ...(i === active
                  ? { position: "relative" as const }
                  : { position: "absolute" as const, top: 0, left: 0, right: 0 }),
                display: "flex",
                flexDirection: "column",
                opacity: i === active ? 1 : 0,
                transform: i === active ? "translateY(0)" : i < active ? "translateY(-16px)" : "translateY(16px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
                pointerEvents: i === active ? "auto" : "none",
              }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: p.accent, marginBottom: 10 }}>
                  {String(i + 1).padStart(2, "0")} / {String(RECENT_WEB_PROJECTS.length).padStart(2, "0")}
                </div>
                <h2 style={{
                  fontSize: mobile ? 26 : "clamp(26px, 2.4vw, 38px)",
                  fontWeight: 600,
                  lineHeight: 1.1,
                  color: "#f5f5f5",
                  margin: "0 0 6px",
                  letterSpacing: "-0.02em",
                }}>
                  {p.name}
                </h2>
                <div style={{ fontSize: 14, color: p.accent, fontWeight: 500, marginBottom: 14 }}>{p.tag}</div>
                <div style={{ width: 48, height: 2, background: p.accent, marginBottom: 14 }} />
                <p style={{ fontSize: 14, color: "#b8b8c4", lineHeight: 1.65, margin: 0 }}>{p.desc}</p>
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      marginTop: 18,
                      padding: "10px 18px",
                      width: "fit-content",
                      borderRadius: 999,
                      border: `1px solid ${p.accent}`,
                      color: "#fff",
                      background: `${p.accent}22`,
                      fontSize: 13,
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    Visit website
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M4.667 11.333L11.333 4.667" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M4.667 4.667H11.333V11.333" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Progress dots */}
          <div style={{ display: "flex", gap: 8, marginTop: "auto", flexShrink: 0 }}>
            {RECENT_WEB_PROJECTS.map((p, i) => (
              <div key={i} style={{
                height: 4,
                flex: i === active ? 2.5 : 1,
                borderRadius: 999,
                background: i === active ? p.accent : "rgba(255,255,255,0.15)",
                transition: "flex 0.4s ease, background 0.4s ease",
              }} />
            ))}
          </div>
        </div>

        {/* RIGHT — project image */}
        <div style={{
          flex: 1,
          borderRadius: "1.25rem",
          overflow: "hidden",
          position: "relative",
          background: "linear-gradient(155deg, #1a1530 0%, #241a42 100%)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}>
          {RECENT_WEB_PROJECTS.map((p, i) => (
            <div key={i} style={{
              position: "absolute",
              inset: 0,
              opacity: i === active ? 1 : 0,
              transform: i === active ? "scale(1)" : "scale(1.04)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
              pointerEvents: i === active ? "auto" : "none",
            }}>
              <img
                src={p.img}
                alt={p.name}
                loading="lazy"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   ALL PROJECTS — filterable grid
═══════════════════════════════════════════════════════ */
function AllProjectsSection() {
  const [active, setActive] = useState<string>("All");
  const dark = useDarkMode();
  const t = getTheme(dark);
  const { mobile } = useViewport();
  const cats = ["All", "Web Dev", "UI/UX"];
  const filtered = active === "All" ? ALL_PROJECTS : ALL_PROJECTS.filter(p => p.cat === active);

  return (
    <section style={{ background: t.pageBg, padding: mobile ? "60px 20px" : "100px 60px", boxSizing: "border-box" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.15em", color: t.textMuted, textTransform: "uppercase", margin: "0 0 8px" }}>Browse all work</p>
        <h2 style={{ fontSize: 38, fontWeight: 700, color: t.text, margin: "0 0 32px", letterSpacing: "-0.02em" }}>All Projects</h2>
        <div style={{ display: "flex", gap: 8, marginBottom: 36, flexWrap: "wrap" }}>
          {cats.map(c => (
            <button key={c} onClick={() => setActive(c)} style={{
              padding: "9px 20px", borderRadius: 999, fontSize: 13, fontWeight: 500, cursor: "pointer",
              background: c === active ? "linear-gradient(135deg,#667eea,#764ba2)" : t.pillBg,
              color: c === active ? "#fff" : t.pillText,
              border: "none", transition: "all 0.2s",
              boxShadow: c === active ? "0 4px 16px rgba(102,126,234,0.30)" : "none",
            }}>{c}</button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 20 }}>
          {filtered.map(p => (
            <motion.div key={p.id} layout
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }}
              style={{ position: "relative", borderRadius: 14, overflow: "hidden", border: `1px solid ${t.cardBorder}`, height: 240, background: t.cardBg, boxShadow: dark ? "0 2px 12px rgba(0,0,0,0.4)" : "0 2px 12px rgba(0,0,0,0.05)" }}>
              <div style={{ height: "65%", background: p.color, position: "relative" }}>
                <img src={p.img} alt={p.name} loading="lazy"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                {p.url && (
                  <span style={{ position: "absolute", top: 10, right: 10, width: 28, height: 28, borderRadius: "50%", background: "rgba(0,0,0,0.55)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3 }}>
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                      <path d="M4.667 11.333L11.333 4.667" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M4.667 4.667H11.333V11.333" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
              </div>
              <div style={{ height: "35%", padding: "12px 14px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{p.name}</div>
                <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>{p.tag} · {p.cat}</div>
                {p.url && (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 5, marginTop: 7, fontSize: 12, fontWeight: 600, background: "linear-gradient(135deg,#667eea,#764ba2)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    Visit website
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ color: "#764ba2" }}>
                      <path d="M4.667 11.333L11.333 4.667" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M4.667 4.667H11.333V11.333" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
              </div>
              {p.url && (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${p.name} website`}
                  style={{ position: "absolute", inset: 0, zIndex: 4 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   WHY CHOOSE US
═══════════════════════════════════════════════════════ */
function WhyChooseUs() {
  const items = [
    { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#667eea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>, title: "Results-first approach", desc: "Every decision we make is tied to measurable outcomes — traffic, conversions, and revenue growth you can see." },
    { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#764ba2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><polyline points="8 21 12 17 16 21" /></svg>, title: "Full-stack capability", desc: "Strategy, design, development, ads, photography — one team, no hand-offs, no miscommunication." },
    { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>, title: "Transparent process", desc: "Weekly updates, shared dashboards, and zero agency jargon. You always know exactly what's happening." },
    { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>, title: "Proven track record", desc: "99+ happy clients, 250+ projects shipped, and a 4.9★ average rating across every service we offer." },
  ];
  const dark = useDarkMode();
  const t = getTheme(dark);
  const { mobile } = useViewport();
  return (
    <section style={{ background: t.sectionAlt, padding: mobile ? "60px 20px" : "100px 60px", boxSizing: "border-box" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.15em", color: t.textMuted, textTransform: "uppercase", margin: "0 0 8px" }}>Why us</p>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 52 }}>
          <div>
            <h2 style={{ fontSize: 38, fontWeight: 700, color: t.text, margin: "0 0 10px", letterSpacing: "-0.02em" }}>Why choose Xpanix?</h2>
            <p style={{ fontSize: 16, color: t.textSub, margin: 0, maxWidth: 440 }}>We&apos;re not just another agency — we&apos;re your growth partner.</p>
          </div>
          <a href="/#contact" style={{ display: "inline-block", background: "linear-gradient(135deg,#667eea,#764ba2)", color: "#fff", fontSize: 14, fontWeight: 600, padding: "12px 24px", borderRadius: 999, textDecoration: "none", boxShadow: "0 4px 16px rgba(102,126,234,0.30)" }}>Work with us →</a>
        </div>
        <div
          style={mobile
            ? {
                display: "flex",
                gap: 16,
                overflowX: "auto",
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
                paddingBottom: 6,
                margin: "0 -20px",
                paddingLeft: 20,
                paddingRight: 20,
              }
            : { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 24 }}
        >
          {items.map((item, i) => (
            <motion.div key={i}
              initial={mobile ? false : { opacity: 0, y: 20 }}
              animate={mobile ? { opacity: 1, y: 0 } : undefined}
              whileInView={mobile ? undefined : { opacity: 1, y: 0 }}
              viewport={mobile ? undefined : { once: true }}
              transition={mobile ? { duration: 0 } : { duration: 0.5, delay: i * 0.1 }}
              style={{
                background: t.cardBg, borderRadius: 16, padding: 28, border: `1px solid ${t.cardBorder}`,
                boxShadow: dark ? "0 2px 12px rgba(0,0,0,0.4)" : "0 2px 12px rgba(0,0,0,0.04)",
                ...(mobile ? { flex: "0 0 78%", scrollSnapAlign: "start", boxSizing: "border-box" as const } : {}),
              }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: t.iconBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>{item.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 8 }}>{item.title}</div>
              <div style={{ fontSize: 14, color: t.textSub, lineHeight: 1.65 }}>{item.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   REVIEWS — shared portfolio-company carousel
═══════════════════════════════════════════════════════ */
function ReviewsSection() {
  return (
    <ReviewsCarousel
      kicker="Testimonials"
      title={<>What our <span className="gradient-text">clients say.</span></>}
    />
  );
}

/* ═══════════════════════════════════════════════════════
   FAQ
═══════════════════════════════════════════════════════ */
const FAQS = [
  { q: "How long does a typical project take?", a: "Most websites take 2–4 weeks from brief to launch. UI/UX projects run 1–3 weeks depending on scope. Ad campaigns go live within 5–7 business days." },
  { q: "Do you work with international clients?", a: "Yes — about 40% of our clients are based outside India. We've worked with teams across the UK, UAE, US, Singapore, and beyond." },
  { q: "What does your design process look like?", a: "Discovery → Strategy → Design → Feedback → Delivery. You're involved at every key step, and we share progress weekly — no surprises, ever." },
  { q: "Can you handle both design and development?", a: "Absolutely. We're a full-stack team — the same people who design your product also build it. No handoffs, no gaps in translation." },
  { q: "Do you offer ongoing support after launch?", a: "Yes. We offer monthly retainer packages for SEO, Meta ads management, and site maintenance. Many clients work with us for years." },
  { q: "How does pricing work?", a: "We price per project, not per hour. Every engagement starts with a scoping call where we give you a clear, flat-fee quote — no hidden costs." },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const dark = useDarkMode();
  const t = getTheme(dark);
  const { mobile } = useViewport();
  return (
    <section style={{ background: t.sectionAlt, padding: mobile ? "60px 20px" : "100px 60px", boxSizing: "border-box" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.15em", color: t.textMuted, textTransform: "uppercase", margin: "0 0 8px", textAlign: "center" }}>FAQ</p>
        <h2 style={{ fontSize: 38, fontWeight: 700, color: t.text, margin: "0 0 12px", letterSpacing: "-0.02em", textAlign: "center" }}>Frequently asked questions.</h2>
        <p style={{ fontSize: 15, color: t.textSub, margin: "0 0 56px", textAlign: "center" }}>
          Can&apos;t find what you&apos;re looking for?{" "}
          <a href="/#contact" style={{ color: "#667eea", textDecoration: "none", fontWeight: 500 }}>Ask us directly →</a>
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ background: t.cardBg, borderRadius: 14, border: `1px solid ${t.cardBorder}`, overflow: "hidden" }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: t.text, flex: 1, paddingRight: 16 }}>{faq.q}</span>
                <span style={{ width: 26, height: 26, borderRadius: "50%", flexShrink: 0, background: open === i ? "linear-gradient(135deg,#667eea,#764ba2)" : t.pillBg, color: open === i ? "#fff" : t.pillText, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, lineHeight: 1, transition: "all 0.2s" }}>
                  {open === i ? "−" : "+"}
                </span>
              </button>
              <motion.div initial={false} animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] as const }} style={{ overflow: "hidden" }}>
                <div style={{ padding: "0 24px 22px", fontSize: 14, color: t.textSub, lineHeight: 1.7 }}>{faq.a}</div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN
═══════════════════════════════════════════════════════ */
export default function HeroScrollEffect() {
  const dark = useDarkMode();
  const t = getTheme(dark);
  return (
    <div style={{ background: t.pageBg, fontFamily: "inherit" }}>

      {/* Hero responsive layout is CSS-driven so the first server-rendered
          paint is already correct — avoids a desktop→mobile layout flash. */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .xpx-hero { position: relative; display: flex; flex-direction: row; height: 82vh; min-height: 620px; padding: 80px 0 0; box-sizing: border-box; overflow: hidden; }
            .xpx-hero-left { position: relative; z-index: 1; width: 40%; flex-shrink: 0; display: flex; flex-direction: column; justify-content: flex-start; padding: 28px 44px 0 max(24px, calc((100vw - 1280px) / 2 + 24px)); box-sizing: border-box; }
            .xpx-hero-h1 { font-size: clamp(40px, 4.2vw, 60px); }
            .xpx-hero-right { flex: 1; position: relative; z-index: 1; overflow: visible; }
            .xpx-hero-fan { display: none; }
            @media (max-width: 767px) {
              .xpx-hero { flex-direction: column; height: auto; min-height: 0; padding: 104px 0 48px; }
              .xpx-hero-left { width: 100%; padding: 0 20px; }
              .xpx-hero-h1 { font-size: clamp(34px, 9vw, 48px); }
              .xpx-hero-right { display: none; }
              .xpx-hero-fan { display: flex; justify-content: center; width: 100%; margin-top: 36px; position: relative; z-index: 1; }
            }
          `,
        }}
      />

      {/* ── HERO ── */}
      <section className="xpx-hero" style={{ backgroundColor: t.heroBg }}>
        {/* Dot-grid overlay — kept separate so the section never mixes
            `background` shorthand with background-image longhands */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(circle, ${t.dot} 1px, transparent 1px)`,
            backgroundSize: "26px 26px",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* LEFT COL */}
        <div className="xpx-hero-left">
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, width: "fit-content", fontSize: 12, color: t.textSub, border: `1px solid ${t.cardBorder}`, borderRadius: 999, padding: "5px 14px", marginBottom: 24, background: dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.9)" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", display: "inline-block" }} />
            Available for projects
          </span>

          <h1 className="xpx-hero-h1" style={{ fontWeight: 700, lineHeight: 1.1, color: t.text, margin: "0 0 20px", letterSpacing: "-0.03em" }}>
            One team to{" "}
            <span style={{ background: "linear-gradient(135deg,#667eea 0%,#764ba2 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>xpand</span>{" "}
            it all.
          </h1>

          <p style={{ fontSize: 15, color: t.textSub, lineHeight: 1.75, margin: 0, maxWidth: 420 }}>
            From pixel-perfect websites and conversion-driven UI/UX to SEO, Meta ads,
            and studio-grade product photography — Xpanix brings every digital growth
            service under one roof. We design, build, and scale brands that refuse to
            blend in. Explore the work that made it happen.
          </p>
        </div>

        {/* RIGHT COL — desktop scattered fan (CSS-hidden on mobile) */}
        <div className="xpx-hero-right">
          {HERO_CARDS.map((card, i) => (
            <ScatterCard key={card.id} card={card} index={i} />
          ))}
        </div>

        {/* Mobile fan — compact, centered (CSS-hidden on desktop) */}
        <div className="xpx-hero-fan">
          <div style={{ position: "relative", width: "min(300px, 100%)", height: 168 }}>
            {HERO_CARDS.slice(0, 3).map((card, i) => (
              <div key={card.id} style={{
                position: "absolute",
                left: `${i * 29}%`,
                top: i === 1 ? 0 : 16,
                width: "42%",
                height: 96,
                transform: `rotate(${[-9, 0, 9][i]}deg)`,
                transformOrigin: "bottom center",
                zIndex: i + 1,
              }}>
                <CardFace card={card} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <RecentWebProjects />
      <AllProjectsSection />
      <WhyChooseUs />
      <ReviewsSection />
      <FAQSection />

    </div>
  );
}
