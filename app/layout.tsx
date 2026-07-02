import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: "Xpanix | Premium Web Development, SEO & Digital Growth Agency",
  description: "Scale your business with Xpanix. We provide expert web development, custom UI/UX design, SEO services, and data-driven Meta ads for ambitious brands.",
  keywords: [
    "Web Development Agency",
    "SEO Services",
    "UI/UX Design Company",
    "Digital Marketing Agency",
    "Meta Ads Management",
    "Custom Web Design",
    "Digital Growth",
    "Ecommerce Development",
    "Brand Scaling"
  ],
  icons: {
    icon: [{ url: "/assests/fevicon.webp", type: "image/webp" }],
    shortcut: "/assests/fevicon.webp",
    apple: "/assests/fevicon.webp",
  },
  openGraph: {
    images: [{ url: "/assests/fevicon.webp", width: 800, height: 600, alt: "Xpanix Site Icon" }]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen overflow-x-hidden bg-white text-gray-900 dark:bg-[#0a0a0f] dark:text-gray-100 transition-colors">
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
