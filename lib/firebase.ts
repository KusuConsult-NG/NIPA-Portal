// Firebase client-side initialization
// This module provides Firebase instances or mock objects depending on environment

let app: any;
let auth: any;
let db: any;
let analytics: any = null;
let storage: any;

// Only initialize Firebase on the client side
if (typeof window !== 'undefined') {
    // Dynamic imports to prevent Firebase from being bundled in server code
    const initFirebase = async () => {
        try {
            const firebaseConfig = {
                apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
                authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
                projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
                storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
                messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
                appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
                measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
            };

            if (!firebaseConfig.apiKey || firebaseConfig.apiKey === 'undefined') {
                console.warn('[Firebase] API key not configured');
                return;
            }

            const { initializeApp, getApps } = await import('firebase/app');
            const { getAuth } = await import('firebase/auth');
            const { getFirestore } = await import('firebase/firestore');
            const { getStorage } = await import('firebase/storage');

            app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
            auth = getAuth(app);
            db = getFirestore(app);
            storage = getStorage(app);

            // Analytics (optional)
            try {
                const { getAnalytics } = await import('firebase/analytics');
                analytics = getAnalytics(app);
            } catch (e) {
                console.log('[Firebase] Analytics not available');
            }

            console.log('[Firebase] Initialized successfully');
        } catch (error) {
            console.error('[Firebase] Initialization failed:', error);
            // Set mocks on error
            app = {};
            auth = {};
            db = {};
            storage = {};
        }
    };

    // Initialize immediately
    initFirebase();
} else {
    // Server-side: provide mock objects
    app = {};
    auth = {};
    db = {};
    storage = {};
}

export { app, auth, db, analytics, storage };
