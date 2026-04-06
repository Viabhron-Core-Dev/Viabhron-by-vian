import { Extension } from '../types';
import { githubConnector, linearConnector, cqConnector, huggingFaceConnector, gmailConnector, slackConnector, symphonyModule } from '../extensions/connectors';
import { globalPulseSkill, docForgeSkill, artifactSandboxSkill, codeHunterSkill, socialSentinelSkill, githubSecurityAuditorSkill, creativeDirectorSkill } from '../extensions/skills';
import { headlessBrowserTool, pdfExtractorTool, codeParserTool } from '../extensions/tools';
import { localDatabaseMcp, systemMetricsMcp, geminiApiDocsMcp, googleWorkspaceMcp, openClawProtocol } from '../extensions/mcp';
import { 
  agentTerminalModule, 
  systemMetricsModule, 
  simulationEngineModule, 
  governanceToolkitModule, 
  vibeForgeModule, 
  agentCliModule, 
  sentinelGuardianModule,
  sovereignCreativeStudioModule,
} from '../extensions/modules';

export const INITIAL_EXTENSIONS: Extension[] = [
  // Connectors
  githubConnector,
  linearConnector,
  cqConnector,
  huggingFaceConnector,
  gmailConnector,
  slackConnector,
  
  // Skills
  globalPulseSkill,
  docForgeSkill,
  artifactSandboxSkill,
  codeHunterSkill,
  socialSentinelSkill,
  githubSecurityAuditorSkill,
  creativeDirectorSkill,
  
  // Tools
  headlessBrowserTool,
  pdfExtractorTool,
  codeParserTool,

  // MCP Servers
  localDatabaseMcp,
  systemMetricsMcp,
  geminiApiDocsMcp,
  googleWorkspaceMcp,
  openClawProtocol,

  // Modules
  agentTerminalModule,
  systemMetricsModule,
  simulationEngineModule,
  governanceToolkitModule,
  vibeForgeModule,
  agentCliModule,
  sentinelGuardianModule,
  sovereignCreativeStudioModule,
  symphonyModule,
];
