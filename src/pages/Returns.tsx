import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const Returns = () => {
    return (
        <div className="bg-dark text-light min-h-screen flex flex-col">
            <Header />
            <main className="container mx-auto px-4 py-16 flex-grow">
                <h1 className="text-3xl font-display text-primary mb-8">Returns and Exchanges</h1>
                {/* Add returns information here */}
                <div className="prose prose-invert max-w-none">
                    <h2>Return Policy</h2>
                    <p>Details about the conditions and process for returns...</p>
                    <h2>Exchanges</h2>
                    <p>Information on how to exchange an item...</p>
                    {/* Add more returns/exchanges details */}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Returns; 