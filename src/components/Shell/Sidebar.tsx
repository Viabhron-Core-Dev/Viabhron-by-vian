import React, { useState } from 'react';
import { 
  Cloud, 
  Settings, 
  ChevronRight,
  ChevronDown,
  Plus,
  PanelLeftClose,
  PanelLeftOpen,
  Terminal as TerminalIcon,
  X,
  Puzzle,
  Zap,
  Wrench,
  Network,
  Link as LinkIcon,
  Bot,
  Component,
  Activity,
  Bug,
  Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Extension, ExtensionCategory } from '../../types';
import { User } from 'firebase/auth';
import { Logo } from './Logo';

interface SidebarProps {
  user: User | null;
  login: () => void;
  logout: () => void;
  extensions: Extension[];
  onConnectCloud: () => void;
  isCollapsed: boolean;
  onToggle: () => void;
  onOpenStore: () => void;
  onOpenCanvas: () => void;
  onOpenArtifacts: () => void;
  onOpenMetrics: () => void;
  onOpenSimulation: () => void;
  onOpenGovernance: () => void;
  onOpenForge: () => void;
  onOpenAgentCLI: () => void;
  onOpenSettings: () => void;
}

interface SectionProps {
  title: string;
  icon: React.ElementType;
  items: Extension[];
  isCollapsed: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onAdd?: () => void;
}

