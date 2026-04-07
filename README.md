# Viabhron: Modular AI Operating System (MAOS)

> [!IMPORTANT]
> **PROJECT STATUS: CONCEPTUAL PROTOTYPE**
> This project is a **work in progress** and serves as a **conceptualization of an idea** rather than a production-ready application. 
> 
> **CREATOR CONTEXT:**
> The creator of Viabhron is developing this system using **Google AI Studio** as a primary collaborator. The creator does not have a formal coding background or the high-end hardware typically required to test such a complex architecture beyond basic functional verification. 
> 
> As such, Viabhron is an exploration of the **"Business-in-a-Box"** paradigm—a vision of how autonomous AI orchestration and digital sovereignty could be structured in a future where users own their intelligence and infrastructure.

Viabhron is a persistent, agentic workspace designed as a **"Business-in-a-Box"** for AI agents. It follows a unique "Tent Deployment" model where users own their infrastructure and intelligence, transforming private cloud resources into a high-performance corporate kernel.

## 🏛️ Core Concepts

### 1. The Office (The Engine)
The backend runs on **Google Cloud Run**, providing a 24/7 environment for agents to operate. It is the "building" where your AI workers live and perform tasks even when you are away.
*   **Substrate Optimization**: Powered by **TurboQuant**, implementing 3-bit KV cache compression for 8x faster attention scoring and 60% reduced memory footprint, enabling massive context windows on standard cloud hardware.

### 2. The Desk (The Generative UI)
The frontend is your "window" into the office. It is a **Generative UI** that can be reconfigured by the **Head Agent** via natural language prompts.
*   **Default Desk**: A mobile-first, circular-tabbed interface.
*   **Liquid Layout**: The UI can morph between focus modes, split screens, and canvas-first views.
*   **Core Skeleton**: The **Workflow Canvas** and **Sandbox** are built-in infrastructure, providing a visual orchestrator and a virtual computer environment for all agents.

### 3. The Head Agent (The Architect)
A central, persistent agent that manages the system.
*   **Least Privilege**: The Head Agent manages workers and UI but *cannot* see sensitive API keys or passwords.
*   **Orchestration**: It delegates complex tasks to specialized Sub-Agents and Minor Agents.
*   **Security Gate**: Only the Head Agent can propose changes to the UI, Skeleton, or Extensions. All such changes require explicit user approval via the **Confirmation Gate**.

### 4. Agent Governance
Integrated with **Microsoft's Agent Governance Toolkit**, ensuring runtime security, policy enforcement, and compliance (EU AI Act, HIPAA).

### 5. The Tent (BYO Infrastructure)
Users "pitch their own tent" by connecting their own **Firebase** and **Google Cloud** projects. This ensures total data sovereignty and privacy.
*   **Passkey Sovereignty**: Access to the OS kernel is secured via passwordless biometric passkeys or physical security keys, ensuring the "Business-in-a-Box" is impossible to seize even if cloud credentials are compromised.
*   **Mobile Command**: The **Sovereign Intercom Bridge** provides 24/7 oversight of the OS via private Telegram/Discord channels, allowing for live ratification of agent decisions from any device.

### 6. Business-in-a-Box (The Corporate Kernel)
Viabhron formalizes AI workflows into **Standard Operating Procedures (SOPs)**. It is designed to be a "Turnkey" solution where departments (Security, Creative, R&D) are pre-configured and ready to scale.
*   **Intelligence Manufacturing**: The **Mistral Sovereign Forge** allows enterprises to build custom, "frontier-grade" AI models using proprietary data from the Neural Archive, ensuring 100% data sovereignty.
*   **Physics-Aware Creative**: **Project VOID** enables professional-grade video object erasure and scene manipulation, respecting physical interactions like collisions and splashes.
*   **Visual Intelligence**: **MolmoWeb** integration allows agents to navigate the web by "seeing" screenshots, ensuring 100% success on dynamic sites without leaking data to external scrapers.

### 7. Mini-App Ecosystem (The Mobile Desk)
The **Sovereign PWA Launcher** provides a collection of lightweight "Mini-Apps" (Notes, Expenses, News) that can be toggled on/off from the sidebar.
*   **Hybrid Sync**: Choose between **Local Mode** (private, offline-first) and **Sovereign Mode** (fully cloud-integrated) for each mini-app.
*   **Extension-Ready**: Add new mini-apps as extensions to your OS, expanding your mobile capabilities without bloating the kernel.

