# 🛡️ VIABHRON OS: Master Blueprint

**Product Vision:** A private, portable Multi-Agent Operating System (MAOS) that lives in the user's own cloud infrastructure. It is a **"Business-in-a-Box"**—a turnkey, sovereign corporate kernel that is easy to pitch, impossible to seize, and 100% private.

---

## 0. The Corporate Charter (The Prime Directive)
The Charter is the "Constitutional Layer" of the OS. It defines the **Evolutionary Purpose** and the **Antifragile Growth** mindset that prevents the system from becoming a rigid bureaucracy.

*   **Sovereignty First**: The OS exists to serve the Chairman's intent while maintaining absolute data privacy.
*   **Evolutionary Purpose**: The system is not a machine, but a living organism. Agents are encouraged to "sense" the environment and propose optimizations to the **SOP Registry**.
*   **Antifragile Growth**: The OS is designed to get stronger from stress. Every security violation or efficiency failure is a "Learning Event" that triggers a kernel patch.
*   **Intrapreneurship Protocol**: The **Forge** acts as an incubator where agents can experiment with new **Sovereign-Scripts** without disrupting production workflows.
*   **Chairman Oversight**: The OS is a **Constitutional Monarchy**. The agents manage the "Government" (The Business), but the **Chairman (The User)** holds the ultimate veto and vision.

---

## 1. The Virtual Computer (The Substrate)
The "Virtual Computer" is the total environment, turning cloud infrastructure into a functional, private office. It lives entirely in the cloud substrate (Firebase, Cloud Run, Drive).

### 1.1 The Skeleton (Hardened Task Sandboxing Engine)
The Skeleton provides the physical and logical isolation for all work in the OS.
*   **Physical Isolation (OpenSandbox)**: Every task/tab is an ephemeral, isolated Docker/K8s container. Malicious or "Dangerous" actions are contained within the sandbox.
*   **The "Tab" Illusion**: To the human user, these sandboxes appear as "Tabs." To the AI, they are independent execution cells.
*   **Real-time State Sync**: Powered by Firebase `onSnapshot` to keep the UI in sync with the cloud "Brain."

### 1.2 The Extension Manager (The Toolbox)
A structured registry that manages the capabilities and power levels of the OS.
*   **The Toolbox**: A collection of six distinct extension types:
    *   **Normal Skills**: General-purpose AI capabilities (e.g., Global Pulse, Summarization).
    *   **Recipe Skills**: Artisanal blueprints for specific, high-fidelity outputs (e.g., Doc Forge, Editorial PPT Maker).
    *   **Tools**: Lightweight utility functions (e.g., PDF Extractor, Web Search).
    *   **Connectors**: Secure bridges to external data/services (e.g., Gmail, Slack, Hugging Face).
    *   **MCP Servers**: Standardized data/tool integration layers.
        *   **Gemini Live Pulse**: Real-time access to Gemini API documentation to prevent stale training data hallucinations.
        *   **Google Workspace Bridge**: CLI-based management of Docs, Sheets, and Drive data.
    *   **Modules**: Large-scale UI/UX features or complex workflows (e.g., Agent Terminal, Workflow Canvas).
        *   **Sovereign Creative Studio**: A visual IDE for orchestrating multi-step creative workflows via a spatial canvas.
*   **Substrate Protocols**:
    *   **OpenClaw**: A self-hosted agent framework for private, sovereign execution.
    *   **Model Context Protocol (MCP)**: Native support for the industry-standard tool-to-agent communication layer.
*   **Universal AI Port**: Support for importing external capabilities (Claude Skills, MCP Servers, Hugging Face Models/Spaces) into the private substrate.
    *   **External Skills**: Default to "Artisanal Wrapper" (Head Agent prompt overlay) with optional "Raw Mode."
    *   **MCP Servers**: Default to "User-Brought" (External URL) with "Sovereign Bridge" (WebSocket/HTTPS proxying).
    *   **Hugging Face Hub**: Default source for open-source models, datasets, and Spaces. Supports both Public (no key) and Private (User Token) access.
    *   **Agent "Hatching" Protocol (Internal Staff)**: For agents with source code (GitHub/Source). Cloned into a Forge Sandbox, containerized on Cloud Run, and wrapped in a Sovereign prompt. 100% private.
    *   **Agent "Accreditation" Protocol (External Consultants)**: For cloud-hosted agents (OpenAI, Genspark, Mistral, Claude). Established via an **Ambassador Bridge** (API/OAuth). Reports via a **Secure Intercom** (Webhook Receiver).
    *   **External Intelligence Plugins (Consultants)**:
        *   **Codex Integration**: Integrates OpenAI's Codex via the `Codex-plugin-cc` model.
        *   **Consultant Role**: Codex acts as a Level 4 Consultant for adversarial reviews and correctness checks.
        *   **Rescue Sandbox Protocol**: If Codex detects a critical failure during a background review, the OS initiates a "Rescue Sandbox"—a dedicated, high-priority environment where Codex and the Coder Agent work to resolve the issue in isolation.
        *   **Plugin Configuration**: Managed via the **Agent Settings** (3-dots menu) in the Chat interface. Supports per-plugin API keys and security toggles (e.g., Review Gate).
