import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const Contact = () => {
    return (
        <div className="bg-dark text-light min-h-screen flex flex-col">
            <Header />
            <main className="container mx-auto px-4 py-16 flex-grow max-w-lg">
                <h1 className="text-3xl font-display text-primary mb-8 text-center">Contact Us</h1>
                <form className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-gray-300 mb-1">Name</label>
                        <input
                            type="text"
                            id="name"
                            className="w-full px-3 py-2 bg-gray-700 text-light border border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-primary"
                        />
                    </div>
                    {/* Add more form fields here */}
                </form>
            </main>
            <Footer />
        </div>
    );
};

export default Contact; 