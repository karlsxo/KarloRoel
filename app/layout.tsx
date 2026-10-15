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

// Keep search metadata aligned with the roles and project themes presented on the page.
export const metadata: Metadata = {
  title: "Karlo Roel Montenegro | Frontend, Data & AI Automation",
  description: "Karlo Roel Montenegro: frontend developer and Computer Science student focused on data science, data analysis, data engineering, and AI automation.",
  keywords: ["Karlo Roel Montenegro", "Portfolio", "Frontend Developer", "Frontend Development", "Data Scientist", "Data Science", "Data Analyst", "Data Analysis", "Data Engineer", "Data Engineering", "AI Automation", "React", "Next.js"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 text-slate-900 selection:bg-pink-500/30 selection:text-pink-900`}
      >
        {children}
      </body>
    </html>
  );
}
