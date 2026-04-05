import { Globe, BookOpen, Terminal } from 'lucide-react';
import { Extension } from '../../types';

export const headlessBrowserTool: Extension = { 
  id: 't1', 
  name: 'Headless Browser', 
  category: 'tool', 
  icon: Globe, 
  status: 'active', 
  source: 'inbuilt', 
  description: 'Server-side web automation' 
};

export const pdfExtractorTool: Extension = { 
  id: 't2', 
  name: 'PDF Extractor', 
  category: 'tool', 
  icon: BookOpen, 
  status: 'active', 
  source: 'inbuilt', 
  description: 'Client-side text extraction' 
};

export const codeParserTool: Extension = { 
  id: 't3', 
  name: 'Code Parser', 
  category: 'tool', 
  icon: Terminal, 
  status: 'active', 
  source: 'inbuilt', 
  description: 'Extract code from chat' 
};
