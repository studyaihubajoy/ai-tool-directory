import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google'; // অ্যানালিটিক্স ইমপোর্ট
import "./globals.css";
import { aiToolsList } from "./toolsData"; // আপনার টুলের ডাটা

const inter = Inter({ subsets: ["latin"] });

// ১৫১টি টুলের নাম এবং ক্যাটাগরি থেকে অটোমেটিক কিওয়ার্ড তৈরি
const toolKeywords = aiToolsList.map(t => t.name).join(", ");
const categoryKeywords = [...new Set(aiToolsList.map(t => t.category))].join(", ");

export const metadata: Metadata = {
  title: "Study AI Hub | 150+ Best AI Tools Directory 2026",
  description: `Explore the ultimate directory of 150+ AI tools including ${toolKeywords.slice(0, 100)}... for students and developers. Free AI directory 2026.`,
  keywords: [
    "AI tools directory", 
    "Best AI Tools 2026", 
    "Free AI Software", 
    "Study AI Hub",
    categoryKeywords, // ডাইনামিক ক্যাটাগরি
    toolKeywords,     // ডাইনামিক টুলের নাম
  ],
  openGraph: {
    title: "Study AI Hub - Discover 150+ Top AI Tools",
    description: "Find the best AI tools for writing, coding, and design in one place.",
    url: "https://ai.shopgb.online",
    siteName: "Study AI Hub",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        {/* আপনার অ্যানালিটিক্স আইডি ঠিকঠাক বসানো হলো */}
        <GoogleAnalytics gaId="G-FP0PCCJ15Q" />
      </body>
    </html>
  );
}