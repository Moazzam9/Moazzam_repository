import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const OrderCannotBePlaced = () => {
    return (
        <div className="bg-dark text-light min-h-screen flex flex-col">
            <Header />
            <main className="container mx-auto px-4 py-16 flex-grow flex items-center justify-center">
                <div className="text-center max-w-md">
                    <h1 className="text-3xl font-display text-primary mb-4">Order Placement Disabled</h1>
                    <p className="text-gray-400 mb-8">
                        This is a demo website for showcase purposes only. Orders cannot be placed.
                    </p>
                    {/* Optionally add a link back to the home page or product page */}
                    {/* <button className="bg-primary text-dark px-6 py-3 rounded-md hover:bg-accent transition-colors">Back to Home</button> */}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default OrderCannotBePlaced; 