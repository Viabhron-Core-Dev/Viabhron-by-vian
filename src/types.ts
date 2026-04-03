import { LucideIcon } from "lucide-react";

export type ExtensionCategory = 'connector' | 'skill' | 'tool' | 'mcp' | 'module';

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

export type TabType = 'chat' | 'settings' | 'discovery' | 'canvas' | 'store' | 'agents';

export type AIProvider = 'gemini' | 'openai' | 'anthropic' | 'groq';

export interface Agent {
  id: string;
  name: string;
  description: string;
  provider: AIProvider;
  model: string;
  apiKey: string; // Added apiKey field
  systemInstruction: string;
  activeExtensionIds: string[];
  avatar?: string;
  color: string;
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
