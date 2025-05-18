import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { isAdmin } from '../utils/auth';

export const useAdmin = () => {
    const [isUserAdmin, setIsUserAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, () => {
            setIsUserAdmin(isAdmin());
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { isAdmin: isUserAdmin, loading };
}; 