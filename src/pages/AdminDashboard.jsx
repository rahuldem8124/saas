import React, { useState, useEffect } from 'react';
import { LayoutDashboard, ShoppingBag, Users, DollarSign, BarChart2, Truck, Ticket, Settings as SettingsIcon, MessageSquare, Package, ChevronRight, MoreVertical, Eye, Heart, Layers, ArrowUp, ArrowDown, Clipboard, Award, ShieldAlert, Thermometer, Palette } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTenant } from '../context/TenantContext';
import AdminNavbar from '../components/AdminNavbar';

const AdminDashboard = () => {
  const { user, switchRole } = useAuth();
  const { businesses, selectBusiness, updateBusiness, topUpMessageQuota, PLAN_LIMITS } = useTenant();
  const location = useLocation();

  const activeBizId = user?.businessId || 'cakeflow';
  const biz = businesses[activeBizId] || businesses['cakeflow'];

  const orders = biz.orders || [];
  
  // Custom Dashboard drag-and-drop modules for "Custom" category
  const [customModules, setCustomModules] = useState([
    { id: 'orders', name: 'Orders Analytics', visible: true },
    { id: 'inventory', name: 'Inventory & Sizes', visible: true },
    { id: 'analytics', name: 'Weekly Revenue Trends', visible: true },
    { id: 'payments', name: 'Simulated Gateway Logs', visible: true },
    { id: 'delivery', name: 'Shiprocket / Delhivery Courier Engine', visible: true },
    { id: 'customers', name: 'Active Customer Database', visible: true },
    { id: 'chat', name: 'WhatsApp Bot Activity', visible: true }
  ]);

  const moveModule = (index, direction) => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= customModules.length) return;
    const updated = [...customModules];
    const temp = updated[index];
    updated[index] = updated[nextIndex];
    updated[nextIndex] = temp;
    setCustomModules(updated);
  };

  const toggleModuleVisibility = (id) => {
    setCustomModules(prev => prev.map(m => m.id === id ? { ...m, visible: !m.visible } : m));
  };

  // Compute dynamic stats
  const totalRevenue = orders.reduce((sum, o) => sum + parseFloat(o.amount.replace('$', '') || 0), 0);
  const pendingCount = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length;
  const completedCount = orders.filter(o => o.status === 'Delivered').length;

  const handleDownloadReport = () => {
    const reportContent = `${biz.name} SaaS Operating Report\n` +
      `===============================\n` +
      `Generated on: ${new Date().toLocaleString()}\n\n` +
      `Total Scoped Orders: ${orders.length}\n` +
      `Total Cumulative Revenue: $${totalRevenue.toFixed(2)}\n` +
      `Pending Deliveries: ${pendingCount}\n` +
      `Category: ${biz.category}\n` +
      `Subscription Gate: ${biz.subscription}\n`;
    
    const blob = new Blob([reportContent], { type: "text/plain;charset=utf-8" });
    const encodedUri = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${biz.id}_report_${Date.now()}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        <div style={{ fontSize: '1.6rem', fontFamily: 'var(--font-heading)', fontWeight: 'bold', marginBottom: '2.5rem', color: 'var(--color-brown-dark)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div>{biz.name}</div>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-pink)', fontWeight: 900, textTransform: 'uppercase' }}>
            {biz.category} OPERATOR
          </span>
        </div>

        {/* Dynamic Tenant Selector Widget in Admin */}
        <div style={{ background: 'var(--color-cream)', padding: '10px', borderRadius: '12px', marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, marginBottom: '4px', opacity: 0.6 }}>ACTIVE SCOPE:</label>
          <select 
            value={activeBizId}
            onChange={(e) => {
              const selectedId = e.target.value;
              switchRole('admin', selectedId);
            }}
            style={{ width: '100%', padding: '6px', borderRadius: '8px', border: 'none', fontWeight: 800, color: 'var(--color-brown-dark)', outline: 'none' }}
          >
            {Object.values(businesses).map(b => (
              <option key={b.id} value={b.id}>{b.name} ({b.category})</option>
            ))}
          </select>
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
            <Link 
              to={`/store/${activeBizId}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.2rem',
                padding: '0.8rem 1.2rem',
                borderRadius: 'var(--radius-md)',
                color: 'white',
                background: 'var(--gradient-pink)',
                fontWeight: 800,
                textDecoration: 'none',
                boxShadow: 'var(--shadow-glow)',
                fontSize: '0.85rem'
              }}
            >
              <Eye size={18} /> Visit Store
            </Link>
            <Link 
              to="/saas" 
              onClick={() => switchRole('customer')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.2rem',
                padding: '0.8rem 1.2rem',
                borderRadius: 'var(--radius-md)',
                color: 'var(--color-brown)',
                fontWeight: 700,
                textDecoration: 'none',
                opacity: 0.8,
                fontSize: '0.85rem'
              }}
            >
              <Users size={18} /> SaaS Portal
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main" style={{ marginLeft: '280px', flex: 1, padding: '40px 4rem' }}>
        <AdminNavbar />
        
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
          <div>
            <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem', fontWeight: 900 }}>
              {biz.category} Dashboard
            </h1>
            <p style={{ color: 'var(--color-brown)', fontSize: '1.1rem', opacity: 0.8 }}>
              Managing <b>{biz.name}</b> scoping ({biz.subscription} Plan).
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <button onClick={handleDownloadReport} className="btn-secondary" style={{ padding: '0.8rem 1.5rem', fontSize: '1.05rem' }}>Download Scoped Report</button>
            <Link to="/admin/products" className="btn-primary" style={{ padding: '0.8rem 1.5rem', fontSize: '1.05rem', textDecoration: 'none' }}>+ Add Scoped Product</Link>
          </div>
        </header>

        {/* Automated Social Messaging Hub */}
        <section className="card" style={{ 
          background: 'white', 
          padding: '2.5rem', 
          borderRadius: '24px', 
          boxShadow: '0 4px 20px rgba(0,0,0,0.01)', 
          border: '1px solid rgba(122, 78, 58, 0.1)', 
          marginBottom: '4rem' 
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #F3F4F6', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(242, 140, 163, 0.1)', color: 'var(--color-pink)', padding: '4px 12px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 900, marginBottom: '0.5rem' }}>
                <MessageSquare size={12} /> AUTOMATED SOCIAL MESSAGING HUB
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--color-brown-dark)', margin: 0 }}>Social Automation Bot Engine</h2>
              <p style={{ margin: '0.2rem 0 0', fontSize: '0.85rem', color: 'var(--color-brown)', opacity: 0.7, fontWeight: 600 }}>Configure active channel automation, check subscription quotas, and refill credits instantly.</p>
            </div>
            
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-brown-dark)' }}>Active Subscription:</span>
              <span style={{ background: 'var(--color-brown-dark)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 900 }}>
                {biz.subscription} Plan
              </span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', flexWrap: 'wrap' }}>
            {/* Left Side: Channel Selector & Dynamic Pricing */}
            <div style={{ borderRight: '1px solid #F3F4F6', paddingRight: '3rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--color-brown-dark)', marginBottom: '1rem' }}>1. Select Automation Channel</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-brown)', opacity: 0.8, marginBottom: '1.5rem', fontWeight: 600 }}>
                Choose the social media channels through which your customers receive automated order confirmations, receipts, and customer service chats.
              </p>

              {/* Toggles */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {[
                  { channel: "WhatsApp", cost: 0.01, label: "WhatsApp Bot Automation", desc: "Send automated messages to WhatsApp numbers.", icon: "🟢", bg: 'rgba(16, 185, 129, 0.04)', border: 'rgba(16, 185, 129, 0.15)', activeColor: '#10B981' },
                  { channel: "Instagram", cost: 0.008, label: "Instagram Direct Automation", desc: "Interact via Instagram direct messages and comments.", icon: "🔵", bg: 'rgba(59, 130, 246, 0.04)', border: 'rgba(59, 130, 246, 0.15)', activeColor: '#3B82F6' },
                  { channel: "WhatsApp + Instagram", cost: 0.015, label: "Multi-Channel Automation (Both)", desc: "Synchronize both platforms under a single bot.", icon: "🟣", bg: 'rgba(139, 92, 246, 0.04)', border: 'rgba(139, 92, 246, 0.15)', activeColor: '#8B5CF6' }
                ].map((tier) => {
                  const isActive = (biz.automationChannel || "WhatsApp") === tier.channel;
                  return (
                    <div 
                      key={tier.channel}
                      onClick={() => {
                        updateBusiness(activeBizId, { 
                          automationChannel: tier.channel, 
                          perMessageCost: tier.cost 
                        });
                      }}
                      style={{
                        padding: '1.2rem 1.5rem',
                        borderRadius: '16px',
                        background: isActive ? tier.bg : 'white',
                        border: `2px solid ${isActive ? tier.activeColor : 'rgba(0,0,0,0.05)'}`,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.02)' : 'none'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ fontSize: '1.5rem' }}>{tier.icon}</span>
                        <div>
                          <div style={{ fontWeight: 800, color: 'var(--color-brown-dark)', fontSize: '0.95rem' }}>{tier.label}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-brown)', opacity: 0.7, fontWeight: 500 }}>{tier.desc}</div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ display: 'block', fontSize: '0.95rem', fontWeight: 900, color: isActive ? tier.activeColor : 'var(--color-brown-dark)' }}>
                          ${tier.cost.toFixed(3)}
                        </span>
                        <span style={{ fontSize: '0.65rem', color: 'var(--color-brown)', opacity: 0.5, fontWeight: 700 }}>PER MESSAGE</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Simulated Billing Projection */}
              <div style={{ background: 'var(--color-cream)', padding: '1.5rem', borderRadius: '16px', border: '1px dashed rgba(122, 78, 58, 0.15)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--color-pink)', fontWeight: 900, textTransform: 'uppercase', display: 'block' }}>SIMULATED ACCRUED BILLING</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-brown-dark)', fontWeight: 800 }}>Total messages automated: {biz.messagesUsed || 0}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.8rem', fontWeight: 950, color: 'var(--color-brown-dark)' }}>
                      ${((biz.messagesUsed || 0) * (biz.perMessageCost || 0.01)).toFixed(2)}
                    </div>
                    <span style={{ fontSize: '0.65rem', color: 'var(--color-brown)', opacity: 0.6, fontWeight: 800 }}>ESTIMATED COST</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Quotas, Remaining limit, Top up */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--color-brown-dark)', marginBottom: '1rem' }}>2. Subscription Quota & Used</h3>
                
                {/* Quota limit bars */}
                {(() => {
                  const limits = PLAN_LIMITS[biz.subscription] || PLAN_LIMITS['Basic'];
                  const orderCount = orders.length;
                  const orderLimit = limits.orders;
                  const isOrdersUnlimited = orderLimit === Infinity;
                  const ordersPercent = isOrdersUnlimited ? 0 : Math.min((orderCount / orderLimit) * 100, 100);

                  const msgUsed = biz.messagesUsed || 0;
                  const baseMsgLimit = limits.messages;
                  const topUpCount = biz.topUpMessages || 0;
                  const isMessagesUnlimited = baseMsgLimit === Infinity;
                  const msgLimit = isMessagesUnlimited ? Infinity : baseMsgLimit + topUpCount;
                  const msgRemaining = isMessagesUnlimited ? Infinity : Math.max(msgLimit - msgUsed, 0);
                  const msgPercent = isMessagesUnlimited ? 0 : Math.min((msgUsed / msgLimit) * 100, 100);

                  const isLowOnMessages = !isMessagesUnlimited && (msgRemaining / msgLimit) < 0.15;

                  return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
                      {/* Orders limit bar */}
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-brown-dark)', marginBottom: '0.5rem' }}>
                          <span>Orders Processed: {orderCount} / {isOrdersUnlimited ? '∞' : orderLimit}</span>
                          <span style={{ color: 'var(--color-pink)' }}>
                            {isOrdersUnlimited ? 'Unlimited' : `${ordersPercent.toFixed(0)}%`}
                          </span>
                        </div>
                        <div style={{ width: '100%', height: '8px', background: 'var(--color-cream)', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: `${isOrdersUnlimited ? 100 : ordersPercent}%`, height: '100%', background: 'var(--gradient-pink)', borderRadius: '4px' }} />
                        </div>
                        <span style={{ fontSize: '0.7rem', color: 'var(--color-brown)', opacity: 0.6, fontWeight: 700, display: 'block', marginTop: '4px' }}>
                          Quota resets at the start of your monthly billing cycle.
                        </span>
                      </div>

                      {/* Messages limit bar */}
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-brown-dark)', marginBottom: '0.5rem' }}>
                          <span>Messages Automated: {msgUsed} / {isMessagesUnlimited ? '∞' : msgLimit}</span>
                          <span style={{ color: isLowOnMessages ? '#EF4444' : '#10B981' }}>
                            {isMessagesUnlimited ? 'Unlimited' : `${msgPercent.toFixed(0)}%`}
                          </span>
                        </div>
                        <div style={{ width: '100%', height: '8px', background: 'var(--color-cream)', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: `${isMessagesUnlimited ? 100 : msgPercent}%`, height: '100%', background: isMessagesUnlimited ? '#10B981' : isLowOnMessages ? '#EF4444' : '#10B981', borderRadius: '4px' }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                          <span style={{ fontSize: '0.7rem', color: 'var(--color-brown)', opacity: 0.6, fontWeight: 700 }}>
                            {biz.topUpMessages > 0 ? `Includes +${biz.topUpMessages} top-up credits.` : 'Base plan allotment active.'}
                          </span>
                          <span style={{ 
                            fontSize: '0.85rem', 
                            fontWeight: 900, 
                            color: isLowOnMessages ? '#EF4444' : 'var(--color-brown-dark)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            {isLowOnMessages && "⚠️"} {isMessagesUnlimited ? 'Unlimited' : `${msgRemaining.toLocaleString()} remaining`}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Refill credits action */}
              <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #F3F4F6' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 900, color: 'var(--color-brown-dark)', margin: '0 0 0.8rem' }}>3. Refill Message Credits</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-brown)', opacity: 0.7, margin: '0 0 1rem', fontWeight: 600 }}>
                  Need more messaging capacity? Top up your account instantly. Refilled credits do not expire and carry over monthly.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.8rem' }}>
                  {[
                    { amount: 500, label: "+500 Msgs", desc: "$5.00" },
                    { amount: 1000, label: "+1k Msgs", desc: "$9.00" },
                    { amount: 5000, label: "+5k Msgs", desc: "$40.00" }
                  ].map((pkg) => (
                    <button
                      key={pkg.amount}
                      onClick={() => {
                        topUpMessageQuota(activeBizId, pkg.amount);
                        alert(`🎉 Successfully added +${pkg.amount.toLocaleString()} social messaging credits to ${biz.name}!`);
                      }}
                      className="btn-secondary touch-friendly"
                      style={{
                        padding: '0.6rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '12px',
                        border: '1px solid rgba(122, 78, 58, 0.2)',
                        background: 'white',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        gap: '2px'
                      }}
                    >
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-brown-dark)' }}>{pkg.label}</span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--color-pink)', fontWeight: 800 }}>{pkg.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------- CAKE BUSINESS DASHBOARD -------------------- */}
        {biz.category === 'Cake' && (
          <div>
            {/* Stats */}
            <div className="admin-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2.5rem', marginBottom: '4rem' }}>
              {[
                { label: "Today's Orders", value: orders.length.toString(), icon: <ShoppingBag />, trend: "Baking priority queue active" },
                { label: "Upcoming Deliveries", value: "1", icon: <Truck />, trend: "Schedule synced tomorrow" },
                { label: "Cake Requests", value: "2", icon: <Layers />, trend: "Custom field inspiration uploaded" },
                { label: "Revenue Scoped", value: `$${totalRevenue.toFixed(2)}`, icon: <DollarSign />, trend: "Fully paid in escrow" }
              ].map((stat, i) => (
                <div key={i} className="card" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', background: 'white' }}>
                  <div>
                    <div style={{ color: 'var(--color-brown)', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.8rem' }}>{stat.label}</div>
                    <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--color-brown-dark)' }}>{stat.value}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-pink)', marginTop: '0.8rem', fontWeight: 800 }}>{stat.trend}</div>
                  </div>
                  <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: 'rgba(242, 140, 163, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-pink)' }}>
                    {stat.icon}
                  </div>
                </div>
              ))}
            </div>

            {/* Popular flavors & Temperature alerts */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem', marginBottom: '4rem' }}>
              <div className="card" style={{ padding: '2.5rem', background: 'white' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '2rem' }}>Popular Scoped Flavors</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {[
                    { name: "Chocolate Truffle", share: "52%", count: 18 },
                    { name: "Red Velvet", share: "30%", count: 11 },
                    { name: "Lemon Zest", share: "18%", count: 6 }
                  ].map((flav, i) => (
                    <div key={i}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 800, marginBottom: '0.4rem' }}>
                        <span>{flav.name} ({flav.count} orders)</span>
                        <span style={{ color: 'var(--color-pink)' }}>{flav.share}</span>
                      </div>
                      <div style={{ width: '100%', height: '8px', background: 'var(--color-cream)', borderRadius: '4px' }}>
                        <div style={{ width: flav.share, height: '100%', background: 'var(--gradient-pink)', borderRadius: '4px' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card" style={{ padding: '2.5rem', background: 'white', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '0.5rem' }}>Oven Temperature</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <Thermometer size={48} color="var(--color-pink)" />
                  <div>
                    <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--color-brown-dark)' }}>375°F</div>
                    <span style={{ fontSize: '0.8rem', color: '#4CAF50', fontWeight: 800 }}>Preheating Optimal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* -------------------- SHOE BUSINESS DASHBOARD -------------------- */}
        {biz.category === 'Shoes' && (
          <div>
            <div className="admin-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2.5rem', marginBottom: '4rem' }}>
              {[
                { label: "Active Inventory", value: "3 models", icon: <Package />, trend: "95 stock active" },
                { label: "Sizes Scoped", value: "US 7 - 11", icon: <Layers />, trend: "Standard fits synced" },
                { label: "Pending Orders", value: pendingCount.toString(), icon: <ShoppingBag />, trend: "Ready for courier dispatch" },
                { label: "Total Revenue", value: `$${totalRevenue.toFixed(2)}`, icon: <DollarSign />, trend: "Courier payouts pending" }
              ].map((stat, i) => (
                <div key={i} className="card" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', background: 'white' }}>
                  <div>
                    <div style={{ color: 'var(--color-brown)', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.8rem' }}>{stat.label}</div>
                    <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--color-brown-dark)' }}>{stat.value}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-pink)', marginTop: '0.8rem', fontWeight: 800 }}>{stat.trend}</div>
                  </div>
                  <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: 'rgba(255, 214, 165, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-pink)' }}>
                    {stat.icon}
                  </div>
                </div>
              ))}
            </div>

            {/* Popular Products size breakdown */}
            <div className="card" style={{ padding: '2.5rem', background: 'white', marginBottom: '4rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '2rem' }}>Size Distribution Stats</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'flex-end', height: '150px' }}>
                {[
                  { size: "US 7", pct: 15 },
                  { size: "US 8", pct: 30 },
                  { size: "US 9", pct: 60 },
                  { size: "US 10", pct: 40 },
                  { size: "US 11", pct: 20 }
                ].map((s, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '100%', height: `${s.pct}%`, background: 'var(--color-brown-dark)', borderRadius: '6px 6px 0 0' }} />
                    <span style={{ fontSize: '0.8rem', fontWeight: 800 }}>{s.size}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* -------------------- CLOTHING BUSINESS DASHBOARD -------------------- */}
        {biz.category === 'Clothing' && (
          <div>
            <div className="admin-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2.5rem', marginBottom: '4rem' }}>
              {[
                { label: "Active Apparel Collection", value: `${biz.products.length} Items`, icon: <Package />, trend: "Essentials & Outerwear active" },
                { label: "Top Selected Silhouette", value: "Oversized Fit", icon: <Layers />, trend: "82% of buyers prefer relaxed cuts" },
                { label: "Monogram Requests", value: orders.filter(o => o.customFields?.monogram).length.toString(), icon: <Award />, trend: "Custom embroidery queue" },
                { label: "Apparel Revenue", value: `$${totalRevenue.toFixed(2)}`, icon: <DollarSign />, trend: "Merchant payout cleared" }
              ].map((stat, i) => (
                <div key={i} className="card" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', background: 'white' }}>
                  <div>
                    <div style={{ color: 'var(--color-brown)', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.8rem' }}>{stat.label}</div>
                    <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--color-brown-dark)' }}>{stat.value}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-pink)', marginTop: '0.8rem', fontWeight: 800 }}>{stat.trend}</div>
                  </div>
                  <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: 'rgba(79, 70, 229, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4F46E5' }}>
                    {stat.icon}
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Apparel Size & Monogram Dashboard */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2.5rem', marginBottom: '4rem' }}>
              <div className="card" style={{ padding: '2.5rem', background: 'white' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '2rem' }}>Apparel Size Demands</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'flex-end', height: '160px' }}>
                  {[
                    { size: "XS", pct: 15 },
                    { size: "S", pct: 35 },
                    { size: "M", pct: 85 },
                    { size: "L", pct: 55 },
                    { size: "XL", pct: 25 }
                  ].map((s, i) => (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '100%', height: `${s.pct}%`, background: 'linear-gradient(to top, #4F46E5, #818CF8)', borderRadius: '6px 6px 0 0' }} />
                      <span style={{ fontSize: '0.8rem', fontWeight: 800 }}>{s.size} ({s.pct}%)</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card" style={{ padding: '2.5rem', background: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '0.5rem' }}>Active Monograms</h3>
                  <p style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 500, marginBottom: '1.5rem' }}>Embroidery queue details:</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {orders.filter(o => o.customFields?.monogram).length > 0 ? (
                      orders.filter(o => o.customFields?.monogram).map((o, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.8rem 1rem', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                          <span style={{ fontWeight: 800, color: '#334155', fontSize: '0.9rem' }}>{o.customer}</span>
                          <span style={{ background: '#EEF2FF', color: '#4F46E5', fontWeight: 900, padding: '0.25rem 0.75rem', borderRadius: '8px', fontSize: '0.85rem', letterSpacing: '1px' }}>
                            "{o.customFields.monogram}"
                          </span>
                        </div>
                      ))
                    ) : (
                      <div style={{ color: '#64748B', textAlign: 'center', padding: '2rem', fontSize: '0.9rem' }}>No custom monograms in queue.</div>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem', color: '#10B981', fontWeight: 800, fontSize: '0.85rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
                  Embroidery Station Calibrated
                </div>
              </div>
            </div>
          </div>
        )}

        {/* -------------------- ACCESSORIES BUSINESS DASHBOARD -------------------- */}
        {biz.category === 'Accessories' && (
          <div>
            <div className="admin-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2.5rem', marginBottom: '4rem' }}>
              {[
                { label: "Trending Pieces", value: "Celestial Hoops", icon: <Award />, trend: "Top engagement this week" },
                { label: "Metal Polish", value: "18k Rose Gold", icon: <Palette />, trend: "Most chosen variable" },
                { label: "Active Orders", value: orders.length.toString(), icon: <ShoppingBag />, trend: "Engraving customizations pending" },
                { label: "Boutique Revenue", value: `$${totalRevenue.toFixed(2)}`, icon: <DollarSign />, trend: "Processed in full" }
              ].map((stat, i) => (
                <div key={i} className="card" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', background: 'white' }}>
                  <div>
                    <div style={{ color: 'var(--color-brown)', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.8rem' }}>{stat.label}</div>
                    <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--color-brown-dark)' }}>{stat.value}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-pink)', marginTop: '0.8rem', fontWeight: 800 }}>{stat.trend}</div>
                  </div>
                  <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: 'rgba(122, 78, 58, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-pink)' }}>
                    {stat.icon}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -------------------- HANDMADE BUSINESS DASHBOARD -------------------- */}
        {biz.category === 'Handmade' && (
          <div>
            <div className="admin-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2.5rem', marginBottom: '4rem' }}>
              {[
                { label: "Build Queue", value: "Queue #3", icon: <Clipboard />, trend: "Next up: Hand-painted mug" },
                { label: "Custom Uploads", value: "1 reference", icon: <Layers />, trend: "Customer attachment synced" },
                { label: "Orders Pending", value: pendingCount.toString(), icon: <ShoppingBag />, trend: "Materials prepared" },
                { label: "Revenue", value: `$${totalRevenue.toFixed(2)}`, icon: <DollarSign />, trend: "Payout verified" }
              ].map((stat, i) => (
                <div key={i} className="card" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', background: 'white' }}>
                  <div>
                    <div style={{ color: 'var(--color-brown)', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.8rem' }}>{stat.label}</div>
                    <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--color-brown-dark)' }}>{stat.value}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-pink)', marginTop: '0.8rem', fontWeight: 800 }}>{stat.trend}</div>
                  </div>
                  <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: 'rgba(232, 180, 184, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-pink)' }}>
                    {stat.icon}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -------------------- CUSTOM BUSINESS DYNAMIC CANVAS -------------------- */}
        {biz.category === 'Custom' && (
          <div style={{ marginBottom: '4rem' }}>
            <div style={{ background: '#ECEFF1', border: '2px dashed var(--color-brown)', padding: '2rem', borderRadius: '20px', marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', color: 'var(--color-brown-dark)' }}>
                <ShieldAlert size={20} />
                <h4 style={{ margin: 0, fontWeight: 900 }}>Drag-and-Drop Interactive Modules (Visual Canvas Sim)</h4>
              </div>
              <p style={{ margin: '0 0 2rem', fontSize: '0.85rem', fontWeight: 700, opacity: 0.7 }}>
                Reorder your control panels live using the vertical movement actions or toggle view locks to build a tailored layout.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {customModules.map((mod, index) => (
                  <div 
                    key={mod.id}
                    style={{
                      background: 'white',
                      border: '1px solid rgba(0,0,0,0.1)',
                      borderRadius: '12px',
                      padding: '1rem 1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                      opacity: mod.visible ? 1 : 0.4
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, background: '#ECEFF1', padding: '2px 8px', borderRadius: '4px', color: 'var(--color-brown-dark)' }}>
                        Pos: {index + 1}
                      </span>
                      <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>{mod.name}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <button 
                        onClick={() => toggleModuleVisibility(mod.id)}
                        style={{ fontSize: '0.75rem', fontWeight: 800, background: 'var(--color-cream)', padding: '4px 10px', borderRadius: '8px', cursor: 'pointer', color: 'var(--color-brown-dark)' }}
                      >
                        {mod.visible ? "HIDE" : "SHOW"}
                      </button>
                      <button onClick={() => moveModule(index, -1)} style={{ cursor: 'pointer' }} disabled={index === 0}>
                        <ArrowUp size={16} />
                      </button>
                      <button onClick={() => moveModule(index, 1)} style={{ cursor: 'pointer' }} disabled={index === customModules.length - 1}>
                        <ArrowDown size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Scoped metrics rendering below reordered dashboard */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
              {customModules.filter(m => m.visible).map(mod => (
                <div key={mod.id} className="card" style={{ background: 'white', padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '1rem', borderBottom: '1px solid var(--color-cream)', paddingBottom: '0.8rem' }}>{mod.name}</h3>
                  {mod.id === 'orders' && <div>Orders Active: <b>{orders.length}</b></div>}
                  {mod.id === 'inventory' && <div>Products catalog count: <b>{biz.products.length}</b></div>}
                  {mod.id === 'analytics' && <div>Gross Scoped Revenues: <b>${totalRevenue.toFixed(2)}</b></div>}
                  {mod.id === 'payments' && <div>Gateway checkout simulation: <b style={{ color: '#4CAF50' }}>Enabled</b></div>}
                  {mod.id === 'delivery' && <div>Courier integration status: <b>Active</b></div>}
                  {mod.id === 'customers' && <div>Seeded customer registry synced.</div>}
                  {mod.id === 'chat' && <div>Bot automated response rate: <b style={{ color: 'var(--color-pink)' }}>100%</b></div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Scoped Recent Orders Table (Shared Backend - Dynamic Scoped UI) */}
        <div className="card" style={{ padding: '2.5rem', background: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 900 }}>Scoped Recent Orders</h3>
            <Link to="/admin/orders" style={{ color: 'var(--color-pink)', fontWeight: 800, fontSize: '1rem' }}>View Scoped Queue →</Link>
          </div>
          <div className="table-responsive">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--color-cream)' }}>
                  <th style={{ padding: '1.2rem 0', color: 'var(--color-brown)', fontWeight: 700 }}>Customer</th>
                  <th style={{ padding: '1.2rem 0', color: 'var(--color-brown)', fontWeight: 700 }}>Items Scoped</th>
                  <th style={{ padding: '1.2rem 0', color: 'var(--color-brown)', fontWeight: 700 }}>Courier Status</th>
                  <th style={{ padding: '1.2rem 0', color: 'var(--color-brown)', fontWeight: 700 }}>Amount</th>
                  <th style={{ padding: '1.2rem 0' }}></th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ padding: '3rem', textAlign: 'center', opacity: 0.5, fontWeight: 700 }}>No scoped orders listed yet.</td>
                  </tr>
                ) : (
                  orders.map(order => (
                    <tr key={order.id} style={{ borderBottom: '1px solid var(--color-cream)' }}>
                      <td style={{ padding: '1.5rem 0' }}>
                        <div style={{ fontWeight: 800, color: 'var(--color-brown-dark)' }}>{order.customer}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--color-brown)', opacity: 0.7 }}>{order.id}</div>
                      </td>
                      <td style={{ padding: '1.5rem 0', fontWeight: 600 }}>
                        {order.items && order.items.length > 0 ? order.items[0].name : "Custom Item"}
                      </td>
                      <td style={{ padding: '1.5rem 0' }}>
                        <span style={{
                          padding: '6px 16px',
                          borderRadius: '20px',
                          fontSize: '0.85rem',
                          fontWeight: 800,
                          backgroundColor: order.status === 'Delivered' ? 'rgba(76, 175, 80, 0.1)' : order.status === 'Baking' || order.status === 'Preparing' || order.status === 'In Progress' ? 'rgba(255, 152, 0, 0.1)' : order.status === 'Out for Delivery' || order.status === 'Shipped' ? 'rgba(33, 150, 243, 0.1)' : 'rgba(122, 78, 58, 0.05)',
                          color: order.status === 'Delivered' ? '#2E7D32' : order.status === 'Baking' || order.status === 'Preparing' || order.status === 'In Progress' ? '#E65100' : order.status === 'Out for Delivery' || order.status === 'Shipped' ? '#1565C0' : 'var(--color-brown)'
                        }}>
                          {order.status}
                        </span>
                      </td>
                      <td style={{ padding: '1.5rem 0', fontWeight: 800, color: 'var(--color-pink)', fontSize: '1.1rem' }}>{order.amount}</td>
                      <td style={{ padding: '1.5rem 0', textAlign: 'right' }}>
                        <MoreVertical size={20} color="var(--color-brown)" cursor="pointer" opacity={0.5} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
};

export default AdminDashboard;
