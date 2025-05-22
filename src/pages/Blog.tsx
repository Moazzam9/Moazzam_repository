import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { Calendar, Clock, User } from 'lucide-react';

const blogPosts = [
    {
        id: 1,
        title: "The Evolution of Luxury Sneakers: From Sports to Street Style",
        excerpt: "Explore how luxury sneakers transformed from athletic footwear to high-fashion statement pieces, featuring iconic collaborations and limited editions.",
        image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg",
        author: "Sarah Chen",
        date: "March 15, 2024",
        readTime: "5 min read",
        category: "Sneakers"
    },
    {
        id: 2,
        title: "Investment Watches: A Guide to Timeless Luxury",
        excerpt: "Discover which luxury timepieces have proven to be the best investments over time, and learn what makes a watch truly collectible.",
        image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg",
        author: "Michael Roberts",
        date: "March 12, 2024",
        readTime: "7 min read",
        category: "Watches"
    },
    {
        id: 3,
        title: "How to Spot Authentic Luxury Items: A Comprehensive Guide",
        excerpt: "Learn the essential tips and tricks for authenticating luxury sneakers and watches, ensuring you make informed purchases every time.",
        image: "https://images.pexels.com/photos/15074402/pexels-photo-15074402/free-photo-of-vintage-watches-on-stand-for-selling.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        author: "Emma Thompson",
        date: "March 10, 2024",
        readTime: "6 min read",
        category: "Authentication"
    }
];

const Blog = () => {
    return (
        <div className="bg-dark text-light min-h-screen flex flex-col">
            <Header />
            <main className="container mx-auto px-4 py-16 flex-grow">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-display text-primary mb-4">LuxeFinds Blog</h1>
                    <p className="text-gray-400 mb-12">Insights, trends, and stories from the world of luxury fashion, sneakers, and watches.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.map((post) => (
                            <article key={post.id} className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300">
                                <div className="relative h-48">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <span className="absolute top-4 right-4 bg-primary text-dark px-3 py-1 rounded-full text-sm font-medium">
                                        {post.category}
                                    </span>
                                </div>
                                <div className="p-6">
                                    <h2 className="text-xl font-display text-light mb-3 hover:text-primary transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-400 mb-4">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <User size={16} className="mr-1" />
                                            {post.author}
                                        </div>
                                        <div className="flex items-center">
                                            <Calendar size={16} className="mr-1" />
                                            {post.date}
                                        </div>
                                        <div className="flex items-center">
                                            <Clock size={16} className="mr-1" />
                                            {post.readTime}
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Blog; 