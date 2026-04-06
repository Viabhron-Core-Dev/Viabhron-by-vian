import { LucideIcon } from "lucide-react";

export type ExtensionCategory = 'connector' | 'skill' | 'tool' | 'mcp' | 'module';

export type AgentRole = 'head' | 'executive' | 'contractor' | 'consultant' | 'specialized';

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

export type TabType = 'chat' | 'settings' | 'discovery' | 'canvas' | 'store' | 'agents' | 'artifacts' | 'metrics' | 'simulation' | 'governance' | 'forge' | 'agent_cli' | 'sentinel' | 'security' | 'efficiency' | 'hatchery' | 'sops' | 'proposals';

export type SystemMode = 'turbo' | 'eco' | 'stealth';

export interface SecurityRule {
  id: string;
  name: string;
  description: string;
  naturalLanguage: string;
  technicalBlock: string;
  active: boolean;
  type: 'security' | 'operational' | 'fiscal';
  urgencyLevel: 'standard' | 'critical';
  createdAt: Date;
}

export interface EfficiencyPatch {
  id: string;
  name: string;
  description: string;
  version: string;
  applied: boolean;
  metrics: {
    speedBoost: number;
    memorySaved: number;
    costReduction: number;
  };
}

export type AIProvider = 'gemini' | 'openai' | 'anthropic' | 'groq' | 'local' | 'resident';

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
  status: 'active' | 'inactive' | 'error';
  capabilities: string[];
  lastActive: Date;
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

export interface ExternalPlugin {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  config: Record<string, any>;
  type: string;
  status: 'active' | 'inactive' | 'error';
}

export interface BackgroundTask {
  id: string;
  name: string;
  status: 'running' | 'completed' | 'failed';
  progress: number;
  startTime: Date;
  endTime?: Date;
  type: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'security' | 'info' | 'warning' | 'error' | 'system';
  timestamp: Date;
  agentId?: string;
  taskId?: string;
  read: boolean;
  metadata?: Record<string, any>;
  action?: {
    type: 'confirmation' | 'review';
    label: string;
    onApprove: () => void;
    onReject: () => void;
    status?: 'pending' | 'approved' | 'rejected';
  };
}

export interface LogEntry {
  id: string;
  timestamp: Date;
  level: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'CRITICAL';
  source: string; // e.g., "Kernel", "Symphony-Agent", "UI-Shell"
  message: string;
  metadata?: Record<string, any>; // For AI parsing
  traceId?: string; // To link related events
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

export interface SOP {
  id: string;
  title: string;
  description: string;
  department: string;
  leadAgentId: string;
  supportAgentIds: string[];
  requiredExtensionIds: string[];
  manifest: string; // Sovereign-Script (SS)
  status: 'active' | 'draft' | 'archived';
  lastExecuted?: Date;
}

export interface RatificationProposal {
  id: string;
  title: string;
  description: string;
  type: 'department' | 'governance' | 'infrastructure';
  impact: {
    tokenCost: string;
    computeCost: string;
    benefit: string;
  };
  status: 'pending' | 'ratified' | 'shelved' | 'vetoed';
  shadowModeAvailable: boolean;
  sunsetClause?: {
    reviewIntervalDays: number;
  };
  createdAt: Date;
}
