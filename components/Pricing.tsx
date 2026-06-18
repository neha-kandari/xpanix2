"use client";
import { useState } from "react";
import AnimateOnScroll from "./AnimateOnScroll";

const plans = [
  {
    name: "Standard",
    price: { monthly: 1775, yearly: 1420 },
    description: "Perfect for startups and growing businesses.",
    features: [
      "One request at a time",
      "Unlimited revisions",
      "48-hour turnaround",
      "Brand identity design",
      "UI/UX design",
      "Dedicated designer",
      "Figma source files",
      "Pause anytime",
    ],
    cta: "Get Started",
    popular: false,
    gradient: "from-gray-50 to-white",
  },
  {
    name: "Pro",
    price: { monthly: 2995, yearly: 2396 },
    description: "For teams who need more volume and speed.",
    features: [
      "Two requests at a time",
      "Unlimited revisions",
      "24-hour turnaround",
      "Everything in Standard",
      "Web development",
      "Motion & animation",
      "Priority support",
      "Dedicated team",
      "Pause or cancel anytime",
    ],
    cta: "Get Pro Access",
    popular: true,
    gradient: "from-[#667eea] to-[#764ba2]",
  },
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll>
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-gray-400 mb-3">
            Pricing
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-4">
            Transparent pricing,{" "}
            <span className="gradient-text">no hidden fees.</span>
          </h2>
          <p className="text-center text-gray-500 max-w-xl mx-auto mb-8 text-lg">
            Pick a plan that fits your needs. Pause or cancel anytime — no questions asked.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-3 mb-14">
            <span className={`text-sm font-medium ${!isYearly ? "text-gray-900" : "text-gray-400"}`}>Monthly</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${isYearly ? "gradient-bg" : "bg-gray-200"}`}
              aria-label="Toggle billing period"
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${isYearly ? "translate-x-7" : "translate-x-1"}`}
              />
            </button>
            <span className={`text-sm font-medium ${isYearly ? "text-gray-900" : "text-gray-400"}`}>
              Yearly{" "}
              <span className="text-xs text-green-600 font-bold ml-1">Save 20%</span>
            </span>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <AnimateOnScroll key={plan.name} delay={i * 0.15}>
              <div
                className={`relative rounded-3xl overflow-hidden h-full ${
                  plan.popular
                    ? "gradient-bg p-px shadow-2xl"
                    : "border border-gray-200 shadow-sm"
                }`}
              >
                <div
                  className={`h-full rounded-3xl p-8 flex flex-col ${
                    plan.popular ? "bg-gray-900" : "bg-white"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-4 right-4">
                      <span className="gradient-bg text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className={`text-lg font-bold mb-1 ${plan.popular ? "text-white" : "text-gray-900"}`}>
                      {plan.name}
                    </h3>
                    <p className={`text-sm ${plan.popular ? "text-gray-400" : "text-gray-500"}`}>
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-end gap-1">
                      <span className={`text-5xl font-extrabold ${plan.popular ? "text-white" : "text-gray-900"}`}>
                        ${isYearly ? plan.price.yearly.toLocaleString() : plan.price.monthly.toLocaleString()}
                      </span>
                      <span className={`text-sm mb-2 ${plan.popular ? "text-gray-400" : "text-gray-500"}`}>/mo</span>
                    </div>
                    {isYearly && (
                      <p className="text-green-400 text-xs font-semibold mt-1">
                        Billed annually — save ${((plan.price.monthly - plan.price.yearly) * 12).toLocaleString()}/yr
                      </p>
                    )}
                  </div>

                  <ul className="flex flex-col gap-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <div className={`mt-0.5 w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center ${plan.popular ? "gradient-bg" : "bg-[#667eea]/10"}`}>
                          <svg className={`w-2.5 h-2.5 ${plan.popular ? "text-white" : "text-[#667eea]"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className={`text-sm ${plan.popular ? "text-gray-300" : "text-gray-600"}`}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#"
                    className={`block text-center py-3.5 rounded-full font-semibold text-sm transition-all duration-200 ${
                      plan.popular
                        ? "gradient-bg text-white hover:opacity-90 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                        : "border-2 border-gray-200 text-gray-700 hover:border-[#667eea] hover:text-[#667eea]"
                    }`}
                  >
                    {plan.cta} →
                  </a>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll delay={0.3}>
          <p className="text-center text-sm text-gray-400 mt-8">
            Not sure yet?{" "}
            <a href="#" className="text-[#667eea] font-semibold hover:underline">
              Book a free 15-min call
            </a>{" "}
            to see if Lines is right for you.
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
