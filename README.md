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
*   **Minor Changes Only**: The system is designed for stable, incremental improvements. Major structural changes are restricted to ensure stability.

### 4. Agent Terminal
A real-time monitoring module that allows you to see exactly what your agents are doing.
*   **Log Output**: View info, success, and error logs from all active agents.
*   **Command Tracking**: See the specific tools and commands being executed in the background.

### 5. The Tent (BYO Infrastructure)
Users "pitch their own tent" by connecting their own **Firebase** and **Google Cloud** projects. This ensures total data sovereignty and privacy.

## 📂 Repository Structure

*   `/src/extensions/modules`: High-level features (Canvas, Artifacts, UI Demos).
*   `/src/extensions/skills`: Complex agent behaviors (Deep Research, Coding).
*   `/src/extensions/tools`: Simple API connectors (Search, Image Gen).
*   `/src/extensions/mcp`: Model Context Protocol servers.

## 🚀 Setup Instructions

1.  **Clone the Repo**: `git clone <repo-url>`
2.  **Firebase Setup**:
    *   Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com).
    *   Enable Firestore and Firebase Auth (Google Provider).
    *   Download your `firebase-applet-config.json` and place it in the root.
3.  **Deploy to Cloud Run**:
    *   Follow the instructions in the `deploy/` folder to host your "Office" engine.
4.  **Install Dependencies**: `npm install`
5.  **Run Locally**: `npm run dev`

## 📱 Mobile / APK
Viabhron is designed to be buildable as an APK via GitHub Actions using Capacitor. This allows you to take your "AI Computer" with you on the go.

---
*Built with privacy, modularity, and persistence at its core.*
