import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const Blog = () => {
    return (
        <div className="bg-dark text-light min-h-screen flex flex-col">
            <Header />
            <main className="container mx-auto px-4 py-16 flex-grow">
                <h1 className="text-3xl font-display text-primary mb-8">Our Blog</h1>
                {/* Add blog post listings or content here */}
                <p className="text-gray-400">This is the placeholder content for the Blog page. Replace this with your actual blog posts or articles.</p>
            </main>
            <Footer />
        </div>
    );
};

export default Blog; 