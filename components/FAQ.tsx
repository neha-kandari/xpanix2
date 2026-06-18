"use client";
import { useState } from "react";
import AnimateOnScroll from "./AnimateOnScroll";

const faqs = [
  {
    q: "How fast will I receive my designs?",
    a: "Most requests are completed within 48 hours. More complex projects may take 3–5 business days. Pro plan members get priority with 24-hour turnarounds.",
  },
  {
    q: "How does a design subscription work?",
    a: "You subscribe to a plan, submit design requests via our portal, and we deliver them one (or two, on Pro) at a time. Unlimited requests, worked through your queue in order.",
  },
  {
    q: "What tools do my design team use?",
    a: "We primarily work in Figma, Adobe Suite, and Webflow. All deliverables include source files so you own everything.",
  },
  {
    q: "Is there a limit to how many requests I can make?",
    a: "Absolutely not. Submit as many requests as you'd like — they get queued and worked through one by one at full quality.",
  },
  {
    q: "What kind of design work can I request?",
    a: "Brand identity, logos, UI/UX, landing pages, web development, social media kits, presentation decks, motion graphics, and more.",
  },
  {
    q: "Can I pause or cancel my subscription?",
    a: "Yes — pause or cancel anytime from your dashboard. No contracts, no cancellation fees. We're confident you'll love it though.",
  },
  {
    q: "Can I get a refund if I don't like it?",
    a: "We offer a 7-day money-back guarantee on your first payment. After that, you can pause or cancel, but refunds aren't available for past billing cycles.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-6 bg-gray-50 dark:bg-[#0a0a0f]">
      <div className="max-w-3xl mx-auto">
        <AnimateOnScroll>
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
            FAQ
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 dark:text-white mb-4">
            Frequently Asked{" "}
            <span className="gradient-text">Questions.</span>
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-14 text-lg">
            Everything you need to know about Xpanix.
          </p>
        </AnimateOnScroll>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <AnimateOnScroll key={i} delay={i * 0.07}>
              <div
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  open === i
                    ? "border-[#667eea]/40 bg-white dark:bg-[#131320] shadow-sm"
                    : "border-gray-200 dark:border-gray-800 bg-white dark:bg-[#131320] hover:border-gray-300 dark:hover:border-gray-700"
                }`}
              >
                <button
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span className={`text-sm font-semibold ${open === i ? "gradient-text" : "text-gray-800 dark:text-gray-200"}`}>
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
                      open === i ? "gradient-bg text-white rotate-45" : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    open === i ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-6 pb-5 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
