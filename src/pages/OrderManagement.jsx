import React, { useState } from 'react';
import { ShoppingBag, ChevronLeft, Search, Filter, MoreVertical, Download, Eye, LayoutDashboard, Package, Users, DollarSign, BarChart2, Truck, Ticket, Settings as SettingsIcon, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTenant } from '../context/TenantContext';
import { Link, useLocation } from 'react-router-dom';

const OrderManagement = () => {
  const { user } = useAuth();
  const { businesses, updateOrderStatus } = useTenant();
  const location = useLocation();

  const activeBizId = user?.businessId || 'cakeflow';
  const biz = businesses[activeBizId] || businesses['cakeflow'];
  const orders = biz.orders || [];

  const [searchQuery, setSearchQuery] = useState('');

  const handleStatusChange = (id, newStatus) => {
    updateOrderStatus(biz.id, id, newStatus);
    alert(`Order #${id} status updated to: ${newStatus}`);
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "ID,Customer,Order Details,Status,Payment,Delivery\n"
      + orders.map(o => `${o.id},${o.customer},${o.amount},${o.status},${o.payment},${o.date}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${biz.id}_orders_export.csv`);
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

  const filteredOrders = orders.filter(order => 
    order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      <main className="admin-main" style={{ marginLeft: '280px', flex: 1, padding: '40px 4rem 4rem' }}>
        <header style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1rem' }}>
            <Link to="/admin" style={{ color: 'var(--color-brown)', background: 'white', padding: '0.5rem', borderRadius: '50%', boxShadow: 'var(--shadow-soft)' }}><ChevronLeft size={24} /></Link>
            <h1 style={{ fontSize: '3rem', margin: 0, fontWeight: 900 }}>Order Management</h1>
          </div>
          <p style={{ color: 'var(--color-brown)', fontSize: '1.1rem', opacity: 0.8 }}>Efficiently track and update your scoped business operations.</p>
        </header>

        <div className="card" style={{ padding: '0', background: 'white', overflow: 'hidden' }}>
          <div style={{ padding: '2rem', borderBottom: '2px solid var(--color-cream)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: 'var(--color-cream)', padding: '0.8rem 1.5rem', borderRadius: 'var(--radius-xl)', width: '350px', border: '1px solid rgba(122, 78, 58, 0.1)' }}>
                <Search size={20} color="var(--color-brown)" />
                <input 
                  type="text" 
                  placeholder="Search customer or order ID..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ border: 'none', background: 'none', outline: 'none', width: '100%', fontSize: '1rem', fontWeight: 500 }} 
                />
              </div>
            </div>
            <button onClick={handleExportCSV} className="btn-secondary" style={{ padding: '0.8rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', cursor: 'pointer' }}>
              <Download size={20} /> Export CSV
            </button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: 'var(--color-cream)' }}>
              <tr style={{ textAlign: 'left' }}>
                <th style={{ padding: '1.5rem 2rem', color: 'var(--color-brown-dark)', fontWeight: 800 }}>ID</th>
                <th style={{ padding: '1.5rem', color: 'var(--color-brown-dark)', fontWeight: 800 }}>Customer</th>
                <th style={{ padding: '1.5rem', color: 'var(--color-brown-dark)', fontWeight: 800 }}>Items Scoped</th>
                <th style={{ padding: '1.5rem', color: 'var(--color-brown-dark)', fontWeight: 800 }}>Custom Options</th>
                <th style={{ padding: '1.5rem', color: 'var(--color-brown-dark)', fontWeight: 800 }}>Status</th>
                <th style={{ padding: '1.5rem', color: 'var(--color-brown-dark)', fontWeight: 800 }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: '3rem', textAlign: 'center', opacity: 0.5, fontWeight: 700 }}>No orders in this scoped registry.</td>
                </tr>
              ) : (
                filteredOrders.map(order => (
                  <tr key={order.id} style={{ borderBottom: '1px solid var(--color-cream)' }}>
                    <td style={{ padding: '1.8rem 2rem', fontWeight: 800, color: 'var(--color-pink)' }}>{order.id}</td>
                    <td style={{ padding: '1.8rem 1.5rem', fontWeight: 700, color: 'var(--color-brown-dark)' }}>{order.customer}</td>
                    <td style={{ padding: '1.8rem 1.5rem', fontWeight: 600 }}>
                      {order.items && order.items.length > 0 ? order.items[0].name : "Custom Item"}
                    </td>
                    <td style={{ padding: '1.8rem 1.5rem', fontSize: '0.8rem', opacity: 0.8 }}>
                      {order.customFields ? Object.entries(order.customFields).map(([k, v]) => (
                        <div key={k}><b>{k}:</b> {v || 'N/A'}</div>
                      )) : "None"}
                    </td>
                    <td style={{ padding: '1.8rem 1.5rem' }}>
                      <select 
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '20px',
                          fontSize: '0.9rem',
                          fontWeight: 800,
                          backgroundColor: 'var(--color-cream)',
                          border: 'none',
                          cursor: 'pointer',
                          outline: 'none'
                        }}
                      >
                        <option value="Placed">Placed</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Preparing">Preparing / Baking / Packing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td style={{ padding: '1.8rem 1.5rem', fontWeight: 800, color: 'var(--color-pink)', fontSize: '1.1rem' }}>{order.amount}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default OrderManagement;
