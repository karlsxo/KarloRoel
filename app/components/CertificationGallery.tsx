"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Award, CalendarDays, Clock3, Maximize2, X } from "lucide-react";

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
    // to the opener. Its top layer also avoids the page's scroll transforms.
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
      className="fixed inset-0 m-auto max-h-[92dvh] w-[94vw] max-w-6xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/70 backdrop:backdrop-blur-sm"
    >
      <div className="p-4 sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h3 id="certificate-dialog-title" className="text-lg font-bold sm:text-xl">{certificate.title}</h3>
            <p id="certificate-dialog-description" className="mt-1 text-sm text-slate-600">
              DataCamp course completion &middot; {certificate.date} &middot; {certificate.hours} hours
            </p>
          </div>
          <button
            type="button"
            autoFocus
            onClick={() => dialogRef.current?.close()}
            aria-label="Close certificate"
            className="shrink-0 rounded-full border border-slate-200 bg-slate-100 p-2.5 text-slate-700 transition-colors hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-[#fffbf2]">
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
          className="mt-3 inline-block rounded text-xs font-semibold text-cyan-700 underline underline-offset-4 hover:text-cyan-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
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
      <div className="mb-10">
        <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-600">
          <Award className="h-4 w-4" aria-hidden="true" /> Continuous Learning
        </div>
        <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">Certifications</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
        {certificates.map((certificate) => (
          <article key={certificate.credential} className="glass-panel scroll-glass overflow-hidden rounded-3xl">
            <button
              type="button"
              onClick={() => setSelected(certificate)}
              aria-label={`View ${certificate.title} certificate`}
              aria-haspopup="dialog"
              className="group block w-full bg-[#fffbf2] text-left focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-cyan-600"
            >
              <Image
                src={certificate.image}
                alt={`DataCamp certificate for ${certificate.title}, awarded to Karlo Roel Montenegro.`}
                width={1800}
                height={1039}
                unoptimized
                className="h-auto w-full"
              />
              <span className="flex items-center justify-between border-y border-slate-200 bg-white/95 px-5 py-3 text-xs font-bold text-cyan-700 transition-colors group-hover:bg-cyan-50">
                View certificate <Maximize2 className="h-4 w-4" aria-hidden="true" />
              </span>
            </button>
            <div className="p-5 sm:p-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-cyan-700">DataCamp</p>
              <h3 className="mb-3 text-xl font-bold text-slate-900">{certificate.title}</h3>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-slate-600">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  <time dateTime={certificate.dateTime}>{certificate.date}</time>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="h-4 w-4" aria-hidden="true" /> {certificate.hours} hours
                </span>
              </div>
              <p className="mt-3 text-xs text-slate-500">Statement of Accomplishment &middot; #{certificate.credential}</p>
            </div>
          </article>
        ))}
      </div>

      {selected && <CertificateDialog certificate={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
