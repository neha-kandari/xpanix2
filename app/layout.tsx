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
  metadataBase: new URL("https://www.xpanix.com"),
  verification: {
    google: "bm9CY7-9IixTyeDimvyvI-hGaevtzb0y6Ff_ee2i3ts",
  },
  icons: {
    icon: [
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon-48.png",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Xpanix | Premium Web Development, SEO & Digital Growth Agency",
    description: "Scale your business with Xpanix. We provide expert web development, custom UI/UX design, SEO services, and data-driven Meta ads for ambitious brands.",
    url: "https://www.xpanix.com",
    siteName: "Xpanix",
    images: [{ url: "/icon-512.png", width: 512, height: 512 }],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Xpanix | Premium Web Development, SEO & Digital Growth Agency",
    description: "Scale your business with Xpanix.",
    images: ["/icon-512.png"],
  },
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
