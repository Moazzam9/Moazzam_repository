import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const Shipping = () => {
    return (
        <div className="bg-dark text-light min-h-screen flex flex-col">
            <Header />
            <main className="container mx-auto px-4 py-16 flex-grow">
                <h1 className="text-3xl font-display text-primary mb-8">Shipping Information</h1>
                {/* Add shipping information here */}
                <div className="prose prose-invert max-w-none">
                    <h2>Domestic Shipping</h2>
                    <p>We offer several shipping options within the country...</p>
                    <h2>International Shipping</h2>
                    <p>International shipping is available to many countries...</p>
                    {/* Add more shipping details */}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Shipping; 