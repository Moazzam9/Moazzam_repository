import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useAuth } from '../contexts/AuthContext';

const Account = () => {
    const { user } = useAuth();

    return (
        <div className="bg-dark text-light min-h-screen flex flex-col">
            <Header />
            <main className="container mx-auto px-4 py-16 flex-grow">
                <h1 className="text-3xl font-display text-primary mb-8">My Account</h1>

                {user ? (
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-gray-800 rounded-lg p-6 mb-6">
                            <h2 className="text-xl font-display text-light mb-4">Account Information</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-400 mb-1">Email</label>
                                    <p className="text-light">{user.email}</p>
                                </div>
                                {/* Add more account information sections as needed */}
                            </div>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-6">
                            <h2 className="text-xl font-display text-light mb-4">Order History</h2>
                            <p className="text-gray-400">Your order history will appear here.</p>
                        </div>
                    </div>
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