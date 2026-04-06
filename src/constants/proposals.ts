import { RatificationProposal } from '../types';

export const INITIAL_PROPOSALS: RatificationProposal[] = [
  {
    id: 'prop-treasury-module',
    title: 'Activate Treasury Module',
    description: 'Enables real-time cost tracking and token budget allocation across all agents.',
    type: 'infrastructure',
    impact: {
      tokenCost: '+5% reasoning overhead',
      computeCost: '+50MB RAM',
      benefit: 'Prevents runaway agent costs and optimizes token usage.'
    },
    status: 'pending',
    shadowModeAvailable: true,
    createdAt: new Date()
  },
  {
    id: 'prop-judicial-oversight',
    title: 'Establish Judicial Oversight',
    description: 'Activates the Guardian as a constitutional auditor to ensure all agent actions are Charter-compliant.',
    type: 'governance',
    impact: {
      tokenCost: '+15% reasoning overhead',
      computeCost: '+100MB RAM',
      benefit: 'Reduces hallucination-driven security risks by 40%.'
    },
    status: 'pending',
    shadowModeAvailable: true,
    sunsetClause: {
      reviewIntervalDays: 30
    },
    createdAt: new Date()
  },
  {
    id: 'prop-intelligence-division',
    title: 'Hatch Intelligence Division',
    description: 'Formalizes the Librarian and Global Pulse into a dedicated recon unit for OSINT.',
    type: 'department',
    impact: {
      tokenCost: '+10% reasoning overhead',
      computeCost: '+200MB RAM',
      benefit: 'Provides the Chairman with a Daily Intelligence Briefing on AI ecosystem changes.'
    },
    status: 'pending',
    shadowModeAvailable: false,
    createdAt: new Date()
  }
];
