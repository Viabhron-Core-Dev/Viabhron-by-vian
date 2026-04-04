import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  ShieldAlert, 
  ShieldCheck, 
  Search, 
  Settings, 
  Activity, 
  Zap, 
  Clock, 
  AlertTriangle,
  FileWarning,
  CheckCircle2,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

interface ScanResult {
  id: string;
  fileName: string;
  status: 'clean' | 'suspicious' | 'malicious';
  threatLevel: number; // 0-100
  timestamp: Date;
  engine: string;
}

export const Sentinel: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanInterval, setScanInterval] = useState(6); // hours
  const [scanDepth, setScanDepth] = useState<'quick' | 'deep' | 'paranoid'>('deep');
  const [results, setResults] = useState<ScanResult[]>([
    { id: '1', fileName: 'main.py', status: 'clean', threatLevel: 0, timestamp: new Date(), engine: 'Viabhron Core' },
    { id: '2', fileName: 'agent_v3_patch.bin', status: 'suspicious', threatLevel: 45, timestamp: new Date(Date.now() - 3600000), engine: 'VirusTotal API' },
    { id: '3', fileName: 'utils.js', status: 'clean', threatLevel: 2, timestamp: new Date(Date.now() - 7200000), engine: 'Viabhron Core' }
  ]);

  const handleStartScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 3000);
  };

  const getStatusColor = (status: ScanResult['status']) => {
    switch (status) {
      case 'clean': return 'text-green-500';
      case 'suspicious': return 'text-yellow-500';
      case 'malicious': return 'text-red-500';
    }
  };

  const getStatusIcon = (status: ScanResult['status']) => {
    switch (status) {
      case 'clean': return <ShieldCheck className="w-4 h-4 text-green-500" />;
      case 'suspicious': return <ShieldAlert className="w-4 h-4 text-yellow-500" />;
      case 'malicious': return <AlertTriangle className="w-4 h-4 text-red-500" />;
    }
  };

  return (
    <div className="h-full bg-[#050508] flex flex-col font-sans overflow-hidden">
      {/* Header HUD */}
      <div className="h-16 bg-gray-900/50 border-b border-white/5 flex items-center justify-between px-6 backdrop-blur-xl shrink-0">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-blue-600/10 rounded-xl">
            <Shield className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-widest">Sentinel Guardian</h2>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">System Integrity & Threat Detection</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[9px] font-bold text-green-400 uppercase tracking-widest">Active Protection</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">Guardian Linked</span>
          </div>
          <button 
            onClick={handleStartScan}
            disabled={isScanning}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20"
          >
            {isScanning ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
            {isScanning ? 'Scanning...' : 'Manual Scan'}
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Main Feed */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard icon={Activity} label="Files Scanned" value="12,450" color="text-blue-400" />
            <StatCard icon={ShieldAlert} label="Threats Blocked" value="0" color="text-green-400" />
            <StatCard icon={Zap} label="API Integrity" value="100%" color="text-purple-400" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Recent Activity</h3>
              <button className="text-[9px] text-blue-400 font-bold uppercase hover:underline">Clear History</button>
            </div>
            <div className="space-y-2">
              {results.map((result) => (
                <motion.div 
                  key={result.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-gray-900/50 border border-white/5 rounded-2xl p-4 flex items-center justify-between group hover:border-white/10 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-gray-950 rounded-xl">
                      {getStatusIcon(result.status)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white mb-0.5">{result.fileName}</div>
                      <div className="flex items-center gap-3 text-[9px] text-gray-500 uppercase tracking-widest font-bold">
                        <span>{result.engine}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-700" />
                        <span>{result.timestamp.toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className={`text-[10px] font-bold uppercase tracking-widest ${getStatusColor(result.status)}`}>
                        {result.status}
                      </div>
                      <div className="text-[9px] text-gray-600 uppercase tracking-tighter">Threat: {result.threatLevel}%</div>
                    </div>
                    <button className="p-2 text-gray-600 hover:text-white transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Configuration Sidebar */}
        <div className="w-full md:w-72 bg-gray-900/30 border-l border-white/5 p-6 space-y-8 shrink-0 overflow-y-auto no-scrollbar">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-400">
              <Settings className="w-3.5 h-3.5" />
              <h3 className="text-[10px] font-bold uppercase tracking-widest">Guardian Config</h3>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-gray-500">Scan Interval</span>
                  <span className="text-blue-400">{scanInterval} Hours</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="24" 
                  value={scanInterval}
                  onChange={(e) => setScanInterval(parseInt(e.target.value))}
                  className="w-full h-1 bg-white/5 rounded-full appearance-none cursor-pointer accent-blue-500"
                />
                <p className="text-[8px] text-gray-600 uppercase tracking-tighter italic">More frequent scans consume more Cloud Run resources.</p>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Scan Depth</label>
                <div className="grid grid-cols-1 gap-2">
                  <DepthOption 
                    active={scanDepth === 'quick'} 
                    label="Quick Scan" 
                    desc="Metadata only" 
                    onClick={() => setScanDepth('quick')} 
                  />
                  <DepthOption 
                    active={scanDepth === 'deep'} 
                    label="Deep Analysis" 
                    desc="Heuristic + API" 
                    onClick={() => setScanDepth('deep')} 
                  />
                  <DepthOption 
                    active={scanDepth === 'paranoid'} 
                    label="Paranoid" 
                    desc="Full Sandbox" 
                    onClick={() => setScanDepth('paranoid')} 
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <h3 className="text-[10px] font-bold uppercase tracking-widest">Integrations</h3>
            </div>
            <div className="p-4 bg-gray-950 border border-white/5 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">VirusTotal API</span>
                <div className="w-2 h-2 rounded-full bg-green-500" />
              </div>
              <p className="text-[9px] text-gray-500 leading-relaxed">Suspicious files are automatically hashed and checked against 70+ antivirus engines.</p>
              <button className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-xl text-[9px] font-bold uppercase tracking-widest text-gray-400 transition-all">Configure API Key</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, color }: { icon: any, label: string, value: string, color: string }) => (
  <div className="bg-gray-900/50 border border-white/5 rounded-2xl p-4 space-y-2">
    <div className="flex items-center gap-2 text-gray-500">
      <Icon className="w-3.5 h-3.5" />
      <span className="text-[9px] font-bold uppercase tracking-widest">{label}</span>
    </div>
    <div className={`text-xl font-bold ${color}`}>{value}</div>
  </div>
);

const DepthOption = ({ active, label, desc, onClick }: { active: boolean, label: string, desc: string, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full p-3 rounded-xl border text-left transition-all ${active ? 'bg-blue-600/10 border-blue-500/40 text-white' : 'bg-gray-950 border-white/5 text-gray-500 hover:border-white/10'}`}
  >
    <div className="text-[10px] font-bold uppercase tracking-wider mb-0.5">{label}</div>
    <div className="text-[8px] uppercase tracking-tighter opacity-60">{desc}</div>
  </button>
);
