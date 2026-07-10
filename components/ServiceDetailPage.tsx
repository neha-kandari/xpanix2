"use client";
import AnimateOnScroll from "./AnimateOnScroll";
import ContactFormCard from "./ContactFormCard";
import type { Service } from "./servicesData";

export default function ServiceDetailPage({ service }: { service: Service }) {
  return (
    <>
      {/* HERO with floating glass contact card on the right */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-white dark:bg-[#0a0a0f]">
        <div className="absolute inset-0 dot-grid dot-fade pointer-events-none" />
        {/* ambient gradient blobs (give the glass card something to refract) */}
        <div className="pointer-events-none absolute -top-20 -left-20 w-[28rem] h-[28rem] rounded-full bg-gradient-to-br from-[#667eea]/20 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 right-1/3 w-[26rem] h-[26rem] rounded-full bg-gradient-to-br from-[#764ba2]/20 to-transparent blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-6 grid lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2">

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gray-900 dark:text-white leading-[0.95] mb-6">
              {service.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed">
              {service.long}
            </p>
          </div>

          {/* Floating glass contact card */}
          <div className="lg:col-span-1 lg:sticky lg:top-28">
            <ContactFormCard service={service.title} />
          </div>
        </div>
      </section>

      {/* HERO IMAGE BAND */}
      <section className="px-4 pb-24 bg-white dark:bg-[#0a0a0f]">
        <div className="max-w-5xl mx-auto px-6">
          <AnimateOnScroll>
            <div className="relative aspect-[21/9] rounded-3xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={service.img}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between text-white">
                <span className="text-xs font-semibold tracking-[0.3em] uppercase opacity-80">
                  In action
                </span>
                <span className="text-xs font-semibold tracking-[0.3em] uppercase opacity-80">
                  / {service.n}
                </span>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 px-4 bg-gray-50 dark:bg-[#0a0a0f]">
        <div className="max-w-5xl mx-auto px-6">
          <AnimateOnScroll>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-500 dark:text-gray-400 mb-3">
              What you get
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight max-w-2xl mb-14">
              Everything packed into{" "}
              <span className="gradient-text">{service.title}</span>.
            </h2>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {service.features.map((f, i) => (
              <AnimateOnScroll key={f} delay={i * 0.05}>
                <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#131320] hover:border-[#764ba2]/40 transition-colors">
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-base font-semibold text-gray-900 dark:text-white mt-0.5">{f}</span>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 px-4 bg-white dark:bg-[#0a0a0f]">
        <div className="max-w-5xl mx-auto px-6">
          <AnimateOnScroll>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-500 dark:text-gray-400 mb-3">
              How we deliver
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight max-w-2xl mb-14">
              A clear process,{" "}
              <span className="gradient-text">no surprises.</span>
            </h2>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((p, i) => (
              <AnimateOnScroll key={p.title} delay={i * 0.1}>
                <div className="h-full p-7 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#131320] hover:border-[#764ba2]/40 transition-colors">
                  <div className="text-sm font-bold tracking-widest gradient-text mb-4">{p.step}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{p.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-white dark:bg-[#0a0a0f]">
        <div className="max-w-5xl mx-auto px-6">
          <AnimateOnScroll>
            <div className="relative overflow-hidden rounded-[2rem] gradient-bg p-12 md:p-16 text-center text-white">
              <p className="text-sm font-semibold uppercase tracking-widest opacity-75 mb-3">
                Ready to start?
              </p>
              <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
                Let&rsquo;s make {service.title.toLowerCase()} a growth lever.
              </h2>
              <p className="text-base md:text-lg opacity-90 max-w-xl mx-auto mb-8">
                Book a free call. We&rsquo;ll come back with a plan, a price, and a clear path forward.
              </p>
              <a
                href="/#contact"
                className="inline-block bg-white text-gray-900 px-8 py-3.5 rounded-full font-semibold text-base hover:bg-gray-100 transition-all shadow-lg"
              >
                Book a Call →
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
