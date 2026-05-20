import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, LayoutDashboard, ShoppingBag, Package, Users, DollarSign, BarChart2, Truck, Ticket, Eye, User, Bell, Shield, Store, Save, Heart, Layers, MessageSquare, AlertCircle, Plus, Trash2, Award } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTenant } from '../context/TenantContext';

const AdminSettings = () => {
  const { user, switchRole } = useAuth();
  const { businesses, updateBusiness } = useTenant();
  const location = useLocation();

  const activeBizId = user?.businessId || 'cakeflow';
  const biz = businesses[activeBizId] || businesses['cakeflow'];

  const [activeTab, setActiveTab] = useState('Storefront Config');

  // Load custom field configurations
  const [fields, setFields] = useState(biz.fields || []);
  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldType, setNewFieldType] = useState('Text');
  const [newFieldOptions, setNewFieldOptions] = useState('');

  // Scoped store settings state
  const [settings, setSettings] = useState({
    name: biz.name || '',
    whatsappNumber: biz.whatsappNumber || '',
    instagramUsername: biz.instagramUsername || '',
    deliveryFee: biz.deliveryFee || '10.00',
    freeDeliveryLimit: biz.freeDeliveryLimit || '50.00'
  });

  useEffect(() => {
    setSettings({
      name: biz.name || '',
      whatsappNumber: biz.whatsappNumber || '',
      instagramUsername: biz.instagramUsername || '',
      deliveryFee: biz.deliveryFee || '10.00',
      freeDeliveryLimit: biz.freeDeliveryLimit || '50.00'
    });
    setFields(biz.fields || []);
  }, [biz]);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    updateBusiness(biz.id, {
      name: settings.name,
      whatsappNumber: settings.whatsappNumber,
      instagramUsername: settings.instagramUsername,
      deliveryFee: settings.deliveryFee,
      freeDeliveryLimit: settings.freeDeliveryLimit
    });
    alert('Store configuration successfully saved and synced across all pages!');
  };

  const handleAddField = () => {
    if (!newFieldName.trim()) {
      alert("Please enter a field name!");
      return;
    }
    
    const optionsArray = newFieldOptions
      ? newFieldOptions.split(',').map(o => o.trim())
      : [];

    const newField = {
      id: newFieldName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name: newFieldName,
      type: newFieldType,
      options: optionsArray.length > 0 ? optionsArray : undefined,
      required: true
    };

    const updated = [...fields, newField];
    setFields(updated);
    updateBusiness(biz.id, { fields: updated });

    setNewFieldName('');
    setNewFieldOptions('');
    alert(`Custom field '${newFieldName}' added to store checkout forms!`);
  };

  const handleDeleteField = (fieldId) => {
    const updated = fields.filter(f => f.id !== fieldId);
    setFields(updated);
    updateBusiness(biz.id, { fields: updated });
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
    { name: 'Settings', icon: <SettingsIcon size={20} />, path: '/admin/settings' },
    { name: 'Communication', icon: <MessageSquare size={20} />, path: '/admin/communication' }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-cream)' }}>
      
      {/* Sidebar */}
      <aside className="admin-sidebar" style={{ width: '280px', backgroundColor: 'var(--color-white)', borderRight: '1px solid rgba(122, 78, 58, 0.1)', padding: '2.5rem 1.5rem', position: 'fixed', height: '100vh', boxSizing: 'border-box', zIndex: 1100, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '1.6rem', fontFamily: 'var(--font-heading)', fontWeight: 'bold', marginBottom: '2.5rem', color: 'var(--color-brown-dark)' }}>
          <div>{biz.name}</div>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-pink)', fontWeight: 900, textTransform: 'uppercase' }}>
            {biz.category} OPERATOR
          </span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1, overflowY: 'auto' }}>
          {navItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.name} to={item.path} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.2rem',
                padding: '0.8rem 1.2rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: isActive ? 'var(--color-cream)' : 'transparent',
                color: isActive ? 'var(--color-pink)' : 'var(--color-brown)',
                fontWeight: isActive ? 800 : 700,
                transition: 'all 0.2s ease',
                textDecoration: 'none'
              }}>
                {item.icon} {item.name}
              </Link>
            );
          })}
          <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid rgba(122, 78, 58, 0.1)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Link to={`/store/${activeBizId}`} style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', padding: '0.8rem 1.2rem', borderRadius: 'var(--radius-md)', color: 'white', background: 'var(--gradient-pink)', fontWeight: 800, textDecoration: 'none', boxShadow: 'var(--shadow-glow)', fontSize: '0.85rem' }}><Eye size={18} /> Visit Store</Link>
          </div>
        </nav>
      </aside>

      {/* Main Panel */}
      <main className="admin-main" style={{ marginLeft: '280px', flex: 1, padding: '40px 4rem 4rem' }}>
        <header style={{ marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 900 }}>System Settings</h1>
          <p style={{ color: 'var(--color-brown)', fontSize: '1.1rem', opacity: 0.8 }}>Configure custom checkout forms, subscription parameters, and scopes.</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.2fr', gap: '3rem' }}>
          
          {/* Settings Tabs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { label: 'Storefront Config', icon: <Store size={20} /> },
              { label: 'Custom Field Builder', icon: <Layers size={20} /> },
              { label: 'Billing & Gates', icon: <Award size={20} /> },
              { label: 'Security', icon: <Shield size={20} /> }
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
              );
            })}
          </div>

          {/* Settings Form Container */}
          <div className="card" style={{ padding: '3rem', background: 'white' }}>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '2.5rem' }}>{activeTab}</h3>

            {/* TAB 1: STOREFRONT CONFIG */}
            {activeTab === 'Storefront Config' && (
              <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 800 }}>Store Brand Name</label>
                    <input type="text" value={settings.name} onChange={e => setSettings({...settings, name: e.target.value})} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid var(--color-cream)', outline: 'none', boxSizing: 'border-box', fontWeight: 600 }} required />
                  </div>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 800 }}>Instagram Username</label>
                    <input type="text" value={settings.instagramUsername} onChange={e => setSettings({...settings, instagramUsername: e.target.value})} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid var(--color-cream)', outline: 'none', boxSizing: 'border-box', fontWeight: 600 }} required />
                  </div>
                </div>

                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 800 }}>WhatsApp Business Number</label>
                  <input type="text" value={settings.whatsappNumber} onChange={e => setSettings({...settings, whatsappNumber: e.target.value})} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid var(--color-cream)', outline: 'none', boxSizing: 'border-box', fontWeight: 600 }} required />
                </div>

                {/* Delivery parameters */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', background: 'var(--color-cream)', padding: '2rem', borderRadius: '20px' }}>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 800, color: 'var(--color-brown-dark)' }}>Courier Standard Fee ($)</label>
                    <input type="number" min="0" step="0.5" value={settings.deliveryFee} onChange={e => setSettings({...settings, deliveryFee: e.target.value})} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid white', outline: 'none', boxSizing: 'border-box', fontWeight: 800 }} required />
                  </div>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 800, color: 'var(--color-brown-dark)' }}>Free Shipping Cap ($)</label>
                    <input type="number" min="0" step="1" value={settings.freeDeliveryLimit} onChange={e => setSettings({...settings, freeDeliveryLimit: e.target.value})} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid white', outline: 'none', boxSizing: 'border-box', fontWeight: 800 }} required />
                  </div>
                </div>

                <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                  <button type="submit" className="btn-primary" style={{ padding: '1rem 3rem', display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '1.1rem' }}>
                    <Save size={20} /> Save Brand Settings
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: DYNAMIC CUSTOM FIELD BUILDER */}
            {activeTab === 'Custom Field Builder' && (
              <div>
                
                {/* Subscription lock on dynamic field builder (Simulated gating) */}
                {biz.subscription === 'Basic' ? (
                  <div style={{ background: 'rgba(255, 152, 0, 0.05)', border: '2px dashed #FF9800', padding: '2.5rem', borderRadius: '20px', textAlign: 'center' }}>
                    <AlertCircle size={40} color="#FF9800" style={{ margin: '0 auto 1.5rem' }} />
                    <h4 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--color-brown-dark)', marginBottom: '0.8rem' }}>Form Field Builder Locked</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-brown)', lineHeight: 1.6, marginBottom: '2rem' }}>
                      Your store is on the <b>Basic plan</b>. The Custom form fields builder is available exclusively to Pro and Premium subscribers.
                    </p>
                    <button 
                      onClick={() => {
                        updateBusiness(biz.id, { subscription: 'Pro' });
                        alert("Upgrade simulated! Plan set to Pro. Refreshing builder capabilities.");
                      }} 
                      className="btn-primary"
                    >
                      Upgrade to Pro ($79/mo)
                    </button>
                  </div>
                ) : (
                  <div>
                    <div style={{ marginBottom: '2.5rem' }}>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '1rem' }}>Current Form Fields</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        {fields.map(f => (
                          <div key={f.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-cream)', padding: '0.8rem 1.2rem', borderRadius: '10px' }}>
                            <div>
                              <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>{f.name}</div>
                              <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>Type: {f.type} {f.options && `(${f.options.join(', ')})`}</span>
                            </div>
                            <button onClick={() => handleDeleteField(f.id)} style={{ color: '#F44336', cursor: 'pointer' }}>
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Add Field Schema Block */}
                    <div style={{ borderTop: '2px solid var(--color-cream)', paddingTop: '2.5rem' }}>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '1.5rem' }}>Add New Input Field</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        
                        <div className="form-group">
                          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, marginBottom: '0.4rem' }}>FIELD LABEL NAME</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Choose Shoe Size, Personal Engraving" 
                            value={newFieldName}
                            onChange={e => setNewFieldName(e.target.value)}
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid rgba(122, 78, 58, 0.2)', fontSize: '0.9rem', outline: 'none' }}
                          />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                          <div className="form-group">
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, marginBottom: '0.4rem' }}>INPUT COMPONENT TYPE</label>
                            <select 
                              value={newFieldType}
                              onChange={e => setNewFieldType(e.target.value)}
                              style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid rgba(122, 78, 58, 0.2)', fontSize: '0.9rem', background: 'white' }}
                            >
                              {['Text', 'Dropdown', 'Date picker', 'Upload'].map(t => (
                                <option key={t} value={t}>{t}</option>
                              ))}
                            </select>
                          </div>
                          
                          <div className="form-group">
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, marginBottom: '0.4rem' }}>OPTIONS (COMMA-SEPARATED FOR DROPDOWNS)</label>
                            <input 
                              type="text" 
                              placeholder="e.g. Red, Black, Gold" 
                              value={newFieldOptions}
                              onChange={e => setNewFieldOptions(e.target.value)}
                              style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid rgba(122, 78, 58, 0.2)', fontSize: '0.9rem', outline: 'none' }}
                            />
                          </div>
                        </div>

                        <button 
                          onClick={handleAddField}
                          className="btn-primary"
                          style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', marginTop: '1rem' }}
                        >
                          <Plus size={18} /> Add Custom Field
                        </button>

                      </div>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* TAB 3: BILLING & GATES */}
            {activeTab === 'Billing & Gates' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-cream)', padding: '2rem', borderRadius: '20px', marginBottom: '3rem' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, opacity: 0.6 }}>ACTIVE SUBSCRIPTION</span>
                    <h2 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--color-pink)', margin: '0.4rem 0' }}>{biz.subscription}</h2>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>Vanity Domain: {biz.id}.platform.com</span>
                  </div>
                  <div style={{ fontSize: '2.5rem', fontWeight: 900 }}>
                    {biz.subscription === 'Premium' ? "$199" : biz.subscription === 'Pro' ? "$79" : "$29"}<span style={{ fontSize: '0.9rem', opacity: 0.5 }}>/mo</span>
                  </div>
                </div>

                <h4 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '1.5rem' }}>Subscription Tier Action Center</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  {['Basic', 'Pro', 'Premium'].filter(s => s !== biz.subscription).map(plan => (
                    <div 
                      key={plan}
                      onClick={() => {
                        updateBusiness(biz.id, { subscription: plan });
                        alert(`Successfully changed subscription plan to: ${plan}`);
                      }}
                      style={{
                        border: '1px solid rgba(122, 78, 58, 0.1)',
                        padding: '1.5rem',
                        borderRadius: '16px',
                        cursor: 'pointer',
                        background: 'white',
                        textAlign: 'center',
                        boxShadow: 'var(--shadow-soft)'
                      }}
                    >
                      <h5 style={{ margin: '0 0 0.5rem', fontSize: '1rem', fontWeight: 800 }}>Set to {plan}</h5>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-pink)', fontWeight: 800 }}>
                        {plan === 'Premium' ? "$199/mo" : plan === 'Pro' ? "$79/mo" : "$29/mo"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: SECURITY */}
            {activeTab === 'Security' && (
              <form onSubmit={e => { e.preventDefault(); alert("Security configuration locked!"); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="form-group">
                  <label style={{ display: 'block', fontWeight: 800, marginBottom: '0.4rem' }}>CURRENT PASSWORD</label>
                  <input type="password" style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid rgba(122, 78, 58, 0.2)' }} />
                </div>
                <div className="form-group">
                  <label style={{ display: 'block', fontWeight: 800, marginBottom: '0.4rem' }}>NEW PASSWORD</label>
                  <input type="password" style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid rgba(122, 78, 58, 0.2)' }} />
                </div>
                <button type="submit" className="btn-primary">Update Password</button>
              </form>
            )}

          </div>

        </div>
      </main>
    </div>
  );
};

export default AdminSettings;
