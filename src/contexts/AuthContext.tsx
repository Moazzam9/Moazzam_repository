import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    User,
    updateProfile,
    sendEmailVerification
} from 'firebase/auth';
import { app } from '../config/firebase';
import { getDatabase, ref, set } from 'firebase/database';

interface AuthContextType {
    currentUser: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string, name: string) => Promise<void>;
    logout: () => Promise<void>;
    loginWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth(app);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, [auth]);

    const login = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    const signup = async (email: string, password: string, name: string) => {
        // Firebase does NOT allow storing plain passwords for security reasons.
        // Only email, name, and verification are handled here.
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (auth.currentUser) {
            await updateProfile(auth.currentUser, { displayName: name });
            try {
                await sendEmailVerification(auth.currentUser);
            } catch (err) {
                // Optionally handle error (e.g., show a message to the user)
                console.error('Failed to send verification email:', err);
                throw new Error('Failed to send verification email. Please try again.');
            }
            // Store user info in Realtime Database
            const db = getDatabase();
            await set(ref(db, 'users/' + auth.currentUser.uid), {
                uid: auth.currentUser.uid,
                name,
                email,
                createdAt: new Date().toISOString(),
                emailVerified: false
            });
        }
    };

    const logout = async () => {
        await signOut(auth);
    };

    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
    };

    const value = {
        currentUser,
        loading,
        login,
        signup,
        logout,
        loginWithGoogle
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}; 