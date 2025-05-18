import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const About = () => {
    return (
        <div className="bg-dark text-light min-h-screen flex flex-col">
            <Header />
            <main className="container mx-auto px-4 py-16 flex-grow max-w-3xl">
                <h1 className="text-3xl font-display text-primary mb-8 text-center">Our Story</h1>
                {/* Add your company's story here */}
                <div className="prose prose-invert max-w-none">
                    <p>
                        Welcome to LuxeFinds. We are passionate about bringing you authentic luxury sneakers and watches.
                        Founded in [Year], our mission is to [Your Mission].
                    </p>
                    <p>
                        We believe in the value of craftsmanship, heritage, and unique style. Every item in our collection is carefully authenticated to ensure you receive only genuine luxury goods.
                    </p>
                    <p>
                        [Optionally, add more paragraphs about your values, team, or journey].
                    </p>
                    <h2>Our Commitment</h2>
                    <p>
                        We are committed to providing an exceptional shopping experience, from the moment you browse our collection to the delivery of your cherished item.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default About;
