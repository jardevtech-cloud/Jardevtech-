import React, { useState } from "react";
import { Laptop, Smartphone, Tablet, ChevronRight, Zap, Layers, Binary, ShieldCheck, Gauge, Check, CodeSquare, Globe } from "lucide-react";
import { PILLARS } from "../data";
import { motion, AnimatePresence } from "motion/react";

export default function CorePillars() {
  const [activePillar, setActivePillar] = useState<string>("websites");

  // State for responsive tester
  const [viewportWidth, setViewportWidth] = useState<number>(100); // % scale of mock screen

  // State for performance tester
  const [auditProgress, setAuditProgress] = useState<number>(-1);
  const [auditScores, setAuditScores] = useState<Record<string, number>>({
    performance: 0,
    accessibility: 0,
    bestPractices: 0,
    seo: 0
  });

  const runAudit = () => {
    setAuditProgress(0);
    setAuditScores({ performance: 0, accessibility: 0, bestPractices: 0, seo: 0 });
    
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setAuditProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setAuditScores({
          performance: 100,
          accessibility: 100,
          bestPractices: 100,
          seo: 100
        });
      }
    }, 150);
  };

  // Icon mapping
  const renderIcon = (iconName: string, active: boolean) => {
    const cls = `w-5 h-5 ${active ? "text-orange-400" : "text-slate-400 group-hover:text-blue-400"}`;
    switch (iconName) {
      case "Layers":
        return <Layers className={cls} />;
      case "Smartphone":
        return <Smartphone className={cls} />;
      case "Binary":
        return <Binary className={cls} />;
      case "Zap":
        return <Zap className={cls} />;
      default:
        return <Gauge className={cls} />;
    }
  };

  return (
    <div className="w-full bg-[#060a13] border border-slate-800 rounded-2xl overflow-hidden p-6 relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/5 blur-3xl pointer-events-none"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left selection side: Core Pillars List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="mb-4">
            <span className="text-[10px] uppercase font-mono tracking-widest text-blue-400 font-bold block mb-1">
              Production Execution Standards
            </span>
            <h3 className="text-xl font-bold tracking-tight text-white font-sans">
              Our 4 Pillars of Excellence
            </h3>
          </div>

          <div className="space-y-2">
            {PILLARS.map((p) => {
              const isActive = activePillar === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setActivePillar(p.id)}
                  className={`w-full text-left p-3.5 rounded-xl transition-all duration-300 border flex gap-3.5 items-start group relative ${
                    isActive
                      ? "bg-slate-900/60 border-orange-500/40 shadow-md shadow-orange-950/10"
                      : "bg-[#080d19]/40 border-slate-900 hover:border-slate-800 hover:bg-slate-900/30"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeBorderGlow"
                      className="absolute left-[-1px] top-3 bottom-3 w-[3px] bg-gradient-to-b from-blue-500 to-orange-500 rounded-r"
                    />
                  )}
                  <div className={`p-2 rounded-lg ${isActive ? "bg-orange-500/10" : "bg-slate-900"}`}>
                    {renderIcon(p.icon, isActive)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold tracking-wider font-mono text-slate-100 uppercase">
                      {p.title}
                    </h4>
                    <span className="text-[11px] font-medium text-slate-400 block mt-0.5">
                      {p.subtitle}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right interactivity playground side */}
        <div className="lg:col-span-7 bg-[#040810]/80 border border-slate-800/80 rounded-xl p-5 flex flex-col justify-between min-h-[300px]">
          <AnimatePresence mode="wait">
            {activePillar === "websites" && (
              <motion.div
                key="websites"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4 h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full w-fit mb-2">
                    <Layers size={11} className="text-blue-400" />
                    <span className="text-[9px] font-bold text-blue-400 uppercase tracking-wider font-mono">Tailormade Lab</span>
                  </div>
                  <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wide">
                    {PILLARS[0].title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed mt-2">
                    We steer clear of rigid templating structures. Every pixel, layout layout block, and interactive animation is crafted modularly from scratch to match your specific brand voice.
                  </p>
                </div>

                {/* Theme sticker customize demonstration */}
                <div className="p-4 bg-slate-900/40 rounded-lg border border-slate-800 space-y-3">
                  <span className="text-[10px] text-slate-500 font-mono uppercase block">Interactive Brand Identity Modular Blocks</span>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-slate-900 text-[10px] font-bold px-2 py-1 rounded shadow">Stellar UI Core</span>
                    <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-slate-900 text-[10px] font-bold px-2 py-1 rounded shadow">Premium Brand Canvas</span>
                    <span className="bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-900 text-[10px] font-bold px-2 py-1 rounded shadow">Zero Latency Layouts</span>
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-2 bg-slate-950/60 p-2 rounded">
                    <span className="text-orange-400 font-mono font-bold">&gt;</span>
                    <span>Fully customizable visual system ready for your digital identity.</span>
                  </div>
                </div>
              </motion.div>
            )}

            {activePillar === "responsive" && (
              <motion.div
                key="responsive"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-full w-fit mb-2">
                      <Smartphone size={11} className="text-cyan-400" />
                      <span className="text-[9px] font-bold text-cyan-400 uppercase tracking-wider font-mono">Layout Harness</span>
                    </div>
                    <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wide">
                      {PILLARS[1].title}
                    </h4>
                  </div>
                  {/* Viewport size selectors */}
                  <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                    <button
                      onClick={() => setViewportWidth(40)}
                      className={`p-1.5 rounded-md transition ${viewportWidth === 40 ? 'bg-slate-800 text-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
                      title="Mobile Viewport"
                    >
                      <Smartphone size={14} />
                    </button>
                    <button
                      onClick={() => setViewportWidth(70)}
                      className={`p-1.5 rounded-md transition ${viewportWidth === 70 ? 'bg-slate-800 text-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
                      title="Tablet Viewport"
                    >
                      <Tablet size={14} />
                    </button>
                    <button
                      onClick={() => setViewportWidth(100)}
                      className={`p-1.5 rounded-md transition ${viewportWidth === 100 ? 'bg-slate-800 text-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
                      title="Desktop Viewport"
                    >
                      <Laptop size={14} />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  Toggle the selector controls on the right to simulate our responsive components adapting cleanly in real-time.
                </p>

                {/* Resizing mock viewport frame */}
                <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-900 h-[140px] flex items-center justify-center overflow-hidden">
                  <motion.div
                    animate={{ width: `${viewportWidth}%` }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="bg-slate-900 border border-slate-700/60 rounded-lg p-2.5 h-full flex flex-col justify-between max-w-full"
                  >
                    <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                      <span className="text-[9px] text-cyan-400 font-mono font-bold tracking-wider">JARDEVTECH.COM</span>
                      <span className="text-[8px] text-slate-500 uppercase font-mono">{viewportWidth < 50 ? "Mobile" : viewportWidth < 80 ? "Tablet" : "Desktop"} Mode</span>
                    </div>
                    <div className={`grid gap-2 ${viewportWidth < 50 ? 'grid-cols-1' : viewportWidth < 80 ? 'grid-cols-2' : 'grid-cols-3'} my-2`}>
                      <div className="bg-[#121a2d] p-1.5 rounded border border-slate-800/80 text-[8px] text-slate-300 text-center font-semibold">Brand Module</div>
                      <div className="bg-[#121a2d] p-1.5 rounded border border-slate-800/80 text-[8px] text-slate-300 text-center font-semibold">Payment Engine</div>
                      <div className="bg-[#121a2d] p-1.5 rounded border border-slate-800/80 text-[8px] text-slate-300 text-center font-semibold">Analytics Portal</div>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-orange-500" style={{ width: `${viewportWidth}%` }}></div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {activePillar === "cleancode" && (
              <motion.div
                key="cleancode"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div>
                  <div className="flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-full w-fit mb-2">
                    <Binary size={11} className="text-indigo-400" />
                    <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-wider font-mono">TypeScript Guard</span>
                  </div>
                  <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wide">
                    {PILLARS[2].title}
                  </h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  We deploy strict type-safety, decoupled file modularity, and rigid ESLint practices. This ensures any feature can be modified instantly without breakage.
                </p>

                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 font-mono text-[10px] space-y-2">
                  <div className="text-emerald-400 flex items-center gap-2">
                    <Check size={11} />
                    <span>TSConfig: strictNullChecks = true</span>
                  </div>
                  <div className="text-emerald-400 flex items-center gap-2">
                    <Check size={11} />
                    <span>Static Analysis: ESLint validation passed!</span>
                  </div>
                  <div className="text-emerald-400 flex items-center gap-2">
                    <Check size={11} />
                    <span>Output bundle coverage: 100/100 typification</span>
                  </div>
                  <div className="pt-1.5 border-t border-slate-900 text-slate-500 flex justify-between">
                    <span>Target: ESNext</span>
                    <span className="text-slate-400">0 critical compilation warnings</span>
                  </div>
                </div>
              </motion.div>
            )}

            {activePillar === "performance" && (
              <motion.div
                key="performance"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4 h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 px-2.5 py-1 rounded-full w-fit mb-2">
                    <Zap size={11} className="text-orange-400" />
                    <span className="text-[9px] font-bold text-orange-400 uppercase tracking-wider font-mono">Core Web Vitals</span>
                  </div>
                  <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wide">
                    {PILLARS[3].title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed mt-1">
                    Every byte matters. We audit package weights, utilize progressive image fetching, optimize pre-loading assets, and build behind high-speed reverse proxies.
                  </p>
                </div>

                {/* Audit trigger section */}
                <div className="space-y-3">
                  <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-900 flex justify-between items-center gap-2">
                    <div className="flex gap-4">
                      {Object.entries(auditScores).map(([key, score]) => (
                        <div key={key} className="text-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center border font-mono text-[9px] font-bold ${
                            score === 100 ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5' : 'border-slate-800 text-slate-500'
                          }`}>
                            {score || "-"}
                          </div>
                          <span className="text-[8px] text-slate-600 block mt-1 tracking-wider uppercase font-mono">{key.slice(0, 4)}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={runAudit}
                      disabled={auditProgress >= 0 && auditProgress < 100}
                      className="bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-500 hover:to-orange-500 text-white font-mono font-bold text-[10px] px-3.5 py-1.5 rounded-lg transition shrink-0 uppercase tracking-wider disabled:opacity-50"
                    >
                      {auditProgress >= 0 && auditProgress < 100 ? "Auditing..." : "Run Audit"}
                    </button>
                  </div>

                  {auditProgress >= 0 && auditProgress < 100 && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-[9px] font-mono text-slate-500">
                        <span>Lighthouse Client Engine...</span>
                        <span>{auditProgress}%</span>
                      </div>
                      <div className="h-1 bg-slate-900 rounded overflow-hidden">
                        <div className="h-full bg-orange-500 transition-all duration-150" style={{ width: `${auditProgress}%` }}></div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
