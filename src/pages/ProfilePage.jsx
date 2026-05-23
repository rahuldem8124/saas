import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Package, MapPin, Settings, LogOut, ChevronRight, Shield, Heart, Plus, Trash2, Home, ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';

const ProfilePage = () => {
  const { user, switchRole, isAdmin } = useAuth();
  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const fromSaaS = queryParams.get('from') === 'saas';

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

  const [activeSection, setActiveSection] = useState('orders'); // orders, addresses, favorites
  
  // Real orders from localStorage
  const [orders, setOrders] = useState([]);
  // Addresses state
  const [addresses, setAddresses] = useState([]);
  // Address form toggle
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({ street: '', city: '', zip: '' });

  useEffect(() => {
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
          <div className="card" style={{ padding: '3rem', textAlign: 'center', background: theme.cardBg, border: `1px solid ${theme.borderColor}`, borderRadius: '24px', boxShadow: theme.shadow }}>
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: theme.avatarBg, margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={60} color={theme.avatarIcon} />
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: theme.textDark, marginBottom: '0.5rem' }}>Sarah Johnson</h2>
            <p style={{ color: theme.textMuted, opacity: 0.8, fontWeight: 600, marginBottom: '2.5rem' }}>sarah.j@example.com</p>
            
            {/* TABS SELECTORS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2.5rem', textAlign: 'left' }}>
              <button 
                onClick={() => setActiveSection('orders')} 
                style={{ 
                  padding: '1rem 1.5rem', 
                  borderRadius: '12px', 
                  border: 'none', 
                  background: activeSection === 'orders' ? theme.tabActiveBg : 'none', 
                  color: activeSection === 'orders' ? theme.tabActiveText : theme.textMuted, 
                  fontWeight: 800, 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  transition: 'all 0.2s'
                }}
              >
                <Package size={18} /> Order History
              </button>
              
              <button 
                onClick={() => setActiveSection('addresses')} 
                style={{ 
                  padding: '1rem 1.5rem', 
                  borderRadius: '12px', 
                  border: 'none', 
                  background: activeSection === 'addresses' ? theme.tabActiveBg : 'none', 
                  color: activeSection === 'addresses' ? theme.tabActiveText : theme.textMuted, 
                  fontWeight: 800, 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  transition: 'all 0.2s'
                }}
              >
                <MapPin size={18} /> Saved Addresses
              </button>

              <button 
                onClick={() => setActiveSection('favorites')} 
                style={{ 
                  padding: '1rem 1.5rem', 
                  borderRadius: '12px', 
                  border: 'none', 
                  background: activeSection === 'favorites' ? theme.tabActiveBg : 'none', 
                  color: activeSection === 'favorites' ? theme.tabActiveText : theme.textMuted, 
                  fontWeight: 800, 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  transition: 'all 0.2s'
                }}
              >
                <Heart size={18} /> My Favorites ({favorites.length})
              </button>

              <button 
                onClick={() => setActiveSection('operator')} 
                style={{ 
                  padding: '1rem 1.5rem', 
                  borderRadius: '12px', 
                  border: 'none', 
                  background: activeSection === 'operator' ? theme.tabActiveBg : 'none', 
                  color: activeSection === 'operator' ? theme.tabActiveText : theme.textMuted, 
                  fontWeight: 800, 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  transition: 'all 0.2s'
                }}
              >
                <Shield size={18} /> Operator Suite
              </button>
            </div>

            {/* Operator Control Panels */}
            <div style={{ 
              borderTop: `1px solid ${theme.borderColor}`, 
              paddingTop: '1.5rem', 
              marginTop: '1.5rem', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '0.8rem',
              textAlign: 'left'
            }}>
              <span style={{ 
                fontSize: '0.75rem', 
                fontWeight: 800, 
                color: theme.textMuted, 
                opacity: 0.6, 
                textTransform: 'uppercase', 
                paddingLeft: '0.5rem',
                display: 'block'
              }}>
                Operator Portals
              </span>

              <button 
                onClick={() => {
                  switchRole('admin');
                  navigate('/admin');
                }}
                style={{ 
                  width: '100%', 
                  padding: '1rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  gap: '0.6rem', 
                  fontWeight: 900,
                  background: fromSaaS ? theme.primaryGradient : 'var(--color-brown-dark)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  boxShadow: theme.shadow,
                  transition: 'all 0.2s'
                }}
              >
                <Shield size={16} /> Tenant Admin Portal
              </button>

              <button 
                onClick={() => {
                  switchRole('admin');
                  navigate('/super-admin');
                }}
                style={{ 
                  width: '100%', 
                  padding: '1rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  gap: '0.6rem', 
                  fontWeight: 900,
                  background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  boxShadow: '0 4px 12px rgba(15, 23, 42, 0.15)',
                  transition: 'all 0.2s'
                }}
              >
                <Shield size={16} /> Super Admin Dashboard
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div style={{ background: theme.cardBg, border: `1px solid ${theme.borderColor}`, borderRadius: '32px', padding: '3.5rem', boxShadow: theme.shadow }}>
          
          <AnimatePresence mode="wait">
            {/* ORDERS SECTION */}
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
                                <div style={{ fontSize: '0.8rem', color: theme.textMuted, opacity: 0.8, fontWeight: 700 }}>{item.weight} • Qty: {item.quantity}</div>
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

            {/* ADDRESSES SECTION */}
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

            {/* FAVORITES SECTION */}
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
                      CakeFlow Sandbox
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
                          Access your dedicated CakeFlow shop administration suite. Manage your product catalog, fulfill custom birthday/wedding orders, track customer list, examine sales graphs, and configure automated WhatsApp dispatch notifications.
                        </p>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        switchRole('admin');
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
                        background: fromSaaS ? theme.primaryGradient : 'var(--color-brown-dark)',
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
                        switchRole('admin');
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
