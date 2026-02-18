"use client";

import React, { useState, useEffect, useRef } from "react";
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
    "/dalani-logo.png",
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
    "/Artery logo.png",
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
  <section id={id} className={`px-6 py-24 md:py-32 max-w-7xl mx-auto ${className}`}>
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
      className={`group flex flex-col bg-neutral-900/50 border border-neutral-800 rounded-3xl overflow-hidden hover:border-neutral-600 transition-all cursor-pointer h-full ${className}`}
    >
      {/* Image Container */}
      <div className="relative h-64 w-full bg-neutral-950 overflow-hidden flex items-center justify-center p-8">
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 to-transparent z-10" />
        {children}
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center justify-center">
          <div className="px-4 py-2 bg-white text-black rounded-full text-sm font-bold flex items-center gap-2 shadow-xl">
            {href ? "Visit Website" : "View Gallery"} 
            {href ? <ExternalLink className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-8 flex flex-col flex-1">
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span key={tag} className="px-2 py-1 rounded-md bg-neutral-800 text-[10px] font-bold uppercase tracking-wider text-neutral-400 border border-neutral-700">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-2xl font-bold text-white mb-1">{title}</h3>
        <p className="text-indigo-400 text-sm font-medium mb-4">{subtitle}</p>
        <p className="text-neutral-400 text-sm leading-relaxed">
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

  useEffect(() => {
    if (!isOpen) {
      setFormData({ name: '', email: '', message: '' });
      setSubmitStatus('idle');
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-bold text-white mb-2">Get in Touch</h3>
            <p className="text-neutral-400 text-sm mb-6">Send me a message and I'll get back to you soon.</p>

            {submitStatus === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-green-500" />
                </div>
                <p className="text-green-500 font-medium">Opening your email client...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                    placeholder="Tell me about your project or inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-white text-black rounded-lg font-bold hover:bg-neutral-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
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

// --- Image Gallery Modal ---
const ImageGalleryModal = ({ isOpen, onClose, images }: { isOpen: boolean; onClose: () => void; images: string[] }) => {
  const modalRef = useRef<HTMLDivElement>(null);

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

  if (images.length === 0) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl overflow-y-auto"
          onClick={onClose}
        >
          {/* Close Button - Fixed Position */}
          <button 
            onClick={onClose} 
            className="fixed top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md border border-white/20 transition-all z-50"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Content Container */}
          <div className="min-h-full py-20 px-4 md:px-8">
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="max-w-7xl mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Grid Layout for All Images */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {images.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="relative w-full aspect-[9/16] rounded-xl overflow-hidden bg-neutral-900 border border-neutral-700/50 hover:border-neutral-500 transition-all shadow-2xl group"
                  >
                    <Image 
                      src={image} 
                      alt={`Gallery image ${index + 1}`} 
                      fill 
                      className="object-contain p-2 group-hover:scale-[1.02] transition-transform duration-300" 
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      priority={index < 4}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
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
      setActiveTab('overview');
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
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl overflow-y-auto"
          onClick={onClose}
        >
          {/* Close Button */}
          <button 
            onClick={onClose} 
            className="fixed top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md border border-white/20 transition-all z-50"
          >
            <X className="w-6 h-6 text-white" />
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
                    <span key={tag} className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider border border-indigo-500/30">
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">{project.title}</h1>
                <p className="text-xl text-indigo-400 font-medium mb-4">{project.subtitle}</p>
                
                {/* Achievements */}
                {project.achievements && project.achievements.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-4">
                    {project.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                        <Award className="w-5 h-5 text-amber-400" />
                        <span className="text-amber-300 text-sm font-medium">{achievement}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Tab Navigation */}
              <div className="flex gap-2 mb-8 border-b border-neutral-800 pb-4">
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
                        ? 'bg-white text-black'
                        : 'bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-white'
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
                    <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8">
                      <h3 className="text-2xl font-bold text-white mb-4">About the Project</h3>
                      <p className="text-neutral-300 leading-relaxed text-lg">{project.fullDescription}</p>
                    </div>

                    {/* Problem & Solution Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-red-500/20 rounded-lg">
                            <Target className="w-6 h-6 text-red-400" />
                          </div>
                          <h3 className="text-xl font-bold text-white">The Problem</h3>
                        </div>
                        <p className="text-neutral-300 leading-relaxed">{project.problemStatement}</p>
                      </div>

                      <div className="bg-green-500/5 border border-green-500/20 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-green-500/20 rounded-lg">
                            <Lightbulb className="w-6 h-6 text-green-400" />
                          </div>
                          <h3 className="text-xl font-bold text-white">The Solution</h3>
                        </div>
                        <p className="text-neutral-300 leading-relaxed">{project.solution}</p>
                      </div>
                    </div>

                    {/* Target Market & UVP */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-blue-500/20 rounded-lg">
                            <Users className="w-6 h-6 text-blue-400" />
                          </div>
                          <h3 className="text-xl font-bold text-white">Target Market</h3>
                        </div>
                        <p className="text-neutral-300 leading-relaxed">{project.targetMarket}</p>
                      </div>

                      <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-purple-500/20 rounded-lg">
                            <Zap className="w-6 h-6 text-purple-400" />
                          </div>
                          <h3 className="text-xl font-bold text-white">Unique Value</h3>
                        </div>
                        <p className="text-neutral-300 leading-relaxed">{project.uniqueValue}</p>
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8">
                      <h3 className="text-xl font-bold text-white mb-6">Technologies & Tools</h3>
                      <div className="flex flex-wrap gap-3">
                        {project.technologies.map((tech) => (
                          <span 
                            key={tech} 
                            className="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-neutral-200 font-medium text-sm hover:border-indigo-500 hover:bg-indigo-500/10 transition-all cursor-default"
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
                        className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 hover:border-neutral-600 transition-all"
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <div className="p-3 bg-indigo-500/20 rounded-xl">
                            <feature.icon className="w-6 h-6 text-indigo-400" />
                          </div>
                          <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                        </div>
                        <p className="text-neutral-300 leading-relaxed">{feature.description}</p>
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
                        className="relative w-full aspect-[9/16] rounded-xl overflow-hidden bg-neutral-900 border border-neutral-700/50 hover:border-neutral-500 transition-all shadow-2xl group"
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
                  className="inline-flex items-center gap-2 text-neutral-500 hover:text-white transition-colors"
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
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentGalleryImages, setCurrentGalleryImages] = useState<string[]>([]);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isProjectDetailOpen, setIsProjectDetailOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  useEffect(() => setMounted(true), []);

  const openGallery = (images: string[]) => {
    setCurrentGalleryImages(images);
    setIsGalleryOpen(true);
  };

  const openProjectDetail = (projectId: string) => {
    const project = projectsData.find(p => p.id === projectId);
    if (project) {
      setSelectedProject(project);
      setIsProjectDetailOpen(true);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans selection:bg-indigo-500/30">
      
      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
      
      <ImageGalleryModal 
        isOpen={isGalleryOpen} 
        onClose={() => setIsGalleryOpen(false)} 
        images={currentGalleryImages} 
      />

      <ProjectDetailModal
        isOpen={isProjectDetailOpen}
        onClose={() => setIsProjectDetailOpen(false)}
        project={selectedProject}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-[85vh] flex flex-col justify-center">
        <div className="absolute top-0 right-0 -z-10 opacity-20 overflow-hidden pointer-events-none">
          <div className="w-[600px] h-[600px] bg-indigo-600 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        </div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-indigo-400 font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Open to Work & Collaboration
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-8 leading-[1.1]">
            Building the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">
              tech of tomorrow.
            </span>
          </h1>
          
          <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed mb-12">
            Hi, I'm a Computer Science student dedicated to building next-generation technologies. 
            My focus lies in <span className="text-white font-medium">UI/UX</span>—crafting interfaces that are as intuitive as they are powerful.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#work" className="group flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-neutral-200 transition-all">
              View Selected Work
              <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a href="https://github.com" target="_blank" className="flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white border border-neutral-800 rounded-full font-medium hover:bg-neutral-800 transition-all">
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </motion.div>
      </section>

      {/* Tech Stack */}
      <div className="w-full overflow-hidden bg-neutral-900/30 border-y border-neutral-800 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-neutral-500 text-sm font-medium mb-6 uppercase tracking-wider">Core Technologies</p>
          <div className="flex gap-12 flex-wrap text-neutral-400 font-semibold text-xl">
             <span className="hover:text-white transition-colors cursor-default">Python</span>
             <span className="hover:text-white transition-colors cursor-default">Java</span>
             <span className="hover:text-white transition-colors cursor-default">JavaScript</span>
             <span className="hover:text-white transition-colors cursor-default">HTML5 & CSS3</span>
             <span className="hover:text-white transition-colors cursor-default">React / Next.js</span>
             <span className="hover:text-white transition-colors cursor-default">C++</span>
             <span className="hover:text-white transition-colors cursor-default">Git</span>
             <span className="hover:text-white transition-colors cursor-default">SQL</span>
          </div>
        </div>
      </div>

      {/* Selected Work */}
      <Section id="work">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Selected Work</h2>
          <p className="text-neutral-400">Some of my featured projects and contributions that I've worked on.</p>
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
            <div className="relative w-full h-full scale-90 group-hover:scale-100 transition-transform duration-500">
              <Image src="/dalani-logo.png" alt="DalAni" fill className="object-contain" />
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
            <div className="relative w-full h-full scale-90 group-hover:scale-100 transition-transform duration-500">
              <Image src="/Artery logo.png" alt="Artery" fill className="object-contain" />
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
              <Image src="/reality13.png" alt="Metropolis" fill className="object-contain" />
            </div>
          </ProjectCard>

        </div>
      </Section>

      {/* About Section */}
      <Section className="grid grid-cols-1 md:grid-cols-2 gap-16" id="about">
        <div>
          <h2 className="text-4xl font-bold text-white mb-6">About Me</h2>
          <p className="text-neutral-400 text-lg leading-relaxed mb-8">
            As a Computer Science student, I combine technical discipline with a passion for 
            <span className="text-white font-medium"> creative design</span>, ensuring every line of code serves a purpose.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Code2, label: "Frontend Dev" },
              { icon: Database, label: "Backend Logic" },
              { icon: Globe, label: "Web Tech" },
              { icon: Cpu, label: "CS Fundamentals" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-neutral-900 border border-neutral-800">
                <item.icon className="w-5 h-5 text-indigo-400" />
                <span className="font-medium text-neutral-300">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-3xl opacity-20" />
          <div className="relative h-full bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6">Academic Focus</h3>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center shrink-0 font-bold">1</div>
                <div>
                  <h4 className="font-bold text-neutral-200">User Interface (UI)</h4>
                  <p className="text-sm text-neutral-400">Designing modern and accessible layouts.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center shrink-0 font-bold">2</div>
                <div>
                  <h4 className="font-bold text-neutral-200">User Experience (UX)</h4>
                  <p className="text-sm text-neutral-400">Optimizing user journeys and interaction.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Contact Section */}
      <section className="py-32 border-t border-neutral-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8">
            Let's build something <br />
            <span className="relative inline-block">
              <span className="text-white relative z-10">extraordinary.</span>
              <span className="absolute inset-0 blur-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-60 animate-pulse"></span>
              <span className="absolute inset-0 blur-3xl bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 opacity-40"></span>
            </span>
          </h2>
          <button 
            onClick={() => setIsContactModalOpen(true)}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform"
          >
            <Mail className="w-5 h-5" />
            Get in Touch
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-neutral-950 border-t border-neutral-900 text-center text-neutral-500 text-sm">
        <p>© 2026 Portfolio. Built with lots of love.</p>
      </footer>

    </div>
  );
}