import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, LayoutDashboard, ShoppingBag, Package, Users, DollarSign, BarChart2, Truck, Ticket, Eye, User, Bell, Shield, Store, Save, Heart, Layers, MessageSquare, AlertCircle, Plus, Trash2, Award, Check, Zap, RefreshCw, CreditCard, ShieldCheck } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTenant } from '../context/TenantContext';
import AdminNavbar from '../components/AdminNavbar';

const AdminSettings = () => {
  const { user, switchRole } = useAuth();
  const { businesses, updateBusiness } = useTenant();
  const location = useLocation();

  const activeBizId = user?.businessId || 'cakeflow';
  const biz = businesses[activeBizId] || businesses['cakeflow'];

  const [activeTab, setActiveTab] = useState(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get('tab');
    if (tabParam) return tabParam;
    return 'Storefront Config';
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [location.search]);

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

  // Custom detailed subscription form states for billing customizer
  const [selectedFeatures, setSelectedFeatures] = useState(biz.additionalFeatures || []);
  const [customMessagesCount, setCustomMessagesCount] = useState(biz.whatsappMessagesCount || 200);
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [isProcessingPay, setIsProcessingPay] = useState(false);

  // Dynamic cost calculations in Indian Rupees (₹)
  const getBillingDetails = () => {
    const baseHosting = 199;
    
    let featuresCost = 0;
    if (selectedFeatures.includes('Advanced Custom Fields Builder')) featuresCost += 150;
    if (selectedFeatures.includes('AI Chatbot Automation')) featuresCost += 250;
    if (selectedFeatures.includes('Shipping Integration')) featuresCost += 300;
    if (selectedFeatures.includes('Advanced Styling Themes')) featuresCost += 100;
    if (selectedFeatures.includes('Commission-Free Sales')) featuresCost += 200;

    const msgCount = Math.max(200, customMessagesCount || 200);
    const baseMsgCost = 100;
    const extraMsgBlocks = Math.max(0, Math.floor((msgCount - 200) / 50));
    const extraMsgCost = extraMsgBlocks * 25;
    const totalMsgCost = baseMsgCost + extraMsgCost;

    const subtotal = baseHosting + featuresCost + totalMsgCost;
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + tax;

    return { baseHosting, featuresCost, msgCount, totalMsgCost, subtotal, tax, total };
  };

  const handleUpdateSubscription = () => {
    setIsProcessingPay(true);
    
    setTimeout(() => {
      setIsProcessingPay(false);
      setShowCheckout(false);
      
      updateBusiness(biz.id, {
        isSubscribed: true,
        subscription: 'Custom Plan',
        whatsappMessagesCount: customMessagesCount,
        additionalFeatures: selectedFeatures
      });

      alert(`🎉 Webpage Subscription and Scope Updated Successfully!\nSelected Features: core webpage catalog + ${selectedFeatures.length} checked add-ons.\nStarting Monthly messages: ${customMessagesCount} messages.\n\nChanges have been synchronized across your tenant environment!`);
    }, 1200);
  };

  useEffect(() => {
    setSettings({
      name: biz.name || '',
      whatsappNumber: biz.whatsappNumber || '',
      instagramUsername: biz.instagramUsername || '',
      deliveryFee: biz.deliveryFee || '10.00',
      freeDeliveryLimit: biz.freeDeliveryLimit || '50.00'
    });
    setFields(biz.fields || []);
    setSelectedFeatures(biz.additionalFeatures || []);
    setCustomMessagesCount(biz.whatsappMessagesCount || 200);
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
        <AdminNavbar />
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

                {/* Public Storefront link sharing */}
                <div style={{ background: '#FFF8F3', padding: '1.5rem', borderRadius: '20px', border: '1.5px solid rgba(122, 78, 58, 0.1)', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--color-pink)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block' }}>📢 Public Storefront Sharing Link</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-brown)', fontWeight: 600 }}>Share this URL so customers can view your catalog and place direct orders:</span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input 
                      type="text" 
                      readOnly 
                      value={`http://localhost:5173/store/${activeBizId}`} 
                      style={{ flex: 1, padding: '0.8rem 1rem', borderRadius: '10px', border: '2px solid white', background: '#FFFFFF', fontWeight: 800, color: 'var(--color-brown-dark)', fontSize: '0.9rem', outline: 'none' }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(`http://localhost:5173/store/${activeBizId}`);
                        alert('📋 Public Storefront URL copied to clipboard!');
                      }}
                      style={{ background: 'var(--gradient-pink)', color: 'white', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '10px', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', boxShadow: 'var(--shadow-glow)' }}
                    >
                      Copy Link
                    </button>
                  </div>
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
                {!biz.additionalFeatures?.includes('Advanced Custom Fields Builder') ? (
                  <div style={{ background: 'rgba(242, 140, 163, 0.05)', border: '2px dashed var(--color-pink)', padding: '2.5rem', borderRadius: '20px', textAlign: 'center' }}>
                    <AlertCircle size={40} color="var(--color-pink)" style={{ margin: '0 auto 1.5rem' }} />
                    <h4 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--color-brown-dark)', marginBottom: '0.8rem' }}>Form Field Builder Integration Inactive</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-brown)', lineHeight: 1.6, marginBottom: '2rem' }}>
                      The **Advanced Custom Fields Builder** is not active in your storefront plan scope. Enable it in the Billing tab to create custom attributes, dropdown options, and date pickers for customer storefront checkouts.
                    </p>
                    <button 
                      onClick={() => setActiveTab('Billing & Gates')} 
                      className="btn-primary"
                    >
                      Enable Feature in Plan Scope
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                
                {/* Active Sub Header Card */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-cream)', padding: '2rem', borderRadius: '20px', border: '1px solid rgba(122,78,58,0.1)' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, opacity: 0.6, textTransform: 'uppercase' }}>Active Subscription Scope</span>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--color-pink)', margin: '0.3rem 0' }}>
                      {biz.subscription === 'Custom Plan' ? '🛡️ Custom Modular Plan' : `${biz.subscription} Plan`}
                    </h2>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-brown)' }}>Store Subdomain: {biz.id}.platform.com</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, opacity: 0.6, display: 'block' }}>RENEWAL DATE</span>
                    <b style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--color-brown-dark)' }}>June 25, 2026</b>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '2.5rem', alignItems: 'start' }}>
                  
                  {/* Left: Custom features checkboxes & Quotas */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    
                    {/* Core Core Price Card */}
                    <div style={{ background: '#1E293B', color: 'white', padding: '1.5rem', borderRadius: '18px', border: '2px solid #6366F1' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ background: '#4F46E5', color: 'white', padding: '3px 8px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 900 }}>INCLUDED</div>
                          <h3 style={{ fontSize: '1.1rem', fontWeight: 900, margin: 0 }}>Responsive Storefront Catalog</h3>
                        </div>
                        <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#60A5FA' }}>₹199<span style={{ fontSize: '0.75rem', opacity: 0.7 }}>/mo</span></span>
                      </div>
                      <p style={{ color: '#E2E8F0', fontSize: '0.8rem', margin: 0, fontWeight: 500, lineHeight: 1.4 }}>
                        Dynamic catalog webpage complete with Rupee checkout forms, order tracking, and client telemetry variables.
                      </p>
                    </div>

                    {/* Features checklist */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                      {[
                        { name: 'Advanced Custom Fields Builder', price: 150, desc: 'Allow custom dropdowns, date pickers, or text fields on catalog checkouts.' },
                        { name: 'AI Chatbot Automation', price: 250, desc: 'Enable automated confirmation logs & AI conversational auto-replies on WhatsApp.' },
                        { name: 'Shipping Integration', price: 300, desc: 'Provide tracking dispatches synced directly with Delhivery, Shiprocket, or Porter.' },
                        { name: 'Advanced Styling Themes', price: 100, desc: 'Unlock premium styling theme templates (Luxury, Minimal, Dark Accent editors).' },
                        { name: 'Commission-Free Sales', price: 200, desc: '0% platform sales commission fees on all transacted orders.' }
                      ].map(feat => {
                        const isChecked = selectedFeatures.includes(feat.name);
                        return (
                          <div
                            key={feat.name}
                            onClick={() => {
                              setSelectedFeatures(prev => 
                                isChecked ? prev.filter(x => x !== feat.name) : [...prev, feat.name]
                              );
                            }}
                            style={{
                              padding: '1rem 1.2rem',
                              borderRadius: '16px',
                              background: isChecked ? 'rgba(79, 70, 229, 0.04)' : '#FFFFFF',
                              border: isChecked ? '2px solid #4F46E5' : '1px solid rgba(0,0,0,0.06)',
                              cursor: 'pointer',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              transition: 'all 0.2s',
                              boxSizing: 'border-box'
                            }}
                          >
                            <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start', paddingRight: '1rem' }}>
                              <div style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: '5px',
                                border: isChecked ? 'none' : '2px solid rgba(0,0,0,0.15)',
                                background: isChecked ? '#4F46E5' : 'transparent',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                marginTop: '2px',
                                flexShrink: 0
                              }}>
                                {isChecked && <Check size={10} strokeWidth={4} style={{ margin: 'auto' }} />}
                              </div>
                              <div>
                                <div style={{ fontWeight: 800, color: 'var(--color-brown-dark)', fontSize: '0.85rem' }}>{feat.name}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--color-brown)', opacity: 0.7, marginTop: '2px', lineHeight: 1.3 }}>{feat.desc}</div>
                              </div>
                            </div>
                            <div style={{ textAlign: 'right', flexShrink: 0 }}>
                              <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: 900, color: isChecked ? '#4F46E5' : 'var(--color-brown-dark)' }}>
                                +₹{feat.price}
                              </span>
                              <span style={{ fontSize: '0.65rem', color: 'var(--color-brown)', opacity: 0.5, fontWeight: 700 }}>/ mo</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Messages Quota Counter */}
                    <div style={{ background: '#FFF8F3', padding: '1.2rem', borderRadius: '18px', border: '1px solid rgba(122,78,58,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem' }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--color-pink)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Social Message Quota limit
                      </span>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                        <button
                          type="button"
                          onClick={() => {
                            if (customMessagesCount > 200) setCustomMessagesCount(prev => prev - 50);
                          }}
                          disabled={customMessagesCount <= 200}
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            border: '1px solid rgba(0,0,0,0.1)',
                            background: customMessagesCount <= 200 ? '#F1F5F9' : '#FFFFFF',
                            color: customMessagesCount <= 200 ? '#94A3B8' : 'var(--color-brown-dark)',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            cursor: customMessagesCount <= 200 ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                            outline: 'none'
                          }}
                        >
                          −
                        </button>
                        
                        <div style={{ textAlign: 'center', width: '160px' }}>
                          <div style={{ fontSize: '1.8rem', fontWeight: 950, color: 'var(--color-brown-dark)', letterSpacing: '-0.5px' }}>
                            {customMessagesCount}
                          </div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-brown)', opacity: 0.6, fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>
                            Messages / Month
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => setCustomMessagesCount(prev => prev + 50)}
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            border: '1px solid rgba(0,0,0,0.1)',
                            background: '#FFFFFF',
                            color: 'var(--color-brown-dark)',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                            outline: 'none'
                          }}
                        >
                          +
                        </button>
                      </div>

                      <span style={{ fontSize: '0.7rem', color: 'var(--color-brown)', opacity: 0.8, fontWeight: 700 }}>
                        {customMessagesCount <= 200 
                          ? '✨ Baseline Quota (₹100 included in core price)' 
                          : `📈 Accruing +${customMessagesCount - 200} extra messages at ₹25 per 50 block`}
                      </span>
                    </div>

                  </div>

                  {/* Right: Price Projection & Checkout */}
                  <div style={{ position: 'sticky', top: '20px', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    
                    <div style={{
                      background: '#0F172A',
                      color: 'white',
                      padding: '1.8rem',
                      borderRadius: '24px',
                      boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
                      display: 'flex',
                      flexDirection: 'column',
                      boxSizing: 'border-box'
                    }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: 'white', margin: '0 0 6px 0', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Zap size={14} color="#60A5FA" /> Scope Cost Ledger
                      </h3>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '1rem', fontSize: '0.8rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                          <span style={{ opacity: 0.75 }}>Core Storefront webpage hosting:</span>
                          <span style={{ fontWeight: 800 }}>₹{getBillingDetails().baseHosting}/mo</span>
                        </div>
                        
                        {selectedFeatures.map(feat => {
                          let fPrice = 150;
                          if (feat === 'AI Chatbot Automation') fPrice = 250;
                          if (feat === 'Shipping Integration') fPrice = 300;
                          if (feat === 'Advanced Styling Themes') fPrice = 100;
                          if (feat === 'Commission-Free Sales') fPrice = 200;
                          return (
                            <div key={feat} style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, paddingLeft: '8px', borderLeft: '1.5px solid rgba(255,255,255,0.15)' }}>
                              <span style={{ opacity: 0.65 }}>+ {feat}:</span>
                              <span style={{ fontWeight: 700 }}>₹{fPrice}/mo</span>
                            </div>
                          );
                        })}

                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                          <span style={{ opacity: 0.75 }}>Custom Messages ({getBillingDetails().msgCount} msgs):</span>
                          <span style={{ fontWeight: 800 }}>₹{getBillingDetails().totalMsgCost}/mo</span>
                        </div>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.6rem', marginTop: '0.3rem' }}>
                          <span style={{ opacity: 0.85 }}>Subtotal:</span>
                          <span style={{ fontWeight: 800 }}>₹{getBillingDetails().subtotal}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                          <span style={{ opacity: 0.75 }}>GST Tax (18%):</span>
                          <span style={{ fontWeight: 800 }}>₹{getBillingDetails().tax}</span>
                        </div>
                      </div>

                      <div style={{ borderTop: '2px dashed rgba(255,255,255,0.12)', paddingTop: '1rem', marginTop: '1.2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.2rem' }}>
                          <span style={{ fontSize: '0.95rem', fontWeight: 900 }}>Total Billing:</span>
                          <span style={{ fontSize: '1.8rem', fontWeight: 950, color: '#60A5FA', tracking: '-1px' }}>
                            ₹{getBillingDetails().total}
                            <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 800 }}> / mo</span>
                          </span>
                        </div>
                        
                        {showCheckout ? (
                          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <button 
                                type="button"
                                onClick={() => setPaymentMethod('UPI')} 
                                style={{ flex: 1, padding: '5px', borderRadius: '6px', border: 'none', background: paymentMethod === 'UPI' ? 'var(--color-pink)' : 'rgba(255,255,255,0.05)', color: 'white', fontWeight: 800, fontSize: '0.7rem', cursor: 'pointer' }}
                              >
                                UPI QR
                              </button>
                              <button 
                                type="button"
                                onClick={() => setPaymentMethod('Card')} 
                                style={{ flex: 1, padding: '5px', borderRadius: '6px', border: 'none', background: paymentMethod === 'Card' ? 'var(--color-pink)' : 'rgba(255,255,255,0.05)', color: 'white', fontWeight: 800, fontSize: '0.7rem', cursor: 'pointer' }}
                              >
                                Card
                              </button>
                            </div>

                            {paymentMethod === 'UPI' ? (
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', background: '#FFFFFF', padding: '8px', borderRadius: '10px', color: '#0F172A' }}>
                                <div style={{ width: '80px', height: '80px', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', fontWeight: 900, fontSize: '0.65rem', border: '1.5px solid #E2E8F0', padding: '6px', boxSizing: 'border-box', textAlign: 'center' }}>
                                  [UPI QR CODE ₹{getBillingDetails().total}]
                                </div>
                                <span style={{ fontSize: '0.65rem', color: '#64748B', fontWeight: 800 }}>Scan QR from GPay / PhonePe</span>
                              </div>
                            ) : (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <input 
                                  type="text" 
                                  placeholder="4111 2222 3333 4444" 
                                  maxLength="19"
                                  style={{ padding: '6px 8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'white', fontSize: '0.75rem', fontWeight: 600, outline: 'none' }}
                                />
                                <div style={{ display: 'flex', gap: '5px' }}>
                                  <input 
                                    type="text" 
                                    placeholder="MM/YY" 
                                    style={{ flex: 1, padding: '6px 8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'white', fontSize: '0.75rem', fontWeight: 600, outline: 'none' }}
                                  />
                                  <input 
                                    type="password" 
                                    placeholder="CVV" 
                                    maxLength="3"
                                    style={{ flex: 1, padding: '6px 8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'white', fontSize: '0.75rem', fontWeight: 600, outline: 'none' }}
                                  />
                                </div>
                              </div>
                            )}

                            <button
                              type="button"
                              onClick={handleUpdateSubscription}
                              disabled={isProcessingPay}
                              style={{
                                width: '100%',
                                padding: '8px',
                                background: 'var(--gradient-pink)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontWeight: 900,
                                fontSize: '0.75rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '4px',
                                boxShadow: '0 4px 10px rgba(242,140,163,0.2)'
                              }}
                            >
                              {isProcessingPay ? (
                                <>
                                  <RefreshCw size={12} className="spin" style={{ margin: 'auto' }} /> Updating Scope...
                                </>
                              ) : (
                                <>
                                  <ShieldCheck size={12} /> Validate & Update Scope
                                </>
                              )}
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setShowCheckout(true)}
                            style={{
                              width: '100%',
                              background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                              color: 'white',
                              border: 'none',
                              padding: '1rem',
                              borderRadius: '12px',
                              fontSize: '0.9rem',
                              fontWeight: 900,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '6px',
                              boxShadow: '0 8px 20px -5px rgba(79, 70, 229, 0.3)',
                              transition: 'all 0.2s'
                            }}
                          >
                            Update Storefront Scope <Zap size={14} />
                          </button>
                        )}

                      </div>
                    </div>

                  </div>

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
