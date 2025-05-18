import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, User, Search, Menu, X } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { Link } from '../../components/common/Link';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-dark shadow-lg py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl md:text-3xl font-display font-bold text-primary">
          LuxeFinds
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-light hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/sneakers" className="text-light hover:text-primary transition-colors">
            Sneakers
          </Link>
          <Link to="/watches" className="text-light hover:text-primary transition-colors">
            Watches
          </Link>
          <Link to="/blog" className="text-light hover:text-primary transition-colors">
            Blog
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <button className="text-light hover:text-primary transition-colors">
            <Search size={20} />
          </button>
          <Link to="/wishlist" className="text-light hover:text-primary transition-colors">
            <Heart size={20} />
          </Link>
          <Link to="/cart" className="text-light hover:text-primary transition-colors relative">
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-dark text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <Link to="/admin" className="text-light hover:text-primary transition-colors">
            <User size={20} />
          </Link>
          <button
            className="md:hidden text-light hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-dark py-4 px-4 shadow-lg">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="text-light hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/sneakers" className="text-light hover:text-primary transition-colors">
              Sneakers
            </Link>
            <Link to="/watches" className="text-light hover:text-primary transition-colors">
              Watches
            </Link>
            <Link to="/blog" className="text-light hover:text-primary transition-colors">
              Blog
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;