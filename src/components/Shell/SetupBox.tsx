import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Key, 
  Brain, 
  Cloud, 
  CheckCircle2, 
  ArrowRight,
  Cpu,
  Lock,
  Zap,
  Server
} from 'lucide-react';

interface SetupBoxProps {
  onComplete: (config: any) => void;
}

export const SetupBox: React.FC<SetupBoxProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'welcome' | 'auth' | 'intent' | 'brain' | 'ignition'>('welcome');
  const [geminiKey, setGeminiKey] = useState('');
  const [officeName, setOfficeName] = useState('');
  const [focus, setFocus] = useState('General Management');
  const [brainType, setBrainType] = useState('gemma-2b');
  const [isProvisioning, setIsProvisioning] = useState(false);

  const handleIgnition = async () => {
    setIsProvisioning(true);
    // Simulate the "Hatching" process
    setTimeout(() => {
      const config = {
        officeName,
        focus,
        brainType,
        geminiKey,
        provisionedAt: new Date().toISOString()
      };
      onComplete(config);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl">
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 shadow-2xl">
        <div className="relative h-2 bg-zinc-800">
          <motion.div 
            className="absolute inset-y-0 left-0 bg-blue-500"
            initial={{ width: '0%' }}
            animate={{ 
              width: 
                step === 'welcome' ? '20%' : 
                step === 'auth' ? '40%' : 
                step === 'intent' ? '60%' : 
                step === 'brain' ? '80%' : '100%' 
            }}
          />
        </div>

        <div className="p-12">
          <AnimatePresence mode="wait">
            {step === 'welcome' && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8 text-center"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
                  <Shield size={40} />
                </div>
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tight text-white">Welcome to Viabhron</h1>
                  <p className="text-zinc-400">I am your Resident AI. I see you don't have a private office yet. Shall we build one in your Google Cloud?</p>
                </div>
                <button
                  onClick={() => setStep('auth')}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-black transition-all hover:bg-zinc-200"
                >
                  Begin Setup
                  <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            )}

            {step === 'auth' && (
              <motion.div
                key="auth"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-white">The Fuel</h2>
                  <p className="text-zinc-400">To power your agents, I need a Gemini API Key. This allows your office to "think".</p>
                </div>
                
                <div className="space-y-4">
                  <div className="relative">
                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                    <input
                      type="password"
                      placeholder="Paste your Gemini API Key"
                      value={geminiKey}
                      onChange={(e) => setGeminiKey(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-zinc-950 py-4 pl-12 pr-4 text-white placeholder:text-zinc-600 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <a 
                    href="https://aistudio.google.com/app/apikey" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block text-sm text-blue-400 hover:text-blue-300"
                  >
                    Get a free API Key from Google AI Studio →
                  </a>
                </div>

                <button
                  disabled={!geminiKey}
                  onClick={() => setStep('intent')}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition-all hover:bg-blue-500 disabled:opacity-50"
                >
                  Next: Intent Mapping
                </button>
              </motion.div>
            )}

            {step === 'intent' && (
              <motion.div
                key="intent"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-white">Intent Mapping</h2>
                  <p className="text-zinc-400">Tell me about your Sovereign Office. This helps me furnish your workspace.</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-500 uppercase tracking-wider">Office Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Lewis Global"
                      value={officeName}
                      onChange={(e) => setOfficeName(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-zinc-950 p-4 text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-500 uppercase tracking-wider">Primary Focus</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Coding', 'Creative', 'Research', 'Management'].map((f) => (
                        <button
                          key={f}
                          onClick={() => setFocus(f)}
                          className={`rounded-xl border p-4 text-left transition-all ${
                            focus === f 
                              ? 'border-blue-500 bg-blue-500/10 text-white' 
                              : 'border-white/10 bg-zinc-950 text-zinc-400 hover:border-white/20'
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  disabled={!officeName}
                  onClick={() => setStep('brain')}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition-all hover:bg-blue-500 disabled:opacity-50"
                >
                  Next: Choose Sovereign Brain
                </button>
              </motion.div>
            )}

            {step === 'brain' && (
              <motion.div
                key="brain"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-white">The Sovereign Anchor</h2>
                  <p className="text-zinc-400">Choose the Tiny LLM that will act as your Cloud Manager. This is your "Sovereign Brain" that stays in your cloud and never talks to a company.</p>
                </div>

                <div className="space-y-4">
                  {[
                    { id: 'm2.7', name: 'MiniMax M2.7', desc: 'Self-Evolving Specialist (Open-Weights)', icon: <Zap size={20} /> },
                    { id: 'gemma-2b', name: 'Gemma', desc: 'Safety-First Logician (Google Open-Weights)', icon: <Shield size={20} /> },
                    { id: 'llama-3', name: 'Llama', desc: 'Versatile Generalist (Meta Open-Weights)', icon: <Brain size={20} /> },
                    { id: 'qwen-2', name: 'Qwen', desc: 'Technical Specialist (Alibaba Open-Weights)', icon: <Cpu size={20} /> }
                  ].map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setBrainType(b.id)}
                      className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all ${
                        brainType === b.id 
                          ? 'border-blue-500 bg-blue-500/10 text-white' 
                          : 'border-white/10 bg-zinc-950 text-zinc-400 hover:border-white/20'
                      }`}
                    >
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${brainType === b.id ? 'bg-blue-500 text-white' : 'bg-zinc-800 text-zinc-500'}`}>
                        {b.icon}
                      </div>
                      <div>
                        <div className="font-bold">{b.name}</div>
                        <div className="text-xs text-zinc-500">{b.desc}</div>
                      </div>
                      {brainType === b.id && <CheckCircle2 className="ml-auto text-blue-500" size={20} />}
                    </button>
                  ))}
                </div>

                <div className="rounded-xl bg-blue-500/5 border border-blue-500/10 p-4 text-xs text-blue-400">
                  <p><strong>Manager-Contractor Model:</strong> This brain will be the only one with access to your files. It can "hire" powerful external AIs (Contractors) for heavy lifting using your API key, but it keeps your identity private.</p>
                </div>

                <button
                  onClick={() => setStep('ignition')}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition-all hover:bg-blue-500"
                >
                  Next: Ignition
                </button>
              </motion.div>
            )}

            {step === 'ignition' && (
              <motion.div
                key="ignition"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8 text-center"
              >
                {!isProvisioning ? (
                  <>
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500">
                      <Zap size={40} />
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-3xl font-bold text-white">Ready for Ignition</h2>
                      <p className="text-zinc-400">I have everything I need. I am now ready to hatch your private office in the cloud.</p>
                    </div>
                    <div className="rounded-xl bg-zinc-950 p-6 text-left text-sm text-zinc-500">
                      <div className="flex items-center gap-2 mb-2">
                        <Server size={14} />
                        <span className="font-mono uppercase">Provisioning Manifest</span>
                      </div>
                      <ul className="space-y-1 font-mono">
                        <li>• Substrate: Google Cloud Run</li>
                        <li>• Database: Firebase Firestore</li>
                        <li>• Vault: Google Drive</li>
                        <li>• Brain: {brainType.toUpperCase()}</li>
                      </ul>
                    </div>
                    <button
                      onClick={handleIgnition}
                      className="group flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-8 py-4 font-semibold text-black transition-all hover:bg-orange-400"
                    >
                      Ignite Sovereign Office
                      <Zap size={20} className="fill-current" />
                    </button>
                  </>
                ) : (
                  <div className="space-y-8 py-12">
                    <div className="relative mx-auto h-24 w-24">
                      <motion.div 
                        className="absolute inset-0 rounded-full border-4 border-blue-500/20"
                      />
                      <motion.div 
                        className="absolute inset-0 rounded-full border-4 border-t-blue-500"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-blue-500">
                        <Cloud size={32} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold text-white">Hatching Office...</h2>
                      <p className="text-zinc-400 italic">"Sprouting the Vine in your private cloud..."</p>
                    </div>
                    <div className="flex justify-center gap-2">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="h-1.5 w-1.5 rounded-full bg-blue-500"
                          animate={{ opacity: [0.2, 1, 0.2] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
