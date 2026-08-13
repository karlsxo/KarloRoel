"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  ChevronRight
} from "lucide-react";
import Image from "next/image";

// --- Project Data Types ---
interface ProjectFeature {
  title: string;
  description: string;
  icon: React.ElementType;
}

interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
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
  links?: { label: string; url: string }[];
}

// --- Project Data ---
const dalaniProject: ProjectData = {
  id: "dalani",
  title: "DalAni",
  subtitle: "IoT & AI Cold Chain Solution",
  shortDescription: "Solving the 40% post-harvest loss in Philippine agriculture through ESP32-based IoT modules and AI-backed quality verification.",
  fullDescription: "Project DalAni is a last-mile logistics solution for farmer cooperatives that technically integrates a low-cost IoT device with an AI-powered platform. The system's hardware, a compact module built around an ESP32 microcontroller, collects specific, real-time data from a GPS sensor (longitude and latitude) and a DHT11 sensor (ambient temperature and relative humidity). This data is transmitted via a simple GPRS cellular module to our cloud-based AI platform.",
  problemStatement: "The core problem we are solving is the massive and largely unaddressed issue of post-harvest loss. In the Philippines, this loss is not an abstract number; it is a tangible economic and social crisis. For our focus market of mango farmers, over 33% of their hard-earned produce is lost to spoilage. This is caused by inefficient transport in non-refrigerated, overpacked vehicles and a complete lack of real-time monitoring. This spoilage directly translates to lost income for farmers, contributes to national food insecurity, and exacerbates the carbon footprint of the agricultural sector.",
  solution: "A critical factor in this loss is temperature. For every 10°C increase in temperature, the rate of deterioration for most perishable fruits and vegetables can double or even triple. Our solution directly targets this relationship by making temperature management a central part of the logistics process through real-time monitoring and proactive intervention.",
  targetMarket: "Our ideal customer is the farmer cooperative. These organizations act as a collective body for small-scale farmers with the administrative and financial structure to invest in a solution that benefits all their members. We estimate there are over 9,000 such cooperatives nationwide, representing a large and receptive market.",
  uniqueValue: "Project DalAni stands apart from traditional logistics trackers and farm management apps because it is a proactive intervention system, not just a passive monitoring tool. While other systems may show you where a truck is, our AI platform predicts spoilage risk and recommends faster routes to avoid it. Moreover, our solution introduces a physical response: a mini cooling system that activates automatically when temperatures exceed a critical threshold.",
  tags: ["IoT", "AI", "Agri-Tech", "Last-Mile Logistics"],
  technologies: ["ESP32", "Flutter", "Python", "TensorFlow", "GPS Module", "DHT11 Sensor", "GPRS Module", "Firebase", "Google Maps API"],
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
      description: "The AI algorithm analyzes incoming data along with external feeds on traffic, road closures, and localized weather forecasts. It calculates the most efficient route for multi-stop pickups based on shortest possible route to save time and fuel, and identifying routes with the lowest average ambient temperature to minimize spoilage exposure.",
      icon: Target
    },
    {
      title: "Proactive Spoilage Prevention",
      description: "Our AI calculates a real-time 'Spoilage Risk' score (0-100) by processing live data including ambient temperature, relative humidity, and duration of exposure. The AI is pre-trained with scientific data on mangoes, understanding their ideal storage conditions are 10°C-13°C and 90-95% relative humidity. When the score crosses a critical threshold of 75, it automatically triggers a cooling mechanism and alerts the manager and driver.",
      icon: Zap
    },
    {
      title: "Yield and Quality Forecasting",
      description: "Using all gathered data—including real-time sensor data, route information, and triggered interventions—the AI generates a final 'Quality Score' for each batch of produce (e.g., 95 for a well-maintained trip vs. 60 for a high-risk one). This score is shared with buyers, adding transparency and trust to the supply chain, allowing farmers to justify premium prices for high-quality produce.",
      icon: Lightbulb
    },
    {
      title: "Verifiable Trust System",
      description: "Our unique 'Quality Score' provides a data-backed, objective score for the freshness of produce, creating unprecedented transparency. Farmers can prove the quality of their mangoes to buyers, and buyers can trust that the product meets a certain standard. This score becomes a new form of currency in the agricultural supply chain.",
      icon: Users
    }
  ],
  achievements: [
    "Top 10 Finalist - Innovation Olympics at University of the Philippines Los Baños (September 1-3, 2025)"
  ]
};

