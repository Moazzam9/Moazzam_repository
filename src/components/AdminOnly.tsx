import { ReactNode } from 'react';
import { useAdmin } from '../hooks/useAdmin';

interface AdminOnlyProps {
    children: ReactNode;
    fallback?: ReactNode;
}

export const AdminOnly = ({ children, fallback = null }: AdminOnlyProps) => {
    const { isAdmin, loading } = useAdmin();

    if (loading) {
        return null;
    }

    return isAdmin ? <>{children}</> : <>{fallback}</>;
}; 