import { Database, Cpu, BookOpen, Layout, Box } from 'lucide-react';
import { Extension } from '../../types';

export const localDatabaseMcp: Extension = { 
  id: 'm1', 
  name: 'Local Database', 
  category: 'mcp', 
  icon: Database, 
  status: 'active', 
  source: 'inbuilt', 
  description: 'SQLite MCP Server' 
};

export const systemMetricsMcp: Extension = { 
  id: 'm2', 
  name: 'System Metrics', 
  category: 'mcp', 
  icon: Cpu, 
  status: 'active', 
  source: 'inbuilt', 
  description: 'Host performance monitoring' 
};

export const geminiApiDocsMcp: Extension = { 
  id: 'm3', 
  name: 'Gemini API Docs', 
  category: 'mcp', 
  icon: BookOpen, 
  status: 'active', 
  source: 'inbuilt', 
  description: 'Real-time access to Gemini API documentation' 
};

export const googleWorkspaceMcp: Extension = { 
  id: 'm4', 
  name: 'Google Workspace', 
  category: 'mcp', 
  icon: Layout, 
  status: 'active', 
  source: 'inbuilt', 
  description: 'Read, write, and manage data across Google Workspace apps' 
};

export const openClawProtocol: Extension = { 
  id: 'm5', 
  name: 'OpenClaw Protocol', 
  category: 'mcp', 
  icon: Box, 
  status: 'active', 
  source: 'inbuilt', 
  description: 'Self-hosted agent framework for private execution' 
};
