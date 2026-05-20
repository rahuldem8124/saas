import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTenant } from '../context/TenantContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Star, ShieldCheck, Heart, ArrowLeft, Trash2, Shield, Calendar, Clock, CreditCard, Send, Smile, Info, Check, MessageSquare, AlertCircle, RefreshCw } from 'lucide-react';
import SaaSSandboxBanner from '../components/SaaSSandboxBanner';

const TenantStorefront = () => {
  const { businessId } = useParams();
  const navigate = useNavigate();
  const { businesses, addOrder, addChatMessage } = useTenant();

  const biz = businesses[businessId] || businesses['cakeflow'];
  const [activeTheme, setActiveTheme] = useState(biz.theme || 'Modern');

  // Store Flow States
  const [storeCart, setStoreCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [customFieldValues, setCustomFieldValues] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(0); // 0 = Catalog, 1 = Cart Details, 2 = Checkout Form, 3 = Payment Simulator, 4 = Success/Tracking
  
  // Checkout Forms
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    paymentMethod: 'UPI'
  });
  
  // Tracking
  const [activeOrder, setActiveOrder] = useState(null);
  
  // Live Chat
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');

  useEffect(() => {
    setActiveTheme(biz.theme);
    setStoreCart([]);
    setSelectedProduct(null);
    setCheckoutStep(0);
    setActiveOrder(null);
  }, [businessId, biz]);

  // Sync custom field states when selected product changes
  useEffect(() => {
    if (selectedProduct) {
      const initialFields = {};
      biz.fields.forEach(field => {
        initialFields[field.id] = field.type === 'Dropdown' ? field.options[0] : '';
      });
      setCustomFieldValues(initialFields);
    }
  }, [selectedProduct, biz]);

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    
    // Validate required fields
    const missing = biz.fields.find(f => f.required && !customFieldValues[f.id]);
    if (missing) {
      alert(`Please fill out required field: ${missing.name}`);
      return;
    }

    const newItem = {
      id: Date.now(),
      productId: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      image: selectedProduct.image,
      customFields: { ...customFieldValues },
      quantity: 1
    };

    setStoreCart(prev => [...prev, newItem]);
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId) => {
    setStoreCart(prev => prev.filter(i => i.id !== itemId));
  };

  const cartSubtotal = storeCart.reduce((sum, item) => {
    return sum + (parseFloat(item.price.replace('$', '')) * item.quantity);
  }, 0);

  const handlePlaceOrder = () => {
    if (!checkoutForm.name || !checkoutForm.email || !checkoutForm.address || !checkoutForm.phone) {
      alert("Please complete all shipping details!");
      return;
    }
    setCheckoutStep(3); // Payment gateway simulation loader
  };

  const simulatePayment = () => {
    setTimeout(() => {
      const orderData = {
        customer: checkoutForm.name,
        email: checkoutForm.email,
        amount: `$${cartSubtotal.toFixed(2)}`,
        customFields: storeCart[0]?.customFields || {},
        items: storeCart.map(i => ({ name: i.name, price: i.price, quantity: i.quantity })),
        phone: checkoutForm.phone,
        address: checkoutForm.address,
        paymentMethod: checkoutForm.paymentMethod
      };
      
      const newOrderId = addOrder(biz.id, orderData);
      const generatedOrder = {
        id: newOrderId,
        date: "Today",
        status: "Paid",
        amount: `$${cartSubtotal.toFixed(2)}`,
        customer: checkoutForm.name,
        items: orderData.items,
        customFields: orderData.customFields
      };

      setActiveOrder(generatedOrder);
      setStoreCart([]);
      setCheckoutStep(4); // Success tracking page
    }, 2000);
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    addChatMessage(biz.id, { sender: 'customer', text: chatInput });
    setChatInput('');
  };

  // Dynamic Styles Mapping based on Active Theme
  const getThemeStyles = () => {
    switch (activeTheme) {
      case 'Minimal':
        return {
          bg: '#FFFFFF',
          text: '#000000',
          accent: '#000000',
          cardBg: '#FAFAFA',
          font: 'sans-serif',
          radius: '0px',
          shadow: 'none',
          gradient: 'linear-gradient(135deg, #000 0%, #000 100%)'
        };
      case 'Luxury':
        return {
          bg: '#FFFBF7',
          text: '#4A2C2A',
          accent: '#D4AF37',
          cardBg: '#FFFDFB',
          font: 'Georgia, serif',
          radius: '20px',
          shadow: '0 10px 30px rgba(212, 175, 55, 0.05)',
          gradient: 'linear-gradient(135deg, #D4AF37 0%, #AA7C11 100%)'
        };
      case 'Dark':
        return {
          bg: '#121212',
          text: '#F5F5F5',
          accent: '#FF2A54',
          cardBg: '#1E1E1E',
          font: 'var(--font-body)',
          radius: '16px',
          shadow: '0 10px 30px rgba(255, 42, 84, 0.1)',
          gradient: 'linear-gradient(135deg, #FF2A54 0%, #FF6B8B 100%)'
        };
      case 'Instagram-first':
        return {
          bg: '#FAFAFA',
          text: '#262626',
          accent: '#0095F6',
          cardBg: '#FFFFFF',
          font: 'sans-serif',
          radius: '8px',
          shadow: '0 4px 12px rgba(0,0,0,0.05)',
          gradient: 'linear-gradient(135deg, #E1306C 0%, #C13584 100%)'
        };
      default: // Modern
        return {
          bg: 'var(--color-cream)',
          text: 'var(--color-brown-dark)',
          accent: 'var(--color-pink)',
          cardBg: 'var(--color-white)',
          font: 'var(--font-body)',
          radius: '24px',
          shadow: 'var(--shadow-soft)',
          gradient: 'var(--gradient-pink)'
        };
    }
  };

  const s = getThemeStyles();

  return (
    <div style={{ background: '#ECEFF1', minHeight: '100vh', paddingTop: '150px', paddingBottom: '100px', fontFamily: s.font }}>
      <SaaSSandboxBanner businessId={biz.id} />
      
      {/* Dynamic Simulated Web Address Bar */}
      <div style={{ maxWidth: '600px', margin: '0 auto 2rem', background: '#37474F', color: 'white', borderRadius: '15px', padding: '0.8rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 10px 25px rgba(0,0,0,0.15)', border: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5722' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FFC107' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#4CAF50' }} />
        </div>
        <div style={{ background: '#263238', flex: 1, margin: '0 2rem', padding: '0.4rem 1rem', borderRadius: '8px', textAlign: 'center', fontSize: '0.85rem', fontWeight: 700, color: '#B0BEC5', letterSpacing: '0.5px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
          🔒 {biz.id}.platform.com
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <span style={{ fontSize: '0.65rem', background: 'var(--color-pink)', padding: '2px 8px', borderRadius: '20px', fontWeight: 900, color: 'white' }}>
            {biz.category}
          </span>
        </div>
      </div>

      {/* Floating Theme Selector Widget */}
      <div style={{ maxWidth: '600px', margin: '0 auto 2rem', background: 'white', borderRadius: '15px', padding: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center', justifyContent: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-brown)', marginRight: '0.5rem' }}>SELECT THEME LIVE:</span>
        {['Modern', 'Minimal', 'Luxury', 'Dark', 'Instagram-first'].map(themeName => (
          <button
            key={themeName}
            onClick={() => setActiveTheme(themeName)}
            style={{
              padding: '0.4rem 0.8rem',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: 800,
              background: activeTheme === themeName ? 'var(--gradient-pink)' : '#F5F5F5',
              color: activeTheme === themeName ? 'white' : 'var(--color-brown-dark)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {themeName}
          </button>
        ))}
      </div>

      {/* Main Simulated Store Container */}
      <div style={{ 
        maxWidth: '520px', 
        margin: '0 auto', 
        background: s.bg, 
        color: s.text, 
        minHeight: '80vh', 
        borderRadius: s.radius, 
        boxShadow: s.shadow, 
        overflow: 'hidden', 
        position: 'relative',
        border: activeTheme === 'Minimal' ? '2px solid black' : 'none',
        display: 'flex',
        flexDirection: 'column'
      }}>
        
        {/* Header Storefront */}
        <header style={{ 
          padding: '2rem 1.5rem', 
          borderBottom: activeTheme === 'Minimal' ? '2px solid black' : '1px solid rgba(122, 78, 58, 0.05)',
          background: s.cardBg,
          textAlign: activeTheme === 'Instagram-first' ? 'left' : 'center',
          position: 'relative'
        }}>
          {checkoutStep > 0 && (
            <button 
              onClick={() => setCheckoutStep(prev => prev === 4 ? 0 : prev - 1)}
              style={{ position: 'absolute', left: '1.5rem', top: '2.5rem', color: s.text, cursor: 'pointer' }}
            >
              <ArrowLeft size={22} />
            </button>
          )}

          {activeTheme === 'Instagram-first' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: s.gradient, padding: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.8rem', color: s.text }}>
                    {biz.name[0]}
                  </div>
                </div>
                <div>
                  <h1 style={{ fontSize: '1.3rem', margin: 0, fontWeight: 900 }}>{biz.name.replace(/\s+/g, '').toLowerCase()}</h1>
                  <span style={{ fontSize: '0.85rem', color: '#8e8e8e', fontWeight: 600 }}>Social Commerce Partner</span>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', fontSize: '0.85rem', fontWeight: 700 }}>
                    <span><b>{biz.products.length}</b> products</span>
                    <span><b>5.2k</b> followers</span>
                  </div>
                </div>
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>{biz.name}</div>
                <div style={{ fontSize: '0.85rem', color: '#262626', opacity: 0.9, lineHeight: 1.4 }}>
                  ✨ Official mobile storefront catalog <br />
                  🚀 Fast express shipping synced via {biz.deliveryProvider} <br />
                  💬 24/7 automated support bot integrated.
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                  <button onClick={() => setIsCartOpen(true)} style={{ flex: 1, background: '#dbdbdb', color: 'black', padding: '0.4rem 1rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 800 }}>View Cart ({storeCart.length})</button>
                  <button onClick={() => setIsChatOpen(true)} style={{ background: '#dbdbdb', color: 'black', padding: '0.4rem 0.8rem', borderRadius: '4px' }}><MessageSquare size={16} /></button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h1 style={{ 
                fontSize: activeTheme === 'Luxury' ? '2.4rem' : '1.8rem', 
                margin: '0 0 0.5rem', 
                fontWeight: 900,
                fontFamily: activeTheme === 'Luxury' ? 'Georgia, serif' : 'inherit'
              }}>
                {biz.name}
              </h1>
              <p style={{ margin: 0, opacity: 0.6, fontSize: '0.85rem', fontWeight: 700 }}>
                {biz.category} Boutique Social Catalog
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1rem' }}>
                <button onClick={() => setIsCartOpen(true)} style={{ color: s.accent, fontWeight: 900, display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}>
                  <ShoppingBag size={18} /> Cart ({storeCart.length})
                </button>
                <button onClick={() => setIsChatOpen(true)} style={{ color: s.text, opacity: 0.7, fontWeight: 800, fontSize: '0.9rem' }}>
                  Chat Support
                </button>
              </div>
            </div>
          )}
        </header>

        {/* Dynamic Pages renderer */}
        <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
          
          {/* STEP 0: CATALOG PAGE */}
          {checkoutStep === 0 && (
            <AnimatePresence>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                {biz.products.map(prod => (
                  <motion.div 
                    key={prod.id}
                    whileHover={{ y: -3 }}
                    onClick={() => setSelectedProduct(prod)}
                    style={{
                      background: s.cardBg,
                      borderRadius: s.radius,
                      overflow: 'hidden',
                      boxShadow: s.shadow,
                      border: activeTheme === 'Minimal' ? '2px solid black' : '1px solid rgba(122, 78, 58, 0.05)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <div style={{ overflow: 'hidden', aspectRatio: '1/1', position: 'relative' }}>
                      <img src={prod.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={prod.name} />
                      <div style={{ position: 'absolute', bottom: '8px', right: '8px', background: 'rgba(255,255,255,0.9)', padding: '2px 8px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 900, color: 'var(--color-brown-dark)' }}>
                        {prod.price}
                      </div>
                    </div>
                    <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <h3 style={{ margin: '0 0 0.4rem', fontSize: '0.95rem', fontWeight: 900 }}>{prod.name}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#FFD700', fontSize: '0.8rem', fontWeight: 800 }}>
                        <Star size={12} fill="#FFD700" /> {prod.rating || 4.8}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          )}

          {/* STEP 2: CHECKOUT SHIPPING INFO FORM */}
          {checkoutStep === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '1.5rem', textAlign: 'center' }}>Delivery & Checkout</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: s.cardBg, padding: '2rem 1.5rem', borderRadius: s.radius, border: activeTheme === 'Minimal' ? '2px solid black' : 'none', boxShadow: s.shadow }}>
                
                <div className="form-group">
                  <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.4rem' }}>FULL NAME</label>
                  <input 
                    type="text" 
                    placeholder="Alice Green" 
                    value={checkoutForm.name}
                    onChange={e => setCheckoutForm({...checkoutForm, name: e.target.value})}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid rgba(122, 78, 58, 0.2)', fontSize: '0.95rem', outline: 'none' }}
                  />
                </div>

                <div className="form-group">
                  <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.4rem' }}>EMAIL ADDRESS</label>
                  <input 
                    type="email" 
                    placeholder="alice@example.com" 
                    value={checkoutForm.email}
                    onChange={e => setCheckoutForm({...checkoutForm, email: e.target.value})}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid rgba(122, 78, 58, 0.2)', fontSize: '0.95rem', outline: 'none' }}
                  />
                </div>

                <div className="form-group">
                  <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.4rem' }}>PHONE NUMBER (FOR WHATSAPP NOTIF)</label>
                  <input 
                    type="tel" 
                    placeholder="+1 555 1234" 
                    value={checkoutForm.phone}
                    onChange={e => setCheckoutForm({...checkoutForm, phone: e.target.value})}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid rgba(122, 78, 58, 0.2)', fontSize: '0.95rem', outline: 'none' }}
                  />
                </div>

                <div className="form-group">
                  <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.4rem' }}>SHIPPING ADDRESS</label>
                  <textarea 
                    placeholder="123 Sweet Lane, City, State" 
                    value={checkoutForm.address}
                    onChange={e => setCheckoutForm({...checkoutForm, address: e.target.value})}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid rgba(122, 78, 58, 0.2)', fontSize: '0.95rem', outline: 'none', height: '80px', fontFamily: 'inherit' }}
                  />
                </div>

                <div className="form-group">
                  <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.6rem' }}>SELECT PAYMENT METHOD</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                    {['UPI', 'Razorpay', 'Stripe', 'COD'].map(method => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setCheckoutForm({...checkoutForm, paymentMethod: method})}
                        style={{
                          padding: '0.6rem',
                          borderRadius: '8px',
                          fontSize: '0.85rem',
                          fontWeight: 800,
                          border: checkoutForm.paymentMethod === method ? `2px solid ${s.accent}` : '1px solid rgba(122, 78, 58, 0.2)',
                          background: checkoutForm.paymentMethod === method ? `${s.accent}10` : 'transparent',
                          color: s.text,
                          cursor: 'pointer'
                        }}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={handlePlaceOrder}
                  style={{
                    background: s.gradient,
                    color: 'white',
                    padding: '1rem',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: 900,
                    fontSize: '1rem',
                    width: '100%',
                    cursor: 'pointer',
                    boxShadow: s.shadow,
                    marginTop: '1rem'
                  }}
                >
                  Pay ${(cartSubtotal).toFixed(2)}
                </button>

              </div>
            </motion.div>
          )}

          {/* STEP 3: HIGH FIDELITY PAYMENT GATEWAY SIMULATION */}
          {checkoutStep === 3 && (
            <div style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                style={{ width: '60px', height: '60px', border: `4px solid ${s.accent}20`, borderTop: `4px solid ${s.accent}`, borderRadius: '50%', margin: '0 auto 2.5rem' }}
              />
              <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1rem' }}>Simulating {checkoutForm.paymentMethod} Gateway</h2>
              <p style={{ opacity: 0.7, fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
                Executing automated transactional checkouts and triggering server webhooks to secure orders...
              </p>
              
              <button 
                onClick={simulatePayment}
                style={{ background: s.gradient, color: 'white', padding: '0.8rem 2rem', borderRadius: '25px', fontWeight: 900, cursor: 'pointer' }}
              >
                Confirm Payment Hook
              </button>
            </div>
          )}

          {/* STEP 4: TRACKING PAGE */}
          {checkoutStep === 4 && activeOrder && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#4CAF50', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 5px 15px rgba(76, 175, 80, 0.3)' }}>
                  <Check size={28} strokeWidth={3} />
                </div>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 900 }}>Payment Confirmed!</h2>
                <p style={{ opacity: 0.6, fontSize: '0.85rem', marginTop: '0.3rem' }}>Invoice: #{activeOrder.id} • Method: {checkoutForm.paymentMethod}</p>
              </div>

              {/* Order Status Progress Bar */}
              <div className="card" style={{ background: s.cardBg, padding: '2rem 1.5rem', borderRadius: s.radius, border: activeTheme === 'Minimal' ? '2px solid black' : '1px solid rgba(122, 78, 58, 0.05)', boxShadow: s.shadow, marginBottom: '2rem' }}>
                <h4 style={{ margin: '0 0 1.5rem', fontSize: '0.95rem', fontWeight: 800 }}>LIVE TRACKING</h4>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', marginBottom: '2rem' }}>
                  {/* Background progress bar */}
                  <div style={{ position: 'absolute', top: '12px', left: '5%', right: '5%', height: '4px', background: '#e0e0e0', zIndex: 1 }} />
                  <div style={{ position: 'absolute', top: '12px', left: '5%', width: '45%', height: '4px', background: s.accent, zIndex: 2 }} />

                  {[
                    { label: "Placed", active: true },
                    { label: biz.category === 'Cake' ? "Baking" : biz.category === 'Shoes' ? "Packing" : "Preparing", active: true },
                    { label: "Shipped", active: false },
                    { label: "Delivered", active: false }
                  ].map((prog, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 3 }}>
                      <div style={{ 
                        width: '24px', 
                        height: '24px', 
                        borderRadius: '50%', 
                        background: prog.active ? s.gradient : '#e0e0e0', 
                        border: '3px solid white', 
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                      }} />
                      <span style={{ fontSize: '0.7rem', fontWeight: 800, marginTop: '0.5rem', color: prog.active ? s.text : '#9e9e9e' }}>{prog.label}</span>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: '1px solid var(--color-cream)', paddingTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <AlertCircle size={18} color={s.accent} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, lineHeight: 1.4 }}>
                    Your order details have been synchronized. WhatsApp receipts were simulated to: <b>{checkoutForm.email}</b>.
                  </span>
                </div>
              </div>

              {/* Delivery Details card */}
              <div className="card" style={{ background: s.cardBg, padding: '2rem 1.5rem', borderRadius: s.radius, border: activeTheme === 'Minimal' ? '2px solid black' : '1px solid rgba(122, 78, 58, 0.05)', boxShadow: s.shadow }}>
                <h4 style={{ margin: '0 0 1.2rem', fontSize: '0.95rem', fontWeight: 800 }}>COURIER ENGINE</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, opacity: 0.8, marginBottom: '0.8rem' }}>
                  <span>Partner:</span>
                  <span style={{ color: s.accent }}>{biz.deliveryProvider}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, opacity: 0.8 }}>
                  <span>Transit Code:</span>
                  <span>{biz.id.toUpperCase()}-{(Math.random() * 10000).toFixed(0)}</span>
                </div>
              </div>

              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
                <button onClick={() => setCheckoutStep(0)} style={{ background: s.gradient, color: 'white', padding: '0.8rem 2.5rem', border: 'none', borderRadius: '20px', fontWeight: 900, cursor: 'pointer' }}>
                  Return to Store
                </button>
              </div>

            </motion.div>
          )}

        </div>

        {/* CUSTOM PRODUCT ADD PANEL */}
        <AnimatePresence>
          {selectedProduct && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProduct(null)}
                style={{ position: 'absolute', inset: 0, background: 'black', zIndex: 1500 }}
              />
              <motion.div 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  maxHeight: '85%',
                  background: s.cardBg,
                  borderTopLeftRadius: '25px',
                  borderTopRightRadius: '25px',
                  boxShadow: '0 -15px 40px rgba(0,0,0,0.15)',
                  zIndex: 1600,
                  padding: '2rem 1.5rem',
                  overflowY: 'auto',
                  border: activeTheme === 'Minimal' ? '2px solid black' : 'none'
                }}
              >
                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
                  <img src={selectedProduct.image} style={{ width: '90px', height: '90px', borderRadius: '12px', objectFit: 'cover' }} />
                  <div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 900, margin: '0 0 0.4rem' }}>{selectedProduct.name}</h2>
                    <span style={{ fontSize: '1.4rem', fontWeight: 900, color: s.accent }}>{selectedProduct.price}</span>
                  </div>
                </div>

                {/* DYNAMIC FORMS INTEGRATOR */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
                  <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 900, color: s.accent, letterSpacing: '1px' }}>CUSTOM OPTIONS</h4>
                  
                  {biz.fields.map(field => (
                    <div key={field.id} className="form-group">
                      <label style={{ display: 'block', fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                        {field.name} {field.required && <span style={{ color: 'red' }}>*</span>}
                      </label>
                      
                      {field.type === 'Dropdown' && (
                        <select 
                          value={customFieldValues[field.id] || ''}
                          onChange={e => setCustomFieldValues({...customFieldValues, [field.id]: e.target.value})}
                          style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid rgba(122, 78, 58, 0.2)', fontSize: '0.95rem', background: 'white' }}
                        >
                          {field.options.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      )}

                      {field.type === 'Text' && (
                        <input 
                          type="text" 
                          placeholder={field.placeholder || "Enter details..."}
                          value={customFieldValues[field.id] || ''}
                          onChange={e => setCustomFieldValues({...customFieldValues, [field.id]: e.target.value})}
                          style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid rgba(122, 78, 58, 0.2)', fontSize: '0.95rem', outline: 'none' }}
                        />
                      )}

                      {field.type === 'Date picker' && (
                        <input 
                          type="date" 
                          value={customFieldValues[field.id] || ''}
                          onChange={e => setCustomFieldValues({...customFieldValues, [field.id]: e.target.value})}
                          style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid rgba(122, 78, 58, 0.2)', fontSize: '0.95rem', outline: 'none' }}
                        />
                      )}

                      {field.type === 'Upload' && (
                        <div style={{ border: '2px dashed rgba(122, 78, 58, 0.2)', padding: '1rem', borderRadius: '10px', textAlign: 'center', background: 'rgba(255,255,255,0.5)' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 700, opacity: 0.6 }}>📷 Simulated Image Attachment Active</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button onClick={() => setSelectedProduct(null)} className="btn-secondary" style={{ flex: 1 }}>Cancel</button>
                  <button 
                    onClick={handleAddToCart}
                    style={{
                      background: s.gradient,
                      color: 'white',
                      padding: '0.8rem',
                      borderRadius: '12px',
                      border: 'none',
                      fontWeight: 900,
                      flex: 1.5,
                      cursor: 'pointer'
                    }}
                  >
                    Add to Cart
                  </button>
                </div>

              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* CUSTOMER CART DRAWER */}
        <AnimatePresence>
          {isCartOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCartOpen(false)}
                style={{ position: 'absolute', inset: 0, background: 'black', zIndex: 1500 }}
              />
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  width: '85%',
                  background: s.cardBg,
                  boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
                  zIndex: 1600,
                  padding: '2rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  borderLeft: activeTheme === 'Minimal' ? '2px solid black' : 'none'
                }}
              >
                <h2 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Shopping Cart</span>
                  <button onClick={() => setIsCartOpen(false)} style={{ color: s.text }}>×</button>
                </h2>

                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {storeCart.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem 0', opacity: 0.5, fontWeight: 700 }}>Your cart is empty.</div>
                  ) : (
                    storeCart.map(item => (
                      <div key={item.id} style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--color-cream)', paddingBottom: '1rem' }}>
                        <img src={item.image} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                        <div style={{ flex: 1 }}>
                          <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 800 }}>{item.name}</h4>
                          <span style={{ fontSize: '0.95rem', fontWeight: 800, color: s.accent }}>{item.price}</span>
                          
                          {/* Selected Custom Variables Details */}
                          <div style={{ marginTop: '4px', fontSize: '0.75rem', opacity: 0.7, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            {Object.entries(item.customFields).map(([k, v]) => (
                              <div key={k}><b>{k}:</b> {v || 'N/A'}</div>
                            ))}
                          </div>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} style={{ color: '#F44336' }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {storeCart.length > 0 && (
                  <div style={{ borderTop: '2px solid var(--color-cream)', paddingTop: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 900, fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                      <span>Subtotal:</span>
                      <span>${cartSubtotal.toFixed(2)}</span>
                    </div>
                    <button 
                      onClick={() => {
                        setIsCartOpen(false);
                        setCheckoutStep(2);
                      }}
                      style={{
                        background: s.gradient,
                        color: 'white',
                        padding: '1rem',
                        border: 'none',
                        borderRadius: '12px',
                        fontWeight: 900,
                        width: '100%',
                        cursor: 'pointer'
                      }}
                    >
                      Checkout Now
                    </button>
                  </div>
                )}

              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* INTEGRATED CUSTOMER LIVE CHAT DRAWER */}
        <AnimatePresence>
          {isChatOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsChatOpen(false)}
                style={{ position: 'absolute', inset: 0, background: 'black', zIndex: 1700 }}
              />
              <motion.div 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '75%',
                  background: s.cardBg,
                  borderTopLeftRadius: '25px',
                  borderTopRightRadius: '25px',
                  boxShadow: '0 -10px 30px rgba(0,0,0,0.1)',
                  zIndex: 1800,
                  padding: '2rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  border: activeTheme === 'Minimal' ? '2px solid black' : 'none'
                }}
              >
                <h3 style={{ fontSize: '1.2rem', fontWeight: 900, margin: '0 0 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Support Chat - {biz.name}</span>
                  <button onClick={() => setIsChatOpen(false)} style={{ color: s.text }}>×</button>
                </h3>

                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                  {biz.chats.map(chat => (
                    <div 
                      key={chat.id} 
                      style={{ 
                        alignSelf: chat.sender === 'customer' ? 'flex-end' : 'flex-start',
                        background: chat.sender === 'customer' ? s.accent : '#F5F5F5',
                        color: chat.sender === 'customer' ? 'white' : '#263238',
                        padding: '0.6rem 1rem',
                        borderRadius: '12px',
                        maxWidth: '80%',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        lineHeight: 1.4
                      }}
                    >
                      {chat.text}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendChat} style={{ display: 'flex', gap: '8px' }}>
                  <input 
                    type="text" 
                    placeholder="Ask about sizes, customizations..." 
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    style={{ flex: 1, padding: '0.8rem', borderRadius: '10px', border: '1px solid rgba(122, 78, 58, 0.2)', fontSize: '0.9rem', outline: 'none' }}
                  />
                  <button type="submit" style={{ background: s.gradient, color: 'white', padding: '0.8rem', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Send size={18} />
                  </button>
                </form>

              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default TenantStorefront;