const arteryProject: ProjectData = {
  id: "artery",
  title: "Artery",
  subtitle: "AI-Powered Blood Supply Chain",
  shortDescription: "A unified real-time network for the Philippines' blood supply, integrating hospital dashboards and blockchain records.",
  fullDescription: "Artery is a revolutionary healthcare technology solution designed to modernize and streamline the Philippine blood supply chain. By leveraging AI and blockchain technology, we create a unified, real-time network that connects blood banks, hospitals, and donors across the nation.",
  problemStatement: "The Philippines faces critical challenges in blood supply management, including fragmented systems across hospitals and blood banks, lack of real-time inventory visibility, inefficient distribution leading to expired blood products, and difficulty matching donors with recipients in emergencies.",
  solution: "Artery provides a centralized platform that integrates all stakeholders in the blood supply chain. Our AI-powered system predicts demand, optimizes distribution, and ensures traceability through blockchain technology.",
  targetMarket: "Our primary customers are hospitals, blood banks, and healthcare facilities seeking to improve their blood supply management and reduce waste while ensuring patient safety.",
  uniqueValue: "Unlike traditional blood bank management systems, Artery uses AI to predict blood demand patterns and blockchain to ensure complete traceability and authenticity of blood products from donor to recipient.",
  tags: ["AI", "Blockchain", "Health-Tech", "Supply Chain"],
  technologies: ["React", "Node.js", "Blockchain", "TensorFlow", "PostgreSQL", "AWS", "Docker"],
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
      title: "Real-time Inventory Dashboard",
      description: "A comprehensive dashboard providing hospitals with instant visibility into blood product availability across the network, enabling quick decisions during emergencies.",
      icon: Target
    },
    {
      title: "AI Demand Prediction",
      description: "Machine learning algorithms analyze historical data to predict blood demand patterns, helping blood banks maintain optimal inventory levels and reduce wastage.",
      icon: Zap
    },
    {
      title: "Blockchain Traceability",
      description: "Every blood product is tracked on an immutable blockchain ledger from donation to transfusion, ensuring authenticity and enabling complete audit trails.",
      icon: Lightbulb
    },
    {
      title: "Smart Matching System",
      description: "AI-powered matching connects compatible donors with patients in need, prioritizing based on urgency, location, and blood type compatibility.",
      icon: Users
    }
  ],
  achievements: []
};

const projectsData: ProjectData[] = [dalaniProject, arteryProject];

// --- Utility Components ---

