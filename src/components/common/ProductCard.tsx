import React, { useRef, useState, useEffect } from 'react';
import { Heart, ShoppingCart, Shield } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { Link } from './Link';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 }
      });
    }
  }, [controls, inView]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) RotateY(0) scale3d(1, 1, 1)';
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const calculateDiscount = () => {
    const discount = ((product.originalPrice - product.price) / product.originalPrice) * 100;
    return Math.round(discount);
  };

  const handleAddToCart = () => {
    addToCart(product, 1);
    // Show feedback animation
    if (cardRef.current) {
      cardRef.current.classList.add('animate-bounce');
      setTimeout(() => {
        cardRef.current?.classList.remove('animate-bounce');
      }, 1000);
    }
  };

  const isWishlisted = isInWishlist(product.id);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
    >
      <Link
        to={`/product/${product.id}`}
        className="group bg-secondary rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 ease-out hover:shadow-gold block"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="relative">
          <div className="relative h-64 overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 ease-out transform group-hover:scale-110"
            />
            {isHovered && product.images.length > 1 && (
              <img
                src={product.images[1]}
                alt={`${product.name} alternate view`}
                className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
              />
            )}
          </div>

          <div className="absolute top-2 right-2 flex flex-col space-y-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={(e) => { // Prevent link click when clicking button
                e.preventDefault();
                e.stopPropagation();
                isWishlisted ? removeFromWishlist(product.id) : addToWishlist(product);
              }}
              className={`p-2 rounded-full transition-colors ${isWishlisted ? 'bg-primary text-dark' : 'bg-dark/50 text-light hover:bg-primary hover:text-dark'
                }`}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
            </motion.button>
          </div>

          {calculateDiscount() > 0 && (
            <div className="absolute top-2 left-2 bg-primary text-dark text-xs font-bold px-2 py-1 rounded">
              {calculateDiscount()}% OFF
            </div>
          )}

          {product.authenticated && (
            <div className="absolute bottom-2 left-2 bg-dark/70 text-primary text-xs font-bold px-2 py-1 rounded-full flex items-center">
              <Shield size={12} className="mr-1" />
              Authenticated
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex justify-between mb-1">
            <span className="text-primary text-sm font-semibold">{product.brand}</span>
            <span className="text-light text-sm">{product.category}</span>
          </div>
          <h3 className="text-light font-display font-medium text-lg mb-1 hover:text-primary transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center mb-2">
            <span className="text-primary font-bold">${product.price.toFixed(2)}</span>
            {product.originalPrice > product.price && (
              <span className="text-gray-400 line-through ml-2 text-sm">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <div className="flex justify-between items-center mt-3">
            <span className="text-gray-400 text-sm">{product.condition} • {product.size}</span>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={(e) => { // Prevent link click when clicking button
                e.preventDefault();
                e.stopPropagation();
                handleAddToCart();
              }}
              className="bg-primary text-dark p-2 rounded-full hover:bg-accent transition-colors"
              aria-label="Add to cart"
            >
              <ShoppingCart size={16} />
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;