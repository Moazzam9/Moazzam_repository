import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { Package, RefreshCw, AlertCircle, Clock, CheckCircle, XCircle } from 'lucide-react';

const returnSteps = [
    {
        icon: <Package size={24} />,
        title: "Package Your Item",
        description: "Carefully repackage your item in its original packaging with all accessories and documentation."
    },
    {
        icon: <RefreshCw size={24} />,
        title: "Initiate Return",
        description: "Log into your account and initiate the return process through your order history."
    },
    {
        icon: <AlertCircle size={24} />,
        title: "Print Label",
        description: "Print the return shipping label provided in your return confirmation email."
    },
    {
        icon: <CheckCircle size={24} />,
        title: "Ship Item",
        description: "Drop off your package at the designated shipping location or schedule a pickup."
    }
];

const Returns = () => {
    return (
        <div className="bg-dark text-light min-h-screen flex flex-col">
            <Header />
            <main className="container mx-auto px-4 py-16 flex-grow">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-display text-primary mb-4">Returns & Exchanges</h1>
                    <p className="text-gray-400 mb-12">
                        We want you to be completely satisfied with your purchase. Our return policy is designed to ensure a smooth and hassle-free experience.
                    </p>

                    {/* Return Policy Overview */}
                    <div className="bg-gray-800 rounded-lg p-8 mb-12">
                        <div className="flex items-start space-x-4 mb-6">
                            <Clock className="text-primary mt-1" size={24} />
                            <div>
                                <h2 className="text-2xl font-display text-light mb-2">Return Policy</h2>
                                <p className="text-gray-400">
                                    You have 14 days from the delivery date to initiate a return. All items must be in their original condition, unworn, and with all original packaging and documentation.
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-start space-x-3">
                                <CheckCircle className="text-green-500 mt-1" size={20} />
                                <div>
                                    <h3 className="text-light font-medium mb-1">What's Eligible</h3>
                                    <ul className="text-gray-400 space-y-2">
                                        <li>Items in original condition</li>
                                        <li>Complete with all accessories</li>
                                        <li>Original packaging included</li>
                                        <li>All documentation present</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <XCircle className="text-red-500 mt-1" size={20} />
                                <div>
                                    <h3 className="text-light font-medium mb-1">What's Not Eligible</h3>
                                    <ul className="text-gray-400 space-y-2">
                                        <li>Worn or used items</li>
                                        <li>Missing accessories</li>
                                        <li>Damaged packaging</li>
                                        <li>Missing documentation</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Return Process */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-display text-light mb-8">Return Process</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {returnSteps.map((step, index) => (
                                <div key={index} className="bg-gray-800 p-6 rounded-lg">
                                    <div className="text-primary mb-4">{step.icon}</div>
                                    <h3 className="text-light font-medium mb-2">{step.title}</h3>
                                    <p className="text-gray-400">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Exchanges */}
                    <div className="bg-gray-800 rounded-lg p-8 mb-12">
                        <h2 className="text-2xl font-display text-light mb-6">Exchanges</h2>
                        <div className="space-y-6">
                            <p className="text-gray-400">
                                We offer exchanges for different sizes or colors of the same item. To initiate an exchange:
                            </p>
                            <ol className="list-decimal list-inside text-gray-400 space-y-3">
                                <li>Contact our customer service team within 14 days of delivery</li>
                                <li>Specify the desired size or color</li>
                                <li>Follow the return process for your current item</li>
                                <li>Once received, we'll ship your exchange item</li>
                            </ol>
                            <p className="text-gray-400">
                                Note: Exchanges are subject to availability. If your desired item is not available, we'll process a refund instead.
                            </p>
                        </div>
                    </div>

                    {/* Refunds */}
                    <div className="bg-gray-800 rounded-lg p-8">
                        <h2 className="text-2xl font-display text-light mb-6">Refunds</h2>
                        <div className="space-y-6">
                            <p className="text-gray-400">
                                Once we receive and inspect your return, we'll process your refund within 5-7 business days. Refunds will be issued to your original payment method.
                            </p>
                            <div className="bg-gray-700 p-4 rounded-md">
                                <h3 className="text-light font-medium mb-2">Important Notes:</h3>
                                <ul className="text-gray-400 space-y-2">
                                    <li>• Shipping costs for returns are the customer's responsibility</li>
                                    <li>• International returns may take longer to process</li>
                                    <li>• Refund processing times may vary by payment provider</li>
                                    <li>• Original shipping costs are non-refundable</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Contact Support */}
                    <div className="mt-12 text-center">
                        <p className="text-gray-400 mb-4">Need help with your return or exchange?</p>
                        <button className="bg-primary text-dark px-8 py-3 rounded-md hover:bg-accent transition-colors font-medium">
                            Contact Support
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Returns; 