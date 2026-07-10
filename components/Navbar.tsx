"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { servicesData } from "./servicesData";

type LinkItem = { name: string; href: string; hasDropdown?: boolean };

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  const links: LinkItem[] = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services", hasDropdown: true },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Blogs", href: "/blogs" },
    { name: "Contact Us", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const scheduleCloseServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setServicesOpen(false), 120);
  };

  // shared classes — text stays VISIBLE on hover/click (color shift + subtle bg, no white-on-white)
  const linkBase =
    "text-base font-medium px-4 py-2 rounded-lg transition-all whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#764ba2]";
  const linkInactive =
    "text-gray-700 dark:text-gray-300 hover:text-[#764ba2] dark:hover:text-[#667eea] hover:bg-gray-100 dark:hover:bg-gray-800 active:text-[#764ba2] dark:active:text-[#667eea]";
  const linkActive =
    "text-[#764ba2] dark:text-[#667eea] underline underline-offset-4 decoration-2";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4">
      <div className="relative mx-auto flex items-center justify-between max-w-5xl mt-3 px-6 py-3 rounded-full bg-white/80 dark:bg-[#0a0a0f]/80 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-all duration-300">
        {/* Logo */}
        <a href="/" className="flex items-center leading-none" aria-label="Xpanix home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assests/Logo.webp" alt="Xpanix" className="h-11 w-auto block dark:hidden" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assests/LogoDark.webp" alt="Xpanix" className="h-11 w-auto hidden dark:block" />
        </a>

        {/* Center nav */}
        <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {links.map((link) => {
            const active = isActive(link.href);

            if (link.hasDropdown) {
              return (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={openServices}
                  onMouseLeave={scheduleCloseServices}
                >
                  <button
                    type="button"
                    onClick={() => setServicesOpen((v) => !v)}
                    aria-current={active ? "page" : undefined}
                    aria-haspopup="true"
                    aria-expanded={servicesOpen}
                    className={`inline-flex items-center gap-1 cursor-pointer ${linkBase} ${active ? linkActive : linkInactive}`}
                  >
                    {link.name}
                    <svg
                      className={`w-3 h-3 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 rounded-2xl
                                   bg-white/65 dark:bg-[#131320]/65 backdrop-blur-2xl
                                   border border-white/50 dark:border-white/10
                                   shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)]
                                   p-1.5 z-50"
                      >
                        {/* invisible cursor bridge so the panel doesn't snap closed */}
                        <div className="absolute -top-3 left-0 right-0 h-3" />

                        {servicesData.map((s) => (
                          <a
                            key={s.slug}
                            href={`/services/${s.slug}`}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/60 dark:hover:bg-white/5 transition-colors"
                          >
                            <svg
                              className="w-4 h-4 text-[#764ba2] dark:text-[#667eea] flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={s.icon} />
                            </svg>
                            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                              {s.title}
                            </span>
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <a
                key={link.name}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`${linkBase} ${active ? linkActive : linkInactive}`}
              >
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Right side: theme toggle + CTA */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <a
            href="https://wa.me/918930005190"
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-bg text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-all shadow-md"
          >
            Get Started
          </a>
        </div>

        {/* Mobile right side */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-gray-800 dark:bg-gray-200 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-gray-800 dark:bg-gray-200 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-gray-800 dark:bg-gray-200 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 px-6 py-4 flex flex-col gap-2 shadow-lg"
        >
          {links.map((link) => {
            const active = isActive(link.href);
            if (link.hasDropdown) {
              return (
                <div key={link.name}>
                  <p className="text-sm font-medium py-2 px-3 text-gray-700 dark:text-gray-300">
                    {link.name}
                  </p>
                  <div className="ml-3 flex flex-col gap-1 mt-1 mb-2">
                    {servicesData.map((s) => (
                      <a
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="text-xs text-gray-600 dark:text-gray-400 hover:text-[#764ba2] py-1 px-3"
                        onClick={() => setMenuOpen(false)}
                      >
                        — {s.title}
                      </a>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <a
                key={link.name}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`block text-sm font-medium py-2 px-3 rounded-lg transition-colors ${
                  active
                    ? "text-[#764ba2] dark:text-[#667eea] underline underline-offset-4 decoration-2 font-semibold"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </a>
            );
          })}
          <a
            href="https://wa.me/918930005190"
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-bg text-white px-5 py-2.5 rounded-full text-sm font-semibold text-center mt-2"
            onClick={() => setMenuOpen(false)}
          >
            Get Started
          </a>
        </motion.div>
      )}
    </nav>
  );
}
