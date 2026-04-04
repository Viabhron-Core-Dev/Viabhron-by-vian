import { 
  Github, 
  Mail, 
  Slack, 
  Search, 
  Layout, 
  Globe, 
  BookOpen, 
  Terminal, 
  Database, 
  Cpu,
  FileText,
  Activity,
  Bug,
  Shield,
  Plus,
  Code,
  Share2
} from 'lucide-react';
import { Extension } from '../types';

export const INITIAL_EXTENSIONS: Extension[] = [
  // Connectors
  { id: 'gh', name: 'GitHub', category: 'connector', icon: Github, status: 'active', source: 'inbuilt', description: 'Vibe-Forge CDE & Repo Access' },
  { id: 'gm', name: 'Gmail', category: 'connector', icon: Mail, status: 'inactive', source: 'inbuilt', description: 'Email automation' },
  { id: 'sl', name: 'Slack', category: 'connector', icon: Slack, status: 'inactive', source: 'inbuilt', description: 'Team alerts' },
  
  // Skills
  { id: 's1', name: 'Global Pulse', category: 'skill', icon: Globe, status: 'active', source: 'inbuilt', description: 'Political & Geopolitical analysis engine' },
  { id: 's2', name: 'Doc Forge', category: 'skill', icon: FileText, status: 'active', source: 'inbuilt', description: 'PDF/EPUB generation' },
  { id: 's3', name: 'Artifact Sandbox', category: 'skill', icon: Layout, status: 'active', source: 'inbuilt', description: 'Live code execution' },
  { id: 's4', name: 'Code Hunter', category: 'skill', icon: Code, status: 'active', source: 'inbuilt', description: 'Deep search for GitHub repos & libraries' },
  { id: 's5', name: 'Social Sentinel', category: 'skill', icon: Share2, status: 'active', source: 'inbuilt', description: 'Real-time social media trend monitoring' },
  
  // Tools
  { id: 't1', name: 'Headless Browser', category: 'tool', icon: Globe, status: 'active', source: 'inbuilt', description: 'Server-side web automation' },
  { id: 't2', name: 'PDF Extractor', category: 'tool', icon: BookOpen, status: 'active', source: 'inbuilt', description: 'Client-side text extraction' },
  { id: 't3', name: 'Code Parser', category: 'tool', icon: Terminal, status: 'active', source: 'inbuilt', description: 'Extract code from chat' },

  // MCP Servers
  { id: 'm1', name: 'Local Database', category: 'mcp', icon: Database, status: 'active', source: 'inbuilt', description: 'SQLite MCP Server' },
  { id: 'm2', name: 'System Metrics', category: 'mcp', icon: Cpu, status: 'active', source: 'inbuilt', description: 'Host performance monitoring' },
  { id: 'm3', name: 'Gemini API Docs', category: 'mcp', icon: BookOpen, status: 'active', source: 'inbuilt', description: 'Real-time access to Gemini API documentation' },
  { id: 't4', name: 'Agent Terminal', category: 'module', icon: Terminal, status: 'active', source: 'inbuilt', description: 'Real-time log and command output for AI agents' },
  { id: 't5', name: 'System Metrics', category: 'module', icon: Activity, status: 'active', source: 'inbuilt', description: 'Real-time performance and resource monitoring' },
  { id: 't6', name: 'Simulation Engine', category: 'module', icon: Bug, status: 'active', source: 'inbuilt', description: 'Developer suite for agent simulation and testing' },
  { id: 't7', name: 'Governance Toolkit', category: 'module', icon: Shield, status: 'active', source: 'inbuilt', description: 'Microsoft-powered agent policy and identity engine' },
  { id: 't8', name: 'Vibe Forge', category: 'module', icon: Plus, status: 'active', source: 'inbuilt', description: 'AI Code Staging & Development Environment' },
  { id: 't9', name: 'Agent CLI', category: 'module', icon: Terminal, status: 'active', source: 'inbuilt', description: 'Real-time system execution and command logs' },
  { id: 't10', name: 'Sentinel Guardian', category: 'module', icon: Shield, status: 'active', source: 'inbuilt', description: 'Antivirus and threat detection for the MAOS Office' },
];
