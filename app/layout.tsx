import type { Metadata } from "next";
import "./globals.css";
import TopNav from "../components/TopNav";
import SiteFooter from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "sellhub | Find and compare wholesale sites",
  description: "A platform to explore and compare domestic and overseas wholesale sites",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-neutral-50 text-neutral-900">
        <TopNav />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}