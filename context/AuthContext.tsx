'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface UserProfile {
    uid: string;
    name: string;
    email: string;
    role: 'member' | 'admin' | 'welfare';
    cohort?: string;
    profession?: string;
    photoURL?: string | null;
    status?: 'active' | 'inactive';
}

interface AuthContextType {
    user: User | null;
    profile: UserProfile | null;
    loading: boolean;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    profile: null,
    loading: true,
    logout: async () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
            setUser(authUser);

            if (authUser) {
                // Set cookie for middleware and API routes
                Cookies.set('session', 'true', { expires: 7 });
                try {
                    const token = await authUser.getIdToken();
                    Cookies.set('auth_token', token, { expires: 7 });
                } catch (e) {
                    console.error("Error getting token", e);
                }

                try {
                    const { doc, getDoc } = await import('firebase/firestore');
                    const { db } = await import('@/lib/firebase');

                    const userDoc = await getDoc(doc(db, 'users', authUser.uid));
                    if (userDoc.exists()) {
                        setProfile(userDoc.data() as UserProfile);
                    } else {
                        // Handle case where auth exists but profile doesn't (legacy or partial signup)
                        setProfile(null);
                    }
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                    setProfile(null);
                }
            } else {
                // Remove cookies
                Cookies.remove('session');
                Cookies.remove('auth_token');
                setProfile(null);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const logout = async () => {
        try {
            await firebaseSignOut(auth);
            Cookies.remove('session'); // Ensure cookie is removed immediately on logout action
            Cookies.remove('auth_token');
            setProfile(null);
            router.push('/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, profile, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
