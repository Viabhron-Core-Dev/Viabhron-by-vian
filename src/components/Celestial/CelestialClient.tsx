import React, { useState, useEffect } from "react";
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
  ChevronRight,
  RefreshCw,
  Database
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { localDb } from "../../lib/db";
import { 
  CelestialNode, 
  CelestialChat, 
  Message, 
  CelestialViewType 
} from "../../types";
import { Toaster, toast } from "sonner";

// --- Sub-components ---

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

const ChatList = ({ onSelectChat }: { onSelectChat: (chat: CelestialChat) => void }) => {
  const [chats, setChats] = useState<CelestialChat[]>([
    {
      id: "1",
      name: "New GMAIL Node",
      lastMessage: "No messages yet",
      messages: [],
      type: "gmail",
      updatedAt: Date.now()
    },
    {
      id: "2",
      name: "Omega AI",
      lastMessage: "No messages yet",
      messages: [],
      type: "agent",
      updatedAt: Date.now()
    }
  ]);

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar px-2">
      {chats.map(chat => (
        <div 
          key={chat.id} 
          onClick={() => onSelectChat(chat)}
          className="flex items-center gap-4 p-3 hover:bg-slate-50 cursor-pointer rounded-2xl transition-colors mb-1"
        >
          <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold shadow-sm border-2 ${
            chat.type === 'gmail' ? 'bg-blue-50 text-blue-500 border-blue-100' : 'bg-purple-50 text-purple-500 border-purple-100'
          }`}>
            {chat.type === 'gmail' ? "?" : "Ω"}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900 truncate">{chat.name}</h3>
              <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-tighter ${
                chat.type === 'gmail' ? 'bg-red-100 text-red-600' : 'bg-indigo-100 text-indigo-600'
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

const UpdatesTab = () => (
  <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-8">
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Official Updates</h2>
        <div className="flex items-center gap-4">
          <Plus className="w-5 h-5 text-wa-header" />
          <RefreshCw className="w-5 h-5 text-wa-header" />
          <MoreVertical className="w-5 h-5 text-slate-400" />
        </div>
      </div>
      <div className="border-2 border-dashed border-slate-200 rounded-3xl p-10 flex flex-col items-center justify-center text-center space-y-3">
        <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">No Updates Yet</p>
        <button className="text-wa-header text-xs font-bold uppercase tracking-widest">
          Generate Live AI News
        </button>
      </div>
    </div>

    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">Channels</h2>
        <button className="text-wa-header text-sm font-bold">Find Channels</button>
      </div>
      <div className="space-y-3">
        {[
          { name: "OpenAI", sub: "GPT-4o Mini released", time: "09:42" },
          { name: "Together AI", sub: "Llama 3.1 405B Turbo", time: "09:42" }
        ].map(channel => (
          <div key={channel.name} className="bg-white border border-slate-100 rounded-3xl p-4 flex items-center gap-4 shadow-sm">
            <div className="w-14 h-14 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center">
                {channel.name[0]}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-slate-900">{channel.name}</h3>
                <span className="text-[10px] text-slate-400">{channel.time}</span>
              </div>
              <p className="text-sm text-slate-500 truncate">{channel.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="space-y-4 pt-4">
      <h2 className="text-sm font-bold text-slate-900">Find channels to follow</h2>
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
        {[
          { name: "Google AI", followers: "1.8M followers" },
          { name: "Anthropic", followers: "900K followers" }
        ].map(item => (
          <div key={item.name} className="min-w-[180px] bg-white border border-slate-100 rounded-3xl p-6 flex flex-col items-center text-center space-y-3 shadow-sm">
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center relative">
              <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center font-bold text-xl">
                {item.name[0]}
              </div>
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-indigo-600 rounded-full border-2 border-white flex items-center justify-center">
                <Plus className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-slate-900">{item.name}</h3>
              <p className="text-[10px] text-slate-400">{item.followers}</p>
            </div>
            <button className="w-full py-2 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-bold uppercase tracking-widest">
              Follow
            </button>
          </div>
        ))}
      </div>
      <button className="w-full py-4 bg-wa-header text-white rounded-2xl font-bold shadow-lg shadow-wa-header/20">
        Explore more
      </button>
    </div>
  </div>
);

const CommunitiesTab = () => (
  <div className="flex-1 flex flex-col p-4">
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-xs font-bold text-wa-header uppercase tracking-widest">Celestial Councils</h2>
      <Plus className="w-6 h-6 text-wa-header" />
    </div>
    
    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 px-8">
      <div className="w-32 h-32 rounded-full bg-slate-50 flex items-center justify-center">
        <Users className="w-16 h-16 text-slate-200" />
      </div>
      <div className="space-y-2">
        <p className="text-slate-400 font-medium">No councils formed yet.</p>
        <p className="text-slate-400 text-sm">Bring agents together to collaborate.</p>
      </div>
    </div>

    {/* Placeholder for existing councils if any */}
    <div className="space-y-3 mt-auto">
      <div className="bg-white border border-slate-100 rounded-3xl p-4 flex items-center gap-4 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
          <WorkflowIcon className="w-7 h-7" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-slate-900">Workflow 1</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Visual Workflow Lab</p>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-300" />
      </div>
      <div className="bg-white border border-slate-100 rounded-3xl p-4 flex items-center gap-4 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600">
          <Zap className="w-7 h-7" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-slate-900">Debate 1</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Live Reasoning Council</p>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-300" />
      </div>
    </div>
  </div>
);

const SkillsTab = () => (
  <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-8">
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Recipe Skills (Expertise)</h2>
        <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">0 Active</span>
      </div>
      <div className="border-2 border-dashed border-slate-100 rounded-3xl p-12 flex flex-col items-center justify-center text-center">
        <p className="text-xs text-slate-300 font-medium max-w-[200px]">
          No recipe skills created yet. Add one to give your agents specialized expertise.
        </p>
      </div>
    </div>

    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Action Skills (Tools)</h2>
        <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">4 Active</span>
      </div>
      <div className="space-y-3">
        {[
          { name: "GitHub Manifest", desc: "Push code directly to GitHub or Codeberg repositories.", icon: <Globe className="w-6 h-6" />, color: "bg-green-50 text-green-600" },
          { name: "Gmail Relay", desc: "Send and receive messages via Gmail relay nodes.", icon: <MessageSquare className="w-6 h-6" />, color: "bg-blue-50 text-blue-600" }
        ].map(skill => (
          <div key={skill.name} className="bg-white border border-slate-100 rounded-3xl p-5 flex items-center gap-4 shadow-sm">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${skill.color}`}>
              {skill.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-900">{skill.name}</h3>
              <p className="text-[11px] text-slate-400 leading-tight mt-1">{skill.desc}</p>
            </div>
            <div className="w-12 h-6 bg-green-500 rounded-full relative p-1 cursor-pointer">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">MCP Servers</h2>
        <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">0 Active</span>
      </div>
      <div className="border-2 border-dashed border-slate-100 rounded-3xl p-12 flex flex-col items-center justify-center text-center">
        <p className="text-xs text-slate-300 font-medium max-w-[200px]">
          No MCP servers connected yet. Connect one to give your agents custom tools.
        </p>
      </div>
    </div>

    <button className="w-full py-4 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center gap-3 text-slate-400 font-bold text-xs uppercase tracking-widest hover:bg-slate-100 transition-colors">
      <Sparkles className="w-5 h-5" />
      Explore Skill Marketplace
    </button>
  </div>
);

const ChatView = ({ chat, onBack }: { chat: CelestialChat, onBack: () => void }) => {
  const [input, setInput] = useState("");

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Chat Header */}
      <div className="bg-wa-header text-white p-4 flex items-center gap-3 shadow-md z-10">
        <button onClick={onBack}>
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold border border-white/10">
          {chat.type === 'gmail' ? "?" : "Ω"}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold truncate text-lg leading-tight">{chat.name}</h3>
          <p className="text-[9px] font-bold text-white/70 uppercase tracking-widest">Celestial Engine Active</p>
        </div>
        <div className="flex items-center gap-5">
          <Video className="w-6 h-6 text-white/90" />
          <Phone className="w-5 h-5 text-white/90" />
          <MoreVertical className="w-6 h-6 text-white/90" />
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 electricity-grid bg-slate-50/30">
        <div className="flex justify-center">
          <span className="bg-slate-200/50 backdrop-blur-sm text-slate-500 text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-widest">
            Solar Cycle 2024.05
          </span>
        </div>

        {chat.type === 'gmail' && (
          <div className="flex justify-center gap-3">
            {["Last 10", "Last 20", "Custom Search"].map(btn => (
              <button key={btn} className="bg-white border border-indigo-100 text-indigo-600 px-5 py-2 rounded-full text-xs font-bold shadow-sm">
                {btn}
              </button>
            ))}
          </div>
        )}

        {chat.messages.map((msg, idx) => (
          <div 
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${
              msg.role === 'user' ? 'bg-wa-sent text-white rounded-tr-none' : 'bg-white text-slate-900 rounded-tl-none border border-slate-100'
            }`}>
              {msg.content}
              <div className={`text-[9px] text-right mt-1 ${msg.role === 'user' ? 'text-white/60' : 'text-slate-400'}`}>
                12:46 PM
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100 flex items-center gap-3">
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
      </div>
    </div>
  );
};

export const CelestialClient: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"chats" | "updates" | "communities" | "skills">("chats");
  const [selectedChat, setSelectedChat] = useState<CelestialChat | null>(null);

  return (
    <div className="h-full flex flex-col bg-white relative overflow-hidden font-sans selection:bg-wa-header/10">
      <Toaster position="top-center" richColors />
      
      <AnimatePresence mode="wait">
        {!selectedChat ? (
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
                <h1 className="text-2xl font-bold tracking-tight">
                  VhatsAppeningAi
                </h1>
                <div className="flex items-center gap-6">
                  <QrCode className="w-6 h-6 text-white/90" />
                  <Camera className="w-6 h-6 text-white/90" />
                  <MoreVertical className="w-6 h-6 text-white/90" />
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden bg-white relative">
              <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
                <GeminiBanner />
                
                {activeTab === "chats" && (
                  <>
                    <SearchAndFilters />
                    <ChatList onSelectChat={setSelectedChat} />
                  </>
                )}
                {activeTab === "updates" && <UpdatesTab />}
                {activeTab === "communities" && <CommunitiesTab />}
                {activeTab === "skills" && <SkillsTab />}
              </div>

              {/* Stacked FABs */}
              <div className="absolute bottom-28 right-6 flex flex-col gap-4 items-center">
                <button className="w-14 h-14 bg-wa-accent text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95 z-30 ring-4 ring-white">
                  <span className="text-2xl font-bold">Ω</span>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold">3</div>
                </button>
                <button className="w-16 h-16 bg-indigo-500 text-white rounded-3xl shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95 z-30">
                  {activeTab === 'chats' && <Plus className="w-8 h-8" />}
                  {activeTab === 'updates' && <Search className="w-8 h-8" />}
                  {activeTab === 'communities' && <Users className="w-8 h-8" />}
                  {activeTab === 'skills' && <Database className="w-8 h-8" />}
                </button>
              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="bg-white border-t border-slate-100 px-6 py-3 flex justify-between items-center z-40">
              {[
                { id: "chats", label: "CHATS", icon: <Sparkles className="w-7 h-7" /> },
                { id: "updates", label: "UPDATES", icon: <Globe className="w-7 h-7" /> },
                { id: "communities", label: "COMMUNITIES", icon: <Users className="w-7 h-7" /> },
                { id: "skills", label: "SKILLS", icon: <Zap className="w-7 h-7" /> }
              ].map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
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
            <ChatView chat={selectedChat} onBack={() => setSelectedChat(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
