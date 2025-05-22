import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Heart, User, Search, Menu, X } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ADMIN_EMAIL = 'bussinessmaker4@gmail.com';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { items } = useCart();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  // Close user menu on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('#user-menu-btn') && !(e.target as HTMLElement).closest('#user-menu-dropdown')) {
        setShowUserMenu(false);
      }
    };
    if (showUserMenu) {
      document.addEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showUserMenu]);

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = searchInputRef.current?.value;
    if (value) {
      setShowSearch(false);
      navigate(`/search?q=${encodeURIComponent(value)}`);
    }
  };

  const handleUserMenuClick = (path: string) => {
    setShowUserMenu(false);
    navigate(path);
  };

  const handleLogoutClick = async () => {
    setShowUserMenu(false);
    await logout();
    navigate('/');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-dark shadow-lg py-2' : 'bg-transparent py-4'}`}>
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

        <div className="flex items-center space-x-4 relative">
          {/* Search Icon */}
          <button className="text-light hover:text-primary transition-colors" onClick={() => setShowSearch((s) => !s)}>
            <Search size={20} />
          </button>
          {/* Search Modal/Input */}
          {showSearch && (
            <form
              onSubmit={handleSearchSubmit}
              className="absolute right-0 top-10 bg-secondary p-2 rounded shadow-lg flex items-center z-50"
            >
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search products..."
                className="bg-dark text-light px-2 py-1 rounded outline-none"
              />
              <button type="submit" className="ml-2 text-primary font-bold">Go</button>
              <button type="button" className="ml-2 text-gray-400" onClick={() => setShowSearch(false)}>✕</button>
            </form>
          )}

          {/* Wishlist Icon */}
          <Link to="/wishlist" className="text-light hover:text-primary transition-colors">
            <Heart size={20} />
          </Link>

          {/* Cart Icon */}
          <Link to="/cart" className="text-light hover:text-primary transition-colors relative">
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-dark text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {/* User Icon & Dropdown */}
          <div className="relative">
            <button
              id="user-menu-btn"
              className="text-light hover:text-primary transition-colors"
              onClick={() => setShowUserMenu((prev) => !prev)}
              aria-label="Account"
              type="button"
            >
              <User size={20} />
            </button>
            {showUserMenu && (
              <div id="user-menu-dropdown" className="absolute right-0 mt-2 w-44 bg-secondary rounded shadow-lg z-50">
                {!currentUser && (
                  <>
                    <button
                      className="block w-full text-left px-4 py-2 text-light hover:bg-dark"
                      onClick={() => handleUserMenuClick('/auth')}
                    >
                      Login
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-light hover:bg-dark"
                      onClick={() => handleUserMenuClick('/auth')}
                    >
                      Register
                    </button>
                  </>
                )}
                {currentUser && (
                  <>
                    <button
                      className="block w-full text-left px-4 py-2 text-light hover:bg-dark"
                      onClick={() => handleUserMenuClick(currentUser.email === ADMIN_EMAIL ? '/admin' : '/account')}
                    >
                      My Account
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-light hover:bg-dark"
                      onClick={handleLogoutClick}
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
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