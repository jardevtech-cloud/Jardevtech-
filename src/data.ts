import { PillarData, ProjectTemplate } from "./types";

export const CODE_SNIPPET = `function JardevTech() {
  const success = true;
  let ideas = ['design', 'code', 'deploy'];
  
  if (success) {
    return "We Build. You Grow.";
  }
}`;

export const PILLARS: PillarData[] = [
  {
    id: "websites",
    title: "CUSTOM WEBSITES",
    subtitle: "Tailored to Perfection",
    description: "Elegant, uniquely stylized web products with pristine custom layouts. No template constraints. Crafted pixel-by-pixel for ultimate impact.",
    icon: "Layers"
  },
  {
    id: "responsive",
    title: "RESPONSIVE DESIGN",
    subtitle: "Flawless on Every Device",
    description: "Adaptive grids and fluid layouts that deliver responsive performance. Full testing harness built directly into our design-to-live workflow.",
    icon: "Smartphone"
  },
  {
    id: "cleancode",
    title: "CLEAN CODE",
    subtitle: "Scalable & Maintainable",
    description: "Strict TypeScript compilation, robust architecture, and component modularity. We write self-documenting code that scales easily.",
    icon: "Binary"
  },
  {
    id: "performance",
    title: "PERFORMANCE",
    subtitle: "Fast, Secure, Reliable",
    description: "Sub-second load times, absolute CDN delivery, zero bloating, secure server practices, and 100/100 Core Web Vitals optimized.",
    icon: "Zap"
  }
];

export const PROJECTS_DATA: ProjectTemplate[] = [
  {
    id: "digital",
    title: "DIGITAL EXPERIENCES THAT DRIVE RESULTS",
    subtitle: "E-Commerce & Branding Sites",
    description: "From elegant high-converting brand platforms to multi-vendor digital commerce portals that optimize user actions and scale metrics.",
    features: ["Aesthetic Fluid Motion", "Integrated Payments", "Dynamic Cart & Analytics", "Extreme Search optimization"],
    ctaText: "Get Started"
  },
  {
    id: "empower",
    title: "WE BUILD SOLUTIONS THAT EMPOWER YOUR BUSINESS",
    subtitle: "Robust Enterprise Portals & Intranets",
    description: "Streamlined operational platforms, secure administration managers, automated workflows, and comprehensive partner connection systems.",
    features: ["RBAC (Role Based Access)", "Automated Pipeline Tasks", "Database Synchronization", "Auditing Trail Tracking"],
    ctaText: "Explore Platform"
  },
  {
    id: "isometric",
    title: "Creative Design. Smart Development. Powerful Solutions.",
    subtitle: "Interactive 3D Solutions & Games",
    description: "Engaging interactive graphics, immersive marketing canvases, browser-based games, and 3D data metrics visualization platforms.",
    features: ["CSS 3D / Isometric Viewports", "WebGL Canvas Layers", "Staggered Stated Actions", "Gamified Conversion Funnels"],
    ctaText: "Try Isometric Lab"
  },
  {
    id: "future",
    title: "BUILDING THE FUTURE WITH CODE & DESIGN",
    subtitle: "Custom SaaS & AI Implementations",
    description: "Intelligent software modules integrating large language model endpoints, secure vector processing, smart agent prompts, and custom client UI portals.",
    features: ["Gemini API Pipelines", "Predictive Dashboard Visuals", "Live Node Interaction", "Instant Cost Calculators"],
    ctaText: "Contact Sales"
  },
  {
    id: "problems",
    title: "SOFTWARE THAT SOLVES REAL WORLD PROBLEMS",
    subtitle: "High Scale Mobile & Service Backends",
    description: "Engineered around modern high-concurrency event loops, secure cloud database clusters, caching mechanisms, and continuous delivery pipelines.",
    features: ["100k+ WebSocket Connections", "Durable Firestore Cloud Layers", "Server-authoritative States", "Automated Load Balancing"],
    ctaText: "Review Architecture"
  }
];

export const ESTIMATE_DIMS = {
  tiers: [
    { name: "Custom Landing Page", basePrice: 1500, days: 10 },
    { name: "Full-Stack Web App", basePrice: 5000, days: 30 },
    { name: "Enterprise Portal & Cloud Server", basePrice: 15000, days: 60 }
  ],
  features: [
    { name: "User Authentication & Database", cost: 1200, days: 5 },
    { name: "Interactive 3D / Canvas Element", cost: 1500, days: 7 },
    { name: "Generative AI / Gemini API Integration", cost: 2000, days: 8 },
    { name: "Real-time Chat & WebSockets", cost: 1800, days: 6 },
    { name: "Custom Admin Panel & CMS", cost: 2500, days: 10 },
    { name: "Multi-language (Internationalization)", cost: 800, days: 3 }
  ],
  support: [
    { name: "Standard Delivery", multiplier: 1.0, sub: "Normal priority" },
    { name: "Accelerated Sprint", multiplier: 1.35, sub: "Delivered ~30% faster" },
    { name: "Extended Maintenance Package (1 Year)", multiplier: 1.25, sub: "Includes unlimited tweaks" }
  ]
};
