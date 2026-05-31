import React, { useState } from "react";
import { MoveRight, PlusCircle, Trash2, CheckCircle, HelpCircle, HardDrive, RefreshCw, Send, Sparkles, Orbit } from "lucide-react";
import { PROJECTS_DATA } from "../data";
import { motion, AnimatePresence } from "motion/react";

interface Cube {
  id: string;
  type: string;
  name: string;
  color: string;
  y: number; // For staggered heights
}

export default function MockupShowcase() {
  const [selectedCardId, setSelectedCardId] = useState<string>("isometric");

  // State for isometric block developer (Card 3)
  const [cubes, setCubes] = useState<Cube[]>([
    { id: "1", type: "db", name: "Durable Cloud DB", color: "from-blue-600 to-indigo-600", y: 0 },
    { id: "2", type: "api", name: "Fast Express Gateway", color: "from-cyan-500 to-blue-500", y: 1 },
    { id: "3", type: "auth", name: "OAuth Security Shield", color: "from-indigo-500 to-purple-600", y: 2 },
    { id: "4", type: "ui", name: "Motion React Canvas", color: "from-orange-500 to-amber-500", y: 3 }
  ]);

  const addCube = (type: string) => {
    if (cubes.length >= 8) return; // Cap at 8 for layout elegance
    let info = { name: "Interactive Block", color: "from-slate-600 to-slate-700" };
    switch (type) {
      case "db":
        info = { name: "Cloud Firestore Core", color: "from-blue-600 to-indigo-600" };
        break;
      case "api":
        info = { name: "Vite Microservices", color: "from-cyan-500 to-teal-500" };
        break;
      case "auth":
        info = { name: "Firebase Secure Auth", color: "from-indigo-500 to-purple-600" };
        break;
      case "ui":
        info = { name: "Interactivity Layer", color: "from-orange-500 to-amber-500" };
        break;
    }
    setCubes((prev) => [
      ...prev,
      { id: Date.now().toString(), type, name: info.name, color: info.color, y: prev.length }
    ]);
  };

  const clearCubes = () => {
    setCubes([]);
  };

  // State for architectural node router (Card 2)
  const [activeRouterNode, setActiveRouterNode] = useState<string>("client");
  const [trafficResponses, setTrafficResponses] = useState<string[]>([]);
  const triggerTraffic = () => {
    setTrafficResponses((prev) => [...prev, "Syncing payload to Gateway..."]);
    setTimeout(() => {
      setTrafficResponses((prev) => [...prev, "Secure gateway authorization OK."]);
    }, 400);
    setTimeout(() => {
      setTrafficResponses((prev) => [...prev, "Executed Firestore atomic write (Success)."]);
    }, 800);
  };

  // State for Checkout funnel Simulator (Card 1)
  const [conversionMultiplier, setConversionMultiplier] = useState<number>(1.5);
  const calculatedTraffic = Math.floor(12430 * (conversionMultiplier / 1.5));
  const calculatedSales = Math.floor(340 * conversionMultiplier);

  return (
    <div className="w-full space-y-8">
      {/* 3D-oriented deck selector mock-ups inspired strictly by the image */}
      <div>
        <div className="text-center max-w-xl mx-auto mb-6">
          <span className="text-[10px] uppercase font-mono tracking-widest text-orange-400 font-bold block mb-1">
            Immersive Project Gallery
          </span>
          <h3 className="text-2xl font-bold tracking-tight text-white font-sans">
            Modular Blueprint Showcases
          </h3>
          <p className="text-xs text-slate-400 mt-1.5">
            Click on any angled project panel below to experience its custom interactive features live in the center stage.
          </p>
        </div>

        {/* The 3D Staggered Cards Deck Layout */}
        <div className="relative py-8 overflow-x-auto select-none no-scrollbar flex justify-center gap-4 px-4">
          <div className="flex gap-4 min-w-[900px] md:min-w-fit justify-center items-center py-4">
            {PROJECTS_DATA.map((proj, idx) => {
              const isSelected = selectedCardId === proj.id;
              
              // Custom rotate angles representing the beautiful picture design
              let transCls = "";
              if (idx === 0) transCls = "-rotate-6 hover:-rotate-2 hover:translate-y-[-4px]";
              else if (idx === 1) transCls = "-rotate-3 hover:-rotate-1 hover:translate-y-[-4px]";
              else if (idx === 2) transCls = "rotate-0 hover:translate-y-[-6px]";
              else if (idx === 3) transCls = "rotate-3 hover:rotate-1 hover:translate-y-[-4px]";
              else transCls = "rotate-6 hover:rotate-2 hover:translate-y-[-4px]";

              return (
                <button
                  key={proj.id}
                  onClick={() => setSelectedCardId(proj.id)}
                  className={`w-[190px] h-[260px] p-4 rounded-xl text-left border flex flex-col justify-between transition-all duration-300 transform relative shrink-0 cursor-pointer ${transCls} ${
                    isSelected
                      ? "bg-slate-900 border-orange-500 shadow-xl shadow-orange-950/20 scale-105 z-10"
                      : "bg-[#080d19]/80 border-slate-800 hover:border-slate-700 opacity-60 hover:opacity-100"
                  }`}
                >
                  {/* Decorative orbital tag */}
                  <div className="flex justify-between items-center bg-slate-950/40 p-1.5 rounded-lg border border-slate-900">
                    <span className="text-[7.5px] font-mono font-bold text-slate-400 tracking-wider">JardevTech</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  </div>

                  <div className="space-y-2 my-2">
                    <h4 className="text-[10px] font-bold text-orange-400 font-mono tracking-wider uppercase">
                      BUILD MODULE 0{idx + 1}
                    </h4>
                    <p className="text-xs font-bold text-white tracking-tight line-clamp-3">
                      {proj.title}
                    </p>
                    <p className="text-[10px] text-slate-400 line-clamp-2">
                      {proj.subtitle}
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                    <span className="text-[8px] text-slate-500 font-mono">Status: LIVE</span>
                    <span className="text-[8px] text-orange-400 font-bold flex items-center gap-0.5 uppercase tracking-widest font-mono">
                      Interact
                      <MoveRight size={8} />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Interactive Stage for Selected Project */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCardId}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="w-full bg-[#070b15] border border-slate-800 rounded-2xl overflow-hidden p-6 relative"
        >
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none"></div>

          {/* Heading */}
          <div className="border-b border-slate-900 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-blue-400 font-bold block">
                Active Interactive Simulator
              </span>
              <h4 className="text-lg font-bold text-white tracking-tight mt-1">
                {PROJECTS_DATA.find((p) => p.id === selectedCardId)?.title}
              </h4>
              <p className="text-xs text-slate-400">
                {PROJECTS_DATA.find((p) => p.id === selectedCardId)?.subtitle}
              </p>
            </div>
            
            <span className="text-xs text-slate-500 uppercase font-mono bg-slate-900 border border-slate-800 px-3 py-1 rounded-full w-fit">
              ID: jardev_mod_{selectedCardId}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Description and standard info side */}
            <div className="lg:col-span-4 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {PROJECTS_DATA.find((p) => p.id === selectedCardId)?.description}
                </p>
                
                <h5 className="text-[10px] font-bold text-slate-500 uppercase font-mono tracking-wider">
                  Target Deliverables Included:
                </h5>
                <ul className="space-y-1.5">
                  {PROJECTS_DATA.find((p) => p.id === selectedCardId)?.features.map((feat, fIdx) => (
                    <li key={fIdx} className="text-xs text-slate-300 flex items-center gap-2">
                      <CheckCircle size={11} className="text-orange-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-900">
                <span className="text-[10px] text-slate-500 block mb-1">Empowering full ownership</span>
                <button className="w-full bg-gradient-to-r from-blue-600 to-orange-600 text-white font-mono font-bold text-xs px-4 py-2 rounded-lg hover:from-blue-500 hover:to-orange-500 transition duration-300 uppercase tracking-widest">
                  {PROJECTS_DATA.find((p) => p.id === selectedCardId)?.ctaText}
                </button>
              </div>
            </div>

            {/* Simulated lab side */}
            <div className="lg:col-span-8 bg-[#040811] rounded-xl border border-slate-800/60 p-5 flex flex-col justify-between min-h-[280px]">
              
              {/* Option 3: Isometric cubes drop builder */}
              {selectedCardId === "isometric" && (
                <div className="flex flex-col md:flex-row gap-4 h-full">
                  <div className="flex-1 space-y-3">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block">
                      3D Isometric Cubes Stack Lab
                    </span>
                    <p className="text-xs text-slate-400">
                      We construct application backends as composable, modular stacks. Click buttons on the right to stack live technology layers and watch them assemble!
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-900">
                      <button
                        onClick={() => addCube("db")}
                        className="flex items-center gap-1 bg-slate-900 border border-slate-850 hover:border-slate-700 text-[10px] font-mono text-slate-300 px-2 py-1.5 rounded transition"
                      >
                        <PlusCircle size={10} className="text-blue-500" />
                        + DB Block
                      </button>
                      <button
                        onClick={() => addCube("api")}
                        className="flex items-center gap-1 bg-slate-900 border border-slate-850 hover:border-slate-700 text-[10px] font-mono text-slate-300 px-2 py-1.5 rounded transition"
                      >
                        <PlusCircle size={10} className="text-cyan-400" />
                        + API Block
                      </button>
                      <button
                        onClick={() => addCube("auth")}
                        className="flex items-center gap-1 bg-slate-900 border border-slate-850 hover:border-slate-700 text-[10px] font-mono text-slate-300 px-2 py-1.5 rounded transition"
                      >
                        <PlusCircle size={10} className="text-indigo-400" />
                        + Auth Block
                      </button>
                      <button
                        onClick={() => addCube("ui")}
                        className="flex items-center gap-1 bg-slate-900 border border-slate-850 hover:border-slate-700 text-[10px] font-mono text-slate-300 px-2 py-1.5 rounded transition"
                      >
                        <PlusCircle size={10} className="text-orange-500" />
                        + UI Block
                      </button>
                      <button
                        onClick={clearCubes}
                        aria-label="Clear Stack"
                        className="text-slate-500 hover:text-red-400 p-1.5 rounded transition"
                        title="Clear Stack"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>

                  {/* Stacking platform layout in beautiful styled 3D look */}
                  <div className="w-full md:w-[220px] bg-slate-950/40 border border-slate-900/60 rounded-xl p-3 flex flex-col justify-end min-h-[180px] relative overflow-hidden">
                    <div className="absolute top-2 left-2 text-[8px] font-mono text-slate-600 uppercase">Interactive Viewport</div>

                    <div className="relative w-full h-[140px] flex flex-col-reverse justify-start items-center pb-2">
                      <AnimatePresence>
                        {cubes.map((cube, index) => (
                          <motion.div
                            key={cube.id}
                            initial={{ opacity: 0, y: -80, scaleY: 1.5 }}
                            animate={{ opacity: 1, y: 0, scaleY: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 350, damping: 25 }}
                            className={`w-32 h-6 bg-gradient-to-r ${cube.color} border-t border-white/20 rounded shadow-md group relative flex items-center justify-center -mb-1`}
                            style={{ zIndex: index + 5 }}
                          >
                            <span className="text-[10px] text-white font-mono font-medium tracking-tight truncate px-2 select-none">
                              {cube.name}
                            </span>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>

                    <div className="h-2 w-36 self-center bg-slate-850 border border-slate-800 rounded-lg shadow-inner"></div>
                  </div>
                </div>
              )}

              {/* Option 5: Growth metrics counts */}
              {selectedCardId === "problems" && (
                <div className="space-y-4">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block">
                    Telemetry Indicators & Satisfaction
                  </span>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-slate-950 p-4 border border-slate-900 rounded-xl text-center">
                      <span className="text-slate-500 text-[10px] font-mono uppercase block">Success Deliveries</span>
                      <span className="text-2xl font-bold text-white tracking-tight mt-1 inline-block">50+</span>
                      <span className="text-[9px] text-slate-400 block mt-0.5">SaaS & Sites live</span>
                    </div>
                    <div className="bg-slate-950 p-4 border border-slate-900 rounded-xl text-center">
                      <span className="text-slate-500 text-[10px] font-mono uppercase block">Partners Retained</span>
                      <span className="text-2xl font-bold text-orange-400 tracking-tight mt-1 inline-block">30+</span>
                      <span className="text-[9px] text-slate-400 block mt-0.5">Long-term clients</span>
                    </div>
                    <div className="bg-slate-950 p-4 border border-slate-900 rounded-xl text-center">
                      <span className="text-slate-500 text-[10px] font-mono uppercase block">Satisfaction Index</span>
                      <span className="text-2xl font-bold text-blue-400 tracking-tight mt-1 inline-block">99.8%</span>
                      <span className="text-[9px] text-slate-400 block mt-0.5">Lighthouse audited</span>
                    </div>
                  </div>

                  {/* Mini visual SVG Chart */}
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-900 space-y-1">
                    <span className="text-[8px] font-mono text-slate-600 uppercase block">Historical Server Efficiency Rates</span>
                    <div className="h-[70px] flex items-end justify-between px-2 pt-2 gap-1.5">
                      <div className="w-full bg-slate-900 h-full rounded relative overflow-hidden"><div className="absolute bottom-0 left-0 right-0 bg-blue-500/20 h-[65%] border-t border-blue-400/80"></div></div>
                      <div className="w-full bg-slate-900 h-full rounded relative overflow-hidden"><div className="absolute bottom-0 left-0 right-0 bg-blue-500/20 h-[80%] border-t border-blue-400/80"></div></div>
                      <div className="w-full bg-slate-900 h-full rounded relative overflow-hidden"><div className="absolute bottom-0 left-0 right-0 bg-blue-500/20 h-[72%] border-t border-blue-400/80"></div></div>
                      <div className="w-full bg-slate-900 h-full rounded relative overflow-hidden"><div className="absolute bottom-0 left-0 right-0 bg-orange-500/20 h-[92%] border-t border-orange-400/80 animate-pulse"></div></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Option 2: Router and Traffic gateway */}
              {selectedCardId === "empower" && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500">
                      Gateway Service Traffic Sim
                    </span>
                    <button
                      onClick={triggerTraffic}
                      className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[10px] text-slate-300 px-3 py-1 rounded flex items-center gap-1 font-mono transition"
                    >
                      <RefreshCw size={10} className="animate-spin-slow" />
                      Dispatch Request
                    </button>
                  </div>

                  {/* Interactive Nodes list */}
                  <div className="grid grid-cols-3 gap-2 relative mt-2">
                    <button
                      onClick={() => setActiveRouterNode("client")}
                      className={`p-3 border rounded-lg text-center font-mono text-[10px] transition ${
                        activeRouterNode === "client" ? "border-blue-500 bg-blue-500/5 text-white" : "border-slate-900 text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      Browser Client
                    </button>
                    <button
                      onClick={() => setActiveRouterNode("gateway")}
                      className={`p-3 border rounded-lg text-center font-mono text-[10px] transition ${
                        activeRouterNode === "gateway" ? "border-orange-500 bg-orange-500/5 text-white" : "border-slate-900 text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      HTTPS App Proxy
                    </button>
                    <button
                      onClick={() => setActiveRouterNode("db")}
                      className={`p-3 border rounded-lg text-center font-mono text-[10px] transition ${
                        activeRouterNode === "db" ? "border-indigo-500 bg-indigo-500/5 text-white" : "border-slate-900 text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      Durable Storage
                    </button>
                  </div>

                  {/* Streaming simulation log console */}
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-900 font-mono text-[10px] text-slate-400 space-y-1.5 h-[90px] overflow-y-auto">
                    {trafficResponses.length === 0 && (
                      <span className="text-slate-600 block italic">Node dispatcher ready (Awaiting traffic request dispatch...)</span>
                    )}
                    {trafficResponses.map((tr, index) => (
                      <div key={index} className="text-emerald-400/90 flex items-center gap-2">
                        <span>●</span>
                        <span>{tr}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Option 1: Digital conversions */}
              {selectedCardId === "digital" && (
                <div className="space-y-4">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block">
                    E-Commerce Speed & Conversion Simulator
                  </span>
                  
                  <div className="space-y-3 p-3 bg-slate-950 rounded-lg border border-slate-900">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">Component Fetch Speed:</span>
                      <span className="text-orange-400 font-bold">{(1.5 - (conversionMultiplier - 1.5) * 0.4).toFixed(2)}s Latency</span>
                    </div>
                    {/* Slider multiplier */}
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-slate-500 font-mono">Slow (3s)</span>
                      <input
                        type="range"
                        min="0.5"
                        max="2.5"
                        step="0.1"
                        value={conversionMultiplier}
                        onChange={(e) => setConversionMultiplier(parseFloat(e.target.value))}
                        className="w-full accent-orange-500 cursor-pointer h-1.5 bg-slate-900 rounded-lg"
                      />
                      <span className="text-[10px] text-cyan-400 font-mono">Sub-second (0.2s)</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="p-3 bg-slate-950 border border-slate-900 rounded-lg">
                      <span className="text-[9px] text-slate-500 font-mono uppercase block">Projected Visitors</span>
                      <span className="text-lg font-bold text-white block mt-1">{calculatedTraffic.toLocaleString()}</span>
                    </div>
                    <div className="p-3 bg-slate-950 border border-slate-900 rounded-lg">
                      <span className="text-[9px] text-slate-500 font-mono uppercase block">Target Sales Transactions</span>
                      <span className="text-lg font-bold text-emerald-400 block mt-1">{calculatedSales.toLocaleString()}</span>
                      <span className="text-[9px] text-slate-400 block mt-0.5">{(conversionMultiplier * 2.7).toFixed(1)}% Conversion Rate</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Option 4: SaaS custom code tools */}
              {selectedCardId === "future" && (
                <div className="space-y-4 h-full flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block">
                      Autonomous Intelligence Node Playground
                    </span>
                    <p className="text-xs text-slate-400 mt-2">
                      Interact with modern AI solutions. Write parameters directly or test the natural language processing model built into this app's sidebar.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-900/80 flex items-center gap-3">
                    <div className="p-2 rounded bg-orange-500/10 shrink-0">
                      <Orbit size={16} className="text-orange-400 animate-spin-slow" />
                    </div>
                    <div className="text-[11px]">
                      <span className="text-white font-mono font-semibold block">Jardev AI Consultant Integrated</span>
                      <span className="text-slate-500 block mt-0.5">Configured with direct Firestore back-layer mapping.</span>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
