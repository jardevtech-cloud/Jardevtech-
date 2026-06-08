import React, { useState, useEffect } from "react";
import { Shield, Lock, Unlock, Eye, EyeOff, Save, Plus, Trash2, Edit3, RotateCcw, X, Check } from "lucide-react";
import { ProjectTemplate } from "../types";
import { PROJECTS_DATA } from "../data";

interface AdminDashboardProps {
  onProjectsUpdated: (updatedList: ProjectTemplate[]) => void;
  currentProjects: ProjectTemplate[];
  onClose: () => void;
}

export default function AdminDashboard({ onProjectsUpdated, currentProjects, onClose }: AdminDashboardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Managing projects state
  const [editProject, setEditProject] = useState<Partial<ProjectTemplate> | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Form fields for adding/editing projects
  const [projId, setProjId] = useState("");
  const [projTitle, setProjTitle] = useState("");
  const [projSubtitle, setProjSubtitle] = useState("");
  const [projDescription, setProjDescription] = useState("");
  const [projFeatures, setProjFeatures] = useState("");
  const [projCta, setProjCta] = useState("");
  const [projStatus, setProjStatus] = useState<"new" | "old">("new");

  // Check existing session on load
  useEffect(() => {
    const session = sessionStorage.getItem("jarsila_admin_logged_in");
    if (session === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "jardevtech" && password === "jarsilapaul1303") {
      setIsAuthenticated(true);
      setErrorMessage("");
      sessionStorage.setItem("jarsila_admin_logged_in", "true");
    } else {
      setErrorMessage("Unauthorized security signature. Check credentials.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("jarsila_admin_logged_in");
    setUsername("");
    setPassword("");
  };

  const startEdit = (proj: ProjectTemplate) => {
    setEditProject(proj);
    setIsAddingNew(false);
    setProjId(proj.id);
    setProjTitle(proj.title);
    setProjSubtitle(proj.subtitle);
    setProjDescription(proj.description);
    setProjFeatures(proj.features.join(", "));
    setProjCta(proj.ctaText);
    setProjStatus(proj.status || "new");
  };

  const startAddNew = () => {
    setIsAddingNew(true);
    setEditProject(null);
    setProjId("project_" + Date.now());
    setProjTitle("");
    setProjSubtitle("");
    setProjDescription("");
    setProjFeatures("");
    setProjCta("Explore Platform");
    setProjStatus("new");
  };

  const saveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle || !projDescription) return;

    const parsedFeatures = projFeatures
      .split(",")
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const updatedTemplate: ProjectTemplate = {
      id: projId,
      title: projTitle,
      subtitle: projSubtitle,
      description: projDescription,
      features: parsedFeatures,
      ctaText: projCta,
      status: projStatus,
    };

    let nextList: ProjectTemplate[] = [];

    if (isAddingNew) {
      if (currentProjects.some((p) => p.id === projId)) {
        alert("A project with this ID signature already exists.");
        return;
      }
      nextList = [...currentProjects, updatedTemplate];
    } else {
      nextList = currentProjects.map((p) => (p.id === projId ? updatedTemplate : p));
    }

    onProjectsUpdated(nextList);
    resetForm();
  };

  const deleteProject = (id: string) => {
    if (window.confirm("Are you sure you want to decommission this project blueprint?")) {
      const nextList = currentProjects.filter((p) => p.id !== id);
      onProjectsUpdated(nextList);
      if (editProject?.id === id) {
        resetForm();
      }
    }
  };

  const resetToFactoryDefaults = () => {
    if (window.confirm("Restore factory default project templates? This overwrites custom lists.")) {
      onProjectsUpdated(PROJECTS_DATA);
      resetForm();
    }
  };

  const resetForm = () => {
    setEditProject(null);
    setIsAddingNew(false);
    setProjId("");
    setProjTitle("");
    setProjSubtitle("");
    setProjDescription("");
    setProjFeatures("");
    setProjCta("");
    setProjStatus("new");
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#02050b]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#050a14] border border-slate-800 rounded-2xl w-full max-w-4xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Cybersecurity header bars */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-orange-500 to-emerald-500"></div>

        {/* Header toolbar */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-900 bg-slate-950/40">
          <div className="flex items-center gap-2.5">
            <div className={`p-1.5 rounded-lg ${isAuthenticated ? "bg-emerald-500/10 text-emerald-400" : "bg-orange-500/10 text-orange-400"}`}>
              {isAuthenticated ? <Unlock size={18} /> : <Shield size={18} />}
            </div>
            <div>
              <h3 className="text-sm font-black text-white font-mono uppercase tracking-widest">
                JardevTech Project Console
              </h3>
              <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                Founder secure control gateway • Jarsila Paul
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            id="close-admin-btn"
            className="text-slate-500 hover:text-white p-1 rounded-full transition hover:bg-slate-900/60"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content body wrapper */}
        <div className="flex-1 overflow-y-auto p-6">
          {!isAuthenticated ? (
            /* Secure Access Auth Form */
            <div className="max-w-md mx-auto py-10 space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-full flex items-center justify-center mx-auto animate-pulse">
                  <Lock size={22} />
                </div>
                <h4 className="text-md font-bold text-slate-100 uppercase tracking-widest font-mono">AUTHENTICATION REQUIRED</h4>
                <p className="text-xs text-slate-400">Input security signature tokens to modify database arrays.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4 bg-slate-950/60 border border-slate-900 rounded-xl p-5 shadow-inner">
                {errorMessage && (
                  <div className="p-3 bg-red-950/20 border border-red-900/40 rounded-lg text-xs text-red-400 font-mono text-center">
                    {errorMessage}
                  </div>
                )}

                <div className="space-y-1">
                  <label id="username-lbl" className="text-[9px] font-bold text-slate-550 uppercase font-mono tracking-wider">
                    OPERATOR SIGNATURE (Username)
                  </label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="jardevtech"
                    className="w-full bg-slate-950 text-xs text-slate-200 border border-slate-900 focus:border-orange-500/50 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-0 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label id="password-lbl" className="text-[9px] font-bold text-slate-550 uppercase font-mono tracking-wider">
                    SECURITY KEYPAYLOAD (Password)
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      placeholder="••••••••••••"
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-950 text-xs text-slate-200 border border-slate-900 focus:border-orange-500/50 rounded-lg pl-3 pr-10 py-2.5 focus:outline-none focus:ring-0 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                    >
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  id="admin-login-btn"
                  className="w-full bg-gradient-to-r from-blue-700 to-orange-600 hover:from-blue-600 hover:to-orange-500 text-white font-mono font-bold text-xs py-2.5 px-4 rounded-lg tracking-widest uppercase transition shadow mt-2"
                >
                  DECRYPT & AUTHENTICATE
                </button>
              </form>
            </div>
          ) : (
            /* Authorized Project Editor Suite */
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Left Column: Projects directories */}
              <div className="md:col-span-5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono tracking-wider uppercase text-slate-500">
                    Active System Blueprints
                  </span>
                  <button
                    onClick={startAddNew}
                    className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-[10px] items-center gap-1 font-mono hover:text-emerald-300 transition duration-200 px-2.5 py-1.5 rounded-lg border border-emerald-500/20 flex"
                  >
                    <Plus size={11} />
                    Add Blueprint
                  </button>
                </div>

                {/* Projects list */}
                <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1 no-scrollbar">
                  {currentProjects.map((p, pIdx) => (
                    <div
                      key={p.id}
                      className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                        (editProject?.id === p.id || (isAddingNew && projId === p.id))
                          ? "bg-[#0c1325] border-orange-500/60 shadow"
                          : "bg-slate-950/40 border-slate-900 hover:border-slate-800"
                      }`}
                    >
                      <div className="space-y-1 truncate pr-2">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${p.status === "new" ? "bg-emerald-400" : "bg-orange-400"}`}></span>
                          <span className="text-xs font-bold text-slate-100 truncate block font-mono">
                            {p.title}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500 uppercase block font-mono tracking-wider">
                          Module {pIdx + 1} • {p.status === "new" ? "Active New" : "Completed Old"}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => startEdit(p)}
                          className="text-slate-400 hover:text-orange-400 p-1.5 rounded-md hover:bg-slate-900 transition"
                          title="Edit Blueprint"
                        >
                          <Edit3 size={12} />
                        </button>
                        <button
                          onClick={() => deleteProject(p.id)}
                          className="text-slate-400 hover:text-red-400 p-1.5 rounded-md hover:bg-slate-900 transition"
                          title="Delete Blueprint"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {currentProjects.length === 0 && (
                    <div className="p-8 text-center text-slate-600 font-mono text-xs border border-dashed border-slate-800/60 rounded-xl">
                      No active projects in memory. Create one above.
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={resetToFactoryDefaults}
                  className="w-full border border-dashed border-slate-800 hover:border-slate-700 text-slate-500 hover:text-slate-350 text-[10px] font-mono py-2 rounded-lg transition flex items-center justify-center gap-1.5"
                >
                  <RotateCcw size={11} />
                  Reset to default portfolio values
                </button>
              </div>

              {/* Right Column: Project input form */}
              <div className="md:col-span-7 bg-slate-950/30 border border-slate-900 rounded-xl p-5 self-start">
                {(!editProject && !isAddingNew) ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center space-y-2">
                    <span className="text-slate-600 font-mono">⌘ CONTROLSTAGE</span>
                    <p className="text-xs text-slate-500">Select an existing template on the left or create a new blueprint structure dynamically.</p>
                  </div>
                ) : (
                  <form onSubmit={saveProject} className="space-y-4">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono border-b border-slate-900 pb-2 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded bg-orange-400"></span>
                      {isAddingNew ? "Initialize New Blueprint" : `Modify: ${editProject?.id}`}
                    </h4>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-slate-550 font-bold uppercase block">Blueprint ID Code</label>
                        <input
                          type="text"
                          required
                          disabled={!isAddingNew}
                          value={projId}
                          onChange={(e) => setProjId(e.target.value)}
                          placeholder="e-commerce"
                          className="w-full bg-slate-950 text-xs text-slate-300 border border-slate-900 focus:border-orange-500/55 rounded-lg px-3 py-2 focus:outline-none font-mono disabled:opacity-50"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-slate-550 font-bold uppercase block">Launch Status</label>
                        <select
                          value={projStatus}
                          onChange={(e) => setProjStatus(e.target.value as "new" | "old")}
                          className="w-full bg-slate-950 text-xs text-slate-300 border border-slate-900 focus:border-orange-500/55 rounded-lg px-3 py-2 focus:outline-none font-mono"
                        >
                          <option value="new">New (Active / Upcoming)</option>
                          <option value="old">Old (Completed / Old Project)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-slate-550 font-bold uppercase block">Primary Title</label>
                      <input
                        type="text"
                        required
                        value={projTitle}
                        onChange={(e) => setProjTitle(e.target.value)}
                        placeholder="e.g. DIGITAL EXPERIENCES"
                        className="w-full bg-slate-950 text-xs text-slate-350 border border-slate-900 focus:border-orange-500/55 rounded-lg px-3 py-2 focus:outline-none font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-slate-550 font-bold uppercase block">Secondary Subtitle</label>
                      <input
                        type="text"
                        value={projSubtitle}
                        onChange={(e) => setProjSubtitle(e.target.value)}
                        placeholder="e.g. Branding & Performance"
                        className="w-full bg-slate-950 text-xs text-slate-350 border border-slate-900 focus:border-orange-500/55 rounded-lg px-3 py-2 focus:outline-none font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-slate-550 font-bold uppercase block">Core Description Narrative</label>
                      <textarea
                        required
                        value={projDescription}
                        onChange={(e) => setProjDescription(e.target.value)}
                        rows={3}
                        placeholder="Narrative summary describing architecture and scope..."
                        className="w-full bg-slate-950 text-xs text-slate-350 border border-slate-900 focus:border-orange-500/55 rounded-lg px-3 py-2 focus:outline-none font-sans leading-normal"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-slate-550 font-bold uppercase block">
                        Features (Comma-separated)
                      </label>
                      <input
                        type="text"
                        value={projFeatures}
                        onChange={(e) => setProjFeatures(e.target.value)}
                        placeholder="Payments, Auth Gateway, Real-time WebSockets"
                        className="w-full bg-slate-950 text-xs text-slate-350 border border-slate-900 focus:border-orange-500/55 rounded-lg px-3 py-2 focus:outline-none font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-slate-550 font-bold uppercase block">Button Text (CTA)</label>
                      <input
                        type="text"
                        value={projCta}
                        onChange={(e) => setProjCta(e.target.value)}
                        placeholder="Contact Sales"
                        className="w-full bg-slate-950 text-xs text-slate-350 border border-slate-900 focus:border-orange-500/55 rounded-lg px-3 py-2 focus:outline-none font-mono"
                      />
                    </div>

                    <div className="flex gap-2.5 justify-end pt-2 border-t border-slate-900">
                      <button
                        type="button"
                        onClick={resetForm}
                        className="bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-mono font-bold px-4 py-2 rounded-lg transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        id="save-project-btn"
                        className="bg-gradient-to-r from-blue-700 to-orange-600 hover:from-blue-600 hover:to-orange-500 text-white font-mono font-semibold text-xs px-5 py-2 rounded-lg transition flex items-center gap-1.5"
                      >
                        <Save size={11} />
                        Apply Blueprint
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Security session footer stats wrapper */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-900 flex justify-between items-center text-[9px] font-mono text-slate-500 select-none">
          <span>OPERATOR SECURE SESSION: ACTIVE</span>
          {isAuthenticated && (
            <button
               id="admin-logout-btn"
              onClick={handleLogout}
              className="text-orange-400 hover:text-orange-300 font-bold transition hover:underline"
            >
              Sign out control stage
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
