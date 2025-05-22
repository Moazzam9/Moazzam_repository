import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { Heart, ShoppingCart, Shield, ChevronLeft, ChevronRight, Share2, Package, Truck, RefreshCw } from 'lucide-react';
import { Product } from '../types';
import { productService } from '../services/productService';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
    const { currentUser, showAuthModal } = useAuth();

    useEffect(() => {
        loadProduct();
    }, [id]);

    const loadProduct = async () => {
        try {
            setLoading(true);
            setError(null);
            const productData = await productService.getProductById(id!);
            setProduct(productData);
            // Set default size if available
            if (productData.size && Array.isArray(productData.size) && productData.size.length > 0) {
                setSelectedSize(productData.size[0]);
            }
        } catch (err) {
            setError('Failed to load product');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleQuantityChange = (value: number) => {
        if (value >= 1) {
            setQuantity(value);
        }
    };

    const handleAddToCart = () => {
        if (!currentUser) {
            showAuthModal();
            return;
        }

        if (!product) return;

        if (!selectedSize) {
            setError('Please select a size');
            return;
        }

        addToCart({
            ...product,
            size: selectedSize,
            quantity
        });

        // Show success message or navigate to cart
        navigate('/cart');
    };

    const handleWishlistToggle = () => {
        if (product) {
            if (isInWishlist(product.id)) {
                removeFromWishlist(product.id);
            } else {
                addToWishlist(product);
            }
        }
    };

    const nextImage = () => {
        if (product && currentImageIndex < product.images.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };

    const prevImage = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };

    if (loading) {
        return (
            <div className="bg-dark text-light min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="text-gray-400 mt-4">Loading product...</p>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="bg-dark text-light min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 mb-4">{error || 'Product not found'}</p>
                    <Button
                        variant="primary"
                        size="md"
                        onClick={() => navigate('/')}
                        className="mt-4"
                    >
                        Return to Home
                    </Button>
                </div>
            </div>
        );
    }

    const calculateDiscount = () => {
        const discount = ((product.originalPrice - product.price) / product.originalPrice) * 100;
        return Math.round(discount);
    };

    return (
        <div className="bg-dark text-light min-h-screen flex flex-col">
            <Header />
            <main className="container mx-auto px-4 py-16 flex-grow">
                <div className="max-w-7xl mx-auto">
                    {/* Breadcrumb */}
                    <div className="flex items-center text-gray-400 mb-8">
                        <button onClick={() => navigate(-1)} className="flex items-center hover:text-primary">
                            <ChevronLeft size={20} />
                            <span>Back</span>
                        </button>
                        <span className="mx-2">/</span>
                        <span>{product.category}</span>
                        <span className="mx-2">/</span>
                        <span>{product.brand}</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Image Gallery */}
                        <div className="space-y-4">
                            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-800">
                                <img
                                    src={product.images[currentImageIndex]}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                                {/* Image Navigation Buttons */}
                                {product.images.length > 1 && (
                                    <div className="absolute inset-0 flex items-center justify-between px-4">
                                        <button
                                            onClick={prevImage}
                                            disabled={currentImageIndex === 0}
                                            className={`p-2 rounded-full bg-dark/50 text-light hover:bg-dark/70 transition-colors ${currentImageIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
                                                }`}
                                            aria-label="Previous image"
                                        >
                                            <ChevronLeft size={24} />
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            disabled={currentImageIndex === product.images.length - 1}
                                            className={`p-2 rounded-full bg-dark/50 text-light hover:bg-dark/70 transition-colors ${currentImageIndex === product.images.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
                                                }`}
                                            aria-label="Next image"
                                        >
                                            <ChevronRight size={24} />
                                        </button>
                                    </div>
                                )}

                                {product.authenticated && (
                                    <div className="absolute top-4 left-4 bg-dark/70 text-primary text-sm font-bold px-3 py-1 rounded-full flex items-center">
                                        <Shield size={14} className="mr-1" />
                                        Authenticated
                                    </div>
                                )}
                                {calculateDiscount() > 0 && (
                                    <div className="absolute top-4 right-4 bg-primary text-dark text-sm font-bold px-3 py-1 rounded">
                                        {calculateDiscount()}% OFF
                                    </div>
                                )}
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                {product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`aspect-square rounded-lg overflow-hidden ${currentImageIndex === index ? 'ring-2 ring-primary' : ''
                                            }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${product.name} view ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl font-display text-light mb-2">{product.name}</h1>
                                <p className="text-primary text-xl font-medium">{product.brand}</p>
                            </div>

                            <div className="flex items-baseline space-x-4">
                                <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
                                {product.originalPrice > product.price && (
                                    <span className="text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                                )}
                            </div>

                            {/* SIZE GRID START */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <h2 className="text-lg font-medium text-light">Select Size</h2>
                                    <button className="flex items-center text-primary text-sm" type="button">
                                        <span className="mr-1">↔️</span>
                                        Size Guide
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-4">
                                    {Array.isArray(product.size) && product.size.length > 0 ? (
                                        product.size.map((size) => (
                                            <button
                                                key={size}
                                                type="button"
                                                onClick={() => setSelectedSize(size)}
                                                className={`border px-4 py-2 rounded transition-colors ${selectedSize === size
                                                        ? 'border-primary bg-primary/10 text-primary'
                                                        : 'border-gray-700 text-light hover:border-primary/50'
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))
                                    ) : (
                                        <span className="text-gray-400">No sizes available</span>
                                    )}
                                </div>
                                {selectedSize && (
                                    <div className="mb-2 text-gray-400">
                                        Selected Size: <span className="text-light">{selectedSize}</span>
                                    </div>
                                )}
                            </div>
                            {/* SIZE GRID END */}

                            <div className="flex items-center space-x-4 text-gray-400">
                                <span>Condition: <span className="text-light">{product.condition}</span></span>
                            </div>
                            <p className="text-gray-400">{product.description}</p>

                            <div className="flex items-center space-x-4">
                                <div className="flex items-center border border-gray-700 rounded-md">
                                    <button
                                        onClick={() => handleQuantityChange(quantity - 1)}
                                        className="px-3 py-2 text-gray-400 hover:text-primary"
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                                        className="w-16 text-center bg-transparent border-x border-gray-700 py-2 text-light"
                                        min="1"
                                    />
                                    <button
                                        onClick={() => handleQuantityChange(quantity + 1)}
                                        className="px-3 py-2 text-gray-400 hover:text-primary"
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-primary text-dark px-6 py-3 rounded-md hover:bg-accent transition-colors flex items-center justify-center space-x-2"
                                >
                                    <ShoppingCart size={20} />
                                    <span>Add to Cart</span>
                                </button>
                                <button
                                    onClick={handleWishlistToggle}
                                    className={`p-3 rounded-md transition-colors ${isInWishlist(product.id)
                                        ? 'bg-primary text-dark'
                                        : 'bg-gray-800 text-light hover:bg-gray-700'
                                        }`}
                                >
                                    <Heart size={20} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
                                </button>
                                <button
                                    className="p-3 bg-gray-800 text-light rounded-md hover:bg-gray-700 transition-colors"
                                    onClick={() => window.open('http://moazzamportfolio.great-site.net/', '_blank')}
                                    aria-label="Share"
                                >
                                    <Share2 size={20} />
                                </button>
                            </div>

                            {/* Shipping & Returns */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-800">
                                <div className="flex items-center space-x-3">
                                    <Truck className="text-primary" size={20} />
                                    <div>
                                        <h4 className="text-light font-medium">Free Shipping</h4>
                                        <p className="text-gray-400 text-sm">On orders over $500</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Package className="text-primary" size={20} />
                                    <div>
                                        <h4 className="text-light font-medium">Secure Packaging</h4>
                                        <p className="text-gray-400 text-sm">Luxury packaging included</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <RefreshCw className="text-primary" size={20} />
                                    <div>
                                        <h4 className="text-light font-medium">14-Day Returns</h4>
                                        <p className="text-gray-400 text-sm">Hassle-free returns</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ProductDetail; 