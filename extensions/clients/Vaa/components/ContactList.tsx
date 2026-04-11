import React from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Shield, 
  Brain, 
  Cpu, 
  Search,
  ArrowLeft,
  Star,
  MoreVertical
} from 'lucide-react';
import { Agent } from '../../../../src/types';

interface ContactListProps {
  agents: Agent[];
  onSelect: (agent: Agent) => void;
  onBack: () => void;
}

export const ContactList: React.FC<ContactListProps> = ({ agents, onSelect, onBack }) => {
  const staffAgents = agents.filter(a => a.isStaff);
  const otherAgents = agents.filter(a => !a.isStaff);

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="bg-wa-header text-white p-5 flex items-center gap-4 shadow-lg">
        <button onClick={onBack}>
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold tracking-tight">Select Contact</h2>
        <div className="ml-auto flex items-center gap-4">
          <Search className="w-5 h-5 opacity-80" />
          <MoreVertical className="w-5 h-5 opacity-80" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="p-4 space-y-6">
          {/* Staff Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 px-2">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sovereign Staff</span>
            </div>
            <div className="space-y-1">
              {staffAgents.map(agent => (
                <button
                  key={agent.id}
                  onClick={() => onSelect(agent)}
                  className="w-full flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors text-left"
                >
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md"
                    style={{ backgroundColor: agent.color }}
                  >
                    {agent.role === 'head' ? <Shield size={24} /> : <Brain size={24} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-slate-800 truncate">{agent.name}</div>
                    <div className="text-xs text-slate-500 truncate">{agent.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Other Agents Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 px-2">
              <User className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Accredited Consultants</span>
            </div>
            <div className="space-y-1">
              {otherAgents.map(agent => (
                <button
                  key={agent.id}
                  onClick={() => onSelect(agent)}
                  className="w-full flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors text-left"
                >
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-sm"
                    style={{ backgroundColor: agent.color }}
                  >
                    <Cpu size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-slate-800 truncate">{agent.name}</div>
                    <div className="text-xs text-slate-500 truncate">{agent.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
