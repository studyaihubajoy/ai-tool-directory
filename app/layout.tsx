import { GoogleAnalytics } from '@next/third-parties/google';
export const metadata = {
  title: 'Study AI Hub | 150+ Best AI Tools Directory 2026',
  description: 'Explore the ultimate directory of 150+ AI tools for students, creators, and developers. Find best AI for writing, image generation, video, and coding.',
  keywords: 'AI tools directory, best ai tools 2026, free ai tools, study ai hub, ai for students, image generator ai, chatbot list',
  openGraph: {
    title: 'Study AI Hub - Discover the Future of AI',
    description: 'Find every AI tool you need in one place.',
    url: 'https://ai.shopgb.online',
    siteName: 'Study AI Hub',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}
      <GoogleAnalytics gaId="G-FP0PCCJ15Q" />
      </body>
    </html>
  )
}