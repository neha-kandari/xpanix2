import { blogCategories, type BlogBlock, type BlogPost } from "@/components/blogsData";
import { sanitizeInlineHtml } from "@/lib/sanitizeHtml";

type ValidationResult = { post: BlogPost } | { error: string };

export function validateBlogPostInput(data: unknown): ValidationResult {
  if (typeof data !== "object" || data === null) return { error: "Invalid post data" };
  const d = data as Record<string, unknown>;

  const slug = typeof d.slug === "string" ? d.slug.trim() : "";
  const title = typeof d.title === "string" ? d.title.trim() : "";
  const excerpt = typeof d.excerpt === "string" ? d.excerpt.trim() : "";
  const category = typeof d.category === "string" ? d.category : "";
  const date = typeof d.date === "string" ? d.date.trim() : "";
  const readTime = typeof d.readTime === "string" ? d.readTime.trim() : "";
  const img = typeof d.img === "string" ? d.img.trim() : "";

  if (!slug || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
    return { error: "Slug must contain only lowercase letters, numbers, and hyphens" };
  }
  if (!title) return { error: "Title is required" };
  if (!excerpt) return { error: "Excerpt is required" };
  if (category === "All" || !blogCategories.includes(category)) return { error: "Choose a valid category" };
  if (!date) return { error: "Date is required" };
  if (!readTime) return { error: "Read time is required" };
  if (!img) return { error: "Cover image is required" };

  const contentInput = Array.isArray(d.content) ? d.content : [];
  const content: BlogBlock[] = [];
  for (const raw of contentInput) {
    if (typeof raw !== "object" || raw === null) continue;
    const b = raw as Record<string, unknown>;
    if (b.type === "p" || b.type === "h2" || b.type === "quote") {
      const text = typeof b.text === "string" ? sanitizeInlineHtml(b.text.trim()) : "";
      if (text) content.push({ type: b.type, text });
    } else if (b.type === "list") {
      const items = Array.isArray(b.items)
        ? b.items
            .filter((it): it is string => typeof it === "string" && it.trim().length > 0)
            .map((it) => sanitizeInlineHtml(it.trim()))
            .filter(Boolean)
        : [];
      if (items.length) content.push({ type: "list", items });
    }
  }
  if (!content.length) return { error: "Add at least one content block" };

  return { post: { slug, title, excerpt, category, date, readTime, img, content } };
}
