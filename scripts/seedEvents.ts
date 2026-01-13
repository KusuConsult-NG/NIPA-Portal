
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// Environment variables are loaded via command line usually, but keeping this for safety if run directly
// dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

async function seedEvents() {
    console.log('📅 Starting events seeding...');

    if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
        console.error('❌ Error: Environment variables not loaded.');
        process.exit(1);
    }

    try {
        // Authenticate as Admin
        // Using the admin user we created in seedUsers.ts
        console.log('🔐 Authenticating as admin (Prof. Chinedu)...');
        await signInWithEmailAndPassword(auth, 'chinedu.okafor@nipa.test', 'Password123!');
        console.log('✅ Authenticated.');

        const eventsRef = collection(db, 'events');

        // Event 1: National Strategy Plenary
        const date1 = new Date();
        date1.setDate(date1.getDate() + 10); // 10 days from now

        await addDoc(eventsRef, {
            title: 'National Strategy Plenary 2026',
            description: 'Annual strategic planning session for all NIPA members to discuss national policy directions and economic implementation frameworks.',
            date: Timestamp.fromDate(date1),
            location: 'Main Auditorium, Abuja',
            type: 'Summit',
            capacity: 500,
            registered: 120,
            image: 'https://images.unsplash.com/photo-1540910419892-4308b58d0f1f?w=800',
            status: 'upcoming',
            createdAt: Timestamp.now()
        });
        console.log('✅ Created event: National Strategy Plenary 2026');

        // Event 2: Gala Night
        const date2 = new Date();
        date2.setDate(date2.getDate() + 25);

        await addDoc(eventsRef, {
            title: 'NIPA Gala & Awards Dinner',
            description: 'Celebrating excellence in public service and policy making. A night of networking and recognition.',
            date: Timestamp.fromDate(date2),
            location: 'Eko Hotel & Suites, Lagos',
            type: 'Gala',
            capacity: 300,
            registered: 45,
            image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800',
            status: 'upcoming',
            createdAt: Timestamp.now()
        });
        console.log('✅ Created event: NIPA Gala & Awards Dinner');

        // Event 3: Workshop
        const date3 = new Date();
        date3.setDate(date3.getDate() + 5);

        await addDoc(eventsRef, {
            title: 'Digital Transformation Workshop',
            description: 'Hands-on training for policy makers on leveraging AI and Big Data for governance.',
            date: Timestamp.fromDate(date3),
            location: 'Virtual (Zoom)',
            type: 'Workshop',
            capacity: 1000,
            registered: 412,
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
            status: 'upcoming',
            createdAt: Timestamp.now()
        });
        console.log('✅ Created event: Digital Transformation Workshop');

        console.log('\n✨ Seeding complete! 3 Events added.');
        process.exit(0);
    } catch (error: any) {
        console.error('❌ Seeding failed:', error);
        // Additional debug info
        if (error.code === 'permission-denied') {
            console.error('   -> Check Firestore Rules. "events" collection needs "allow write: if isAdmin()".');
            console.error('   -> Ensure user "chinedu.okafor@nipa.test" exists in "users" collection with role="admin".');
        }
        process.exit(1);
    }
}

seedEvents();
