import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, LayoutDashboard, ShoppingBag, Package, Users, DollarSign, BarChart2, Truck, Ticket, Eye, User, Bell, Shield, Store, Save, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminSettings = () => {
  const { switchRole } = useAuth();
  const [activeTab, setActiveTab] = useState('Bakery Config');
  
  // Custom states that dynamically map to checkout calculations
  const [settings, setSettings] = useState({
    bakeryName: 'CakeFlow Artisanal',
    email: 'hello@cakeflow.com',
    address: '123 Pastry Lane, Sweet Hills, NY 10001',
    businessHours: '09:00 AM - 08:00 PM',
    deliveryFee: '10.00',
    freeDeliveryLimit: '50.00',
    whatsappLink: 'https://wa.me/15550199',
    instagramLink: 'https://instagram.com/cakeflow_bakery'
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('cake_settings');
      if (saved) {
        setSettings(JSON.parse(saved));
      }
    } catch(e) {
      console.error(e);
    }
  }, []);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    try {
      localStorage.setItem('cake_settings', JSON.stringify(settings));
      alert('Bakery parameters saved and synced across all pages!');
    } catch(err) {
      console.error(err);
    }
  };

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin' },
    { name: 'Orders', icon: <ShoppingBag size={20} />, path: '/admin/orders' },
    { name: 'Products', icon: <Package size={20} />, path: '/admin/products' },
    { name: 'Customers', icon: <Users size={20} />, path: '/admin/customers' },
    { name: 'Payments', icon: <DollarSign size={20} />, path: '/admin/payments' },
    { name: 'Analytics', icon: <BarChart2 size={20} />, path: '/admin/analytics' },
    { name: 'Delivery', icon: <Truck size={20} />, path: '/admin/delivery' },
    { name: 'Coupons', icon: <Ticket size={20} />, path: '/admin/coupons' },
    { name: 'Settings', icon: <SettingsIcon size={20} />, path: '/admin/settings', active: true },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-cream)' }}>
      
      {/* Sidebar */}
      <aside className="admin-sidebar" style={{ width: '280px', backgroundColor: 'var(--color-white)', borderRight: '1px solid rgba(122, 78, 58, 0.1)', padding: '2.5rem 1.5rem', position: 'fixed', height: '100vh', boxSizing: 'border-box', zIndex: 1100, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', fontWeight: 'bold', marginBottom: '2.5rem', color: 'var(--color-brown-dark)' }}>
          CakeFlow <span style={{ fontSize: '0.9rem', color: 'var(--color-pink)', fontWeight: 800 }}>ADMIN</span>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, overflowY: 'auto' }}>
          {navItems.map(item => (
            <Link key={item.name} to={item.path} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1.2rem', 
              padding: '1rem 1.2rem', 
              borderRadius: 'var(--radius-md)', 
              backgroundColor: item.active ? 'var(--color-cream)' : 'transparent',
              color: item.active ? 'var(--color-pink)' : 'var(--color-brown)', 
              fontWeight: item.active ? 800 : 700, 
              textDecoration: 'none',
              transition: 'all 0.2s ease'
            }}>
              {item.icon} {item.name}
            </Link>
          ))}
          <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid rgba(122, 78, 58, 0.1)' }}>
            <Link to="/home" onClick={() => switchRole('user')} style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', padding: '1.2rem', borderRadius: 'var(--radius-md)', color: 'var(--color-brown)', fontWeight: 700, textDecoration: 'none', opacity: 0.8 }}>
              <Eye size={20} /> Customer View
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Panel */}
      <main className="admin-main" style={{ marginLeft: '280px', flex: 1, padding: '40px 4rem 4rem' }}>
        <header style={{ marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800 }}>System Settings</h1>
          <p style={{ color: 'var(--color-brown)', fontSize: '1.1rem', opacity: 0.8 }}>Configure your bakery's preferences, delivery fees, and limits.</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.5fr', gap: '3rem' }}>
          {/* Settings Tabs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { label: 'Bakery Config', icon: <Store size={20} /> },
              { label: 'Notifications', icon: <Bell size={20} /> },
              { label: 'Security', icon: <Shield size={20} /> },
              { label: 'Team Access', icon: <User size={20} /> },
            ].map((tab, i) => {
              const isActive = activeTab === tab.label;
              return (
              <div key={i} onClick={() => setActiveTab(tab.label)} style={{ 
                padding: '1.2rem 1.5rem', 
                borderRadius: 'var(--radius-md)', 
                background: isActive ? 'var(--color-pink)' : 'white',
                color: isActive ? 'white' : 'var(--color-brown)',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                cursor: 'pointer',
                boxShadow: isActive ? 'var(--shadow-glow)' : 'var(--shadow-soft)',
                transition: 'all 0.2s ease'
              }}>
                {tab.icon} {tab.label}
              </div>
            )})}
          </div>

          {/* Settings Form */}
          <div className="card" style={{ padding: '3rem', background: 'white' }}>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '2.5rem' }}>{activeTab}</h3>
            
            {activeTab === 'Bakery Config' && (
              <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 700 }}>Bakery Name</label>
                    <input type="text" value={settings.bakeryName} onChange={e => setSettings({...settings, bakeryName: e.target.value})} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid var(--color-cream)', outline: 'none', boxSizing: 'border-box' }} required />
                  </div>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 700 }}>Contact Email</label>
                    <input type="email" value={settings.email} onChange={e => setSettings({...settings, email: e.target.value})} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid var(--color-cream)', outline: 'none', boxSizing: 'border-box' }} required />
                  </div>
                </div>

                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 700 }}>Instagram Profile Link</label>
                  <input type="text" value={settings.instagramLink} onChange={e => setSettings({...settings, instagramLink: e.target.value})} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid var(--color-cream)', outline: 'none', boxSizing: 'border-box' }} required />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 700 }}>Business Hours</label>
                    <input type="text" value={settings.businessHours} onChange={e => setSettings({...settings, businessHours: e.target.value})} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid var(--color-cream)', outline: 'none', boxSizing: 'border-box' }} required />
                  </div>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 700 }}>WhatsApp Channel Link</label>
                    <input type="text" value={settings.whatsappLink} onChange={e => setSettings({...settings, whatsappLink: e.target.value})} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid var(--color-cream)', outline: 'none', boxSizing: 'border-box' }} required />
                  </div>
                </div>

                {/* Delivery pricing parameters */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', background: 'var(--color-cream)', padding: '2rem', borderRadius: '20px' }}>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 800, color: 'var(--color-brown-dark)' }}>Standard Delivery Fee ($)</label>
                    <input type="number" min="0" step="0.5" value={settings.deliveryFee} onChange={e => setSettings({...settings, deliveryFee: e.target.value})} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid white', outline: 'none', boxSizing: 'border-box', fontWeight: 800 }} required />
                  </div>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 800, color: 'var(--color-brown-dark)' }}>Free Delivery Threshold ($)</label>
                    <input type="number" min="0" step="1" value={settings.freeDeliveryLimit} onChange={e => setSettings({...settings, freeDeliveryLimit: e.target.value})} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid white', outline: 'none', boxSizing: 'border-box', fontWeight: 800 }} required />
                  </div>
                </div>

                <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                  <button type="submit" className="btn-primary" style={{ padding: '1rem 3rem', display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '1.1rem', cursor: 'pointer', border: 'none', borderRadius: '12px', boxShadow: 'var(--shadow-glow)' }}>
                    <Save size={20} /> Save Bakery Config
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'Security' && (
              <form style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 700 }}>Current Password</label>
                  <input type="password" style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid var(--color-cream)', outline: 'none' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 700 }}>New Password</label>
                    <input type="password" style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid var(--color-cream)', outline: 'none' }} />
                  </div>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 700 }}>Confirm New Password</label>
                    <input type="password" style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid var(--color-cream)', outline: 'none' }} />
                  </div>
                </div>
                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                  <button type="button" onClick={() => alert('Security settings updated!')} className="btn-primary" style={{ padding: '1rem 3rem', display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '1.1rem', cursor: 'pointer', border: 'none', borderRadius: '12px' }}>
                    <Shield size={20} /> Update Security
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'Team Access' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <p style={{ color: 'var(--color-brown)', opacity: 0.8 }}>Manage who has access to your bakery admin dashboard.</p>
                  <button onClick={() => alert('Invite dialog placeholder')} className="btn-secondary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem', cursor: 'pointer', borderRadius: '8px' }}>+ Invite Team Member</button>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--color-cream)' }}>
                      <th style={{ padding: '1.2rem 0', color: 'var(--color-brown)', fontWeight: 700 }}>User</th>
                      <th style={{ padding: '1.2rem 0', color: 'var(--color-brown)', fontWeight: 700 }}>Role</th>
                      <th style={{ padding: '1.2rem 0', color: 'var(--color-brown)', fontWeight: 700 }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--color-cream)' }}>
                      <td style={{ padding: '1.5rem 0', fontWeight: 800 }}>Admin User (You)</td>
                      <td style={{ padding: '1.5rem 0' }}>Owner</td>
                      <td style={{ padding: '1.5rem 0', color: '#4CAF50', fontWeight: 800 }}>Active</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--color-cream)' }}>
                      <td style={{ padding: '1.5rem 0', fontWeight: 800 }}>Sarah Baker</td>
                      <td style={{ padding: '1.5rem 0' }}>Manager</td>
                      <td style={{ padding: '1.5rem 0', color: '#4CAF50', fontWeight: 800 }}>Active</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'Notifications' && (
              <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <p style={{ color: 'var(--color-brown)', opacity: 0.8, marginBottom: '1rem' }}>Choose what alerts you want to receive.</p>
                {[
                  "New order received",
                  "Order cancellation requests",
                  "Low stock alerts for products",
                  "Daily sales summary report"
                ].map((notif, i) => (
                  <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', padding: '1rem', background: 'var(--color-cream)', borderRadius: '12px' }}>
                    <input type="checkbox" defaultChecked={i !== 2} style={{ width: '20px', height: '20px' }} />
                    <span style={{ fontWeight: 600 }}>{notif}</span>
                  </label>
                ))}
                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                  <button type="button" onClick={() => alert('Notification preferences saved!')} className="btn-primary" style={{ padding: '1rem 3rem', display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '1.1rem', cursor: 'pointer', border: 'none', borderRadius: '12px' }}>
                    <Bell size={20} /> Save Preferences
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminSettings;
