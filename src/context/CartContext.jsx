import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cake_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
      console.error("Failed to parse cart", e);
      return [];
    }
  });
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('cake_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      const qtyToAdd = item.quantity || 1;
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + qtyToAdd } : i);
      }
      return [...prev, { ...item, quantity: qtyToAdd }];
    });
    
    // Show toast
    setToast(`${item.name} added to cart`);
    setTimeout(() => setToast(null), 3000);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + (parseFloat(item.price.replace('$', '')) * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, subtotal, toast }}>
      {children}
      {toast && (
        <div className="toast-container">
          <div className="toast">
            {toast}
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
};
