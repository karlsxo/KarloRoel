"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { 
  ArrowUpRight, 
  Github, 
  Mail, 
  Code2, 
  Cpu, 
  Globe, 
  Database,
  X,
  ExternalLink,
  Award,
  Zap,
  Target,
  Users,
  Lightbulb,
  ChevronRight,
  Sparkles,
  Copy,
  Check,
  Layers,
  Terminal,
  ShieldCheck,
  Activity,
  ArrowUp,
  Maximize2
} from "lucide-react";
import Image from "next/image";

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
  subtitle: "Data-informed IoT cold-chain monitoring",
  category: "ai-iot",
  shortDescription: "A data collection and decision-support concept for reducing post-harvest loss through sensor monitoring, risk scoring, and clearer cold-chain visibility.",
  fullDescription: "DalAni is an end-to-end logistics concept for Philippine agricultural cooperatives. It combines low-cost ESP32 sensors with a cloud-based data workflow to collect temperature, humidity, and location signals in real time. Those signals are translated into spoilage-risk insights, alerts, and route decisions that help teams respond before produce deteriorates.",
  problemStatement: "Over 33% to 40% of harvested produce in the Philippines spoils during transport due to non-refrigerated vehicles, lack of ambient tracking, and severe traffic delays. For every 10°C rise in temperature, fruit deterioration doubles, wiping out farmer earnings and straining food security.",
  solution: "DalAni collects micro-climate data using ESP32, DHT11 sensors, and GPS/GPRS modules, then turns those observations into a dynamic spoilage-risk score. When conditions move beyond the defined threshold, the system provides driver alerts and supports cooling and route decisions through one shared operational view.",
  targetMarket: "9,000+ farmer cooperatives nationwide in the Philippines, acting as administrative hubs for smallholder mango and high-value crop growers.",
  uniqueValue: "It connects reliable field data with practical decisions: teams can monitor conditions, identify risk earlier, and use a transparent record of transit conditions to support quality assessments.",
  tags: ["Data Collection", "Risk Analytics", "Agri-Tech", "Cold-Chain"],
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
  subtitle: "Predictive analytics for blood supply operations",
  category: "health-tech",
  shortDescription: "A data-driven supply network concept that gives hospitals shared inventory visibility, demand insights, and traceable records for faster decisions.",
  fullDescription: "Artery is a healthcare logistics concept that brings blood banks, regional hospitals, and emergency donors into one transparent dashboard. It combines live inventory data with demand forecasting and traceability so teams can understand supply conditions, anticipate pressure points, and coordinate response more effectively.",
  problemStatement: "Philippine hospitals suffer from severe blood inventory fragmentation, lack of inter-hospital visibility, expired blood units due to poor demand forecasting, and life-threatening delays in matching rare blood types during critical emergencies.",
  solution: "Artery unifies blood bank inventories nationwide into a live grid. Machine learning predicts upcoming demand spikes per blood group, while smart contracts track blood unit storage temperatures and expiry dates on an immutable ledger.",
  targetMarket: "Hospitals, Red Cross blood centers, regional health units, and emergency patient networks.",
  uniqueValue: "It brings operational data, forecasting, and auditability together so healthcare teams can make supply decisions with more context and accountability.",
  tags: ["Data Analytics", "Demand Forecasting", "Health-Tech", "Supply Chain"],
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

