import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const Careers = () => {
    return (
        <div className="bg-dark text-light min-h-screen flex flex-col">
            <Header />
            <main className="container mx-auto px-4 py-16 flex-grow">
                <h1 className="text-3xl font-display text-primary mb-8">Careers</h1>
                {/* Add careers information and job listings here */}
                <p className="text-gray-400">This is the placeholder content for the Careers page. Replace this with information about career opportunities at your company.</p>
            </main>
            <Footer />
        </div>
    );
};

export default Careers; 