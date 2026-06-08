import React, { useState, useEffect } from "react";
import { Rocket, Terminal, Sparkles, Cpu, CheckCircle, Code, Globe, Github, Linkedin, Twitter, ExternalLink, ArrowRight, Layers, Smartphone, Binary, Zap, Phone, MessageSquare, ShieldAlert } from "lucide-react";
import CodeSimulator from "./components/CodeSimulator";
import CorePillars from "./components/CorePillars";
import MockupShowcase from "./components/MockupShowcase";
import AIConsultant from "./components/AIConsultant";
import EstimateCalculator from "./components/EstimateCalculator";
import AdminDashboard from "./components/AdminDashboard";
import { PROJECTS_DATA } from "./data";
import { ProjectTemplate } from "./types";
import { motion } from "motion/react";

export default function App() {
  const [successCount, setSuccessCount] = useState(0);
  const [projectsList, setProjectsList] = useState<ProjectTemplate[]>([]);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("jardevtech_projects");
    if (stored) {
      try {
        setProjectsList(JSON.parse(stored));
      } catch (e) {
        setProjectsList(PROJECTS_DATA);
      }
    } else {
      setProjectsList(PROJECTS_DATA);
    }
  }, []);

  const handleProjectsUpdated = (newList: ProjectTemplate[]) => {
    setProjectsList(newList);
    localStorage.setItem("jardevtech_projects", JSON.stringify(newList));
  };

  const handleCompilerSuccess = () => {
    setSuccessCount((prev) => prev + 1);
  };

  return (
    <div className="bg-[#03060f] min-h-screen text-slate-100 selection:bg-orange-500 selection:text-white pb-16 overflow-x-hidden relative font-sans">
      
      {/* Absolute high-tech mesh backdrops */}
      <div className="absolute inset-0 bg-[#03060f] pointer-events-none"></div>
      <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-blue-950/15 via-orange-950/5 to-transparent pointer-events-none"></div>
      
      {/* Decorative vertical guidelines */}
      <div className="absolute inset-y-0 left-1/4 w-[1px] bg-slate-950/30 hidden md:block pointer-events-none"></div>
      <div className="absolute inset-y-0 right-1/4 w-[1px] bg-slate-950/30 hidden md:block pointer-events-none"></div>

      {/* Top Banner Header */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 relative z-20 flex justify-between items-center border-b border-slate-900/60 bg-[#03060f]/80 backdrop-blur-md sticky top-0">
        {/* Left Side Logo & Brand */}
        <div className="flex items-center gap-3">
          <img
            src="/src/assets/images/jardevtech_logo_1780253225738.png"
            alt="JardevTech Logo"
            referrerPolicy="no-referrer"
            className="w-10 h-10 object-contain rounded-lg border border-slate-800 bg-slate-950/60 p-0.5 hover:scale-105 transition duration-300"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 cursor-pointer">
              <span className="text-sm font-mono tracking-wider font-extrabold text-white uppercase sm:inline block">
                JARDEV<span className="text-orange-400">TECH</span>
              </span>
            </div>
            <span className="text-[8.5px] font-bold tracking-widest font-mono text-slate-500 block uppercase mt-0.5">
              We Build. You Grow.
            </span>
          </div>
        </div>

        {/* Center Side: Philosophy indicators */}
        <div className="hidden md:flex items-center gap-5 text-[9px] uppercase font-mono tracking-widest text-slate-400">
          <span className="hover:text-orange-400 transition cursor-pointer">/ INNOVATE</span>
          <span className="hover:text-blue-400 transition cursor-pointer">/ DEVELOP</span>
          <span className="hover:text-emerald-400 transition cursor-pointer">/ DELIVER</span>
        </div>

        {/* Right Side: Active Status Tag & Console entry */}
        <div className="flex items-center gap-3">
          <button
            id="header-admin-btn"
            onClick={() => setShowAdminDashboard(true)}
            className="border border-slate-800 bg-slate-950/30 hover:bg-slate-900 text-slate-400 hover:text-white px-3 py-1.5 rounded-full text-[9px] font-mono transition uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
          >
            <ShieldAlert size={11} className="text-orange-400 animate-pulse" />
            Console
          </button>
          
          <div className="flex items-center gap-2 bg-slate-950/70 border border-slate-850 px-3 py-1.5 rounded-full select-none">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="text-[9px] font-bold tracking-widest font-mono text-slate-400 uppercase">
              STUDIO ACTIVE
            </span>
          </div>
        </div>
      </header>

      {/* Hero Branding Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Slogan and Brand Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div>
              {/* Highlight badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-950/60 to-orange-950/60 border border-orange-500/20 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-orange-300 shadow-sm shadow-orange-950/10 mb-4 uppercase">
                <Sparkles size={12} className="text-orange-400 animate-pulse" />
                <span>Next-Generation Technical Studio</span>
              </div>

              {/* Big Typography matching client logo colors */}
              <h1 className="text-5xl sm:text-7xl font-sans font-black tracking-tighter leading-none select-none">
                <span className="bg-gradient-to-r from-blue-400 via-[#3b82f6] to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">
                  Jar
                </span>
                <span className="bg-gradient-to-r from-orange-400 via-[#f97316] to-amber-500 bg-clip-text text-transparent">
                  devTech
                </span>
              </h1>

              {/* Slogans */}
              <h2 className="text-sm sm:text-base font-bold font-mono tracking-wider text-slate-300 uppercase mt-4">
                WEBSITE DEVELOPMENT & SOFTWARE ENGINEERING STUDIO
              </h2>

              {/* Core motif in brackets */}
              <div className="text-sm font-mono tracking-wider font-extrabold text-[#2563eb] mt-3 flex items-center justify-center lg:justify-start gap-1">
                <span>&lt;</span>
                <span className="bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent uppercase font-black">
                  We Build. You Grow.
                </span>
                <span>&gt;</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-450 leading-relaxed font-sans max-w-xl mx-auto lg:mx-0">
              We design and engineer bespoke, standard-setting digital platforms optimized for absolute performance, high search rankings, and pixel-perfect responsiveness. Tell our live AI Architect your ideas and let’s construct greatness together.
            </p>

            {/* Quick stats banner */}
            <div className="flex justify-center lg:justify-start gap-8 pt-2">
              <div className="text-left font-mono">
                <span className="text-slate-500 text-[10px] uppercase block">Stack Standard</span>
                <span className="text-white text-xs font-bold block mt-0.5">Vite + React + Node</span>
              </div>
              <div className="text-left font-mono">
                <span className="text-slate-500 text-[10px] uppercase block">Response Rate</span>
                <span className="text-white text-xs font-bold block mt-0.5">&lt; 0.2s TTFB</span>
              </div>
              <div className="text-left font-mono">
                <span className="text-slate-500 text-[10px] uppercase block">Security Auditing</span>
                <span className="text-white text-xs font-bold block mt-0.5">100% Secure TS</span>
              </div>
            </div>
          </div>

          {/* Badge Illustration Card Column */}
          <div className="lg:col-span-12 xl:col-span-5 flex justify-center relative">
            <div className="w-full max-w-[420px] bg-[#0c1225]/45 border border-slate-800/80 rounded-2xl overflow-hidden p-4 relative group shadow-2xl">
              
              {/* Outer element glow effect */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 to-orange-500 rounded-2xl blur-xl opacity-10 group-hover:opacity-15 transition duration-500"></div>

              {/* Custom Image Badge with referrerPolicy from image skill */}
              <div className="rounded-xl overflow-hidden relative border border-slate-900 aspect-video flex items-center justify-center bg-[#070b16]">
                <img
                  src="/src/assets/images/jardevtech_hero_badge_1780252332120.png"
                  alt="JardevTech Cosmic Badge"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                />
              </div>

              {/* Dynamic interactions indicator */}
              <div className="mt-3.5 flex justify-between items-center bg-[#060a13] p-3 rounded-lg border border-slate-900 border-dashed">
                <div className="flex items-center gap-2">
                  <div className="p-1 h-6 w-6 rounded bg-orange-500/10 flex items-center justify-center shrink-0">
                    <Code size={12} className="text-orange-400" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono font-semibold">Stellar Launcher</span>
                    <span className="text-[8.5px] text-slate-500 font-mono block">Continuous Integration OK</span>
                  </div>
                </div>
                
                {successCount > 0 && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center gap-1 bg-gradient-to-r from-orange-500 to-amber-500 text-[9px] text-white font-bold px-2 py-0.5 rounded shadow"
                  >
                    🚀 Run x{successCount}
                  </motion.div>
                )}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Live Code Compiler Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 border-t border-slate-950/60">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left instructions block */}
          <div className="lg:col-span-4 space-y-4 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#2272ff] font-bold block mb-1">
                Visual Testing Labs
              </span>
              <h2 className="text-2xl font-black text-white font-sans tracking-tight">
                Inspect Our Core Execution Mechanics
              </h2>
              <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                We believe in architectural transparency. Run our live browser compiler console on the right to trigger asset checks, and watch variables evaluate into deployment states in real-time.
              </p>
            </div>

            <div className="p-4 bg-[#060a12]/75 border border-slate-850 rounded-xl space-y-3">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">Engine Outputs</span>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono border-b border-slate-900 pb-1.5">
                  <span className="text-slate-500">Transpiler target:</span>
                  <span className="text-slate-300">TypeScript 5.8+</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono border-b border-slate-900 pb-1.5">
                  <span className="text-slate-500">Node JS Engine:</span>
                  <span className="text-slate-300">V8 Serverless optimized</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-500">Compilation success:</span>
                  <span className="text-emerald-400 font-semibold">100% Green light build</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right code compiler playfield */}
          <div className="lg:col-span-8">
            <CodeSimulator onSuccessTrigger={handleCompilerSuccess} />
          </div>
        </div>
      </section>

      {/* Production Standards and Core Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        <CorePillars />
      </section>

      {/* Founder Spotlight Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 border-t border-slate-900/40">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-orange-500/5 blur-3xl pointer-events-none"></div>
        <div className="bg-[#060a13]/80 border border-slate-800 rounded-3xl overflow-hidden p-6 sm:p-8 relative">
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-blue-950/10 via-transparent to-transparent pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Column: Picture */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative group max-w-[270px] w-full">
                {/* Advanced tech backdrop glows */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 to-orange-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-35 transition duration-500"></div>
                
                {/* Image shell */}
                <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-slate-850 bg-slate-950 relative shadow-2xl">
                  <img
                    src="/src/assets/images/jarsila_paul_original_1780890467807.png"
                    alt="Jarsila Paul - JardevTech Founder & Lead Software Engineer"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-500"
                  />
                  {/* Subtle hover info overlay */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent p-4 flex flex-col justify-end">
                    <span className="text-[9px] font-mono tracking-widest text-[#2272ff] font-bold uppercase">STUDIO FOUNDER</span>
                    <span className="text-sm font-bold text-white mt-0.5">Jarsila Paul</span>
                  </div>
                </div>

                {/* Cybernetic active badge indicator */}
                <div className="absolute top-3 right-3 bg-slate-950/85 border border-slate-850 px-2.5 py-1 rounded-md text-[9px] font-mono font-bold tracking-wider text-emerald-400 flex items-center gap-1.5 backdrop-blur shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  ONLINE
                </div>
              </div>
            </div>

            {/* Right Column: Narrative & Values */}
            <div className="lg:col-span-8 space-y-4 text-left">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-orange-400 font-bold block mb-1">
                  Meet the Founder & Lead Engineer
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">
                  Bridging Visual Artistry & High-Performance Engineering
                </h3>
                <p className="text-xs sm:text-sm font-mono text-blue-400 block mt-1 font-bold uppercase tracking-wider">
                  "We build bespoke vehicles for persistent digital growth."
                </p>
              </div>

              <p className="text-xs sm:text-[13px] text-slate-450 leading-relaxed font-sans font-medium">
                Greetings, I'm <strong className="text-white font-bold font-mono">Jarsila Paul</strong>, the founder and lead software architect behind JardevTech. When I established this studio, my goal was clear: to rewrite the standard for modern client applications. We don't rely on bloated templates or cookie-cutter solutions. We design customized, ultra-performant digital systems designed from the ground up to rank high, load instantly, and look flawless across every device.
              </p>

              <blockquote className="border-l-2 border-orange-500/80 pl-4 py-1 italic text-slate-300 text-xs sm:text-[13px] font-medium leading-relaxed bg-slate-950/40 p-3 rounded-r-lg">
                "Our client platforms must have near-zero load latencies, absolute responsiveness, robust type-safe resilience, and flawless local-first SEO footprints. We code by hand to ensure your brand stands out."
              </blockquote>

              {/* Founder Contact Actions Section */}
              <div className="p-3 bg-slate-950/80 border border-slate-900 rounded-xl flex flex-col sm:flex-row gap-3 items-center justify-between">
                <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase select-none">
                  Instant Collaborative Access
                </span>
                <div className="flex flex-wrap gap-2.5 w-full sm:w-auto">
                  <a
                    href="https://wa.me/254752581912?text=Hello%20Jarsila%20Paul%2C%20I%20saw%20your%20JardevTech%2520portfolio%2520and%2520would%2520love%2520to%2520consult%2520about%2520a%2520website%21"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 text-[10px] tracking-wider font-mono font-bold px-3.5 py-2' rounded-lg border border-emerald-500/20 transition duration-200"
                  >
                    <MessageSquare size={12} className="text-emerald-400 animate-pulse" />
                    WhatsApp (+254752581912)
                  </a>
                  <a
                    href="tel:+256709290191"
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 text-[10px] tracking-wider font-mono font-bold px-3.5 py-2' rounded-lg border border-blue-500/20 transition duration-200"
                  >
                    <Phone size={12} className="text-blue-400" />
                    Call Office (+256709290191)
                  </a>
                </div>
              </div>

              {/* Core capabilities badge grids */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1.5">
                <div className="p-2.5 bg-slate-950/70 border border-slate-900 rounded-xl relative overflow-hidden">
                  <span className="text-[#2272ff] font-mono text-[9px] font-extrabold block uppercase tracking-wider">PRIMARY STACK</span>
                  <span className="text-white text-xs font-bold block mt-0.5 font-mono">React / Node / TS</span>
                </div>
                <div className="p-2.5 bg-slate-950/70 border border-slate-900 rounded-xl relative overflow-hidden">
                  <span className="text-orange-400 font-mono text-[9px] font-extrabold block uppercase tracking-wider">SPEED FOCUS</span>
                  <span className="text-white text-xs font-bold block mt-0.5 font-mono">SEO & Micro-TTFB</span>
                </div>
                <div className="p-2.5 bg-slate-950/70 border border-slate-900 rounded-xl relative overflow-hidden">
                  <span className="text-emerald-400 font-mono text-[9px] font-extrabold block uppercase tracking-wider">DELIVERY STANDARD</span>
                  <span className="text-white text-xs font-bold block mt-0.5 font-mono">Pixel-Perfect Custom</span>
                </div>
              </div>

              {/* Developer signature */}
              <div className="flex items-center gap-3 pt-1">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-800 shrink-0 bg-slate-950">
                  <img
                    src="/src/assets/images/jarsila_paul_original_1780890467807.png"
                    alt="Signature avatar"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-white block font-mono">Jarsila Paul</span>
                  <span className="text-[9px] text-slate-500 block uppercase font-mono tracking-wider">Founder & Lead Software Engineer @ JardevTech</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects 3D Deck Slide Mockups */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <MockupShowcase projects={projectsList} />
      </section>

      {/* AI Consulting Architect & Dynamic Budget Estimator Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 border-t border-slate-950/60">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Estimate Calculator on the left */}
          <div className="lg:col-span-7">
            <EstimateCalculator />
          </div>

          {/* AI Consultant Chat panel on the right */}
          <div className="lg:col-span-5">
            <AIConsultant />
          </div>

        </div>
      </section>

      {/* Visit Website CTA Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 relative z-10">
        <div className="bg-gradient-to-r from-blue-950/25 via-slate-900/60 to-orange-950/25 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left relative overflow-hidden group">
          
          {/* Subtle flare animation helper */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

          <div className="flex flex-col sm:flex-row items-center gap-3.5">
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <Globe className="text-blue-400 animate-spin-slow" size={18} />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-mono uppercase block">Visit Our Production Site</span>
              <a
                href="https://www.jardevtech.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-orange-400 font-bold transition flex items-center gap-1 mt-0.5 tracking-wide text-sm font-mono uppercase"
              >
                www.jardevtech.com
                <ExternalLink size={12} className="inline opacity-60" />
              </a>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            {/* Social channels centered */}
            <a
              href="https://github.com/jardevtech"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-slate-850 hover:border-slate-700 bg-slate-950 text-slate-400 hover:text-white rounded-lg transition"
              title="GitHub Profile"
            >
              <Github size={15} />
            </a>
            <a
              href="https://linkedin.com/in/jardevtech"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-slate-850 hover:border-slate-700 bg-slate-950 text-slate-400 hover:text-white rounded-lg transition"
              title="LinkedIn Profile"
            >
              <Linkedin size={15} />
            </a>
            <a
              href="https://twitter.com/jardevtech"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-slate-850 hover:border-slate-700 bg-slate-950 text-slate-400 hover:text-white rounded-lg transition"
              title="Twitter Handle"
            >
              <Twitter size={15} />
            </a>
          </div>

        </div>
      </section>

      {/* Floating Cyber Contact Dock */}
      <div className="fixed bottom-6 right-6 z-40 bg-[#060a13]/90 border border-slate-850 rounded-2xl p-2.5 backdrop-blur-md shadow-2xl flex flex-col gap-1.5 shrink-0 max-w-xs select-none">
        <span className="text-[7px] font-mono font-bold text-orange-400 tracking-widest uppercase block text-center border-b border-slate-900 pb-1">
          Direct Contact Pill
        </span>
        <a
          href="https://wa.me/254752581912?text=Hello%20Jarsila%20Paul%2C%20I'm%20interested%20in%20a%20website%20consultation%21"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 bg-emerald-600/15 hover:bg-emerald-600/25 text-emerald-400 text-[8.5px] font-mono font-bold px-2.5 py-1.5 rounded-lg border border-emerald-500/10 transition duration-200 uppercase tracking-wider"
        >
          <MessageSquare size={11} className="text-emerald-400 animate-pulse" />
          WhatsApp Jarsila
        </a>
        <a
          href="tel:+256709290191"
          className="flex items-center gap-1.5 bg-blue-600/15 hover:bg-blue-600/25 text-blue-400 text-[8.5px] font-mono font-bold px-2.5 py-1.5 rounded-lg border border-blue-500/10 transition duration-200 uppercase tracking-wider"
        >
          <Phone size={11} className="text-blue-400" />
          Call +256709290191
        </a>
      </div>

      {/* Human humble footer indicator */}
      <footer className="text-center pt-8 border-t border-slate-950/60 max-w-7xl mx-auto px-4 z-10 relative">
        <div className="flex justify-center mb-4">
          <button
            id="admin-dashboard-btn"
            onClick={() => setShowAdminDashboard(true)}
            className="flex items-center gap-1.5 border border-slate-900 bg-slate-950/40 hover:bg-slate-900/80 text-slate-500 hover:text-white px-3.5 py-1.5 rounded-lg text-[9px] font-mono transition uppercase tracking-widest border-dashed cursor-pointer"
          >
            <ShieldAlert size={12} className="text-orange-400 animate-pulse" />
            Secure Admin Vault
          </button>
        </div>
        <span className="text-[10px] text-slate-600 font-mono uppercase tracking-widest block">
          Designed & Configured strictly for JardevTech Software Engineering Studio
        </span>
        <span className="text-[9px] text-[#2c3e5e] block mt-1 font-mono">
          © {new Date().getFullYear()} JardevTech. We Build. You Grow. All rights reserved.
        </span>
      </footer>

      {showAdminDashboard && (
        <AdminDashboard
          onClose={() => setShowAdminDashboard(false)}
          currentProjects={projectsList}
          onProjectsUpdated={handleProjectsUpdated}
        />
      )}

    </div>
  );
}
