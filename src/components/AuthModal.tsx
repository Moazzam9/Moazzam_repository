import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
    const navigate = useNavigate();
    const { loginWithGoogle } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await loginWithGoogle();
            onClose();
        } catch (err) {
            setError('Failed to login with Google');
        } finally {
            setIsLoading(false);
        }
    };

    const handleNavigateToAuth = () => {
        onClose();
        navigate('/auth');
    };

    const handleNavigateToAdmin = () => {
        onClose();
        navigate('/auth?mode=admin');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-secondary rounded-lg p-8 max-w-md w-full mx-4 border border-primary/20">
                <h2 className="text-2xl font-display font-bold mb-6 text-center text-primary">Login Required</h2>
                <p className="text-gray-300 mb-6 text-center">
                    Please log in to continue with your purchase.
                </p>

                {error && (
                    <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <button
                        onClick={handleLogin}
                        disabled={isLoading}
                        className="w-full bg-primary text-secondary py-2 px-4 rounded hover:bg-accent transition-colors disabled:opacity-50 font-medium"
                    >
                        {isLoading ? 'Logging in...' : 'Continue with Google'}
                    </button>

                    <button
                        onClick={handleNavigateToAuth}
                        className="w-full bg-secondary text-primary border border-primary py-2 px-4 rounded hover:bg-primary/10 transition-colors font-medium"
                    >
                        Login with Email
                    </button>

                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-primary/20"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-secondary text-gray-400">or</span>
                        </div>
                    </div>

                    <button
                        onClick={handleNavigateToAdmin}
                        className="w-full bg-secondary text-primary border border-primary/50 py-2 px-4 rounded hover:bg-primary/10 transition-colors font-medium"
                    >
                        Admin Login
                    </button>
                </div>

                <button
                    onClick={onClose}
                    className="mt-4 text-gray-400 hover:text-primary w-full text-center transition-colors"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}; 