import { Github, Mail, Slack, Database } from 'lucide-react';
import { Extension } from '../../types';

export const githubConnector: Extension = { 
  id: 'gh', 
  name: 'GitHub', 
  category: 'connector', 
  icon: Github, 
  status: 'active', 
  source: 'inbuilt', 
  description: 'Vibe-Forge CDE & Repo Access' 
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
