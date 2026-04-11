import React, { useState } from "react";
import { 
  ArrowLeft, 
  Terminal, 
  Video, 
  Phone, 
  MoreVertical, 
  ShieldCheck, 
  Share2, 
  Smile, 
  Paperclip, 
  Zap, 
  Camera, 
  Mic 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CelestialChat } from "../../../../src/types";

interface ChatViewProps {
  chat: CelestialChat;
  onBack: () => void;
  onShowMenu: () => void;
  showMenu: boolean;
  menuRef: React.RefObject<HTMLDivElement>;
}

export const ChatView: React.FC<ChatViewProps> = ({ 
  chat, 
  onBack, 
  onShowMenu, 
  showMenu, 
  menuRef 
}) => {
  const [input, setInput] = useState("");
  const isSentinel = chat.type === 'sentinel';

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Chat Header */}
      <div className="bg-indigo-600 text-white p-4 flex items-center gap-3 shadow-md z-10">
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
              msg.role === 'user' ? 'bg-indigo-500 text-white rounded-tr-none' : 'bg-white text-slate-900 rounded-tl-none border border-slate-100'
            }`}>
              {msg.content}
              {msg.sanitizationReport && (
                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center gap-2">
                  <div className="p-1 bg-green-50 text-green-600 rounded-md">
                    <ShieldCheck className="w-3 h-3" />
                  </div>
                  <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                    Sanitized: {msg.sanitizationReport.pixels} Pixels • {msg.sanitizationReport.links} Links
                  </div>
                </div>
              )}
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
            <button className="w-12 h-12 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center">
              <Mic className="w-6 h-6" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
