export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: { name: string; role: string; initials: string; color: string };
  img: string;
  content: BlogBlock[];
};

export const blogCategories = ["All", "Web Development", "SEO", "Meta Ads", "UI/UX", "Photography"];

export const blogPosts: BlogPost[] = [
  {
    slug: "why-your-website-speed-is-costing-you-sales",
    title: "Why Your Website Speed Is Quietly Costing You Sales",
    excerpt:
      "Every extra second of load time pushes buyers away. Here's how we take sites from sluggish to sub second, and what it does to conversion rates.",
    category: "Web Development",
    date: "June 2, 2026",
    readTime: "6 min read",
    author: { name: "Arjun Mehta", role: "Lead Engineer", initials: "AM", color: "from-[#667eea] to-[#764ba2]" },
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
    content: [
      { type: "p", text: "Speed is the most underrated conversion lever on the web. Buyers rarely complain about a slow site, they just leave. And because they leave silently, most businesses never realize how much revenue is walking out the door." },
      { type: "h2", text: "The real cost of a slow site" },
      { type: "p", text: "Industry studies consistently show that conversion rates drop sharply with every additional second of load time. On mobile, where connections are less forgiving, the effect is even stronger. If your product page takes four seconds to render, a meaningful share of your paid traffic never even sees it." },
      { type: "list", items: ["Bounce rates climb steeply after the 3-second mark", "Slow sites earn fewer pages per session, hurting SEO signals", "Google's Core Web Vitals directly factor into rankings", "Ad costs effectively rise because fewer clicks convert"] },
      { type: "h2", text: "Where the seconds actually go" },
      { type: "p", text: "In our audits, the same culprits show up again and again: unoptimized hero images, render blocking third party scripts, heavy client side JavaScript doing work the server should do, and hosting that's geographically far from the audience." },
      { type: "quote", text: "Performance isn't a technical metric, it's a customer experience metric that happens to be measured in milliseconds." },
      { type: "h2", text: "How we fix it" },
      { type: "p", text: "We rebuild critical pages on a modern stack, server rendering with Next.js, image optimization, edge caching, and ruthless third party script pruning. Most projects go from failing Core Web Vitals to scores above 90 in under two weeks, and the conversion lift is usually visible within the first month." },
      { type: "p", text: "If you suspect your site is slower than it should be, a performance audit is the cheapest diagnostic you'll ever run, and usually the highest ROI fix on your roadmap." },
    ],
  },
  {
    slug: "seo-in-the-age-of-ai-search",
    title: "SEO in the Age of AI Search: What Still Works",
    excerpt:
      "AI answers are changing how people search, but the fundamentals of being found haven't died, they've sharpened. Here's where to focus now.",
    category: "SEO",
    date: "May 26, 2026",
    readTime: "7 min read",
    author: { name: "Sophia Reyes", role: "SEO Strategist", initials: "SR", color: "from-[#764ba2] to-[#667eea]" },
    img: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=1400&q=80",
    content: [
      { type: "p", text: "Every few years someone declares SEO dead. AI generated answers are the latest reason, and like every time before, the truth is more interesting: search is changing shape, and the brands that adapt early collect the traffic everyone else loses." },
      { type: "h2", text: "What's actually changing" },
      { type: "p", text: "AI summaries increasingly answer simple informational queries directly. That means thin, generic content earns less traffic than ever. But commercial intent searches, comparisons, reviews, local services, product research, still send users to websites, because that's where decisions happen." },
      { type: "h2", text: "The three pillars that matter more now" },
      { type: "list", items: ["First hand expertise: content only you could write, drawn from real projects and data", "Technical excellence: fast, crawlable, structured sites that machines can parse confidently", "Brand authority: mentions, links, and consistency that make you the citation, not the casualty"] },
      { type: "quote", text: "In AI search, you're either the source being quoted or the site being skipped. Structure and authority decide which." },
      { type: "h2", text: "Practical moves for the next six months" },
      { type: "p", text: "Add schema markup everywhere it's honest to do so. Convert your service pages from brochures into genuinely useful resources. Publish content with named authors and real opinions. And keep your technical foundation immaculate, crawl errors and slow pages are amplified weaknesses now." },
      { type: "p", text: "SEO isn't dying; lazy SEO is. The compounding channel is still compounding, for the brands willing to earn it." },
    ],
  },
  {
    slug: "meta-ads-creative-testing-framework",
    title: "The Creative Testing Framework Behind Our Best ROAS Accounts",
    excerpt:
      "Targeting is automated now, creative is the new targeting. This is the exact testing loop we run to find winning ads without burning budget.",
    category: "Meta Ads",
    date: "May 18, 2026",
    readTime: "5 min read",
    author: { name: "Dana Rodriguez", role: "Paid Media Lead", initials: "DR", color: "from-cyan-400 to-[#764ba2]" },
    img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1400&q=80",
    content: [
      { type: "p", text: "Meta's algorithm has absorbed most of the targeting work that media buyers used to obsess over. What it can't do is make your ad interesting. Creative is now the single biggest lever in the account, and most advertisers still test it badly." },
      { type: "h2", text: "Why most creative testing fails" },
      { type: "p", text: "The classic mistake is testing five nearly identical ads. Same hook, same format, slightly different colors. The algorithm picks one, you learn nothing, and the 'winner' fatigues in two weeks because it was never differentiated to begin with." },
      { type: "h2", text: "Test angles, not variations" },
      { type: "p", text: "We structure every test around distinct persuasion angles: the problem led hook, the social proof story, the demonstration, the objection killer, the founder narrative. Each angle gets a fair budget and a real chance to find its audience." },
      { type: "list", items: ["Batch 4 to 6 genuinely different angles per testing cycle", "Judge on thumb stop rate and hold rate before CPA", "Kill losers fast, but give the algorithm 3 to 4 days of signal", "Rebuild winners into new formats before they fatigue"] },
      { type: "quote", text: "A winning ad isn't found, it's manufactured by testing real strategic alternatives, not cosmetic tweaks." },
      { type: "h2", text: "The compounding effect" },
      { type: "p", text: "Run this loop monthly and something powerful happens: you build a library of proven angles. New campaigns stop starting from zero. That library is why mature accounts scale calmly while new ones lurch, and it's an asset you own forever." },
    ],
  },
  {
    slug: "design-systems-that-scale-with-your-product",
    title: "Design Systems That Scale With Your Product, Not Against It",
    excerpt:
      "A design system should make every future feature cheaper to build. Here's how we structure tokens, components, and docs so it actually does.",
    category: "UI/UX",
    date: "May 9, 2026",
    readTime: "6 min read",
    author: { name: "Irene Castillo", role: "Design Director", initials: "IC", color: "from-[#667eea] to-[#764ba2]" },
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1400&q=80",
    content: [
      { type: "p", text: "Every team says they have a design system. Usually they have a Figma file with some components in it. The difference shows up six months later, when a redesign takes a quarter instead of a sprint." },
      { type: "h2", text: "Tokens before components" },
      { type: "p", text: "The foundation isn't buttons, it's decisions. Color, spacing, typography, radius, and shadow encoded as named tokens. When the brand evolves, you change a token once and the entire product follows. Skip this layer and every future change becomes a manual hunt." },
      { type: "h2", text: "Components earn their place" },
      { type: "p", text: "A component joins the system when it's used three times, not when someone thinks it might be useful someday. Speculative components rot. Proven patterns, promoted deliberately with clear props and states, stay healthy." },
      { type: "list", items: ["Name tokens by role (surface, accent) not value (blue-500)", "Document the why, not just the what, for each pattern", "Version the system and publish change logs engineers read", "Audit quarterly: usage analytics tell you what to prune"] },
      { type: "quote", text: "A good design system is measured by the speed of the next feature, not the beauty of the documentation site." },
      { type: "p", text: "Built this way, the system becomes a flywheel: design moves faster because decisions are pre made, engineering moves faster because the UI is predictable, and the product feels coherent because consistency is the default rather than a discipline." },
    ],
  },
  {
    slug: "product-photos-that-convert-browsers-into-buyers",
    title: "Product Photos That Convert Browsers Into Buyers",
    excerpt:
      "Specs tell, photos sell. What we've learned shooting thousands of SKUs about the images that actually move add to cart rates.",
    category: "Photography",
    date: "April 30, 2026",
    readTime: "5 min read",
    author: { name: "Caleb Nørr", role: "Studio Director", initials: "CN", color: "from-[#764ba2] to-[#667eea]" },
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=80",
    content: [
      { type: "p", text: "On a product page, photography does the job your best salesperson would do in a store: it answers the questions customers don't ask out loud. Is this well made? Will it fit my life? Can I trust this brand? Most listings answer none of them." },
      { type: "h2", text: "The image stack that sells" },
      { type: "p", text: "After shooting thousands of SKUs, we've converged on a reliable sequence: a clean hero shot that wins the click, detail shots that prove quality, a scale shot that kills size doubt, a lifestyle scene that creates desire, and, for higher priced items, a 360° spin that closes inspection minded buyers." },
      { type: "list", items: ["Hero: clean background, perfect light, zero distraction", "Detail: texture and craftsmanship at macro distance", "Scale: the product in hand or in context", "Lifestyle: the customer's aspirational moment", "Spin: full confidence for considered purchases"] },
      { type: "h2", text: "Consistency is a brand asset" },
      { type: "p", text: "One great photo helps one product. A consistent visual system helps every product, the same lighting logic, angle grammar, and color accuracy across the whole catalog reads as professionalism before a single word is read." },
      { type: "quote", text: "Customers can't touch your product online. Your photography is the closest thing to handing it to them." },
      { type: "p", text: "If your conversion rate lags behind your traffic quality, audit your imagery before you audit your pricing. It's usually the cheaper fix, and the faster one." },
    ],
  },
  {
    slug: "nextjs-vs-wordpress-for-growing-brands",
    title: "Next.js or WordPress? Choosing the Right Stack for a Growing Brand",
    excerpt:
      "Both can power a great website. The right answer depends on your team, your content velocity, and how custom your product needs to get.",
    category: "Web Development",
    date: "April 21, 2026",
    readTime: "7 min read",
    author: { name: "Arjun Mehta", role: "Lead Engineer", initials: "AM", color: "from-cyan-400 to-[#764ba2]" },
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80",
    content: [
      { type: "p", text: "This is the question we get most from founders: should we build on WordPress like everyone else, or go custom with something like Next.js? The honest answer is that both are excellent, for different shapes of business." },
      { type: "h2", text: "When WordPress wins" },
      { type: "p", text: "If your site is content first, lots of articles, frequent editor updates, a marketing team that ships pages weekly without engineers, WordPress's editorial tooling is genuinely hard to beat. With good hosting and a disciplined plugin diet, it's fast and reliable." },
      { type: "h2", text: "When Next.js wins" },
      { type: "p", text: "If your site is product first, custom interactions, dashboards, ecommerce logic, integrations, or performance as a competitive edge, a Next.js build gives you complete control. There's no plugin ceiling, no theme constraints, and Core Web Vitals scores that templated stacks struggle to match." },
      { type: "list", items: ["WordPress: content velocity, editor autonomy, proven ecosystem", "Next.js: performance ceiling, custom UX, engineering control", "Hybrid: headless WordPress feeding a Next.js frontend, both strengths, one stack"] },
      { type: "quote", text: "Pick the stack that matches who updates the site every week, not the one that's trending on developer Twitter." },
      { type: "p", text: "Our rule of thumb: marketing sites with heavy publishing lean WordPress or headless; product experiences and conversion critical funnels lean Next.js. And when in doubt, the hybrid path keeps every door open." },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug) || null;
}
