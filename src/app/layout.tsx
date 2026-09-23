import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SceneLoader from "@/components/fx/SceneLoader";
import HideOnAdmin from "@/components/fx/HideOnAdmin";
import WaterFilter from "@/components/fx/WaterFilter";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Bliss & K Developers | Innovative Technology, Reliable Solutions",
    template: "%s | Bliss & K Developers",
  },
  description:
    "Premium software development agency in Kenya. Web development, web apps, POS systems, e-commerce solutions with M-Pesa built in. Based in Kenya, serving clients worldwide.",
  keywords: [
    "web development Kenya",
    "software agency Kenya",
    "Next.js developer Nairobi",
    "M-Pesa integration",
    "e-commerce Kenya",
    "POS system Kenya",
    "Bliss K Developers",
    "Bethuel Maluti",
  ],
  authors: [{ name: "Bethuel Maluti", url: "https://portfolio.blissmal.store" }],
  openGraph: {
    title: "Bliss & K Developers | Innovative Technology, Reliable Solutions",
    description: "Premium software development agency in Kenya. Web apps, e-commerce, POS systems, and more.",
    type: "website",
    locale: "en_KE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bliss & K Developers",
    description: "Innovative Technology, Reliable Solutions.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0919",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable}`}>
      <body className="font-sans antialiased">
        <WaterFilter />
        <HideOnAdmin><SceneLoader /></HideOnAdmin>
        <HideOnAdmin><Navbar /></HideOnAdmin>
        <main className="relative z-10 min-h-screen">
          {children}
        </main>
        <HideOnAdmin><Footer /></HideOnAdmin>
      </body>
    </html>
  );
}
