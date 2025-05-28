import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { getDatabase, ref, query, orderByChild, equalTo, onValue, push, serverTimestamp } from 'firebase/database';
import { getAuth } from 'firebase/auth';

interface Address {
    addressId: string;
    address_line1: string;
    address_line2?: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
    is_default: boolean;
}

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { items: cartItems, getTotalPrice, clearCart } = useCart();
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [shippingAddress, setShippingAddress] = useState<Address | null>(null);
    const [processingOrder, setProcessingOrder] = useState(false);

    useEffect(() => {
        if (!currentUser) {
            // Redirect to login if not authenticated
            navigate('/auth');
            return;
        }

        const db = getDatabase();
        const addressesRef = ref(db, `shippingAddresses/${currentUser.uid}`);
        const defaultAddressQuery = query(addressesRef, orderByChild('is_default'), equalTo(true));

        const unsubscribe = onValue(defaultAddressQuery, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const addressId = Object.keys(data)[0];
                setShippingAddress({ addressId, ...data[addressId] });
            } else {
                setShippingAddress(null); // No default address found
            }
            setLoading(false);
        }, (err) => {
            console.error("Error fetching default address:", err);
            setError('Failed to load shipping address.');
            setLoading(false);
        });

        // Also ensure cart items are loaded, though CartContext should handle this
        // For simplicity here, we assume CartContext is already populated

        return () => unsubscribe();
    }, [currentUser, navigate]);

    const handlePlaceOrder = () => {
        // Instead of processing the order, navigate to the disabled page
        navigate('/order-disabled');
    };

    if (loading) {
        return (
            <div className="bg-dark text-light min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="text-gray-400 mt-4">Loading checkout...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-dark text-light min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 mb-4">{error}</p>
                    {/* Optionally add a link to manage addresses */}
                </div>
            </div>
        );
    }

    if (!currentUser) {
        // This case should ideally be caught by the initial redirect, but good for safety
        return null;
    }

    // Render checkout form
    return (
        <div className="bg-dark text-light min-h-screen flex flex-col">
            <Header />
            <main className="container mx-auto px-4 py-16 flex-grow">
                <h1 className="text-2xl font-display text-light mb-8">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Shipping Address Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-secondary rounded-lg p-6">
                            <h2 className="text-xl font-display text-light mb-4">Shipping Information</h2>
                            {shippingAddress ? (
                                <div className="space-y-2 text-gray-400">
                                    <p>{shippingAddress.address_line1}</p>
                                    {shippingAddress.address_line2 && <p>{shippingAddress.address_line2}</p>}
                                    <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip_code}</p>
                                    <p>{shippingAddress.country}</p>
                                    {/* Optionally add a button to change address */}
                                </div>
                            ) : (
                                <div className="text-gray-400">
                                    <p className="mb-4">No default shipping address found.</p>
                                    {/* Add a button or link to add a new address */}
                                    <button
                                        onClick={() => navigate('/account')}
                                        className="bg-primary text-dark px-4 py-2 rounded hover:bg-accent"
                                    >
                                        Add Shipping Address
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Payment Method Section (Placeholder) */}
                        <div className="bg-secondary rounded-lg p-6 mt-8">
                            <h2 className="text-xl font-display text-light mb-4">Payment Method</h2>
                            <div className="space-y-4">
                                {/* Basic Placeholder Payment Form */}
                                <div>
                                    <label htmlFor="cardNumber" className="block text-gray-400 mb-1">Card Number</label>
                                    <input type="text" id="cardNumber" className="w-full px-3 py-2 bg-gray-800 text-light border border-gray-600 rounded" placeholder="XXXX XXXX XXXX XXXX" />
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label htmlFor="expiryDate" className="block text-gray-400 mb-1">Expiry Date</label>
                                        <input type="text" id="expiryDate" className="w-full px-3 py-2 bg-gray-800 text-light border border-gray-600 rounded" placeholder="MM/YY" />
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="cvv" className="block text-gray-400 mb-1">CVV</label>
                                        <input type="text" id="cvv" className="w-full px-3 py-2 bg-gray-800 text-light border border-gray-600 rounded" placeholder="XXX" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="cardName" className="block text-gray-400 mb-1">Name on Card</label>
                                    <input type="text" id="cardName" className="w-full px-3 py-2 bg-gray-800 text-light border border-gray-600 rounded" placeholder="Full Name" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Section (Similar to Cart page) */}
                    <div className="lg:col-span-1">
                        <div className="bg-secondary rounded-lg p-6 sticky top-24">
                            <h2 className="text-xl font-display text-light mb-6">Order Summary</h2>

                            <div className="space-y-4">
                                {cartItems.map(item => (
                                    <div key={`${item.id}-${item.size}`} className="flex justify-between text-gray-400 text-sm">
                                        <span>{item.name} ({item.quantity} x ${item.price.toFixed(2)})</span>
                                        <span>${(item.quantity * item.price).toFixed(2)}</span>
                                    </div>
                                ))}
                                <div className="flex justify-between text-gray-400">
                                    <span>Subtotal</span>
                                    <span>${getTotalPrice().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Shipping</span>
                                    <span>Calculated at checkout</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Tax</span>
                                    <span>Calculated at checkout</span>
                                </div>

                                <div className="border-t border-gray-800 pt-4">
                                    <div className="flex justify-between text-light font-medium">
                                        <span>Total</span>
                                        <span>${getTotalPrice().toFixed(2)}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handlePlaceOrder}
                                    className="w-full bg-primary text-dark px-6 py-3 rounded-md hover:bg-accent transition-colors disabled:opacity-50"
                                    disabled={!shippingAddress || cartItems.length === 0 || processingOrder}
                                >
                                    {processingOrder ? 'Processing...' : 'Place Order'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CheckoutPage; 