const tribleProject: ProjectData = {
  id: "trible",
  title: "Trible",
  subtitle: "User-centered campus mobility platform",
  category: "web-ui",
  shortDescription: "A user-centered booking experience that makes driver availability, seat capacity, routes, and trip communication easier to understand and act on.",
  fullDescription: "Trible is a personal project commissioned by an Agricultural Engineering student. It explores how a real-time campus mobility service can make transportation information easier to scan and use for both riders and drivers. The experience brings availability, routes, terminals, seat bookings, and communication into one workflow designed around quicker decisions and clearer status updates.",
  problemStatement: "Students often struggle with unreliable transportation, long waiting times, and unclear driver availability at campus terminals. Without a proper booking system, riders are forced to wait in queues, guess which drivers are available, or miss transport opportunities altogether. Drivers also face difficulty managing passenger demand and updating their route and seat status in real time.",
  solution: "Trible solves this by providing a real-time booking platform where students can see active drivers, available seats, terminal locations, and routes. Drivers can update their online status, destination, terminal, and seat count instantly, allowing passengers to make quick decisions and reserve rides with confidence.",
  targetMarket: "College and university students, tricycle drivers operating in campus or local transport routes, campus transport coordinators and transport service users, and students who travel regularly between terminals and campus zones.",
  uniqueValue: "Trible combines real-time visibility, booking, status management, and communication in one focused workflow that reduces uncertainty for both riders and drivers.",
  tags: ["UX Design", "Real-Time Data", "Campus Mobility", "Booking Flow"],
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
  subtitle: "UI/UX concept for data-rich urban interfaces",
  category: "web-ui",
  shortDescription: "A UI/UX concept exploring how complex urban signals can become clear, responsive, and engaging through hierarchy, motion, and interactive data views.",
  fullDescription: "Metropolis is a conceptual UI/UX application focused on presenting smart-city monitoring, transportation nodes, and urban metrics through an expressive interface. Built with Next.js and responsive interaction patterns, it explores how visual hierarchy and motion can make data-rich experiences easier to navigate and understand.",
  problemStatement: "Standard urban dashboards suffer from cluttered user interfaces and lack engaging visual storytelling, making complex urban data difficult to comprehend.",
  solution: "Metropolis translates complex urban metrics into structured dashboard views with clear visual grouping, responsive layouts, smooth transitions, and interactive ambient styling.",
  targetMarket: "Design enthusiasts, urban tech developers, and digital experience innovators.",
  uniqueValue: "It treats visual design as an information-design problem, using hierarchy, motion, and responsive layouts to make complex interfaces more legible and engaging.",
  tags: ["UI/UX Design", "Data Visualization", "Next.js", "Interactive"],
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

const projectsData: ProjectData[] = [dalaniProject, tribleProject, arteryProject, metropolisProject];

// --- Spotlight Mouse Tracking Card ---
// This component adds a subtle cursor-reactive glow for cards while preserving
// a clean, low-overhead interaction pattern for the portfolio gallery.
const SpotlightCard = ({ 
  children, 
  className = "",
  onClick 
}: { 
  children: React.ReactNode; 
  className?: string;
  onClick?: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className={`spotlight-card scroll-glass rounded-3xl ${className}`}
    >
      {children}
    </div>
  );
};

// --- Reusable Scroll Section ---
// The section wrapper applies a consistent motion-based reveal and scroll fade so
// each content block feels premium without requiring custom logic on every page.
const Section = ({ 
  children, 
  className = "", 
  id 
}: { 
  children: React.ReactNode; 
  className?: string; 
  id?: string;
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.35 });
  const opacity = useTransform(progress, [0, 0.16, 0.82, 1], [0.38, 1, 1, 0.48]);
  const y = useTransform(progress, [0, 0.16, 0.82, 1], [74, 0, 0, -58]);
  const scale = useTransform(progress, [0, 0.16, 0.82, 1], [0.955, 1, 1, 0.965]);
  const filter = useTransform(progress, [0, 0.16, 0.82, 1], ["blur(8px)", "blur(0px)", "blur(0px)", "blur(5px)"]);

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className={`relative z-10 min-h-[72svh] px-6 py-20 md:py-28 max-w-7xl mx-auto ${className}`}
      style={shouldReduceMotion ? undefined : { opacity, y, scale, filter }}
    >
      {children}
    </motion.section>
  );
};

