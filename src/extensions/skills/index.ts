import { Globe, FileText, Layout, Code, Share2 } from 'lucide-react';
import { Extension } from '../../types';

export const globalPulseSkill: Extension = { 
  id: 's1', 
  name: 'Global Pulse', 
  category: 'skill', 
  icon: Globe, 
  status: 'active', 
  source: 'inbuilt', 
  description: 'Political & Geopolitical analysis engine' 
};

export const docForgeSkill: Extension = { 
  id: 's2', 
  name: 'Doc Forge', 
  category: 'skill', 
  icon: FileText, 
  status: 'active', 
  source: 'inbuilt', 
  description: 'PDF/EPUB generation' 
};

export const artifactSandboxSkill: Extension = { 
  id: 's3', 
  name: 'Artifact Sandbox', 
  category: 'skill', 
  icon: Layout, 
  status: 'active', 
  source: 'inbuilt', 
  description: 'Live code execution' 
};

export const codeHunterSkill: Extension = { 
  id: 's4', 
  name: 'Code Hunter', 
  category: 'skill', 
  icon: Code, 
  status: 'active', 
  source: 'inbuilt', 
  description: 'Deep search for GitHub repos & libraries' 
};

export const socialSentinelSkill: Extension = { 
  id: 's5', 
  name: 'Social Sentinel', 
  category: 'skill', 
  icon: Share2, 
  status: 'active', 
  source: 'inbuilt', 
  description: 'Real-time social media trend monitoring' 
};
