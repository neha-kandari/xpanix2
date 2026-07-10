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

/* Viewport helper, `mobile` < 768px, `tablet` < 1024px */
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

/* Values are CSS custom properties (defined in globals.css) that resolve
   via the `.dark` class on <html>, set by the inline script in the root
   layout before first paint. This makes theming purely CSS-driven, exactly
   like the rest of the site, so there's no JS-timing-dependent flash. */
const THEME: Theme = {
  pageBg: "var(--xpx-page-bg)",
  sectionAlt: "var(--xpx-section-alt)",
  heroBg: "var(--xpx-hero-bg)",
  dot: "var(--xpx-dot)",
  text: "var(--xpx-text)",
  textMuted: "#9ca3af",
  textSub: "var(--xpx-text-sub)",
  cardBg: "var(--xpx-card-bg)",
  cardBorder: "var(--xpx-card-border)",
  pillBg: "var(--xpx-pill-bg)",
  pillText: "var(--xpx-pill-text)",
  iconBg: "var(--xpx-icon-bg)",
  divider: "var(--xpx-divider)",
};

/* ═══════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════ */
const HERO_CARDS = [
  { id: "1", title: "Chinar Logistics", category: "Logistics website", color: "#10B981", img: "/projects/Chinar.webp" },
  { id: "2", title: "Finance App", category: "Mobile app UI", color: "#4B6BFB", img: "/projects/Finance%20App%20UI.webp" },
  { id: "3", title: "Opal Institute", category: "Education website", color: "#EC4899", img: "/projects/Opal.webp" },
  { id: "4", title: "Shopfront", category: "Ecommerce UI", color: "#F59E0B", img: "/projects/ecomerce%20ui.webp" },
  { id: "5", title: "Tripsee", category: "Travel platform", color: "#06B6D4", img: "/projects/Tripsee%20(3).webp" },
  { id: "6", title: "WoodyPolo", category: "Ecommerce store", color: "#EF4444", img: "/projects/WoodyPolo.webp" },
];

const RECENT_WEB_PROJECTS: RecentProject[] = [
  {
    name: "Rudraksh Travel",
    tag: "Travel website",
    desc: "An immersive travel website with curated tour packages and a story driven layout that inspires visitors to book their next pilgrimage and journey.",
    accent: "#F59E0B",
    img: "/projects/Rudraksh%20Travles.webp",
    url: "https://www.rudrakshtravelspnp.com/",
  },
  {
    name: "Chinar Logistics",
    tag: "Logistics website",
    desc: "A fast, conversion focused logistics platform with a quote request flow and shipment tracking, built to turn visitors into booked shipments.",
    accent: "#10B981",
    img: "/projects/Chinar.webp",
    url: "https://chinarroadlines.com/",
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
    url: "https://crush-album-78322793.figma.site",
  },
];

const ALL_PROJECTS = [
  { id: "p1", name: "Chinar Logistics", cat: "Web Dev", tag: "Logistics website", color: "#10B981", img: "/projects/Chinar.webp", url: "https://chinarroadlines.com/" },
  { id: "p2", name: "Nagpal Tours", cat: "Web Dev", tag: "Travel website", color: "#667eea", img: "/projects/NagpalToursTravels.webp", url: "https://nagpal-tour-travel.vercel.app/" },
  { id: "p3", name: "Opal Institute", cat: "Web Dev", tag: "Education website", color: "#EC4899", img: "/projects/Opal.webp", url: "https://crush-album-78322793.figma.site" },
  { id: "p4", name: "Perfect Group", cat: "Web Dev", tag: "Corporate website", color: "#764ba2", img: "/projects/Perfect.webp", url: "https://www.perfectplastotech.com/" },
  { id: "p5", name: "Pmake", cat: "Web Dev", tag: "Brand website", color: "#0EA5E9", img: "/projects/Pmake.webp" },
  { id: "p6", name: "Rajasthan Auto", cat: "Web Dev", tag: "Distributor website", color: "#F59E0B", img: "/projects/RajasthanAutoDistributor.webp", url: "https://www.rajasthanautodistributors.com/" },
  { id: "p7", name: "Ruhani Trips", cat: "Web Dev", tag: "Travel website", color: "#06B6D4", img: "/projects/RuhaniTrips%20(1).webp", url: "https://www.ruhanitrips.com/" },
  { id: "p8", name: "Tripsee", cat: "Web Dev", tag: "Travel platform", color: "#667eea", img: "/projects/Tripsee%20(3).webp", url: "https://www.tripseetravel.in/" },
  { id: "p9", name: "WoodyPolo", cat: "Web Dev", tag: "Ecommerce store", color: "#EF4444", img: "/projects/WoodyPolo.webp", url: "https://neha-kandari.github.io/photoframe/" },
  { id: "p10", name: "Finance App", cat: "UI/UX", tag: "Mobile app UI", color: "#4B6BFB", img: "/projects/Finance%20App%20UI.webp" },
  { id: "p12", name: "Travel Explorer", cat: "UI/UX", tag: "Travel app UI", color: "#06B6D4", img: "/projects/Travel%20Ui.webp" },
  { id: "p13", name: "Wanderlust", cat: "UI/UX", tag: "Landing page UI", color: "#7C3AED", img: "/projects/Travel%20landaing%20Ui%20Design.webp" },
  { id: "p14", name: "Shopfront", cat: "UI/UX", tag: "Ecommerce UI", color: "#F97316", img: "/projects/ecomerce%20ui.webp" },
];

