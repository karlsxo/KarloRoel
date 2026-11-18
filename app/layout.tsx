import type { Metadata } from "next";
import { Oswald, Source_Serif_4, UnifrakturMaguntia } from "next/font/google";
import "./globals.css";

// Masthead: blackletter, like a traditional newspaper nameplate.
const unifraktur = UnifrakturMaguntia({
  variable: "--font-unifraktur",
  subsets: ["latin"],
  weight: "400",
});

// Headlines, kickers, and labels: a condensed sans for the front-page look.
const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

// Body copy: a readable text serif.
const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
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
    // suppressHydrationWarning: the inline script adds the "js" class before React hydrates.
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Marks that JavaScript is running so scroll reveals can start hidden; without it, content stays visible. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className={`${unifraktur.variable} ${oswald.variable} ${sourceSerif.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
