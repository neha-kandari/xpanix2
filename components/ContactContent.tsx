"use client";
import { useState } from "react";
import AnimateOnScroll from "./AnimateOnScroll";

const services = ["Web Development", "UI/UX Design", "Meta Ads", "SEO", "Product Photography", "Not sure yet"];

const contactChannels = [
  {
    title: "Email us",
    value: "info.xpanix@gmail.com",
    href: "mailto:info.xpanix@gmail.com",
    icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    title: "Call / WhatsApp",
    value: "+91 8930005190",
    value2: "+91 8920944784",
    href: "https://wa.me/918930005190",
    icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
  },
  {
    title: "Visit us",
    value: "Delhi/Haryana",
    href: undefined as string | undefined,
    icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z",
  },
];

const nextSteps = [
  { n: "01", title: "We reply within 24 hours", desc: "A real person reads your message and responds with first thoughts, not an autoresponder." },
  { n: "02", title: "Free discovery call", desc: "A 30-minute call to understand your goals, constraints, and what success looks like." },
  { n: "03", title: "Clear proposal", desc: "Scope, timeline, and price in plain language. No surprises, no padded line items." },
];

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold tracking-wide text-gray-600 dark:text-gray-300">{label}</span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full px-4 py-3 text-sm rounded-xl bg-white dark:bg-[#0f0f18] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-[#764ba2] focus:ring-2 focus:ring-[#764ba2]/20 transition";

