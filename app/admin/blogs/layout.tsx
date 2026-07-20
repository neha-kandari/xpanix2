import Link from "next/link";
import LogoutButton from "@/components/admin/LogoutButton";

export default function AdminBlogsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0f]">
      <header className="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-[#0a0a0f]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/admin/blogs" className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-white font-extrabold text-sm flex-shrink-0">
              X
            </span>
            <span className="font-extrabold tracking-tight text-gray-900 dark:text-white">
              Xpanix <span className="gradient-text">Admin</span>
            </span>
          </Link>
          <nav className="flex items-center gap-3 sm:gap-6">
            <Link
              href="/blogs"
              target="_blank"
              className="hidden sm:inline text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              View site ↗
            </Link>
            <Link
              href="/admin/blogs/new"
              className="text-sm font-semibold gradient-bg text-white px-4 py-2 rounded-full hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-[0_4px_14px_rgba(91,43,232,0.25)]"
            >
              + New Post
            </Link>
            <LogoutButton />
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-10">{children}</main>
    </div>
  );
}
