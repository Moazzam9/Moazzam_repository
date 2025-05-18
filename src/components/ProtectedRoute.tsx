import { Navigate, useLocation } from 'react-router-dom';
import { isAdmin } from '../utils/auth';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const location = useLocation();

    if (!isAdmin()) {
        // Redirect to login page with the return url
        return <Navigate to="/auth?mode=admin" state={{ from: location }} replace />;
    }

    return <>{children}</>;
}; 