import React, { useState, useEffect } from 'react';
import { 
  Cloud, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ExternalLink,
  ChevronRight,
  Database,
  Server,
  HardDrive
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { infra } from '../../lib/infraManager';

interface Project {
  projectId: string;
  name: string;
  projectNumber: string;
}

interface DiscoveryProps {
  accessToken: string;
  onProjectSelected: (projectId: string, config: any) => void;
}

interface ProvisioningStep {
  id: 'firebase' | 'cloudrun' | 'drive';
  label: string;
  status: 'pending' | 'loading' | 'success' | 'error';
  icon: any;
}

export const Discovery: React.FC<DiscoveryProps> = ({ accessToken, onProjectSelected }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectingId, setSelectingId] = useState<string | null>(null);
  const [provisioningSteps, setProvisioningSteps] = useState<ProvisioningStep[]>([
    { id: 'firebase', label: 'Firebase Database', status: 'pending', icon: Database },
    { id: 'cloudrun', label: 'Cloud Run Office', status: 'pending', icon: Server },
    { id: 'drive', label: 'Google Drive Library', status: 'pending', icon: HardDrive },
  ]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const fetchedProjects = await infra.fetchUserProjects(accessToken);
        setProjects(fetchedProjects);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, [accessToken]);

  const handleSelect = async (projectId: string) => {
    try {
      setSelectingId(projectId);
      setError(null);
      
      // Step 1: Firebase
      setProvisioningSteps(prev => prev.map(s => s.id === 'firebase' ? { ...s, status: 'loading' } : s));
      await new Promise(r => setTimeout(r, 1500)); // Simulate API call
      const config = await infra.getProjectConfig(projectId);
      setProvisioningSteps(prev => prev.map(s => s.id === 'firebase' ? { ...s, status: 'success' } : s));

      // Step 2: Cloud Run
      setProvisioningSteps(prev => prev.map(s => s.id === 'cloudrun' ? { ...s, status: 'loading' } : s));
      await new Promise(r => setTimeout(r, 2000)); // Simulate provisioning
      setProvisioningSteps(prev => prev.map(s => s.id === 'cloudrun' ? { ...s, status: 'success' } : s));

      // Step 3: Google Drive
      setProvisioningSteps(prev => prev.map(s => s.id === 'drive' ? { ...s, status: 'loading' } : s));
      await new Promise(r => setTimeout(r, 1200)); // Simulate folder creation
      setProvisioningSteps(prev => prev.map(s => s.id === 'drive' ? { ...s, status: 'success' } : s));

      await new Promise(r => setTimeout(r, 800));
      onProjectSelected(projectId, config);
    } catch (err) {
      setError(`Failed to provision services for ${projectId}. Ensure all APIs are enabled in the GCP Console.`);
      setProvisioningSteps(prev => prev.map(s => s.status === 'loading' ? { ...s, status: 'error' } : s));
    } finally {
      setSelectingId(null);
    }
  };

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.projectId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-gray-950 text-gray-100 p-8 pb-32 md:pb-8 overflow-y-auto no-scrollbar">
      <div className="max-w-4xl mx-auto w-full space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-blue-500">
            <Cloud className="w-8 h-8" />
            <h1 className="text-3xl font-bold tracking-tight">Cloud Discovery</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Select a Google Cloud project to bridge your AI Computer to your own infrastructure.
          </p>
        </div>

        {/* Provisioning Overlay */}
        <AnimatePresence>
          {selectingId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-gray-950/90 backdrop-blur-xl flex items-center justify-center p-6"
            >
              <div className="max-w-md w-full space-y-8">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 rounded-3xl bg-blue-600/20 flex items-center justify-center mx-auto mb-4">
                    <Cloud className="w-8 h-8 text-blue-500 animate-pulse" />
                  </div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Provisioning Your Office</h2>
                  <p className="text-gray-400 text-sm">Setting up the Triple Service bridge for {selectingId}...</p>
                </div>

                <div className="space-y-3">
                  {provisioningSteps.map((step) => (
                    <div 
                      key={step.id}
                      className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                        step.status === 'success' ? 'bg-green-500/5 border-green-500/20' :
                        step.status === 'loading' ? 'bg-blue-500/5 border-blue-500/20' :
                        'bg-gray-900/50 border-white/5'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        step.status === 'success' ? 'bg-green-500/20 text-green-400' :
                        step.status === 'loading' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-gray-800 text-gray-500'
                      }`}>
                        <step.icon className={`w-5 h-5 ${step.status === 'loading' ? 'animate-pulse' : ''}`} />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-bold text-white uppercase tracking-widest">{step.label}</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-tighter">
                          {step.status === 'success' ? 'Ready' : 
                           step.status === 'loading' ? 'Configuring...' : 
                           step.status === 'error' ? 'Failed' : 'Waiting...'}
                        </div>
                      </div>
                      {step.status === 'success' && <CheckCircle2 className="w-4 h-4 text-green-400" />}
                      {step.status === 'loading' && <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />}
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <p className="text-[10px] text-gray-600 uppercase tracking-widest">This may take a few moments</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search & Stats */}
        <div className="flex items-center gap-4 bg-gray-900/50 p-4 rounded-xl border border-white/5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-950 border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            {filteredProjects.length} Projects Found
          </div>
        </div>

        {/* Error State */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex gap-3 text-red-200 text-sm"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <div className="space-y-2">
                <p>{error}</p>
                <a 
                  href="https://console.cloud.google.com/apis/library/firebase.googleapis.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-red-400 hover:text-red-300 font-medium transition-colors"
                >
                  Enable Firebase Management API <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Projects List */}
        <div className="grid gap-3">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
              <p className="text-gray-500 animate-pulse">Scanning your Google Cloud...</p>
            </div>
          ) : filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <motion.div
                key={project.projectId}
                whileHover={{ x: 4 }}
                onClick={() => !selectingId && handleSelect(project.projectId)}
                className={`
                  group flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer
                  ${selectingId === project.projectId 
                    ? 'bg-blue-500/10 border-blue-500/50' 
                    : 'bg-gray-900 border-white/5 hover:border-white/20 hover:bg-white/5'}
                `}
              >
                <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 group-hover:text-blue-400 transition-colors">
                  <Database className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-200 truncate">{project.name}</h3>
                  <p className="text-xs text-gray-500 font-mono truncate">{project.projectId}</p>
                </div>
                <div className="flex items-center gap-3">
                  {selectingId === project.projectId ? (
                    <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors" />
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20 space-y-4">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto text-gray-700">
                <Cloud className="w-8 h-8" />
              </div>
              <p className="text-gray-500">No projects found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
