import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const Sale = () => {
    return (
        <div className="bg-dark text-light min-h-screen flex flex-col">
            <Header />
            <main className="container mx-auto px-4 py-16 flex-grow">
                <h1 className="text-3xl font-display text-primary mb-8">Sale</h1>
                {/* Add content for sale items here */}
                <p className="text-gray-400">This is the placeholder content for the Sale page. Replace this with your actual sale product listings or information.</p>
            </main>
            <Footer />
        </div>
    );
};

export default Sale; 