"use client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || "Login failed");
        setLoading(false);
        return;
      }
      const next = searchParams.get("next") || "/admin/blogs";
      router.push(next);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-sm rounded-[1.75rem] border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#131320] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.12)]"
    >
      <span className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center text-white font-extrabold text-lg mb-6 shadow-[0_8px_20px_rgba(91,43,232,0.35)]">
        X
      </span>

      <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-1">
        Admin <span className="gradient-text">login</span>
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-7">Sign in to edit blog content.</p>

      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
        Password
      </label>
      <input
        type="password"
        autoFocus
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0a0a0f] px-4 py-2.5 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#764ba2]/50 mb-4"
        placeholder="••••••••"
      />

      {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

      <button
        type="submit"
        disabled={loading || !password}
        className="w-full gradient-bg text-white font-semibold rounded-xl py-2.5 hover:opacity-90 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:translate-y-0 shadow-[0_8px_20px_rgba(91,43,232,0.25)]"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-[#0a0a0f] px-4">
      <div className="absolute inset-0 dot-grid dot-fade pointer-events-none" />
      <div className="pointer-events-none absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-gradient-to-bl from-[#764ba2]/20 via-[#667eea]/10 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-[24rem] h-[24rem] rounded-full bg-gradient-to-tr from-[#667eea]/15 via-[#764ba2]/10 to-transparent blur-3xl" />

      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
