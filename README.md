# Viabhron: Modular AI Operating System (MAOS)

Viabhron is a persistent, agentic workspace designed as a "Virtual Office" for AI agents. It follows a unique "Tent Deployment" model where users own their infrastructure and intelligence.

## 🏛️ Core Concepts

### 1. The Office (The Engine)
The backend runs on **Google Cloud Run**, providing a 24/7 environment for agents to operate. It is the "building" where your AI workers live and perform tasks even when you are away.

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
