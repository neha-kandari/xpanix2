"use client";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

const serviceLinks = [
  { label: "Web Development", href: "/services/web-development" },
  { label: "SEO", href: "/services/seo" },
  { label: "Meta & Google Ads", href: "/services/meta-ads" },
  { label: "Product Shoot", href: "/services/product-photography" },
];

function Underline() {
  return <span className="block w-10 h-0.5 mt-2 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#667eea]" />;
}

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden text-gray-300 scroll-mt-20"
      style={{ background: "linear-gradient(120deg,#0c0a1d 0%,#0a0a14 55%,#080810 100%)" }}
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-32 -left-24 w-[28rem] h-[28rem] rounded-full bg-[#4f46e5]/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <a href="/" aria-label="Xpanix home" className="inline-block mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assests/LogoDark.webp" alt="Xpanix" className="h-9 w-auto" />
            </a>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Empowering businesses through innovative digital solutions and cutting-edge technology services.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-200 hover:bg-gradient-to-br hover:from-[#3b82f6] hover:to-[#667eea] hover:text-white transition-all"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.9h-2.34V22c4.78-.79 8.43-4.94 8.43-9.94Z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-200 hover:bg-gradient-to-br hover:from-[#3b82f6] hover:to-[#667eea] hover:text-white transition-all"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.81 3.81 0 0 1-1.38-.9 3.81 3.81 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.8c-3.15 0-3.5.01-4.74.07-.9.04-1.39.19-1.71.32-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.13.32-.28.81-.32 1.71-.06 1.24-.07 1.59-.07 4.74s.01 3.5.07 4.74c.04.9.19 1.39.32 1.71.17.43.37.74.69 1.06.32.32.63.52 1.06.69.32.13.81.28 1.71.32 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c.9-.04 1.39-.19 1.71-.32.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.13-.32.28-.81.32-1.71.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.04-.9-.19-1.39-.32-1.71a2.85 2.85 0 0 0-.69-1.06 2.85 2.85 0 0 0-1.06-.69c-.32-.13-.81-.28-1.71-.32-1.24-.06-1.59-.07-4.74-.07Zm0 3.06a4.98 4.98 0 1 1 0 9.96 4.98 4.98 0 0 1 0-9.96Zm0 1.8a3.18 3.18 0 1 0 0 6.36 3.18 3.18 0 0 0 0-6.36Zm5.18-.39a1.16 1.16 0 1 1-2.32 0 1.16 1.16 0 0 1 2.32 0Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-base font-semibold text-white">Quick Links</h4>
            <Underline />
            <ul className="flex flex-col gap-3 mt-5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-gray-400 text-sm hover:text-white transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div className="lg:col-span-3">
            <h4 className="text-base font-semibold text-white">Our Services</h4>
            <Underline />
            <ul className="flex flex-col gap-3 mt-5">
              {serviceLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-gray-400 text-sm hover:text-white transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h4 className="text-base font-semibold text-white">Contact Info</h4>
            <Underline />
            <ul className="flex flex-col gap-4 mt-5">
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#3b82f6]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
                </svg>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=2%2C%20Eadgah%20Road%20Model%20Town%20Panipat%20Haryana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 text-sm leading-relaxed hover:text-white transition-colors"
                >
                  2, Eadgah Road Model Town Panipat Haryana
                </a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 flex-shrink-0 text-[#3b82f6]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z" />
                </svg>
                <a href="mailto:info.xpanix@gmail.com" className="text-gray-400 text-sm hover:text-white transition-colors break-all">
                  info.xpanix@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 flex-shrink-0 text-[#3b82f6]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79a15.53 15.53 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.24 1.02l-2.2 2.2Z" />
                </svg>
                <a href="tel:+918930005190" className="text-gray-400 text-sm hover:text-white transition-colors">
                  +91 8930005190
                </a>
              </li>
              <li className="flex items-center gap-3">
                {/* <svg className="w-4 h-4 flex-shrink-0 text-[#3b82f6]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79a15.53 15.53 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.24 1.02l-2.2 2.2Z" />
                </svg> */}
                {/* <a href="tel:+919215015157" className="text-gray-400 text-sm hover:text-white transition-colors">
                  +91 9215015157
                </a> */}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm">© 2024 Xpanix. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="/privacy-policy" className="text-gray-400 text-sm hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="text-gray-400 text-sm hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
