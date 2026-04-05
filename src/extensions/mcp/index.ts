import { Database, Cpu, BookOpen } from 'lucide-react';
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
