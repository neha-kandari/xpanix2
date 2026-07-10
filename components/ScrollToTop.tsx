"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Resets scroll to the top on every route change and disables the browser's
    scroll restoration, so pages always open from the top, not wherever the
    previous page (or a tall sticky section) left the scroll position. */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
