import type { Metadata } from "next";
import "./globals.css";
import TopNav from "../components/TopNav";
import SiteFooter from "../components/SiteFooter";
import Providers from "./providers";

export const metadata = {
  title: "sellhub | 도매 사이트 비교 플랫폼",
  description:
    "국내외 도매 사이트, 판매 채널, 셀러 도구를 한곳에서 비교하고 탐색하세요.",
  keywords: [
    "도매 사이트",
    "도매 쇼핑몰",
    "사입",
    "위탁 판매",
    "판매 채널",
    "쿠팡 판매",
    "스마트스토어",
    "셀러 도구",
  ],
  openGraph: {
    title: "sellhub | 도매 사이트 비교 플랫폼",
    description:
      "도매 사이트, 판매 채널, 셀러 도구를 한눈에 비교하세요.",
    url: "https://sellhub.vercel.app",
    siteName: "sellhub",
    images: [
      {
        url: "https://placehold.co/1200x800",
        width: 1200,
        height: 800,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-neutral-50 text-neutral-900">
        <Providers>
          <TopNav />
          {children}
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}