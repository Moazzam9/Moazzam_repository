import React, { useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [formStatus, setFormStatus] = useState({
        submitted: false,
        error: false,
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus({ submitted: false, error: false, message: '' });

        try {
            // Here you would typically make an API call to your backend
            // For now, we'll simulate a successful submission
            await new Promise(resolve => setTimeout(resolve, 1000));
            setFormStatus({
                submitted: true,
                error: false,
                message: 'Thank you for your message. We will get back to you soon!'
            });
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            setFormStatus({
                submitted: false,
                error: true,
                message: 'There was an error sending your message. Please try again.'
            });
        }
    };

    return (
        <div className="bg-dark text-light min-h-screen flex flex-col">
            <Header />
            <main className="container mx-auto px-4 py-16 flex-grow">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-display text-primary mb-4 text-center">Contact Us</h1>
                    <p className="text-gray-400 text-center mb-12">Have questions about our luxury items? We're here to help.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-display text-light mb-6">Get in Touch</h2>
                                <p className="text-gray-400 mb-8">
                                    Our team of luxury experts is ready to assist you with any inquiries about our collection of authentic sneakers and watches.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <Mail className="text-primary mt-1" size={20} />
                                    <div>
                                        <h3 className="text-light font-medium">Email</h3>
                                        <p className="text-gray-400">support@luxefinds.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <Phone className="text-primary mt-1" size={20} />
                                    <div>
                                        <h3 className="text-light font-medium">Phone</h3>
                                        <p className="text-gray-400">+1 (555) 123-4567</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <MapPin className="text-primary mt-1" size={20} />
                                    <div>
                                        <h3 className="text-light font-medium">Location</h3>
                                        <p className="text-gray-400">123 Luxury Avenue<br />New York, NY 10001</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6">
                                <h3 className="text-light font-medium mb-4">Business Hours</h3>
                                <div className="space-y-2 text-gray-400">
                                    <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                                    <p>Saturday: 10:00 AM - 4:00 PM EST</p>
                                    <p>Sunday: Closed</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-gray-800 rounded-lg p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-gray-300 mb-1">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 bg-gray-700 text-light border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="Your name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-gray-300 mb-1">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 bg-gray-700 text-light border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="your.email@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-gray-300 mb-1">Subject</label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 bg-gray-700 text-light border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                    >
                                        <option value="">Select a subject</option>
                                        <option value="product-inquiry">Product Inquiry</option>
                                        <option value="authentication">Authentication Question</option>
                                        <option value="shipping">Shipping & Delivery</option>
                                        <option value="returns">Returns & Refunds</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-gray-300 mb-1">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={4}
                                        className="w-full px-3 py-2 bg-gray-700 text-light border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                                        placeholder="How can we help you?"
                                    />
                                </div>

                                {formStatus.message && (
                                    <div className={`p-4 rounded-md ${formStatus.error ? 'bg-red-900/50 text-red-200' : 'bg-green-900/50 text-green-200'}`}>
                                        {formStatus.message}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="w-full bg-primary text-dark font-medium py-3 px-6 rounded-md hover:bg-accent transition-colors flex items-center justify-center space-x-2"
                                >
                                    <Send size={18} />
                                    <span>Send Message</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Contact; 