const AuroraGlassTransition = () => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 72, damping: 26, mass: 0.45 });
  const primaryY = useTransform(progress, [0, 0.3, 0.68, 1], ["-28vh", "18vh", "42vh", "-6vh"]);
  const secondaryY = useTransform(progress, [0, 0.35, 0.72, 1], ["58vh", "-4vh", "62vh", "16vh"]);
  const tertiaryY = useTransform(progress, [0, 0.4, 1], ["78vh", "22vh", "64vh"]);
  const primaryX = useTransform(progress, [0, 0.5, 1], ["-16vw", "12vw", "-6vw"]);
  const secondaryX = useTransform(progress, [0, 0.5, 1], ["16vw", "-14vw", "9vw"]);
  const primaryRotate = useTransform(progress, [0, 1], [-16, 14]);
  const secondaryRotate = useTransform(progress, [0, 1], [13, -12]);
  const glassOpacity = useTransform(progress, [0, 0.2, 0.5, 0.8, 1], [0.04, 0.22, 0.38, 0.2, 0.06]);
  const glassScale = useTransform(progress, [0, 0.5, 1], [0.88, 1.1, 0.93]);
  const foregroundY = useTransform(progress, [0, 0.3, 0.72, 1], ["-42vh", "6vh", "46vh", "8vh"]);
  const foregroundX = useTransform(progress, [0, 0.5, 1], ["-14vw", "10vw", "-4vw"]);
  const foregroundRotate = useTransform(progress, [0, 1], [-12, 11]);
  const foregroundOpacity = useTransform(progress, [0, 0.12, 0.46, 0.82, 1], [0, 0.5, 0.68, 0.42, 0.12]);
  const foregroundScale = useTransform(progress, [0, 0.5, 1], [0.82, 1.08, 0.94]);

  return (
    <>
      <div className="aurora-environment" aria-hidden="true">
        <motion.div
          className="aurora-orb aurora-orb-primary"
          style={shouldReduceMotion ? undefined : { x: primaryX, y: primaryY, rotate: primaryRotate }}
        />
        <motion.div
          className="aurora-orb aurora-orb-secondary"
          style={shouldReduceMotion ? undefined : { x: secondaryX, y: secondaryY, rotate: secondaryRotate }}
        />
        <motion.div
          className="aurora-orb aurora-orb-tertiary"
          style={shouldReduceMotion ? undefined : { y: tertiaryY }}
        />
        <motion.div
          className="aurora-transition-glass"
          style={shouldReduceMotion ? undefined : { opacity: glassOpacity, scale: glassScale }}
        />
      </div>
      <motion.div
        className="aurora-foreground-wave"
        aria-hidden="true"
        style={shouldReduceMotion ? undefined : { x: foregroundX, y: foregroundY, rotate: foregroundRotate, opacity: foregroundOpacity, scale: foregroundScale }}
      />
      <motion.div className="scroll-progress" aria-hidden="true" style={{ scaleX: progress }} />
    </>
  );
};

// Keeps scroll reveals consistent while honoring each visitor's motion preference.
const Reveal = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 28, filter: "blur(6px)" }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.62, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

