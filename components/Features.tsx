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
    icon: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z",
    title: "All-in-One Solutions",
    description:
      "From websites and Shopify stores to SEO, Meta Ads, Google Ads, and social media management, we handle everything your business needs to grow online.",
  },
  {
    icon: "M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5",
    title: "Custom Strategies",
    description:
      "Every business is different. We create tailored marketing and web solutions based on your industry, goals, and target audience.",
  },
  {
    icon: "M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941",
    title: "Conversion First",
    description:
      "We don't just build beautiful websites. We create experiences designed to generate leads, increase sales, and improve customer engagement.",
  },
  {
    icon: "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
    title: "Full Transparency",
    description:
      "Stay informed with regular updates, performance reports, and a dedicated point of contact throughout your project.",
  },
  {
    icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
    title: "Fast Delivery",
    description:
      "Our streamlined process ensures timely delivery without compromising on quality, performance, or design.",
  },
  {
    icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
    title: "Growth Partner",
    description:
      "We're more than an agency. We work alongside your business, continuously optimizing and scaling your digital presence.",
  },
];

export default function Features() {
  const isMobile = useIsMobile();
  return (
    <section id="benefits" className="py-24 px-6 bg-gradient-to-b from-white to-gray-50 dark:from-[#0a0a0f] dark:to-[#0a0a0f]">
      <div className="max-w-5xl mx-auto">
        <AnimateOnScroll>
          {/* <div className="flex justify-center mb-5">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-m font-bold gradient-text shadow-sm">
              Why choose Xpanix
            </span>
          </div> */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 dark:text-white max-w-3xl mx-auto leading-tight mb-5">
           Why{" "}
            <span className="gradient-text">Choose</span>Us
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-16 text-lg">
            See how our digital services elevate your brand online, boosting visibility,
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
