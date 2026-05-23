import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTenant } from '../context/TenantContext';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Users, DollarSign, BarChart2, Truck, Ticket, Settings as SettingsIcon, MessageSquare, Package, Eye, Send, Bot, Shield, Check, Info } from 'lucide-react';
import AdminNavbar from '../components/AdminNavbar';

const CommunicationHub = () => {
  const { user } = useAuth();
  const { businesses, addChatMessage, updateBusiness } = useTenant();
  const location = useLocation();

  const activeBizId = user?.businessId || 'cakeflow';
  const biz = businesses[activeBizId] || businesses['cakeflow'];

  const [activeChannel, setActiveChannel] = useState('whatsapp');
  const [chatInput, setChatInput] = useState('');
  
  // Human takeover state
  const [humanTakeover, setHumanTakeover] = useState(false);

  // Broadcast state
  const [broadcastText, setBroadcastText] = useState('Exclusive Spring Sale! Get 20% off all catalog collections using code SPRING20.');
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastProgress, setBroadcastProgress] = useState(0);

  // Templates
  const [templates, setTemplates] = useState(biz.templates || [
    { id: "t1", name: "Order Placed", body: "Hi {customer}, your order for {product} is confirmed! 🎂 Status: {status}." }
  ]);
  const [editingTemplate, setEditingTemplate] = useState(null);

  const handleSendAdminChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    addChatMessage(biz.id, {
      sender: 'seller',
      text: humanTakeover ? `[HUMAN TAKE OVER]: ${chatInput}` : chatInput
    });
    setChatInput('');
  };

  const executeBroadcast = () => {
    setIsBroadcasting(true);
    setBroadcastProgress(0);

    const interval = setInterval(() => {
      setBroadcastProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsBroadcasting(false);
            alert(`Broadcast sent successfully to ${biz.orders.length + 15} customers!`);
          }, 500);
          return 100;
        }
        return prev + 25;
      });
    }, 400);
  };

  const saveTemplate = (id, newBody) => {
    const updated = templates.map(t => t.id === id ? { ...t, body: newBody } : t);
    setTemplates(updated);
    updateBusiness(biz.id, { templates: updated });
    setEditingTemplate(null);
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
      
      {/* Sidebar (same styles for perfect UI consistency) */}
      <aside className="admin-sidebar" style={{ 
        width: '280px', 
        backgroundColor: 'var(--color-white)', 
        borderRight: '1px solid rgba(122, 78, 58, 0.1)',
        padding: '2.5rem 1.5rem',
        position: 'fixed',
        height: '100vh',
        zIndex: 1100,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column'
      }}>
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

      {/* Main Panel Content */}
      <main className="admin-main" style={{ marginLeft: '280px', flex: 1, padding: '40px 4rem', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
        <AdminNavbar />
        <header style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '0.5rem' }}>Communication Hub</h1>
          <p style={{ color: 'var(--color-brown)', fontSize: '1.1rem', opacity: 0.8 }}>
            Manage automated broadcasts, message templates, and chat in human takeover mode.
          </p>
        </header>

        {/* Hub Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '3rem', flex: 1 }}>
          
          {/* LEFT COLUMN: Channels and Broadcasts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            
            {/* Live channels list */}
            <div className="card" style={{ padding: '2rem', background: 'white' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: '1.5rem' }}>Active Support Inbox</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {[
                  { id: 'whatsapp', name: "WhatsApp Business API", num: biz.whatsappNumber, active: true },
                  { id: 'instagram', name: "Instagram DM Automation", num: `@${biz.instagramUsername}`, active: false }
                ].map(chan => (
                  <div 
                    key={chan.id}
                    onClick={() => setActiveChannel(chan.id)}
                    style={{
                      padding: '1rem',
                      borderRadius: '12px',
                      border: '1px solid rgba(122, 78, 58, 0.1)',
                      background: activeChannel === chan.id ? 'var(--color-cream)' : 'transparent',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--color-brown-dark)' }}>{chan.name}</div>
                      <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>{chan.num}</span>
                    </div>
                    {activeChannel === chan.id && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-pink)' }} />}
                  </div>
                ))}
              </div>
            </div>

            {/* Broadcast panel */}
            <div className="card" style={{ padding: '2rem', background: 'white' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: '1.2rem' }}>WhatsApp Broadcast Dispatch</h3>
              <textarea 
                value={broadcastText}
                onChange={e => setBroadcastText(e.target.value)}
                style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid rgba(122, 78, 58, 0.2)', fontSize: '0.9rem', height: '100px', resize: 'none', outline: 'none', fontFamily: 'inherit', marginBottom: '1.5rem' }}
              />
              
              {isBroadcasting ? (
                <div>
                  <div style={{ height: '6px', background: 'var(--color-cream)', borderRadius: '3px', overflow: 'hidden', marginBottom: '8px' }}>
                    <div style={{ width: `${broadcastProgress}%`, height: '100%', background: 'var(--gradient-pink)' }} />
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-pink)' }}>Broadcasting: {broadcastProgress}%</span>
                </div>
              ) : (
                <button onClick={executeBroadcast} className="btn-primary" style={{ width: '100%' }}>Send Scoped Broadcast</button>
              )}
            </div>

          </div>

          {/* RIGHT COLUMN: Chat Console and Templates */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            
            {/* Live Chat & Takeover */}
            <div className="card" style={{ padding: '2rem', background: 'white', display: 'flex', flexDirection: 'column', height: '500px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-cream)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Bot size={22} color="var(--color-pink)" />
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 900, margin: 0 }}>Social Customer Console</h3>
                </div>
                
                {/* AI Takeover switch toggle */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, opacity: 0.7 }}>HUMAN TAKEOVER</span>
                  <button 
                    onClick={() => setHumanTakeover(!humanTakeover)}
                    style={{
                      width: '48px',
                      height: '24px',
                      borderRadius: '12px',
                      background: humanTakeover ? 'var(--gradient-pink)' : '#e0e0e0',
                      border: 'none',
                      position: 'relative',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'white', position: 'absolute', top: '3px', left: humanTakeover ? '26px' : '4px', transition: 'all 0.2s ease' }} />
                  </button>
                </div>
              </div>

              {/* Chat lines feed */}
              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem', paddingRight: '6px' }}>
                {biz.chats.map((chat, i) => (
                  <div 
                    key={i}
                    style={{
                      alignSelf: chat.sender === 'seller' ? 'flex-end' : 'flex-start',
                      background: chat.sender === 'seller' ? 'var(--color-brown-dark)' : '#ECEFF1',
                      color: chat.sender === 'seller' ? 'white' : 'var(--color-brown-dark)',
                      padding: '0.8rem 1.2rem',
                      borderRadius: '12px',
                      maxWidth: '75%',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      lineHeight: 1.4
                    }}
                  >
                    {chat.text}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendAdminChat} style={{ display: 'flex', gap: '8px' }}>
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  placeholder={humanTakeover ? "Manual console typing active..." : "Ask Bot to respond, or toggle Human Takeover"}
                  style={{ flex: 1, padding: '0.8rem', borderRadius: '10px', border: '1px solid rgba(122, 78, 58, 0.2)', fontSize: '0.9rem', outline: 'none' }}
                />
                <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Send size={18} />
                </button>
              </form>
            </div>

            {/* Message Template Editors */}
            <div className="card" style={{ padding: '2rem', background: 'white' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: '1.5rem' }}>Notification Automated Templates</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {templates.map(temp => (
                  <div key={temp.id} style={{ border: '1px solid rgba(122, 78, 58, 0.1)', padding: '1.2rem', borderRadius: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--color-brown-dark)' }}>{temp.name} Trigger</span>
                      {editingTemplate !== temp.id ? (
                        <button 
                          onClick={() => setEditingTemplate(temp.id)} 
                          style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-pink)', cursor: 'pointer' }}
                        >
                          EDIT
                        </button>
                      ) : (
                        <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>Editing...</span>
                      )}
                    </div>
                    
                    {editingTemplate === temp.id ? (
                      <div>
                        <textarea 
                          id={`area-${temp.id}`}
                          defaultValue={temp.body}
                          style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid rgba(122, 78, 58, 0.2)', fontSize: '0.85rem', fontFamily: 'inherit', height: '80px', marginBottom: '8px' }}
                        />
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                          <button onClick={() => setEditingTemplate(null)} className="btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>Cancel</button>
                          <button onClick={() => {
                            const val = document.getElementById(`area-${temp.id}`).value;
                            saveTemplate(temp.id, val);
                          }} className="btn-primary" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>Save</button>
                        </div>
                      </div>
                    ) : (
                      <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.8, lineHeight: 1.5, fontWeight: 500 }}>
                        {temp.body}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
};

export default CommunicationHub;
