import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Package, MapPin, Settings, LogOut, ChevronRight, 
  Shield, Heart, Plus, Trash2, Home, ShoppingCart, 
  CreditCard, Sparkles, Zap, MessageSquare, ClipboardList, Edit3,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { useTenant } from '../context/TenantContext';
import { useNavigate, useLocation } from 'react-router-dom';

const ProfilePage = () => {
  const { user, switchRole, isAdmin } = useAuth();
  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();
  const { businesses, updateBusiness } = useTenant();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const fromSaaS = queryParams.get('from') === 'saas' || isAdmin;

  // Retrieve active merchant business if the user is an admin
  const activeBizId = user?.businessId || 'cakeflow';
  const activeBiz = businesses[activeBizId] || businesses['cakeflow'];

  // Initialize activeSection based on role
  const [activeSection, setActiveSection] = useState(isAdmin ? 'subscription' : 'orders');
  
  // Real customer orders from localStorage
  const [orders, setOrders] = useState([]);
  // Addresses state
  const [addresses, setAddresses] = useState([]);
  // Address form toggle
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({ street: '', city: '', zip: '' });
  
  // Mobile responsive state
  const [isMobile, setIsMobile] = useState(false);

  // Dynamic Theme Tokens
  const theme = fromSaaS ? {
    primary: '#4F46E5', // indigo
    primaryGradient: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
    bg: '#F8FAFC', // slate 50
    cardBg: '#FFFFFF',
    textDark: '#0F172A',
    textMuted: '#64748B',
    avatarBg: '#EEF2F6', // light slate/indigo
    avatarIcon: '#4F46E5',
    tabActiveBg: '#EEF2F6', // light gray
    tabActiveText: '#4F46E5',
    borderColor: '#E2E8F0',
    shadow: '0 10px 25px rgba(15, 23, 42, 0.05)',
    btnHover: '#4338CA',
    sandboxBadgeBg: 'rgba(79, 70, 229, 0.12)',
    btnPrimaryBg: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
    btnPrimaryText: 'white'
  } : {
    primary: 'var(--color-pink)',
    primaryGradient: 'var(--gradient-pink)',
    bg: 'var(--color-cream)',
    cardBg: '#FFFFFF',
    textDark: 'var(--color-brown-dark)',
    textMuted: 'var(--color-brown)',
    avatarBg: 'var(--color-cream)',
    avatarIcon: 'var(--color-pink)',
    tabActiveBg: 'var(--color-cream)',
    tabActiveText: 'var(--color-pink)',
    borderColor: 'rgba(122, 78, 58, 0.15)',
    shadow: 'var(--shadow-medium)',
    btnHover: 'var(--color-brown-dark)',
    sandboxBadgeBg: 'rgba(242, 140, 163, 0.12)',
    btnPrimaryBg: 'var(--color-pink)',
    btnPrimaryText: 'white'
  };

  useEffect(() => {
    // Handle mobile responsive tracking
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    handleResize();
    window.addEventListener('resize', handleResize);

    try {
      const savedOrders = JSON.parse(localStorage.getItem('cake_orders') || '[]');
      setOrders(savedOrders);

      const savedAddresses = JSON.parse(localStorage.getItem('cake_addresses') || '[]');
      if (savedAddresses.length === 0) {
        // Initial seed addresses
        const initial = [
          { id: 1, street: '456 Artisan Avenue, Apt 12B', city: 'Sweet City, NY', zip: '10001' },
          { id: 2, street: '789 Sugar Blvd', city: 'Bakersville, CA', zip: '90210' }
        ];
        localStorage.setItem('cake_addresses', JSON.stringify(initial));
        setAddresses(initial);
      } else {
        setAddresses(savedAddresses);
      }
    } catch(e) {
      console.error(e);
    }

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newAddress.street || !newAddress.city || !newAddress.zip) {
      alert("Please fill out all address fields.");
      return;
    }
    const updated = [
      ...addresses,
      { id: Date.now(), ...newAddress }
    ];
    setAddresses(updated);
    localStorage.setItem('cake_addresses', JSON.stringify(updated));
    setNewAddress({ street: '', city: '', zip: '' });
    setShowAddAddress(false);
  };

  const handleDeleteAddress = (id) => {
    const updated = addresses.filter(addr => addr.id !== id);
    setAddresses(updated);
    localStorage.setItem('cake_addresses', JSON.stringify(updated));
  };

  const handleReorder = (orderItems) => {
    if (!orderItems || orderItems.length === 0) return;
    orderItems.forEach(item => {
      addToCart(item);
    });
    alert("Sweet! All items from this order have been added back to your cart.");
    navigate('/cart');
  };

  // Dynamic cost calculations in Indian Rupees (₹) for Merchant Billing Details
  const getAdminBillingDetails = (b) => {
    if (!b?.isSubscribed) {
      return { baseHosting: 0, featuresCost: 0, msgCount: 0, totalMsgCost: 0, subtotal: 0, tax: 0, total: 0 };
    }
    const baseHosting = 199;
    let featuresCost = 0;
    const selectedFeatures = b.additionalFeatures || [];
    
    if (selectedFeatures.includes('Advanced Custom Fields Builder')) featuresCost += 150;
    if (selectedFeatures.includes('AI Chatbot Automation')) featuresCost += 250;
    if (selectedFeatures.includes('Shipping Integration')) featuresCost += 300;
    if (selectedFeatures.includes('Advanced Styling Themes')) featuresCost += 100;
    if (selectedFeatures.includes('Commission-Free Sales')) featuresCost += 200;

    const msgCount = Math.max(200, b.whatsappMessagesCount || 200);
    const baseMsgCost = 100;
    const extraMsgBlocks = Math.max(0, Math.floor((msgCount - 200) / 50));
    const extraMsgCost = extraMsgBlocks * 25;
    const totalMsgCost = baseMsgCost + extraMsgCost;

    const subtotal = baseHosting + featuresCost + totalMsgCost;
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + tax;

    return { baseHosting, featuresCost, msgCount, totalMsgCost, subtotal, tax, total };
  };

  const adminBilling = getAdminBillingDetails(activeBiz);

  return (
    <div style={{ padding: '120px 5% 6rem', maxWidth: '1200px', margin: '0 auto' }}>
      <style>{`
        .profile-grid {
          display: grid;
          grid-template-columns: 1fr 2.5fr;
          gap: 4rem;
        }
        @media (max-width: 968px) {
          .profile-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .profile-sidebar {
            position: relative !important;
            top: 0 !important;
          }
        }
      `}</style>
      <div className="profile-grid">
        
        {/* Profile Sidebar */}
        <div className="profile-sidebar" style={{ position: 'sticky', top: '120px' }}>
          <div className="card" style={{ padding: '2.5rem', textAlign: 'center', background: theme.cardBg, border: `1px solid ${theme.borderColor}`, borderRadius: '24px', boxShadow: theme.shadow }}>
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: theme.avatarBg, margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2.5px solid ${activeBiz?.brandColor || theme.primary}` }}>
              <User size={60} color={activeBiz?.brandColor || theme.avatarIcon} />
            </div>
            
            {/* Conditional Title based on Role */}
            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: theme.textDark, marginBottom: '0.4rem', letterSpacing: '-0.5px' }}>
              {isAdmin ? (activeBiz?.name || "Merchant Operator") : "Sarah Johnson"}
            </h2>
            <p style={{ color: theme.textMuted, opacity: 0.8, fontWeight: 700, fontSize: '0.8rem', marginBottom: '2rem', textTransform: 'lowercase' }}>
              {isAdmin ? `${activeBiz?.id || 'admin'}@shopflow.io` : "sarah.j@example.com"}
            </p>
            
            {/* TABS SELECTORS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '2rem', textAlign: 'left' }}>
              
              {/* ADMIN ACCOUNT SPECIFIC TABS */}
              {isAdmin ? (
                <>
                  <button 
                    onClick={() => setActiveSection('subscription')} 
                    style={{ 
                      padding: '0.8rem 1.2rem', 
                      borderRadius: '12px', 
                      border: 'none', 
                      background: activeSection === 'subscription' ? theme.tabActiveBg : 'none', 
                      color: activeSection === 'subscription' ? theme.tabActiveText : theme.textMuted, 
                      fontWeight: 800, 
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.8rem',
                      fontSize: '0.85rem',
                      transition: 'all 0.2s'
                    }}
                  >
                    <CreditCard size={18} /> SaaS Subscription
                  </button>

                  <button 
                    onClick={() => setActiveSection('blueprint')} 
                    style={{ 
                      padding: '0.8rem 1.2rem', 
                      borderRadius: '12px', 
                      border: 'none', 
                      background: activeSection === 'blueprint' ? theme.tabActiveBg : 'none', 
                      color: activeSection === 'blueprint' ? theme.tabActiveText : theme.textMuted, 
                      fontWeight: 800, 
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.8rem',
                      fontSize: '0.85rem',
                      transition: 'all 0.2s'
                    }}
                  >
                    <Sparkles size={18} /> Business Blueprint
                  </button>

                  <button 
                    onClick={() => setActiveSection('merchant_orders')} 
                    style={{ 
                      padding: '0.8rem 1.2rem', 
                      borderRadius: '12px', 
                      border: 'none', 
                      background: activeSection === 'merchant_orders' ? theme.tabActiveBg : 'none', 
                      color: activeSection === 'merchant_orders' ? theme.tabActiveText : theme.textMuted, 
                      fontWeight: 800, 
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.8rem',
                      fontSize: '0.85rem',
                      transition: 'all 0.2s'
                    }}
                  >
                    <Package size={18} /> Shop Order Queue ({activeBiz?.orders?.length || 0})
                  </button>
                </>
              ) : (
                /* REGULAR CUSTOMER TABS */
                <>
                  <button 
                    onClick={() => setActiveSection('orders')} 
                    style={{ 
                      padding: '0.8rem 1.2rem', 
                      borderRadius: '12px', 
                      border: 'none', 
                      background: activeSection === 'orders' ? theme.tabActiveBg : 'none', 
                      color: activeSection === 'orders' ? theme.tabActiveText : theme.textMuted, 
                      fontWeight: 800, 
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.8rem',
                      fontSize: '0.85rem',
                      transition: 'all 0.2s'
                    }}
                  >
                    <Package size={18} /> Order History
                  </button>
                  
                  <button 
                    onClick={() => setActiveSection('addresses')} 
                    style={{ 
                      padding: '0.8rem 1.2rem', 
                      borderRadius: '12px', 
                      border: 'none', 
                      background: activeSection === 'addresses' ? theme.tabActiveBg : 'none', 
                      color: activeSection === 'addresses' ? theme.tabActiveText : theme.textMuted, 
                      fontWeight: 800, 
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.8rem',
                      fontSize: '0.85rem',
                      transition: 'all 0.2s'
                    }}
                  >
                    <MapPin size={18} /> Saved Addresses
                  </button>

                  <button 
                    onClick={() => setActiveSection('favorites')} 
                    style={{ 
                      padding: '0.8rem 1.2rem', 
                      borderRadius: '12px', 
                      border: 'none', 
                      background: activeSection === 'favorites' ? theme.tabActiveBg : 'none', 
                      color: activeSection === 'favorites' ? theme.tabActiveText : theme.textMuted, 
                      fontWeight: 800, 
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.8rem',
                      fontSize: '0.85rem',
                      transition: 'all 0.2s'
                    }}
                  >
                    <Heart size={18} /> My Favorites ({favorites.length})
                  </button>
                </>
              )}

              <button 
                onClick={() => setActiveSection('operator')} 
                style={{ 
                  padding: '0.8rem 1.2rem', 
                  borderRadius: '12px', 
                  border: 'none', 
                  background: activeSection === 'operator' ? theme.tabActiveBg : 'none', 
                  color: activeSection === 'operator' ? theme.tabActiveText : theme.textMuted, 
                  fontWeight: 800, 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  fontSize: '0.85rem',
                  transition: 'all 0.2s'
                }}
              >
                <Shield size={18} /> Operator Suite
              </button>
            </div>

            {/* Operator Control Panels */}
            <div style={{ 
              borderTop: `1px solid ${theme.borderColor}`, 
              paddingTop: '1.2rem', 
              marginTop: '1.2rem', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '0.6rem',
              textAlign: 'left'
            }}>
              <span style={{ 
                fontSize: '0.7rem', 
                fontWeight: 800, 
                color: theme.textMuted, 
                opacity: 0.6, 
                textTransform: 'uppercase', 
                paddingLeft: '0.4rem',
                display: 'block'
              }}>
                Operator Portals
              </span>

              <button 
                onClick={() => {
                  switchRole('admin', activeBizId);
                  navigate('/admin');
                }}
                style={{ 
                  width: '100%', 
                  padding: '0.8rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  gap: '0.5rem', 
                  fontWeight: 900,
                  background: theme.primaryGradient,
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  boxShadow: theme.shadow,
                  transition: 'all 0.2s'
                }}
              >
                <Shield size={14} /> Tenant Admin Portal
              </button>

              <button 
                onClick={() => {
                  switchRole('admin', activeBizId);
                  navigate('/super-admin');
                }}
                style={{ 
                  width: '100%', 
                  padding: '0.8rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  gap: '0.5rem', 
                  fontWeight: 900,
                  background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  boxShadow: '0 4px 12px rgba(15, 23, 42, 0.15)',
                  transition: 'all 0.2s'
                }}
              >
                <Shield size={14} /> Super Admin Dashboard
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div style={{ background: theme.cardBg, border: `1px solid ${theme.borderColor}`, borderRadius: '32px', padding: isMobile ? '2rem 1.5rem' : '3.5rem', boxShadow: theme.shadow }}>
          
          <AnimatePresence mode="wait">
            
            {/* MERCHANT SaaS SUBSCRIPTION ACCOUNT STATUS (New Admin Page requirement) */}
            {activeSection === 'subscription' && (
              <motion.div 
                key="subscription"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
              >
                <div>
                  <h2 style={{ fontSize: '2.2rem', fontWeight: 950, marginBottom: '0.2rem', color: theme.textDark, letterSpacing: '-0.8px' }}>
                    SaaS Subscription Dashboard
                  </h2>
                  <p style={{ color: theme.textMuted, fontSize: '0.85rem', margin: 0, fontWeight: 550 }}>
                    Oversee active billing costs, messaging quota allocations, and storefront integrations.
                  </p>
                </div>

                {/* Subscribed Status Banner */}
                <div style={{ 
                  background: activeBiz?.isSubscribed ? 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)' : '#FFF1F2', 
                  border: `1.5px solid ${activeBiz?.isSubscribed ? '#10B981' : '#F43F5E'}`,
                  color: activeBiz?.isSubscribed ? '#065F46' : '#9F1239',
                  padding: '1.2rem 1.5rem',
                  borderRadius: '18px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <ShieldCheck size={18} />
                      <span>Status: {activeBiz?.isSubscribed ? "Active Subscription" : "Sandbox Period"}</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', opacity: 0.85, fontWeight: 650, display: 'block', marginTop: '3px' }}>
                      {activeBiz?.isSubscribed 
                        ? `Pro features fully provisioned on multi-tenant workspace /store/${activeBiz.id}` 
                        : "Gated admin console barrier active. Acquire Operator Plan to publish catalog."}
                    </span>
                  </div>
                  <div style={{ background: activeBiz?.isSubscribed ? '#10B981' : '#F43F5E', color: 'white', fontWeight: 900, fontSize: '0.7rem', padding: '4px 12px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {activeBiz?.isSubscribed ? "Subscribed" : "Gated"}
                  </div>
                </div>

                {/* Ledger & cost calculation breakdown card */}
                {activeBiz?.isSubscribed && (
                  <div style={{ background: '#0F172A', color: 'white', borderRadius: '22px', padding: '2rem', boxShadow: '0 10px 25px rgba(15,23,42,0.1)' }}>
                    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1rem', marginBottom: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <CreditCard size={18} color="#60A5FA" /> Itemized Bill Calculator
                      </h4>
                      <span style={{ color: '#94A3B8', fontSize: '0.75rem', fontWeight: 800 }}>Invoice Category: Custom Plan</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', fontSize: '0.8rem', opacity: 0.9 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ opacity: 0.75 }}>Core Storefront:</span>
                        <span>₹{adminBilling.baseHosting}/mo</span>
                      </div>
                      
                      {activeBiz.additionalFeatures?.map(feat => {
                        let fPrice = 150;
                        if (feat === 'AI Chatbot Automation') fPrice = 250;
                        if (feat === 'Shipping Integration') fPrice = 300;
                        if (feat === 'Advanced Styling Themes') fPrice = 100;
                        if (feat === 'Commission-Free Sales') fPrice = 200;
                        return (
                          <div key={feat} style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '8px', borderLeft: '1.5px solid rgba(255,255,255,0.15)' }}>
                            <span style={{ opacity: 0.65 }}>+ {feat}:</span>
                            <span>₹{fPrice}/mo</span>
                          </div>
                        );
                      })}
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ opacity: 0.75 }}>Messages ({adminBilling.msgCount} msgs):</span>
                        <span>₹{adminBilling.totalMsgCost}/mo</span>
                      </div>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.6rem', marginTop: '0.3rem', fontWeight: 800 }}>
                        <span>Subtotal:</span>
                        <span>₹{adminBilling.subtotal}</span>
                      </div>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ opacity: 0.75 }}>GST Tax (18%):</span>
                        <span>₹{adminBilling.tax}</span>
                      </div>
                    </div>

                    <div style={{ borderTop: '2px dashed rgba(255,255,255,0.12)', paddingTop: '1rem', marginTop: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 900 }}>Total Billed:</span>
                      <span style={{ fontSize: '1.8rem', fontWeight: 950, color: '#60A5FA' }}>
                        ₹{adminBilling.total}
                        <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 800 }}> / mo</span>
                      </span>
                    </div>
                  </div>
                )}

                {/* Social Message Quota Usage limit progress card */}
                <div style={{ border: `1.5px solid ${theme.borderColor}`, padding: '1.8rem', borderRadius: '22px', background: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 900, color: theme.textDark, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Zap size={18} color="#F59E0B" /> Social Message Quota Limit
                      </h4>
                      <span style={{ fontSize: '0.7rem', color: theme.textMuted, fontWeight: 650, display: 'block', marginTop: '2px' }}>Includes automated WhatsApp templates and AI auto-replies.</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '1.25rem', fontWeight: 950, color: theme.primary }}>
                        {activeBiz?.messagesUsed || 0}
                        <span style={{ fontSize: '0.75rem', color: theme.textMuted, fontWeight: 700 }}> / {activeBiz?.whatsappMessagesCount || 200}</span>
                      </span>
                      <span style={{ fontSize: '0.62rem', display: 'block', color: '#10B981', fontWeight: 800 }}>Quota Active</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {activeBiz && (
                    <div style={{ width: '100%', height: '10px', background: '#EEF2F6', borderRadius: '100px', overflow: 'hidden', marginTop: '0.2rem' }}>
                      <div style={{ 
                        width: `${Math.min(100, (((activeBiz.messagesUsed || 0) / (activeBiz.whatsappMessagesCount || 200)) * 100))}%`, 
                        height: '100%', 
                        background: theme.primaryGradient,
                        borderRadius: '100px'
                      }} />
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', fontWeight: 700, color: theme.textMuted, opacity: 0.8, borderTop: `1px solid ${theme.borderColor}`, paddingTop: '0.8rem', marginTop: '0.4rem' }}>
                    <span>Remaining messages: {Math.max(0, (activeBiz?.whatsappMessagesCount || 200) - (activeBiz?.messagesUsed || 0))} msgs</span>
                    <button
                      type="button"
                      onClick={() => alert("🎉 Quota top-up successful! Simulated +100 WhatsApp messages added.")}
                      style={{ border: 'none', background: 'none', color: theme.primary, fontWeight: 900, cursor: 'pointer', fontSize: '0.72rem', textDecoration: 'underline' }}
                    >
                      + Top Up Message Quota
                    </button>
                  </div>
                </div>

                {/* Custom Checkout Options badges */}
                <div style={{ border: `1.5px solid ${theme.borderColor}`, padding: '1.8rem', borderRadius: '22px', background: '#FFFFFF' }}>
                  <h4 style={{ margin: '0 0 0.8rem', fontSize: '1rem', fontWeight: 900, color: theme.textDark, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ClipboardList size={18} color={theme.primary} /> Storefront Custom Requirements
                  </h4>
                  <p style={{ fontSize: '0.75rem', color: theme.textMuted, margin: '0 0 1rem 0', fontWeight: 550 }}>
                    These dynamically injected checkout parameters are active on customer purchases inside your shop instance.
                  </p>

                  {activeBiz?.fields && activeBiz.fields.length > 0 ? (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {activeBiz.fields.map((f, i) => (
                        <span key={i} style={{ background: 'rgba(79, 70, 229, 0.08)', color: '#4F46E5', padding: '4px 12px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 800 }}>
                          {f.name} ({f.type})
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span style={{ fontSize: '0.75rem', color: theme.textMuted, fontStyle: 'italic' }}>No custom requirement parameters configured yet.</span>
                  )}
                </div>
              </motion.div>
            )}

            {/* MERCHANT BUSINESS BLUEPRINT SPECIFICATIONS */}
            {activeSection === 'blueprint' && (
              <motion.div 
                key="blueprint"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
              >
                <div>
                  <h2 style={{ fontSize: '2.2rem', fontWeight: 950, marginBottom: '0.2rem', color: theme.textDark, letterSpacing: '-0.8px' }}>
                    Business Blueprint Specs
                  </h2>
                  <p style={{ color: theme.textMuted, fontSize: '0.85rem', margin: 0, fontWeight: 550 }}>
                    Confirm the custom parameters used to initialize your bespoke ShopFlow tenant workspace.
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: '#F8FAFC', border: `1.5px solid ${theme.borderColor}`, padding: '2rem', borderRadius: '24px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', borderBottom: `1px solid ${theme.borderColor}`, paddingBottom: '1.2rem' }}>
                    <div>
                      <span style={{ fontSize: '0.65rem', fontWeight: 800, color: theme.textMuted, textTransform: 'uppercase' }}>Business Name</span>
                      <div style={{ fontWeight: 800, fontSize: '1rem', color: theme.textDark, marginTop: '2px' }}>{activeBiz?.name}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.65rem', fontWeight: 800, color: theme.textMuted, textTransform: 'uppercase' }}>Store Tagline</span>
                      <div style={{ fontWeight: 800, fontSize: '1rem', color: theme.textDark, marginTop: '2px' }}>{activeBiz?.tagline || "N/A"}</div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.2rem', borderBottom: `1px solid ${theme.borderColor}`, paddingBottom: '1.2rem' }}>
                    <div>
                      <span style={{ fontSize: '0.65rem', fontWeight: 800, color: theme.textMuted, textTransform: 'uppercase' }}>Preferred Theme Template</span>
                      <div style={{ fontWeight: 800, fontSize: '1rem', color: theme.textDark, marginTop: '2px' }}>{activeBiz?.theme || "Modern Premium"}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.65rem', fontWeight: 800, color: theme.textMuted, textTransform: 'uppercase' }}>Brand Accent Color</span>
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginTop: '2px' }}>
                        <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: activeBiz?.brandColor || theme.primary }} />
                        <span style={{ fontWeight: 900, fontFamily: 'monospace', fontSize: '0.85rem', color: theme.textDark }}>{activeBiz?.brandColor || "#4F46E5"}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ borderBottom: `1px solid ${theme.borderColor}`, paddingBottom: '1.2rem' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 800, color: theme.textMuted, textTransform: 'uppercase' }}>Target Customer Demographics</span>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: theme.textDark, marginTop: '2px', lineHeight: 1.4 }}>{activeBiz?.targetAudience || "Standard custom sandbox consumer audience."}</div>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.65rem', fontWeight: 800, color: theme.textMuted, textTransform: 'uppercase' }}>Describe Store Requirements</span>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: theme.textDark, marginTop: '2px', lineHeight: 1.4 }}>{activeBiz?.customRequirements || "No specific requirement notes submitted."}</div>
                  </div>

                  {/* Step 6 Bespoke Answers Gating */}
                  {activeBiz?.customAnswers && (
                    <div style={{ borderTop: `2px dashed ${theme.borderColor}`, marginTop: '1rem', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 900, color: theme.primary, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Bespoke Enterprise Specs:</span>
                      
                      {activeBiz.customAnswers.sellType && (
                        <div>
                          <span style={{ fontSize: '0.62rem', fontWeight: 800, color: theme.textMuted, display: 'block' }}>WHAT DO YOU SELL?</span>
                          <span style={{ fontSize: '0.85rem', color: theme.textDark, fontWeight: 700 }}>{activeBiz.customAnswers.sellType}</span>
                        </div>
                      )}

                      {activeBiz.customAnswers.pagesNeeded && (
                        <div>
                          <span style={{ fontSize: '0.62rem', fontWeight: 800, color: theme.textMuted, display: 'block' }}>REQUIRED STOREFRONT PAGES</span>
                          <span style={{ fontSize: '0.85rem', color: theme.textDark, fontWeight: 700 }}>{activeBiz.customAnswers.pagesNeeded}</span>
                        </div>
                      )}

                      {activeBiz.customAnswers.orderingFlow && (
                        <div>
                          <span style={{ fontSize: '0.62rem', fontWeight: 800, color: theme.textMuted, display: 'block' }}>CUSTOM ORDERING WORKFLOW</span>
                          <span style={{ fontSize: '0.85rem', color: theme.textDark, fontWeight: 700 }}>{activeBiz.customAnswers.orderingFlow}</span>
                        </div>
                      )}

                      {activeBiz.customAnswers.customerJourney && (
                        <div>
                          <span style={{ fontSize: '0.62rem', fontWeight: 800, color: theme.textMuted, display: 'block' }}>EXPECTED CUSTOMER JOURNEY</span>
                          <span style={{ fontSize: '0.85rem', color: theme.textDark, fontWeight: 700 }}>{activeBiz.customAnswers.customerJourney}</span>
                        </div>
                      )}

                      {activeBiz.customAnswers.referenceExamples && (
                        <div>
                          <span style={{ fontSize: '0.62rem', fontWeight: 800, color: theme.textMuted, display: 'block' }}>REFERENCE BUSINESS EXAMPLES</span>
                          <span style={{ fontSize: '0.85rem', color: theme.textDark, fontWeight: 700 }}>{activeBiz.customAnswers.referenceExamples}</span>
                        </div>
                      )}

                      {activeBiz.customAnswers.workflowNotes && (
                        <div>
                          <span style={{ fontSize: '0.62rem', fontWeight: 800, color: theme.textMuted, display: 'block' }}>INTEGRATIONS & CRM PLUGINS</span>
                          <span style={{ fontSize: '0.85rem', color: theme.textDark, fontWeight: 700 }}>{activeBiz.customAnswers.workflowNotes}</span>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              </motion.div>
            )}

            {/* MERCHANT INCOMING CUSTOMER ORDERS QUEUE (Admin Tracking view) */}
            {activeSection === 'merchant_orders' && (
              <motion.div 
                key="merchant_orders"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
              >
                <div style={{ marginBottom: '2.5rem' }}>
                  <h2 style={{ fontSize: '2.2rem', fontWeight: 950, marginBottom: '0.2rem', color: theme.textDark, letterSpacing: '-0.8px' }}>
                    Shop Order Queue
                  </h2>
                  <p style={{ color: theme.textMuted, fontSize: '0.85rem', margin: 0, fontWeight: 550 }}>
                    Oversee incoming customer order parameters transacted inside your sandbox store.
                  </p>
                </div>

                {!activeBiz?.orders || activeBiz.orders.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                    <Package size={60} color={theme.primary} style={{ marginBottom: '1.5rem', opacity: 0.4 }} />
                    <p style={{ color: theme.textMuted, fontSize: '1.2rem', fontWeight: 600 }}>No customer orders placed in this store yet.</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {activeBiz.orders.map((order, idx) => (
                      <div key={order.id || idx} className="card" style={{ padding: '2rem', border: `1px solid ${theme.borderColor}`, background: '#F8FAFC', borderRadius: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.2rem' }}>
                          <div>
                            <span style={{ fontSize: '0.65rem', color: theme.textMuted, fontWeight: 800, textTransform: 'uppercase' }}>ORDER ID</span>
                            <h4 style={{ margin: '0.1rem 0 0', fontSize: '1.2rem', fontWeight: 900, color: theme.primary }}>#{order.id}</h4>
                          </div>
                          <div>
                            <span style={{ fontSize: '0.65rem', color: theme.textMuted, fontWeight: 800, textTransform: 'uppercase' }}>CUSTOMER EMAIL</span>
                            <div style={{ margin: '0.1rem 0 0', fontWeight: 800, color: theme.textDark, fontSize: '0.85rem' }}>{order.customer} ({order.email || 'guest@example.com'})</div>
                          </div>
                          <div>
                            <span style={{ fontSize: '0.65rem', color: theme.textMuted, fontWeight: 800, textTransform: 'uppercase' }}>STATUS MODIFIER</span>
                            <div style={{ margin: '0.2rem 0 0' }}>
                              <select
                                value={order.status}
                                onChange={e => {
                                  const updatedOrders = activeBiz.orders.map(o => o.id === order.id ? { ...o, status: e.target.value } : o);
                                  updateBusiness(activeBiz.id, { orders: updatedOrders });
                                  alert(`🎉 Order #${order.id} status modified to "${e.target.value}" successfully!`);
                                }}
                                style={{
                                  padding: '4px 8px',
                                  borderRadius: '6px',
                                  border: '1.5px solid rgba(0,0,0,0.1)',
                                  background: 'white',
                                  fontWeight: 800,
                                  fontSize: '0.75rem',
                                  outline: 'none',
                                  color: theme.primary
                                }}
                              >
                                {['Baking', 'Packed', 'Shipped', 'Delivered', 'In Progress', 'Preparing'].map(st => (
                                  <option key={st} value={st}>{st}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Customer Dynamic Checkout Custom Inputs Seeding */}
                        {order.customFields && Object.keys(order.customFields).length > 0 && (
                          <div style={{ background: '#FFFFFF', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.04)', marginBottom: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            <span style={{ fontSize: '0.62rem', fontWeight: 900, color: theme.primary, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Submitted Checkout Parameters:</span>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '2px' }}>
                              {Object.entries(order.customFields).map(([key, val]) => (
                                <span key={key} style={{ fontSize: '0.72rem', color: theme.textDark, fontWeight: 650 }}>
                                  <b>{key.replace(/([A-Z])/g, ' $1')}:</b> {val}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Items listed */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', borderTop: `1px solid ${theme.borderColor}`, paddingTop: '1.2rem', marginBottom: '1.2rem' }}>
                          {order.items?.map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                              <img src={item.image || "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80"} style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }} />
                              <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 800, fontSize: '0.85rem', color: theme.textDark }}>{item.name}</div>
                                <div style={{ fontSize: '0.72rem', color: theme.textMuted, opacity: 0.8, fontWeight: 700 }}>Qty: {item.quantity || 1}</div>
                              </div>
                              <span style={{ fontWeight: 900, color: theme.textDark, fontSize: '0.85rem' }}>{item.price}</span>
                            </div>
                          ))}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${theme.borderColor}`, paddingTop: '1.2rem' }}>
                          <span style={{ fontWeight: 900, fontSize: '1rem', color: theme.textDark }}>Transaction Total: <span style={{ color: theme.primary }}>{order.amount}</span></span>
                          <span style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#10B981', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase' }}>
                            {order.payment || 'Paid'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* CUSTOMER ORIGINAL ORDERS SECTION */}
            {activeSection === 'orders' && (
              <motion.div 
                key="orders"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
              >
                <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '2.5rem', color: theme.textDark }}>Order History</h2>
                
                {orders.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                    <Package size={60} color={theme.primary} style={{ marginBottom: '1.5rem', opacity: 0.4 }} />
                    <p style={{ color: theme.textMuted, fontSize: '1.2rem', fontWeight: 600 }}>No orders placed yet. Time to treat yourself!</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {orders.map(order => (
                      <div key={order.id} className="card" style={{ padding: '2rem', border: `1px solid ${theme.borderColor}`, background: theme.bg, borderRadius: '20px', position: 'relative' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                          <div>
                            <span style={{ fontSize: '0.8rem', color: theme.textMuted, fontWeight: 700, textTransform: 'uppercase' }}>ORDER ID</span>
                            <h4 style={{ margin: '0.2rem 0 0', fontSize: '1.25rem', fontWeight: 900, color: theme.primary }}>#{order.id}</h4>
                          </div>
                          <div>
                            <span style={{ fontSize: '0.8rem', color: theme.textMuted, fontWeight: 700, textTransform: 'uppercase' }}>DATE PLACED</span>
                            <div style={{ margin: '0.2rem 0 0', fontWeight: 800, color: theme.textDark }}>{order.date}</div>
                          </div>
                          <div>
                            <span style={{ fontSize: '0.8rem', color: theme.textMuted, fontWeight: 700, textTransform: 'uppercase' }}>STATUS</span>
                            <div style={{ 
                                margin: '0.2rem 0 0', 
                                fontWeight: 900, 
                                color: order.status === 'Delivered' ? '#10B981' : theme.primary,
                                background: order.status === 'Delivered' ? 'rgba(16, 185, 129, 0.12)' : theme.sandboxBadgeBg, 
                                padding: '0.2rem 0.6rem', 
                                borderRadius: '6px', 
                                display: 'inline-block',
                                fontSize: '0.9rem' 
                              }}>{order.status}</div>
                          </div>
                        </div>

                        {/* Items listed */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: `1px solid ${theme.borderColor}`, paddingTop: '1.5rem', marginBottom: '1.5rem' }}>
                          {order.items?.map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                              <img src={item.image} style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} />
                              <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 800, fontSize: '0.95rem', color: theme.textDark }}>{item.name}</div>
                                <div style={{ fontSize: '0.8rem', color: theme.textMuted, opacity: 0.8, fontWeight: 700 }}>{item.weight || 'Standard'} • Qty: {item.quantity}</div>
                              </div>
                              <span style={{ fontWeight: 900, color: theme.textDark }}>{item.price}</span>
                            </div>
                          ))}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: `1px solid ${theme.borderColor}`, paddingTop: '1.5rem' }}>
                          <span style={{ fontWeight: 900, fontSize: '1.15rem', color: theme.textDark }}>Total Paid: <span style={{ color: theme.primary }}>{order.amount}</span></span>
                          <div style={{ display: 'flex', gap: '1rem' }}>
                            <button 
                              onClick={() => navigate(`/tracking/${order.id}`)} 
                              style={{ 
                                padding: '0.6rem 1.5rem', 
                                fontSize: '0.85rem',
                                background: 'transparent',
                                border: `1.5px solid ${theme.borderColor}`,
                                color: theme.textMuted,
                                borderRadius: '8px',
                                fontWeight: 700,
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.background = theme.bg}
                              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                            >
                              Track Order
                            </button>
                            <button 
                              onClick={() => handleReorder(order.items)} 
                              style={{ 
                                padding: '0.6rem 1.5rem', 
                                fontSize: '0.85rem', 
                                display: 'flex', 
                                  alignItems: 'center', 
                                  gap: '0.4rem',
                                  background: theme.primaryGradient,
                                  border: 'none',
                                  color: 'white',
                                  borderRadius: '8px',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  transition: 'all 0.2s'
                                }}
                              >
                                <ShoppingCart size={14} /> Reorder
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* CUSTOMER ORIGINAL ADDRESSES SECTION */}
              {activeSection === 'addresses' && (
                <motion.div 
                  key="addresses"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 900, margin: 0, color: theme.textDark }}>Saved Addresses</h2>
                    <button 
                      onClick={() => setShowAddAddress(!showAddAddress)} 
                      style={{ 
                        padding: '0.8rem 1.5rem', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem', 
                        fontSize: '0.9rem',
                        background: theme.primaryGradient,
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      <Plus size={18} /> Add Address
                    </button>
                  </div>

                  {showAddAddress && (
                    <form onSubmit={handleAddAddress} className="card" style={{ padding: '2.5rem', background: theme.bg, border: `1px solid ${theme.borderColor}`, borderRadius: '20px', marginBottom: '3rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                      <h3 style={{ margin: '0 0 0.5rem', fontWeight: 800, color: theme.textDark }}>New Address</h3>
                      <input type="text" placeholder="Street Address" value={newAddress.street} onChange={e => setNewAddress({...newAddress, street: e.target.value})} style={{ padding: '1rem', borderRadius: '12px', border: `2px solid ${theme.borderColor}`, outline: 'none', background: '#F8FAFC', color: theme.textDark }} required />
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <input type="text" placeholder="City, State" value={newAddress.city} onChange={e => setNewAddress({...newAddress, city: e.target.value})} style={{ padding: '1rem', borderRadius: '12px', border: `2px solid ${theme.borderColor}`, outline: 'none', background: '#F8FAFC', color: theme.textDark }} required />
                        <input type="text" placeholder="Zip Code" value={newAddress.zip} onChange={e => setNewAddress({...newAddress, zip: e.target.value})} style={{ padding: '1rem', borderRadius: '12px', border: `2px solid ${theme.borderColor}`, outline: 'none', background: '#F8FAFC', color: theme.textDark }} required />
                      </div>
                      <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                        <button type="submit" style={{ padding: '0.8rem 2rem', background: theme.primaryGradient, color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>Save Address</button>
                        <button type="button" onClick={() => setShowAddAddress(false)} style={{ padding: '0.8rem 2rem', background: 'transparent', border: `1.5px solid ${theme.borderColor}`, color: theme.textMuted, borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
                      </div>
                    </form>
                  )}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {addresses.map(addr => (
                      <div key={addr.id} className="card" style={{ padding: '2rem', border: `2px solid ${theme.borderColor}`, background: 'white', borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-start' }}>
                          <div style={{ background: theme.bg, padding: '0.8rem', borderRadius: '50%', color: theme.primary }}>
                            <Home size={20} />
                          </div>
                          <div>
                            <div style={{ fontWeight: 800, fontSize: '1.1rem', color: theme.textDark }}>{addr.street}</div>
                            <div style={{ fontSize: '0.95rem', color: theme.textMuted, opacity: 0.8, marginTop: '0.3rem' }}>{addr.city}, {addr.zip}</div>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleDeleteAddress(addr.id)} 
                          style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', padding: '0.5rem', opacity: 0.6 }}
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* CUSTOMER ORIGINAL FAVORITES SECTION */}
              {activeSection === 'favorites' && (
                <motion.div 
                  key="favorites"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                >
                  <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '2.5rem', color: theme.textDark }}>My Favorites</h2>
                  
                  {favorites.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                      <Heart size={60} color={theme.primary} style={{ marginBottom: '1.5rem', opacity: 0.4 }} />
                      <p style={{ color: theme.textMuted, fontSize: '1.2rem', fontWeight: 600 }}>Your favorited items list is currently empty.</p>
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem' }}>
                      {favorites.map(cake => (
                        <div key={cake.id} className="card" style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', border: `1px solid ${theme.borderColor}`, boxShadow: theme.shadow, display: 'flex', flexDirection: 'column' }}>
                          <div style={{ position: 'relative' }}>
                            <img src={cake.images?.[0] || cake.image} style={{ width: '100%', aspectRatio: '1.2/1', objectFit: 'cover' }} />
                            <button 
                              onClick={() => toggleFavorite(cake)}
                              style={{ position: 'absolute', top: '15px', right: '15px', width: '36px', height: '36px', borderRadius: '50%', background: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', cursor: 'pointer' }}
                            >
                              <Heart size={18} fill={theme.primary} color={theme.primary} />
                            </button>
                          </div>
                          <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div>
                              <h4 style={{ margin: '0 0 0.5rem', fontSize: '1.15rem', fontWeight: 800, color: theme.textDark }}>{cake.name}</h4>
                              <div style={{ color: theme.primary, fontWeight: 900, fontSize: '1.2rem', marginBottom: '1.2rem' }}>{cake.price}</div>
                            </div>
                            <div style={{ display: 'flex', gap: '0.8rem' }}>
                              <button 
                                onClick={() => {
                                  addToCart({ ...cake, price: String(cake.price) });
                                }}
                                style={{ 
                                  flex: 1, 
                                  padding: '0.6rem 0.8rem', 
                                  fontSize: '0.8rem', 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  justifyContent: 'center', 
                                  gap: '0.4rem',
                                  background: theme.primaryGradient,
                                  border: 'none',
                                  color: 'white',
                                  borderRadius: '8px',
                                  fontWeight: 700,
                                  cursor: 'pointer'
                                }}
                              >
                                <ShoppingCart size={12} /> Add
                              </button>
                              <button 
                                onClick={() => navigate(`/product/${cake.id}`)} 
                                style={{ 
                                  padding: '0.6rem 1rem', 
                                  fontSize: '0.8rem',
                                  background: 'transparent',
                                  border: `1.5px solid ${theme.borderColor}`,
                                  color: theme.textMuted,
                                  borderRadius: '8px',
                                  fontWeight: 700,
                                  cursor: 'pointer'
                                }}
                              >
                                Details
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* OPERATOR SUITE SECTION */}
              {activeSection === 'operator' && (
                <motion.div 
                  key="operator"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                >
                  <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem', color: theme.textDark }}>Operator Suite</h2>
                  <p style={{ color: theme.textMuted, opacity: 0.8, fontWeight: 600, marginBottom: '3rem' }}>
                    Select an administrative portal to manage social commerce tenants and oversee SaaS platform configurations.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    {/* Tenant Admin Card */}
                    <div style={{
                      padding: '2.5rem',
                      background: 'white',
                      borderRadius: '24px',
                      border: `1.5px solid ${theme.borderColor}`,
                      boxShadow: theme.shadow,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '1.5rem',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        background: theme.sandboxBadgeBg,
                        color: theme.primary,
                        padding: '0.4rem 1rem',
                        borderRadius: '50px',
                        fontSize: '0.75rem',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {activeBiz?.name || "Active"} Sandbox
                      </div>

                      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                        <div style={{
                          width: '54px',
                          height: '54px',
                          borderRadius: '16px',
                          background: theme.bg,
                          color: theme.primary,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <Shield size={28} />
                        </div>
                        <div>
                          <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.4rem', fontWeight: 900, color: theme.textDark }}>Tenant Admin Portal</h3>
                          <p style={{ margin: 0, fontSize: '0.95rem', color: '#64748B', lineHeight: 1.5, fontWeight: 500 }}>
                            Access your dedicated shop administration suite. Manage your product catalog, fulfill custom orders, track customer list, examine sales graphs, and configure automated WhatsApp dispatch notifications.
                          </p>
                        </div>
                      </div>

                      <button 
                        onClick={() => {
                          switchRole('admin', activeBizId);
                          navigate('/admin');
                        }}
                        style={{ 
                          padding: '1rem 2rem', 
                          fontSize: '0.95rem', 
                          fontWeight: 900, 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          gap: '0.6rem',
                          alignSelf: 'flex-start',
                          background: theme.primaryGradient,
                          color: 'white',
                          border: 'none',
                          borderRadius: '12px',
                          cursor: 'pointer',
                          boxShadow: theme.shadow
                        }}
                      >
                        Launch Tenant Admin <ChevronRight size={16} />
                      </button>
                    </div>

                    {/* Super Admin Card */}
                    <div style={{
                      padding: '2.5rem',
                      background: 'white',
                      borderRadius: '24px',
                      border: `1.5px solid ${theme.borderColor}`,
                      boxShadow: theme.shadow,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '1.5rem',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        background: 'rgba(15, 23, 42, 0.06)',
                        color: '#0F172A',
                        padding: '0.4rem 1rem',
                        borderRadius: '50px',
                        fontSize: '0.75rem',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        Platform Control
                      </div>

                      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                        <div style={{
                          width: '54px',
                          height: '54px',
                          borderRadius: '16px',
                          background: 'rgba(15, 23, 42, 0.04)',
                          color: '#0F172A',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <Shield size={28} />
                        </div>
                        <div>
                          <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.4rem', fontWeight: 900, color: theme.textDark }}>Super Admin Dashboard</h3>
                          <p style={{ margin: 0, fontSize: '0.95rem', color: '#64748B', lineHeight: 1.5, fontWeight: 500 }}>
                            Access the global platform operator dashboard. Examine active platform MRR stats, oversee registered social store instances (CakeFlow, FastFoot, Threads&Co), manage store licensing, and configure global subscription tiers.
                          </p>
                        </div>
                      </div>

                      <button 
                        onClick={() => {
                          switchRole('admin', activeBizId);
                          navigate('/super-admin');
                        }}
                        style={{ 
                          padding: '1rem 2rem', 
                          fontSize: '0.95rem', 
                          fontWeight: 900, 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          gap: '0.6rem',
                          alignSelf: 'flex-start',
                          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '12px',
                          cursor: 'pointer',
                          boxShadow: '0 4px 12px rgba(15, 23, 42, 0.15)'
                        }}
                      >
                        Launch Super Admin <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </div>
  );
};

export default ProfilePage;
