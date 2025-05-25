import React, { useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useAuth } from '../contexts/AuthContext';
import { useWishlist } from '../contexts/WishlistContext';
import ProductCard from '../components/common/ProductCard';
import { getAuth, sendEmailVerification } from 'firebase/auth';

const Account = () => {
    const { user } = useAuth();
    const { wishlistItems } = useWishlist();
    const [verificationSent, setVerificationSent] = useState(false);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState('');

    const handleResendVerification = async () => {
        setSending(true);
        setError('');
        try {
            if (user) {
                await sendEmailVerification(user);
                setVerificationSent(true);
            }
        } catch (err) {
            setError('Failed to resend verification email. Please try again.');
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="bg-dark text-light min-h-screen flex flex-col">
            <Header />
            <main className="container mx-auto px-4 py-16 flex-grow">
                <h1 className="text-3xl font-display text-primary mb-8">My Account</h1>

                {user ? (
                    !user.emailVerified ? (
                        <div className="max-w-xl mx-auto bg-gray-800 rounded-lg p-8 text-center">
                            <h2 className="text-xl font-display text-light mb-4">Email Verification Required</h2>
                            <p className="text-gray-400 mb-4">
                                Please verify your email address to access your account information. Check your inbox for a verification email sent to <span className="text-primary">{user.email}</span>.
                            </p>
                            {verificationSent ? (
                                <p className="text-green-400 mb-4">Verification email sent! Please check your inbox.</p>
                            ) : (
                                <button
                                    onClick={handleResendVerification}
                                    disabled={sending}
                                    className="bg-primary text-dark px-4 py-2 rounded hover:bg-accent transition-colors font-medium mb-2"
                                >
                                    {sending ? 'Sending...' : 'Resend Verification Email'}
                                </button>
                            )}
                            {error && <p className="text-red-400 mt-2">{error}</p>}
                        </div>
                    ) : (
                        <div className="max-w-4xl mx-auto space-y-8">
                            <div className="bg-gray-800 rounded-lg p-6 mb-6">
                                <h2 className="text-xl font-display text-light mb-4">Account Information</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-gray-400 mb-1">Name</label>
                                        <p className="text-light">{user.displayName || 'No name set'}</p>
                                    </div>
                                    <div>
                                        <label className="block text-gray-400 mb-1">Email</label>
                                        <p className="text-light">{user.email}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-800 rounded-lg p-6 mb-6">
                                <h2 className="text-xl font-display text-light mb-4">Wishlist & Favorites</h2>
                                {wishlistItems.length === 0 ? (
                                    <p className="text-gray-400">You have no items in your wishlist or favorites.</p>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                        {wishlistItems.map((item) => (
                                            <ProductCard key={item.product.id} product={item.product} />
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="bg-gray-800 rounded-lg p-6">
                                <h2 className="text-xl font-display text-light mb-4">Order History</h2>
                                <p className="text-gray-400">Your order history will appear here.</p>
                            </div>
                        </div>
                    )
                ) : (
                    <div className="text-center">
                        <p className="text-gray-400 mb-4">Please log in to view your account information.</p>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default Account; 