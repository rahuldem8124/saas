import React from 'react';
import { BarChart2, LayoutDashboard, ShoppingBag, Package, Users, DollarSign, Truck, Ticket, Settings as SettingsIcon, Eye, TrendingUp, ArrowUpRight, ArrowDownRight, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTenant } from '../context/TenantContext';

const AdminAnalytics = () => {
  const { user, switchRole } = useAuth();
  const { businesses } = useTenant();
  const activeBizId = user?.businessId || 'cakeflow';
  const biz = businesses[activeBizId] || businesses['cakeflow'];
  
  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin' },
    { name: 'Orders', icon: <ShoppingBag size={20} />, path: '/admin/orders' },
    { name: 'Products', icon: <Package size={20} />, path: '/admin/products' },
    { name: 'Customers', icon: <Users size={20} />, path: '/admin/customers' },
    { name: 'Payments', icon: <DollarSign size={20} />, path: '/admin/payments' },
    { name: 'Analytics', icon: <BarChart2 size={20} />, path: '/admin/analytics', active: true },
    { name: 'Delivery', icon: <Truck size={20} />, path: '/admin/delivery' },
    { name: 'Coupons', icon: <Ticket size={20} />, path: '/admin/coupons' },
    { name: 'Settings', icon: <SettingsIcon size={20} />, path: '/admin/settings' },
    { name: 'Communication', icon: <MessageSquare size={20} />, path: '/admin/communication' }
  ];

  const metrics = [
    { label: "Total Revenue", value: "$45,280", trend: "+12.5%", positive: true },
    { label: "Avg. Order Value", value: "$52.40", trend: "+3.2%", positive: true },
    { label: "Conversion Rate", value: "4.8%", trend: "-0.5%", positive: false },
    { label: "Return Customer Rate", value: "32%", trend: "+5.1%", positive: true },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-cream)' }}>
      <aside style={{ width: '280px', backgroundColor: 'var(--color-white)', borderRight: '1px solid rgba(122, 78, 58, 0.1)', padding: '2.5rem 1.5rem', position: 'fixed', height: '100vh', boxSizing: 'border-box', zIndex: 1100, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '1.6rem', fontFamily: 'var(--font-heading)', fontWeight: 'bold', marginBottom: '2.5rem', color: 'var(--color-brown-dark)' }}>
          <div>{biz.name}</div>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-pink)', fontWeight: 900, textTransform: 'uppercase' }}>
            {biz.category} OPERATOR
          </span>
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
          <h1 style={{ fontSize: '3rem', fontWeight: 800 }}>Business Analytics</h1>
          <p style={{ color: 'var(--color-brown)', fontSize: '1.1rem', opacity: 0.8 }}>Deep dive into your sales and customer behavior.</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', marginBottom: '4rem' }}>
          {metrics.map((m, i) => (
            <div key={i} className="card" style={{ padding: '2rem', background: 'white' }}>
              <div style={{ color: 'var(--color-brown)', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.8rem', opacity: 0.7 }}>{m.label}</div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--color-brown-dark)', marginBottom: '0.8rem' }}>{m.value}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: m.positive ? '#4CAF50' : '#F44336', fontWeight: 800, fontSize: '0.9rem' }}>
                {m.positive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {m.trend}
                <span style={{ color: 'var(--color-brown)', opacity: 0.5, fontWeight: 500, marginLeft: '0.2rem' }}>vs last month</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem' }}>
          <div className="card" style={{ padding: '2.5rem', background: 'white' }}>
            <h3 style={{ marginBottom: '2.5rem', fontSize: '1.5rem', fontWeight: 800 }}>Revenue Growth</h3>
            <div style={{ height: '300px', display: 'flex', alignItems: 'flex-end', gap: '1.5rem', padding: '0 1rem' }}>
              {[30, 45, 35, 60, 50, 85, 65, 95, 75, 110, 90, 130].map((h, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${h}px` }}
                    style={{ width: '100%', background: i === 11 ? 'var(--gradient-pink)' : 'var(--color-cream)', borderRadius: '8px 8px 2px 2px' }}
                  ></motion.div>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-brown)', opacity: 0.6 }}>{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: '2.5rem', background: 'white' }}>
            <h3 style={{ marginBottom: '2.5rem', fontSize: '1.5rem', fontWeight: 800 }}>Order Categories</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {[
                { label: 'Birthday', value: 45, color: 'var(--color-pink)' },
                { label: 'Wedding', value: 25, color: '#D4AF37' },
                { label: 'Custom', value: 20, color: '#7A4E3A' },
                { label: 'Other', value: 10, color: 'var(--color-peach)' },
              ].map((c, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', fontWeight: 700 }}>
                    <span>{c.label}</span>
                    <span>{c.value}%</span>
                  </div>
                  <div style={{ height: '12px', background: 'var(--color-cream)', borderRadius: '6px', overflow: 'hidden' }}>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${c.value}%` }}
                      style={{ height: '100%', background: c.color }}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminAnalytics;
