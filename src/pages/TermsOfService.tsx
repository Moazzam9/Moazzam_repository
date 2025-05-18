import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const TermsOfService = () => {
    return (
        <div className="bg-dark text-light min-h-screen flex flex-col">
            <Header />
            <main className="container mx-auto px-4 py-16 flex-grow">
                <h1 className="text-3xl font-display text-primary mb-8">Terms of Service</h1>
                <div className="prose prose-invert max-w-none">
                    <p>
                        These Terms of Service govern your use of the website [Your Website Name] and your relationship with [Your Company Name].
                    </p>
                    <h2>Conditions of Use</h2>
                    <p>
                        By using this website, you certify that you have read and reviewed this Agreement and that you agree to comply with its terms...
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default TermsOfService; 