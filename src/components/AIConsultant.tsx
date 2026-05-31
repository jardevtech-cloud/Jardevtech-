import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles, AlertCircle, Bot, User, Trash2 } from "lucide-react";
import { ChatMessage } from "../types";
import { motion, AnimatePresence } from "motion/react";

export default function AIConsultant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hello! I am **Jardev AI Architect**, your project assistant here at **JardevTech**. We build custom high-performance web products, mobile platforms, and advanced cloud systems.\n\nWhether you need details on pricing, timeline predictions, or architectural choices, ask me anything! We Build. You Grow.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputMsg, setInputMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handlePromptSuggestion = (txt: string) => {
    if (loading) return;
    sendMessage(txt);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim() || loading) return;
    sendMessage(inputMsg);
  };

  const sendMessage = async (contentStr: string) => {
    setLoading(true);
    setApiError(null);
    setInputMsg("");

    const newMsg: ChatMessage = {
      role: "user",
      content: contentStr,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedHistory = [...messages, newMsg];
    setMessages(updatedHistory);

    try {
      const response = await fetch("/api/consult", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ messages: updatedHistory })
      });

      if (!response.ok) {
        throw new Error("Failed to contact the architect API backend system.");
      }

      const data = await response.json();
      
      const assistantMsg: ChatMessage = {
        role: "assistant",
        content: data.reply || "I am here to guide you in launching your ultimate technical platform.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error(err);
      setApiError("Could not retrieve AI response. Verify connectivity or email us directly at jardevtech@gmail.com!");
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Cleared session context. What can JardevTech build for you today? Let's engineer greatness!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setApiError(null);
  };

  return (
    <div className="w-full bg-[#0a0f1d] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[520px] relative group">
      {/* Glow highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-blue-500 via-transparent to-orange-500 opacity-80"></div>
      
      {/* Header bar */}
      <div className="bg-[#0c1328] px-4 py-3.5 border-b border-slate-900 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#0c1328] absolute bottom-0 right-0 animate-pulse"></span>
            <div className="p-1.5 bg-orange-500/10 rounded-lg">
              <Bot size={18} className="text-orange-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs font-bold text-slate-100 tracking-wide">Jardev AI Architect</h4>
              <span className="bg-gradient-to-r from-blue-500/20 to-orange-500/20 text-orange-400 text-[8px] font-mono font-bold px-1.5 py-0.5 rounded border border-orange-500/10">GenAI Agent</span>
            </div>
            <span className="text-[10px] text-slate-500 block">Ask anything about specs, tech stacks, or prices</span>
          </div>
        </div>
        
        <button
          onClick={clearChat}
          aria-label="Clear chat session history"
          className="text-slate-500 hover:text-red-400 p-1.5 rounded transition"
          title="Clear session history"
        >
          <Trash2 size={13} />
        </button>
      </div>

      {/* Messages Feed area scroll */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar scroll-smooth bg-[#060a13]/80">
        <AnimatePresence initial={false}>
          {messages.map((m, idx) => {
            const isUser = m.role === "user";
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 max-w-[85%] ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                <div className={`p-1.5 h-7 w-7 rounded-lg shrink-0 flex items-center justify-center ${
                  isUser ? "bg-blue-600/10 text-blue-400 border border-blue-500/25" : "bg-orange-600/10 text-orange-400 border border-orange-550/25"
                }`}>
                  {isUser ? <User size={13} /> : <Bot size={13} />}
                </div>

                <div className="space-y-1">
                  <div className={`rounded-2xl p-3 text-xs leading-relaxed ${
                    isUser
                      ? "bg-gradient-to-r from-blue-700/90 to-blue-600/95 text-white rounded-tr-none shadow-md"
                      : "bg-[#0d1427]/80 text-slate-300 rounded-tl-none border border-slate-900 shadow-sm"
                  }`}>
                    {/* Render minimal formatting line breaks and bold strings */}
                    {m.content.split("\n").map((line, lIdx) => {
                      // Format bullet lists
                      if (line.startsWith("•") || line.startsWith("-")) {
                        return <div key={lIdx} className="pl-2.5 my-1 text-slate-300">● {line.replace(/^[-•]\s*/, "")}</div>;
                      }
                      
                      // Highlight markdown strong
                      const boldMatch = line.match(/\*\*(.*?)\*\*/g);
                      if (boldMatch) {
                        let renderLine = line;
                        boldMatch.forEach((match) => {
                          const clean = match.replace(/\*\*/g, "");
                          renderLine = renderLine.replace(match, `<strong>${clean}</strong>`);
                        });
                        return <div key={lIdx} className="mb-1" dangerouslySetInnerHTML={{ __html: renderLine }} />;
                      }

                      return <div key={lIdx} className="mb-1">{line}</div>;
                    })}
                  </div>
                  <span className="text-[8px] text-slate-500 font-mono block text-right">
                    {m.timestamp}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {loading && (
          <div className="flex gap-3 max-w-[80%] mr-auto items-center">
            <div className="p-1.5 h-7 w-7 rounded-lg bg-orange-600/10 text-orange-400 border border-orange-550/25 flex items-center justify-center">
              <Bot size={13} className="animate-pulse" />
            </div>
            <div className="bg-[#0d1427]/80 border border-slate-900 rounded-2xl rounded-tl-none p-3.5 flex gap-1 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0ms" }}></span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "150ms" }}></span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "300ms" }}></span>
            </div>
          </div>
        )}

        {apiError && (
          <div className="p-3 bg-red-950/20 border border-red-900/30 rounded-xl flex items-center gap-2 text-xs text-red-400">
            <AlertCircle size={14} />
            <span>{apiError}</span>
          </div>
        )}

        <div ref={endRef} />
      </div>

      {/* Suggestion prompt pills */}
      <div className="px-4 py-2 border-t border-slate-900 bg-[#070b16] flex flex-wrap gap-1.5 items-center">
        <span className="text-[9px] text-slate-500 uppercase font-mono mr-1">Ask:</span>
        <button
          onClick={() => handlePromptSuggestion("Estimate custom landing page cost")}
          className="text-[10px] bg-slate-900 hover:bg-slate-800 border border-slate-850 hover:border-slate-700 text-slate-400 hover:text-slate-200 px-2.5 py-1 rounded-full transition"
        >
          📋 Landing Page quote
        </button>
        <button
          onClick={() => handlePromptSuggestion("What is your standard tech stack?")}
          className="text-[10px] bg-slate-900 hover:bg-slate-800 border border-slate-850 hover:border-slate-700 text-slate-400 hover:text-slate-200 px-2.5 py-1 rounded-full transition"
        >
          ⚡ Standard Stack
        </button>
        <button
          onClick={() => handlePromptSuggestion("How long does a standard web app take?")}
          className="text-[10px] bg-slate-900 hover:bg-slate-800 border border-slate-850 hover:border-slate-700 text-slate-400 hover:text-slate-200 px-2.5 py-1 rounded-full transition"
        >
          📅 App Timelines
        </button>
      </div>

      {/* Chat input box form */}
      <form onSubmit={handleFormSubmit} className="p-3 bg-[#0c1328] border-t border-slate-900 flex gap-2">
        <input
          type="text"
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          placeholder="Consult with Jardev AI Architect about your project proposal..."
          className="flex-1 bg-[#060a13] text-slate-200 rounded-lg px-3 py-2 text-xs border border-slate-800/80 focus:outline-none focus:border-orange-500/50 transition font-sans"
        />
        <button
          type="submit"
          disabled={!inputMsg.trim() || loading}
          className="bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-500 hover:to-orange-500 disabled:opacity-40 text-white font-mono font-bold text-xs px-4 py-2 rounded-lg transition shrink-0 flex items-center gap-1.5 uppercase tracking-wider shadow-md shadow-orange-950/20"
        >
          <Send size={11} />
          Send
        </button>
      </form>
    </div>
  );
}
