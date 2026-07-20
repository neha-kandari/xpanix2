"use client";
import { useState } from "react";
import Link from "next/link";
import type { BlogPost } from "@/components/blogsData";
import DeletePostButton from "./DeletePostButton";

const CATEGORY_STYLES: Record<string, string> = {
  "Web Development": "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
  SEO: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  "Meta Ads": "bg-pink-50 text-pink-600 dark:bg-pink-500/10 dark:text-pink-400",
  "UI/UX": "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400",
  Photography: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
};
const DEFAULT_CATEGORY_STYLE = "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300";

function CategoryChip({ category }: { category: string }) {
  return (
    <span
      className={`inline-flex text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
        CATEGORY_STYLES[category] ?? DEFAULT_CATEGORY_STYLE
      }`}
    >
      {category}
    </span>
  );
}

type View = "grid" | "list";

function ViewToggle({ view, onChange }: { view: View; onChange: (v: View) => void }) {
  const base = "p-2 rounded-full transition-colors";
  const active = "gradient-bg text-white shadow-sm";
  const inactive = "text-gray-400 hover:text-gray-700 dark:hover:text-gray-200";

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#131320] p-1">
      <button onClick={() => onChange("grid")} aria-label="Grid view" aria-pressed={view === "grid"} className={`${base} ${view === "grid" ? active : inactive}`}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="3" width="7" height="7" rx="1.5" strokeWidth={2} />
          <rect x="14" y="3" width="7" height="7" rx="1.5" strokeWidth={2} />
          <rect x="3" y="14" width="7" height="7" rx="1.5" strokeWidth={2} />
          <rect x="14" y="14" width="7" height="7" rx="1.5" strokeWidth={2} />
        </svg>
      </button>
      <button onClick={() => onChange("list")} aria-label="List view" aria-pressed={view === "list"} className={`${base} ${view === "list" ? active : inactive}`}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-[#131320] py-24 text-center">
      <p className="text-gray-500 dark:text-gray-400 mb-5">No posts yet.</p>
      <Link
        href="/admin/blogs/new"
        className="inline-flex items-center gap-2 text-sm font-semibold gradient-bg text-white px-5 py-2.5 rounded-full hover:opacity-90 transition-all"
      >
        Create your first post
      </Link>
    </div>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <div className="group flex flex-col rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#131320] hover:border-[#764ba2]/40 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-300">
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-900">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.img}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <CategoryChip category={post.category} />
        </div>
      </div>
      <div className="flex flex-col flex-1 p-5">
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">
          {post.date} • {post.readTime}
        </p>
        <h3 className="font-bold text-gray-900 dark:text-white leading-snug mb-4 flex-1 line-clamp-2">{post.title}</h3>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-4">
            <Link
              href={`/blogs/${post.slug}`}
              target="_blank"
              className="text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              View
            </Link>
            <Link
              href={`/admin/blogs/${post.slug}`}
              className="text-xs font-semibold gradient-text hover:opacity-80 transition-opacity"
            >
              Edit
            </Link>
          </div>
          <DeletePostButton slug={post.slug} title={post.title} />
        </div>
      </div>
    </div>
  );
}

function PostRow({ post }: { post: BlogPost }) {
  return (
    <div className="flex items-center gap-4 p-4 sm:p-5 hover:bg-gray-50 dark:hover:bg-[#0d0d15] transition-colors">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={post.img}
        alt={post.title}
        className="w-16 h-12 sm:w-20 sm:h-14 rounded-lg object-cover flex-shrink-0 bg-gray-100 dark:bg-gray-900"
      />
      <div className="flex-1 min-w-0">
        <p className="font-bold text-gray-900 dark:text-white truncate">{post.title}</p>
        <div className="flex flex-wrap items-center gap-2 mt-1.5">
          <CategoryChip category={post.category} />
          <span className="text-xs text-gray-400 dark:text-gray-500 truncate">
            {post.date} • /blogs/{post.slug}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4 flex-shrink-0">
        <Link
          href={`/blogs/${post.slug}`}
          target="_blank"
          className="hidden sm:inline text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        >
          View
        </Link>
        <Link
          href={`/admin/blogs/${post.slug}`}
          className="text-sm font-semibold gradient-text hover:opacity-80 transition-opacity"
        >
          Edit
        </Link>
        <DeletePostButton slug={post.slug} title={post.title} />
      </div>
    </div>
  );
}

export default function BlogsList({ posts }: { posts: BlogPost[] }) {
  const [view, setView] = useState<View>("grid");

  const categoryCount = new Set(posts.map((p) => p.category)).size;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">Blog posts</h1>
          {posts.length > 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {posts.length} {posts.length === 1 ? "post" : "posts"} across {categoryCount}{" "}
              {categoryCount === 1 ? "category" : "categories"}
            </p>
          )}
        </div>
        {posts.length > 0 && <ViewToggle view={view} onChange={setView} />}
      </div>

      {posts.length === 0 ? (
        <EmptyState />
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#131320] divide-y divide-gray-200 dark:divide-gray-800 overflow-hidden">
          {posts.map((post) => (
            <PostRow key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