const Section = ({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) => (
  <section id={id} className={`relative z-10 px-6 py-24 md:py-32 max-w-7xl mx-auto ${className}`}>
    {children}
  </section>
);

const ProjectCard = ({ 
  title, 
  subtitle, 
  description,
  tags,
  onClick, 
  href,
  children,
  className = ""
}: { 
  title: string; 
  subtitle: string; 
  description: string;
  tags: string[];
  onClick?: () => void;
  href?: string;
  children?: React.ReactNode;
  className?: string;
}) => {
  const handleClick = () => {
    if (href) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={handleClick}
      className={`group glass-card flex flex-col rounded-3xl overflow-hidden hover:border-cyan-400/60 hover:shadow-xl hover:shadow-cyan-500/10 transition-all cursor-pointer h-full ${className}`}
    >
      {/* Image Container */}
      <div className="relative h-64 w-full bg-gradient-to-br from-slate-50/90 via-white to-cyan-50/40 border-b border-slate-200/60 overflow-hidden flex items-center justify-center p-8">
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 via-transparent to-pink-500/5 z-10" />
        {children}
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center justify-center backdrop-blur-sm">
          <div className="px-4 py-2 bg-slate-900 text-white rounded-full text-sm font-bold flex items-center gap-2 shadow-xl">
            {href ? "Visit Website" : "View Gallery"} 
            {href ? <ExternalLink className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-8 flex flex-col flex-1">
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span key={tag} className="px-2.5 py-1 rounded-md bg-cyan-50 text-[10px] font-bold uppercase tracking-wider text-cyan-800 border border-cyan-200/80 shadow-xs">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-1">{title}</h3>
        <p className="text-cyan-700 text-sm font-semibold mb-4">{subtitle}</p>
        <p className="text-slate-600 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// --- Contact Form Modal ---
const ContactModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create mailto link with form data
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
      }, 1500);
    }, 500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="glass-panel relative w-full max-w-md rounded-2xl p-8 shadow-2xl border border-white/90 bg-white/90"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-bold text-slate-900 mb-2">Get in Touch</h3>
            <p className="text-slate-600 text-sm mb-6">Send me a message and I&apos;ll get back to you soon.</p>

            {submitStatus === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-200">
                  <Mail className="w-8 h-8 text-cyan-600" />
                </div>
                <p className="text-cyan-700 font-medium">Opening your email client...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/90 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:bg-white transition-all"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/90 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:bg-white transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/90 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:bg-white transition-all resize-none"
                    placeholder="Tell me about your project or inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-slate-900 text-white rounded-lg font-bold hover:bg-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      Send Message
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

// --- Project Detail Modal ---
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
          className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-md overflow-y-auto"
          onClick={onClose}
        >
          {/* Close Button */}
          <button 
            onClick={onClose} 
            className="fixed top-6 right-6 p-3 bg-white/90 hover:bg-white text-slate-800 rounded-full backdrop-blur-md border border-slate-200/80 transition-all z-50 shadow-lg"
          >
            <X className="w-6 h-6 text-slate-800" />
          </button>

          {/* Content Container */}
          <div className="min-h-full py-12 px-4 md:px-8">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-6xl mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Section */}
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-cyan-50 text-cyan-800 text-xs font-bold uppercase tracking-wider border border-cyan-200/80 shadow-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-2 drop-shadow-[0_8px_24px_rgba(96,165,250,0.12)]">{project.title}</h1>
                <p className="text-xl text-sky-700 font-semibold mb-4">{project.subtitle}</p>
                
                {/* Achievements */}
                {project.achievements && project.achievements.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-4">
                    {project.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-2 px-4 py-2 bg-violet-50 border border-violet-200/80 rounded-lg backdrop-blur-md shadow-xs">
                        <Award className="w-5 h-5 text-violet-600" />
                        <span className="text-violet-950 text-sm font-semibold">{achievement}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Tab Navigation */}
              <div className="flex gap-2 mb-8 border-b border-slate-200/80 pb-4">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'features', label: 'Features' },
                  { id: 'gallery', label: 'Gallery' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-sky-600 text-white shadow-md'
                        : 'bg-white/70 text-slate-600 hover:bg-white hover:text-slate-900 border border-slate-200/70'
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
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8"
                  >
                    {/* Main Description */}
                    <div className="glass-panel rounded-2xl p-8 bg-white/85 shadow-xs border-white/90">
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">About the Project</h3>
                      <p className="text-slate-700 leading-relaxed text-lg">{project.fullDescription}</p>
                    </div>

                    {/* Problem & Solution Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="glass-panel rounded-2xl p-8 bg-white/85 border-rose-100">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-rose-50 rounded-lg border border-rose-200">
                            <Target className="w-6 h-6 text-rose-600" />
                          </div>
                          <h3 className="text-xl font-bold text-rose-950">The Problem</h3>
                        </div>
                        <p className="text-slate-600 leading-relaxed">{project.problemStatement}</p>
                      </div>

                      <div className="glass-panel rounded-2xl p-8 bg-white/85 border-cyan-100">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-cyan-50 rounded-lg border border-cyan-200">
                            <Lightbulb className="w-6 h-6 text-cyan-600" />
                          </div>
                          <h3 className="text-xl font-bold text-cyan-950">The Solution</h3>
                        </div>
                        <p className="text-slate-600 leading-relaxed">{project.solution}</p>
                      </div>
                    </div>

                    {/* Target Market & UVP */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="glass-panel rounded-2xl p-8 bg-white/85 border-sky-100 shadow-xs">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-sky-50 rounded-lg border border-sky-200">
                            <Users className="w-6 h-6 text-sky-600" />
                          </div>
                          <h3 className="text-xl font-bold text-slate-900">Target Market</h3>
                        </div>
                        <p className="text-slate-600 leading-relaxed">{project.targetMarket}</p>
                      </div>

                      <div className="glass-panel rounded-2xl p-8 bg-white/85 border-fuchsia-100 shadow-xs">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-fuchsia-50 rounded-lg border border-fuchsia-200">
                            <Zap className="w-6 h-6 text-fuchsia-600" />
                          </div>
                          <h3 className="text-xl font-bold text-slate-900">Unique Value</h3>
                        </div>
                        <p className="text-slate-600 leading-relaxed">{project.uniqueValue}</p>
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="glass-panel rounded-2xl p-8 bg-white/85 shadow-xs">
                      <h3 className="text-xl font-bold text-slate-900 mb-6">Technologies & Tools</h3>
                      <div className="flex flex-wrap gap-3">
                        {project.technologies.map((tech) => (
                          <span 
                            key={tech} 
                            className="px-4 py-2 bg-white/90 border border-slate-200/80 rounded-lg text-slate-700 font-medium text-sm hover:border-cyan-300 hover:bg-cyan-50/50 transition-all cursor-default shadow-xs"
                          >
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
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {project.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-panel rounded-2xl p-8 bg-white/85 hover:border-cyan-300/60 hover:shadow-md transition-all"
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <div className="p-3 bg-cyan-50 rounded-xl border border-cyan-200">
                            <feature.icon className="w-6 h-6 text-cyan-600" />
                          </div>
                          <h3 className="text-xl font-bold text-slate-900">{feature.title}</h3>
                        </div>
                        <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'gallery' && (
                  <motion.div
                    key="gallery"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  >
                    {project.images.map((image, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        className="glass-card relative w-full aspect-[9/16] rounded-xl overflow-hidden hover:border-cyan-300/60 hover:shadow-md transition-all shadow-xs group bg-slate-50/50"
                      >
                        <Image 
                          src={image} 
                          alt={`${project.title} screenshot ${index + 1}`} 
                          fill 
                          className="object-contain p-2 group-hover:scale-[1.02] transition-transform duration-300" 
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                          priority={index < 4}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Back to top hint */}
              <div className="mt-12 text-center">
                <button 
                  onClick={onClose}
                  className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors font-medium"
                >
                  <span>Close project details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Main Page Component ---

export default function Portfolio() {
  const [mounted, setMounted] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isProjectDetailOpen, setIsProjectDetailOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  useEffect(() => {
    const updateAuroraPosition = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;

      document.documentElement.style.setProperty("--scroll-progress", progress.toFixed(4));
      document.documentElement.style.setProperty("--scroll-y", `${window.scrollY}px`);
    };

    updateAuroraPosition();
    window.addEventListener("scroll", updateAuroraPosition, { passive: true });

    setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => {
      window.removeEventListener("scroll", updateAuroraPosition);
    };
  }, []);

  const openProjectDetail = (projectId: string) => {
    const project = projectsData.find(p => p.id === projectId);
    if (project) {
      setSelectedProject(project);
      setIsProjectDetailOpen(true);
    }
  };

  if (!mounted) return null;

  return (
    <div className="portfolio-shell relative isolate min-h-screen overflow-hidden bg-transparent text-slate-900 font-sans selection:bg-sky-200/80">
      <div className="aurora-stage" />
      <div className="aurora-ribbon" />
      <div className="noise-overlay" />
      
      <ContactModal 
        key={isContactModalOpen ? 'contact-open' : 'contact-closed'}
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
  
      <ProjectDetailModal
        key={selectedProject?.id ? `project-${selectedProject.id}` : 'project-closed'}
        isOpen={isProjectDetailOpen}
        onClose={() => setIsProjectDetailOpen(false)}
        project={selectedProject}
      />
  
      {/* Hero Section - Aurora Borealis Theme */}
      <section className="hero-aurora relative z-10 px-6 py-28 md:px-14 md:py-32 min-h-screen flex flex-col justify-center overflow-hidden">
        <motion.div className="relative z-10 mx-auto max-w-5xl text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-sky-200/80 text-xs text-slate-700 font-semibold mb-7 backdrop-blur-md shadow-sm shadow-sky-200/60">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            Open to Work & Collaboration
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.06] drop-shadow-[0_10px_24px_rgba(96,165,250,0.18)]">
            Building the <br />
            <span className="aurora-text">
              tech of tomorrow.
            </span>
          </h1>
          
          <p className="mx-auto text-lg md:text-xl text-slate-700 font-medium max-w-2xl leading-relaxed mb-12 drop-shadow-[0_6px_14px_rgba(148,163,184,0.18)]">
            Hi, I&apos;m a Computer Science student dedicated to building next-generation technologies. 
            My focus lies in <span className="text-slate-900 font-bold">UI/UX</span>—crafting interfaces that are as intuitive as they are powerful.
          </p>
  
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#work" className="group flex items-center gap-2 px-6 py-3 bg-white text-slate-950 rounded-full font-bold hover:bg-sky-50 transition-all hover:shadow-lg hover:shadow-sky-300/40 shadow-md border border-sky-100">
              View Selected Work
              <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a href="https://github.com/karlsxo/KarloRoel" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white/80 text-slate-800 border border-sky-200/80 rounded-full font-semibold hover:bg-white hover:border-sky-300 hover:shadow-xs transition-all backdrop-blur-md">
              <Github className="w-4 h-4 text-slate-800" />
              GitHub
            </a>
          </div>
        </motion.div>
      </section>

      {/* Tech Stack */}
      <div className="relative z-10 mx-4 md:mx-6 overflow-hidden glass-panel rounded-[2rem] py-9 md:py-10 bg-white/90 border-white/90">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-slate-500 text-sm font-semibold mb-6 uppercase tracking-wider">Core Technologies</p>
          <div className="flex gap-4 md:gap-6 flex-wrap text-slate-700 font-semibold text-lg md:text-xl">
             <span className="rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 hover:text-cyan-700 hover:border-cyan-300 hover:bg-cyan-50/60 transition-colors shadow-xs cursor-default">Python</span>
             <span className="rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 hover:text-violet-700 hover:border-violet-300 hover:bg-violet-50/60 transition-colors shadow-xs cursor-default">Java</span>
             <span className="rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 hover:text-teal-700 hover:border-teal-300 hover:bg-teal-50/60 transition-colors shadow-xs cursor-default">JavaScript</span>
             <span className="rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 hover:text-fuchsia-700 hover:border-fuchsia-300 hover:bg-fuchsia-50/60 transition-colors shadow-xs cursor-default">HTML5 & CSS3</span>
             <span className="rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 hover:text-cyan-700 hover:border-cyan-300 hover:bg-cyan-50/60 transition-colors shadow-xs cursor-default">React / Next.js</span>
             <span className="rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 hover:text-violet-700 hover:border-violet-300 hover:bg-violet-50/60 transition-colors shadow-xs cursor-default">C++</span>
             <span className="rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 hover:text-teal-700 hover:border-teal-300 hover:bg-teal-50/60 transition-colors shadow-xs cursor-default">Git</span>
             <span className="rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 hover:text-fuchsia-700 hover:border-fuchsia-300 hover:bg-fuchsia-50/60 transition-colors shadow-xs cursor-default">SQL</span>
          </div>
        </div>
      </div>

      {/* Selected Work */}
      <Section id="work" className="section-glow">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 drop-shadow-[0_8px_22px_rgba(96,165,250,0.12)]">Selected Work</h2>
          <p className="text-slate-600">Some of my featured projects and contributions that I&apos;ve worked on.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* DALANI PROJECT */}
          <ProjectCard 
            title="DalAni"
            subtitle="IoT & AI Cold Chain Solution"
            description="Solving the 40% post-harvest loss in Philippine agriculture through ESP32-based IoT modules and AI-backed quality verification."
            tags={["IoT", "AI", "Agri-Tech"]}
            onClick={() => openProjectDetail('dalani')}
          >
            <div className="relative w-full h-full scale-100 group-hover:scale-[1.03] transition-transform duration-500">
              <Image
                src="/assets/selected-works/dalani-final-logo.png"
                alt="DalAni"
                fill
                className="object-contain p-3 md:p-4"
                sizes="(max-width: 768px) 78vw, (max-width: 1024px) 42vw, 30vw"
              />
            </div>
          </ProjectCard>

          {/* ARTERY PROJECT */}
          <ProjectCard 
            title="Artery"
            subtitle="AI-Powered Blood Supply Chain"
            description="A unified real-time network for the Philippines' blood supply, integrating hospital dashboards and blockchain records."
            tags={["AI", "Blockchain", "Health-Tech"]}
            onClick={() => openProjectDetail('artery')}
          >
            <div className="relative w-full h-full scale-100 group-hover:scale-[1.03] transition-transform duration-500">
              <Image
                src="/assets/selected-works/artery-final-logo.png"
                alt="Artery"
                fill
                className="object-contain p-3 md:p-4"
                sizes="(max-width: 768px) 78vw, (max-width: 1024px) 42vw, 30vw"
              />
            </div>
          </ProjectCard>

          {/* METROPOLIS PROJECT (NEW) */}
          <ProjectCard 
            title="Metropolis"
            subtitle="Interactive Urban Experience"
            description="A visionary exploration into future urban environments. This project showcases advanced UI design and interactive web elements."
            tags={["UI/UX", "Next.js", "Web Design"]}
            href="https://reality13-metropolis.vercel.app"
          >
            <div className="relative w-full h-full scale-90 group-hover:scale-100 transition-transform duration-500">
              <Image
                src="/reality13.png"
                alt="Metropolis"
                fill
                className="object-contain p-8 md:p-12"
                sizes="(max-width: 768px) 56vw, (max-width: 1024px) 30vw, 22vw"
              />
            </div>
          </ProjectCard>

        </div>
      </Section>

      {/* About Section */}
      <Section className="grid grid-cols-1 md:grid-cols-2 gap-16 section-glow" id="about">
        <div>
          <h2 className="text-4xl font-bold text-slate-900 mb-6 drop-shadow-[0_8px_22px_rgba(96,165,250,0.12)]">About Me</h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-8">
            As a Computer Science student, I combine technical discipline with a passion for 
            <span className="text-slate-900 font-semibold"> creative design</span>, ensuring every line of code serves a purpose.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Code2, label: "Frontend Dev" },
              { icon: Database, label: "Backend Logic" },
              { icon: Globe, label: "Web Tech" },
              { icon: Cpu, label: "CS Fundamentals" },
            ].map((item, i) => (
              <div key={i} className="glass-panel flex items-center gap-3 p-4 rounded-lg shadow-xs bg-white/80 border-slate-200/70">
                <item.icon className="w-5 h-5 text-cyan-600" />
                <span className="font-semibold text-slate-800">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="relative h-full glass-panel rounded-2xl p-8 shadow-xs bg-white/80 border-slate-200/70">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Academic Focus</h3>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-cyan-100/80 border border-cyan-200 flex items-center justify-center shrink-0 font-bold text-cyan-800">1</div>
                <div>
                  <h4 className="font-bold text-slate-900">User Interface (UI)</h4>
                  <p className="text-sm text-slate-600">Designing modern and accessible layouts.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-fuchsia-100/80 border border-fuchsia-200 flex items-center justify-center shrink-0 font-bold text-fuchsia-800">2</div>
                <div>
                  <h4 className="font-bold text-slate-900">User Experience (UX)</h4>
                  <p className="text-sm text-slate-600">Optimizing user journeys and interaction.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Contact Section */}
      <section className="relative z-10 py-32 border-t border-sky-100/80">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 drop-shadow-[0_12px_34px_rgba(96,165,250,0.12)]">
            Let&apos;s build something <br />
            <span className="relative inline-block">
              <span className="aurora-text relative z-10">extraordinary.</span>
              <span className="absolute inset-0 blur-2xl bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400 opacity-25 animate-pulse"></span>
            </span>
          </h2>
          <button 
            onClick={() => setIsContactModalOpen(true)}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-950 rounded-full font-bold text-lg hover:scale-105 hover:bg-cyan-50 transition-all hover:shadow-lg hover:shadow-sky-300/30 shadow-md border border-sky-100"
          >
            <Mail className="w-5 h-5" />
            Get in Touch
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 bg-white/70 border-t border-sky-100 text-center text-slate-600 text-sm backdrop-blur-md">
        <p>© 2026 Karlo Roel Montenegro. All rights reserved.</p>
      </footer>

    </div>
  );
}
