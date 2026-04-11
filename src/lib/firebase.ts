import { initializeApp, getApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

// Default empty config for initial boot
const defaultEmptyConfig = {
  apiKey: "placeholder",
  authDomain: "placeholder",
  projectId: "placeholder",
  storageBucket: "placeholder",
  messagingSenderId: "placeholder",
  appId: "placeholder"
};

let app: FirebaseApp;
let db: Firestore;
let auth: Auth;

// Attempt to load from local storage or the config file
const savedConfig = localStorage.getItem('viabhron_firebase_config');
let configToUse = defaultEmptyConfig;

if (savedConfig) {
  try {
    configToUse = JSON.parse(savedConfig);
  } catch (e) {
    console.error("Failed to parse saved firebase config", e);
  }
}

try {
  if (!getApps().length) {
    app = initializeApp(configToUse);
  } else {
    app = getApp();
  }
  db = getFirestore(app, (configToUse as any).firestoreDatabaseId);
  auth = getAuth(app);
} catch (error) {
  console.warn("Firebase initialization deferred or failed. Waiting for Setup Box.", error);
  // We'll re-initialize later via the Setup Box
}

export { app, db, auth };

export const reinitializeFirebase = (newConfig: any) => {
  localStorage.setItem('viabhron_firebase_config', JSON.stringify(newConfig));
  window.location.reload(); // Simplest way to re-bind everything
};
