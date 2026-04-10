import { Github, Mail, Slack, Database, Share2, ListTodo } from 'lucide-react';
import { Extension } from '../../src/types';

export const githubConnector: Extension = { 
  id: 'gh', 
  name: 'GitHub', 
  category: 'connector', 
  icon: Github, 
  status: 'active', 
  source: 'inbuilt', 
  description: 'Vibe-Forge CDE & Repo Access' 
};

export const linearConnector: Extension = {
  id: 'linear',
  name: 'Linear',
  category: 'connector',
  icon: ListTodo,
  status: 'inactive',
  source: 'external',
  description: 'Project Management & Ticket Sync for Symphony Orchestration.'
};

export const cqConnector: Extension = {
  id: 'cq',
  name: 'Collective Intelligence (cq)',
  category: 'connector',
  icon: Share2,
  status: 'inactive',
  source: 'external',
  description: 'Mozilla.ai knowledge-sharing system for AI agents.'
};

export const huggingFaceConnector: Extension = { 
  id: 'hf', 
  name: 'Hugging Face', 
  category: 'connector', 
  icon: Database, 
  status: 'active', 
  source: 'inbuilt', 
  description: 'Open Intelligence Hub: Models, Datasets & Spaces' 
};

export const gmailConnector: Extension = { 
  id: 'gm', 
  name: 'Gmail', 
  category: 'connector', 
  icon: Mail, 
  status: 'inactive', 
  source: 'inbuilt', 
  description: 'Email automation' 
};

export const slackConnector: Extension = { 
  id: 'sl', 
  name: 'Slack', 
  category: 'connector', 
  icon: Slack, 
  status: 'inactive', 
  source: 'inbuilt', 
  description: 'Team alerts' 
};

export const symphonyModule: Extension = {
  id: 'symphony',
  name: 'Symphony Orchestrator',
  category: 'module',
  icon: Share2,
  status: 'inactive',
  source: 'external',
  description: 'Autonomous AI-driven implementation runs based on Linear tickets.'
};
