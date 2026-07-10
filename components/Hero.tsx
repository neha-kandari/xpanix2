"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] as const },
});

const words = ["Expand", "Scale", "Grow", "Stand Out", "Succeed"];

function TypingEffect() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1000);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 60 : 120);
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <span className="gradient-text font-extrabold">
      {words[index].substring(0, subIndex)}
      <span className="animate-pulse">|</span>
    </span>
  );
}

// Project images for the horizontal carousel
const projects = [
  { src: "/projects/Chinar.webp", label: "Chinar" },
  { src: "/projects/ecomerce ui.webp", label: "Ecommerce UI" },
  { src: "/projects/Finance App UI.webp", label: "Finance App UI" },
  { src: "/projects/NagpalToursTravels.webp", label: "Nagpal Tours & Travels" },
  { src: "/projects/Opal.webp", label: "Opal" },
  { src: "/projects/Perfect.webp", label: "Perfect" },
  // { src: "/projects/PhotographerUi Design.webp", label: "Photographer UI" },
  { src: "/projects/Pmake.webp", label: "Pmake" },
  { src: "/projects/RajasthanAutoDistributor.webp", label: "Rajasthan Auto Distributor" },
  { src: "/projects/RuhaniTrips (1).webp", label: "Ruhani Trips" },
  { src: "/projects/Travel landaing Ui Design.webp", label: "Travel Landing UI" },
  { src: "/projects/Travel Ui.webp", label: "Travel UI" },
  { src: "/projects/Tripsee (3).webp", label: "Tripsee" },
  { src: "/projects/WoodyPolo.webp", label: "WoodyPolo" },
];

function ProjectCard({ p }: { p: (typeof projects)[number] }) {
  return (
    <div className="relative flex-shrink-0 w-72 h-56 rounded-3xl overflow-hidden shadow-lg group">
      <Image
        src={p.src}
        alt={p.label}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="288px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <span className="text-white text-sm font-semibold">{p.label}</span>
      </div>
    </div>
  );
}

export default function Hero() {
  const doubled = [...projects, ...projects];

  return (
    <section id="home" className="relative bg-white dark:bg-[#0a0a0f] pt-32 pb-0 overflow-hidden">
      {/* dot-grid background that fades out from the top, left and right edges */}
      <div className="absolute inset-0 dot-grid dot-grid-sm dot-fade pointer-events-none" />
      {/* soft gradient glow, matching the services detail pages */}
      <div className="pointer-events-none absolute -top-24 right-0 w-[34rem] h-[34rem] rounded-full bg-gradient-to-bl from-[#764ba2]/25 via-[#667eea]/15 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-[28rem] h-[28rem] rounded-full bg-gradient-to-tr from-[#667eea]/20 to-transparent blur-3xl" />
      {/* soft fade just above the carousel */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-white dark:to-[#0a0a0f] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        {/* Headline */}
        <motion.h1
          {...fadeUp(0.1)}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.1] mb-4 pb-1"
        >
          Empowering Brands to
          <br />
          <TypingEffect />
        </motion.h1>

        {/* Sub */}
        <motion.p
          {...fadeUp(0.2)}
          className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-6"
        >
          Where bold ideas meet flawless execution —
          <br />
          we build digital experiences that drive growth.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.3)}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10"
        >
          <a
            href="/contact"
            className="gradient-bg text-white px-9 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Book a Call
          </a>
          <a
            href="#services"
            className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 px-9 py-4 rounded-full font-semibold text-lg hover:border-[#667eea] hover:text-[#667eea] transition-all shadow-sm"
          >
            Our Services
          </a>
        </motion.div>
      </div>

      {/* Full-width horizontal carousel */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative w-full"
      >
        <div className="flex gap-5 w-max animate-marquee px-2">
          {doubled.map((p, i) => (
            <ProjectCard key={i} p={p} />
          ))}
        </div>

        {/* edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </motion.div>

      {/* spacing below carousel */}
      <div className="h-8 bg-white dark:bg-[#0a0a0f]" />
    </section>
  );
}
