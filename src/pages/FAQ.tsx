import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const FAQ = () => {
    return (
        <div className="bg-dark text-light min-h-screen flex flex-col">
            <Header />
            <main className="container mx-auto px-4 py-16 flex-grow">
                <h1 className="text-3xl font-display text-primary mb-8">Frequently Asked Questions</h1>
                {/* Add FAQ content here */}
                <div className="space-y-6">
                    <div>
                        <h2 className="text-xl font-display text-light mb-2">Q: What is your return policy?</h2>
                        <p className="text-gray-400">A: Our return policy allows for returns within 30 days of purchase. Please see our Returns page for more details.</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-display text-light mb-2">Q: How long does shipping take?</h2>
                        <p className="text-gray-400">A: Shipping times vary depending on your location. Please see our Shipping page for estimated delivery times.</p>
                    </div>
                    {/* Add more FAQ items */}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default FAQ; 