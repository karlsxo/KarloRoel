import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Karlo Roel Montenegro | AI, IoT & UI/UX Developer",
  description: "Portfolio of Karlo Roel Montenegro — Computer Science Student crafting next-generation technologies in AI, IoT cold-chain logistics, healthcare supply chains, and UI/UX design.",
  keywords: ["Karlo Roel Montenegro", "Portfolio", "UI/UX Developer", "IoT Specialist", "AI Developer", "DalAni", "Artery", "Next.js"],
  authors: [{ name: "Karlo Roel Montenegro" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 text-slate-900 selection:bg-sky-200/80 selection:text-slate-900`}
      >
        {children}
      </body>
    </html>
  );
}
