import React, { useState } from "react";
import { ESTIMATE_DIMS } from "../data";
import { Sparkles, DollarSign, Calendar, Copy, Check, Clock, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function EstimateCalculator() {
  const [selectedTierIndex, setSelectedTierIndex] = useState(1); // Default Full Stack Web App
  const [selectedFeatures, setSelectedFeatures] = useState<number[]>([0, 2]); // Initial default feature indexes
  const [selectedSupportIndex, setSelectedSupportIndex] = useState(0); // Default Standard Delivery

  const toggleFeature = (index: number) => {
    setSelectedFeatures((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const calculateTotals = () => {
    const tier = ESTIMATE_DIMS.tiers[selectedTierIndex];
    let totalPrice = tier.basePrice;
    let totalDays = tier.days;

    // Add features
    selectedFeatures.forEach((fIndex) => {
      totalPrice += ESTIMATE_DIMS.features[fIndex].cost;
      totalDays += ESTIMATE_DIMS.features[fIndex].days;
    });

    // Support package multiplier
    const support = ESTIMATE_DIMS.support[selectedSupportIndex];
    totalPrice = Math.floor(totalPrice * support.multiplier);
    
    // Adjust days based on support sprint
    if (selectedSupportIndex === 1) { // Accelerated Sprint
      totalDays = Math.ceil(totalDays * 0.7);
    }

    return { totalPrice, totalDays };
  };

  const { totalPrice, totalDays } = calculateTotals();

  const [copiedSpec, setCopiedSpec] = useState(false);
  const handleCopySpec = () => {
    const tier = ESTIMATE_DIMS.tiers[selectedTierIndex];
    const addOnNames = selectedFeatures.map((fi) => ESTIMATE_DIMS.features[fi].name).join(", ");
    const priority = ESTIMATE_DIMS.support[selectedSupportIndex].name;
    
    const textToCopy = `JardevTech Project Blueprint proposal:\n- Core Structure: ${tier.name}\n- Selected Addons: ${addOnNames || "None"}\n- Delivery Priority: ${priority}\n- Predicted Quote: $${totalPrice.toLocaleString()}\n- Target duration: ~${totalDays} Days\n\nGenerate consultation requirements for JardevTech.`;
    
    navigator.clipboard.writeText(textToCopy);
    setCopiedSpec(true);
    setTimeout(() => setCopiedSpec(false), 2000);
  };

  return (
    <div className="w-full bg-[#060a13] border border-slate-800 rounded-2xl p-6 relative">
      <div className="absolute top-0 left-0 w-40 h-40 bg-orange-500/5 blur-3xl pointer-events-none"></div>

      <div className="mb-6">
        <span className="text-[10px] uppercase font-mono tracking-widest text-[#2272ff] font-bold block mb-1">
          Instant Budgeting Tool
        </span>
        <h3 className="text-xl font-bold tracking-tight text-white font-sans">
          Dynamic Cost & Timeline Predictor
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Estimate custom product requirements and calculate a prediction of engineering costs and launch schedules.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Parameters side */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Step 1: Base Tier selection */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase font-mono tracking-wider">
              1. Choose Core Foundation Tier
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {ESTIMATE_DIMS.tiers.map((t, idx) => {
                const isActive = selectedTierIndex === idx;
                return (
                  <button
                    key={t.name}
                    onClick={() => setSelectedTierIndex(idx)}
                    className={`p-3.5 text-left border rounded-xl transition duration-300 relative ${
                      isActive
                        ? "bg-slate-900/80 border-orange-500/55 shadow shadow-orange-950/15"
                        : "bg-[#080d19]/40 border-slate-900 hover:border-slate-800"
                    }`}
                  >
                    <span className="text-xs font-bold text-slate-100 block">{t.name}</span>
                    <span className="text-[10px] text-slate-500 block mt-1.5">Starting at</span>
                    <span className="text-xs font-mono font-semibold text-orange-400 mt-0.5 inline-block">
                      ${t.basePrice.toLocaleString()}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Feature checklists */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase font-mono tracking-wider">
              2. Inject Modular Integrations & Add-ons
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ESTIMATE_DIMS.features.map((f, idx) => {
                const isSelected = selectedFeatures.includes(idx);
                return (
                  <button
                    key={f.name}
                    onClick={() => toggleFeature(idx)}
                    className={`p-3 text-left border rounded-xl transition flex justify-between items-center ${
                      isSelected
                        ? "bg-slate-900/60 border-blue-500/40 text-slate-100"
                        : "bg-[#080d19]/30 border-slate-900/85 text-slate-400 hover:border-slate-800"
                    }`}
                  >
                    <div className="space-y-0.5">
                      <span className="text-xs font-medium block">{f.name}</span>
                      <span className="text-[10px] text-slate-500 block font-mono">
                        +{f.days} Days delivery time
                      </span>
                    </div>
                    <div className="text-right">
                      <span className={`text-[10px] font-mono font-bold block ${isSelected ? "text-blue-400" : "text-slate-500"}`}>
                        +${f.cost}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Support Priority multiplier */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase font-mono tracking-wider">
              3. Select Delivery Priority & Care Package
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {ESTIMATE_DIMS.support.map((s, idx) => {
                const isActive = selectedSupportIndex === idx;
                return (
                  <button
                    key={s.name}
                    onClick={() => setSelectedSupportIndex(idx)}
                    className={`p-3 text-left border rounded-xl transition ${
                      isActive
                        ? "bg-slate-900/60 border-orange-500/40 text-slate-100"
                        : "bg-[#080d19]/20 border-slate-905 text-slate-400 hover:border-slate-800"
                    }`}
                  >
                    <span className="text-xs font-semibold block">{s.name}</span>
                    <span className="text-[9px] text-slate-500 block mt-1 leading-relaxed">
                      {s.sub}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Display / Results output side */}
        <div className="lg:col-span-5 bg-[#040811] rounded-xl border border-slate-800 p-5 flex flex-col justify-between self-stretch">
          <div className="space-y-6">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block">
              Blueprint Financial Projection
            </span>

            {/* Glowing price layout */}
            <div className="space-y-1 bg-slate-950 p-4 rounded-xl border border-slate-900/80 relative overflow-hidden">
              <div className="absolute right-[-15px] bottom-[-15px] text-blue-500/5 rotate-12 select-none"><DollarSign size={80} /></div>
              
              <span className="text-slate-500 text-[10px] font-mono uppercase block">Recommended Budget Scope</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-extrabold text-white font-sans tracking-tight">
                  ${totalPrice.toLocaleString()}
                </span>
                <span className="text-slate-500 text-xs font-mono">USD</span>
              </div>
            </div>

            {/* Timelines projection blocks */}
            <div className="space-y-1 bg-slate-950 p-4 rounded-xl border border-slate-900/80 relative overflow-hidden">
              <div className="absolute right-[-15px] bottom-[-15px] text-orange-500/5 rotate-12 select-none"><Calendar size={80} /></div>

              <span className="text-slate-500 text-[10px] font-mono uppercase block">Target Engineering Delivery Time</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-bold text-orange-400 font-sans tracking-tight">
                  ~{totalDays}
                </span>
                <span className="text-slate-400 text-xs font-mono">Business Days</span>
              </div>
            </div>

            {/* Standard deliverables assurance notice */}
            <div className="p-3 bg-blue-950/20 border border-blue-900/40 rounded-lg flex items-start gap-2.5">
              <Clock size={13} className="text-blue-400 shrink-0 mt-0.5" />
              <div className="text-[10px] text-slate-400 leading-normal">
                All estimations include absolute multi-device testing, full responsive optimization, localized custom SEO tags, and 1 year security maintenance guarantees.
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-900 mt-6 sm:mt-0">
            <button
              onClick={handleCopySpec}
              className="w-full bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white font-mono font-bold text-xs px-4 py-2.5 rounded-lg transition duration-200 uppercase tracking-widest flex items-center justify-center gap-2"
            >
              {copiedSpec ? (
                <>
                  <Check size={13} className="text-emerald-400" />
                  Blueprint Copied!
                </>
              ) : (
                <>
                  <Copy size={12} />
                  Copy Blueprint Data
                </>
              )}
            </button>
            <span className="text-[9px] text-slate-500 font-mono text-center block mt-2">
              Copy this spec and paste it into the AI Architect chat above!
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
