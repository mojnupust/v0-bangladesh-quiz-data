import "katex/dist/katex.min.css";
import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import type React from "react";
import "./globals.css";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["bengali"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "বাংলাদেশী MCQ প্রশ্নপত্র",
  description: "Professional Bangladeshi-style MCQ question paper printer",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body className={notoSerifBengali.className}>{children}</body>
    </html>
  );
}
