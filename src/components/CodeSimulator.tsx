import React, { useState, useEffect } from "react";
import { Play, RotateCcw, CheckCircle2, ArrowRight, Terminal, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CodeSimulatorProps {
  onSuccessTrigger?: () => void;
}

export default function CodeSimulator({ onSuccessTrigger }: CodeSimulatorProps) {
  const [code, setCode] = useState(`function JardevTech() {
  const success = true;
  let ideas = ['design', 'code', 'deploy'];
  
  if (success) {
    return "We Build. You Grow.";
  }
}`);
  const [isEditing, setIsEditing] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [execStep, setExecStep] = useState<number>(-1);
  const [logs, setLogs] = useState<string[]>([]);
  const [returnedVal, setReturnedVal] = useState<string | null>(null);

  const runCode = () => {
    setIsRunning(true);
    setExecStep(0);
    setLogs([]);
    setReturnedVal(null);
  };

  const resetCode = () => {
    setCode(`function JardevTech() {
  const success = true;
  let ideas = ['design', 'code', 'deploy'];
  
  if (success) {
    return "We Build. You Grow.";
  }
}`);
    setIsEditing(false);
    setIsRunning(false);
    setExecStep(-1);
    setLogs([]);
    setReturnedVal(null);
  };

  const steps = [
    { log: "Initializing JardevTech() runtime context...", delay: 600 },
    { log: "Assigned: const success = true (Aspiration locked in).", delay: 800 },
    { log: "Array created: ideas = ['design', 'code', 'deploy'] (Full lifecycle mapped).", delay: 900 },
    { log: "Evaluated conditional: (success === true) -> branch: true.", delay: 700 },
    { log: "Deploying production assets to custom global CDN...", delay: 1000 },
    { log: "Done. Returned: 'We Build. You Grow.'", delay: 800 }
  ];

  useEffect(() => {
    if (!isRunning || execStep < 0 || execStep >= steps.length) {
      if (isRunning && execStep >= steps.length) {
        setIsRunning(false);
        setReturnedVal("We Build. You Grow.");
        if (onSuccessTrigger) {
          onSuccessTrigger();
        }
      }
      return;
    }

    const timer = setTimeout(() => {
      setLogs((prev) => [...prev, steps[execStep].log]);
      setExecStep((prev) => prev + 1);
    }, steps[execStep].delay);

    return () => clearTimeout(timer);
  }, [isRunning, execStep]);

  return (
    <div className="w-full bg-[#0a0f1d] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative group">
      {/* Decorative top header glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-blue-500 via-transparent to-orange-500 opacity-70"></div>
      
      {/* Header bar */}
      <div className="bg-[#0c1328] px-4 py-3 flex items-center justify-between border-b border-slate-900">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 block"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 block"></span>
            <span className="w-3 h-3 rounded-full bg-green-500/80 block"></span>
          </div>
          <div className="h-4 w-[1px] bg-slate-800 mx-2"></div>
          <span className="text-slate-400 font-mono text-[11px] tracking-wider uppercase flex items-center gap-1.5">
            <Terminal size={12} className="text-blue-400" />
            jardevtech_compiler.ts
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {isEditing ? (
            <button
              onClick={() => setIsEditing(false)}
              className="text-[11px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded hover:bg-blue-500/20 transition font-medium"
            >
              Apply Code
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-[11px] text-slate-500 hover:text-slate-300 px-2 py-0.5 rounded transition font-medium"
            >
              Modify Code
            </button>
          )}
          <button
            onClick={resetCode}
            aria-label="Reset Code Simulator"
            className="text-slate-500 hover:text-slate-300 p-1 rounded transition"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Code editor side */}
        <div className="p-4 bg-[#0a0f1d] border-b md:border-b-0 md:border-r border-slate-900 md:min-h-[220px] flex flex-col justify-between">
          <div className="font-mono text-sm leading-6 overflow-x-auto select-none focus:outline-none scrollbar-thin scrollbar-thumb-slate-800">
            {isEditing ? (
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={7}
                className="w-full bg-transparent text-slate-200 border-none outline-none resize-none p-0 focus:ring-0 font-mono text-xs leading-6"
              />
            ) : (
              <pre className="text-slate-300 text-xs">
                <code>
                  {code.split("\n").map((line, idx) => {
                    const isReturned = line.includes("return");
                    const isLet = line.includes("let") || line.includes("const");
                    const isSuccess = line.includes("success");
                    return (
                      <div key={idx} className="flex group/line">
                        <span className="text-slate-600 select-none w-5 text-right pr-2 text-[10px]">{idx + 1}</span>
                        <span className={isReturned ? "text-orange-400" : isLet ? "text-blue-400" : isSuccess ? "text-slate-200" : "text-slate-400"}>
                          {line}
                        </span>
                      </div>
                    );
                  })}
                </code>
              </pre>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-900/60 flex justify-between items-center">
            <span className="text-[10px] text-slate-500 font-mono">
              Status: {isEditing ? "Editing..." : isRunning ? "Executing..." : "Ready"}
            </span>
            <button
              onClick={runCode}
              disabled={isRunning || isEditing}
              className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-500 hover:to-orange-500 disabled:opacity-50 text-white font-medium text-xs px-3.5 py-1.5 rounded-lg transition-all shadow-md shadow-orange-950/20 duration-300"
            >
              <Play size={10} className="fill-current" />
              Compile & Run
            </button>
          </div>
        </div>

        {/* Runtime Live Simulator side */}
        <div className="p-4 bg-[#080d19] flex flex-col justify-between min-h-[180px]">
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block mb-1">
              Live Output Terminal
            </span>
            
            <div className="space-y-1.5 font-mono text-[11px] leading-5 min-h-[100px]">
              {logs.length === 0 && (
                <span className="text-slate-600 italic block">
                  Click 'Compile & Run' to see compiling pipeline...
                </span>
              )}
              {logs.map((log, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex gap-2 items-start ${index === logs.length - 1 ? 'text-slate-200' : 'text-slate-400'}`}
                >
                  <span className="text-slate-600 select-none">&gt;</span>
                  <span>{log}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Action trigger result */}
          <AnimatePresence>
            {returnedVal && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-3 p-2.5 bg-gradient-to-r from-blue-950/40 to-orange-950/40 border border-orange-500/20 rounded-lg flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-orange-400 shrink-0" />
                  <div className="text-[11px]">
                    <span className="text-slate-400 font-mono">returned: </span>
                    <span className="text-orange-400 font-mono font-bold">"{returnedVal}"</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-gradient-to-r from-blue-500 to-orange-500 text-[10px] text-white font-bold uppercase tracking-wider px-2 py-0.5 rounded scale-95 origin-right">
                  <Sparkles size={8} />
                  Success!
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
