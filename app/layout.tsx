import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";
import { aiToolsList } from "./toolsData"; 

export const metadata = {
  title: "Study AI Hub | 500+ Best AI Tools Directory 2026",
  description: "Explore the ultimate directory of AI tools for students and developers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <GoogleAnalytics gaId="G-FP0PCCJ15Q" />
      </body>
    </html>
  );
}