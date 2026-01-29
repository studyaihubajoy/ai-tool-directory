import { GoogleAnalytics } from '@next/third-parties/google';
import { Metadata } from 'next';
import Header from './components/Header'; // Header component import
import Footer from './components/Footer'; // Footer component import

// ১. মেটাডেটা সেকশন (Purano + Missing Advanced SEO elements)
export const metadata: Metadata = {
  // Purano metadata thik rakha hoyeche
  title: 'Study AI Hub | 450+ Best AI Tools Directory 2026',
  description: 'Explore the ultimate directory of 150+ AI tools for students, creators, and developers. Find best AI for writing, image generation, video, and coding.',
  keywords: 'AI tools directory, best ai tools 2026, free ai tools, study ai hub, ai for students, image generator ai, chatbot list, artificial intelligence tools',
  
  // Canonical URL (Bad porechilo)
  alternates: {
    canonical: 'https://ai.shopgb.online',
  },

  // Social Media / OpenGraph (Unnata kora hoyeche)
  openGraph: {
    title: 'Study AI Hub - Discover the Future of AI',
    description: 'Find every AI tool you need in one place. The most updated AI directory.',
    url: 'https://ai.shopgb.online',
    siteName: 'Study AI Hub',
    images: [
      {
        url: 'https://ai.shopgb.online/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Study AI Hub Directory Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  // Twitter (Bad porechilo)
  twitter: {
    card: 'summary_large_image',
    title: 'Study AI Hub | Best AI Tools 2026',
    description: 'Explore 150+ Best AI tools in one directory.',
  },

  // Indexing Control (Bad porechilo)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  // Favicon Connectivity (Bad porechilo)
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },

  // Search Console Verification (Bad porechilo)
  verification: {
    google: 'h-hbJRbdNA3r3d8zWq6wjJ5RFKnwNkkjfcEjXF74Ld0', // Google Search Console code ekhane bosaben
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
        {/* Mobile Browser Color (Bad porechilo) */}
        <meta name="theme-color" content="#020617" />
      </head>
      <body style={{ backgroundColor: '#020617', margin: 0, fontFamily: 'sans-serif' }}>
        
        {/* Header jukto kora holo */}
        <Header /> 
        
        {/* Content Wrapper jukto kora holo */}
        <main style={{ minHeight: '80vh' }}>
          {children}
        </main>
        
        {/* Footer jukto kora holo */}
        <Footer /> 

        {/* Purano Google Analytics thik ache */}
        <GoogleAnalytics gaId="G-FP0PCCJ15Q" />
      </body>
    </html>
  )
}