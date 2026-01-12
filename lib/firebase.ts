import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyCawOOE47xchjFXW5SzGEVm45e8OuLSjVo",
    authDomain: "corporative-app.firebaseapp.com",
    projectId: "corporative-app",
    storageBucket: "corporative-app.firebasestorage.app",
    messagingSenderId: "610917652176",
    appId: "1:610917652176:web:0b9c6e2c67c1f35a91f0d5",
    measurementId: "G-W38GC98LY0"
};

// Initialize Firebase (client-side)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

// Analytics (only in browser)
let analytics = null;
if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
}

// Storage
import { getStorage } from 'firebase/storage';
const storage = getStorage(app);

export { app, auth, db, analytics, storage };
