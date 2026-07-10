export type Service = {
  slug: string;
  n: string;
  label: string;
  title: string;
  short: string;
  long: string;
  features: string[];
  process: { step: string; title: string; desc: string }[];
  img: string;
  icon: string;
};

export const servicesData: Service[] = [
  {
    slug: "web-development",
    n: "01",
    label: "Build",
    title: "Web Development",
    short: "Fast, scalable websites and apps built on modern frameworks.",
    long:
      "We craft websites and web apps that load fast, scale gracefully, and convert. From marketing sites to full stack platforms, every line of code is written with growth in mind.",
    features: [
      "Landing pages that convert",
      "Full stack Next.js & React",
      "Shopify stores that scale",
      "Web apps & dashboards",
      "API integrations",
      "Performance optimization",
    ],
    process: [
      { step: "01", title: "Discover", desc: "Audit your current stack, goals, and growth bottlenecks." },
      { step: "02", title: "Architect", desc: "Map the data, components, and routes before any code is written." },
      { step: "03", title: "Build", desc: "Ship the site in weekly milestones with continuous reviews." },
      { step: "04", title: "Launch & scale", desc: "Deploy with monitoring, then keep optimizing as traffic grows." },
    ],
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
  },
  {
    slug: "ui-ux-design",
    n: "02",
    label: "Design",
    title: "UI/UX Design",
    short: "Interfaces that convert and products users love.",
    long:
      "From wireframes to polished, pixel perfect UI, we design products people actually want to use. Every screen is a decision shaped by research and tested against real users.",
    features: [
      "User research & journeys",
      "Wireframes & prototypes",
      "Polished Figma UI",
      "Reusable design systems",
      "Developer ready handoff",
      "Usability testing",
    ],
    process: [
      { step: "01", title: "Research", desc: "Interview users, map jobs to be done, and audit the competition." },
      { step: "02", title: "Wireframe", desc: "Sketch flows fast, validate them, then lock structure." },
      { step: "03", title: "Visual design", desc: "Layer brand, typography, and motion into a polished UI." },
      { step: "04", title: "Handoff", desc: "Tokens, components, and specs your engineers can ship from day one." },
    ],
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80",
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    slug: "meta-ads",
    n: "03",
    label: "Reach",
    title: "Meta Ads",
    short: "Facebook & Instagram campaigns that actually scale ROI.",
    long:
      "Scroll stopping creatives, sharp targeting, and ruthless optimization. We turn your ad spend into a predictable growth channel, not a guessing game.",
    features: [
      "Campaign strategy",
      "Scroll stopping creatives",
      "Audience research",
      "A/B testing pipelines",
      "Funnel optimization",
      "ROAS focused reporting",
    ],
    process: [
      { step: "01", title: "Audit", desc: "Diagnose what's working, what's leaking, and where the easy wins are." },
      { step: "02", title: "Creative sprint", desc: "Produce a batch of fresh angles, hooks, and visual variations." },
      { step: "03", title: "Test & scale", desc: "Run structured tests, kill losers fast, scale winners hard." },
      { step: "04", title: "Report", desc: "Weekly insights tied to revenue, not just impressions." },
    ],
    img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80",
    icon: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z",
  },
  {
    slug: "seo",
    n: "04",
    label: "Discover",
    title: "SEO",
    short: "Rank higher, get found, compound growth month after month.",
    long:
      "We optimize your site end to end, technical, on page, content, and authority, so the right customers find you organically every single month.",
    features: [
      "Technical SEO audit",
      "On page optimization",
      "Keyword research",
      "Quality link building",
      "Content strategy",
      "Monthly performance reports",
    ],
    process: [
      { step: "01", title: "Audit", desc: "A deep dive on technical health, content gaps, and competitor positions." },
      { step: "02", title: "Strategy", desc: "Pick the keywords and pages that move the needle, in priority order." },
      { step: "03", title: "Execute", desc: "On page fixes, content sprints, and authority outreach." },
      { step: "04", title: "Compound", desc: "Track rankings, iterate monthly, watch organic traffic stack." },
    ],
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    icon: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
  },
  {
    slug: "product-photography",
    n: "05",
    label: "Capture",
    title: "Product Photography",
    short: "Studio grade imagery that makes your brand look premium.",
    long:
      "Crisp, styled, brand consistent product imagery for web, ads, and social. Studio shoots, lifestyle scenes, and retouching that elevates every touchpoint.",
    features: [
      "Studio product shoots",
      "Lifestyle scenes",
      "Professional retouching",
      "360° product spins",
      "Ad ready variations",
      "Brand consistent styling",
    ],
    process: [
      { step: "01", title: "Brief", desc: "Style references, must-have shots, and brand guardrails." },
      { step: "02", title: "Pre light", desc: "Set design, lighting tests, and styling so shoot day is on rails." },
      { step: "03", title: "Shoot", desc: "Capture every angle, lifestyle scene, and detail you'll need." },
      { step: "04", title: "Retouch", desc: "Edit, color grade, and deliver ad ready assets in every aspect ratio." },
    ],
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
    icon: "M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5z",
  },
];

export function getService(slug: string) {
  return servicesData.find((s) => s.slug === slug) || null;
}
