"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CalendarDays, Clock3, Maximize2, X } from "lucide-react";

const certificates = [
  {
    title: "Understanding Data Science",
    image: "/certificates/understanding-data-science.webp",
    date: "October 8, 2026",
    dateTime: "2026-10-08",
    hours: 2,
    credential: "50,169,432",
  },
  {
    title: "Understanding Data Engineering",
    image: "/certificates/understanding-data-engineering.webp",
    date: "September 29, 2026",
    dateTime: "2026-09-29",
    hours: 2,
    credential: "50,000,214",
  },
  {
    title: "Intermediate SQL",
    image: "/certificates/intermediate-sql.webp",
    date: "September 19, 2026",
    dateTime: "2026-09-19",
    hours: 4,
    credential: "49,806,598",
  },
  {
    title: "Introduction to SQL",
    image: "/certificates/introduction-to-sql.webp",
    date: "September 8, 2026",
    dateTime: "2026-09-08",
    hours: 2,
    credential: "49,760,947",
  },
];

type Certificate = (typeof certificates)[number];

function CertificateDialog({ certificate, onClose }: { certificate: Certificate; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    // The native modal keeps focus inside, supports Escape, and restores focus
    // to the opener when it closes.
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="certificate-dialog-title"
      aria-describedby="certificate-dialog-description"
      onClose={() => {
        // Ignore a queued close event if React's effect check reopened the dialog.
        if (!dialogRef.current?.open) onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current?.close();
      }}
      className="fixed inset-0 m-auto max-h-[92dvh] w-[94vw] max-w-6xl overflow-y-auto border border-ink bg-paper-light p-0 text-ink shadow-[10px_10px_0_rgba(23,21,19,0.8)] backdrop:bg-ink/70 backdrop:backdrop-blur-[2px]"
    >
      <div className="p-4 sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-4 border-b-4 border-double border-ink pb-3">
          <div>
            <p className="kicker">DataCamp</p>
            <h2 id="certificate-dialog-title" className="mt-1 font-headline text-2xl font-bold uppercase leading-none sm:text-3xl">
              {certificate.title}
            </h2>
            <p id="certificate-dialog-description" className="mt-2 font-serif text-sm italic text-ink-soft">
              DataCamp course completion &middot; {certificate.date} &middot; {certificate.hours} hours
            </p>
          </div>
          <button
            type="button"
            autoFocus
            onClick={() => dialogRef.current?.close()}
            aria-label="Close certificate"
            className="shrink-0 border-2 border-ink p-2 text-ink transition-colors hover:bg-ink hover:text-paper-light"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="overflow-x-auto border border-ink bg-[#fffbf2]">
          <Image
            src={certificate.image}
            alt={`DataCamp Statement of Accomplishment awarded to Karlo Roel Montenegro for ${certificate.title}, completed ${certificate.date}. Credential ${certificate.credential}.`}
            width={1800}
            height={1039}
            unoptimized
            className="h-auto max-h-[65dvh] w-full object-contain"
          />
        </div>
        <a
          href={certificate.image}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block font-headline text-xs font-semibold uppercase tracking-[0.16em] text-press underline underline-offset-4 hover:text-press-dark"
        >
          Open full-size certificate image (new tab)
        </a>
      </div>
    </dialog>
  );
}

export default function CertificationGallery() {
  const [selected, setSelected] = useState<Certificate | null>(null);

  return (
    <>
      <div className="mb-8">
        <div className="rule-thick-thin" aria-hidden="true" />
        <p className="kicker mt-5">Continuous Learning</p>
        <h1 className="mt-1 font-headline text-[2.8rem] font-bold uppercase leading-none tracking-tight text-ink md:text-7xl">Certifications</h1>
        <p className="mt-3 max-w-2xl font-serif text-base italic leading-relaxed text-ink-soft md:text-lg">
          DataCamp course-completion certificates in data science, data engineering, and SQL.
        </p>
      </div>

      <div className="article-grid border-b border-ink/55">
        {certificates.map((certificate) => (
          <article key={certificate.credential} className="press-card">
            <button
              type="button"
              onClick={() => setSelected(certificate)}
              aria-label={`View ${certificate.title} certificate`}
              aria-haspopup="dialog"
              className="group block w-full border border-ink bg-[#fffbf2] text-left"
            >
              <Image
                src={certificate.image}
                alt={`DataCamp certificate for ${certificate.title}, awarded to Karlo Roel Montenegro.`}
                width={1800}
                height={1039}
                unoptimized
                className="newsprint-img h-auto w-full"
              />
              <span className="flex items-center justify-between border-t border-ink bg-paper-light px-4 py-2.5 font-headline text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ink transition-colors group-hover:bg-ink group-hover:text-paper-light">
                View certificate <Maximize2 className="h-4 w-4" aria-hidden="true" />
              </span>
            </button>
            <p className="kicker mt-4">DataCamp</p>
            <h2 className="mt-1 font-headline text-2xl font-bold uppercase leading-tight text-ink sm:text-3xl">{certificate.title}</h2>
            <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 font-headline text-[0.72rem] uppercase tracking-[0.12em] text-ink-soft">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                <time dateTime={certificate.dateTime}>{certificate.date}</time>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-4 w-4" aria-hidden="true" /> {certificate.hours} hours
              </span>
            </div>
            <p className="mt-2 font-serif text-sm italic text-ink-muted">Statement of Accomplishment &middot; #{certificate.credential}</p>
          </article>
        ))}
      </div>

      {selected && <CertificateDialog certificate={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
