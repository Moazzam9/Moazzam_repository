import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    // Update path when user navigates with browser buttons
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    // Listen to our custom navigation event
    const handleNavigation = (event: Event) => {
      const customEvent = event as CustomEvent;
      setCurrentPath(customEvent.detail.path);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('navigation', handleNavigation);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('navigation', handleNavigation);
    };
  }, []);

  // Add link to Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Lato:wght@300;400;700&display=swap';
    document.head.appendChild(link);

    // Update the document title
    document.title = 'LuxeFinds | Authentic Luxury Sneakers & Watches';

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const renderPage = () => {
    // Simple router
    if (currentPath === '/admin') {
      return <AdminPage />;
    }

    // Default to homepage
    return <HomePage />;
  };

  return (
    <CartProvider>
      <WishlistProvider>
        {renderPage()}
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;