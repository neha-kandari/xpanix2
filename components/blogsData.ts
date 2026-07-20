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
  img: string;
  content: BlogBlock[];
};

export const blogCategories = ["All", "Web Development", "SEO", "Meta Ads", "UI/UX", "Photography"];
