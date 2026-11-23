"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Activity,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Award,
  Check,
  Code2,
  Copy,
  Cpu,
  Database,
  ExternalLink,
  Github,
  Globe,
  Layers,
  Lightbulb,
  Mail,
  Maximize2,
  ShieldCheck,
  Target,
  Terminal,
  Users,
  X,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// --- Content Model ---
// These interfaces shape each project entry used by the portfolio carousel, filters,
// and the detailed case-study modal shown when a project is selected.
interface ProjectFeature {
  title: string;
  description: string;
  icon: React.ElementType;
}

interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  category: "ai-iot" | "health-tech" | "web-ui";
  shortDescription: string;
  fullDescription: string;
  problemStatement: string;
  solution: string;
  targetMarket: string;
  uniqueValue: string;
  tags: string[];
  technologies: string[];
  images: string[];
  features: ProjectFeature[];
  achievements?: string[];
  externalUrl?: string;
  galleryReplacementUrl?: string;
}

// --- Portfolio Project Data ---
// Keep project narratives in this data layer so the cards and case-study modal
// stay presentational. Update descriptions here without changing the UI logic.
// The copy emphasizes observed project behavior and avoids unsupported metrics.
const dalaniProject: ProjectData = {
  id: "dalani",
  title: "DalAni",
  subtitle: "Sensor data pipelines & automated risk alerts",
  category: "ai-iot",
  shortDescription: "An IoT and data engineering concept that connects sensor readings, spoilage-risk analysis, and automated alerts to support cold-chain decisions.",
  fullDescription: "DalAni is an end-to-end logistics concept for Philippine agricultural cooperatives. It combines low-cost ESP32 sensors with a cloud-based data workflow to collect temperature, humidity, and location signals in real time. Those signals are translated into spoilage-risk insights, alerts, and route decisions that help teams respond before produce deteriorates.",
  problemStatement: "Over 33% to 40% of harvested produce in the Philippines spoils during transport due to non-refrigerated vehicles, lack of ambient tracking, and severe traffic delays. For every 10°C rise in temperature, fruit deterioration doubles, wiping out farmer earnings and straining food security.",
  solution: "DalAni collects micro-climate data using ESP32, DHT11 sensors, and GPS/GPRS modules, then turns those observations into a dynamic spoilage-risk score. When conditions move beyond the defined threshold, the system provides driver alerts and supports cooling and route decisions through one shared operational view.",
  targetMarket: "9,000+ farmer cooperatives nationwide in the Philippines, acting as administrative hubs for smallholder mango and high-value crop growers.",
  uniqueValue: "It connects reliable field data with practical decisions: teams can monitor conditions, identify risk earlier, and use a transparent record of transit conditions to support quality assessments.",
  tags: ["Data Engineering", "Risk Analytics", "Automated Alerts", "IoT"],
  technologies: ["ESP32 Microcontroller", "Python", "TensorFlow", "Flutter", "GPS/GPRS Module", "DHT11 Sensor", "Firebase", "Google Maps API"],
  images: [
    "/assets/selected-works/dalani-final-logo.png",
    "/dalani-2.png",
    "/dalani-3.png",
    "/dalani-4.png",
    "/dalani-5.png",
  ],
  features: [
    {
      title: "Dynamic Route Optimization",
      description: "Combines temperature exposure, traffic context, and weather observations to support faster, lower-risk pickup decisions.",
      icon: Target
    },
    {
      title: "Proactive Spoilage Prevention",
      description: "Calculates a real-time risk score from sensor readings and surfaces alerts when storage conditions move outside the defined range.",
      icon: Zap
    },
    {
      title: "Yield & Quality Forecasting",
      description: "Summarizes exposure duration and transit conditions into a batch-level quality indicator for clearer analysis and reporting.",
      icon: Lightbulb
    },
    {
      title: "Verifiable Trust Ledger",
      description: "Keeps a transparent record of transit conditions so cooperatives and buyers can review the data behind quality decisions.",
      icon: Users
    }
  ],
  achievements: [
    "🏆 Top 10 Finalist - Innovation Olympics at University of the Philippines Los Baños (September 2025)"
  ]
};

const arteryProject: ProjectData = {
  id: "artery",
  title: "Artery",
  subtitle: "Data science & analytics for blood supply",
  category: "health-tech",
  shortDescription: "A healthcare data science concept combining inventory dashboards, demand forecasting, and traceable records to help teams understand blood supply needs.",
  fullDescription: "Artery is a healthcare logistics concept that brings blood banks, regional hospitals, and emergency donors into one transparent dashboard. It combines live inventory data with demand forecasting and traceability so teams can understand supply conditions, anticipate pressure points, and coordinate response more effectively.",
  problemStatement: "Philippine hospitals suffer from severe blood inventory fragmentation, lack of inter-hospital visibility, expired blood units due to poor demand forecasting, and life-threatening delays in matching rare blood types during critical emergencies.",
  solution: "Artery unifies blood bank inventories nationwide into a live grid. Machine learning predicts upcoming demand spikes per blood group, while smart contracts track blood unit storage temperatures and expiry dates on an immutable ledger.",
  targetMarket: "Hospitals, Red Cross blood centers, regional health units, and emergency patient networks.",
  uniqueValue: "It brings operational data, forecasting, and auditability together so healthcare teams can make supply decisions with more context and accountability.",
  tags: ["Data Science", "Data Analysis", "Forecasting", "Health-Tech"],
  technologies: ["React.js", "Node.js", "Blockchain Ledger", "TensorFlow", "PostgreSQL", "Docker", "AWS Cloud"],
  images: [
    "/assets/selected-works/artery-final-logo.png",
    "/Artery 1.png", 
    "/Artery 2.png",
    "/Arter 3.png",
    "/Artery 4.png",
    "/Arter 5.png",
  ],
  features: [
    {
      title: "Real-Time Blood Grid",
      description: "Presents blood-unit availability across connected facilities so teams can compare supply conditions at a glance.",
      icon: Activity
    },
    {
      title: "AI Demand Forecasting",
      description: "Uses historical and seasonal patterns to surface demand signals that can inform replenishment and allocation decisions.",
      icon: Zap
    },
    {
      title: "Blockchain Traceability",
      description: "Maintains a traceable record of temperature history, location, and chain of custody for review across the supply network.",
      icon: ShieldCheck
    },
    {
      title: "Emergency Smart Match",
      description: "Helps identify compatible nearby donors and facilities when an urgent blood-type request is issued.",
      icon: Users
    }
  ],
  achievements: [
    "⚡ Healthcare Innovation Project — Unified Regional Supply Chain Architecture"
  ]
};

