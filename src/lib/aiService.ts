import { GoogleGenAI } from "@google/genai";
import { Agent, Message } from "../types";

export interface AIServiceConfig {
  apiKey: string;
  agent: Agent;
  history: Message[];
}

export type AIProvider = 'gemini' | 'openai' | 'anthropic' | 'groq';

export class AIService {
  static recognizeProvider(apiKey: string): AIProvider {
    if (apiKey.startsWith('sk-ant-')) return 'anthropic';
    if (apiKey.startsWith('sk-')) return 'openai';
    if (apiKey.startsWith('gsk_')) return 'groq';
    return 'gemini'; // Default to Gemini
  }

  static async generateResponse(config: AIServiceConfig): Promise<string> {
    const { agent } = config;
    const provider = this.recognizeProvider(agent.apiKey);
    
    switch (provider) {
      case 'gemini':
        return this.callGemini(config, agent.apiKey);
      case 'openai':
      case 'anthropic':
      case 'groq':
        return `[Multi-Agent] ${provider.toUpperCase()} integration coming soon. Currently using Gemini as fallback.`;
      default:
        throw new Error(`Unsupported provider: ${provider}`);
    }
  }

  private static async callGemini(config: AIServiceConfig, apiKey: string): Promise<string> {
    const ai = new GoogleGenAI({ apiKey: apiKey || process.env.GEMINI_API_KEY || '' });
    
    // Construct history for Gemini
    const contents = config.history.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    const response = await ai.models.generateContent({
      model: config.agent.model || 'gemini-3-flash-preview',
      contents,
      config: {
        systemInstruction: config.agent.systemInstruction,
      }
    });

    return response.text || "I'm sorry, I couldn't generate a response.";
  }
}
