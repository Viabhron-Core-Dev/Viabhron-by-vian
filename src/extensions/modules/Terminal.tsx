import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, Trash2, Play, Square } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LogEntry {
  id: string;
  timestamp: Date;
  type: 'info' | 'error' | 'success' | 'command' | 'system';
  agentName: string;
  message: string;
}

export function Terminal({ onClose }: { onClose?: () => void }) {
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: '1',
      timestamp: new Date(),
      type: 'system',
      agentName: 'System',
      message: 'Viabhron Terminal Initialized. Ready for agent output.'
    }
  ]);
  const [isMaximized, setIsMaximized] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const clearLogs = () => setLogs([]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`flex flex-col bg-gray-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl ${isMaximized ? 'fixed inset-4 z-[200]' : 'h-full'}`}
    >
      <header className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-white/5">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-blue-400" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Agent Terminal</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={clearLogs}
            className="p-1.5 hover:bg-white/5 rounded-lg text-gray-500 hover:text-red-400 transition-colors"
            title="Clear Terminal"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={() => setIsMaximized(!isMaximized)}
            className="p-1.5 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-colors"
          >
            {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
          {onClose && (
            <button 
              onClick={onClose}
              className="p-1.5 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </header>

      <div 
        ref={scrollRef}
        className="flex-1 p-4 font-mono text-[11px] overflow-y-auto no-scrollbar space-y-1.5"
      >
        {logs.map((log) => (
          <div key={log.id} className="flex gap-3 group">
            <span className="text-gray-600 shrink-0 select-none">
              {log.timestamp.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
            <span className={`font-bold shrink-0 ${
              log.type === 'error' ? 'text-red-500' : 
              log.type === 'success' ? 'text-green-500' : 
              log.type === 'command' ? 'text-blue-400' : 
              log.type === 'system' ? 'text-purple-400' : 
              'text-gray-400'
            }`}>
              [{log.agentName}]
            </span>
            <span className={`${
              log.type === 'error' ? 'text-red-400' : 
              log.type === 'command' ? 'text-blue-200' : 
              'text-gray-300'
            } break-all`}>
              {log.message}
            </span>
          </div>
        ))}
      </div>

      <footer className="px-4 py-2 bg-gray-900/50 border-t border-white/5 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Listening for agent events...</span>
      </footer>
    </motion.div>
  );
}
