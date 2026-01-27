import { GoogleAnalytics } from '@next/third-parties/google';
import { Metadata } from 'next';

// ১. মেটাডেটা আরও উন্নত করা হয়েছে (Optimized Metadata)
export const metadata: Metadata = {
  title: 'Study AI Hub | 450+ Best AI Tools Directory 2026',
  description: 'Explore the ultimate directory of 150+ AI tools for students, creators, and developers. Find best AI for writing, image generation, video, and coding.',
  keywords: 'AI tools directory, best ai tools 2026, free ai tools, study ai hub, ai for students, image generator ai, chatbot list, artificial intelligence tools',
  
  // Canonical URL (যাতে ডুপ্লিকেট কন্টেন্ট এরর না আসে)
  alternates: {
    canonical: 'https://ai.shopgb.online',
  },

  // OpenGraph (Social Media Share করার জন্য)
  openGraph: {
    title: 'Study AI Hub - Discover the Future of AI',
    description: 'Find every AI tool you need in one place. The most updated AI directory.',
    url: 'https://ai.shopgb.online',
    siteName: 'Study AI Hub',
    images: [
      {
        url: 'https://ai.shopgb.online/og-image.png', // আপনার একটি ইমেজ থাকলে তার পাথ দিন
        width: 1200,
        height: 630,
        alt: 'Study AI Hub Directory Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Study AI Hub | Best AI Tools 2026',
    description: 'Explore 150+ Best AI tools in one directory.',
  },

  // Robots (সার্চ ইঞ্জিনকে ইনডেক্স করতে বলা)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  // Favicon এবং Icons
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },

  // Google Site Verification (গুগল সার্চ কনসোলের জন্য)
  verification: {
    google: 'your-google-verification-code', // এখানে আপনার ভেরিফিকেশন কোড বসান
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* থিম কালার (মোবাইলে ব্রাউজার বার কালার পরিবর্তন করে) */}
        <meta name="theme-color" content="#020617" />
      </head>
      <body style={{ margin: 0 }}>
        {children}
        <GoogleAnalytics gaId="G-FP0PCCJ15Q" /> {/* */}
      </body>
    </html>
  )
}