import React from 'react';
import { Plus, X, Layout } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Tab } from '../../types';

interface TabsProps {
  tabs: Tab[];
  onAddTab: () => void;
  onCloseTab: (id: string) => void;
  onSwitchTab: (id: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, onAddTab, onCloseTab, onSwitchTab }) => {
  return (
    <div className="flex items-center bg-gray-900/50 border-b border-white/10 px-2 h-10 select-none">
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar flex-1">
        <AnimatePresence mode="popLayout">
          {tabs.map((tab) => (
            <motion.div
              key={tab.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => onSwitchTab(tab.id)}
              className={`
                group relative flex items-center gap-2 px-3 py-1.5 min-w-[120px] max-w-[200px] 
                rounded-t-lg text-xs font-medium cursor-pointer transition-all duration-200
                ${tab.active 
                  ? 'bg-gray-800 text-white border-x border-t border-white/10' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'}
              `}
            >
              <Layout className="w-3 h-3 flex-shrink-0" />
              <span className="truncate flex-1">{tab.title}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseTab(tab.id);
                }}
                className="opacity-0 group-hover:opacity-100 hover:bg-white/10 rounded p-0.5 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
              {tab.active && (
                <motion.div 
                  layoutId="active-tab-indicator"
                  className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-blue-500"
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <button
        onClick={onAddTab}
        className="ml-2 p-1.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-md transition-all"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};
