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
  FileText
} from 'lucide-react';
import { Extension } from '../types';

export const INITIAL_EXTENSIONS: Extension[] = [
  // Connectors
  { id: 'gh', name: 'GitHub', category: 'connector', icon: Github, status: 'active', source: 'inbuilt', description: 'Vibe-Forge CDE & Repo Access' },
  { id: 'gm', name: 'Gmail', category: 'connector', icon: Mail, status: 'inactive', source: 'inbuilt', description: 'Email automation' },
  { id: 'sl', name: 'Slack', category: 'connector', icon: Slack, status: 'inactive', source: 'inbuilt', description: 'Team alerts' },
  
  // Skills
  { id: 's1', name: 'Research Module', category: 'skill', icon: Search, status: 'active', source: 'inbuilt', description: 'Perplexity-powered research' },
  { id: 's2', name: 'Doc Forge', category: 'skill', icon: FileText, status: 'active', source: 'inbuilt', description: 'PDF/EPUB generation' },
  { id: 's3', name: 'Artifact Sandbox', category: 'skill', icon: Layout, status: 'active', source: 'inbuilt', description: 'Live code execution' },
  
  // Tools
  { id: 't1', name: 'Headless Browser', category: 'tool', icon: Globe, status: 'active', source: 'inbuilt', description: 'Server-side web automation' },
  { id: 't2', name: 'PDF Extractor', category: 'tool', icon: BookOpen, status: 'active', source: 'inbuilt', description: 'Client-side text extraction' },
  { id: 't3', name: 'Code Parser', category: 'tool', icon: Terminal, status: 'active', source: 'inbuilt', description: 'Extract code from chat' },

  // MCP Servers
  { id: 'm1', name: 'Local Database', category: 'mcp', icon: Database, status: 'active', source: 'inbuilt', description: 'SQLite MCP Server' },
  { id: 'm2', name: 'System Metrics', category: 'mcp', icon: Cpu, status: 'active', source: 'inbuilt', description: 'Host performance monitoring' },
  { id: 'm3', name: 'Gemini API Docs', category: 'mcp', icon: BookOpen, status: 'active', source: 'inbuilt', description: 'Real-time access to Gemini API documentation' },
];