### 8. Multi-Terminal Substrate (The Sovereign Nexus)
Viabhron is a **Headless OS**. You can accredit multiple "Terminals" (Desktop, CLI, Browser) to connect to your private cloud.
*   **Accreditation Control**: Manage client access and permissions from the sidebar.
*   **Unified Brain**: All clients share the same **Soul Core**, ensuring your intelligence and data are consistent across every device.

### 9. Progressive Governance (Anti-Bloat)
The OS expands only as you need it. Through **Modular Ratification**, the system proposes structural upgrades (like a **Pooled Treasury**, Judicial branch, or the **TurboQuant Substrate Patch**) which you can **Ratify, Shelve, or Veto** based on your current needs and budget.
*   **Fiscal Sovereignty**: The **Pooled Treasury Protocol** eliminates per-seat fees, replacing them with task-based intelligence funding (e.g., $0.25 flat-fee code reviews).

## 🐳 The "Tent" (Cloud Docker Architecture)

Viabhron uses a **Zero-Local-Build** strategy. Your phone (The Desk) is lightweight, while the **"Tent" (Cloud Run)** handles the heavy lifting via Docker.

### 1. Private LLM (Ollama)
You can run a private LLM (Llama 3, Gemma) inside a Docker container in your Google Cloud. Your data never leaves your private "Tent."

### 2. Agent Execution Environment
The **Agent CLI** and **Vibe Forge** interact with a Dockerized backend. This allows agents to:
*   **Install Packages**: Run `npm install` or `pip install` in a safe, isolated container.
*   **Execute Code**: Run scripts in a sandbox without affecting your phone.
*   **Staging Area**: Test code in the "Forge" before pushing to GitHub.

### 3. Cloud-Only Compilation
100% of the Docker build process happens in **GitHub Actions**. Your phone just sends the "Push" command.

### 4. Multi-Client Substrate
The **Sovereign API Gateway** allows you to "Authorize a Terminal" (Mobile, Desktop, CLI) to connect to your private OS. This ensures your intelligence follows you across every device while keeping your keys and data hidden in the "Tent."

### 🧠 The "Soul-Link" (AI Second Brain Architecture)

Viabhron is designed to evolve from a tool into a **Net Soul Half** or **AI Second Brain**. This is achieved through a dual-memory infrastructure:

#### 1. The Soul Core (Firestore)
*   **Active Memory**: Stores real-time insights, user resonance, and immediate goals in the `memories` collection.
*   **Reflective Loop**: Agents periodically analyze chat logs to "mutate" their system instructions, allowing them to grow a personality that matches the user.

### 🖥️ The Virtual Computer Architecture

Viabhron is a **Multi-Agent Operating System (MAOS)** running on a private, virtualized infrastructure:
*   **The CPU/RAM (Cloud Run)**: Your private "Office" where the agents live and execute code in real-time.
*   **The Hard Drive (Google Drive)**: Your "Neural Archive" where all persistent data, logs, and "Agent Memories" are stored as encrypted fragments.
*   **The Root Authority (Tiny LLM Head)**: The "Soul" of the system. A private, resident **Tiny LLM** (e.g., Gemma 2B) that acts as the **Superuser** of the MAOS. It is the only entity with access to your sensitive context.

#### 🛡️ The Sentinel & Guardian (Security Layer)
*   **System-Wide Protection**: Sentinel scans **all** files brought into or built within the MAOS, not just those in the Forge.
*   **The Guardian Agent**: Acts as the "Security Kernel," monitoring the "Gate" between the isolated Sandbox and the live "Root" environment.
*   **Device Intelligence**: Powered by the **Fingerprint MCP server**, providing hardware-verified access control and fraud prevention for all sensitive agentic operations.
*   **Dangerous Commands**: The Tiny LLM Head is authorized to issue "Dangerous" or system-level commands to Sub-Agents to maintain the OS, provided they are executed within the Forge Sandbox or verified by the Guardian.

### 🛠️ Specialized Intelligence Tools

The MAOS includes a suite of specialized "Skills" for deep information retrieval:
*   **Code Hunter**: Deep search for GitHub repositories, libraries, and technical documentation.
*   **Global Pulse**: Geopolitical and political analysis engine for tracking world events.
*   **Social Sentinel**: Real-time social media trend monitoring and sentiment analysis.
*   **Doc Forge**: Advanced PDF/EPUB generation for creating reports and documentation.

### 🤖 Agent Hierarchy (Resident vs. Contractor)

Viabhron distinguishes between persistent "Resident" intelligence and ephemeral "Contractor" muscle:

