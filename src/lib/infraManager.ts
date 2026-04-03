import { initializeApp, deleteApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

/**
 * TECHNIQUE: Dynamic Infrastructure Re-initialization
 * This class manages the connection to the USER'S private backend.
 */
class InfrastructureManager {
  private currentApp: FirebaseApp | null = null;
  public db: Firestore | null = null;
  private token: string | null = null;

  // 1. Fetch User's Google Cloud Projects
  async fetchUserProjects(accessToken: string) {
    this.token = accessToken;
    const response = await fetch('https://cloudresourcemanager.googleapis.com/v1/projects', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const data = await response.json();
    return data.projects || []; // Returns list of IDs and Names
  }

  // 2. Fetch the Firebase Config for a specific project
  async getProjectConfig(projectId: string) {
    // Note: Requires the Firebase Management API enabled on the user's project
    const url = `https://firebase.googleapis.com/v1beta1/projects/${projectId}/webApps/-/config`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${this.token}` }
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch config for project ${projectId}. Ensure Firebase Management API is enabled.`);
    }
    return await response.json();
  }

  // 3. Hot-Swap the Database Connection
  async connectToUserBackend(config: any) {
    // Clear existing Firebase instances to prevent "Duplicate App" errors
    const apps = getApps();
    for (const app of apps) {
      await deleteApp(app);
    }

    // Re-initialize with the user's credentials
    this.currentApp = initializeApp(config);
    this.db = getFirestore(this.currentApp);
    
    // Save locally for persistence
    localStorage.setItem('user_owned_config', JSON.stringify(config));
    
    console.log("Successfully bridged to User-Owned Infrastructure.");
    return this.db;
  }

  // 4. Load persisted config on startup
  async loadPersistedConfig() {
    const savedConfig = localStorage.getItem('user_owned_config');
    if (savedConfig) {
      try {
        const config = JSON.parse(savedConfig);
        return await this.connectToUserBackend(config);
      } catch (e) {
        console.error("Failed to load persisted config", e);
      }
    }
    return null;
  }
}

export const infra = new InfrastructureManager();