// --- Contact Modal ---
// This modal opens the user’s default email client with a prefilled message to keep
// the contact flow lightweight and uncluttered for portfolio visitors.
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    const mailtoLink = `mailto:montenegrokarlo@gmail.com?subject=${subject}&body=${body}`;

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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 16 }}
            className="glass-panel relative w-full max-w-lg rounded-3xl p-8 md:p-10 shadow-2xl border border-slate-200 bg-white/90"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-cyan-50 border border-cyan-200 rounded-2xl text-cyan-600">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Let&apos;s Connect</h3>
            </div>
            <p className="text-slate-600 text-sm mb-6">Send a direct message or collaboration inquiry. I usually respond within 24 hours.</p>

            {submitStatus === 'success' ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200 shadow-sm">
                  <Check className="w-8 h-8 text-emerald-600" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-1">Opening Email Client...</h4>
                <p className="text-slate-600 text-sm">Thank you for reaching out!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-cyan-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-sm"
                    placeholder="e.g. Alex Morgan"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-cyan-700 mb-2">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-sm"
                    placeholder="alex@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-cyan-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-sm resize-none"
                    placeholder="Tell me about your project, co-op opportunity, or idea..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-md hover:shadow-lg shimmer-btn text-sm"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Preparing Message...
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4" />
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
// The detailed modal groups project context, architecture notes, key features, and
// image previews into a single storytelling experience for each selected work item.
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-xl overflow-y-auto"
          onClick={onClose}
        >
          {/* Close Button */}
          <button 
            onClick={onClose} 
            className="fixed top-6 right-6 p-3 bg-white hover:bg-slate-100 text-slate-800 rounded-full backdrop-blur-md border border-slate-200 transition-all z-50 shadow-lg"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="min-h-full py-12 px-4 md:px-8">
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 24 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Banner */}
              <div className="glass-panel rounded-3xl p-8 md:p-10 mb-8 border-slate-200 bg-white/90 shadow-lg">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-md bg-cyan-50 text-cyan-700 text-[11px] font-bold uppercase tracking-wider border border-cyan-200">
                      {tag}
                    </span>
                  ))}
                </div>

                <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-3 tracking-tight">{project.title}</h1>
                <p className="text-lg md:text-xl text-fuchsia-600 font-semibold mb-6">{project.subtitle}</p>

                {project.achievements && project.achievements.length > 0 && (
                  <div className="flex flex-wrap gap-3 pt-2">
                    {project.achievements.map((ach, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 px-4 py-2 bg-purple-50 border border-purple-200 rounded-xl text-purple-800 text-sm font-semibold shadow-xs">
                        <Award className="w-4 h-4 text-purple-600 shrink-0" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Navigation Tabs */}
              <div className="flex gap-2 mb-8 border-b border-slate-200 pb-4 overflow-x-auto">
                {[
                  { id: 'overview', label: 'Overview & Impact' },
                  { id: 'features', label: 'Architecture & Features' },
                  {
                    id: 'gallery',
                    label:
                      project.id === 'trible' && project.galleryReplacementUrl
                        ? 'Live Site'
                        : `Gallery (${project.images.length})`
                  }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`px-6 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-pink-500 text-white shadow-lg shadow-cyan-500/30'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 border border-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="space-y-6"
                  >
                    {/* Full Description */}
                    <div className="glass-panel rounded-3xl p-8 bg-white/90 border-slate-200">
                      <h3 className="text-xl font-bold text-slate-900 mb-3">Project Summary</h3>
                      <p className="text-slate-600 leading-relaxed text-base md:text-lg">{project.fullDescription}</p>
                    </div>

                    {/* Problem vs Solution Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="glass-panel rounded-3xl p-8 bg-white/90 border-rose-200">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2.5 bg-rose-50 rounded-xl border border-rose-200 text-rose-600">
                            <Target className="w-5 h-5" />
                          </div>
                          <h3 className="text-lg font-bold text-slate-900">The Problem</h3>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">{project.problemStatement}</p>
                      </div>

                      <div className="glass-panel rounded-3xl p-8 bg-white/90 border-cyan-200">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2.5 bg-cyan-50 rounded-xl border border-cyan-200 text-cyan-600">
                            <Lightbulb className="w-5 h-5" />
                          </div>
                          <h3 className="text-lg font-bold text-slate-900">The Solution</h3>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">{project.solution}</p>
                      </div>
                    </div>

                    {/* Target Market & UVP */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="glass-panel rounded-3xl p-8 bg-white/90 border-purple-200">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2.5 bg-purple-50 rounded-xl border border-purple-200 text-purple-600">
                            <Users className="w-5 h-5" />
                          </div>
                          <h3 className="text-lg font-bold text-slate-900">Target Audience & Reach</h3>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">{project.targetMarket}</p>
                      </div>

                      <div className="glass-panel rounded-3xl p-8 bg-white/90 border-emerald-200">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-600">
                            <Zap className="w-5 h-5" />
                          </div>
                          <h3 className="text-lg font-bold text-slate-900">Unique Proposition</h3>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">{project.uniqueValue}</p>
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="glass-panel rounded-3xl p-8 bg-white/90 border-slate-200">
                      <h3 className="text-lg font-bold text-slate-900 mb-4">Built With</h3>
                      <div className="flex flex-wrap gap-2.5">
                        {project.technologies.map((tech) => (
                          <span key={tech} className="px-3.5 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-700 text-xs font-semibold shadow-2xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'features' && (
                  <motion.div
                    key="features"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {project.features.map((feature, idx) => (
                      <div key={idx} className="glass-panel rounded-3xl p-8 bg-white/90 border-slate-200">
                        <div className="flex items-center gap-3.5 mb-3">
                          <div className="p-3 bg-cyan-50 rounded-2xl border border-cyan-200 text-cyan-600">
                            <feature.icon className="w-5 h-5" />
                          </div>
                          <h3 className="text-lg font-bold text-slate-900">{feature.title}</h3>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'gallery' && (
                  project.id === 'trible' && project.galleryReplacementUrl ? (
                    <motion.div
                      key="gallery-live-site"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      className="glass-panel rounded-3xl p-8 bg-white/90 border-slate-200"
                    >
                      <h3 className="text-xl font-bold text-slate-900 mb-3">Visit Trible Live</h3>
                      <p className="text-slate-500 text-sm mb-3">Prototype build — core functionality first, not a fully finished release.</p>
                      <a
                        href={project.galleryReplacementUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-pink-500 text-white shadow-lg shadow-cyan-500/30 hover:opacity-95 transition-opacity"
                      >
                        Open trible-gamma.vercel.app
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="gallery"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                    >
                      {project.images.map((img, idx) => (
                        <div 
                          key={idx}
                          onClick={() => setSelectedLightboxImage(img)}
                          className="group glass-panel relative aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer bg-slate-100 border-slate-200 shadow-xs hover:border-cyan-500 transition-all p-3"
                        >
                          <div className="relative w-full h-full">
                            <Image 
                              src={img} 
                              alt={`${project.title} screenshot ${idx + 1}`}
                              fill
                              className="object-contain group-hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          </div>
                          <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                            <div className="px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg">
                              <Maximize2 className="w-3.5 h-3.5" /> Expand
                            </div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Lightbox Modal */}
      {selectedLightboxImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] bg-slate-900/60 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setSelectedLightboxImage(null)}
        >
          <button 
            onClick={() => setSelectedLightboxImage(null)}
            className="absolute top-6 right-6 p-3 bg-white/20 text-white hover:bg-white/40 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative max-w-4xl max-h-[85vh] w-full h-full flex items-center justify-center p-4">
            <Image
              src={selectedLightboxImage}
              alt="Expanded Preview"
              fill
              className="object-contain"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Main Portfolio Page ---
// This is the top-level page composition: hero content, project filtering, stack
// overview, about section, and the final call-to-action for potential clients or teams.
export default function Portfolio() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isProjectDetailOpen, setIsProjectDetailOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "ai-iot" | "health-tech" | "web-ui">("all");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("montenegrokarlo@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
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
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900 font-sans selection:bg-pink-500/30 selection:text-pink-900">
      {/* Scroll-linked Aurora & Glass Environment */}
      <AuroraGlassTransition />
      <div className="noise-overlay" />

      {/* Floating Toast Alert for Email Copy */}
      <AnimatePresence>
        {copiedEmail && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-[110] px-4 py-2.5 bg-white text-slate-900 text-xs font-bold rounded-xl shadow-2xl border border-emerald-300 flex items-center gap-2 backdrop-blur-md"
          >
            <Check className="w-4 h-4 text-emerald-600" />
            Email copied to clipboard! (montenegrokarlo@gmail.com)
          </motion.div>
        )}
      </AnimatePresence>

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

      {/* Floating Frosted Glass Navbar */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-6xl">
        <nav className="glass-panel scroll-glass rounded-full px-5 py-3 flex items-center justify-between shadow-md border border-slate-200/80 bg-white/80 backdrop-blur-xl">
          <a href="#" className="flex items-center gap-2.5 text-slate-900 font-extrabold text-sm md:text-base group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 via-fuchsia-500 to-pink-500 p-[1.5px] shadow-xs group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center text-xs font-black text-white">
                KR
              </div>
            </div>
            <span className="hidden sm:inline tracking-tight font-bold text-slate-900">Karlo Montenegro</span>
          </a>

          <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <a href="#work" className="hover:text-cyan-600 transition-colors">Work</a>
            <a href="#tech" className="hover:text-cyan-600 transition-colors">Tech Architecture</a>
            <a href="#about" className="hover:text-cyan-600 transition-colors">About</a>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={handleCopyEmail}
              className="p-2 text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-full border border-slate-200 transition-all text-xs font-semibold hidden sm:flex items-center gap-1.5 backdrop-blur-md"
              title="Copy email"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Email</span>
            </button>

            <button
              onClick={() => setIsContactModalOpen(true)}
              className="px-4 py-2 text-white rounded-full font-bold text-xs transition-all shadow-sm shimmer-btn"
            >
              Contact Me
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-shell relative z-10 min-h-[88svh] pt-36 pb-20 md:pt-44 md:pb-28 px-6 max-w-6xl mx-auto text-center md:text-left flex flex-col items-center md:items-start justify-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center md:items-start"
        >
          {/* Gemini Badge */}
          <div className="gemini-badge inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-cyan-800 mb-8 border border-cyan-300">
            <Sparkles className="w-4 h-4 text-cyan-600 animate-spin" style={{ animationDuration: '6s' }} />
            <span>UI/UX, Data & Technology</span>
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse ml-1" />
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 mb-6 leading-[1.08]">
            Designing clearer <br />
            <span className="aurora-text whitespace-nowrap">digital and data experiences.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-600 font-medium max-w-2xl leading-relaxed mb-10">
            Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-fuchsia-600 to-pink-600 font-bold">Karlo Roel Montenegro</span> — a Computer Science student exploring UI/UX, data analysis, and data-driven software systems. I turn complex workflows and information into practical, understandable digital experiences.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center md:justify-start gap-3.5 mb-14">
            <a 
              href="#work" 
              className="px-7 py-3.5 text-white rounded-full font-bold text-sm transition-all shadow-lg flex items-center gap-2 shimmer-btn"
            >
              Explore Projects
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a 
              href="https://github.com/karlsxo/KarloRoel" 
              target="_blank" 
              rel="noreferrer" 
              className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 hover:border-cyan-400 rounded-full font-bold text-sm shadow-xs transition-all flex items-center gap-2 backdrop-blur-md"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>

        </motion.div>
      </section>

      {/* Selected Work Section */}
      <Section id="work" className="section-glow">
        <Reveal>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-cyan-600 font-bold text-xs uppercase tracking-wider mb-2">
              <Layers className="w-4 h-4" /> Portfolio Showcase
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Selected Work</h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-white/80 border border-slate-200 rounded-2xl backdrop-blur-md overflow-x-auto shadow-xs">
            {[
              { id: "all", label: "All Projects" },
              { id: "ai-iot", label: "AI & IoT" },
              { id: "health-tech", label: "Health-Tech" },
              { id: "web-ui", label: "Web & UI/UX" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as typeof activeFilter)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeFilter === tab.id
                    ? "bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-pink-500 text-white shadow-lg shadow-cyan-500/25"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Reveal key={project.id} className="h-full" delay={index * 0.07}>
              <SpotlightCard
              key={project.id}
              onClick={() => {
                if (project.externalUrl) {
                  window.open(project.externalUrl, "_blank");
                } else {
                  openProjectDetail(project.id);
                }
              }}
              className="cursor-pointer group flex flex-col h-full"
            >
              {/* Media Preview Box */}
              <div className="relative h-60 w-full bg-gradient-to-br from-slate-100 via-purple-50/60 to-slate-50 border-b border-slate-200/80 p-6 flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full scale-95 group-hover:scale-100 transition-transform duration-500">
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                </div>
                <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                  <span className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg">
                    {project.externalUrl ? "Visit Live Site" : "View Case Study"}
                    {project.externalUrl ? <ExternalLink className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-7 flex flex-col flex-1">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-md bg-cyan-50 text-[10px] font-bold uppercase tracking-wider text-cyan-700 border border-cyan-200">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-1 group-hover:text-cyan-600 transition-colors">{project.title}</h3>
                <p className="text-fuchsia-600 text-xs font-bold mb-3">{project.subtitle}</p>
                <p className="text-slate-600 text-xs leading-relaxed mb-6 flex-1">{project.shortDescription}</p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-200 text-xs font-bold text-slate-700">
                  <span className="text-cyan-600 font-semibold">{project.externalUrl ? "External Web App" : "Deep Dive Case Study"}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
        </Reveal>
      </Section>

      {/* Tech Architecture Section */}
      <Section id="tech" className="section-glow">
        <Reveal>
        <div className="mb-12">
          <div className="inline-flex items-center gap-1.5 text-fuchsia-600 font-bold text-xs uppercase tracking-wider mb-2">
            <Terminal className="w-4 h-4" /> Technical Capability
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">Core Stack & Technologies</h2>
          <p className="text-slate-600 text-sm max-w-xl">Tools and technical foundations I use to design interfaces, work with data, and build reliable software and connected systems.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Frontend */}
          <SpotlightCard className="p-7">
            <div className="p-3 bg-cyan-50 rounded-2xl border border-cyan-200 text-cyan-600 w-fit mb-5">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Frontend & UI/UX</h3>
            <p className="text-slate-500 text-xs leading-relaxed mb-4">Designing accessible, high-performance interfaces.</p>
            <div className="flex flex-wrap gap-1.5">
              {["React", "Next.js 16", "Tailwind CSS", "TypeScript", "Framer Motion"].map(t => (
                <span key={t} className="px-2.5 py-1 bg-white border border-slate-200 rounded-md text-[11px] font-semibold text-slate-700 shadow-2xs">
                  {t}
                </span>
              ))}
            </div>
          </SpotlightCard>

          {/* Backend */}
          <SpotlightCard className="p-7">
            <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200 text-purple-600 w-fit mb-5">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Data & Backend</h3>
            <p className="text-slate-500 text-xs leading-relaxed mb-4">Building application logic, APIs, and data-aware services.</p>
            <div className="flex flex-wrap gap-1.5">
              {["Python", "Java", "C++", "Node.js", "JavaScript", "REST APIs"].map(t => (
                <span key={t} className="px-2.5 py-1 bg-white border border-slate-200 rounded-md text-[11px] font-semibold text-slate-700 shadow-2xs">
                  {t}
                </span>
              ))}
            </div>
          </SpotlightCard>

          {/* AI & Hardware */}
          <SpotlightCard className="p-7">
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-600 w-fit mb-5">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">AI, Analytics & IoT</h3>
            <p className="text-slate-500 text-xs leading-relaxed mb-4">Connecting sensor data, analytical models, and practical decisions.</p>
            <div className="flex flex-wrap gap-1.5">
              {["ESP32", "TensorFlow", "DHT11 Sensor", "GPS/GPRS", "Flutter"].map(t => (
                <span key={t} className="px-2.5 py-1 bg-white border border-slate-200 rounded-md text-[11px] font-semibold text-slate-700 shadow-2xs">
                  {t}
                </span>
              ))}
            </div>
          </SpotlightCard>

          {/* Cloud & Databases */}
          <SpotlightCard className="p-7">
            <div className="p-3 bg-pink-50 rounded-2xl border border-pink-200 text-pink-600 w-fit mb-5">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Data Platforms & Tools</h3>
            <p className="text-slate-500 text-xs leading-relaxed mb-4">Managing structured data, development workflows, and deployment foundations.</p>
            <div className="flex flex-wrap gap-1.5">
              {["PostgreSQL", "Firebase", "SQL", "Docker", "Git", "AWS"].map(t => (
                <span key={t} className="px-2.5 py-1 bg-white border border-slate-200 rounded-md text-[11px] font-semibold text-slate-700 shadow-2xs">
                  {t}
                </span>
              ))}
            </div>
          </SpotlightCard>
        </div>
        </Reveal>
      </Section>

      {/* About Me Section */}
      <Section id="about" className="section-glow">
        <Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-1.5 text-cyan-600 font-bold text-xs uppercase tracking-wider mb-2">
              <Users className="w-4 h-4" /> Background
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">Get to Know Me</h2>
            <div className="space-y-4 text-slate-600 text-sm md:text-base leading-relaxed">
              <p>
                Glad you&apos;re here. I&apos;m a Computer Science student interested in the intersection of people, interfaces, and data. I enjoy understanding how a workflow works, where information becomes difficult to use, and how thoughtful design and engineering can make a tool more useful in practice.
              </p>
              <p>
                My approach combines user-centered UI/UX thinking with data analysis and software engineering fundamentals. I work toward interfaces that are clear and accessible, data workflows that are understandable and dependable, and systems that connect frontend experiences to practical backend logic. I use AI tools to support research, iteration, and debugging while keeping the reasoning and quality of the work grounded in fundamentals.
              </p>
              <p>
                As I prepare to step into the technology industry, I am developing my skills across interface design, data analysis, data engineering, application development, and cloud technologies. I enjoy working through ambiguous problems, learning new tools, and collaborating with people who care about making technology useful. I am open to internships, co-ops, project collaborations, and early-career opportunities in these areas.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <SpotlightCard className="p-8 space-y-6">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-4">Core Principles</h3>
              <div className="space-y-4 text-xs font-medium">
                <div className="flex gap-3.5 items-start">
                  <div className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center shrink-0 font-bold border border-cyan-300">1</div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-0.5">Clear User Experiences</h4>
                    <p className="text-slate-500">Interfaces should make important actions and information easy to understand.</p>
                  </div>
                </div>
                <div className="flex gap-3.5 items-start">
                  <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 font-bold border border-purple-300">2</div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-0.5">Useful Data Collection</h4>
                    <p className="text-slate-500">Reliable inputs create stronger analysis and more useful decisions.</p>
                  </div>
                </div>
                <div className="flex gap-3.5 items-start">
                  <div className="w-6 h-6 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center shrink-0 font-bold border border-pink-300">3</div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-0.5">Responsible Decisions</h4>
                    <p className="text-slate-500">Data should be traceable, contextualized, and applied with care.</p>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
        </Reveal>
      </Section>

      {/* Contact Section */}
      <section className="relative z-10 min-h-[72svh] py-24 md:py-32 border-t border-slate-200 flex items-center justify-center">
        <Reveal className="w-full">
        <div className="max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tight mb-6 text-center">
            Let&apos;s build something <br />
            <span className="aurora-text whitespace-nowrap">extraordinary together.</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto mb-10 text-center">
            I am currently open to UI/UX, data, and software opportunities across internships, co-ops, and project collaborations.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="px-8 py-4 text-white rounded-full font-bold text-base transition-all shadow-xl flex items-center gap-2.5 shimmer-btn"
            >
              <Mail className="w-5 h-5" />
              Get in Touch
            </button>
            <button
              onClick={handleCopyEmail}
              className="px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded-full font-bold text-base shadow-xs transition-all flex items-center gap-2 backdrop-blur-md"
            >
              <Copy className="w-5 h-5" />
              <span>Copy Email</span>
            </button>
          </div>
        </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 bg-white/80 border-t border-slate-200 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs font-semibold">
          <p>© Karlo Roel Montenegro. Made With Special Love.</p>
          
          <div className="flex items-center gap-6">
            <a href="https://github.com/karlsxo/KarloRoel" target="_blank" rel="noreferrer" className="hover:text-slate-900 transition-colors flex items-center gap-1">
              <Github className="w-4 h-4" /> GitHub
            </a>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-800 transition-colors border border-slate-200"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
