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
let app: any;
let auth: any;
let db: any;
let analytics: any = null;
let storage: any;

// Only initialize Firebase on the client side to prevent SSR/build errors
if (typeof window !== 'undefined') {
    // We're on the client
    if (firebaseConfig.apiKey) {
        try {
            app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
            auth = getAuth(app);
            db = getFirestore(app);
            analytics = getAnalytics(app);
            storage = getStorage(app);
        } catch (error) {
            console.warn('Firebase initialization failed:', error);
            // Provide mocks even on client if init fails
            app = {} as any;
            auth = {} as any;
            db = {} as any;
            storage = {} as any;
        }
    } else {
        console.warn('Missing Firebase API Key');
        app = {} as any;
        auth = {} as any;
        db = {} as any;
        storage = {} as any;
    }
} else {
    // We're on the server - provide mock objects to prevent crashes
    app = {} as any;
    auth = {} as any;
    db = {} as any;
    storage = {} as any;
}

export { app, auth, db, analytics, storage };
