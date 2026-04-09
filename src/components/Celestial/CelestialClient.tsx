import React, { useState, useEffect, useRef } from "react";
import { 
  MessageSquare, 
  Users, 
  Globe, 
  Settings, 
  Plus, 
  Search, 
  MoreVertical, 
  Send, 
  Paperclip, 
  Mic, 
  ArrowLeft,
  Sparkles,
  Zap,
  Layout,
  Store,
  Shield,
  Cpu,
  Workflow as WorkflowIcon,
  MessageCircle,
  QrCode,
  Camera,
  AlertCircle,
  Video,
  Phone,
  Smile,
  Share2,
  ChevronRight,
  RefreshCw,
  Database,
  Briefcase,
  User,
  History,
  LogOut,
  Terminal,
  Egg,
  Activity,
  HardDrive,
  Wifi,
  Trash2,
  Moon,
  FileText,
  X,
  ChevronDown,
  Clock,
  CheckCircle2,
  Play,
  HelpCircle,
  Bot,
  Network,
  Layers
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { localDb } from "../../lib/db";
import { 
  CelestialNode, 
  CelestialChat, 
  Message, 
  CelestialViewType,
  Agent,
  CanvasNode,
  CanvasEdge,
  NewsCard
} from "../../types";
import { Toaster, toast } from "sonner";
import { Canvas } from "../Shell/Canvas";

import { useClickOutside } from "../../hooks/useClickOutside";

// --- Sub-components ---

const SovereignCheck = ({ onClose }: { onClose: () => void }) => {
  const [ramUsage, setRamUsage] = useState(45);
  const [storageUsage, setStorageUsage] = useState(12);
  const [networkSpeed, setNetworkSpeed] = useState({ up: 1.2, down: 4.5 });
  const [tokenCount, setTokenCount] = useState(12450);

  useEffect(() => {
    const interval = setInterval(() => {
      setRamUsage(prev => Math.min(95, Math.max(30, prev + (Math.random() * 4 - 2))));
      setNetworkSpeed({ 
        up: Number((Math.random() * 2 + 0.5).toFixed(1)), 
        down: Number((Math.random() * 10 + 2).toFixed(1)) 
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (usage: number) => {
    if (usage > 90) return 'text-red-500';
    if (usage > 75) return 'text-orange-500';
    return 'text-green-500';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      className="fixed inset-0 bg-slate-900/95 backdrop-blur-2xl z-[120] flex flex-col p-6 text-white"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
            <Shield className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-lg font-black uppercase tracking-widest">Sovereign Check</h2>
            <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest">System Heartbeat Diagnostic</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
          <X className="w-6 h-6 text-gray-400" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar space-y-8">
        {/* Resource Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 border border-white/10 p-5 rounded-[2rem] space-y-3">
            <div className="flex items-center gap-2 text-gray-400">
              <Cpu className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Memory</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className={`text-3xl font-black ${getStatusColor(ramUsage)}`}>{Math.round(ramUsage)}%</span>
              <span className="text-[10px] text-gray-500">of 3GB</span>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 p-5 rounded-[2rem] space-y-3">
            <div className="flex items-center gap-2 text-gray-500">
              <Wifi className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Network</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-gray-500">UP</span>
                <span className="text-blue-400">{networkSpeed.up} MB/s</span>
              </div>
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-gray-500">DOWN</span>
                <span className="text-cyan-400">{networkSpeed.down} MB/s</span>
              </div>
            </div>
          </div>
        </div>

        {/* Token Ledger */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-[2.5rem] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-[11px] font-black uppercase tracking-widest">Token Ledger</span>
            </div>
            <span className="text-xs font-mono text-white">{tokenCount.toLocaleString()}</span>
          </div>
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "65%" }}
              className="h-full bg-yellow-400"
            />
          </div>
          <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Daily Quota: 65% Consumed</p>
        </div>

        {/* Running Tasks */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Active Sovereign Tasks</h3>
          <div className="space-y-3">
            {[
              { name: "GitHub Hatchery Sync", progress: 85, status: "Indexing" },
              { name: "Sentinel Log Analysis", progress: 40, status: "Processing" },
              { name: "News Pulse Scraper", progress: 100, status: "Idle" }
            ].map(task => (
              <div key={task.name} className="bg-white/5 border border-white/10 p-4 rounded-3xl flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${task.progress === 100 ? "bg-green-500/20 text-green-400" : "bg-blue-500/20 text-blue-400"}`}>
                  {task.progress === 100 ? <CheckCircle2 className="w-5 h-5" /> : <RefreshCw className="w-5 h-5 animate-spin" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-xs font-bold truncate">{task.name}</h4>
                    <span className="text-[9px] font-mono text-gray-500">{task.progress}%</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500" style={{ width: `${task.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-auto pt-6 flex gap-3">
        <button className="flex-1 py-4 bg-indigo-600 rounded-2xl font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-indigo-600/20">
          Optimize System
        </button>
        <button className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold uppercase tracking-widest text-[10px]">
          Purge Cache
        </button>
      </div>
    </motion.div>
  );
};

const WorkflowBuilder = ({ onClose }: { onClose: () => void }) => {
  const steps = [
    { id: "1", type: "trigger", label: "Trigger", description: "When a new email arrives", icon: <MessageSquare className="w-5 h-5" />, color: "bg-blue-500" },
    { id: "2", type: "process", label: "Process", description: "Summarize with Research Agent", icon: <Cpu className="w-5 h-5" />, color: "bg-purple-500" },
    { id: "3", type: "action", label: "Action", description: "Post to #updates channel", icon: <Globe className="w-5 h-5" />, color: "bg-green-500" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      className="fixed inset-0 bg-white z-[120] flex flex-col p-6"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Workflow Builder</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Design your AI automation pipeline</p>
        </div>
        <button onClick={onClose} className="p-2 bg-slate-100 rounded-full">
          <X className="w-6 h-6 text-slate-400" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar py-4">
        <div className="relative pl-8 space-y-12">
          {/* Vertical Line */}
          <div className="absolute left-[2.45rem] top-4 bottom-4 w-0.5 bg-slate-100" />

          {steps.map((step, i) => (
            <div key={step.id} className="relative flex items-center gap-6 group">
              <div className={`w-14 h-14 rounded-2xl ${step.color} text-white flex items-center justify-center shadow-lg z-10 group-hover:scale-110 transition-transform`}>
                {step.icon}
              </div>
              <div className="flex-1 bg-slate-50 border border-slate-100 rounded-3xl p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900">{step.label}</h3>
                  <p className="text-xs text-slate-500">{step.description}</p>
                </div>
                <button className="p-2 text-slate-300 hover:text-wa-header transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}

          <div className="relative flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 z-10 bg-white">
              <Plus className="w-6 h-6" />
            </div>
            <button className="text-sm font-bold text-slate-400 uppercase tracking-widest hover:text-wa-header transition-colors">
              Add Step
            </button>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-6 flex gap-3">
        <button className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold uppercase tracking-widest text-xs">
          Save Draft
        </button>
        <button className="flex-1 py-4 bg-wa-header text-white rounded-2xl font-bold uppercase tracking-widest text-xs shadow-lg shadow-wa-header/20">
          Deploy Workflow
        </button>
      </div>
    </motion.div>
  );
};

const GeminiBanner = () => (
  <div className="bg-wa-banner mx-4 mt-2 mb-4 p-3 rounded-xl flex items-center justify-between shadow-sm border border-white/10">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center">
        <AlertCircle className="w-5 h-5 text-yellow-400" />
      </div>
      <p className="text-[11px] text-white font-medium leading-tight">
        Gemini API Key required for AI features
      </p>
    </div>
    <button className="bg-white text-wa-header px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider">
      Setup
    </button>
  </div>
);

const SearchAndFilters = () => (
  <div className="px-4 space-y-4 mb-4">
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
      <input 
        type="text" 
        placeholder="Search..."
        className="w-full bg-slate-100 border-none rounded-2xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-wa-header/20 outline-none"
      />
    </div>
    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
      {["All", "Semi Local", "Cloudflare", "GitHub", "Gmail"].map((filter, i) => (
        <button 
          key={filter}
          className={`px-5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
            i === 0 ? "bg-wa-header text-white shadow-md" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  </div>
);

const ChatList = ({ chats, onSelectChat }: { chats: CelestialChat[], onSelectChat: (chat: CelestialChat) => void }) => {
  return (
    <div className="flex-1 overflow-y-auto no-scrollbar px-2">
      {chats.map(chat => (
        <div 
          key={chat.id} 
          onClick={() => onSelectChat(chat)}
          className="flex items-center gap-4 p-3 hover:bg-slate-50 cursor-pointer rounded-2xl transition-colors mb-1"
        >
          <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold shadow-sm border-2 ${
            chat.type === 'gmail' ? 'bg-blue-50 text-blue-500 border-blue-100' : 
            chat.type === 'sentinel' ? 'bg-orange-50 text-orange-500 border-orange-100' :
            'bg-purple-50 text-purple-500 border-purple-100'
          }`}>
            {chat.type === 'gmail' ? "?" : chat.type === 'sentinel' ? <Terminal className="w-7 h-7" /> : "Ω"}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900 truncate">{chat.name}</h3>
              <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-tighter ${
                chat.type === 'gmail' ? 'bg-red-100 text-red-600' : 
                chat.type === 'sentinel' ? 'bg-orange-100 text-orange-600' :
                'bg-indigo-100 text-indigo-600'
              }`}>
                {chat.type?.toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-slate-500 truncate mt-0.5">{chat.lastMessage}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const NewsTab = ({ 
  onShowMenu, 
  showMenu, 
  menuRef, 
  onOpenFilter,
  showSwipeView,
  setShowSwipeView
}: { 
  onShowMenu: () => void, 
  showMenu: boolean, 
  menuRef: React.RefObject<HTMLDivElement>, 
  onOpenFilter: () => void,
  showSwipeView: boolean,
  setShowSwipeView: (show: boolean) => void
}) => {
  const [newsCards] = useState<NewsCard[]>([
    {
      id: "1",
      title: "Gemini 1.5 Flash: 1M Context Window",
      summary: "Google releases the fastest Gemini model yet with a massive context window.",
      fullContent: "Gemini 1.5 Flash is optimized for speed and efficiency at scale. It features a 1 million token context window, enabling complex reasoning over massive datasets. This model is ideal for real-time applications like the Viabhron OS.",
      source: "Google AI Blog",
      timestamp: "2h ago",
      category: "Models"
    },
    {
      id: "2",
      title: "Llama 3.1 405B: Open Weights Frontier",
      summary: "Meta's largest model yet rivals GPT-4o in reasoning and coding.",
      fullContent: "Llama 3.1 405B is the first open-weights model to truly rival the top proprietary models. It excels in multilingual translation, general knowledge, and complex reasoning. Meta has also released updated 8B and 70B versions.",
      source: "Meta AI",
      timestamp: "5h ago",
      category: "Open Source"
    }
  ]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Top Part: Status-style News */}
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Urgent Intelligence</h2>
          <div className="flex items-center gap-4 relative">
            <RefreshCw className="w-5 h-5 text-wa-header" />
            <button onClick={onShowMenu}>
              <MoreVertical className="w-5 h-5 text-slate-400" />
            </button>

            <AnimatePresence>
              {showMenu && (
                <motion.div 
                  ref={menuRef}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-8 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 p-1.5 z-50"
                >
                  {[
                    { label: "Mute Notifications", action: () => {} },
                    { label: "News Filters", action: onOpenFilter },
                    { label: "Clear News", action: () => {} }
                  ].map(item => (
                    <button 
                      key={item.label} 
                      onClick={item.action}
                      className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {newsCards.map(card => (
            <div 
              key={card.id}
              onClick={() => setShowSwipeView(true)}
              className="flex-shrink-0 w-32 h-44 bg-slate-900 rounded-2xl p-3 flex flex-col justify-between border-2 border-wa-header/20 relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 bg-wa-header/10" />
              <div className="w-8 h-8 rounded-full bg-wa-header flex items-center justify-center z-10 border-2 border-white shadow-lg">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <p className="text-[10px] font-bold text-white leading-tight z-10 line-clamp-4 group-hover:scale-105 transition-transform">
                {card.title}
              </p>
            </div>
          ))}
          <div className="flex-shrink-0 w-32 h-44 bg-slate-100 rounded-2xl flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-200 text-slate-400">
            <Plus className="w-6 h-6" />
            <span className="text-[9px] font-bold uppercase tracking-widest">More</span>
          </div>
        </div>
      </div>

      {/* Bottom Part: Channels Feed */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-4 space-y-6">
        <div className="pt-4 border-t border-slate-100">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Intelligence Channels</h2>
          <div className="space-y-4">
            {[
              { name: "GitHub Sentinel", icon: <Terminal className="w-5 h-5" />, desc: "Trending AI Repos & MCP Servers", time: "12:45 PM", color: "bg-slate-900 text-white" },
              { name: "HuggingFace Pulse", icon: <Smile className="w-5 h-5" />, desc: "New Open Weights Models", time: "11:20 AM", color: "bg-yellow-400 text-slate-900" },
              { name: "Sovereign Alerts", icon: <Shield className="w-5 h-5" />, desc: "Critical System Updates", time: "Yesterday", color: "bg-indigo-600 text-white" }
            ].map(channel => (
              <div key={channel.name} className="flex items-center gap-4 group cursor-pointer">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-md ${channel.color}`}>
                  {channel.icon}
                </div>
                <div className="flex-1 min-w-0 border-b border-slate-50 pb-4 group-last:border-none">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-slate-900 truncate">{channel.name}</h3>
                    <span className="text-[10px] text-slate-400 font-medium">{channel.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">{channel.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showSwipeView && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-slate-900 z-[130] flex flex-col"
            style={{ top: '72px', bottom: '72px' }} // Sandwiched between bars
          >
            <div className="flex-1 overflow-x-auto snap-x snap-mandatory no-scrollbar flex">
              {newsCards.map(card => (
                <div key={card.id} className="h-full w-full flex-shrink-0 snap-start flex flex-col p-8 space-y-6 bg-slate-900 text-white relative">
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-wa-header uppercase tracking-[0.2em]">{card.category}</span>
                    <h1 className="text-3xl font-bold leading-tight">{card.title}</h1>
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                      <span>{card.source}</span>
                      <span>•</span>
                      <span>{card.timestamp}</span>
                    </div>
                  </div>
                  <div className="flex-1 text-slate-300 leading-relaxed space-y-4 overflow-y-auto no-scrollbar">
                    <p className="text-lg font-medium text-white">{card.summary}</p>
                    <p>{card.fullContent}</p>
                  </div>
                  <div className="flex items-center gap-4 pt-8">
                    <button className="flex-1 py-4 bg-wa-header text-white rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2">
                      <Share2 className="w-5 h-5" />
                      <span>Share to Agent</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Floating Close Button */}
            <button 
              onClick={() => setShowSwipeView(false)}
              className="absolute bottom-6 right-6 w-14 h-14 bg-white text-slate-900 rounded-full shadow-2xl flex items-center justify-center z-[140] hover:scale-110 transition-transform active:scale-95"
            >
              <X className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const WorkflowTab = ({ onOpenWorkflow }: { onOpenWorkflow: () => void }) => (
  <div className="flex-1 flex flex-col p-4">
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-xs font-bold text-wa-header uppercase tracking-widest">Workflow Lab</h2>
      <RefreshCw className="w-5 h-5 text-wa-header" />
    </div>
    
    <div className="space-y-4">
      {/* Sentinel-style Default Canvas */}
      <div 
        onClick={onOpenWorkflow}
        className="bg-indigo-50 border border-indigo-100 rounded-[2.5rem] p-6 flex items-center gap-5 shadow-sm cursor-pointer hover:bg-indigo-100 transition-colors group"
      >
        <div className="w-16 h-16 rounded-3xl bg-wa-header text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          <WorkflowIcon className="w-8 h-8" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-slate-900 text-lg">Sentinel Canvas</h3>
          <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">Default Empty Scratchpad</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-indigo-600 shadow-sm">
          <Play className="w-5 h-5 fill-indigo-600" />
        </div>
      </div>

      <div className="pt-8 text-center space-y-2">
        <p className="text-slate-400 font-medium text-sm">No other councils formed yet.</p>
        <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">Tap + to build a new pipeline</p>
      </div>
    </div>
  </div>
);

const CloudflareKnockout = ({ onClose }: { onClose: () => void }) => {
  const [showOracle, setShowOracle] = useState(false);
  const [oracleInput, setOracleInput] = useState("");
  const [oracleMessages, setOracleMessages] = useState([
    { role: 'assistant', content: "I am the Resident AI Oracle. I have mapped your OS substrate. How can I help you configure your Cloudflare Extra Processor?" }
  ]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="fixed inset-4 z-[100] bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-800 flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20">
            <Network className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white tracking-tight">Cloudflare Extra Processor</h2>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Edge Intelligence Substrate</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowOracle(!showOracle)}
            className={`p-3 rounded-2xl transition-all ${showOracle ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20" : "bg-slate-800 text-slate-400 hover:text-white"}`}
          >
            <HelpCircle className="w-5 h-5" />
          </button>
          <button onClick={onClose} className="p-3 bg-slate-800 text-slate-400 hover:text-white rounded-2xl transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Config Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-800/50 rounded-3xl border border-slate-700/50 space-y-4">
              <div className="flex items-center gap-3 text-orange-500">
                <Zap className="w-5 h-5" />
                <h3 className="text-sm font-bold uppercase tracking-widest">Edge Workers</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">Offload heavy compute tasks to Cloudflare's global edge network.</p>
              <div className="pt-4">
                <button className="w-full py-3 bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-orange-600 transition-colors">
                  Deploy New Worker
                </button>
              </div>
            </div>
            <div className="p-6 bg-slate-800/50 rounded-3xl border border-slate-700/50 space-y-4">
              <div className="flex items-center gap-3 text-blue-400">
                <Database className="w-5 h-5" />
                <h3 className="text-sm font-bold uppercase tracking-widest">R2 Storage</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">S3-compatible object storage with zero egress fees for your Neural Archive.</p>
              <div className="pt-4">
                <button className="w-full py-3 bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-600 transition-colors">
                  Configure Bucket
                </button>
              </div>
            </div>
          </div>

          <div className="p-8 bg-slate-950 rounded-[2rem] border border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-white uppercase tracking-[0.2em]">Late-Binding Key Injection</h3>
              <div className="px-3 py-1 bg-orange-500/10 text-orange-500 rounded-full text-[8px] font-black uppercase tracking-widest border border-orange-500/20">
                Security Division Active
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Cloudflare API Token</label>
                <div className="relative">
                  <input 
                    type="password" 
                    placeholder="••••••••••••••••••••••••••••••••"
                    className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4 text-sm text-white outline-none focus:border-orange-500/50 transition-colors"
                  />
                  <Shield className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                </div>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed italic">
                * Tokens are only injected into the protected substrate after the Resident AI has audited the deployment code.
              </p>
            </div>
          </div>
        </div>

        {/* Oracle Sidebar */}
        <AnimatePresence>
          {showOracle && (
            <motion.div 
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              className="w-96 border-l border-slate-800 bg-slate-900 flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 border border-indigo-500/20">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-widest">Resident Oracle</h3>
                  <p className="text-[9px] font-bold text-green-500 uppercase tracking-widest">Context: Cloudflare Substrate</p>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
                {oracleMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[90%] p-4 rounded-2xl text-xs leading-relaxed ${
                      msg.role === 'user' ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 border-t border-slate-800">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Ask the Oracle..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 text-xs text-white outline-none focus:border-indigo-500/50 transition-colors"
                    value={oracleInput}
                    onChange={(e) => setOracleInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && oracleInput.trim()) {
                        setOracleMessages([...oracleMessages, { role: 'user', content: oracleInput }]);
                        setOracleInput("");
                        // Mock response
                        setTimeout(() => {
                          setOracleMessages(prev => [...prev, { role: 'assistant', content: "I am analyzing your request against the Sovereign Charter. I will generate the required manifest shortly." }]);
                        }, 1000);
                      }
                    }}
                  />
                  <Send className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const HQExtensionsVault = ({ onOpenWorkforce }: { onOpenWorkforce: () => void }) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    connectors: true,
    skills: false,
    tools: false,
    mcp: false,
    gaming: false,
    testing: false,
    extraProcessor: false,
    branches: false,
    viabhronicLoader: false,
    clients: false
  });

  const [showCloudflareKnockout, setShowCloudflareKnockout] = useState(false);

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const VaultSection = ({ title, icon: Icon, section, children, onAdd }: { title: string, icon: any, section: string, children?: React.ReactNode, onAdd?: () => void }) => (
    <div className="space-y-3">
      <div 
        onClick={() => toggleSection(section)}
        className="w-full flex items-center justify-between group cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl transition-colors ${openSections[section] ? "bg-wa-header/10 text-wa-header" : "bg-slate-100 text-slate-400"}`}>
            <Icon className="w-5 h-5" />
          </div>
          <h2 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.15em]">{title}</h2>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              if (onAdd) onAdd();
            }}
            className="p-1.5 text-wa-header hover:bg-wa-header/10 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
          <ChevronRight className={`w-4 h-4 text-slate-300 transition-transform ${openSections[section] ? "rotate-90" : ""}`} />
        </div>
      </div>
      <AnimatePresence>
        {openSections[section] && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden space-y-2 pl-11"
          >
            {children || (
              <div className="py-4 text-center border-2 border-dashed border-slate-100 rounded-3xl">
                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">No {title} Ratified</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-8">
      <AnimatePresence>
        {showCloudflareKnockout && (
          <CloudflareKnockout onClose={() => setShowCloudflareKnockout(false)} />
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">HQ Extensions Vault</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Sovereign Registry Control</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100">
          <Database className="w-6 h-6" />
        </div>
      </div>

      <div className="space-y-6">
        <VaultSection title="Connectors" icon={Globe} section="connectors">
          {[
            { name: "GitHub Manifest", status: "Active", icon: <Globe className="w-5 h-5" /> },
            { name: "Gmail Relay", status: "Active", icon: <MessageSquare className="w-5 h-5" /> }
          ].map(item => (
            <div key={item.name} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 border border-slate-100">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900">{item.name}</h3>
                  <span className="text-[8px] font-bold text-green-500 uppercase tracking-widest">{item.status}</span>
                </div>
              </div>
              <div className="w-10 h-5 bg-green-500 rounded-full relative p-1">
                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
              </div>
            </div>
          ))}
        </VaultSection>

        <VaultSection title="Skills" icon={Zap} section="skills" />
        <VaultSection title="Tools" icon={Briefcase} section="tools" />
        <VaultSection title="MCP Servers" icon={Cpu} section="mcp" />
        
        <VaultSection 
          title="Extra Processor" 
          icon={Network} 
          section="extraProcessor"
          onAdd={() => setShowCloudflareKnockout(true)}
        >
          <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-orange-500 border border-orange-100">
                <Network className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">Cloudflare Edge</h3>
                <span className="text-[8px] font-bold text-orange-500 uppercase tracking-widest">Ready for Setup</span>
              </div>
            </div>
            <button 
              onClick={() => setShowCloudflareKnockout(true)}
              className="px-3 py-1.5 bg-orange-500 text-white text-[8px] font-black uppercase tracking-widest rounded-lg"
            >
              Configure
            </button>
          </div>
        </VaultSection>

        <VaultSection title="Branches & Mission" icon={Layers} section="branches">
          <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-indigo-600 border border-indigo-100">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">Main Office</h3>
                <span className="text-[8px] font-bold text-indigo-500 uppercase tracking-widest">Primary Node</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Online</span>
            </div>
          </div>
        </VaultSection>

        <VaultSection title="Viabhronic Loader" icon={Layout} section="viabhronicLoader" />
        <VaultSection title="Clients" icon={Terminal} section="clients" />
        <VaultSection title="Gaming Focused" icon={Zap} section="gaming" />
        <VaultSection title="Testing" icon={Egg} section="testing" />
      </div>
    </div>
  );
};

const ChatView = ({ chat, onBack, onShowMenu, showMenu, menuRef }: { chat: CelestialChat, onBack: () => void, onShowMenu: () => void, showMenu: boolean, menuRef: React.RefObject<HTMLDivElement> }) => {
  const [input, setInput] = useState("");
  const isSentinel = chat.type === 'sentinel';

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Chat Header */}
      <div className="bg-wa-header text-white p-4 flex items-center gap-3 shadow-md z-10">
        <button onClick={onBack}>
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold border border-white/10">
          {chat.type === 'gmail' ? "?" : isSentinel ? <Terminal className="w-5 h-5" /> : "Ω"}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold truncate text-lg leading-tight">{chat.name}</h3>
          <p className="text-[9px] font-bold text-white/70 uppercase tracking-widest">
            {isSentinel ? "System Monitoring Active" : "Celestial Engine Active"}
          </p>
        </div>
        <div className="flex items-center gap-5 relative">
          {!isSentinel && (
            <>
              <Video className="w-6 h-6 text-white/90" />
              <Phone className="w-5 h-5 text-white/90" />
            </>
          )}
          <button onClick={onShowMenu}>
            <MoreVertical className="w-6 h-6 text-white/90" />
          </button>

          <AnimatePresence>
            {showMenu && (
              <motion.div 
                ref={menuRef}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 top-10 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 p-1.5 z-50"
              >
                {["View Contact", "Media, Links, and Docs", "Search", "Mute Notifications", "Wallpaper", "More"].map(item => (
                  <button key={item} className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
                    {item}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 electricity-grid bg-slate-50/30">
        <div className="flex justify-center">
          <span className="bg-slate-200/50 backdrop-blur-sm text-slate-500 text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-widest">
            {isSentinel ? "Live System Logs" : "Solar Cycle 2024.05"}
          </span>
        </div>

        {chat.messages.map((msg, idx) => (
          <div 
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm relative group ${
              msg.role === 'user' ? 'bg-wa-sent text-white rounded-tr-none' : 'bg-white text-slate-900 rounded-tl-none border border-slate-100'
            }`}>
              {msg.content}
              <button className="absolute -right-8 top-1/2 -translate-y-1/2 p-1.5 bg-slate-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-indigo-600">
                <Share2 className="w-3.5 h-3.5" />
              </button>
              <div className={`text-[9px] text-right mt-1 ${msg.role === 'user' ? 'text-white/60' : 'text-slate-400'}`}>
                12:46 PM
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100 flex items-center gap-3">
        {isSentinel ? (
          <div className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl px-6 py-3 flex items-center justify-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Sentinel Feed: Read Only</span>
          </div>
        ) : (
          <>
            <div className="flex-1 bg-slate-100 rounded-3xl px-4 py-3 flex items-center gap-3">
              <Smile className="w-6 h-6 text-yellow-500" />
              <input 
                type="text" 
                placeholder="Message"
                className="flex-1 bg-transparent outline-none text-sm font-medium"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Paperclip className="w-5 h-5 text-slate-400" />
              <Zap className="w-5 h-5 text-indigo-600" />
              <Camera className="w-5 h-5 text-slate-400" />
            </div>
            <button className="w-12 h-12 bg-wa-header text-white rounded-full shadow-lg flex items-center justify-center">
              <Mic className="w-6 h-6" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

interface CelestialClientProps {
  agents?: Agent[];
}

const TABS: ("chats" | "news" | "workflow" | "extensions")[] = ["chats", "news", "workflow", "extensions"];

export const CelestialClient: React.FC<CelestialClientProps> = ({ agents = [] }) => {
  const [activeTab, setActiveTab] = useState<"chats" | "news" | "workflow" | "extensions">("chats");
  const [selectedChat, setSelectedChat] = useState<CelestialChat | null>(null);
  const [view, setView] = useState<"main" | "workflow">("main");
  const [workflowData, setWorkflowData] = useState<{ nodes: CanvasNode[]; edges: CanvasEdge[] }>({ nodes: [], edges: [] });
  const [showMenu, setShowMenu] = useState(false);
  const [showNewsMenu, setShowNewsMenu] = useState(false);
  const [showChatMenu, setShowChatMenu] = useState(false);
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [newsFilter, setNewsFilter] = useState<string>("");
  const [showNewsFilterModal, setShowNewsFilterModal] = useState(false);
  const [showSovereignCheck, setShowSovereignCheck] = useState(false);
  const [showWorkflowBuilder, setShowWorkflowBuilder] = useState(false);
  const [showWorkflowSpeedDial, setShowWorkflowSpeedDial] = useState(false);
  const [showSwipeView, setShowSwipeView] = useState(false);
  
  const contentRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const newsMenuRef = useRef<HTMLDivElement>(null);
  const chatMenuRef = useRef<HTMLDivElement>(null);
  const plusMenuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, () => setShowMenu(false));
  useClickOutside(newsMenuRef, () => setShowNewsMenu(false));
  useClickOutside(chatMenuRef, () => setShowChatMenu(false));
  useClickOutside(plusMenuRef, () => setShowPlusMenu(false));

  const displayTabs = [TABS[TABS.length - 1], ...TABS, TABS[0]];

  const handleTabClick = (tabId: "chats" | "news" | "workflow" | "extensions") => {
    const realIndex = TABS.indexOf(tabId);
    const displayIndex = realIndex + 1;
    setActiveTab(tabId);
    if (contentRef.current) {
      contentRef.current.scrollTo({
        left: displayIndex * contentRef.current.clientWidth,
        behavior: 'smooth'
      });
    }
  };

  const handleSwipe = (direction: number) => {
    const currentIndex = TABS.indexOf(activeTab);
    let nextIndex = currentIndex + direction;
    
    if (nextIndex < 0) nextIndex = TABS.length - 1;
    if (nextIndex >= TABS.length) nextIndex = 0;
    
    handleTabClick(TABS[nextIndex]);
  };

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    // Initial position: start at the first real tab (index 1)
    el.scrollLeft = el.clientWidth;

    let isTeleporting = false;

    const handleScroll = () => {
      if (isTeleporting) return;

      const scrollWidth = el.clientWidth;
      const scrollLeft = el.scrollLeft;
      
      // Instant update of activeTab for the bottom nav highlight
      const index = Math.round(scrollLeft / scrollWidth);
      
      // Determine the logical active tab based on scroll position
      let logicalIndex = index - 1;
      if (logicalIndex < 0) logicalIndex = TABS.length - 1;
      if (logicalIndex >= TABS.length) logicalIndex = 0;
      
      const newActiveTab = TABS[logicalIndex];
      
      setActiveTab(prev => {
        if (prev !== newActiveTab) return newActiveTab;
        return prev;
      });

      // Teleportation logic: Check if we've landed on a clone
      const isAtStartClone = scrollLeft <= 5;
      const isAtEndClone = scrollLeft >= (TABS.length + 1) * scrollWidth - 5;

      if (isAtStartClone || isAtEndClone) {
        isTeleporting = true;
        // Instant teleport without smooth behavior
        if (isAtStartClone) {
          el.scrollLeft = TABS.length * scrollWidth;
        } else if (isAtEndClone) {
          el.scrollLeft = scrollWidth;
        }
        
        // Small delay before re-enabling scroll logic to prevent feedback loops
        setTimeout(() => {
          isTeleporting = false;
        }, 50);
      }
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  const renderTabContent = (tabId: string) => {
    switch (tabId) {
      case "chats":
        return (
          <>
            <SearchAndFilters />
            <ChatList chats={allChats} onSelectChat={setSelectedChat} />
          </>
        );
      case "news":
        return (
          <NewsTab 
            onShowMenu={() => setShowNewsMenu(!showNewsMenu)} 
            showMenu={showNewsMenu}
            menuRef={newsMenuRef}
            onOpenFilter={() => setShowNewsFilterModal(true)}
            showSwipeView={showSwipeView}
            setShowSwipeView={setShowSwipeView}
          />
        );
      case "workflow":
        return <WorkflowTab onOpenWorkflow={() => setView("workflow")} />;
      case "extensions":
        return <HQExtensionsVault onOpenWorkforce={() => setView("workflow")} />;
      default:
        return null;
    }
  };

  // Map system agents to Celestial nodes
  const agentNodes: CelestialChat[] = agents.map(agent => ({
    id: `agent-${agent.id}`,
    nodeId: agent.id,
    name: agent.name,
    lastMessage: agent.description || "System Agent ready for deployment.",
    messages: [],
    type: "agent",
    updatedAt: Date.now(),
    isHeadAgent: agent.name.toLowerCase().includes("architect") || agent.name.toLowerCase().includes("omega")
  }));

  const allChats: CelestialChat[] = [
    {
      id: "sentinel-feed",
      name: "Sentinel Feed",
      lastMessage: "System monitoring active...",
      messages: [
        { id: "s1", role: "assistant", content: "[INFO] Viabhron Kernel initialized successfully.", timestamp: new Date().toISOString() },
        { id: "s2", role: "assistant", content: "[SUCCESS] Sovereign Listener Bridge connected.", timestamp: new Date().toISOString() },
        { id: "s3", role: "assistant", content: "[WARN] High memory usage detected in Node-7.", timestamp: new Date().toISOString() }
      ],
      type: "sentinel",
      updatedAt: Date.now(),
      isSentinel: true
    },
    {
      id: "gmail-node",
      name: "New GMAIL Node",
      lastMessage: "No messages yet",
      messages: [],
      type: "gmail",
      updatedAt: Date.now()
    },
    ...agentNodes
  ];

  const headAgentChat = allChats.find(c => c.isHeadAgent) || allChats[0];

  return (
    <div className="h-full flex flex-col bg-white relative overflow-hidden font-sans selection:bg-wa-header/10">
      <Toaster position="top-center" richColors />
      
      <AnimatePresence mode="wait">
        {view === "workflow" ? (
          <motion.div 
            key="workflow"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="h-full flex flex-col"
          >
            <div className="bg-wa-header text-white p-4 flex items-center justify-between shadow-md z-50">
              <div className="flex items-center gap-3">
                <button onClick={() => setView("main")}>
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="flex flex-col">
                  <h2 className="font-bold uppercase tracking-widest text-sm">Workflow 1</h2>
                  <span className="text-[8px] font-bold text-white/50 uppercase tracking-[0.2em]">Workflow Lab</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-6 py-2 bg-indigo-500 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                  <Zap className="w-4 h-4 fill-white" />
                  Run
                </button>
                <button className="p-2.5 bg-white/10 rounded-xl">
                  <Database className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 relative">
              <Canvas 
                tabId="celestial-workflow"
                initialData={workflowData}
                onUpdate={setWorkflowData}
              />
            </div>
          </motion.div>
        ) : !selectedChat ? (
          <motion.div 
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-full"
          >
            {/* Header */}
            <div className="bg-wa-header text-white p-5 flex flex-col gap-4 shadow-lg z-20">
              <div className="flex justify-between items-center">
                <h1 
                  className="text-2xl font-bold tracking-tight cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => {
                    // This is a bit tricky since we don't have direct access to setActiveTabId here
                    // But we can trigger a custom event or use a prop if we pass it down.
                    // For now, I'll assume the user wants to switch to the "Expert" view (Browser UI)
                    // which in our case means switching to a non-vhatsappening tab.
                    window.dispatchEvent(new CustomEvent('viabhron:toggle-ui'));
                  }}
                >
                  VhatsAppeningAi
                </h1>
                <div className="flex items-center gap-6 relative">
                  <QrCode className="w-6 h-6 text-white/90 cursor-pointer" />
                  <Camera className="w-6 h-6 text-white/90 cursor-pointer" />
                  <button onClick={() => setShowMenu(!showMenu)}>
                    <MoreVertical className="w-6 h-6 text-white/90" />
                  </button>

                  <AnimatePresence>
                    {showMenu && (
                      <motion.div 
                        ref={menuRef}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 top-10 w-56 bg-white rounded-3xl shadow-2xl border border-slate-100 p-2 z-50"
                      >
                        {[
                          { label: "Settings", icon: <Settings className="w-5 h-5" />, action: () => setShowMenu(false) },
                          { label: "Contacts", icon: <Users className="w-5 h-5" />, action: () => setShowMenu(false) },
                          { label: "Backup/Restore", icon: <History className="w-5 h-5" />, action: () => setShowMenu(false) },
                          { label: "Logout", icon: <LogOut className="w-5 h-5" />, action: () => setShowMenu(false), color: "text-red-500" }
                        ].map((item, i) => (
                          <button 
                            key={item.label}
                            onClick={item.action}
                            className={`w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors ${item.color || "text-slate-700"}`}
                          >
                            {item.icon}
                            <span className="text-sm font-bold">{item.label}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden bg-white relative z-10">
              <div 
                ref={contentRef}
                className="flex-1 flex overflow-x-auto snap-x snap-mandatory no-scrollbar w-full h-full"
              >
                {displayTabs.map((tabId, index) => (
                  <div key={`${tabId}-${index}`} className="flex-shrink-0 w-full h-full snap-start snap-always flex flex-col overflow-hidden">
                    <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
                      {renderTabContent(tabId)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Stacked FABs */}
              <div className="absolute bottom-8 right-6 flex flex-col gap-4 items-center z-50">
                <button 
                  onClick={() => setSelectedChat(headAgentChat)}
                  className="w-14 h-14 bg-wa-accent text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95 z-30 ring-4 ring-white"
                >
                  <span className="text-2xl font-bold">Ω</span>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold">3</div>
                </button>
                <div className="relative">
                  {/* Speed Dial for Workflow */}
                  <AnimatePresence>
                    {showWorkflowSpeedDial && activeTab === 'workflow' && (
                      <div className="absolute bottom-20 right-0 flex flex-col gap-3 items-end">
                        <motion.button
                          initial={{ opacity: 0, scale: 0.5, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.5, y: 20 }}
                          onClick={() => {
                            setShowWorkflowBuilder(true);
                            setShowWorkflowSpeedDial(false);
                          }}
                          className="flex items-center gap-3 bg-white border border-slate-100 px-4 py-3 rounded-2xl shadow-xl whitespace-nowrap"
                        >
                          <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Pipeline Builder</span>
                          <div className="w-10 h-10 bg-indigo-500 text-white rounded-xl flex items-center justify-center">
                            <Zap className="w-5 h-5" />
                          </div>
                        </motion.button>
                        <motion.button
                          initial={{ opacity: 0, scale: 0.5, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.5, y: 20 }}
                          transition={{ delay: 0.05 }}
                          onClick={() => {
                            setView("workflow");
                            setShowWorkflowSpeedDial(false);
                          }}
                          className="flex items-center gap-3 bg-white border border-slate-100 px-4 py-3 rounded-2xl shadow-xl whitespace-nowrap"
                        >
                          <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Visual Lab</span>
                          <div className="w-10 h-10 bg-wa-header text-white rounded-xl flex items-center justify-center">
                            <WorkflowIcon className="w-5 h-5" />
                          </div>
                        </motion.button>
                      </div>
                    )}
                  </AnimatePresence>

                  <button 
                    onClick={() => {
                      if (activeTab === 'chats') setShowPlusMenu(!showPlusMenu);
                      if (activeTab === 'news') setShowSwipeView(true);
                      if (activeTab === 'workflow') setShowWorkflowSpeedDial(!showWorkflowSpeedDial);
                      if (activeTab === 'extensions') setShowSovereignCheck(true);
                    }}
                    className="w-16 h-16 bg-indigo-500 text-white rounded-3xl shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95 z-30"
                  >
                    {activeTab === 'chats' && <Plus className={`w-8 h-8 transition-transform ${showPlusMenu ? 'rotate-45' : ''}`} />}
                    {activeTab === 'news' && <Sparkles className="w-8 h-8" />}
                    {activeTab === 'workflow' && <Plus className={`w-8 h-8 transition-transform ${showWorkflowSpeedDial ? 'rotate-45' : ''}`} />}
                    {activeTab === 'extensions' && <Shield className="w-8 h-8" />}
                  </button>

                  <AnimatePresence>
                    {showPlusMenu && activeTab === 'chats' && (
                      <motion.div
                        ref={plusMenuRef}
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        className="absolute bottom-20 right-0 w-56 bg-white rounded-3xl shadow-2xl border border-slate-100 p-2 z-50"
                      >
                        {[
                          { label: "Normal Chat", icon: <MessageCircle className="w-5 h-5" />, action: () => setShowPlusMenu(false) },
                          { label: "Group Chat", icon: <Users className="w-5 h-5" />, action: () => setShowPlusMenu(false) },
                          { label: "Debate (Parallel)", icon: <Layout className="w-5 h-5" />, action: () => setShowPlusMenu(false) },
                          { label: "Debate (Interagent)", icon: <Zap className="w-5 h-5" />, action: () => setShowPlusMenu(false) },
                        ].map((item) => (
                          <button 
                            key={item.label}
                            onClick={item.action}
                            className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors text-slate-700"
                          >
                            {item.icon}
                            <span className="text-sm font-bold">{item.label}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="bg-white border-t border-slate-100 px-6 py-3 flex justify-between items-center z-40">
              {[
                { id: "chats", label: "CHATS", icon: <Sparkles className="w-7 h-7" /> },
                { id: "news", label: "NEWS", icon: <Globe className="w-7 h-7" /> },
                { id: "workflow", label: "WORKFLOW", icon: <WorkflowIcon className="w-7 h-7" /> },
                { id: "extensions", label: "EXTENSIONS", icon: <Zap className="w-7 h-7" /> }
              ].map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id as any)}
                  className={`flex flex-col items-center gap-1 transition-all ${
                    activeTab === tab.id ? "text-wa-header scale-110" : "text-slate-400"
                  }`}
                >
                  <div className={`p-1 rounded-xl transition-colors ${activeTab === tab.id ? "bg-indigo-50" : "bg-transparent"}`}>
                    {tab.icon}
                  </div>
                  <span className="text-[9px] font-black tracking-[0.15em]">{tab.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="chat"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="h-full"
          >
            <ChatView 
              chat={selectedChat} 
              onBack={() => setSelectedChat(null)} 
              onShowMenu={() => setShowChatMenu(!showChatMenu)}
              showMenu={showChatMenu}
              menuRef={chatMenuRef}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* News Filter Modal */}
      <AnimatePresence>
        {showNewsFilterModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[110] flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md bg-white rounded-[2.5rem] p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black text-slate-900">Intelligence Filter</h2>
                <button onClick={() => setShowNewsFilterModal(false)} className="p-2 hover:bg-slate-100 rounded-full">
                  <ArrowLeft className="w-6 h-6 rotate-90" />
                </button>
              </div>
              <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                Set your "Editorial Mandate." The Resident AI will prioritize news based on this prompt.
              </p>
              <div className="space-y-4">
                <textarea 
                  value={newsFilter}
                  onChange={(e) => setNewsFilter(e.target.value)}
                  placeholder="e.g. Prioritize news on AI security vulnerabilities and Ethereum gas price spikes."
                  className="w-full h-32 bg-slate-50 border-2 border-slate-100 rounded-3xl p-4 text-sm focus:ring-2 focus:ring-wa-header/20 outline-none resize-none"
                />
                <button 
                  onClick={() => {
                    toast.success("Intelligence filter updated");
                    setShowNewsFilterModal(false);
                  }}
                  className="w-full py-4 bg-wa-header text-white rounded-2xl font-bold shadow-lg shadow-wa-header/20 uppercase tracking-widest text-xs"
                >
                  Apply Mandate
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sovereign Check (Task Manager) */}
      <AnimatePresence>
        {showSovereignCheck && <SovereignCheck onClose={() => setShowSovereignCheck(false)} />}
      </AnimatePresence>

      {/* Workflow Builder */}
      <AnimatePresence>
        {showWorkflowBuilder && <WorkflowBuilder onClose={() => setShowWorkflowBuilder(false)} />}
      </AnimatePresence>
    </div>
  );
};
