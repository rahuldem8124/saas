import React from 'react';
import { motion } from 'framer-motion';
import { User, Package, MapPin, Settings, LogOut, ChevronRight, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, switchRole, isAdmin } = useAuth();
  const navigate = useNavigate();
  const menuItems = [
    { name: 'My Orders', icon: <Package size={20} />, sub: 'Track and manage your orders' },
    { name: 'Addresses', icon: <MapPin size={20} />, sub: 'Manage your delivery locations' },
    { name: 'Settings', icon: <Settings size={20} />, sub: 'Profile and notification settings' },
  ];

  return (
    <div style={{ padding: '120px 5% 6rem', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
        
        {/* Profile Sidebar */}
        <div>
          <div className="card" style={{ padding: '3rem', textAlign: 'center', background: 'white' }}>
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'var(--color-cream)', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={60} color="var(--color-pink)" />
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-brown-dark)', marginBottom: '0.5rem' }}>Sarah Johnson</h2>
            <p style={{ color: 'var(--color-brown)', opacity: 0.6, fontWeight: 600, marginBottom: '2rem' }}>sarah.j@example.com</p>
            
            <button 
              onClick={() => {
                const newRole = isAdmin ? 'user' : 'admin';
                switchRole(newRole);
                if (newRole === 'admin') navigate('/admin');
                else navigate('/home');
              }}
              style={{ 
                width: '100%', 
                padding: '1rem', 
                marginBottom: '1rem',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '0.8rem', 
                fontWeight: 800,
                background: isAdmin ? 'var(--color-cream)' : 'var(--color-brown-dark)',
                color: isAdmin ? 'var(--color-brown-dark)' : 'white',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer'
              }}
            >
              <Shield size={20} /> {isAdmin ? 'Switch to User View' : 'Switch to Admin View'}
            </button>

            <button className="btn-secondary" style={{ width: '100%', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', fontWeight: 800 }}>
              <LogOut size={20} /> Logout
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {menuItems.map((item, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ x: 10 }}
              onClick={() => {
                if (item.name === 'My Orders') navigate('/tracking');
                else alert(`${item.name} feature coming soon!`);
              }}
              className="card"
              style={{ padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', background: 'white' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ background: 'var(--color-cream)', padding: '0.8rem', borderRadius: '12px', color: 'var(--color-pink)' }}>
                  {item.icon}
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>{item.name}</h3>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.9rem', color: 'var(--color-brown)', opacity: 0.6 }}>{item.sub}</p>
                </div>
              </div>
              <ChevronRight size={24} color="var(--color-brown)" style={{ opacity: 0.3 }} />
            </motion.div>
          ))}

          <div className="card" style={{ padding: '2rem', background: 'var(--color-cream)', border: '2px dashed var(--color-pink)', marginTop: '2rem' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>Active Order</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 800, color: 'var(--color-pink)' }}>#CF-88291</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Status: Baking 🧁</div>
              </div>
              <button className="btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>Track</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
