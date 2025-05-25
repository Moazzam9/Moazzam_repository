import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const ADMIN_EMAIL = 'bussinessmaker4@gmail.com';
const ADMIN_PASSWORD = 'moazzam315';

export const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isAdminMode, setIsAdminMode] = useState(false);
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [signupSuccess, setSignupSuccess] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { login, signup, loginWithGoogle } = useAuth();
    const auth = getAuth();

    const from = location.state?.from?.pathname || '/';

    useEffect(() => {
        // Check if we're in admin mode from URL
        const searchParams = new URLSearchParams(location.search);
        setIsAdminMode(searchParams.get('mode') === 'admin');
    }, [location.search]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (isAdminMode) {
                // First check if the credentials match our preset admin credentials
                if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
                    setError('Invalid admin credentials');
                    setIsLoading(false);
                    return;
                }

                // If credentials match, attempt Firebase authentication
                try {
                    await signInWithEmailAndPassword(auth, email, password);
                    navigate('/admin');
                } catch (firebaseError: any) {
                    // Handle specific Firebase error codes
                    switch (firebaseError.code) {
                        case 'auth/user-not-found':
                            setError('Admin account not found in the system');
                            break;
                        case 'auth/wrong-password':
                            setError('Invalid admin password');
                            break;
                        case 'auth/too-many-requests':
                            setError('Too many failed attempts. Please try again later');
                            break;
                        default:
                            setError('Failed to authenticate admin account');
                    }
                }
                setIsLoading(false);
                return;
            }

            // Regular user login/signup flow
            if (isLogin) {
                await login(email, password);
                navigate(from, { replace: true });
            } else {
                if (!name.trim()) {
                    setError('Name is required');
                    setIsLoading(false);
                    return;
                }
                if (password !== confirmPassword) {
                    setError('Passwords do not match');
                    setIsLoading(false);
                    return;
                }
                await signup(email, password, name);
                setSignupSuccess(true);
                // Do not auto-login or redirect
                setIsLoading(false);
                return;
            }
        } catch (err: any) {
            setError(isLogin ? 'Failed to login' : 'Failed to create account');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            // Prevent Google login in admin mode
            if (isAdminMode) {
                setError('Admin login is only available with email and password');
                return;
            }
            await loginWithGoogle();
            navigate(from, { replace: true });
        } catch (err) {
            setError('Failed to login with Google');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-secondary/50 p-8 rounded-lg border border-primary/20">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-display font-extrabold text-primary">
                        {isAdminMode
                            ? 'Admin Login'
                            : isLogin
                                ? 'Sign in to your account'
                                : 'Create a new account'}
                    </h2>
                    {isAdminMode && (
                        <p className="mt-2 text-center text-sm text-gray-400">
                            Access the admin dashboard
                        </p>
                    )}
                </div>

                {error && (
                    <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded">
                        {error}
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {signupSuccess ? (
                        <div className="bg-green-900/50 border border-green-500 text-green-200 px-4 py-3 rounded text-center">
                            Please verify your email address to log in. Check your inbox for a verification email.
                        </div>
                    ) : (
                        <>
                            <div className="rounded-md shadow-sm -space-y-px">
                                {!isLogin && !isAdminMode && (
                                    <div>
                                        <label htmlFor="name" className="sr-only">
                                            Name
                                        </label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-primary/20 bg-secondary text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                            placeholder="Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                )}
                                <div>
                                    <label htmlFor="email" className="sr-only">
                                        Email address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-primary/20 bg-secondary text-gray-200 placeholder-gray-400 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                        placeholder={isAdminMode ? "Admin email address" : "Email address"}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="sr-only">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-primary/20 bg-secondary text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                {!isLogin && !isAdminMode && (
                                    <div>
                                        <label htmlFor="confirmPassword" className="sr-only">
                                            Confirm Password
                                        </label>
                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            required
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-primary/20 bg-secondary text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                            placeholder="Confirm Password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                )}
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-secondary bg-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-colors"
                                >
                                    {isLoading
                                        ? 'Processing...'
                                        : isLogin
                                            ? 'Sign in'
                                            : 'Create account'}
                                </button>
                            </div>

                            {!isAdminMode && (
                                <div>
                                    <button
                                        type="button"
                                        onClick={handleGoogleLogin}
                                        className="w-full flex justify-center py-2 px-4 border border-primary text-primary rounded-md shadow-sm text-sm font-medium bg-secondary hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                                    >
                                        Continue with Google
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </form>

                {!isAdminMode && (
                    <div className="text-center">
                        <button
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-primary hover:text-accent transition-colors"
                        >
                            {isLogin
                                ? "Don't have an account? Sign up"
                                : 'Already have an account? Sign in'}
                        </button>
                    </div>
                )}

                {isAdminMode && (
                    <div className="text-center">
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="text-primary hover:text-accent transition-colors"
                        >
                            Back to Home
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}; 