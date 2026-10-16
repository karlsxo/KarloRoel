import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CertificationGallery from "../components/CertificationGallery";

export const metadata: Metadata = {
  title: "Certifications | Karlo Roel Montenegro",
  description: "DataCamp course-completion certificates earned by Karlo Roel Montenegro in data science, data engineering, and SQL.",
};

export default function CertificationsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      <div className="aurora-stage" aria-hidden="true" />
      <div className="aurora-ribbon" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />

      <header className="fixed left-1/2 top-4 z-50 w-[92%] max-w-6xl -translate-x-1/2">
        <nav aria-label="Certifications navigation" className="glass-panel scroll-glass flex items-center justify-between gap-4 rounded-full border border-slate-200/80 px-5 py-3 shadow-md">
          <Link href="/" aria-label="Karlo Montenegro home" className="flex items-center gap-2.5 rounded-full text-sm font-bold text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-600 md:text-base">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-fuchsia-400 bg-slate-900 text-xs font-black text-white">KR</span>
            <span className="hidden sm:inline">Karlo Montenegro</span>
          </Link>
          <Link href="/#certifications" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-bold text-slate-700 transition-colors hover:border-cyan-300 hover:bg-cyan-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to portfolio
          </Link>
        </nav>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-32 md:pb-28 md:pt-40">
        <CertificationGallery />
      </main>
    </div>
  );
}
