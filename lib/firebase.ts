import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase (client-side)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let app: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let auth: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let db: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let analytics: any = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let storage: any;

if (firebaseConfig.apiKey) {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
    db = getFirestore(app);

    // Analytics (only in browser)
    if (typeof window !== 'undefined') {
        analytics = getAnalytics(app);
    }

    // Storage
    storage = getStorage(app);
} else {
    // Mock for build time when env vars are missing
    console.warn('Missing Firebase API Key - Initializing mock Firebase instance');
    app = {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    auth = {} as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    db = {} as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    storage = {} as any;
}

export { app, auth, db, analytics, storage };
