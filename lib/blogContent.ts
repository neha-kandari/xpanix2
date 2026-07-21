import type { JSONContent } from "@tiptap/react";
import type { BlogBlock } from "@/components/blogsData";

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Renders a run of TipTap inline nodes (text + hardBreak) into the small inline-HTML dialect the site stores/renders. */
function inlineToHtml(nodes: JSONContent[] | undefined): string {
  if (!nodes) return "";

  return nodes
    .map((node) => {
      if (node.type === "hardBreak") return "<br>";
      if (node.type !== "text" || !node.text) return "";

      let html = escapeHtml(node.text);
      for (const mark of node.marks ?? []) {
        if (mark.type === "bold") html = `<strong>${html}</strong>`;
        else if (mark.type === "italic") html = `<em>${html}</em>`;
        else if (mark.type === "underline") html = `<u>${html}</u>`;
        else if (mark.type === "link" && typeof mark.attrs?.href === "string") {
          html = `<a href="${escapeHtml(mark.attrs.href)}" target="_blank" rel="noopener noreferrer">${html}</a>`;
        }
      }
      return html;
    })
    .join("");
}

/** Converts a TipTap/ProseMirror document into the site's flat BlogBlock[] content model. */
export function docToBlocks(doc: JSONContent): BlogBlock[] {
  const blocks: BlogBlock[] = [];

  for (const node of doc.content ?? []) {
    if (node.type === "paragraph") {
      const text = inlineToHtml(node.content).trim();
      if (text) blocks.push({ type: "p", text });
    } else if (node.type === "heading") {
      const text = inlineToHtml(node.content).trim();
      if (text) blocks.push({ type: "h2", text });
    } else if (node.type === "blockquote") {
      const text = (node.content ?? [])
        .map((p) => inlineToHtml(p.content).trim())
        .filter(Boolean)
        .join(" ");
      if (text) blocks.push({ type: "quote", text });
    } else if (node.type === "bulletList") {
      const items = (node.content ?? [])
        .map((li) =>
          (li.content ?? [])
            .map((p) => inlineToHtml(p.content).trim())
            .filter(Boolean)
            .join(" ")
        )
        .filter(Boolean);
      if (items.length) blocks.push({ type: "list", items });
    }
  }

  return blocks;
}

/** Converts the site's flat BlogBlock[] content model into HTML that TipTap can load as initial editor content. */
export function blocksToHtml(blocks: BlogBlock[]): string {
  return blocks
    .map((block) => {
      switch (block.type) {
        case "p":
          return `<p>${block.text}</p>`;
        case "h2":
          return `<h2>${block.text}</h2>`;
        case "quote":
          return `<blockquote><p>${block.text}</p></blockquote>`;
        case "list":
          return `<ul>${block.items.map((item) => `<li><p>${item}</p></li>`).join("")}</ul>`;
        default:
          return "";
      }
    })
    .join("");
}