const uritectProject: ProjectData = {
  id: "uritect",
  title: "Uritect",
  subtitle: "Offline urine dipstick reading & UTI screening support",
  category: "health-tech",
  shortDescription: "An offline Android prototype that reads ten-pad urine dipstick strips from a phone photo, classifies each pad on-device, and supports UTI screening and renal follow-up decisions.",
  fullDescription: "Uritect is an offline Android clinical decision-support prototype for interpreting ten-pad urine reagent strips. From a single phone capture, it locates the strip without a printed marker, normalizes the lighting, reads each of the ten reagent pads, and classifies the results on the device. A separate Bayesian UTI screening estimate and a rule-based renal follow-up path help turn the readings into clear next steps. All processing and history storage stay on the phone, with no internet connection required.",
  problemStatement: "Reading urine dipstick colors by eye is subjective and depends on lighting, timing, and the reader's experience. In rural health units and other low-resource settings, laboratory access is limited, and inconsistent strip interpretation can delay recognition of possible urinary tract infections and kidney-related abnormalities.",
  solution: "Uritect checks each capture for blur, glare, darkness, and partial strips, then locates the strip and its ten reagent pads, corrects white balance using neutral strip pixels, and extracts normalized HSV color features. A per-analyte k-nearest neighbors model classifies each pad. The results feed a sex-specific, literature-derived Bayesian UTI screening estimate and a deterministic renal rule engine that recommends whether to observe, repeat, retake, or consult.",
  targetMarket: "Medical technologists, rural health units, community clinics, and health workers in the Philippines who perform urinalysis screening where laboratory resources and connectivity are limited.",
  uniqueValue: "It runs fully offline on an ordinary Android phone, needs no printed calibration marker, and keeps UTI and renal interpretation separate and transparent: it shows its prior, factors, and triggered rules instead of an unexplained score.",
  tags: ["Health-Tech", "Computer Vision", "Machine Learning", "Mobile App"],
  technologies: ["Flutter", "Dart", "Python", "k-Nearest Neighbors", "HSV Color Analysis", "Bayesian Inference", "Rule-Based Engine", "Android", "Offline On-Device Processing"],
  images: [
    "/assets/selected-works/uritect-final-logo.png"
  ],
  features: [
    {
      title: "Markerless Strip Detection",
      description: "Locates one complete strip and validates ten aligned reagent pads without needing a printed black-and-white marker.",
      icon: Target
    },
    {
      title: "Lighting Normalization & Quality Checks",
      description: "Rejects blurred, dark, overexposed, or partial captures and corrects white balance using neutral strip pixels before classification.",
      icon: ShieldCheck
    },
    {
      title: "On-Device Pad Classification",
      description: "Extracts normalized HSV color features and classifies each analyte with its own k-NN model, fully offline on the phone.",
      icon: Cpu
    },
    {
      title: "UTI Screening & Renal Follow-Up",
      description: "Pairs a transparent Bayesian UTI screening estimate with a separate rule-based renal path that recommends observing, repeating, retaking, or consulting.",
      icon: Activity
    }
  ],
  achievements: [
    "🏆 Top 7 out of 90 Participants - Region 6, PSC XI"
  ]
};

const binProject: ProjectData = {
  id: "bin",
  title: "BIN",
  subtitle: "Comparing computer vision models for trash sorting",
  category: "ai-iot",
  shortDescription: "A computer vision project that tests different models on identifying trash materials from photos and evaluates which one has the highest accuracy and potential.",
  fullDescription: "BIN is a computer vision project that tests and compares different models on one task: identifying the material of a piece of trash from a photo. It compares three approaches: a classical HOG + SVM, a CNN trained from scratch, and a pretrained MobileNetV3. All three use the same data and are evaluated the same way, to find which model has the highest accuracy and the most potential. The best model, MobileNetV3, is then used in a simple phone app.",
  problemStatement: "Sorting trash by material is the first step of recycling, but it is usually done by hand. It is also unclear which computer vision approach works best for this task, especially on real-world photos with messy backgrounds and different lighting.",
  solution: "The three models were trained and tested side by side on six trash categories: cardboard, glass, metal, paper, plastic, and residual trash. MobileNetV3 performed best, reaching 97.7% accuracy on real-world photos it had never seen. BIN uses it to identify an item from a photo and suggest which bin it belongs in.",
  targetMarket: "Students, researchers, and developers interested in computer vision and model evaluation, as well as anyone who wants help sorting their trash.",
  uniqueValue: "BIN could be integrated into smart trash bins that sort items automatically, recycling stations and materials recovery facilities, or school and community waste programs. It could also be extended to recognize more types of waste and to give recycling guidance for specific locations.",
  tags: ["Computer Vision", "Deep Learning", "Machine Learning", "Mobile App"],
  technologies: ["Python", "PyTorch", "NumPy", "MobileNetV3", "CNN", "HOG + SVM", "ONNX Runtime Web", "JavaScript", "Progressive Web App", "Gradio", "Google Colab"],
  images: [
    "/assets/selected-works/bin-final-logo.png",
    "/bin-2.png",
    "/bin-3.png",
    "/bin-4.png",
    "/bin-5.png",
    "/bin-6.png",
  ],
  features: [
    {
      title: "Three Methods, One Comparison",
      description: "Runs a from-scratch HOG + linear SVM, a 4-block CNN, and a pretrained MobileNetV3 on every photo, showing each prediction, confidence, and runtime.",
      icon: Layers
    },
    {
      title: "Real-World Accuracy",
      description: "Mixed-domain training on studio and real-world photos lets MobileNetV3 reach 97.7% on 600 real-world photos it never saw, and 94.1% on the TrashNet test set.",
      icon: Target
    },
    {
      title: "Calibrated \"Not Sure\" Answers",
      description: "Answers only at 65% confidence or higher. At that threshold, BIN answers 94% of real-world test photos, and 99.5% of those answers are correct.",
      icon: ShieldCheck
    },
    {
      title: "Offline, Private Phone App",
      description: "An installable web app that runs the models on the phone with ONNX Runtime, works offline after the first visit, and never uploads photos.",
      icon: Zap
    }
  ],
  achievements: [
    "📚 Computer Vision Project — Model Comparison & Evaluation"
  ]
};

const tribleProject: ProjectData = {
  id: "trible",
  title: "Trible",
  subtitle: "React frontend for real-time campus mobility",
  category: "web-ui",
  shortDescription: "A responsive React booking experience that connects Firebase data with driver availability, seat reservations, route information, and in-app messaging.",
  fullDescription: "Trible is a personal project commissioned by an Agricultural Engineering student. It explores how a real-time campus mobility service can make transportation information easier to scan and use for both riders and drivers. The experience brings availability, routes, terminals, seat bookings, and communication into one workflow designed around quicker decisions and clearer status updates.",
  problemStatement: "Students often struggle with unreliable transportation, long waiting times, and unclear driver availability at campus terminals. Without a proper booking system, riders are forced to wait in queues, guess which drivers are available, or miss transport opportunities altogether. Drivers also face difficulty managing passenger demand and updating their route and seat status in real time.",
  solution: "Trible solves this by providing a real-time booking platform where students can see active drivers, available seats, terminal locations, and routes. Drivers can update their online status, destination, terminal, and seat count instantly, allowing passengers to make quick decisions and reserve rides with confidence.",
  targetMarket: "College and university students, tricycle drivers operating in campus or local transport routes, campus transport coordinators and transport service users, and students who travel regularly between terminals and campus zones.",
  uniqueValue: "Trible combines real-time visibility, booking, status management, and communication in one focused workflow that reduces uncertainty for both riders and drivers.",
  tags: ["Frontend Development", "React", "Firebase", "Real-Time Data"],
  technologies: ["React", "Vite", "Tailwind CSS", "Firebase Authentication", "Firebase Realtime Database", "Zustand", "Framer Motion", "React Router", "Responsive UI design"],
  images: [
    "/assets/selected-works/trible-final-logo.png"
  ],
  features: [
    {
      title: "Real-Time Driver & Seat Visibility",
      description: "Students can instantly see active drivers on their route, available seats, terminal locations, and destinations without delays.",
      icon: Activity
    },
    {
      title: "Instant Booking & Seat Reservation",
      description: "Reserve seats with a tap and receive immediate confirmation. Drivers instantly see booking updates across connected devices.",
      icon: Zap
    },
    {
      title: "Driver Status Management",
      description: "Drivers easily update their online status, destination, terminal, available seats, and route information in real time.",
      icon: Users
    },
    {
      title: "In-App Messaging & Communication",
      description: "Real-time chat system between students and drivers for instant coordination, questions, and seamless trip communication.",
      icon: Terminal
    }
  ],
  achievements: [
    "🚀 Personal Project — Real-Time Campus Mobility Solution"
  ],
  galleryReplacementUrl: "https://trible-gamma.vercel.app/"
};