/* Fan, shifted right, vertically centered to align with hero heading */
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
  const t = THEME;
  return (
    <div style={{
      width: "100%", height: "100%",
      background: t.cardBg,
      borderRadius: 12,
      border: `1px solid ${t.cardBorder}`,
      boxShadow: "var(--xpx-shadow-card)",
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
   SCATTER CARD, static fan card in the hero
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
   RECENT WEB PROJECTS, scroll-driven showcase
═══════════════════════════════════════════════════════ */
function RecentWebProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number>(0);
  const lastScrollY = useRef(0);
  const t = THEME;
  const { mobile } = useViewport();

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY >= lastScrollY.current;
      lastScrollY.current = currentScrollY;
      // Only advance the showcase while scrolling down, scrolling up
      // shouldn't reverse the animation back through prior projects.
      if (!scrollingDown) return;
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
      {/* Section heading, aligned to the navbar/hero 1024px container */}
      <div style={{ padding: mobile ? "40px 20px 24px" : "56px max(24px, calc((100vw - 1024px) / 2 + 24px)) 32px", boxSizing: "border-box" }}>
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
        padding: mobile ? "0 20px" : "0 max(24px, calc((100vw - 1024px) / 2 + 24px))",
        gap: mobile ? "1rem" : "1.5rem",
        boxSizing: "border-box",
      }}>

        {/* LEFT, project info */}
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
          {/* Stacked project info, active item flows in-place (defines
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

        {/* RIGHT, project image */}
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
   ALL PROJECTS, filterable grid
═══════════════════════════════════════════════════════ */
function AllProjectsSection() {
  const [active, setActive] = useState<string>("All");
  const t = THEME;
  const { mobile } = useViewport();
  const cats = ["All", "Web Dev", "UI/UX"];
  const filtered = active === "All" ? ALL_PROJECTS : ALL_PROJECTS.filter(p => p.cat === active);

  return (
    <section style={{ background: t.pageBg, padding: mobile ? "60px 0" : "100px 0", boxSizing: "border-box" }}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .xpx-pcard { transition: transform 0.35s cubic-bezier(0.25,0.1,0.25,1), box-shadow 0.35s ease, border-color 0.35s ease; }
            .xpx-pcard:hover { transform: translateY(-8px); border-color: var(--card-accent) !important; box-shadow: 0 24px 44px -18px var(--card-accent) !important; }
            .xpx-pcard-img { transition: transform 0.6s cubic-bezier(0.25,0.1,0.25,1); }
            .xpx-pcard:hover .xpx-pcard-img { transform: scale(1.1); }
            .xpx-pcard-scrim { opacity: 0.55; transition: opacity 0.35s ease; }
            .xpx-pcard:hover .xpx-pcard-scrim { opacity: 0.75; }
            .xpx-pcard-arrow { transition: transform 0.3s ease, background 0.3s ease; }
            .xpx-pcard:hover .xpx-pcard-arrow { transform: translate(2px,-2px) scale(1.08); }
          `,
        }}
      />
      <div style={{ maxWidth: 1024, margin: "0 auto", padding: mobile ? "0 20px" : "0 24px", boxSizing: "border-box" }}>
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 24 }}>
          {filtered.map(p => (
            <motion.div key={p.id} layout
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }}
              className="xpx-pcard"
              style={{
                position: "relative", borderRadius: 20, overflow: "hidden",
                border: `1px solid ${t.cardBorder}`, background: t.cardBg,
                boxShadow: "var(--xpx-shadow-grid-card)",
                ["--card-accent" as string]: `${p.color}59`,
              }}>
              <div style={{ height: 168, position: "relative", overflow: "hidden", background: p.color }}>
                <img src={p.img} alt={p.name} loading="lazy" className="xpx-pcard-img"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                <div className="xpx-pcard-scrim" style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.75) 100%)",
                }} />
                <span style={{
                  position: "absolute", top: 12, left: 12, padding: "4px 10px", borderRadius: 999,
                  fontSize: 10, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase",
                  color: "#fff", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(6px)",
                  border: "1px solid rgba(255,255,255,0.25)",
                }}>{p.cat}</span>
                {p.url && (
                  <span className="xpx-pcard-arrow" style={{
                    position: "absolute", top: 10, right: 10, width: 30, height: 30, borderRadius: "50%",
                    background: "rgba(255,255,255,0.92)", color: "#111",
                    display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
                  }}>
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                      <path d="M4.667 11.333L11.333 4.667" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M4.667 4.667H11.333V11.333" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
                <div style={{ position: "absolute", left: 14, right: 14, bottom: 10, zIndex: 2 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", lineHeight: 1.25, textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>{p.name}</div>
                </div>
              </div>
              <div style={{ padding: "12px 14px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: p.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: t.textMuted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.tag}</span>
                </div>
                {p.url && (
                  <span style={{ fontSize: 11, fontWeight: 600, flexShrink: 0, background: "linear-gradient(135deg,#667eea,#764ba2)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    Visit →
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
    { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#667eea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>, title: "All-in-One Solutions", desc: "From websites and Shopify stores to SEO, Meta Ads, Google Ads, and social media management. We handle everything your business needs to grow online." },
    { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#764ba2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>, title: "Custom Strategies", desc: "Every business is different. We create tailored marketing and web solutions based on your industry, goals, and target audience." },
    { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>, title: "Conversion First", desc: "We don't just build beautiful websites. We create experiences designed to generate leads, increase sales, and improve customer engagement." },
    { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>, title: "Full Transparency", desc: "Stay informed with regular updates, performance reports, and a dedicated point of contact throughout your project." },
    { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>, title: "Fast Delivery", desc: "Our streamlined process ensures timely delivery without compromising on quality, performance, or design." },
    { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>, title: "Growth Partner", desc: "We're more than an agency. We work alongside your business, continuously optimizing and scaling your digital presence." },
  ];
  const t = THEME;
  const { mobile } = useViewport();
  return (
    <section style={{ background: t.sectionAlt, padding: mobile ? "60px 0" : "100px 0", boxSizing: "border-box" }}>
      <div style={{ maxWidth: 1024, margin: "0 auto", padding: mobile ? "0 20px" : "0 24px", boxSizing: "border-box" }}>
        <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.15em", color: t.textMuted, textTransform: "uppercase", margin: "0 0 8px" }}>Why us</p>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 52 }}>
          <div>
            <h2 style={{ fontSize: 38, fontWeight: 700, color: t.text, margin: "0 0 10px", letterSpacing: "-0.02em" }}>
              Why choose{" "}
              <span style={{
                background: "linear-gradient(135deg,#667eea 0%,#764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Xpanix?
              </span>
            </h2>
            <p style={{ fontSize: 16, color: t.textSub, margin: 0, maxWidth: 440 }}>We&apos;re not just another agency, we&apos;re your growth partner.</p>
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
                boxShadow: "var(--xpx-shadow-why-card)",
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
   CTA, above the footer
═══════════════════════════════════════════════════════ */
function CTASection() {
  const { mobile } = useViewport();
  return (
    <section style={{ padding: mobile ? "0 20px 60px" : "0 24px 100px", boxSizing: "border-box" }}>
      <div style={{ maxWidth: 1024, margin: "0 auto" }}>
        <div style={{
          position: "relative", overflow: "hidden", borderRadius: 32,
          background: "linear-gradient(135deg,#667eea 0%,#764ba2 100%)",
          padding: mobile ? "48px 28px" : "80px 60px",
          textAlign: "center", color: "#fff",
        }}>
          <div aria-hidden style={{ position: "absolute", top: -90, right: -80, width: 260, height: 260, borderRadius: "50%", background: "rgba(255,255,255,0.12)", filter: "blur(30px)" }} />
          <div aria-hidden style={{ position: "absolute", bottom: -100, left: -60, width: 260, height: 260, borderRadius: "50%", background: "rgba(255,255,255,0.10)", filter: "blur(30px)" }} />
          <p style={{ position: "relative", fontSize: 13, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.8, margin: "0 0 14px" }}>
            Ready to start?
          </p>
          <h2 style={{ position: "relative", fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 800, lineHeight: 1.15, margin: "0 0 16px", letterSpacing: "-0.02em" }}>
            Let&apos;s build your next standout project.
          </h2>
          <p style={{ position: "relative", fontSize: 16, opacity: 0.9, maxWidth: 520, margin: "0 auto 32px" }}>
            From concept to launch, we bring the strategy, design, and execution. You bring the ambition.
          </p>
          <a href="/#contact" style={{
            position: "relative", display: "inline-flex", alignItems: "center", gap: 8,
            background: "#fff", color: "#1a1530", fontWeight: 700, fontSize: 15,
            padding: "14px 30px", borderRadius: 999, textDecoration: "none",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          }}>
            Get Started
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4.667 11.333L11.333 4.667" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4.667 4.667H11.333V11.333" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   REVIEWS, shared portfolio-company carousel
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
  { q: "How long does a typical project take?", a: "Most websites take 2 to 4 weeks from brief to launch. UI/UX projects run 1 to 3 weeks depending on scope. Ad campaigns go live within 5 to 7 business days." },
  { q: "Do you work with international clients?", a: "Yes, about 40% of our clients are based outside India. We've worked with teams across the UK, UAE, US, Singapore, and beyond." },
  { q: "What does your design process look like?", a: "Discovery → Strategy → Design → Feedback → Delivery. You're involved at every key step, and we share progress weekly, no surprises, ever." },
  { q: "Can you handle both design and development?", a: "Absolutely. We're a full stack team, the same people who design your product also build it. No handoffs, no gaps in translation." },
  { q: "Do you offer ongoing support after launch?", a: "Yes. We offer monthly retainer packages for SEO, Meta ads management, and site maintenance. Many clients work with us for years." },
  { q: "How does pricing work?", a: "We price per project, not per hour. Every engagement starts with a scoping call where we give you a clear, flat-fee quote, no hidden costs." },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const t = THEME;
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
  const t = THEME;
  return (
    <div style={{ background: t.pageBg, fontFamily: "inherit" }}>

      {/* Hero responsive layout is CSS-driven so the first server-rendered
          paint is already correct, avoids a desktop→mobile layout flash. */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .xpx-hero { position: relative; display: flex; flex-direction: row; height: 82vh; min-height: 620px; padding: 80px 0 0; box-sizing: border-box; overflow: hidden; }
            .xpx-hero-left { position: relative; z-index: 1; width: 40%; flex-shrink: 0; display: flex; flex-direction: column; justify-content: flex-start; padding: 28px 44px 0 max(24px, calc((100vw - 1024px) / 2 + 24px)); box-sizing: border-box; }
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
        {/* Dot-grid overlay, kept separate so the section never mixes
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
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, width: "fit-content", fontSize: 12, color: t.textSub, border: `1px solid ${t.cardBorder}`, borderRadius: 999, padding: "5px 14px", marginBottom: 24, background: "var(--xpx-badge-bg)" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", display: "inline-block" }} />
            Available for projects
          </span>

          <h1 className="xpx-hero-h1" style={{ fontWeight: 700, lineHeight: 1.1, color: t.text, margin: "0 0 20px", letterSpacing: "-0.03em" }}>
            One team to{" "}
            <span style={{ background: "linear-gradient(135deg,#667eea 0%,#764ba2 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>xpand</span>{" "}
            it all.
          </h1>

          <p style={{ fontSize: 15, color: t.textSub, lineHeight: 1.75, margin: 0, maxWidth: 420 }}>
            From pixel perfect websites to conversion-driven UI/UX, SEO, and Meta
            ads, Xpanix builds brands that refuse to blend in.
          </p>
        </div>

        {/* RIGHT COL, desktop scattered fan (CSS-hidden on mobile) */}
        <div className="xpx-hero-right">
          {HERO_CARDS.map((card, i) => (
            <ScatterCard key={card.id} card={card} index={i} />
          ))}
        </div>

        {/* Mobile fan, compact, centered (CSS-hidden on desktop) */}
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
      <CTASection />
      <FAQSection />

    </div>
  );
}