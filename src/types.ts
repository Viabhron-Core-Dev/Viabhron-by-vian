import { LucideIcon } from "lucide-react";

export type ExtensionCategory = 'connector' | 'skill' | 'tool' | 'mcp' | 'module';

export type AgentRole = 'head' | 'major' | 'sub' | 'minor' | 'contractor';

export interface Extension {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  category: ExtensionCategory;
  status: 'active' | 'inactive' | 'error';
  source: 'inbuilt' | 'external';
  url?: string;
  config?: any;
}

export type TabType = 'chat' | 'settings' | 'discovery' | 'canvas' | 'store' | 'agents' | 'artifacts' | 'metrics' | 'simulation' | 'governance' | 'forge' | 'agent_cli' | 'sentinel';

export type AIProvider = 'gemini' | 'openai' | 'anthropic' | 'groq' | 'local';

export interface Agent {
  id: string;
  name: string;
  description: string;
  role: AgentRole;
  provider: AIProvider;
  model: string;
  apiKey?: string; // Optional for Head Agent (Least Privilege)
  systemInstruction: string;
  activeExtensionIds: string[];
  avatar?: string;
  color: string;
  parentId?: string; // For hierarchy (Sub/Minor agents)
}

export interface UIConfig {
  theme: 'dark' | 'light' | 'custom';
  layout: 'default' | 'focus' | 'split' | 'canvas-first';
  sidebarVisible: boolean;
  activeTabId: string;
  accentColor: string;
}

export interface Tab {
  id: string;
  title: string;
  type: TabType;
  active: boolean;
  status: 'active' | 'shelved' | 'archived';
  agentId?: string; // Link tab to a specific agent
  activeExtensionIds?: string[];
  canvasData?: {
    nodes: CanvasNode[];
    edges: CanvasEdge[];
  };
  metadata?: {
    icon?: string;
    vibe?: string;
    lastAccessed?: Date;
  };
}

export interface CanvasNode {
  id: string;
  type: 'ai_text' | 'ai_image' | 'github' | 'ui_header' | 'ui_sidebar' | 'ui_content' | 'input' | 'output';
  position: { x: number; y: number };
  data: any;
  status: 'idle' | 'running' | 'completed' | 'error';
}

export interface CanvasEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle: string;
  targetHandle: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  toolCalls?: {
    name: string;
    args: any;
    status: 'running' | 'complete' | 'error';
  }[];
}

export interface Memory {
  id: string;
  type: 'preference' | 'fact' | 'style' | 'goal' | 'resonance';
  content: string;
  strength: number; // 1-10
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface VaultPointer {
  id: string;
  path: string; // Original path in MAOS
  gdriveId: string; // ID in Google Drive
  encryptionHash: string; // For integrity check
  size: number; // Original size
  compressedSize: number; // Size on GDrive
  compressed: boolean;
  algorithm: 'gzip' | 'brotli' | 'none';
  timestamp: Date;
}

export interface AgentLog {
  id: string;
  type: 'command' | 'output' | 'error' | 'system' | 'thought';
  content: string;
  timestamp: Date;
  agentId?: string;
  tabId?: string;
}