const metropolisProject: ProjectData = {
  id: "metropolis",
  title: "Metropolis",
  subtitle: "Next.js frontend & interactive data views",
  category: "web-ui",
  shortDescription: "A Next.js frontend concept exploring responsive dashboard layouts, interactive data views, and motion to make complex urban information easier to navigate.",
  fullDescription: "Metropolis is a conceptual frontend application focused on presenting smart-city monitoring, transportation nodes, and urban metrics through an expressive interface. Built with Next.js and responsive interaction patterns, it explores how visual hierarchy and motion can make data-rich experiences easier to navigate and understand.",
  problemStatement: "Standard urban dashboards suffer from cluttered user interfaces and lack engaging visual storytelling, making complex urban data difficult to comprehend.",
  solution: "Metropolis translates complex urban metrics into structured dashboard views with clear visual grouping, responsive layouts, smooth transitions, and interactive ambient styling.",
  targetMarket: "Design enthusiasts, urban tech developers, and digital experience innovators.",
  uniqueValue: "It treats visual design as an information-design problem, using hierarchy, motion, and responsive layouts to make complex interfaces more legible and engaging.",
  tags: ["Frontend Development", "Data Visualization", "Next.js", "Responsive UI"],
  technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Vercel"],
  images: [
    "/reality13.png"
  ],
  features: [
    {
      title: "Ambient Glassmorphism",
      description: "Multi-layered translucent panels with dynamic backdrop blur and dynamic light reflections.",
      icon: Layers
    },
    {
      title: "Interactive Urban Metrics",
      description: "Sleek data visualization widgets for city traffic, energy usage, and transit heatmaps.",
      icon: Globe
    }
  ],
  externalUrl: "https://reality13-metropolis.vercel.app"
};

const projectsData: ProjectData[] = [tribleProject, metropolisProject, dalaniProject, arteryProject, uritectProject, binProject];

// Shared labels keep the hero and capability section aligned. Focus descriptions
// distinguish established project work from areas still being developed.
const focusAreas = [
  {
    title: "Frontend Development",
    icon: Code2,
    description: "Building responsive web interfaces with reusable components, clear interactions, and real-time application data.",
    topics: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Data Science",
    icon: Cpu,
    description: "Developing skills in predictive modeling and model evaluation, with project concepts centered on forecasting and risk analysis.",
    topics: ["Python", "TensorFlow", "Predictive Modeling", "Forecasting"],
  },
  {
    title: "Data Analysis",
    icon: Activity,
    description: "Exploring patterns, interpreting metrics, and presenting data through clear dashboards that support practical decisions.",
    topics: ["Python", "SQL", "Data Visualization", "Dashboard Design"],
  },
  {
    title: "Data Engineering",
    icon: Database,
    description: "Connecting data collection, databases, and APIs while developing dependable workflows for preparing and delivering useful data.",
    topics: ["SQL", "PostgreSQL", "Firebase", "REST APIs", "Data Pipelines"],
  },
  {
    title: "AI Automation",
    icon: Zap,
    description: "Exploring AI-assisted workflows and API integrations to reduce repetitive work, with clear checks and human review of results.",
    topics: ["Python", "API Integration", "Workflow Automation", "AI-Assisted Workflows"],
  },
];

// --- Edition Details ---
// Shared values for the newspaper layout. The masthead is the "paper" name; the
// front-page headline is the portfolio owner's name.
const MASTHEAD = "The Daily Karlo";
const CONTACT_EMAIL = "montenegrokarlo@gmail.com";
const GITHUB_URL = "https://github.com/karlsxo/KarloRoel";
const PROFILE_PHOTO = "/assets/profile/karlo-roel-bw.jpg";
const ABOUT_PHOTO = "/assets/profile/karlo-roel-about-bw.jpg";

const heroRoles = ["Data Science", "Data Analytics", "Data Engineering", "Frontend Development"];

