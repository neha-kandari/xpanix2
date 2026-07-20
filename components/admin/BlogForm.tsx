"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { blogCategories, type BlogBlock, type BlogPost } from "@/components/blogsData";
import { slugify } from "@/lib/slugify";

const CATEGORY_OPTIONS = blogCategories.filter((c) => c !== "All");

const emptyPost = (): BlogPost => ({
  slug: "",
  title: "",
  excerpt: "",
  category: CATEGORY_OPTIONS[0],
  date: "",
  readTime: "",
  img: "",
  content: [{ type: "p", text: "" }],
});

function BlockEditor({
  block,
  onChange,
  onRemove,
  onMove,
  isFirst,
  isLast,
}: {
  block: BlogBlock;
  onChange: (block: BlogBlock) => void;
  onRemove: () => void;
  onMove: (direction: -1 | 1) => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0d0d15] p-4">
      <div className="flex items-center justify-between mb-3">
        <select
          value={block.type}
          onChange={(e) => {
            const type = e.target.value as BlogBlock["type"];
            if (type === "list") onChange({ type: "list", items: [""] });
            else onChange({ type, text: "" });
          }}
          className="text-xs font-bold uppercase tracking-wider bg-white dark:bg-[#131320] border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1 text-gray-700 dark:text-gray-300"
        >
          <option value="p">Paragraph</option>
          <option value="h2">Heading</option>
          <option value="quote">Quote</option>
          <option value="list">List</option>
        </select>
        <div className="flex items-center gap-3">
          <button type="button" disabled={isFirst} onClick={() => onMove(-1)} className="text-xs text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-30">
            ↑
          </button>
          <button type="button" disabled={isLast} onClick={() => onMove(1)} className="text-xs text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-30">
            ↓
          </button>
          <button type="button" onClick={onRemove} className="text-xs font-semibold text-red-500 hover:text-red-600">
            Remove
          </button>
        </div>
      </div>

      {block.type === "list" ? (
        <textarea
          value={block.items.join("\n")}
          onChange={(e) => onChange({ type: "list", items: e.target.value.split("\n") })}
          placeholder="One item per line"
          rows={4}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#131320] px-3 py-2 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#764ba2]/50"
        />
      ) : (
        <textarea
          value={block.text}
          onChange={(e) => onChange({ ...block, text: e.target.value } as BlogBlock)}
          placeholder={block.type === "h2" ? "Heading text" : block.type === "quote" ? "Quote text" : "Paragraph text"}
          rows={block.type === "p" ? 4 : 2}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#131320] px-3 py-2 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#764ba2]/50"
        />
      )}
    </div>
  );
}

export default function BlogForm({ mode, initialPost }: { mode: "create" | "edit"; initialPost?: BlogPost }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [post, setPost] = useState<BlogPost>(initialPost ?? emptyPost());
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  function updateField<K extends keyof BlogPost>(key: K, value: BlogPost[K]) {
    setPost((p) => ({ ...p, [key]: value }));
  }

  function updateBlock(index: number, block: BlogBlock) {
    setPost((p) => ({ ...p, content: p.content.map((b, i) => (i === index ? block : b)) }));
  }

  function removeBlock(index: number) {
    setPost((p) => ({ ...p, content: p.content.filter((_, i) => i !== index) }));
  }

  function moveBlock(index: number, direction: -1 | 1) {
    setPost((p) => {
      const next = [...p.content];
      const target = index + direction;
      if (target < 0 || target >= next.length) return p;
      [next[index], next[target]] = [next[target], next[index]];
      return { ...p, content: next };
    });
  }

  function addBlock(type: BlogBlock["type"]) {
    const block: BlogBlock = type === "list" ? { type: "list", items: [""] } : { type, text: "" };
    setPost((p) => ({ ...p, content: [...p.content, block] }));
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "image/webp") {
      setError("Only .webp images are allowed");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Upload failed");
      updateField("img", data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const cleaned: BlogPost = {
      ...post,
      content: post.content
        .map((b) => (b.type === "list" ? { ...b, items: b.items.map((i) => i.trim()).filter(Boolean) } : b))
        .filter((b) => (b.type === "list" ? b.items.length > 0 : b.text.trim().length > 0)),
    };

    if (!cleaned.content.length) {
      setError("Add at least one content block");
      return;
    }

    setSaving(true);
    try {
      const url = mode === "create" ? "/api/admin/blogs" : `/api/admin/blogs/${encodeURIComponent(initialPost!.slug)}`;
      const method = mode === "create" ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleaned),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to save post");
      router.push("/admin/blogs");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save post");
      setSaving(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#131320] px-3 py-2 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#764ba2]/50";
  const labelClass = "block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#131320] p-6 space-y-5">
        <div>
          <label className={labelClass}>Title</label>
          <input
            required
            value={post.title}
            onChange={(e) => {
              const title = e.target.value;
              updateField("title", title);
              if (!slugTouched) updateField("slug", slugify(title));
            }}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Slug</label>
          <input
            required
            value={post.slug}
            onChange={(e) => {
              setSlugTouched(true);
              updateField("slug", slugify(e.target.value));
            }}
            className={inputClass}
          />
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">/blogs/{post.slug || "your-slug"}</p>
        </div>

        <div>
          <label className={labelClass}>Excerpt</label>
          <textarea
            required
            rows={2}
            value={post.excerpt}
            onChange={(e) => updateField("excerpt", e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Category</label>
            <select value={post.category} onChange={(e) => updateField("category", e.target.value)} className={inputClass}>
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Date</label>
            <input
              required
              placeholder="June 2, 2026"
              value={post.date}
              onChange={(e) => updateField("date", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Read time</label>
            <input
              required
              placeholder="6 min read"
              value={post.readTime}
              onChange={(e) => updateField("readTime", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Cover image</label>
          <div className="flex items-start gap-4">
            {post.img && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={post.img} alt="" className="w-28 h-20 rounded-lg object-cover flex-shrink-0 bg-gray-100 dark:bg-gray-900" />
            )}
            <div className="flex-1 space-y-2">
              <input
                required
                placeholder="https://..."
                value={post.img}
                onChange={(e) => updateField("img", e.target.value)}
                className={inputClass}
              />
              <div className="flex items-center gap-3">
                <input ref={fileInputRef} type="file" accept="image/webp" onChange={handleUpload} className="text-xs text-gray-500 dark:text-gray-400" />
                {uploading && <span className="text-xs text-gray-400">Uploading...</span>}
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500">Only .webp images can be uploaded.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#131320] p-6 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Content</h2>
        <div className="space-y-4">
          {post.content.map((block, i) => (
            <BlockEditor
              key={i}
              block={block}
              onChange={(b) => updateBlock(i, b)}
              onRemove={() => removeBlock(i)}
              onMove={(dir) => moveBlock(i, dir)}
              isFirst={i === 0}
              isLast={i === post.content.length - 1}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {(["p", "h2", "quote", "list"] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => addBlock(type)}
              className="text-xs font-semibold px-3 py-1.5 rounded-full border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-[#764ba2]/50 hover:text-[#764ba2] dark:hover:text-[#667eea] transition-colors"
            >
              + {type === "p" ? "Paragraph" : type === "h2" ? "Heading" : type === "quote" ? "Quote" : "List"}
            </button>
          ))}
        </div>
      </section>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="gradient-bg text-white font-semibold rounded-full px-6 py-2.5 hover:opacity-90 transition-all disabled:opacity-50"
        >
          {saving ? "Saving..." : mode === "create" ? "Publish post" : "Save changes"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/blogs")}
          className="text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
