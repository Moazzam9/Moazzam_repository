import { getAuth } from 'firebase/auth';

const ADMIN_EMAIL = 'bussinessmaker4@gmail.com';

export const isAdmin = (): boolean => {
    const auth = getAuth();
    const user = auth.currentUser;
    return user?.email === ADMIN_EMAIL;
};

export const requireAdmin = () => {
    if (!isAdmin()) {
        throw new Error('Unauthorized: Admin access required');
    }
}; 