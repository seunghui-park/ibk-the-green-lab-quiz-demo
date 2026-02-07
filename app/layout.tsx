import type { Metadata } from "next";
import "./globals.css";
import FontLoader from "./components/FontLoader";

export const metadata: Metadata = {
  title: "퀴즈 풀고 할인 쿠폰 받기 | 더그린랩",
  description: "3문항만 풀면 쿠폰이 뿅! 더그린랩 퀴즈로 할인 쿠폰 받아가세요! 🌎✨",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <FontLoader />
        {children}
      </body>
    </html>
  );
}
