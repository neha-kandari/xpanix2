/**
 * Minimal allowlist HTML sanitizer for rich-text blog content.
 * Runs server-side (no DOM available), so it works on the raw markup
 * produced by the TipTap editor rather than relying on browser APIs.
 * Strips anything outside the allowlist instead of trying to fix it up.
 */

const ALLOWED_TAGS = new Set(["strong", "b", "em", "i", "u", "a", "br", "s", "code"]);

function sanitizeHref(href: string): string | null {
  const value = href.trim();
  if (/^(https?:|mailto:)/i.test(value)) return value;
  if (value.startsWith("/") || value.startsWith("#")) return value;
  return null;
}

/** Strips any tag not in the allowlist and any attribute other than a safe `href` on `<a>`. */
export function sanitizeInlineHtml(input: string): string {
  if (!input) return "";

  return input.replace(/<\/?([a-zA-Z][a-zA-Z0-9]*)((?:\s+[^<>]*)?)\/?>/g, (match, rawTag, rawAttrs) => {
    const tag = String(rawTag).toLowerCase();
    if (!ALLOWED_TAGS.has(tag)) return "";

    const isClosing = match.startsWith("</");
    if (isClosing) return `</${tag}>`;

    if (tag === "br") return "<br>";

    if (tag === "a") {
      const hrefMatch = /href\s*=\s*"([^"]*)"|href\s*=\s*'([^']*)'/i.exec(rawAttrs ?? "");
      const rawHref = hrefMatch ? hrefMatch[1] ?? hrefMatch[2] ?? "" : "";
      const safeHref = sanitizeHref(rawHref);
      return safeHref
        ? `<a href="${safeHref.replace(/"/g, "&quot;")}" target="_blank" rel="noopener noreferrer">`
        : "<a>";
    }

    return `<${tag}>`;
  });
}
