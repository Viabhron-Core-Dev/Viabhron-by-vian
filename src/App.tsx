/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { 
  Bot, 
  MessageSquare, 
  Zap, 
  Puzzle, 
  Settings, 
  Layout, 
  Plus, 
  Download, 
  HelpCircle, 
  Shield,
  Brain,
  Trash2,
  X,
  Terminal as TerminalIcon,
  Cpu,
  HardDrive,
  Server,
  Activity,
  Database
} from 'lucide-react';

import { Tabs } from './components/Shell/Tabs';
import { Sidebar } from './components/Shell/Sidebar';
import { Chat } from './components/Shell/Chat';
import { Discovery } from './components/Shell/Discovery';
import { ExtensionStore } from './components/Shell/ExtensionStore';
import { Canvas } from './components/Shell/Canvas';
import { BottomNavigation } from './components/Shell/BottomNavigation';
import { SystemHUD } from './components/Shell/SystemHUD';
import { TabSwitcher } from './components/Shell/TabSwitcher';
import { ConfirmationGate } from './components/Shell/ConfirmationGate';
import { Terminal } from './extensions/modules/Terminal';
import { Artifacts } from './extensions/modules/Artifacts';
import { SystemMetrics } from './extensions/modules/SystemMetrics';
import { Simulation } from './extensions/modules/Simulation';
import { Governance } from './extensions/modules/Governance';
import { Logo } from './components/Shell/Logo';

import { Extension, TabType, Agent, UIConfig } from './types';
import { infra } from './lib/infraManager';
import { db } from './lib/firebase';
import { doc, setDoc, deleteDoc, collection, onSnapshot } from 'firebase/firestore';
import { AIService } from './lib/aiService';

import { useAuth } from './hooks/useAuth';
import { useTabs } from './hooks/useTabs';
import { INITIAL_EXTENSIONS } from './constants/extensions';

declare global {
  interface Window {
    google: any;
  }
}

