import React, { useState } from 'react';
import { Settings as SettingsIcon, LayoutDashboard, ShoppingBag, Package, Users, DollarSign, BarChart2, Truck, Ticket, Eye, User, Bell, Shield, Store, Save } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminSettings = () => {
  const { switchRole } = useAuth();
  const [activeTab, setActiveTab] = useState('Bakery Profile');
  
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
      <aside style={{ width: '280px', backgroundColor: 'var(--color-white)', borderRight: '1px solid rgba(122, 78, 58, 0.1)', padding: '2.5rem 1.5rem', position: 'fixed', height: '100vh', boxSizing: 'border-box', zIndex: 1100, display: 'flex', flexDirection: 'column' }}>
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

      <main style={{ marginLeft: '280px', flex: 1, padding: '40px 4rem 4rem' }}>
        <header style={{ marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800 }}>System Settings</h1>
          <p style={{ color: 'var(--color-brown)', fontSize: '1.1rem', opacity: 0.8 }}>Configure your bakery's preferences and security.</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.5fr', gap: '3rem' }}>
          {/* Settings Tabs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { label: 'Bakery Profile', icon: <Store size={20} /> },
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
            
            {activeTab === 'Bakery Profile' && (
              <form style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 700 }}>Bakery Name</label>
                    <input type="text" defaultValue="CakeFlow Artisanal" style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid var(--color-cream)', outline: 'none' }} />
                  </div>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 700 }}>Contact Email</label>
                    <input type="email" defaultValue="hello@cakeflow.com" style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid var(--color-cream)', outline: 'none' }} />
                  </div>
                </div>

                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 700 }}>Business Address</label>
                  <textarea defaultValue="123 Pastry Lane, Sweet Hills, NY 10001" rows="3" style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid var(--color-cream)', outline: 'none', resize: 'none' }}></textarea>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 700 }}>Currency</label>
                    <select style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid var(--color-cream)', outline: 'none' }}>
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                      <option>GBP (£)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 700 }}>Timezone</label>
                    <select style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid var(--color-cream)', outline: 'none' }}>
                      <option>Eastern Time (ET)</option>
                      <option>Pacific Time (PT)</option>
                      <option>UTC</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                  <button type="button" onClick={() => alert('Settings saved successfully!')} className="btn-primary" style={{ padding: '1rem 3rem', display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '1.1rem', cursor: 'pointer', border: 'none', borderRadius: '12px' }}>
                    <Save size={20} /> Save Changes
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
                <div style={{ marginTop: '1rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', fontWeight: 600 }}>
                    <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }} /> Enable Two-Factor Authentication (2FA)
                  </label>
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
                  <button type="button" onClick={() => alert('Notification settings saved!')} className="btn-primary" style={{ padding: '1rem 3rem', display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '1.1rem', cursor: 'pointer', border: 'none', borderRadius: '12px' }}>
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