const SidebarSection: React.FC<SectionProps> = ({ title, icon: Icon, items, isCollapsed, isOpen, onToggle, onAdd }) => {
  if (isCollapsed) {
    return (
      <div className="flex flex-col items-center gap-4 py-2">
        <div className="p-2 text-gray-500" title={title}>
          <Icon className="w-5 h-5" />
        </div>
        {items.map(item => (
          <div 
            key={item.id} 
            className="p-2 rounded-md hover:bg-white/5 text-gray-400 hover:text-white transition-all cursor-pointer"
            title={item.name}
          >
            <item.icon className="w-4 h-4" />
          </div>
        ))}
        {onAdd && (
          <button 
            onClick={onAdd}
            className="p-2 rounded-md hover:bg-white/5 text-gray-500 hover:text-white transition-all cursor-pointer"
            title={`Add ${title}`}
          >
            <Plus className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <button 
        onClick={onToggle}
        className="w-full flex items-center justify-between px-2 py-2 text-gray-500 hover:text-gray-300 transition-colors group"
      >
        <div className="flex items-center gap-2">
          <Icon className="w-3.5 h-3.5" />
          <span className="text-[10px] font-bold uppercase tracking-widest">{title}</span>
        </div>
        {isOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden space-y-0.5 ml-2 border-l border-white/5 pl-2"
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="group flex items-center gap-3 px-2 py-2 rounded-md hover:bg-white/5 cursor-pointer transition-all"
              >
                <div className={`p-1.5 rounded bg-gray-800/50 text-gray-400 group-hover:text-blue-400 transition-colors`}>
                  <item.icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-gray-300 truncate">{item.name}</div>
                  <div className="text-[9px] text-gray-500 flex items-center gap-1">
                    <div className={`w-1 h-1 rounded-full ${item.status === 'active' ? 'bg-green-500' : 'bg-gray-600'}`} />
                    {item.status}
                  </div>
                </div>
              </div>
            ))}
            {onAdd && (
              <button 
                onClick={onAdd}
                className="w-full flex items-center gap-2 px-2 py-1.5 text-[10px] text-gray-500 hover:text-gray-300 transition-colors"
              >
                <Plus className="w-3 h-3" />
                Add Extension
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ user, login, logout, extensions, onConnectCloud, isCollapsed, onToggle, onOpenStore, onOpenCanvas, onOpenArtifacts, onOpenMetrics, onOpenSimulation, onOpenGovernance, onOpenForge, onOpenAgentCLI, onOpenSettings }) => {
  const [openSections, setOpenSections] = useState<Record<ExtensionCategory, boolean>>({
    connector: true,
    skill: true,
    tool: false,
    mcp: false
  });

  const toggleSection = (category: ExtensionCategory) => {
    setOpenSections(prev => ({ ...prev, [category]: !prev[category] }));
  };

  const connectors = extensions.filter(e => e.category === 'connector');
  const skills = extensions.filter(e => e.category === 'skill');
  const tools = extensions.filter(e => e.category === 'tool');
  const mcpServers = extensions.filter(e => e.category === 'mcp');

  return (
    <motion.div 
      initial={false}
      animate={{ width: isCollapsed ? 12 : 256 }}
      className="bg-gray-900 border-r border-white/10 flex flex-col h-full overflow-hidden relative group/sidebar"
    >
      {/* Toggle Button / Handle */}
      <button
        onClick={onToggle}
        className={`
          absolute top-1/2 -translate-y-1/2 right-0 p-1 text-gray-500 hover:text-white hover:bg-white/5 rounded-l-md transition-all z-20
          ${isCollapsed ? 'opacity-0 group-hover/sidebar:opacity-100' : 'opacity-100'}
        `}
      >
        {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <PanelLeftClose className="w-4 h-4" />}
      </button>

      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-full w-[256px]"
          >
            {/* BYOI Header */}
            <div className="p-4 border-b border-white/10 space-y-3">
              <div className="flex items-center gap-3 mb-2 px-1">
                <Logo className="w-8 h-8" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-white tracking-tight truncate">Viabhron</div>
                  <div className="text-[8px] text-gray-500 uppercase tracking-widest font-medium">Core OS</div>
                </div>
              </div>

              <button
                onClick={onConnectCloud}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-4 py-2 text-sm font-medium transition-all shadow-lg shadow-blue-500/20"
                title="Connect My Cloud"
              >
                <Cloud className="w-4 h-4" />
                <span>Connect My Cloud</span>
              </button>

              <button
                onClick={() => onOpenSettings()}
                className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white rounded-lg px-4 py-2 text-sm font-medium transition-all border border-white/10"
                title="Agent Orchestrator"
              >
                <Bot className="w-4 h-4 text-blue-400" />
                <span>Agent Orchestrator</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2 no-scrollbar">
              {/* Canvas Section */}
              <div className="mb-4">
                <button 
                  onClick={onOpenCanvas}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 hover:border-blue-500/40 transition-all group"
                >
                  <Zap className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                  <div className="flex-1 text-left">
                    <div className="text-[10px] font-bold text-white uppercase tracking-widest">Visual Canvas</div>
                    <div className="text-[8px] text-blue-400/60 font-medium uppercase tracking-tighter">Workflow Orchestrator</div>
                  </div>
                </button>
              </div>

              {/* Artifacts Section */}
              <div className="mb-4">
                <button 
                  onClick={onOpenArtifacts}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/10 hover:border-purple-500/40 transition-all group"
                >
                  <Component className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                  <div className="flex-1 text-left">
                    <div className="text-[10px] font-bold text-white uppercase tracking-widest">Artifacts</div>
                    <div className="text-[8px] text-purple-400/60 font-medium uppercase tracking-tighter">Generative UI Sandbox</div>
                  </div>
                </button>
              </div>

              {/* Metrics Section */}
              <div className="mb-4">
                <button 
                  onClick={onOpenMetrics}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-green-500/20 bg-green-500/5 hover:bg-green-500/10 hover:border-green-500/40 transition-all group"
                >
                  <Activity className="w-4 h-4 text-green-400 group-hover:scale-110 transition-transform" />
                  <div className="flex-1 text-left">
                    <div className="text-[10px] font-bold text-white uppercase tracking-widest">System Metrics</div>
                    <div className="text-[8px] text-green-400/60 font-medium uppercase tracking-tighter">Performance Monitor</div>
                  </div>
                </button>
              </div>

              {/* Simulation Section */}
              <div className="mb-4">
                <button 
                  onClick={onOpenSimulation}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 hover:border-red-500/40 transition-all group"
                >
                  <Bug className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" />
                  <div className="flex-1 text-left">
                    <div className="text-[10px] font-bold text-white uppercase tracking-widest">Simulation Engine</div>
                    <div className="text-[8px] text-red-400/60 font-medium uppercase tracking-tighter">Debug & Test Suite</div>
                  </div>
                </button>
              </div>

              {/* Governance Section */}
              <div className="mb-4">
                <button 
                  onClick={onOpenGovernance}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 hover:border-red-500/40 transition-all group"
                >
                  <Shield className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" />
                  <div className="flex-1 text-left">
                    <div className="text-[10px] font-bold text-white uppercase tracking-widest">Governance & Security</div>
                    <div className="text-[8px] text-red-400/60 font-medium uppercase tracking-tighter">Microsoft Policy Engine</div>
                  </div>
                </button>
              </div>

              {/* Forge Section */}
              <div className="mb-4">
                <button 
                  onClick={onOpenForge}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-orange-500/20 bg-orange-500/5 hover:bg-orange-500/10 hover:border-orange-500/40 transition-all group"
                >
                  <Plus className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform" />
                  <div className="flex-1 text-left">
                    <div className="text-[10px] font-bold text-white uppercase tracking-widest">Vibe Forge</div>
                    <div className="text-[8px] text-orange-400/60 font-medium uppercase tracking-tighter">AI Code Staging</div>
                  </div>
                </button>
              </div>

              {/* Agent CLI Section */}
              <div className="mb-4">
                <button 
                  onClick={onOpenAgentCLI}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 hover:border-cyan-500/40 transition-all group"
                >
                  <TerminalIcon className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <div className="flex-1 text-left">
                    <div className="text-[10px] font-bold text-white uppercase tracking-widest">Agent CLI</div>
                    <div className="text-[8px] text-cyan-400/60 font-medium uppercase tracking-tighter">System Execution</div>
                  </div>
                </button>
              </div>

              <SidebarSection 
                title="Connectors" 
                icon={LinkIcon} 
                items={connectors} 
                isCollapsed={false} 
                isOpen={openSections.connector}
                onToggle={() => toggleSection('connector')}
                onAdd={onOpenStore}
              />
              <SidebarSection 
                title="Skills" 
                icon={Zap} 
                items={skills} 
                isCollapsed={false} 
                isOpen={openSections.skill}
                onToggle={() => toggleSection('skill')}
                onAdd={onOpenStore}
              />
              <SidebarSection 
                title="Tools" 
                icon={Wrench} 
                items={tools} 
                isCollapsed={false} 
                isOpen={openSections.tool}
                onToggle={() => toggleSection('tool')}
                onAdd={onOpenStore}
              />
              <SidebarSection 
                title="MCP Servers" 
                icon={Network} 
                items={mcpServers} 
                isCollapsed={false} 
                isOpen={openSections.mcp}
                onToggle={() => toggleSection('mcp')}
                onAdd={onOpenStore}
              />
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 bg-gray-900/50 space-y-2">
              {user ? (
                <div className="flex items-center justify-between px-2 py-1.5 bg-white/5 rounded-xl border border-white/5 mb-1">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img 
                      src={user.photoURL || ''} 
                      className="w-7 h-7 rounded-full border border-white/10" 
                      referrerPolicy="no-referrer" 
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-bold text-white truncate leading-tight">{user.displayName}</div>
                      <div className="flex items-center gap-1">
                        <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[8px] text-gray-500 uppercase tracking-widest font-bold">Online</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={logout}
                    className="p-1.5 text-gray-500 hover:text-red-400 transition-colors"
                    title="Sign Out"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={login}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all mb-1 shadow-lg shadow-blue-600/20"
                >
                  Sign In
                </button>
              )}
              <div 
                onClick={onOpenSettings}
                className="flex items-center gap-3 rounded-xl hover:bg-white/5 cursor-pointer transition-all text-gray-400 hover:text-white px-3 py-2"
              >
                <Settings className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">System Settings</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
