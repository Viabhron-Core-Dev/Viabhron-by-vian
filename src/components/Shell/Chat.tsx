import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Paperclip, 
  Terminal, 
  Bot, 
  User, 
  Sparkles, 
  Cpu, 
  Box, 
  Shield, 
  Activity,
  ChevronRight,
  ChevronLeft,
  Puzzle,
  Zap,
  Wrench,
  Network,
  Mic,
  Database,
  X,
  Brain,
  History
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Message, Extension, Agent } from '../../types';
import { db } from '../../lib/firebase';
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  query, 
  orderBy, 
  serverTimestamp,
  doc,
  getDoc
} from 'firebase/firestore';
import { AIService } from '../../lib/aiService';

interface ChatProps {
  tabId: string;
  userId?: string;
  agentId?: string;
  availableExtensions: Extension[];
  activeExtensionIds: string[];
  onUpdateExtensions: (ids: string[]) => void;
}

export const Chat: React.FC<ChatProps> = ({ 
  tabId, 
  userId, 
  agentId,
  availableExtensions, 
  activeExtensionIds,
  onUpdateExtensions 
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isSandboxPanelOpen, setIsSandboxPanelOpen] = useState(true);
  const [agent, setAgent] = useState<Agent | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!userId || !agentId) return;
    const agentRef = doc(db, 'users', userId, 'agents', agentId);
    getDoc(agentRef).then(snap => {
      if (snap.exists()) setAgent(snap.data() as Agent);
    });
  }, [userId, agentId]);

  const activeExtensions = availableExtensions.filter(e => activeExtensionIds.includes(e.id));

  const toggleExtension = (id: string) => {
    if (activeExtensionIds.includes(id)) {
      onUpdateExtensions(activeExtensionIds.filter(extId => extId !== id));
    } else {
      onUpdateExtensions([...activeExtensionIds, id]);
    }
  };

  useEffect(() => {
    if (!userId) {
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: "I'm your AI Computer. Please sign in to save your sessions and connect your Google Cloud.",
          timestamp: new Date()
        }
      ]);
      return;
    }

    const messagesRef = collection(db, 'users', userId, 'tabs', tabId, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
        timestamp: doc.data().timestamp?.toDate() || new Date()
      } as Message));
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, [userId, tabId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    
    const content = input;
    setInput('');

    if (!userId) {
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
      return;
    }

    const messagesRef = collection(db, 'users', userId, 'tabs', tabId, 'messages');
    try {
      await addDoc(messagesRef, {
        role: 'user',
        content,
        timestamp: serverTimestamp()
      });

      setIsTyping(true);

      // Get API Key for the agent's provider
      const keysRef = doc(db, 'users', userId, 'settings', 'api_keys');
      const keysSnap = await getDoc(keysRef);
      const keys = keysSnap.data() || {};
      const provider = agent?.provider || 'gemini';
      const apiKey = keys[provider];

      if (!apiKey && provider === 'gemini') {
        // Fallback to environment key for Gemini if user hasn't provided one
        const response = await AIService.generateResponse({
          apiKey: process.env.GEMINI_API_KEY || '',
          agent: agent || {
            id: 'default',
            name: 'Viabhron Assistant',
            provider: 'gemini',
            model: 'gemini-3-flash-preview',
            systemInstruction: 'You are a helpful assistant.',
            activeExtensionIds: [],
            color: '#3b82f6'
          },
          history: [...messages, { id: 'temp', role: 'user', content, timestamp: new Date() }]
        });

        await addDoc(messagesRef, {
          role: 'assistant',
          content: response,
          timestamp: serverTimestamp()
        });
      } else if (!apiKey) {
        await addDoc(messagesRef, {
          role: 'assistant',
          content: `Please provide an API key for ${provider.toUpperCase()} in System Settings to use this agent.`,
          timestamp: serverTimestamp()
        });
      } else {
        const response = await AIService.generateResponse({
          apiKey,
          agent: agent!,
          history: [...messages, { id: 'temp', role: 'user', content, timestamp: new Date() }]
        });

        await addDoc(messagesRef, {
          role: 'assistant',
          content: response,
          timestamp: serverTimestamp()
        });
      }
    } catch (error) {
      console.error("Failed to send message", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex h-full bg-gray-950 text-gray-100 overflow-hidden relative">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Chat Messages */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 md:px-8 py-12 space-y-12 no-scrollbar"
        >
          {messages.length === 0 ? (
            <div className="max-w-3xl mx-auto h-full flex flex-col items-start justify-center space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <h1 className="text-4xl md:text-6xl font-medium bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight leading-tight">
                  Hello, how can I help you?
                </h1>
                <p className="text-gray-500 text-xl font-light">I'm your Viabhron AI assistant, ready to build and explore with you.</p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {[
                  { icon: Zap, label: "Create a visual workflow", sub: "Design complex logic visually" },
                  { icon: Database, label: "Explore my cloud", sub: "Connect and manage your infrastructure" },
                  { icon: Puzzle, label: "Install new skills", sub: "Expand my capabilities" },
                  { icon: Bot, label: "Analyze this project", sub: "Get insights and suggestions" }
                ].map((item, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i }}
                    className="p-5 bg-gray-900/30 border border-white/5 rounded-3xl hover:bg-white/5 hover:border-white/10 transition-all text-left group"
                  >
                    <item.icon className="w-6 h-6 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
                    <div className="text-sm font-bold text-gray-200 mb-1">{item.label}</div>
                    <div className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">{item.sub}</div>
                  </motion.button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-12">
              <AnimatePresence mode="popLayout">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-6 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1
                      ${msg.role === 'assistant' ? 'bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg shadow-blue-500/20' : 'bg-gray-800'}
                    `}>
                      {msg.role === 'assistant' ? <Bot className="w-5 h-5 text-white" /> : <User className="w-5 h-5 text-gray-400" />}
                    </div>
                    <div className={`
                      flex-1 space-y-2
                      ${msg.role === 'user' ? 'text-right' : 'text-left'}
                    `}>
                      <div className={`
                        text-sm leading-relaxed inline-block
                        ${msg.role === 'user' 
                          ? 'bg-gray-900 px-5 py-3.5 rounded-3xl border border-white/5 text-gray-200' 
                          : 'text-gray-200'}
                      `}>
                        {msg.content}
                      </div>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-6"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center animate-pulse">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex items-center gap-1 px-4 py-2 bg-gray-900 rounded-2xl border border-white/5">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-8 pb-32 md:pb-12 bg-gradient-to-t from-gray-950 via-gray-950 to-transparent z-20">
          <div className="max-w-3xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-[32px] blur opacity-0 group-focus-within:opacity-100 transition-opacity" />
            <div className="relative bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-[32px] overflow-hidden shadow-2xl">
              <div className="flex items-end gap-2 p-2">
                <div className="flex-1 min-h-[48px] flex items-center px-4">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Ask anything..."
                    className="w-full bg-transparent border-none focus:ring-0 text-sm text-gray-200 placeholder-gray-500 resize-none py-3 max-h-32 no-scrollbar"
                    rows={1}
                  />
                </div>
                
                <div className="flex items-center gap-1 p-1">
                  <button className="p-2.5 text-gray-500 hover:text-white hover:bg-white/5 rounded-full transition-all">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <button className="p-2.5 text-gray-500 hover:text-white hover:bg-white/5 rounded-full transition-all">
                    <Mic className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className={`
                      p-3 rounded-full transition-all
                      ${input.trim() ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-gray-600 bg-white/5'}
                    `}
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                  {agent?.name || 'Viabhron Assistant'} ({agent?.provider || 'Gemini'})
                </span>
              </div>
              <div className="w-px h-3 bg-white/10" />
              <div className="flex items-center gap-2">
                <History className="w-3 h-3 text-blue-400" />
                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                  Memory: {messages.length} Turns
                </span>
              </div>
              <div className="w-px h-3 bg-white/10" />
              <div className="flex items-center gap-2">
                <Terminal className="w-3 h-3 text-gray-600" />
                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Sandbox Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sandbox Context Panel */}
      <motion.div 
        initial={false}
        animate={{ width: isSandboxPanelOpen ? 280 : 0 }}
        className="bg-gray-900 border-l border-white/10 flex flex-col relative overflow-hidden"
      >
        <button 
          onClick={() => setIsSandboxPanelOpen(!isSandboxPanelOpen)}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 p-1 bg-gray-900 border border-white/10 rounded-full text-gray-500 hover:text-white z-20"
        >
          {isSandboxPanelOpen ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>

        <div className="w-[280px] flex flex-col h-full">
          <div className="p-4 border-b border-white/10 bg-gray-900/50">
            <div className="flex items-center gap-2 mb-1">
              <Box className="w-4 h-4 text-blue-500" />
              <h2 className="text-xs font-bold uppercase tracking-widest text-white">Sandbox Context</h2>
            </div>
            <p className="text-[10px] text-gray-500">Isolated environment for this session.</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar">
            {/* Status Metrics */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                <span>Environment</span>
                <Activity className="w-3 h-3" />
              </div>
              <div className="space-y-2">
                <div className="bg-gray-950/50 border border-white/5 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-gray-400">Sandbox ID</span>
                    <span className="text-[10px] font-mono text-blue-400">{tabId.slice(-8)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400">Security Level</span>
                    <div className="flex items-center gap-1 text-green-500">
                      <Shield className="w-3 h-3" />
                      <span className="text-[10px] font-bold">Hardened</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tool Management */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                <span>Active Tools</span>
                <Puzzle className="w-3 h-3" />
              </div>
              <div className="space-y-1.5">
                {availableExtensions.map((ext) => (
                  <button
                    key={ext.id}
                    onClick={() => toggleExtension(ext.id)}
                    className={`
                      w-full flex items-center gap-3 p-2 rounded-lg border transition-all text-left
                      ${activeExtensionIds.includes(ext.id) 
                        ? 'bg-blue-600/10 border-blue-500/30 text-white' 
                        : 'bg-gray-950/30 border-white/5 text-gray-500 hover:border-white/10'}
                    `}
                  >
                    <ext.icon className={`w-3.5 h-3.5 ${activeExtensionIds.includes(ext.id) ? 'text-blue-400' : ''}`} />
                    <span className="text-xs font-medium flex-1 truncate">{ext.name}</span>
                    {activeExtensionIds.includes(ext.id) && (
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Context Footer */}
          <div className="p-4 border-t border-white/10 bg-gray-900/50">
            <div className="flex items-center gap-2 text-gray-500">
              <Cpu className="w-3 h-3" />
              <span className="text-[10px] font-medium">Memory: 128MB / 512MB</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