#### 1. Resident Agents (Private & Persistent)
*   **Head Agent (The Architect)**: A private, **Tiny LLM** resident agent living in the "Tent." It manages the system and holds the user's "Second Brain."
*   **Tool Overseer**: The Architect manages the activation of **Extensions (Tools)**. Tools are only active when strictly necessary to maintain system efficiency and security.
*   **Guardian (The Immune System)**: A built-in security specialist that monitors the "Gate" between the Sandbox and the live Office.

#### 2. Contractor Agents (External & Ephemeral)
*   **Sub-Agents / Outside Agents**: Standard LLM-powered agents (Gemini Pro, GPT-4) "hired" via API for specific complex tasks. 
*   **Just-in-Time Tools**: Contractors only have access to the tools explicitly granted for their current task.
*   **Request Protocol**: If a Contractor needs additional tools to complete their mission, they must request them from the **Head Agent (The Architect)**.
*   **Stateless Execution**: They are hired for a single task, provided only the necessary context, and have no access to the "Soul Core" or "Neural Archive."
*   **Isolation**: Their work is strictly confined to the Forge Sandbox or a specific tool's output.
*   **Instructions**: They follow a "Contractor Protocol" where they are given a clear mission, a set of constraints, and a termination condition.

#### 3. The Disconnected Forge (The Lab)
*   The **Forge Sandbox** is a disconnected, isolated environment. Code is tested here without constant scanning to save resources. The **Guardian** only intervenes when code is proposed for deployment to the live "Office."

#### 4. The Neural Archive (Google Drive)
*   **Deep Subconscious**: Massive logs, historical code versions, and binary assets are compressed and encrypted before being offloaded to Google Drive.
*   **Vault Pointers**: Firestore maintains a lightweight index (`vault` collection) of these encrypted fragments.
*   **Privacy**: All data is encrypted with a **User-Controlled Key** (The Shared Secret) before leaving the "Tent."

#### 3. Data Density Control
*   Users can adjust the **Compression Level** to balance GDrive space usage vs. retrieval speed.
*   **Archival Mode**: High compression for long-term storage.
*   **Performance Mode**: Low compression for active projects.

### 🛡️ The "Guardian" (Sentinel Antivirus)

Viabhron includes a built-in security layer called **Sentinel Guardian** to protect your private cloud environment:
*   **Persistent Guardian Agent**: A dedicated, "Always-On" specialist agent that monitors the system 24/7. It coordinates with the **Head Agent** to isolate threats and analyze code in the **Forge**.
*   **Interval Scanning**: Automatically scans your "Office" (Cloud Run) and "Neural Archive" (GDrive) at user-defined intervals.
*   **Threat Intelligence**: Integrates with **VirusTotal API** to check file hashes against 70+ antivirus engines.
*   **Resource Balancing**: Users can configure the scan depth (Quick, Deep, Paranoid) and frequency to manage Cloud Run resource consumption.
*   **Sandbox Execution**: Suspicious files can be isolated and analyzed in a secure, ephemeral Docker container.

## 📱 Dual-Mode Architecture (PWA + APK)

Viabhron is built with a **"Zero-Local-Build"** philosophy, specifically optimized for ultra-low-end Android devices (3GB RAM).

### 1. Progressive Web App (PWA)
*   **Offline First**: Uses Service Workers for caching and offline capabilities.
*   **Installable**: Can be added to the home screen on any device.

### 2. Native Android APK
*   **Capacitor Powered**: Uses Capacitor to bridge the web app to native Android features.
*   **Cloud Compilation**: 100% of the build process (Web Build → Capacitor Sync → Android Gradle Compile) happens in the **GitHub Actions** CI/CD pipeline. No local Android Studio or Gradle is required.

## 📂 Repository Structure

*   `/src/extensions/modules`: High-level features (Canvas, Artifacts, Governance).
*   `/src/extensions/skills`: Complex agent behaviors (Deep Research, Coding).
*   `/src/extensions/tools`: Simple API connectors (Search, Image Gen).
*   `/src/extensions/mcp`: Model Context Protocol servers.
*   `.github/workflows/build.yml`: The cloud-only build pipeline for PWA and APK.

## 🚀 Setup Instructions

1.  **Connect My Cloud**: Use the in-app "Connect My Cloud" flow to link your Google Cloud Project.
2.  **Firebase Setup**:
    *   The system will automatically provision Firestore and Auth if permissions are granted.
    *   Alternatively, place your `firebase-applet-config.json` in the root.
3.  **Cloud Build**:
    *   Push your changes to GitHub.
    *   GitHub Actions will automatically generate the **PWA** and **Android APK**.
    *   Download the APK from the "Actions" tab or access the PWA via GitHub Pages.

---
*Built with privacy, modularity, and persistence at its core.*
