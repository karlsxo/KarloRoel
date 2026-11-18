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
    <div className="relative min-h-screen">
      <div className="paper-grain" aria-hidden="true" />

      <div className="relative z-10">
        <header className="mx-auto max-w-[1240px] px-4 pt-5 sm:px-6 sm:pt-8 lg:px-10">
          <nav aria-label="Certifications navigation" className="flex items-center justify-between gap-3 border-b-4 border-double border-ink pb-3">
            <Link
              href="/"
              aria-label="The Daily Karlo, back to the portfolio home page"
              className="whitespace-nowrap py-1 font-masthead text-[clamp(1.7rem,5vw,3.25rem)] leading-none text-ink transition-colors hover:text-press"
            >
              The Daily Karlo
            </Link>
            <Link href="/#certifications" className="ink-btn-outline btn-sm shrink-0">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>
                Back<span className="hidden sm:inline"> to portfolio</span>
              </span>
            </Link>
          </nav>
        </header>

        <main className="mx-auto max-w-[1240px] px-4 pb-20 pt-10 sm:px-6 md:pb-28 md:pt-14 lg:px-10">
          <CertificationGallery />
        </main>

        <footer className="bg-ink text-paper-light">
          <p className="mx-auto max-w-[1240px] px-4 py-5 text-center font-headline text-[0.68rem] uppercase tracking-[0.2em] sm:px-6 lg:px-10">
            © Karlo Roel Montenegro. Frontend, Data &amp; AI Automation.
          </p>
        </footer>
      </div>
    </div>
  );
}