export default function App() {
  const { user, isAuthReady, login, logout } = useAuth();
  const [extensions, setExtensions] = useState<Extension[]>(INITIAL_EXTENSIONS);
  
  const { 
    tabs, 
    activeTabId, 
    setActiveTabId, 
    handleAddTab, 
    handleCloseTab, 
    handleWakeTab, 
    handleShelveTab 
  } = useTabs(user, extensions);

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isTabSwitcherOpen, setIsTabSwitcherOpen] = useState(false);
  const [isSystemMenuOpen, setIsSystemMenuOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [confirmationRequest, setConfirmationRequest] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    agentName: string;
    onConfirm: () => void;
  } | null>(null);
  const [canvasViewMode, setCanvasViewMode] = useState<'design' | 'logic'>('logic');
  const [uiConfig, setUiConfig] = useState<UIConfig>({
    theme: 'dark',
    layout: 'default',
    sidebarVisible: false,
    activeTabId: '',
    accentColor: '#3b82f6'
  });
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [bridgedProjectId, setBridgedProjectId] = useState<string | null>(null);

  const [agents, setAgents] = useState<Agent[]>([]);
  const [isAddingAgent, setIsAddingAgent] = useState(false);
  const [newAgentName, setNewAgentName] = useState('');
  const [newAgentKey, setNewAgentKey] = useState('');

  useEffect(() => {
    if (!user) return;
    const agentsRef = collection(db, 'users', user.uid, 'agents');
    return onSnapshot(agentsRef, async (snap) => {
      const fetchedAgents = snap.docs.map(doc => ({ ...doc.data(), id: doc.id } as Agent));
      setAgents(fetchedAgents);

      // Ensure Head Agent exists
      if (!fetchedAgents.find(a => a.role === 'head')) {
        const headId = 'head-architect';
        await setDoc(doc(db, 'users', user.uid, 'agents', headId), {
          id: headId,
          name: 'The Architect',
          description: 'System Orchestrator & UI Manager',
          role: 'head',
          provider: 'gemini',
          model: 'gemini-3-flash-preview',
          systemInstruction: `You are the Head Agent of Viabhron. 
          Rules:
          1. Only you can propose changes to the UI, Skeleton, or Extensions.
          2. All such changes require explicit user confirmation via the Confirmation Gate.
          3. You do not have access to sensitive API keys or passwords.
          4. Delegate specialized tasks to Sub-Agents or Minor Agents.
          5. Only propose minor, stable changes to the UI.`,
          activeExtensionIds: ['m3', 't4'], // Gemini API Docs MCP & Terminal
          color: '#3b82f6'
        });
      }
    });
  }, [user]);

  const handleAddAgent = async () => {
    if (!user || !newAgentName || !newAgentKey) return;
    const provider = AIService.recognizeProvider(newAgentKey);
    const agentId = Date.now().toString();
    await setDoc(doc(db, 'users', user.uid, 'agents', agentId), {
      id: agentId,
      name: newAgentName,
      apiKey: newAgentKey,
      role: 'major', // Default role for user-added agents
      provider,
      model: provider === 'gemini' ? 'gemini-3-flash-preview' : 'gpt-4o',
      systemInstruction: 'You are a helpful assistant.',
      activeExtensionIds: [],
      color: '#' + Math.floor(Math.random()*16777215).toString(16)
    });
    setNewAgentName('');
    setNewAgentKey('');
    setIsAddingAgent(false);
  };

  const handleDeleteAgent = async (id: string) => {
    if (!user) return;
    await deleteDoc(doc(db, 'users', user.uid, 'agents', id));
  };

  const MAX_ACTIVE_TABS = 3;

  const handleConnectCloud = async () => {
    if (!window.google) {
      alert("Google Identity Services SDK not loaded yet. Please wait a moment.");
      return;
    }

    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: '362818222127-klunm5pynjz5p5ata5r4xc.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/cloud-platform.read-only https://www.googleapis.com/auth/firebase.readonly',
      callback: (response: any) => {
        if (response.access_token) {
          setAccessToken(response.access_token);
          handleAddTab('discovery', 'Cloud Discovery');
        }
      },
    });
    client.requestAccessToken();
  };

  const handleProjectSelected = async (projectId: string, config: any) => {
    try {
      await infra.connectToUserBackend(config);
      setBridgedProjectId(projectId);
      if (activeTabId) {
        handleCloseTab(activeTabId);
      }
      handleAddTab('chat', `Session (${projectId})`);
    } catch (err) {
      console.error("Failed to bridge to project", err);
      alert("Failed to bridge to project. Ensure Firebase Management API is enabled.");
    }
  };

  const handleInstallExtension = (ext: Extension) => {
    if (extensions.find(e => e.id === ext.id)) return;
    setExtensions(prev => [...prev, { ...ext, status: 'active' }]);
  };

  const onQuickAction = (action: () => void) => {
    setIsSystemMenuOpen(false);
    setIsSidebarCollapsed(true);
    action();
  };

  if (!isAuthReady) {
    return (
      <div className="h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-gray-100 overflow-hidden font-sans">
      <div className="flex-1 flex overflow-hidden relative">
        <Sidebar 
          user={user}
          login={login}
          logout={logout}
          extensions={extensions} 
          onConnectCloud={handleConnectCloud} 
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          onOpenStore={() => onQuickAction(() => handleAddTab('store', 'Extension Store'))}
          onOpenCanvas={() => onQuickAction(() => handleAddTab('canvas', 'Visual Workflow'))}
          onOpenArtifacts={() => onQuickAction(() => handleAddTab('artifacts', 'Generative Artifacts'))}
          onOpenMetrics={() => onQuickAction(() => handleAddTab('metrics', 'System Metrics'))}
          onOpenSimulation={() => onQuickAction(() => handleAddTab('simulation', 'Simulation Engine'))}
          onOpenGovernance={() => onQuickAction(() => handleAddTab('governance', 'Agent Governance Toolkit'))}
          onOpenSettings={() => onQuickAction(() => handleAddTab('settings', 'System Settings'))}
        />

        <div className="flex-1 flex flex-col min-w-0 relative">
          <div className="flex-1 relative overflow-hidden pb-32 md:pb-0">
            {(!isSidebarCollapsed || isSystemMenuOpen) && (
              <div 
                className="absolute inset-0 z-[80] bg-black/20 backdrop-blur-[2px]"
                onClick={() => {
                  setIsSidebarCollapsed(true);
                  setIsSystemMenuOpen(false);
                }}
              />
            )}

            <SystemHUD 
              onClearCache={() => console.log('Cache cleared')}
              onHibernateAll={() => tabs.forEach(t => handleShelveTab(t.id))}
            />

            <AnimatePresence>
              {isTerminalOpen && (
                <div className="absolute bottom-4 right-4 w-full max-w-lg h-64 z-[150]">
                  <Terminal onClose={() => setIsTerminalOpen(false)} />
                </div>
              )}
            </AnimatePresence>

            <ConfirmationGate 
              isOpen={confirmationRequest?.isOpen || false}
              title={confirmationRequest?.title || ''}
              description={confirmationRequest?.description || ''}
              agentName={confirmationRequest?.agentName || ''}
              onConfirm={() => {
                confirmationRequest?.onConfirm();
                setConfirmationRequest(null);
              }}
              onCancel={() => setConfirmationRequest(null)}
            />

            <div className="flex-1 relative h-full">
              {tabs.map((tab) => (
                <div 
                  key={tab.id}
                  className={`absolute inset-0 transition-opacity duration-300 ${tab.id === activeTabId && tab.status === 'active' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
                >
                {tab.type === 'chat' ? (
                  <Chat 
                    tabId={tab.id} 
                    userId={user?.uid} 
                    agentId={tab.agentId}
                    availableExtensions={extensions}
                    activeExtensionIds={tab.activeExtensionIds || []}
                    onUpdateExtensions={(ids) => {
                      if (user) {
                        setDoc(doc(db, 'users', user.uid, 'tabs', tab.id), { activeExtensionIds: ids }, { merge: true });
                      }
                    }}
                  />
                ) : tab.type === 'discovery' && accessToken ? (
                  <Discovery 
                    accessToken={accessToken} 
                    onProjectSelected={handleProjectSelected} 
                  />
                ) : tab.type === 'store' ? (
                  <ExtensionStore 
                    onInstall={handleInstallExtension} 
                    installedIds={extensions.map(e => e.id)} 
                  />
                ) : tab.type === 'canvas' ? (
                  <Canvas 
                    tabId={tab.id}
                    userId={user?.uid}
                    initialData={tab.canvasData}
                    viewMode={canvasViewMode}
                    onViewModeChange={setCanvasViewMode}
                    onUpdate={(data) => {
                      if (user) {
                        setDoc(doc(db, 'users', user.uid, 'tabs', tab.id), { canvasData: data }, { merge: true });
                      }
                    }}
                  />
                ) : tab.type === 'artifacts' ? (
                  <Artifacts 
                    tabId={tab.id}
                    userId={user?.uid}
                  />
                ) : tab.type === 'metrics' ? (
                  <SystemMetrics />
                ) : tab.type === 'simulation' ? (
                  <Simulation />
                ) : tab.type === 'governance' ? (
                  <Governance />
                ) : tab.type === 'settings' ? (
                  <div className="h-full bg-gray-950 p-8 pb-32 md:pb-8 overflow-y-auto no-scrollbar">
                    <div className="max-w-2xl mx-auto space-y-8">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center">
                          <Settings className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h1 className="text-2xl font-bold text-white">System Settings</h1>
                          <p className="text-sm text-gray-500">Manage your Viabhron environment</p>
                        </div>
                      </div>

                      <div className="grid gap-4">
                        <div className="bg-gray-900 border border-white/5 rounded-2xl p-6 space-y-6">
                          <div className="flex items-center justify-between">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">System Provisioning</h3>
                            <div className="flex items-center gap-2 px-2 py-1 bg-green-500/10 border border-green-500/20 rounded-lg">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                              <span className="text-[9px] font-bold text-green-400 uppercase tracking-widest">Bridged</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-3">
                            {[
                              { label: 'Firebase', icon: Database, status: 'Active', color: 'text-orange-400' },
                              { label: 'Cloud Run', icon: Server, status: 'Active', color: 'text-blue-400' },
                              { label: 'G-Drive', icon: HardDrive, status: 'Active', color: 'text-purple-400' },
                            ].map((item) => (
                              <div key={item.label} className="bg-gray-950 border border-white/5 rounded-xl p-3 text-center space-y-2">
                                <item.icon className={`w-5 h-5 mx-auto ${item.color}`} />
                                <div className="text-[10px] font-bold text-white uppercase tracking-tight">{item.label}</div>
                                <div className="text-[8px] text-gray-500 uppercase tracking-widest">{item.status}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-gray-900 border border-white/5 rounded-2xl p-6 space-y-6 relative">
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Agent Cluster Manager</h3>
                              <p className="text-[10px] text-gray-600 uppercase tracking-tighter">Manage your Private AI Kernel & Specialists</p>
                            </div>
                            <button 
                              onClick={() => setIsAddingAgent(true)}
                              className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20"
                            >
                              <Plus className="w-4 h-4 text-white" />
                            </button>
                          </div>

                          {/* Head AI (Kernel) */}
                          <div className="p-4 bg-blue-600/5 border border-blue-500/20 rounded-2xl space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                                  <Brain className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                  <div className="text-sm font-bold text-white uppercase tracking-tight">Main Head AI <span className="text-[10px] text-blue-400 ml-2">Kernel</span></div>
                                  <div className="text-[10px] text-gray-500 uppercase tracking-widest">Gemma 2B (Local Office)</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Running</div>
                                <div className="text-[8px] text-gray-600 uppercase tracking-tighter">4GB RAM Allocated</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <h4 className="text-[10px] font-bold text-gray-600 uppercase tracking-widest px-1">Sub-Head Specialists</h4>
                            {agents.map((agent) => (
                              <div key={agent.id} className="flex items-center justify-between p-3 bg-gray-950 border border-white/5 rounded-xl group">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs" style={{ backgroundColor: agent.color }}>
                                    {agent.name[0].toUpperCase()}
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-white">{agent.name}</div>
                                    <div className="text-[10px] text-gray-500 uppercase tracking-widest">{agent.provider} Specialist</div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-4">
                                  <div className="hidden group-hover:flex items-center gap-2 text-[9px] text-gray-500 uppercase tracking-widest">
                                    <Cpu className="w-3 h-3" /> 2 vCPU
                                  </div>
                                  <button 
                                    onClick={() => handleDeleteAgent(agent.id)}
                                    className="p-2 text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                            {agents.length === 0 && (
                              <div className="text-center py-8 border-2 border-dashed border-white/5 rounded-2xl">
                                <Bot className="w-8 h-8 text-gray-700 mx-auto mb-2" />
                                <p className="text-xs text-gray-600">No specialists added to cluster</p>
                              </div>
                            )}
                          </div>

                          <AnimatePresence>
                            {isAddingAgent && (
                              <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute inset-0 bg-gray-900 rounded-2xl p-6 z-10 flex flex-col"
                              >
                                <div className="flex items-center justify-between mb-6">
                                  <h4 className="text-sm font-bold text-white">Add New Agent</h4>
                                  <button onClick={() => setIsAddingAgent(false)} className="text-gray-500 hover:text-white">
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                                <div className="space-y-4 flex-1">
                                  <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Agent Name</label>
                                    <input 
                                      type="text"
                                      value={newAgentName}
                                      onChange={(e) => setNewAgentName(e.target.value)}
                                      placeholder="e.g. Code Architect"
                                      className="w-full bg-gray-950 border border-white/5 rounded-xl px-4 py-2 text-sm focus:border-blue-500 transition-all outline-none"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">API Key</label>
                                    <div className="relative">
                                      <input 
                                        type="password"
                                        value={newAgentKey}
                                        onChange={(e) => setNewAgentKey(e.target.value)}
                                        placeholder="sk-... or gsk_..."
                                        className="w-full bg-gray-950 border border-white/5 rounded-xl px-4 py-2 text-sm focus:border-blue-500 transition-all outline-none pr-10"
                                      />
                                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        {newAgentKey && (
                                          <span className="text-[8px] font-bold px-1.5 py-0.5 bg-blue-500/10 text-blue-400 rounded border border-blue-500/20 uppercase">
                                            {AIService.recognizeProvider(newAgentKey)}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <button 
                                  onClick={handleAddAgent}
                                  disabled={!newAgentName || !newAgentKey}
                                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-white rounded-xl font-bold transition-all mt-4"
                                >
                                  Create Agent
                                </button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        <div className="bg-gray-900 border border-white/5 rounded-2xl p-6 space-y-4 text-center">
                          <p className="text-xs text-gray-500">Viabhron Shell v1.0.4-alpha</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          <div className="md:hidden relative z-[100]">
            <BottomNavigation 
              tabs={tabs}
              activeTabId={activeTabId || ''}
              isSidebarOpen={!isSidebarCollapsed}
              onTabSelect={(id) => onQuickAction(() => {
                const tab = tabs.find(t => t.id === id);
                if (tab?.status === 'shelved') {
                  handleWakeTab(id);
                } else {
                  setActiveTabId(id);
                }
              })}
              onTabClose={handleCloseTab}
              onAddTab={() => onQuickAction(() => handleAddTab())}
              onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              onOpenSettings={() => onQuickAction(() => handleAddTab('settings', 'System Settings'))}
              onOpenTabSwitcher={() => setIsTabSwitcherOpen(true)}
              onOpenSystemMenu={() => setIsSystemMenuOpen(true)}
              onEditTab={(tab) => {
                const newTitle = prompt('Rename this session:', tab.title);
                if (newTitle && user) {
                  setDoc(doc(db, 'users', user.uid, 'tabs', tab.id), { title: newTitle }, { merge: true });
                }
              }}
              onShareTab={(tab) => {
                onQuickAction(() => handleAddTab(tab.type, `${tab.title} (Clone)`));
              }}
            />
          </div>

          <AnimatePresence>
            {isSystemMenuOpen && (
              <>
                <div className="fixed inset-0 z-[110]" onClick={() => setIsSystemMenuOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="fixed bottom-24 right-4 w-64 bg-gray-900/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl z-[120] overflow-hidden"
                >
                  <div className="p-2 space-y-1">
                    <button 
                      onClick={() => {
                        setIsTerminalOpen(!isTerminalOpen);
                        setIsSystemMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-2xl transition-colors text-left group"
                    >
                      <TerminalIcon className="w-4 h-4 text-gray-500 group-hover:text-blue-400" />
                      <span className="text-xs font-bold text-gray-300 group-hover:text-white uppercase tracking-wider">Agent Terminal</span>
                    </button>
                    <button 
                      onClick={() => {
                        setCanvasViewMode(prev => prev === 'design' ? 'logic' : 'design');
                        setIsSystemMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-2xl transition-colors text-left group"
                    >
                      <Layout className="w-4 h-4 text-gray-500 group-hover:text-blue-400" />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-300 group-hover:text-white uppercase tracking-wider">View Modes</span>
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest">Currently: {canvasViewMode}</span>
                      </div>
                    </button>
                    <button 
                      onClick={() => onQuickAction(() => handleAddTab('canvas', 'Sandbox Content'))}
                      className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-2xl transition-colors text-left group"
                    >
                      <Puzzle className="w-4 h-4 text-gray-500 group-hover:text-blue-400" />
                      <span className="text-xs font-bold text-gray-300 group-hover:text-white uppercase tracking-wider">Sandbox Content</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-2xl transition-colors text-left group">
                      <Settings className="w-4 h-4 text-gray-500 group-hover:text-blue-400" />
                      <span className="text-xs font-bold text-gray-300 group-hover:text-white uppercase tracking-wider">Agent Settings</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-2xl transition-colors text-left group">
                      <Shield className="w-4 h-4 text-gray-500 group-hover:text-blue-400" />
                      <span className="text-xs font-bold text-gray-300 group-hover:text-white uppercase tracking-wider">Privacy & Security</span>
                    </button>
                    <div className="h-px bg-white/5 my-1 mx-2" />
                    <button className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-2xl transition-colors text-left group">
                      <Download className="w-4 h-4 text-gray-500 group-hover:text-blue-400" />
                      <span className="text-xs font-bold text-gray-300 group-hover:text-white uppercase tracking-wider">Export Data</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-2xl transition-colors text-left group">
                      <HelpCircle className="w-4 h-4 text-gray-500 group-hover:text-blue-400" />
                      <span className="text-xs font-bold text-gray-300 group-hover:text-white uppercase tracking-wider">Help & Feedback</span>
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isTabSwitcherOpen && (
              <TabSwitcher 
                tabs={tabs}
                activeTabId={activeTabId || ''}
                onTabSelect={(id) => onQuickAction(() => {
                  const tab = tabs.find(t => t.id === id);
                  if (tab?.status === 'shelved') {
                    handleWakeTab(id);
                  } else {
                    setActiveTabId(id);
                  }
                  setIsTabSwitcherOpen(false);
                })}
                onTabClose={handleCloseTab}
                onAddTab={() => onQuickAction(() => {
                  handleAddTab();
                  setIsTabSwitcherOpen(false);
                })}
                onClose={() => setIsTabSwitcherOpen(false)}
              />
            )}
          </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