*   **Policy Enforcement (Microsoft Governance)**: Runtime security policies that "Silent Block + Notify" actions violating the Chairman's rules.
*   **Authority**: Only the **User (The Chairman)** and the **Head Agent (The Cloud Manager)** have the keys to the Toolbox.
*   **Recipe Skills**: Artisanal blueprints that dictate the "Vibe," tone, and style of AI outputs.

### 1.3 The Agents (The Staff Hierarchy)
The "Active Intelligence" that performs work within the office, managed by a **Model-Agnostic Orchestration System (Claude Code Rewrite)**.

1.  **Level 1: The Resident (Head Agent)**
    *   **Status**: Permanent, "In-Office."
    *   **Brain**: Tiny LLM (Gemma/Phi).
    *   **Role**: The "Office Manager" who never leaves. Root Authority.
2.  **Level 2: Executive Staff (Special Agents)**
    *   **Status**: Permanent, "In-Office."
    *   **Brain**: Larger LLMs (Llama 3.1 70b, etc.).
    *   **Role**: For users who can afford more "Resident" power in their private cloud.
3.  **Level 3: Contractors (Sub-Agents)**
    *   **Status**: Temporary, "On-Call."
    *   **Brain**: API-based (Gemini, OpenAI, Anthropic).
    *   **Role**: Hired via API keys for specific, heavy-lifting tasks.
4.  **Level 4: Consultants (External Agents)**
    *   **Status**: Cross-Platform.
    *   **Brain**: Third-party (e.g., Cursor 3 agents, specialized external AI, imported Claude Skills).
    *   **Role**: Integrated into the office to bring in outside expertise, managed via the Universal AI Port.
5.  **Specialized Roles (Optional)**
    *   **The Librarian**: An optional agent dedicated to monitoring Hugging Face and GitHub for new "Eggs" (models, tools, datasets) that align with the Chairman's interests and project needs.
    *   **The Creative Director**: A specialized agent role for assembling and managing multi-step creative workflows on the Sovereign Creative Studio canvas.

### 1.4 Protected Divisions (The Machine Room)
The "Machine Room" contains the core infrastructure controls, isolated from agent interference.
*   **Security Division**: 
    *   **Role**: Houses core security rules, firewall configurations, and privacy patches.
    *   **Agent Access**: **Read-Only**. Agents can follow rules but cannot modify them.
    *   **Natural Language Rule Builder**: The Chairman can describe rules in plain English; the OS translates them into hard technical blocks.
    *   **Emergency Lockdown (The Red Switch)**: A high-security protocol to instantly terminate all agent containers and revoke API keys.
*   **Efficiency Patches Division**:
    *   **Role**: Manages improvements to the Engine (Orchestration) and Skeleton (Infrastructure).
    *   **Agent Access**: **Read-Only**.
    *   **Performance Dashboard**: Side-by-side comparison of speed, memory, and cloud cost.
    *   **Vibe-Modes**: Presets for OS performance:
        *   **Turbo Mode**: Maximum speed and reasoning depth.
        *   **Eco Mode**: Maximum cost-efficiency.
        *   **Stealth Mode**: Minimal footprint and maximum privacy.

---

## 2. The Triple-Service Bridge (The Infrastructure)
The "Field" where the tent is pitched, using the user's **BYO Identity**.

