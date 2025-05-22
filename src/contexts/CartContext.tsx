import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';
import { useAuth } from './AuthContext';

interface CartItem extends Product {
  quantity: number;
  size: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product & { size: string; quantity: number }) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  pendingCartAction: (() => void) | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingCartAction, setPendingCartAction] = useState<(() => void) | null>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (currentUser && pendingCartAction) {
      pendingCartAction();
      setPendingCartAction(null);
    }
  }, [currentUser, pendingCartAction]);

  const addToCart = (product: Product & { size: string; quantity: number }) => {
    if (!currentUser) {
      setPendingCartAction(() => () => addToCart(product));
      setShowAuthModal(true);
      return;
    }

    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.id === product.id && item.size === product.size
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += product.quantity;
        return updatedItems;
      }

      return [...prevItems, { ...product, quantity: product.quantity }];
    });
  };

  const removeFromCart = (productId: string, size: string) => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }
    setItems(prevItems => prevItems.filter(item => !(item.id === productId && item.size === size)));
  };

  const updateQuantity = (productId: string, size: string, quantity: number) => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.id === productId && item.size === size
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const clearCart = () => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        showAuthModal,
        setShowAuthModal,
        pendingCartAction
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};