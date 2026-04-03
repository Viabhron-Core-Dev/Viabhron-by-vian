import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Box, 
  Zap, 
  Cpu, 
  Layout, 
  Plus, 
  Play, 
  Settings, 
  Eye, 
  EyeOff,
  Database,
  Github,
  Search,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
  X
} from 'lucide-react';
import { CanvasNode, CanvasEdge } from '../../types';

interface CanvasProps {
  tabId: string;
  userId?: string;
  initialData?: { nodes: CanvasNode[]; edges: CanvasEdge[] };
  onUpdate: (data: { nodes: CanvasNode[]; edges: CanvasEdge[] }) => void;
  viewMode?: 'design' | 'logic';
  onViewModeChange?: (mode: 'design' | 'logic') => void;
}

export const Canvas: React.FC<CanvasProps> = ({ 
  tabId, 
  userId, 
  initialData, 
  onUpdate,
  viewMode: externalViewMode,
  onViewModeChange
}) => {
  const [nodes, setNodes] = useState<CanvasNode[]>(initialData?.nodes || [
    { id: '1', type: 'input', position: { x: 100, y: 100 }, data: { label: 'User Input' }, status: 'idle' },
    { id: '2', type: 'ai_text', position: { x: 400, y: 100 }, data: { label: 'Gemini Flash' }, status: 'idle' },
  ]);
  const [edges, setEdges] = useState<CanvasEdge[]>(initialData?.edges || [
    { id: 'e1-2', source: '1', target: '2', sourceHandle: 'out', targetHandle: 'in' }
  ]);
  const [internalViewMode, setInternalViewMode] = useState<'design' | 'logic'>('logic');
  
  const viewMode = externalViewMode || internalViewMode;
  const setViewMode = onViewModeChange || setInternalViewMode;
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const canvasRef = useRef<HTMLDivElement>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    onUpdate({ nodes, edges });
  }, [nodes, edges]);

  const handleAddNode = (type: CanvasNode['type']) => {
    const newNode: CanvasNode = {
      id: `node-${Date.now()}`,
      type,
      position: { x: 200 - pan.x, y: 200 - pan.y },
      data: { label: type.split('_').join(' ').toUpperCase() },
      status: 'idle'
    };
    setNodes([...nodes, newNode]);
  };

  const handleNodeDrag = (id: string, pos: { x: number; y: number }) => {
    setNodes(prev => prev.map(n => n.id === id ? { ...n, position: pos } : n));
  };

  const getNodeIcon = (type: CanvasNode['type']) => {
    switch (type) {
      case 'ai_text': return <SparklesIcon className="w-4 h-4 text-blue-400" />;
      case 'ai_image': return <Zap className="w-4 h-4 text-purple-400" />;
      case 'github': return <Github className="w-4 h-4 text-white" />;
      case 'ui_header': return <Layout className="w-4 h-4 text-cyan-400" />;
      case 'input': return <MessageSquare className="w-4 h-4 text-green-400" />;
      default: return <Cpu className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="flex h-full bg-[#050508] overflow-hidden relative font-sans pb-32 md:pb-0">
      {/* Infinite Grid Background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #00f2ff 1px, transparent 0)`,
          backgroundSize: '40px 40px',
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
        }}
      />

      {/* Toolbar - Moved to bottom and made more compact */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 bg-gray-900/90 backdrop-blur-2xl border border-white/10 p-1 rounded-xl shadow-2xl">
        <button 
          onClick={() => setViewMode('design')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${viewMode === 'design' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
        >
          <Layout className="w-3.5 h-3.5" />
          Design
        </button>
        <button 
          onClick={() => setViewMode('logic')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${viewMode === 'logic' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
        >
          <Zap className="w-3.5 h-3.5" />
          Logic
        </button>
        <div className="w-px h-4 bg-white/10 mx-1" />
        <button 
          onClick={() => setIsPreviewOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold text-green-400 hover:bg-green-400/10 transition-all"
        >
          <Play className="w-3.5 h-3.5" />
          Run
        </button>
      </div>

      {/* Node Sidebar */}
      <motion.div 
        initial={false}
        animate={{ 
          width: isSidebarOpen ? (window.innerWidth < 768 ? '100%' : 240) : 0,
          x: isSidebarOpen ? 0 : -20
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="bg-gray-900/95 backdrop-blur-2xl border-r border-white/10 flex flex-col z-40 absolute md:relative h-full overflow-hidden shadow-2xl"
      >
        <div className="w-[240px] md:w-full p-6 space-y-8 overflow-y-auto no-scrollbar h-full">
          <div className="flex items-center justify-between md:hidden mb-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest">Components</h3>
            <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-gray-500 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">UI Components</h3>
            <div className="grid grid-cols-2 gap-2">
              <SidebarItem icon={Layout} label="Header" onClick={() => { handleAddNode('ui_header'); if(window.innerWidth < 768) setIsSidebarOpen(false); }} />
              <SidebarItem icon={Box} label="Sidebar" onClick={() => { handleAddNode('ui_sidebar'); if(window.innerWidth < 768) setIsSidebarOpen(false); }} />
              <SidebarItem icon={Database} label="Content" onClick={() => { handleAddNode('ui_content'); if(window.innerWidth < 768) setIsSidebarOpen(false); }} />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Logic Agents</h3>
            <div className="grid grid-cols-2 gap-2">
              <SidebarItem icon={SparklesIcon} label="Gemini" onClick={() => { handleAddNode('ai_text'); if(window.innerWidth < 768) setIsSidebarOpen(false); }} />
              <SidebarItem icon={Zap} label="Image" onClick={() => { handleAddNode('ai_image'); if(window.innerWidth < 768) setIsSidebarOpen(false); }} />
              <SidebarItem icon={Github} label="GitHub" onClick={() => { handleAddNode('github'); if(window.innerWidth < 768) setIsSidebarOpen(false); }} />
              <SidebarItem icon={Search} label="Search" onClick={() => { handleAddNode('input'); if(window.innerWidth < 768) setIsSidebarOpen(false); }} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Toggle Button - Only visible when sidebar is closed or on desktop */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`fixed md:absolute left-0 top-1/2 -translate-y-1/2 w-6 h-12 bg-gray-900 border border-white/10 rounded-r-xl flex items-center justify-center text-gray-500 hover:text-white z-50 transition-all ${isSidebarOpen && window.innerWidth < 768 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        style={{ left: isSidebarOpen && window.innerWidth >= 768 ? 240 : 0 }}
      >
        {isSidebarOpen ? <ChevronLeft className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
      </button>

      {/* Canvas Area */}
      <div 
        ref={canvasRef}
        className="flex-1 relative cursor-grab active:cursor-grabbing"
        onMouseDown={(e) => {
          if (e.target === canvasRef.current) {
            const startX = e.clientX - pan.x;
            const startY = e.clientY - pan.y;
            const onMouseMove = (moveEvent: MouseEvent) => {
              setPan({ x: moveEvent.clientX - startX, y: moveEvent.clientY - startY });
            };
            const onMouseUp = () => {
              window.removeEventListener('mousemove', onMouseMove);
              window.removeEventListener('mouseup', onMouseUp);
            };
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
          }
        }}
      >
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}
        >
          {/* SVG Connections */}
          <svg className="absolute inset-0 w-full h-full overflow-visible">
            <defs>
              <linearGradient id="edge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00f2ff" />
                <stop offset="100%" stopColor="#0066ff" />
              </linearGradient>
            </defs>
            {edges.map(edge => {
              const sourceNode = nodes.find(n => n.id === edge.source);
              const targetNode = nodes.find(n => n.id === edge.target);
              if (!sourceNode || !targetNode) return null;

              const x1 = sourceNode.position.x + 180;
              const y1 = sourceNode.position.y + 40;
              const x2 = targetNode.position.x;
              const y2 = targetNode.position.y + 40;
              const dx = Math.abs(x2 - x1) * 0.5;

              return (
                <g key={edge.id}>
                  <path 
                    d={`M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`}
                    stroke="url(#edge-gradient)"
                    strokeWidth="2"
                    fill="none"
                    className={viewMode === 'logic' ? 'opacity-100' : 'opacity-20'}
                  />
                  {viewMode === 'logic' && (
                    <circle r="3" fill="#00f2ff" className="animate-pulse">
                      <animateMotion 
                        path={`M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`}
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Nodes */}
          {nodes.map((node) => (
            <motion.div
              key={node.id}
              drag
              dragMomentum={false}
              onDrag={(e, info) => handleNodeDrag(node.id, { x: node.position.x + info.delta.x, y: node.position.y + info.delta.y })}
              initial={false}
              animate={{ 
                x: node.position.x, 
                y: node.position.y,
                scale: selectedNodeId === node.id ? 1.05 : 1,
                opacity: viewMode === 'design' && !node.type.startsWith('ui') ? 0.3 : 1
              }}
              onClick={() => setSelectedNodeId(node.id)}
              className={`
                absolute w-[180px] bg-gray-900/90 backdrop-blur-xl border rounded-xl p-4 cursor-pointer pointer-events-auto
                ${selectedNodeId === node.id ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'border-white/10'}
                ${node.type.startsWith('ui') ? 'border-cyan-500/30' : ''}
              `}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gray-800 rounded-lg">
                  {getNodeIcon(node.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[10px] font-bold text-white truncate uppercase tracking-wider">{node.data.label}</h4>
                  <p className="text-[8px] text-gray-500 uppercase tracking-widest">{node.type.split('_').pop()}</p>
                </div>
              </div>

              {/* Ports */}
              <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full border-2 border-gray-950 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-500 rounded-full border-2 border-gray-950 shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Node Inspector */}
      <AnimatePresence>
        {selectedNodeId && (
          <motion.div 
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            exit={{ x: 300 }}
            className="w-[300px] bg-gray-900 border-l border-white/10 p-6 z-50 flex flex-col"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xs font-bold uppercase tracking-widest text-white">Node Inspector</h2>
              <button onClick={() => setSelectedNodeId(null)} className="p-1 hover:bg-white/5 rounded-md text-gray-500">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Label</label>
                <input 
                  type="text" 
                  value={nodes.find(n => n.id === selectedNodeId)?.data.label}
                  onChange={(e) => {
                    const val = e.target.value;
                    setNodes(prev => prev.map(n => n.id === selectedNodeId ? { ...n, data: { ...n.data, label: val } } : n));
                  }}
                  className="w-full bg-gray-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Vibe Preset</label>
                <div className="grid grid-cols-2 gap-2">
                  <button className="px-3 py-2 bg-gray-950 border border-white/5 rounded-lg text-[10px] text-gray-400 hover:text-white hover:border-blue-500 transition-all">Glassmorphism</button>
                  <button className="px-3 py-2 bg-gray-950 border border-white/5 rounded-lg text-[10px] text-gray-400 hover:text-white hover:border-blue-500 transition-all">Neon Cyber</button>
                  <button className="px-3 py-2 bg-gray-950 border border-white/5 rounded-lg text-[10px] text-gray-400 hover:text-white hover:border-blue-500 transition-all">Minimal</button>
                  <button className="px-3 py-2 bg-gray-950 border border-white/5 rounded-lg text-[10px] text-gray-400 hover:text-white hover:border-blue-500 transition-all">Brutalist</button>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-white/5">
              <button 
                onClick={() => {
                  setNodes(prev => prev.filter(n => n.id !== selectedNodeId));
                  setSelectedNodeId(null);
                }}
                className="w-full py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all"
              >
                Delete Node
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live Preview Overlay */}
      <AnimatePresence>
        {isPreviewOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-gray-950 flex flex-col"
          >
            <div className="h-14 border-b border-white/10 px-6 flex items-center justify-between bg-gray-900/50 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-white">Live App Shell (Preview)</span>
              </div>
              <button 
                onClick={() => setIsPreviewOpen(false)}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold text-gray-400 hover:text-white transition-all"
              >
                <X className="w-4 h-4" />
                Close Preview
              </button>
            </div>
            <div className="flex-1 p-8 bg-[#050508] flex items-center justify-center">
              <div className="w-full max-w-5xl aspect-video bg-gray-900 rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">
                <div className="h-12 border-b border-white/5 bg-gray-950/50 px-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                  </div>
                  <div className="px-4 py-1 bg-white/5 rounded-full text-[10px] text-gray-500 font-mono">localhost:3000</div>
                  <div className="w-12" />
                </div>
                <div className="flex-1 flex items-center justify-center text-gray-600 font-mono text-sm">
                  [ Vibe-Omni Shell Rendered ]
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SidebarItem = ({ icon: Icon, label, onClick }: { icon: any, label: string, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-center gap-2 p-3 bg-gray-950 border border-white/5 rounded-xl hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group"
  >
    <Icon className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
    <span className="text-[9px] font-bold text-gray-500 group-hover:text-white uppercase tracking-wider">{label}</span>
  </button>
);

const SparklesIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);
