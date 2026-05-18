import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, subtotal } = useCart();
  const [discount, setDiscount] = useState(() => {
    try {
      const activeCoupon = localStorage.getItem('cake_coupon');
      return activeCoupon ? JSON.parse(activeCoupon).rate : 0;
    } catch(e) {
      return 0;
    }
  });
  const [couponCode, setCouponCode] = useState(() => {
    try {
      const activeCoupon = localStorage.getItem('cake_coupon');
      return activeCoupon ? JSON.parse(activeCoupon).code : '';
    } catch(e) {
      return '';
    }
  });

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'WELCOME10') {
      alert(`Coupon code "${code}" applied successfully! 10% discount added.`);
      setDiscount(0.1);
      localStorage.setItem('cake_coupon', JSON.stringify({ code: 'WELCOME10', rate: 0.1 }));
    } else if (code === 'FESTIVE20') {
      alert(`Coupon code "${code}" applied successfully! 20% discount added.`);
      setDiscount(0.2);
      localStorage.setItem('cake_coupon', JSON.stringify({ code: 'FESTIVE20', rate: 0.2 }));
    } else {
      alert("Invalid coupon code. Try 'WELCOME10' or 'FESTIVE20'.");
      setDiscount(0);
      localStorage.removeItem('cake_coupon');
    }
  };

  const delivery = 0;
  const tax = subtotal * 0.08;
  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount + delivery + tax;

  if (cart.length === 0) {
    return (
      <div className="empty-cart-container" style={{ minHeight: '80vh', marginTop: '60px' }}>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{ background: 'var(--color-cream)', padding: '4rem', borderRadius: '50%', marginBottom: '2rem' }}
        >
          <ShoppingBag size={80} color="var(--color-pink)" strokeWidth={1} />
        </motion.div>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--color-brown-dark)', marginBottom: '1rem' }}>Your cart is waiting for sweet surprises</h2>
        <p style={{ color: 'var(--color-brown)', fontSize: '1.2rem', opacity: 0.7, marginBottom: '3rem', maxWidth: '400px' }}>
          Looks like you haven't added any treats yet. Let's find something delicious!
        </p>
        <Link to="/" className="btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1.1rem', textDecoration: 'none' }}>
          Browse Cakes
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '60px 5% 6rem', maxWidth: '1400px', margin: '0 auto' }}>
      <header style={{ marginBottom: '4rem', marginTop: '60px' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-brown)', textDecoration: 'none', fontWeight: 700, marginBottom: '2rem', opacity: 0.6 }}>
          <ChevronLeft size={20} /> Continue Shopping
        </Link>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 900, color: 'var(--color-brown-dark)', margin: 0 }}>Shopping Cart</h1>
          <button 
            onClick={() => { if(window.confirm('Clear all items from cart?')) clearCart() }}
            style={{ 
              background: 'none', 
              border: '2px solid rgba(255, 68, 68, 0.2)', 
              color: '#ff4444', 
              padding: '0.6rem 1.5rem', 
              borderRadius: '12px', 
              fontWeight: 800, 
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 68, 68, 0.05)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'none'}
          >
            Clear Cart
          </button>
        </div>
      </header>

      <div className="cart-grid">
        {/* Left Side: Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <AnimatePresence>
            {cart.map(item => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="card"
                style={{ padding: '2rem', display: 'flex', gap: '2rem', alignItems: 'center', background: 'white' }}
              >
                <img src={item.image} style={{ width: '120px', height: '120px', borderRadius: '15px', objectFit: 'cover' }} alt={item.name} />
                
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800 }}>{item.name}</h3>
                    <button 
                      onClick={() => { if(window.confirm('Remove this item?')) removeFromCart(item.id) }}
                      style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', opacity: 0.6 }}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  <p style={{ color: 'var(--color-brown)', opacity: 0.6, fontSize: '0.9rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                    {item.weight} • Standard Delivery
                  </p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--color-cream)', padding: '0.5rem 1rem', borderRadius: '12px' }}>
                      <motion.button 
                        className="touch-friendly"
                        whileTap={{ scale: 0.8 }}
                        onClick={() => updateQuantity(item.id, -1)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                      >
                        <Minus size={18} />
                      </motion.button>
                      <span style={{ fontWeight: 800, minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                      <motion.button 
                        className="touch-friendly"
                        whileTap={{ scale: 0.8 }}
                        onClick={() => updateQuantity(item.id, 1)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                      >
                        <Plus size={18} />
                      </motion.button>
                    </div>
                    <span style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--color-brown-dark)' }}>
                      ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Right Side: Summary */}
        <aside className="mobile-sticky-summary" style={{ position: 'sticky', top: '120px' }}>
          <div className="card" style={{ padding: '3rem', background: 'white', border: '2px solid var(--color-cream)' }}>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '2.5rem' }}>Order Summary</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                <span style={{ opacity: 0.6 }}>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                <span style={{ opacity: 0.6 }}>Delivery</span>
                <span style={{ color: '#4CAF50', fontWeight: 800 }}>Free</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                <span style={{ opacity: 0.6 }}>Estimated Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                  <span style={{ opacity: 0.6 }}>Discount (10%)</span>
                  <span style={{ color: 'var(--color-pink)' }}>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
            </div>

            <div style={{ borderTop: '2px dashed var(--color-cream)', paddingTop: '2rem', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '2rem', fontWeight: 900, color: 'var(--color-brown-dark)' }}>
                <span>Total</span>
                <span style={{ color: 'var(--color-pink)' }}>${total.toFixed(2)}</span>
              </div>
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
              <label style={{ display: 'block', fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.8rem', opacity: 0.6 }}>HAVE A COUPON?</label>
              <div style={{ display: 'flex', gap: '0.8rem' }}>
                <input value={couponCode} onChange={(e) => setCouponCode(e.target.value)} type="text" placeholder="Code" style={{ flex: 1, padding: '1rem', borderRadius: '12px', border: '2px solid var(--color-cream)', outline: 'none', fontWeight: 700 }} />
                <button onClick={handleApplyCoupon} className="btn-secondary" style={{ padding: '0 1.5rem', fontWeight: 800 }}>Apply</button>
              </div>
            </div>

            <Link to="/checkout" className="btn-primary" style={{ 
              width: '100%', 
              padding: '1.2rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '1rem',
              fontSize: '1.2rem',
              fontWeight: 800,
              textDecoration: 'none',
              boxShadow: 'var(--shadow-glow)'
            }}>
              Proceed to Checkout <ArrowRight size={20} />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CartPage;
