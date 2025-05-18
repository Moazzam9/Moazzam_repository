import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const PrivacyPolicy = () => {
    return (
        <div className="bg-dark text-light min-h-screen flex flex-col">
            <Header />
            <main className="container mx-auto px-4 py-16 flex-grow">
                <h1 className="text-3xl font-display text-primary mb-8">Privacy Policy</h1>
                {/* Add privacy policy content here */}
                <div className="prose prose-invert max-w-none">
                    <p>
                        This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from [Your Website Name].
                    </p>
                    <h2>Personal Information We Collect</h2>
                    <p>
                        When you visit the Site, we automatically collect certain information about your device...
                    </p>
                    {/* Add more privacy policy details */}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy; 