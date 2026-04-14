import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  LayoutGrid, 
  Plus, 
  Search, 
  ChevronRight,
  Zap,
  Cpu,
  Globe,
  ArrowLeft,
  Settings,
  Folder,
  Star,
  Pause,
  Play,
  X,
  Snowflake
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PulseMonitor } from './PulseMonitor';
import { SubstrateFrame } from './SubstrateFrame';
import { MiniApp, UIMode, Agent } from '../../types';
import * as Icons from 'lucide-react';

interface MiniAppLoaderProps {
  miniApps: MiniApp[];
  onToggleMiniApp: (id: string) => void;
  onToggleFreeze: (id: string) => void;
  onCloseApp: (id: string) => void;
  onInstall: () => void;
  onAppOpen?: (id: string) => void;
  uiMode?: UIMode;
  agents?: Agent[];
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
  onAppActiveChange?: (isActive: boolean) => void;
}

export function MiniAppLoader({ 
  miniApps, 
  onToggleMiniApp, 
  onToggleFreeze,
  onCloseApp,
  onInstall, 
  onAppOpen,
  uiMode,
  agents = [],
  isFullscreen = false,
  onToggleFullscreen,
  onAppActiveChange
}: MiniAppLoaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeAppId, setActiveAppId] = useState<string | null>(null);

  useEffect(() => {
    onAppActiveChange?.(!!activeAppId);
  }, [activeAppId, onAppActiveChange]);
  const [openFolder, setOpenFolder] = useState<string | null>(null);

  useEffect(() => {
    const handleOpenApp = (e: any) => {
      if (e.detail?.id) {
        setActiveAppId(e.detail.id);
        onAppOpen?.(e.detail.id);
      }
    };
    window.addEventListener('viabhron:open-mini-app', handleOpenApp);
    return () => window.removeEventListener('viabhron:open-mini-app', handleOpenApp);
  }, [onAppOpen]);

  const handleOpenApp = (id: string) => {
    setActiveAppId(id);
    onAppOpen?.(id);
  };

  const activeApp = miniApps.find(app => app.id === activeAppId);

  const categories = [
    { id: 'core', name: 'Core', icon: Settings },
    { id: 'creative', name: 'Creative', icon: Icons.Palette },
    { id: 'intelligence', name: 'Intelligence', icon: Icons.Brain },
    { id: 'forge', name: 'Forge', icon: Icons.Hammer },
    { id: 'utility', name: 'Utility', icon: LayoutGrid },
    { id: 'security', name: 'Security', icon: Icons.Shield },
  ];

  const favorites = miniApps.filter(app => app.enabled && (app.id === 'ma-pulse' || app.id === 'ma-scribe' || app.id === 'ma-gatekeeper'));
  
  const filteredApps = miniApps.filter(app => 
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderAppIcon = (app: MiniApp, size: 'sm' | 'md' = 'md') => {
    const Icon = (Icons as any)[app.icon] || LayoutGrid;
    return (
      <div className="relative group">
        <div className={`
          ${size === 'md' ? 'w-16 h-16 rounded-2xl' : 'w-10 h-10 rounded-xl'} 
          bg-slate-50 border border-slate-100 flex items-center justify-center transition-all
          group-hover:border-indigo-500/50 group-hover:bg-indigo-600/5
          ${app.status === 'active' ? 'shadow-[0_0_15px_rgba(99,102,241,0.1)]' : ''}
          ${app.isFrozen ? 'filter grayscale brightness-90' : ''}
        `}>
          <Icon className={`${size === 'md' ? 'w-8 h-8' : 'w-5 h-5'} ${app.status === 'active' ? 'text-indigo-600' : 'text-slate-400'}`} />
          
          {/* Metabolic Indicators */}
          {app.status === 'active' && !app.isFrozen && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
          )}
          {app.isFrozen && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
              <Snowflake className="w-2 h-2 text-white" />
            </div>
          )}
        </div>
        <div className="mt-2 text-center">
          <div className="text-[9px] font-black text-slate-900 uppercase tracking-widest truncate w-full px-1">
            {app.name}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden relative">
      {/* Header / Search - Refined to single thin row */}
      <div className="p-4 bg-white border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search substrate..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-400"
            />
          </div>
          <button 
            onClick={onInstall}
            className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 text-slate-400 flex items-center justify-center hover:text-indigo-600 hover:bg-indigo-50 transition-all"
            title="Add More Substrates"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-10 no-scrollbar bg-white">
        {/* Favorites Section */}
        {!searchQuery && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 px-2">
              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
              <h3 className="text-[10px] text-slate-400 uppercase tracking-[0.3em] font-black">Top Shelf</h3>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {favorites.map(app => (
                <button key={app.id} onClick={() => handleOpenApp(app.id)} className="flex flex-col items-center">
                  {renderAppIcon(app)}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Categories / Folders Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <Folder className="w-3 h-3 text-indigo-500 fill-indigo-500/20" />
            <h3 className="text-[10px] text-slate-400 uppercase tracking-[0.3em] font-black">Substrate Folders</h3>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {categories.map(cat => {
              const appsInCat = miniApps.filter(app => app.category === cat.id);
              if (appsInCat.length === 0) return null;

              return (
                <button 
                  key={cat.id} 
                  onClick={() => setOpenFolder(cat.id)}
                  className="flex flex-col items-center group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 p-2 grid grid-cols-2 gap-1 group-hover:border-indigo-500/30 transition-all">
                    {appsInCat.slice(0, 4).map(app => (
                      <div key={app.id} className="w-full h-full rounded bg-white border border-slate-100 flex items-center justify-center">
                        {React.createElement((Icons as any)[app.icon] || LayoutGrid, { className: "w-3 h-3 text-slate-400" })}
                      </div>
                    ))}
                    {appsInCat.length < 4 && Array(4 - appsInCat.length).fill(0).map((_, i) => (
                      <div key={i} className="w-full h-full rounded bg-slate-100/50" />
                    ))}
                  </div>
                  <div className="mt-2 text-[9px] font-black text-slate-400 uppercase tracking-widest group-hover:text-indigo-600 transition-colors">
                    {cat.name}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* All Apps (if searching) */}
        {searchQuery && (
          <section className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
              {filteredApps.map(app => (
                <button key={app.id} onClick={() => handleOpenApp(app.id)} className="flex flex-col items-center">
                  {renderAppIcon(app)}
                </button>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Folder Overlay */}
      <AnimatePresence>
        {openFolder && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[90] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setOpenFolder(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white border border-slate-100 rounded-[2.5rem] p-8 w-full max-w-sm space-y-8 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">
                  {categories.find(c => c.id === openFolder)?.name}
                </h3>
                <button onClick={() => setOpenFolder(null)} className="p-2 hover:bg-slate-50 rounded-full">
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-6">
                {miniApps.filter(app => app.category === openFolder).map(app => (
                  <button key={app.id} onClick={() => { handleOpenApp(app.id); setOpenFolder(null); }} className="flex flex-col items-center">
                    {renderAppIcon(app)}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mini-App Runtime (Substrate Frame) */}
      <AnimatePresence>
        {activeAppId && activeApp && (
          <SubstrateFrame
            name={activeApp.name}
            isFrozen={activeApp.isFrozen}
            isFullscreen={isFullscreen}
            onClose={() => {
              onCloseApp(activeAppId);
              setActiveAppId(null);
            }}
            onToggleFreeze={() => onToggleFreeze(activeAppId)}
            onToggleFullscreen={onToggleFullscreen}
          >
            {activeAppId === 'ma-pulse' ? (
              <PulseMonitor mode="lite" uiMode={uiMode} agents={agents} />
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-12 text-center space-y-6 bg-white">
                <div className="w-24 h-24 rounded-[2.5rem] bg-slate-50 border border-slate-100 flex items-center justify-center">
                  {React.createElement((Icons as any)[activeApp.icon] || LayoutGrid, { className: "w-12 h-12 text-indigo-600" })}
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">{activeApp.name}</h2>
                  <p className="text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">{activeApp.description}</p>
                </div>
                <div className="px-4 py-2 rounded-xl bg-indigo-600/10 border border-indigo-500/20">
                  <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">Substrate Active</span>
                </div>
              </div>
            )}
          </SubstrateFrame>
        )}
      </AnimatePresence>
    </div>
  );
}
