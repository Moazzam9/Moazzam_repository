import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash, Minus, Plus } from 'lucide-react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
    const navigate = useNavigate();
    const { items, removeFromCart, updateQuantity, getTotalPrice } = useCart();

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-dark text-light">
                <Header />
                <div className="container mx-auto px-4 pt-24 pb-16">
                    <div className="text-center">
                        <h1 className="text-2xl font-display text-light mb-4">Your Cart is Empty</h1>
                        <p className="text-gray-400 mb-8">Add some products to your cart to see them here.</p>
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={() => navigate('/')}
                        >
                            Continue Shopping
                        </Button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-dark text-light">
            <Header />

            <div className="container mx-auto px-4 pt-24 pb-16">
                <h1 className="text-2xl font-display text-light mb-8">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item) => (
                            <div
                                key={`${item.id}-${item.size}`}
                                className="bg-secondary rounded-lg p-4 flex items-center gap-4"
                            >
                                <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                                    <img
                                        src={item.images[0]}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-light font-medium mb-1">{item.name}</h3>
                                    <p className="text-gray-400 text-sm mb-2">{item.brand}</p>
                                    <div className="flex items-center gap-4 text-sm">
                                        <span className="text-gray-400">Size: <span className="text-light">{item.size}</span></span>
                                        <span className="text-gray-400">Condition: <span className="text-light">{item.condition}</span></span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                            className="w-8 h-8 rounded-lg border border-gray-700 hover:border-primary/50 flex items-center justify-center"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="w-8 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                            className="w-8 h-8 rounded-lg border border-gray-700 hover:border-primary/50 flex items-center justify-center"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="text-right">
                                        <div className="text-primary font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                                        {item.originalPrice > item.price && (
                                            <div className="text-gray-400 text-sm line-through">
                                                ${(item.originalPrice * item.quantity).toFixed(2)}
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(item.id, item.size)}
                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <Trash className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-secondary rounded-lg p-6 sticky top-24">
                            <h2 className="text-xl font-display text-light mb-6">Order Summary</h2>

                            <div className="space-y-4">
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

                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={() => navigate('/checkout')}
                                    className="w-full"
                                >
                                    Proceed to Checkout
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Cart; 