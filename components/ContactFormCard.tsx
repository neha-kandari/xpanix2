"use client";
import { useState } from "react";
import TiltCard from "./TiltCard";

export default function ContactFormCard({ service }: { service: string }) {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = (fd.get("name") || "").toString();
    const email = (fd.get("email") || "").toString();
    const message = (fd.get("message") || "").toString();
    const text = `Hi Xpanix, I'm interested in your ${service} service.\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;
    window.open(`https://wa.me/918930005190?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setSent(true);
    setTimeout(() => setSent(false), 3500);
  };

  return (
    <TiltCard className="w-full">
      <div
        className="relative rounded-3xl p-6 md:p-7 backdrop-blur-2xl
                   bg-white/55 dark:bg-[#131320]/55
                   border border-white/50 dark:border-white/10"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* corner glow for the glass to refract */}
        <div className="pointer-events-none absolute -top-16 -right-16 w-44 h-44 rounded-full bg-gradient-to-br from-[#667eea]/30 to-[#764ba2]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 w-44 h-44 rounded-full bg-gradient-to-br from-[#764ba2]/25 to-transparent blur-3xl" />

        <div className="relative" style={{ transform: "translateZ(30px)" }}>
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase gradient-text mb-1">
            Quick connect
          </p>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Let&rsquo;s talk.</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-5">
            Tell us about your {service.toLowerCase()} project — we&rsquo;ll reply within a day.
          </p>

          {sent ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full gradient-bg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Got it!</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">We&rsquo;ll be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                name="name"
                required
                placeholder="Your name"
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-white/70 dark:bg-[#0f0f18]/70 border border-gray-200/70 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-[#764ba2] focus:ring-2 focus:ring-[#764ba2]/20 transition"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Email address"
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-white/70 dark:bg-[#0f0f18]/70 border border-gray-200/70 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-[#764ba2] focus:ring-2 focus:ring-[#764ba2]/20 transition"
              />
              <textarea
                name="message"
                required
                rows={3}
                placeholder="A bit about your project..."
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-white/70 dark:bg-[#0f0f18]/70 border border-gray-200/70 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-[#764ba2] focus:ring-2 focus:ring-[#764ba2]/20 transition resize-none"
              />
              <button
                type="submit"
                className="mt-1 gradient-bg text-white font-semibold text-sm py-3 rounded-xl hover:opacity-95 active:scale-[0.98] transition-all shadow-lg shadow-[#764ba2]/20 flex items-center justify-center gap-2"
              >
                Send message
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </form>
          )}
        </div>
      </div>
    </TiltCard>
  );
}
