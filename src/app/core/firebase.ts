import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// --- FOR THE USER ---
// 1. Go to https://console.firebase.google.com/
// 2. Create a project named "Alphery Space"
// 3. Add a "Web App" to the project
// 4. Paste your config object here or in your .env file
// --------------------

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const db = getFirestore(app, "alphery-node");
export const auth = getAuth(app);
export const storage = getStorage(app);

/**
 * Helper to get the current tenant ID.
 * This should eventually be replaced by Firebase Auth Custom Claims,
 * but for the migration, we still read from local storage to match the ERP logic.
 */
export const getCurrentTenantId = () => {
    const userStr = localStorage.getItem('alphery_user');
    if (!userStr) return null;
    const user = JSON.parse(userStr);
    return user.company || user.tenant_id;
};
