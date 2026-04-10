import { Terminal, Activity, Bug, Shield, Plus, Palette, Library } from 'lucide-react';
import { Extension } from '../../src/types';

export const agentTerminalModule: Extension = { 
  id: 't4', 
  name: 'Agent Terminal', 
  category: 'module', 
  icon: Terminal, 
  status: 'active', 
  source: 'inbuilt', 
  description: 'Real-time log and command output for AI agents' 
};

export const systemMetricsModule: Extension = { 
  id: 't5', 
  name: 'System Metrics', 
  category: 'module', 
  icon: Activity, 
  status: 'active', 
  source: 'inbuilt', 
  description: 'Real-time performance and resource monitoring' 
};

export const simulationEngineModule: Extension = { 
  id: 't6', 
  name: 'Simulation Engine', 
  category: 'module', 
  icon: Bug, 
  status: 'active', 
  source: 'inbuilt', 
  description: 'Developer suite for agent simulation and testing' 
};

export const governanceToolkitModule: Extension = { 
  id: 't7', 
  name: 'Governance Toolkit', 
  category: 'module', 
  icon: Shield, 
  status: 'active', 
  source: 'inbuilt', 
  description: 'Microsoft-powered agent policy and identity engine' 
};

export const vibeForgeModule: Extension = { 
  id: 't8', 
  name: 'Vibe Forge', 
  category: 'module', 
  icon: Plus, 
  status: 'active', 
  source: 'inbuilt', 
  description: 'AI Code Staging & Development Environment' 
};

export const agentCliModule: Extension = { 
  id: 't9', 
  name: 'Agent CLI', 
  category: 'module', 
  icon: Terminal, 
  status: 'active', 
  source: 'inbuilt', 
  description: 'Real-time system execution and command logs' 
};

export const sentinelGuardianModule: Extension = { 
  id: 't10', 
  name: 'Sentinel Guardian', 
  category: 'module', 
  icon: Shield, 
  status: 'active', 
  source: 'inbuilt', 
  description: 'Antivirus and threat detection for the MAOS Office' 
};

export const sovereignCreativeStudioModule: Extension = { 
  id: 't11', 
  name: 'Sovereign Creative Studio', 
  category: 'module', 
  icon: Palette, 
  status: 'active', 
  source: 'inbuilt', 
  description: 'Visual canvas for multi-step creative workflows and orchestration' 
};

export const viabhronNexusModule: Extension = {
  id: 't12',
  name: 'Viabhron Nexus',
  category: 'module',
  icon: Library,
  status: 'inactive',
  source: 'inbuilt',
  description: 'Private Library Substrate for AI narrative synthesis and data trading'
};
