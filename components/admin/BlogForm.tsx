"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { blogCategories, type BlogPost } from "@/components/blogsData";
import { slugify } from "@/lib/slugify";
import { blocksToHtml } from "@/lib/blogContent";
import DatePicker from "@/components/admin/DatePicker";
import ImageUploader from "@/components/admin/ImageUploader";
import RichTextEditor from "@/components/admin/RichTextEditor";

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

export default function BlogForm({ mode, initialPost }: { mode: "create" | "edit"; initialPost?: BlogPost }) {
  const router = useRouter();
  const [post, setPost] = useState<BlogPost>(initialPost ?? emptyPost());
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [error, setError] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [initialContent] = useState(() => blocksToHtml((initialPost ?? emptyPost()).content));

  function updateField<K extends keyof BlogPost>(key: K, value: BlogPost[K]) {
    setPost((p) => ({ ...p, [key]: value }));
  }

  async function handleUploadFile(file: File) {
    if (file.type !== "image/webp") {
      setUploadError("Only .webp images are allowed");
      return;
    }
    setUploading(true);
    setUploadError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Upload failed");
      updateField("img", data.url);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
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

    if (!cleaned.date.trim()) {
      setError("Pick a publish date");
      return;
    }

    if (!cleaned.img.trim()) {
      setError("Add a cover image");
      return;
    }

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
            <DatePicker value={post.date} onChange={(date) => updateField("date", date)} />
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
          <ImageUploader
            value={post.img}
            onChange={(url) => updateField("img", url)}
            onUploadFile={handleUploadFile}
            uploading={uploading}
            error={uploadError}
          />
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#131320] p-6 space-y-4">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Content</h2>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Write or paste your post here — pasted bold text and paragraph breaks carry over automatically. Use the toolbar for headings, quotes, links and lists.
          </p>
        </div>
        <RichTextEditor content={initialContent} onChange={(content) => updateField("content", content)} />
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
