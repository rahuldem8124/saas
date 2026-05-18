import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Package, MapPin, Settings, LogOut, ChevronRight, Shield, Heart, Plus, Trash2, Home, ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, switchRole, isAdmin } = useAuth();
  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();
  const navigate = useNavigate();

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
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.5fr', gap: '4rem' }}>
        
        {/* Profile Sidebar */}
        <div>
          <div className="card" style={{ padding: '3rem', textAlign: 'center', background: 'white', position: 'sticky', top: '120px' }}>
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'var(--color-cream)', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={60} color="var(--color-pink)" />
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-brown-dark)', marginBottom: '0.5rem' }}>Sarah Johnson</h2>
            <p style={{ color: 'var(--color-brown)', opacity: 0.6, fontWeight: 600, marginBottom: '2.5rem' }}>sarah.j@example.com</p>
            
            {/* TABS SELECTORS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2.5rem', textAlign: 'left' }}>
              <button 
                onClick={() => setActiveSection('orders')} 
                style={{ 
                  padding: '1rem 1.5rem', 
                  borderRadius: '12px', 
                  border: 'none', 
                  background: activeSection === 'orders' ? 'var(--color-cream)' : 'none', 
                  color: activeSection === 'orders' ? 'var(--color-pink)' : 'var(--color-brown)', 
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
                  background: activeSection === 'addresses' ? 'var(--color-cream)' : 'none', 
                  color: activeSection === 'addresses' ? 'var(--color-pink)' : 'var(--color-brown)', 
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
                  background: activeSection === 'favorites' ? 'var(--color-cream)' : 'none', 
                  color: activeSection === 'favorites' ? 'var(--color-pink)' : 'var(--color-brown)', 
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
            </div>

            <button 
              onClick={() => {
                const newRole = isAdmin ? 'user' : 'admin';
                switchRole(newRole);
                if (newRole === 'admin') navigate('/admin');
                else navigate('/');
              }}
              style={{ 
                width: '100%', 
                padding: '1.2rem 1rem', 
                marginBottom: '1rem',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '0.8rem', 
                fontWeight: 900,
                background: isAdmin ? 'var(--color-cream)' : 'var(--color-brown-dark)',
                color: isAdmin ? 'var(--color-brown-dark)' : 'white',
                border: 'none',
                borderRadius: '16px',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-soft)'
              }}
            >
              <Shield size={20} /> {isAdmin ? 'Switch to User View' : 'Switch to Admin View'}
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div style={{ background: 'white', borderRadius: '32px', padding: '3.5rem', boxShadow: 'var(--shadow-medium)' }}>
          
          <AnimatePresence mode="wait">
            {/* ORDERS SECTION */}
            {activeSection === 'orders' && (
              <motion.div 
                key="orders"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
              >
                <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '2.5rem', color: 'var(--color-brown-dark)' }}>Order History</h2>
                
                {orders.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                    <Package size={60} color="var(--color-pink)" style={{ marginBottom: '1.5rem', opacity: 0.4 }} />
                    <p style={{ color: 'var(--color-brown)', fontSize: '1.2rem', fontWeight: 600 }}>No orders placed yet. Time to treat yourself!</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {orders.map(order => (
                      <div key={order.id} className="card" style={{ padding: '2rem', border: '1px solid rgba(122, 78, 58, 0.1)', background: 'var(--color-cream)', position: 'relative' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                          <div>
                            <span style={{ fontSize: '0.8rem', color: 'var(--color-brown)', fontWeight: 700, textTransform: 'uppercase' }}>ORDER ID</span>
                            <h4 style={{ margin: '0.2rem 0 0', fontSize: '1.25rem', fontWeight: 900, color: 'var(--color-pink)' }}>#{order.id}</h4>
                          </div>
                          <div>
                            <span style={{ fontSize: '0.8rem', color: 'var(--color-brown)', fontWeight: 700, textTransform: 'uppercase' }}>DATE PLACED</span>
                            <div style={{ margin: '0.2rem 0 0', fontWeight: 800 }}>{order.date}</div>
                          </div>
                          <div>
                            <span style={{ fontSize: '0.8rem', color: 'var(--color-brown)', fontWeight: 700, textTransform: 'uppercase' }}>STATUS</span>
                            <div style={{ 
                              margin: '0.2rem 0 0', 
                              fontWeight: 900, 
                              color: order.status === 'Delivered' ? '#4CAF50' : 'var(--color-pink)',
                              background: '#white', 
                              padding: '0.2rem 0.6rem', 
                              borderRadius: '6px', 
                              display: 'inline-block',
                              fontSize: '0.9rem' 
                            }}>{order.status}</div>
                          </div>
                        </div>

                        {/* Items listed */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '1px solid rgba(122, 78, 58, 0.1)', paddingTop: '1.5rem', marginBottom: '1.5rem' }}>
                          {order.items?.map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                              <img src={item.image} style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} />
                              <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{item.name}</div>
                                <div style={{ fontSize: '0.8rem', opacity: 0.6, fontWeight: 700 }}>{item.weight} • Qty: {item.quantity}</div>
                              </div>
                              <span style={{ fontWeight: 900 }}>{item.price}</span>
                            </div>
                          ))}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid rgba(122, 78, 58, 0.1)', paddingTop: '1.5rem' }}>
                          <span style={{ fontWeight: 900, fontSize: '1.15rem' }}>Total Paid: <span style={{ color: 'var(--color-pink)' }}>{order.amount}</span></span>
                          <div style={{ display: 'flex', gap: '1rem' }}>
                            <button onClick={() => navigate(`/tracking/${order.id}`)} className="btn-secondary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.85rem' }}>Track Order</button>
                            <button onClick={() => handleReorder(order.items)} className="btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
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
                  <h2 style={{ fontSize: '2.5rem', fontWeight: 900, margin: 0, color: 'var(--color-brown-dark)' }}>Saved Addresses</h2>
                  <button onClick={() => setShowAddAddress(!showAddAddress)} className="btn-primary" style={{ padding: '0.8rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <Plus size={18} /> Add Address
                  </button>
                </div>

                {showAddAddress && (
                  <form onSubmit={handleAddAddress} className="card" style={{ padding: '2.5rem', background: 'var(--color-cream)', marginBottom: '3rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <h3 style={{ margin: '0 0 0.5rem', fontWeight: 800 }}>New Address</h3>
                    <input type="text" placeholder="Street Address" value={newAddress.street} onChange={e => setNewAddress({...newAddress, street: e.target.value})} style={{ padding: '1rem', borderRadius: '12px', border: '2px solid white', outline: 'none' }} required />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <input type="text" placeholder="City, State" value={newAddress.city} onChange={e => setNewAddress({...newAddress, city: e.target.value})} style={{ padding: '1rem', borderRadius: '12px', border: '2px solid white', outline: 'none' }} required />
                      <input type="text" placeholder="Zip Code" value={newAddress.zip} onChange={e => setNewAddress({...newAddress, zip: e.target.value})} style={{ padding: '1rem', borderRadius: '12px', border: '2px solid white', outline: 'none' }} required />
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                      <button type="submit" className="btn-primary" style={{ padding: '0.8rem 2rem' }}>Save Address</button>
                      <button type="button" onClick={() => setShowAddAddress(false)} className="btn-secondary" style={{ padding: '0.8rem 2rem' }}>Cancel</button>
                    </div>
                  </form>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {addresses.map(addr => (
                    <div key={addr.id} className="card" style={{ padding: '2rem', border: '2px solid var(--color-cream)', background: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-start' }}>
                        <div style={{ background: 'var(--color-cream)', padding: '0.8rem', borderRadius: '50%', color: 'var(--color-pink)' }}>
                          <Home size={20} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--color-brown-dark)' }}>{addr.street}</div>
                          <div style={{ fontSize: '0.95rem', color: 'var(--color-brown)', opacity: 0.8, marginTop: '0.3rem' }}>{addr.city}, {addr.zip}</div>
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
                <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '2.5rem', color: 'var(--color-brown-dark)' }}>My Favorites</h2>
                
                {favorites.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                    <Heart size={60} color="var(--color-pink)" style={{ marginBottom: '1.5rem', opacity: 0.4 }} />
                    <p style={{ color: 'var(--color-brown)', fontSize: '1.2rem', fontWeight: 600 }}>Your favorited items list is currently empty.</p>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem' }}>
                    {favorites.map(cake => (
                      <div key={cake.id} className="card" style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(122, 78, 58, 0.05)', boxShadow: 'var(--shadow-soft)', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ position: 'relative' }}>
                          <img src={cake.images?.[0] || cake.image} style={{ width: '100%', aspectRatio: '1.2/1', objectFit: 'cover' }} />
                          <button 
                            onClick={() => toggleFavorite(cake)}
                            style={{ position: 'absolute', top: '15px', right: '15px', width: '36px', height: '36px', borderRadius: '50%', background: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-soft)', cursor: 'pointer' }}
                          >
                            <Heart size={18} fill="var(--color-pink)" color="var(--color-pink)" />
                          </button>
                        </div>
                        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                          <div>
                            <h4 style={{ margin: '0 0 0.5rem', fontSize: '1.15rem', fontWeight: 800 }}>{cake.name}</h4>
                            <div style={{ color: 'var(--color-pink)', fontWeight: 900, fontSize: '1.2rem', marginBottom: '1.2rem' }}>{cake.price}</div>
                          </div>
                          <div style={{ display: 'flex', gap: '0.8rem' }}>
                            <button 
                              onClick={() => {
                                addToCart({ ...cake, price: String(cake.price) });
                              }}
                              className="btn-primary" 
                              style={{ flex: 1, padding: '0.6rem 0.8rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
                            >
                              <ShoppingCart size={12} /> Add
                            </button>
                            <button onClick={() => navigate(`/product/${cake.id}`)} className="btn-secondary" style={{ padding: '0.6rem 1rem', fontSize: '0.8rem' }}>Details</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