const sectionLinks = [
  { href: "#top", label: "Front Page" },
  { href: "#work", label: "Selected Work" },
  { href: "#tech", label: "Skills & Focus" },
  { href: "#certifications", label: "Certifications" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const categoryLabels: Record<ProjectData["category"], string> = {
  "ai-iot": "AI & IoT",
  "health-tech": "Health-Tech",
  "web-ui": "Frontend",
};

const filterTabs = [
  { id: "all", label: "All Projects" },
  { id: "ai-iot", label: "AI & IoT" },
  { id: "health-tech", label: "Health-Tech" },
  { id: "web-ui", label: "Frontend" },
] as const;

type FilterId = (typeof filterTabs)[number]["id"];

const corePrinciples = [
  {
    title: "Clear User Experiences",
    text: "Interfaces should make important actions and information easy to understand.",
  },
  {
    title: "Useful Data Collection",
    text: "Reliable inputs create stronger analysis and more useful decisions.",
  },
  {
    title: "Responsible AI & Automation",
    text: "Automated results should be understandable, checked, and easy for people to review.",
  },
];

// Achievement strings start with an emoji from the earlier card design; the
// printed layout marks them with an award icon instead.
const cleanAchievement = (text: string) => text.replace(/^[^A-Za-z0-9]+/, "");

const caseNumber = (project: ProjectData) => String(projectsData.indexOf(project) + 1).padStart(2, "0");

// --- Motion ---
// Content is visible by default. When JavaScript is running, the layout script
// marks <html> with "js" and each block rises in as it scrolls into view;
// visitors who prefer reduced motion see it immediately (see globals.css).
const Reveal = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) {
      node.classList.add("is-visible");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          node.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}s` } : undefined}>
      {children}
    </div>
  );
};

// Locks page scroll while a dialog is open and closes it on Escape.
function useDialogBehavior(isOpen: boolean, onEscape: () => void) {
  const onEscapeRef = useRef(onEscape);

  useEffect(() => {
    onEscapeRef.current = onEscape;
  });

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onEscapeRef.current();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);
}

// --- Shared Newspaper Pieces ---
const SectionHeading = ({
  id,
  kicker,
  title,
  description,
  children,
}: {
  id: string;
  kicker: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) => (
  <div className="mb-6">
    <div className="rule-thick-thin" aria-hidden="true" />
    <div className="mt-5 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="kicker">{kicker}</p>
        <h2 id={id} className="mt-1 font-headline text-[2.6rem] font-bold uppercase leading-none tracking-tight text-ink md:text-6xl">
          {title}
        </h2>
        {description && (
          <p className="mt-3 max-w-2xl font-serif text-base italic leading-relaxed text-ink-soft md:text-lg">{description}</p>
        )}
      </div>
      {children}
    </div>
  </div>
);

// Red boxes on either side of the nameplate, like the "ears" of a printed front page.
const MastheadEar = ({ label }: { label: string }) => (
  <div
    aria-hidden="true"
    className="hidden h-[4.75rem] w-36 shrink-0 items-center justify-center bg-press font-headline text-[2.9rem] font-bold uppercase leading-none tracking-[0.06em] text-paper-light lg:flex"
  >
    {label}
  </div>
);

const Masthead = () => (
  <header className="pt-5 sm:pt-8">
    <div className="flex items-center justify-center gap-6 lg:justify-between">
      <MastheadEar label="CS" />
      <p className="whitespace-nowrap text-center font-masthead text-[clamp(2.5rem,8vw,6rem)] leading-none text-ink">
        <a href="#top" className="hover:text-press">{MASTHEAD}</a>
      </p>
      <MastheadEar label="AI" />
    </div>
    <p className="mt-4 bg-ink px-3 py-1.5 text-center font-headline text-[0.6rem] uppercase tracking-[0.26em] text-paper-light sm:text-xs">
      All the data that&apos;s fit to ship &middot; Clean code, clear insights, real impact
    </p>
    <div className="mt-1.5 flex items-center justify-between gap-3 border-b border-ink pb-1.5 font-headline text-[0.62rem] uppercase tracking-[0.18em] text-ink-soft sm:text-xs">
      <span>Portfolio Edition</span>
      <span className="hidden md:inline">Data Science &middot; Analytics &middot; Engineering &middot; Frontend</span>
      <span>Open to Internships</span>
    </div>
  </header>
);

const AchievementNotes = ({ items }: { items?: string[] }) => {
  if (!items || items.length === 0) return null;
  return (
    <ul className="mt-4 space-y-1.5">
      {items.map((achievement) => (
        <li
          key={achievement}
          className="flex gap-2 border-l-4 border-press bg-paper-light/70 px-3 py-1.5 font-headline text-[0.74rem] uppercase leading-snug tracking-[0.06em] text-ink"
        >
          <Award className="mt-0.5 h-3.5 w-3.5 shrink-0 text-press" aria-hidden="true" />
          <span>{cleanAchievement(achievement)}</span>
        </li>
      ))}
    </ul>
  );
};

// Opens the case study, or the live site for projects that link out. The
// `after:` overlay stretches the click target across the whole article.
const ProjectLink = ({
  project,
  onOpen,
  children,
}: {
  project: ProjectData;
  onOpen: (id: string) => void;
  children: React.ReactNode;
}) => {
  const className = "text-left [text-transform:inherit] transition-colors after:absolute after:inset-0 after:content-[''] hover:text-press focus-visible:text-press";
  if (project.externalUrl) {
    return (
      <a href={project.externalUrl} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
        <span className="sr-only"> (opens the live site in a new tab)</span>
      </a>
    );
  }
  return (
    <button type="button" onClick={() => onOpen(project.id)} className={className}>
      {children}
    </button>
  );
};

const StoryCallout = ({ project }: { project: ProjectData }) => (
  <span aria-hidden="true" className="inline-flex items-center gap-1.5 font-headline text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ink transition-colors group-hover:text-press">
    {project.externalUrl ? "Visit the live site" : "Read the full story"}
    {project.externalUrl ? <ExternalLink className="h-3.5 w-3.5" /> : <ArrowUpRight className="h-3.5 w-3.5" />}
  </span>
);

const LeadStory = ({
  project,
  onOpen,
  label,
  controls,
}: {
  project: ProjectData;
  onOpen: (id: string) => void;
  label: string;
  controls?: React.ReactNode;
}) => (
  <article className="press-card group relative grid gap-6 md:grid-cols-12 md:gap-8">
    <figure className="md:col-span-7">
      <div className="relative aspect-[16/10] overflow-hidden border border-ink bg-paper-deep">
        <Image
          src={project.images[0]}
          alt={`${project.title} preview`}
          fill
          className="newsprint-img object-contain p-6 sm:p-10"
          sizes="(min-width: 1240px) 680px, (min-width: 768px) 58vw, 100vw"
        />
      </div>
      <figcaption className="mt-2 font-serif text-[0.78rem] italic leading-snug text-ink-muted">
        Filed under: {project.tags.join(" · ")}
      </figcaption>
    </figure>
    <div className="flex flex-col md:col-span-5">
      <p className="kicker">
        {label} &middot; {categoryLabels[project.category]}
      </p>
      <h3 className="mt-1 font-headline text-5xl font-bold uppercase leading-[0.9] text-ink md:text-6xl">
        <ProjectLink project={project} onOpen={onOpen}>{project.title}</ProjectLink>
      </h3>
      <p className="mt-2 font-serif text-xl italic leading-snug text-ink-soft">{project.subtitle}</p>
      <p className="news-body drop-cap mt-4 text-[1.02rem] leading-relaxed text-ink-soft">{project.shortDescription}</p>
      <AchievementNotes items={project.achievements} />
      <div className="mt-5">
        <StoryCallout project={project} />
      </div>
      {controls}
    </div>
  </article>
);

// --- Project Stack ---
// Projects sit on top of one another like newspaper pages. "View next project"
// turns the top page forward, toward the reader, from its left edge to reveal the page beneath it.
const pageEase = [0.65, 0, 0.35, 1] as const;

const foldVariants: Variants = {
  current: { x: 0, y: 0, rotateY: 0, opacity: 1, zIndex: 2, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1], zIndex: { duration: 0 } } },
  under: { x: 8, y: 8, rotateY: 0, opacity: 1, zIndex: 1, transition: { duration: 0.45, zIndex: { duration: 0 } } },
  folded: {
    // Negative: the free edge swings out toward the viewer, like lifting a page off the pile.
    rotateY: -100,
    opacity: [1, 1, 0],
    zIndex: 3,
    transition: { duration: 0.85, ease: pageEase, opacity: { duration: 0.85, times: [0, 0.75, 1] }, zIndex: { duration: 0 } },
  },
};

const foldShadeVariants: Variants = {
  current: { opacity: 0 },
  under: { opacity: 0 },
  folded: { opacity: 1, transition: { duration: 0.85, ease: pageEase } },
};

// Reduced motion: no fold, the top page simply fades out.
const fadeVariants: Variants = {
  current: { x: 0, y: 0, rotateY: 0, opacity: 1, zIndex: 2, transition: { duration: 0 } },
  under: { x: 8, y: 8, rotateY: 0, opacity: 1, zIndex: 1, transition: { duration: 0 } },
  folded: { opacity: 0, zIndex: 3, transition: { duration: 0.2, zIndex: { duration: 0 } } },
};

const fadeShadeVariants: Variants = {
  current: { opacity: 0 },
  under: { opacity: 0 },
  folded: { opacity: 0 },
};

const ProjectStack = ({ projects, onOpen }: { projects: ProjectData[]; onOpen: (id: string) => void }) => {
  // `step` only ever increases, so every page keeps a unique key even when the stack wraps around.
  const [step, setStep] = useState(0);
  // A ref, not state: the page that is folding away still has a live button, and a
  // second fast click on it must see "turning" immediately, not after a re-render.
  const isTurning = useRef(false);
  const shouldReduceMotion = useReducedMotion();
  const nextButtonRef = useRef<HTMLButtonElement | null>(null);
  const restoreFocus = useRef(false);

  // Keep keyboard focus on the button after the page turns.
  useEffect(() => {
    if (!restoreFocus.current) return;
    restoreFocus.current = false;
    nextButtonRef.current?.focus({ preventScroll: true });
  }, [step]);

  const count = projects.length;
  if (count === 0) return null;

  const position = step % count;
  const showNext = () => {
    if (isTurning.current || count < 2) return;
    isTurning.current = true;
    restoreFocus.current = true;
    setStep((current) => current + 1);
  };

  const sheetVariants = shouldReduceMotion ? fadeVariants : foldVariants;
  const shadeVariants = shouldReduceMotion ? fadeShadeVariants : foldShadeVariants;
  const sheets = count > 1
    ? [{ sheetStep: step + 1, isCurrent: false }, { sheetStep: step, isCurrent: true }]
    : [{ sheetStep: step, isCurrent: true }];

  return (
    <div className="relative isolate mb-4 mr-4 mt-2" style={{ perspective: "3000px" }}>
      {/* Deep perspective keeps the page from ballooning over the screen as it turns toward the viewer. */}
      {/* A third page edge, so a stack of more than two reads as a pile. */}
      {count > 2 && (
        <div aria-hidden="true" className="sheet-paper absolute inset-0 translate-x-4 translate-y-4 border border-ink/45" />
      )}

      <AnimatePresence mode="popLayout" initial={false} onExitComplete={() => { isTurning.current = false; }}>
        {sheets.map(({ sheetStep, isCurrent }) => {
          const index = sheetStep % count;
          const project = projects[index];
          return (
            <motion.div
              key={`page-${sheetStep}`}
              variants={sheetVariants}
              initial={false}
              animate={isCurrent ? "current" : "under"}
              exit="folded"
              style={{ transformOrigin: "left center" }}
              className={`sheet-paper isolate border border-ink/70 p-5 sm:p-7 ${isCurrent ? "relative" : "absolute inset-0 overflow-hidden"}`}
              aria-hidden={isCurrent ? undefined : true}
              inert={!isCurrent}
            >
              <LeadStory
                project={project}
                onOpen={onOpen}
                label={index === 0 ? "Lead Story" : "Also Reported"}
                controls={count > 1 && (
                  <div className="relative z-10 mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-ink/40 pt-4">
                    <button ref={isCurrent ? nextButtonRef : undefined} type="button" onClick={showNext} className="ink-btn">
                      {index === count - 1 ? "Back to first project" : "View next project"}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <span className="font-headline text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted">
                      Project {index + 1} of {count}
                    </span>
                  </div>
                )}
              />
              {/* Shades the page as it turns away from the light. */}
              <motion.div
                aria-hidden="true"
                variants={shadeVariants}
                className="pointer-events-none absolute inset-0 bg-gradient-to-l from-ink/45 via-ink/10 to-transparent"
              />
            </motion.div>
          );
        })}
      </AnimatePresence>

      <p className="sr-only" aria-live="polite">
        Showing project {position + 1} of {count}: {projects[position].title}
      </p>
    </div>
  );
};

// --- Contact Modal ---
// Styled as a letter to the editor. Submitting opens the visitor's email client
// with the message prefilled.
const ContactModal = ({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle');

  useDialogBehavior(isOpen, onClose);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
        setFormData({ name: '', email: '', message: '' });
        setSubmitStatus('idle');
      }, 1800);
    }, 400);
  };

  const fieldClass =
    "w-full border-0 border-b border-ink/60 bg-transparent px-0 py-2 font-serif text-base text-ink placeholder:italic placeholder:text-ink-muted/80 focus:border-press";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex overflow-y-auto bg-ink/60 p-4 backdrop-blur-[2px]"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
            initial={{ opacity: 0, y: 18, rotate: -0.8 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, y: 18, rotate: -0.8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative m-auto w-full max-w-lg border border-ink bg-paper-light p-6 shadow-[8px_8px_0_rgba(23,21,19,0.85)] sm:p-9"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              autoFocus
              onClick={onClose}
              aria-label="Close contact form"
              className="absolute right-3 top-3 border border-ink p-1.5 text-ink transition-colors hover:bg-ink hover:text-paper-light"
            >
              <X className="h-4 w-4" />
            </button>

            <p className="kicker">Letters to the Editor</p>
            <h2 id="contact-title" className="mt-1 font-headline text-4xl font-bold uppercase leading-none text-ink">Let&apos;s Connect</h2>
            <p className="mt-2 border-b-4 border-double border-ink pb-4 font-serif italic leading-relaxed text-ink-soft">
              Send a direct message or collaboration inquiry. I usually respond within 24 hours.
            </p>

            {submitStatus === 'success' ? (
              <div role="status" className="py-10 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center border-2 border-ink">
                  <Check className="h-7 w-7 text-press" />
                </div>
                <h3 className="font-headline text-xl font-bold uppercase text-ink">Opening Email Client...</h3>
                <p className="mt-1 font-serif italic text-ink-soft">Thank you for reaching out!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                  <label htmlFor="name" className="block font-headline text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={fieldClass}
                    placeholder="e.g. Alex Morgan"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-headline text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={fieldClass}
                    placeholder="alex@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block font-headline text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="letter-lines mt-1 w-full resize-none border-0 bg-transparent px-0 font-serif text-base text-ink placeholder:italic placeholder:text-ink-muted/80"
                    placeholder="Tell me about your project, co-op opportunity, or idea..."
                  />
                </div>

                <button type="submit" disabled={isSubmitting} className="ink-btn w-full">
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-paper-light/30 border-t-paper-light" aria-hidden="true" />
                      Preparing Message...
                    </>
                  ) : (
                    <>
                      <Mail className="h-4 w-4" aria-hidden="true" />
                      Send via Email Client
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Case Study Modal ---
// Each project opens as a printed "special report": the overview reads as an
// article, features as numbered items, and the gallery as captioned figures.
const ProjectDetailModal = ({
  isOpen,
  onClose,
  project
}: {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectData | null;
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'gallery'>('overview');
  const [selectedLightboxImage, setSelectedLightboxImage] = useState<string | null>(null);

  // Escape closes an open image first, then the report itself.
  useDialogBehavior(isOpen, () => {
    if (selectedLightboxImage) {
      setSelectedLightboxImage(null);
    } else {
      onClose();
    }
  });

  if (!project) return null;

  const showLiveSite = project.id === 'trible' && Boolean(project.galleryReplacementUrl);
  const tabs = [
    { id: 'overview', label: 'Overview & Impact' },
    { id: 'features', label: 'Architecture & Features' },
    { id: 'gallery', label: showLiveSite ? 'Live Site' : `Gallery (${project.images.length})` },
  ] as const;

  const articlePair = (left: { title: string; text: string }, right: { title: string; text: string }) => (
    <div className="grid border-t border-ink/50 md:grid-cols-2">
      <section className="py-5 md:pr-6">
        <h3 className="font-headline text-2xl font-bold uppercase leading-none text-ink">{left.title}</h3>
        <p className="news-body mt-2.5 text-[0.98rem] leading-relaxed text-ink-soft">{left.text}</p>
      </section>
      <section className="border-t border-ink/50 py-5 md:border-l md:border-t-0 md:pl-6">
        <h3 className="font-headline text-2xl font-bold uppercase leading-none text-ink">{right.title}</h3>
        <p className="news-body mt-2.5 text-[0.98rem] leading-relaxed text-ink-soft">{right.text}</p>
      </section>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="project-report"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] overflow-y-auto bg-ink/60 backdrop-blur-[2px]"
          onClick={onClose}
        >
          <button
            type="button"
            autoFocus
            onClick={onClose}
            aria-label="Close case study"
            className="fixed right-4 top-4 z-[105] border-2 border-ink bg-paper-light p-2 text-ink shadow-[3px_3px_0_var(--ink)] transition-colors hover:bg-ink hover:text-paper-light"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="min-h-full px-3 py-14 sm:px-6 md:py-16">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-title"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto max-w-5xl border border-ink bg-paper px-5 py-6 shadow-[10px_10px_0_rgba(23,21,19,0.8)] sm:px-10 sm:py-9"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Report masthead */}
              <div className="flex items-center justify-between gap-3 border-b-4 border-double border-ink pb-2 font-headline text-[0.62rem] uppercase tracking-[0.2em] text-ink-soft sm:text-xs">
                <span className="font-semibold text-press">Special Report</span>
                <span className="hidden font-masthead text-2xl normal-case tracking-normal text-ink sm:inline">{MASTHEAD}</span>
                <span>Case Study No. {caseNumber(project)}</span>
              </div>

              <p className="mt-5 font-headline text-[0.68rem] uppercase tracking-[0.18em] text-ink-muted">
                Filed under: {project.tags.join(" · ")}
              </p>
              <h2 id="project-title" className="mt-2 font-headline text-[3.2rem] font-bold uppercase leading-[0.88] text-ink sm:text-7xl md:text-8xl">
                {project.title}
              </h2>
              <p className="mt-3 font-serif text-xl italic leading-snug text-ink-soft md:text-2xl">{project.subtitle}</p>
              <AchievementNotes items={project.achievements} />

              {/* Section tabs */}
              <div role="tablist" aria-label={`${project.title} case study sections`} className="mt-7 flex flex-wrap gap-1 border-y-2 border-ink py-1.5">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    id={`tab-${tab.id}`}
                    aria-selected={activeTab === tab.id}
                    aria-controls={`panel-${tab.id}`}
                    onClick={() => setActiveTab(tab.id)}
                    className={`shrink-0 whitespace-nowrap px-4 py-2 font-headline text-[0.75rem] font-semibold uppercase tracking-[0.14em] transition-colors ${
                      activeTab === tab.id ? 'bg-ink text-paper-light' : 'text-ink hover:bg-paper-deep'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                  <motion.div
                    key="overview"
                    role="tabpanel"
                    id="panel-overview"
                    aria-labelledby="tab-overview"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-7 space-y-7"
                  >
                    <section>
                      <h3 className="kicker">Project Summary</h3>
                      <p className="news-body drop-cap mt-2 text-[1.05rem] leading-relaxed text-ink-soft md:text-lg">{project.fullDescription}</p>
                    </section>

                    {articlePair(
                      { title: 'The Problem', text: project.problemStatement },
                      { title: 'The Solution', text: project.solution },
                    )}
                    {articlePair(
                      { title: 'Target Audience & Reach', text: project.targetMarket },
                      { title: project.id === 'bin' ? 'Future Implementation' : 'Unique Proposition', text: project.uniqueValue },
                    )}

                    <section className="border-2 border-ink">
                      <h3 className="bg-ink px-4 py-2 font-headline text-sm uppercase tracking-[0.2em] text-paper-light">Built With</h3>
                      <ul className="flex flex-wrap gap-2 p-4">
                        {project.technologies.map((tech) => (
                          <li key={tech} className="border border-ink/60 px-2 py-1 font-headline text-[0.72rem] uppercase tracking-[0.08em] text-ink">
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </section>
                  </motion.div>
                )}

                {activeTab === 'features' && (
                  <motion.ol
                    key="features"
                    role="tabpanel"
                    id="panel-features"
                    aria-labelledby="tab-features"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="article-grid mt-4"
                  >
                    {project.features.map((feature, idx) => (
                      <li key={feature.title}>
                        <div className="flex items-center gap-2 text-press">
                          <span className="font-headline text-sm font-bold uppercase tracking-[0.16em]">No. {idx + 1}</span>
                          <feature.icon className="h-4 w-4" aria-hidden="true" />
                        </div>
                        <h3 className="mt-2 font-headline text-2xl font-bold uppercase leading-tight text-ink">{feature.title}</h3>
                        <p className="news-body mt-2 text-[0.98rem] leading-relaxed text-ink-soft">{feature.description}</p>
                      </li>
                    ))}
                  </motion.ol>
                )}

                {activeTab === 'gallery' && (
                  showLiveSite ? (
                    <motion.div
                      key="gallery-live-site"
                      role="tabpanel"
                      id="panel-gallery"
                      aria-labelledby="tab-gallery"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-7 border-2 border-ink p-6 sm:p-8"
                    >
                      <h3 className="font-headline text-3xl font-bold uppercase leading-none text-ink">Visit Trible Live</h3>
                      <p className="mt-2 font-serif italic text-ink-soft">Prototype build — core functionality first, not a fully finished release.</p>
                      <a
                        href={project.galleryReplacementUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ink-btn mt-5"
                      >
                        Open trible-gamma.vercel.app
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="gallery"
                      role="tabpanel"
                      id="panel-gallery"
                      aria-labelledby="tab-gallery"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"
                    >
                      {project.images.map((img, idx) => (
                        <figure key={img} className="press-card">
                          <button
                            type="button"
                            onClick={() => setSelectedLightboxImage(img)}
                            aria-label={`Expand ${project.title} figure ${idx + 1}`}
                            className="group relative block aspect-[9/16] w-full overflow-hidden border border-ink bg-paper-deep"
                          >
                            <Image
                              src={img}
                              alt={`${project.title} screenshot ${idx + 1}`}
                              fill
                              className="newsprint-img object-contain p-3"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 bg-ink px-2 py-1 font-headline text-[0.65rem] uppercase tracking-[0.14em] text-paper-light opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                              <Maximize2 className="h-3 w-3" aria-hidden="true" /> Expand
                            </span>
                          </button>
                          <figcaption className="mt-2 font-serif text-[0.8rem] italic text-ink-muted">
                            <span className="font-headline not-italic uppercase tracking-[0.14em] text-ink">Fig. {idx + 1}</span> &mdash; {project.title} screenshot {idx + 1}
                          </figcaption>
                        </figure>
                      ))}
                    </motion.div>
                  )
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Lightbox: screenshots return to full colour for reading. */}
      {isOpen && selectedLightboxImage && (
        <motion.div
          key="project-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} expanded screenshot`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-ink/85 p-4"
          onClick={() => setSelectedLightboxImage(null)}
        >
          <button
            type="button"
            autoFocus
            onClick={() => setSelectedLightboxImage(null)}
            aria-label="Close expanded image"
            className="absolute right-4 top-4 border-2 border-paper-light p-2 text-paper-light transition-colors hover:bg-paper-light hover:text-ink"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="relative h-full max-h-[85vh] w-full max-w-4xl">
            <Image
              src={selectedLightboxImage}
              alt={`${project.title} screenshot, expanded`}
              fill
              className="object-contain"
              sizes="(min-width: 896px) 896px, 100vw"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Main Portfolio Page ---
// Laid out as a newspaper front page: masthead, the name as the lead headline,
// then Selected Work, Skills & Focus, Certifications, About, and Contact.
export default function Portfolio() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isProjectDetailOpen, setIsProjectDetailOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard
      ?.writeText(CONTACT_EMAIL)
      .then(() => {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2200);
      })
      .catch(() => setIsContactModalOpen(true));
  };

  const openProjectDetail = (projectId: string) => {
    const proj = projectsData.find(p => p.id === projectId);
    if (proj) {
      setSelectedProject(proj);
      setIsProjectDetailOpen(true);
    }
  };

  const filteredProjects = activeFilter === "all"
    ? projectsData
    : projectsData.filter(p => p.category === activeFilter);

  return (
    <div className="relative min-h-screen">
      <div className="paper-grain" aria-hidden="true" />

      <a
        href="#main"
        className="sr-only z-[130] bg-ink px-4 py-2 font-headline text-xs uppercase tracking-[0.16em] text-paper-light focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      {/* Email copied notice */}
      <div aria-live="polite" className="pointer-events-none fixed right-4 top-16 z-[110]">
        <AnimatePresence>
          {copiedEmail && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="flex items-center gap-2 border-2 border-ink bg-paper-light px-4 py-2.5 font-headline text-[0.7rem] uppercase tracking-[0.12em] text-ink shadow-[4px_4px_0_var(--ink)]"
            >
              <Check className="h-4 w-4 text-press" aria-hidden="true" />
              Email copied to clipboard! ({CONTACT_EMAIL})
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Contact & Detail Modals */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
      <ProjectDetailModal
        isOpen={isProjectDetailOpen}
        onClose={() => setIsProjectDetailOpen(false)}
        project={selectedProject}
      />

      <div className="relative z-10">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
          <Masthead />
        </div>

        {/* Section bar */}
        <nav aria-label="Sections" className="sticky top-0 z-40 border-b-2 border-ink bg-paper/95 backdrop-blur-sm">
          <div className="mx-auto flex max-w-[1240px] items-center gap-4 px-4 sm:px-6 lg:px-10">
            <ul className="flex min-w-0 flex-1 items-center gap-4 overflow-x-auto py-1 pr-6 sm:gap-5 font-headline text-[0.72rem] font-medium uppercase tracking-[0.16em] text-ink-soft [scrollbar-width:none] max-lg:[mask-image:linear-gradient(to_right,#000_82%,transparent)]">
              {sectionLinks.map((link) => (
                <li key={link.href} className="shrink-0">
                  <a href={link.href} className="inline-block py-2.5 transition-colors hover:text-press">{link.label}</a>
                </li>
              ))}
            </ul>
            <div className="flex shrink-0 items-center gap-3">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="hidden items-center gap-1.5 font-headline text-[0.72rem] uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-press md:inline-flex"
              >
                <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                Copy Email
              </button>
              <button type="button" onClick={() => setIsContactModalOpen(true)} className="ink-btn btn-sm">
                Contact Me
              </button>
            </div>
          </div>
        </nav>

        <main id="main" className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
          {/* Front page */}
          <section id="top" aria-labelledby="hero-heading" className="scroll-mt-24 pt-6 sm:pt-8">
            <div>
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center">
                <span className="bg-press px-2 py-0.5 font-headline text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-paper-light">Breaking</span>
                <span className="font-headline text-xs uppercase tracking-[0.2em] text-ink-soft">Frontend, Data &amp; AI Automation</span>
              </div>

              <h1
                id="hero-heading"
                className="mt-3 text-center font-headline text-[clamp(3.2rem,15vw,12.5rem)] font-bold uppercase leading-[0.86] tracking-[-0.01em] text-ink"
              >
                <span className="block">Karlo Roel</span>
                <span className="block">Montenegro</span>
              </h1>

              <p className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 bg-press px-3 py-2.5 text-center font-headline text-[clamp(0.95rem,2.3vw,1.8rem)] font-semibold uppercase leading-tight tracking-[0.05em] text-paper-light">
                {heroRoles.map((role, index) => (
                  <React.Fragment key={role}>
                    {index > 0 && <span aria-hidden="true" className="opacity-60">&middot;</span>}
                    <span className="whitespace-nowrap">{role}</span>
                  </React.Fragment>
                ))}
              </p>
            </div>

            <div className="mt-6 grid gap-8 md:grid-cols-12 md:gap-x-6 lg:gap-0">
              {/* Portrait */}
              <figure className="order-1 md:col-span-7 lg:order-2 lg:col-span-6 lg:border-x lg:border-ink/40 lg:px-6">
                <div className="relative aspect-[4/5] overflow-hidden border border-ink bg-paper-light">
                  <Image
                    src={PROFILE_PHOTO}
                    alt="Black-and-white portrait of Karlo Roel Montenegro in a dark sweater, one hand resting on top of the head, against a plain wall."
                    fill
                    priority
                    sizes="(min-width: 1240px) 560px, (min-width: 1024px) 46vw, 100vw"
                    className="press-photo object-cover object-[52%_30%]"
                  />
                </div>
                <figcaption className="mt-2 border-b border-ink/40 pb-2 font-serif text-[0.82rem] italic leading-snug text-ink-soft">
                  <span className="font-headline text-[0.68rem] not-italic uppercase tracking-[0.16em] text-ink">Pictured: </span>
                  Karlo Roel Montenegro, frontend developer and Computer Science student.
                </figcaption>
              </figure>

              {/* Front-page story */}
              <article className="order-2 md:col-span-5 lg:order-3 lg:col-span-3 lg:pl-6">
                <p className="kicker">Front Page Story</p>
                <h2 className="mt-1 font-headline text-[2rem] font-bold uppercase leading-[0.95] text-ink">
                  Building interfaces. <span className="text-press">Connecting data &amp; AI.</span>
                </h2>
                <p className="drop-cap mt-4 text-pretty text-[1.02rem] leading-relaxed text-ink-soft hyphens-auto">
                  Hi, I&apos;m <strong className="font-semibold text-ink">Karlo Roel Montenegro</strong> — a frontend developer and Computer Science student focused on data science, data analysis, data engineering, and AI automation. I build responsive web experiences and explore how data and automation can make everyday workflows more useful.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href="#work" className="ink-btn">
                    Explore Projects
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="ink-btn-outline">
                    <Github className="h-4 w-4" aria-hidden="true" />
                    GitHub
                  </a>
                </div>
              </article>

              {/* Availability box */}
              {/* Tall column on desktop; a three-part strip under the photo and story on tablets. */}
              <aside aria-label="Availability and focus areas" className="order-3 md:col-span-12 lg:order-1 lg:col-span-3 lg:pr-6">
                <div className="bg-ink px-5 py-6 text-center text-paper-light md:grid md:grid-cols-3 md:items-center md:py-5 lg:block lg:py-6">
                  <div className="md:px-4 lg:px-0">
                    <p className="font-headline text-[0.7rem] uppercase tracking-[0.3em] text-paper-deep">Now open to</p>
                    <p className="mt-1 font-headline text-[2.4rem] font-bold uppercase leading-none md:text-[2.1rem] lg:text-[1.85rem] xl:text-[2.3rem]">Internships</p>
                    <p className="mt-2 font-headline text-sm uppercase tracking-[0.16em]">Early-career roles</p>
                    <p className="font-serif text-sm italic text-paper-deep">&amp; project collaborations</p>
                  </div>
                  <div className="my-4 border-t border-paper-light/40 md:hidden lg:block" aria-hidden="true" />
                  <div className="md:border-l md:border-paper-light/30 md:px-4 lg:border-0 lg:px-0">
                    <p className="font-headline text-[0.7rem] uppercase tracking-[0.3em] text-paper-deep">Professional focus areas</p>
                    <ul className="mt-2 space-y-1 font-headline text-lg uppercase leading-tight tracking-wide md:text-base lg:text-lg">
                      {focusAreas.map(({ title }) => (
                        <li key={title}>{title}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="my-4 border-t border-paper-light/40 md:hidden lg:block" aria-hidden="true" />
                  <div className="md:self-stretch md:border-l md:border-paper-light/30 md:px-4 lg:border-0 lg:px-0">
                    <p className="font-serif text-lg italic md:flex md:h-full md:items-center md:justify-center lg:block lg:h-auto">Computer Science student</p>
                  </div>
                </div>
              </aside>
            </div>

            {/* Inside this edition */}
            <nav aria-label="Inside this edition" className="mt-10 border-y-2 border-ink py-3">
              <ul className="grid grid-cols-1 gap-x-6 gap-y-2 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {sectionLinks.slice(1).map((link, index) => (
                  <li key={link.href}>
                    <a href={link.href} className="group flex items-baseline gap-2 py-1.5">
                      <span className="font-headline text-lg font-bold leading-none text-press">{index + 2}</span>
                      <span className="font-headline text-[0.78rem] uppercase tracking-[0.14em] text-ink group-hover:underline">{link.label}</span>
                      <span className="ml-auto font-serif text-xs italic text-ink-muted">Page {index + 2}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </section>

          {/* Selected Work */}
          <section id="work" aria-labelledby="work-heading" className="scroll-mt-20 pt-16 md:pt-20">
            <Reveal>
              <SectionHeading
                id="work-heading"
                kicker="Portfolio Showcase"
                title="Selected Work"
                description="Frontend applications and data-driven concepts, from real-time booking interfaces to forecasting and automated monitoring."
              >
                <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
                  {filterTabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      aria-pressed={activeFilter === tab.id}
                      onClick={() => setActiveFilter(tab.id)}
                      className={`min-h-9 border border-ink px-3 py-2 font-headline text-[0.72rem] uppercase tracking-[0.14em] transition-colors ${
                        activeFilter === tab.id ? "bg-ink text-paper-light" : "text-ink hover:bg-paper-deep"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </SectionHeading>
            </Reveal>

            {/* Keyed by filter so each category starts again from its first project. */}
            <Reveal key={`stack-${activeFilter}`}>
              <ProjectStack key={activeFilter} projects={filteredProjects} onOpen={openProjectDetail} />
            </Reveal>
          </section>

          {/* Skills & Focus Areas */}
          <section id="tech" aria-labelledby="tech-heading" className="scroll-mt-20 pt-16 md:pt-20">
            <Reveal>
              <SectionHeading
                id="tech-heading"
                kicker="Technical Capability"
                title="Skills & Focus Areas"
                description="Five connected areas that shape my work and learning: frontend development, data science, data analysis, data engineering, and AI automation."
              />
            </Reveal>
            <div className="article-grid cols-5 border-b border-ink/55">
              {focusAreas.map(({ title, icon: Icon, description, topics }, index) => (
                <Reveal key={title} delay={index * 0.05}>
                  <article>
                    <div className="flex items-center gap-2 text-press">
                      <span className="font-headline text-sm font-bold tracking-[0.12em]">{String(index + 1).padStart(2, "0")}</span>
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <h3 className="mt-2 font-headline text-2xl font-bold uppercase leading-none text-ink">{title}</h3>
                    <p className="mt-3 text-pretty text-[0.94rem] leading-relaxed text-ink-soft hyphens-auto">{description}</p>
                    <p className="mt-4 font-headline text-[0.64rem] uppercase tracking-[0.22em] text-ink-muted">Keywords</p>
                    <ul className="mt-1.5 flex flex-wrap gap-1.5">
                      {topics.map((topic) => (
                        <li key={topic} className="border border-ink/60 px-1.5 py-0.5 font-headline text-[0.68rem] uppercase tracking-[0.08em] text-ink">
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section id="certifications" aria-labelledby="certifications-heading" className="scroll-mt-20 pt-16 md:pt-20">
            <Reveal>
              <Link
                href="/certifications"
                aria-label="View certifications"
                className="group block border-[6px] border-double border-ink bg-paper-light/50 px-5 py-7 text-center transition-colors hover:bg-paper-light sm:px-10 sm:py-9"
              >
                <p className="kicker">Public Notice</p>
                <h2 id="certifications-heading" className="mt-1 font-headline text-[2.1rem] font-bold uppercase leading-none text-ink min-[400px]:text-[2.6rem] md:text-6xl">
                  Certifications
                </h2>
                <p className="mx-auto mt-3 max-w-xl font-serif italic leading-relaxed text-ink-soft">
                  DataCamp course-completion certificates in data science, data engineering, and SQL.
                </p>
                <span className="mt-5 inline-flex items-center gap-2 font-headline text-sm font-semibold uppercase tracking-[0.2em] text-ink transition-colors group-hover:text-press">
                  View
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          </section>

          {/* About */}
          <section id="about" aria-labelledby="about-heading" className="scroll-mt-20 pt-16 md:pt-20">
            <Reveal>
              <SectionHeading id="about-heading" kicker="Background" title="Get to Know Me" />
            </Reveal>
            {/* Byline on its own row, so the text columns and Core Principles start on the same line. */}
            <div className="grid gap-x-10 gap-y-5 lg:grid-cols-12">
              <Reveal className="lg:col-span-8">
                <div className="border-b border-ink/40 pb-4">
                  <p className="font-headline text-sm uppercase tracking-[0.16em] text-ink">By Karlo Roel Montenegro</p>
                  <p className="font-serif text-sm italic text-ink-muted">Computer Science student</p>
                </div>
              </Reveal>
              <Reveal className="lg:col-span-8 lg:row-start-2">
                {/* Two explicit columns: portrait and opening paragraph on the left, the rest on the right. */}
                <div className="grid gap-4 text-[1.02rem] leading-relaxed text-ink-soft md:grid-cols-2 md:gap-0">
                  <div className="space-y-5 md:pr-8">
                    <figure className="mx-auto max-w-[15rem]">
                      <div className="relative aspect-[4/5] overflow-hidden border border-ink bg-paper-light">
                        <Image
                          src={ABOUT_PHOTO}
                          alt="Black-and-white portrait of Karlo Roel Montenegro in a dark sweater, head tilted slightly, against a plain wall."
                          fill
                          sizes="240px"
                          className="press-photo object-cover object-[50%_35%]"
                        />
                      </div>
                      <figcaption className="mt-2 text-center font-serif text-[0.78rem] italic leading-snug text-ink-soft">
                        <span className="font-headline text-[0.66rem] not-italic uppercase tracking-[0.16em] text-ink">The columnist: </span>
                        Karlo Roel Montenegro.
                      </figcaption>
                    </figure>
                    <p className="news-body">
                      I&apos;m Karlo, a Computer Science student building my career across frontend development, data science, data analysis, data engineering, and AI automation. I enjoy connecting what people see on a screen with the data and workflows that make an application useful.
                    </p>
                  </div>
                  <div className="space-y-4 md:border-l md:border-ink/45 md:pl-8">
                    <p className="news-body">
                      My frontend work uses React, Next.js, and TypeScript to create responsive interfaces. My data interests extend from exploring patterns and communicating insights to predictive modeling and the pipelines that prepare data for analysis. Trible and Metropolis reflect my frontend focus, while DalAni and Artery explore data collection, forecasting, and decision support. Uritect, an offline Android app that reads urine dipstick strips and supports UTI screening on the device, placed Top 7 out of 90 participants in Region 6 during PSC XI.
                    </p>
                    <p className="news-body">
                      I&apos;m also developing my skills in AI automation: connecting tools and APIs, reducing repetitive tasks, and checking the quality of automated results. I&apos;m open to internships, early-career roles, and project collaborations where I can contribute, learn from a team, and turn these interests into useful applications.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal className="mt-5 lg:col-span-4 lg:col-start-9 lg:row-start-2 lg:mt-0" delay={0.08}>
                <aside aria-labelledby="principles-heading" className="border-2 border-ink bg-paper-light/40">
                  <h3 id="principles-heading" className="bg-ink px-4 py-2 font-headline text-sm uppercase tracking-[0.2em] text-paper-light">
                    Core Principles
                  </h3>
                  <ol className="divide-y divide-ink/30 px-5">
                    {corePrinciples.map((principle, index) => (
                      <li key={principle.title} className="flex gap-4 py-4">
                        <span className="font-headline text-4xl font-bold leading-none text-press" aria-hidden="true">{index + 1}</span>
                        <div>
                          <h4 className="font-headline text-lg font-semibold uppercase leading-tight text-ink">{principle.title}</h4>
                          <p className="mt-1 text-[0.92rem] leading-relaxed text-ink-soft">{principle.text}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </aside>
              </Reveal>
            </div>
          </section>

          {/* Contact */}
          <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-20 pb-16 pt-16 md:pb-24 md:pt-24">
            <Reveal>
              <div className="rule-thick-thin" aria-hidden="true" />
              <div className="py-10 text-center md:py-14">
                <p className="kicker">Contact</p>
                <h2
                  id="contact-heading"
                  className="mx-auto mt-2 font-headline text-[clamp(1.6rem,7vw,5.6rem)] font-bold uppercase leading-[0.92] text-ink"
                >
                  <span className="whitespace-nowrap">Let&apos;s build something</span> <br />
                  <span className="text-press">extraordinary together.</span>
                </h2>
                <p className="mx-auto mt-5 max-w-2xl font-serif text-lg italic leading-relaxed text-ink-soft">
                  Open to internships, early-career opportunities, and collaborations in frontend development, data science, data analysis, data engineering, and AI automation.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <button type="button" onClick={() => setIsContactModalOpen(true)} className="ink-btn btn-lg">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                    Get in Touch
                  </button>
                  <button type="button" onClick={handleCopyEmail} className="ink-btn-outline btn-lg">
                    <Copy className="h-5 w-5" aria-hidden="true" />
                    Copy Email
                  </button>
                </div>
              </div>
              <div className="rule-thick-thin" aria-hidden="true" />
            </Reveal>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-ink text-paper-light">
          <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-4 px-4 py-5 text-center font-headline text-[0.68rem] uppercase tracking-[0.2em] sm:flex-row sm:px-6 sm:text-left lg:px-10">
            <p>© Karlo Roel Montenegro. Frontend, Data &amp; AI Automation.</p>
            <div className="flex items-center gap-5">
              <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 py-2.5 transition-colors hover:text-paper-deep">
                <Github className="h-4 w-4" aria-hidden="true" />
                GitHub
              </a>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="border border-paper-light/60 p-2 transition-colors hover:bg-paper-light hover:text-ink"
                aria-label="Back to top"
                title="Back to Top"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
