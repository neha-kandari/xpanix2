"use client";
import { useEffect, useState } from "react";
import AnimateOnScroll from "./AnimateOnScroll";
import TiltCard from "./TiltCard";

function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

const benefits = [
  {
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    title: "Enhanced Brand Visibility",
    description:
      "Cut through the noise with bespoke websites, apps, and listings designed to make your brand impossible to miss.",
  },
  {
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    title: "Better User Experience",
    description:
      "We craft intuitive, engaging interfaces that keep visitors hooked — from the first click all the way to conversion.",
  },
  {
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Round-the-Clock Reachability",
    description:
      "Your brand never goes offline. Optimized builds keep you accessible and high-performing, around the clock.",
  },
  {
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Cost-Effective Solutions",
    description:
      "Smart tooling and lean workflows let us ship premium results without stretching your budget.",
  },
  {
    icon: "M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941",
    title: "Performance-Focused Strategy",
    description:
      "Every decision is backed by data — so you grow smarter, convert more, and scale faster.",
  },
  {
    icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
    title: "Scalable Digital Growth",
    description:
      "Whether you're just starting out or scaling fast, our solutions grow with you — seamlessly and sustainably.",
  },
];

export default function Features() {
  const isMobile = useIsMobile();
  return (
    <section id="benefits" className="py-24 px-6 bg-gradient-to-b from-white to-gray-50 dark:from-[#0a0a0f] dark:to-[#0a0a0f]">
      <div className="max-w-5xl mx-auto">
        <AnimateOnScroll>
          <div className="flex justify-center mb-5">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-m font-bold gradient-text shadow-sm">
              Why choose Xpanix
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 dark:text-white max-w-3xl mx-auto leading-tight mb-5">
            The Key Benefits of Building Your{" "}
            <span className="gradient-text">Digital Presence</span> with Us
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-16 text-lg">
            See how our digital services elevate your brand online — boosting visibility,
            deepening engagement, and driving smart, lasting growth.
          </p>
        </AnimateOnScroll>

        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 -mx-6 px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0 sm:pb-0 sm:overflow-visible sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
          {benefits.map((b, i) => (
            <AnimateOnScroll key={b.title} delay={i * 0.08} disabled={isMobile} className="shrink-0 snap-start w-[80%] sm:w-auto">
              <TiltCard className="h-full">
                <div className="group relative h-full p-7 rounded-2xl bg-white dark:bg-[#131320] border border-gray-100 dark:border-gray-800 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,126,202,0.15)] transition-shadow duration-300 overflow-hidden">
                  {/* hover gradient ring */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ring-1 ring-inset ring-[#764ba2]/30" />
                  {/* corner glow */}
                  <div className="pointer-events-none absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br from-[#667eea]/20 to-[#764ba2]/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* icon */}
                  <div
                    className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mb-6 shadow-lg shadow-[#764ba2]/20 group-hover:scale-110 transition-transform duration-300"
                    style={{ transform: "translateZ(40px)" }}
                  >
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={b.icon} />
                    </svg>
                  </div>

                  <h3
                    className="text-xl font-bold text-gray-900 dark:text-white mb-3"
                    style={{ transform: "translateZ(28px)" }}
                  >
                    {b.title}
                  </h3>
                  <p
                    className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed"
                    style={{ transform: "translateZ(18px)" }}
                  >
                    {b.description}
                  </p>
                </div>
              </TiltCard>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
