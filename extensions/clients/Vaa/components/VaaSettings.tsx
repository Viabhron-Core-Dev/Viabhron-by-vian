import React, { useState } from "react";
import { 
  ArrowLeft, 
  Moon, 
  Layers, 
  Zap, 
  ShieldCheck, 
  User, 
  ChevronRight,
  Sparkles 
} from "lucide-react";
import { motion } from "motion/react";

interface VaaSettingsProps {
  onClose: () => void;
  availableFilters: string[];
  activeFilters: string[];
  onToggleFilter: (filter: string) => void;
  onReorderFilters: (filters: string[]) => void;
}

export const VaaSettings: React.FC<VaaSettingsProps> = ({ 
  onClose, 
  availableFilters, 
  activeFilters, 
  onToggleFilter,
  onReorderFilters 
}) => {
  const [subPage, setSubPage] = useState<"main" | "filters">("main");

  const moveFilter = (index: number, direction: 'up' | 'down') => {
    const newFilters = [...availableFilters];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= newFilters.length) return;
    
    const [movedItem] = newFilters.splice(index, 1);
    newFilters.splice(targetIndex, 0, movedItem);
    onReorderFilters(newFilters);
  };

  if (subPage === "filters") {
    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="absolute inset-0 bg-slate-50 z-[100] flex flex-col"
      >
        <div className="p-6 bg-white border-b border-slate-100 flex items-center gap-4">
          <button onClick={() => setSubPage("main")} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-slate-600" />
          </button>
          <h2 className="text-xl font-bold text-slate-800">Manage Filters</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black mb-6 px-2">Active Filter Pills</p>
            <div className="space-y-2">
              {availableFilters.map((filter, index) => (
                <div 
                  key={filter} 
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col gap-1">
                      <button 
                        onClick={() => moveFilter(index, 'up')}
                        disabled={index === 0}
                        className={`p-0.5 transition-colors ${index === 0 ? "text-slate-200 cursor-not-allowed" : "text-slate-300 hover:text-wa-header"}`}
                      >
                        <ChevronRight className="w-4 h-4 -rotate-90" />
                      </button>
                      <button 
                        onClick={() => moveFilter(index, 'down')}
                        disabled={index === availableFilters.length - 1}
                        className={`p-0.5 transition-colors ${index === availableFilters.length - 1 ? "text-slate-200 cursor-not-allowed" : "text-slate-300 hover:text-wa-header"}`}
                      >
                        <ChevronRight className="w-4 h-4 rotate-90" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activeFilters.includes(filter) ? "bg-wa-header/10 text-wa-header" : "bg-white text-slate-300 border border-slate-100"}`}>
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-bold text-slate-700">{filter}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => onToggleFilter(filter)}
                    className={`w-12 h-6 rounded-full relative transition-colors ${activeFilters.includes(filter) ? "bg-wa-header" : "bg-slate-200"}`}
                  >
                    <motion.div 
                      animate={{ x: activeFilters.includes(filter) ? 24 : 4 }}
                      className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm" 
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <p className="text-[10px] text-slate-400 text-center uppercase tracking-widest font-bold">Use arrows to adjust order</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="absolute inset-0 bg-slate-50 z-[100] flex flex-col"
    >
      <div className="p-6 bg-white border-b border-slate-100 flex items-center gap-4">
        <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-slate-600" />
        </button>
        <h2 className="text-xl font-bold text-slate-800">Vaa Settings</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        <section className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Chat Filters</h3>
          <div className="bg-white rounded-3xl p-4 border border-slate-100 space-y-4">
            <button 
              onClick={() => setSubPage("filters")}
              className="w-full flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-slate-700">Manage Filter Pills</div>
                  <div className="text-[10px] text-slate-400">Order and visibility of chat filters</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-400">{activeFilters.length} Active</span>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors" />
              </div>
            </button>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Aesthetics</h3>
          <div className="bg-white rounded-3xl p-4 border border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center">
                  <Moon className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-700">Celestial Dark Mode</div>
                  <div className="text-[10px] text-slate-400">Deep space theme for Vaa</div>
                </div>
              </div>
              <div className="w-12 h-6 bg-indigo-600 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-700">Glassmorphism</div>
                  <div className="text-[10px] text-slate-400">Frosted glass UI effects</div>
                </div>
              </div>
              <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-700">Hybrid Lens</div>
                  <div className="text-[10px] text-slate-400">Overlay system telemetry in Vaa</div>
                </div>
              </div>
              <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sovereignty</h3>
          <div className="bg-white rounded-3xl p-4 border border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-green-50 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-700">Private Mode</div>
                  <div className="text-[10px] text-slate-400">Local-first data processing</div>
                </div>
              </div>
              <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Account</h3>
          <div className="bg-white rounded-3xl p-4 border border-slate-100 space-y-4">
            <button className="w-full flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center">
                  <User className="w-5 h-5 text-slate-600" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-slate-700">Profile Identity</div>
                  <div className="text-[10px] text-slate-400">Manage your Vaa persona</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors" />
            </button>
          </div>
        </section>
      </div>
    </motion.div>
  );
};