export default function ContactContent() {
  const [sent, setSent] = useState(false);
  const [service, setService] = useState(services[0]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = (fd.get("name") || "").toString();
    const email = (fd.get("email") || "").toString();
    const company = (fd.get("company") || "").toString();
    const phone = (fd.get("phone") || "").toString();
    const details = (fd.get("details") || "").toString();
    const text = [
      "Hi Xpanix, I'd like to start a project.",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : null,
      phone ? `Phone: ${phone}` : null,
      `Service: ${service}`,
      `Details: ${details}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(`https://wa.me/918930005190?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <main className="bg-white dark:bg-[#0a0a0f]">
      {/* HERO */}
      <section className="relative pt-32 pb-12 px-4 overflow-hidden">
        <div className="absolute inset-0 dot-grid dot-fade pointer-events-none" />
        <div className="pointer-events-none absolute -top-24 right-0 w-[30rem] h-[30rem] rounded-full bg-gradient-to-bl from-[#764ba2]/20 via-[#667eea]/10 to-transparent blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-6">
          <AnimateOnScroll>
            <span className="inline-block px-4 py-1.5 mb-5 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs font-bold tracking-[0.2em] uppercase gradient-text shadow-sm">
              Contact
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1] mb-4">
              Let&rsquo;s build what&rsquo;s{" "}
              <span className="font-serif-display italic gradient-text font-medium">next.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl">
              Tell us where you want to go. We&rsquo;ll bring the map, the team, and the momentum.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* FORM + INFO */}
      <section className="px-4 pb-24">
        <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-5 gap-10 items-stretch">
          {/* FORM */}
          <AnimateOnScroll className="lg:col-span-3" direction="left">
            <div className="relative h-full rounded-[2rem] bg-gray-50 dark:bg-[#131320] border border-gray-200 dark:border-gray-800 p-7 md:p-10 overflow-hidden">
              <div className="pointer-events-none absolute -top-20 -right-20 w-56 h-56 rounded-full bg-gradient-to-br from-[#667eea]/15 to-[#764ba2]/15 blur-3xl" />

              {sent ? (
                <div className="relative text-center py-20">
                  <div className="w-16 h-16 mx-auto mb-5 rounded-full gradient-bg flex items-center justify-center shadow-lg shadow-[#764ba2]/25">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">Message received!</h2>
                  <p className="text-gray-500 dark:text-gray-400 mb-7 max-w-sm mx-auto">
                    Thanks for reaching out, we&rsquo;ll get back to you within one business day.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="text-sm font-semibold gradient-text hover:opacity-80 transition-opacity"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative flex flex-col gap-5">
                  <div className="mb-1">
                    <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-1">Tell us about your project</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">A few details now saves a few emails later.</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Your name *">
                      <input type="text" name="name" required placeholder="Your name" className={inputCls} />
                    </Field>
                    <Field label="Email address *">
                      <input type="email" name="email" required placeholder="Your email address" className={inputCls} />
                    </Field>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Company / brand">
                      <input type="text" name="company" placeholder="Company name" className={inputCls} />
                    </Field>
                    <Field label="Phone">
                      <input type="tel" name="phone" placeholder="Phone number" className={inputCls} />
                    </Field>
                  </div>

                  {/* Service chips */}
                  <Field label="What do you need? *">
                    <div className="flex flex-wrap gap-2 pt-1">
                      {services.map((s) => (
                        <button
                          type="button"
                          key={s}
                          onClick={() => setService(s)}
                          className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${service === s
                            ? "gradient-bg text-white shadow-[0_4px_14px_rgba(91,43,232,0.3)]"
                            : "bg-white dark:bg-[#0f0f18] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:border-[#764ba2]/40 hover:text-[#764ba2] dark:hover:text-[#667eea]"
                            }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </Field>

                  <Field label="Project details *">
                    <textarea
                      name="details"
                      required
                      rows={5}
                      placeholder="What are you building, what's the goal, and when do you want to launch?"
                      className={`${inputCls} resize-none`}
                    />
                  </Field>

                  <button
                    type="submit"
                    className="mt-2 gradient-bg text-white font-semibold text-base py-4 rounded-xl hover:opacity-95 hover:-translate-y-0.5 active:scale-[0.99] transition-all shadow-lg shadow-[#764ba2]/20 flex items-center justify-center gap-2"
                  >
                    Send message
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                  <p className="text-center text-xs text-gray-400 dark:text-gray-500">
                    No spam, no sales pressure, just a thoughtful reply.
                  </p>
                </form>
              )}
            </div>
          </AnimateOnScroll>

          {/* INFO SIDE */}
          <div className="lg:col-span-2 flex flex-col gap-5 lg:justify-between">
            {contactChannels.map((c, i) => {
              const cardCls =
                "group flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-[#131320] border border-gray-200 dark:border-gray-800 hover:border-[#764ba2]/40 hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] transition-all duration-300";
              const inner = (
                <>
                  <span className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 group-hover:rotate-6 transition-transform">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={c.icon} />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">{c.title}</p>
                    <p className="text-base font-bold text-gray-900 dark:text-white group-hover:gradient-text transition-all">{c.value}</p>
                    {c.value2 && (
                      <p className="text-base font-bold text-gray-900 dark:text-white group-hover:gradient-text transition-all">{c.value2}</p>
                    )}
                  </div>
                </>
              );
              return (
                <AnimateOnScroll key={c.title} delay={i * 0.08} direction="right">
                  {c.href ? (
                    <a href={c.href} className={cardCls}>
                      {inner}
                    </a>
                  ) : (
                    <div className={cardCls}>{inner}</div>
                  )}
                </AnimateOnScroll>
              );
            })}

            {/* Availability card */}
            <AnimateOnScroll delay={0.25} direction="right">
              <div className="relative overflow-hidden p-6 rounded-2xl gradient-bg text-white">
                <div className="pointer-events-none absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
                <div className="relative flex items-center gap-2 mb-3">
                  <span className="relative flex w-2.5 h-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-300" />
                  </span>
                  <span className="text-xs font-bold tracking-[0.2em] uppercase">Currently accepting projects</span>
                </div>
                <p className="relative text-sm text-white/85 leading-relaxed">
                  Only a handful of spots open each month, and they fill fast. Bring us your boldest idea and we&rsquo;ll give it our senior team, our full focus, and a launch that turns heads. The sooner you reach out, the sooner we start building something your competitors will wish they thought of first.
                </p>
              </div>
            </AnimateOnScroll>

            {/* Hours */}
            <AnimateOnScroll delay={0.3} direction="right">
              <div className="p-5 rounded-2xl bg-gray-50 dark:bg-[#131320] border border-gray-200 dark:border-gray-800">
                <p className="font-bold text-gray-900 dark:text-white mb-4 text-sm">Response hours</p>

                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">Mon to Fri</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">Fastest replies</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">9:00 to 19:00</span>
                </div>

                <div className="h-px bg-gray-200 dark:bg-white/10 my-3" />

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl bg-gray-200 dark:bg-white/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">Sat to Sun</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">Limited availability</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">10:00 to 16:00</span>
                </div>

                <p className="mt-4 pt-3 border-t border-gray-200 dark:border-white/10 text-xs text-gray-400 dark:text-gray-500">
                  All times in IST (GMT+5:30)
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* WHAT HAPPENS NEXT */}
      <section className="px-4 pb-24">
        <div className="max-w-5xl mx-auto px-6">
          <AnimateOnScroll>
            <div className="rounded-[2rem] bg-gray-50 dark:bg-[#0d0d15] border border-gray-200 dark:border-gray-800 p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-10">
                What happens <span className="gradient-text">next?</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {nextSteps.map((s, i) => (
                  <AnimateOnScroll key={s.n} delay={i * 0.08}>
                    <div className="group flex items-start gap-4">
                      <span className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center flex-shrink-0 text-white text-xs font-bold group-hover:scale-110 transition-transform">
                        {s.n}
                      </span>
                      <div>
                        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1.5">{s.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </main>
  );
}