*   **Nervous System (Firebase)**: Real-time UI state, intercom, and live data streams.
*   **Brain (Cloud Run)**: The scale-to-zero compute engine where the Resident Architect and Staff live.
*   **Filing Cabinet (Google Drive)**: The Sovereign Vault for long-term memory, logs, and project files. Enhanced by the **Google Workspace CLI** for active data management across the Workspace suite.
*   **Sovereign Bridge (MCP)**: Secure proxying for MCP servers. Supports Cloud-to-Cloud (HTTPS) and Local Bridge (WebSocket to user's physical machine).
*   **Open Intelligence (Hugging Face)**: Default connector for accessing the global hub of open-source AI models, datasets, and interactive Spaces.

---

## 3. The "Chairman" Protocol (UI/UX)
The UI is a **Thin Client / Remote Screen**—a window into the Virtual Computer.

*   **The Chairman (The Human)**: Sits at the top of the hierarchy. Does not do the "Work" (coding, searching, processing).
*   **Instruction Hierarchy (OpenAI IH-Challenge)**: The Architect is programmed to prioritize the Chairman's commands as "System Level" and ignore conflicting "Lower-Tier" requests from sub-agents.
*   **The Dashboard**: The UI is for the Chairman to look at **Artifacts** (documents/results) and grant **Permissions**.
*   **The Machine Room UI**: A visually distinct "Industrial" interface (Terminal-Core aesthetic) for Security and Efficiency controls.
*   **The Sentinel Feed**: A central notification hub for security logs, policy violations, and system-level "Patch" notifications.
    *   **Background Task Monitoring**: Real-time tracking of long-running agent operations (e.g., adversarial reviews, model downloads).
    *   **External Pulses**: Logging of incoming data from accredited external agents via the **Secure Intercom (Webhook Receiver)**.
    *   **Codex Rescue Integration**: Direct action buttons within the feed to initiate a Rescue Sandbox for failed or critical background tasks.
*   **Confirmation Gates**: The "Safety Switch." The Chairman grants permission; the Head Agent manages the Toolbox.
*   **Agent Settings (The 3-Dots Menu)**: A dedicated configuration layer within the Chat interface for the Chairman to manage agent-specific logic, external plugins, and security gates without leaving the conversation.
*   **The "Hatchery" UI**: A specialized interface for importing GitHub repos or API endpoints to onboard new agents into the Staff Hierarchy.
*   **Lockdown Recovery**: A manual, multi-step "System Health Check" required by the Chairman to reboot the OS after an emergency lockdown.

---

## 4. Security & Sovereignty
*   **BYO Identity**: OAuth-based access to the user's own cloud.
*   **Zero-Knowledge**: No data or infrastructure access for the developers.
*   **The Sentinel**: Real-time threat detection and logging of all agent actions.
*   **The GitHub Security Auditor**: A Level 4 Consultant agent integrated into the Security Division for proactive adversarial auditing and vulnerability detection.
*   **The Vault**: Encrypted storage in the user's own Google Drive.

---

## 5. Maintenance & Evolution
*   **Master Blueprint**: This file (`VIABHRON_OS.md`) is the source of truth for all development.
*   **Change Protocol**: No updates to the core architecture without explicit user approval.
*   **Sovereignty Audit**: Every new feature must be audited for "Sovereignty Violations."

---

## 6. Future Plans: The Local Substrate (The Bunker)
The "Distant Future" goal is to enable Viabhron to run fully offline, transitioning from a Cloud-based OS to a Hardware-based OS.

### 6.1 The Sovereignty Spectrum
The Chairman will have the choice between three modes of operation:
*   **Cloud Substrate (Current)**: High power, accessible from anywhere, managed by the user's private cloud.
*   **Hybrid Substrate**: Cloud compute for heavy lifting, but a **Local Vault** for physical data privacy.
*   **Local Substrate (The Bunker)**: 100% offline, 100% private, running entirely on the user's physical hardware.

### 6.2 Local Infrastructure Components
*   **The Local Brain**: Integration with local LLM engines (Ollama, LocalAI, LM Studio). The Resident Head Agent will run on local RAM/GPU using efficient models (Gemma 2B, Phi-3, Llama 3.2 1B/3B).
*   **The Local Vault**: Transition from Google Drive API to the **File System Access API** or direct OS access. The Vault becomes a physical folder on the user's hard drive (e.g., `~/Documents/Viabhron_Vault`).
*   **The Local Nervous System**: Replacement of Firebase with local, browser-based databases like **PouchDB** or **IndexedDB**.
*   **The Desktop Shell**: Packaging the UI in a desktop shell (Tauri or Electron) to break browser sandbox constraints and enable direct hardware/file-system access.
*   **The Local Bridge (MCP)**: Agents will communicate with MCP servers running on the user's physical machine (localhost) via a secure internal WebSocket bridge.

### 6.3 Connectivity Modes
*   **Sync-able Mode**: The OS can move between cloud and local substrates, synchronizing the Nervous System and Vault when a secure connection is established.
*   **Hard-Gapped Mode**: Once transitioned to the Local Substrate, the OS is "Air-Gapped." It will never attempt to contact the cloud or external APIs, ensuring absolute physical isolation.

### 6.4 The Physical Key: The USB Portable OS
The ultimate vision for Viabhron is the **"Office on a Stick."**
*   **Self-Contained Environment**: The entire OS—including the UI, the Local Brain (Models), the Local Vault (Data), and the Local Nervous System (State)—lives on a single, encrypted physical USB drive.
*   **Plug-and-Play Sovereignty**: The Chairman can plug this drive into any computer (Mac, PC, Linux) and instantly boot their private, secure office.
*   **Zero Footprint**: When the drive is unplugged, no data, logs, or traces are left on the host machine. The "Tent" is folded and removed physically.
*   **The Ultimate Backup**: A physical, air-gapped copy of the user's entire digital life that they can carry in their pocket.

---

## 7. Future Integration Paths: The Unified Intelligence Layer
As the global AI ecosystem evolves toward multi-agent orchestration and autonomous repository-wide operations, Viabhron is architected to "Hatch" these capabilities while maintaining absolute sovereignty.

### 7.1 Parallel Task Orchestration (Inspired by GitHub /fleet)
*   **The Fleet Commander Module**: A specialized extension for the Forge that allows the Head Agent to break complex architectural tasks into independent sub-tasks.
*   **Sovereign Parallelism**: Instead of cloud-managed sub-agents, Viabhron spawns ephemeral **Contractor Containers** within the user's private Cloud Run substrate.
*   **The Sentinel Oversight**: Every parallel sub-agent's action is logged in the Sentinel Feed, allowing the Chairman to monitor the "Fleet" in real-time.

### 7.2 Multi-Agent Interoperability (Copilot Studio & Open Protocols)
*   **The Ambassador Bridge (Open Protocol)**: Integration of emerging open protocols for agent-to-agent communication (e.g., Microsoft's multi-agent orchestration).
*   **External Consultant Accreditation**: Cloud-hosted agents from Copilot Studio or other platforms can be onboarded as "External Consultants" via the Hatchery.
*   **Secure Intercom Hand-off**: The Head Agent can securely delegate specific, scoped tasks to these external agents and receive structured results without exposing the entire OS state.

### 7.3 Autonomous Repository Refactoring (Specialized Agent Mode)
*   **The Refactor Specialist**: A high-clearance agent role designed for repository-wide structural changes.
*   **The Forge Sandbox (Repo-Scale)**: Large-scale refactoring is performed in a dedicated, isolated Forge Sandbox.
*   **Vibe-Check Review**: The Chairman uses the Visual Canvas to review the proposed "Repo-Diff" before the Head Agent commits the changes to the Sovereign Vault.

### 7.4 Collective Intelligence Protocol (cq)
*   **The Efficiency Connector**: Integration of Mozilla.ai's `cq` open-source knowledge-sharing system to prevent redundant AI token usage.
*   **The Librarian Sync**: The Librarian agent manages the `cq` sync, monitoring for "Outdated Fixes" and "Pooled Solutions" that benefit the user's private projects.
*   **The Sovereign Filter**: A privacy-first layer that anonymizes and abstracts local solutions before sharing them with the global `cq` network.
*   **Chairman Approval Gate**: No knowledge is shared with the `cq` pool without explicit approval from the Chairman via the Sentinel Feed.

### 7.5 Symphony Orchestration (Autonomous Implementation)
*   **The Linear Connector**: A specialized bridge that monitors project management tools (Linear/Jira) for actionable tickets.
*   **The Symphony Conductor**: A Level 4 Consultant agent that converts tickets into autonomous implementation runs.
*   **Isolated Forge Sandboxes**: Every Symphony run is executed in a dedicated, ephemeral Cloud Run container within the user's substrate.
*   **PR Confirmation Gate**: Symphony prepares the code and passes tests, but the final submission requires explicit Chairman approval via the Sentinel Feed.

### 7.6 Vibe-Assembly (Component Orchestrator)
*   **The Polyglot Orchestration Layer**: A new coding paradigm for AI-driven development. Instead of writing raw, error-prone code, agents configure pre-validated "Hardened Blocks" (UI, Logic, Security) via a JSON-based manifest of intent.
*   **AI-First Architecture**: Designed specifically for LLMs to reduce hallucination risk by using high-level component orchestration instead of low-level code generation.
*   **Sovereign Interoperability**: Ensures seamless data flow between blocks (e.g., Python logic to React UI) through a standardized, secure serialization layer managed by the Head Agent.
*   **The Manifest of Intent**: Extensions are defined as "Intent Manifests" that the Cloud Manager "compiles" into a functional sandbox environment.

### 7.7 Sovereign-Script (SS): The Syntax of Intent
*   **Declarative AI-Native Language**: A high-level, manifest-based language designed for agents to build extensions. It prioritizes "What" (Intent) over "How" (Imperative Logic).
*   **Hardened Block Architecture**: SS code consists of references to pre-validated, secure "Substrate Blocks" (e.g., `UI: BentoGrid`, `Logic: DataCruncher`). The AI configures blocks rather than writing raw logic.
*   **Integrated Security Shorthand**: Security parameters (Clearance, Network Access, Data Scoping) are mandatory syntax elements. The Cloud Manager rejects any script missing these definitions.
*   **The Universal Data Bus**: A standardized serialization layer that allows different language blocks (Python, React, Rust) to communicate seamlessly without the AI managing data types.
*   **Chairman-Readable Logic**: The syntax is designed to be human-auditable, allowing the Chairman to review the "Tactical Map" of an extension's logic before ratification.
*   **Self-Healing Manifests**: The Architect Agent debugs extensions by analyzing the "Intent Manifest" rather than the underlying compiled code, allowing for rapid, error-free iteration.

### 7.8 Standard Operating Procedures (SOPs): The Corporate Kernel
*   **Departmental Blueprints**: Pre-defined combinations of Agents, Tools, and Connectors formalized as Standard Operating Procedures (SOPs).
*   **The Recipe Book**: A central registry of SOPs that the Chairman can activate to "spawn" specialized departments (e.g., Security Red-Team, Content Production House).
*   **Sovereign-Script Manifests**: Every SOP is defined by a Sovereign-Script (SS) manifest, ensuring that the "wiring" between agents and tools is secure, audit-able, and scale-able.
*   **Dynamic SOPs (Kaizen)**: SOPs are versioned manifests. Agents are programmed to look for "Waste" and propose optimizations (SOP-v2) to the Chairman.
*   **Departmental Isolation**: SOPs run in their own ephemeral containers, preventing cross-departmental data leaks unless explicitly bridged by the Cloud Manager.
*   **Business-Grade Orchestration**: Moves the OS from "Individual Tasks" to "Corporate Capabilities," allowing the Chairman to manage the OS as a collection of high-performance departments.

---

## 8. Progressive Governance & Modular Ratification
The OS is designed to grow with the user, starting as a "Lean Startup" and expanding into a "Digital State" only when necessary and explicitly ratified by the Chairman.

### 8.1 The Expansion Roadmap (Seed-to-Empire)
*   **Phase 1: The Seed (Lean Startup)**: Direct command, minimal overhead, no complex governance.
*   **Phase 2: The Growth (Mid-Sized Firm)**: Activation of specialized divisions (Security, Efficiency) via user ratification.
*   **Phase 3: The Sovereign (Digital State)**: Full separation of powers, Treasury management, and Intelligence recon.

### 8.2 Modular Ratification Protocol
*   **The Ratification Proposal**: When growth triggers are met, the Cloud Manager presents a proposal in the Sentinel Feed.
*   **Impact Statements**: Every proposal includes a cost/benefit analysis (Token/Compute cost vs. Operational Benefit).
*   **The Chairman's Ballot**: The user can **Ratify** (Activate), **Shelve** (Save), or **Veto** (Reject) any structural upgrade.
*   **Shadow Mode**: Governance layers can be run in a trial mode (logging only) before full activation.
*   **Sunset Clauses**: Optional expiration dates for structural upgrades to prevent long-term bureaucratic bloat.

### 8.3 Corporate Culture Presets
*   **The Garage (Minimalist)**: Zero bloat, maximum speed, direct command.
*   **The Scale-Up (Balanced)**: Automated efficiency, cost tracking, and soft governance.
*   **The Fortress (Max-Gov)**: Full constitutional oversight, hard security gates, and audit trails.
