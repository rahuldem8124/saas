import React from 'react';
import { Users, LayoutDashboard, ShoppingBag, Package, DollarSign, BarChart2, Truck, Ticket, Settings as SettingsIcon, Search, Filter, Mail, Phone, MoreVertical, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminCustomers = () => {
  const { switchRole } = useAuth();
  const customers = [
    { id: 1, name: "Alice Green", email: "alice@example.com", phone: "+1 234 567 890", orders: 12, totalSpent: "$540", lastOrder: "2 days ago" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", phone: "+1 234 567 891", orders: 5, totalSpent: "$210", lastOrder: "5 days ago" },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com", phone: "+1 234 567 892", orders: 8, totalSpent: "$320", lastOrder: "1 week ago" },
    { id: 4, name: "Diana Prince", email: "diana@example.com", phone: "+1 234 567 893", orders: 15, totalSpent: "$750", lastOrder: "Yesterday" },
    { id: 5, name: "Edward Norton", email: "edward@example.com", phone: "+1 234 567 894", orders: 3, totalSpent: "$120", lastOrder: "2 weeks ago" },
  ];

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin' },
    { name: 'Orders', icon: <ShoppingBag size={20} />, path: '/admin/orders' },
    { name: 'Products', icon: <Package size={20} />, path: '/admin/products' },
    { name: 'Customers', icon: <Users size={20} />, path: '/admin/customers', active: true },
    { name: 'Payments', icon: <DollarSign size={20} />, path: '/admin/payments' },
    { name: 'Analytics', icon: <BarChart2 size={20} />, path: '/admin/analytics' },
    { name: 'Delivery', icon: <Truck size={20} />, path: '/admin/delivery' },
    { name: 'Coupons', icon: <Ticket size={20} />, path: '/admin/coupons' },
    { name: 'Settings', icon: <SettingsIcon size={20} />, path: '/admin/settings' },
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
          <h1 style={{ fontSize: '3rem', fontWeight: 800 }}>Customer Directory</h1>
          <p style={{ color: 'var(--color-brown)', fontSize: '1.1rem', opacity: 0.8 }}>Manage your cake lovers and their preferences.</p>
        </header>

        <div className="card" style={{ padding: '0', background: 'white', overflow: 'hidden' }}>
          <div style={{ padding: '2rem', borderBottom: '2px solid var(--color-cream)', display: 'flex', gap: '1.5rem' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: 'var(--color-cream)', padding: '0.8rem 1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid rgba(122, 78, 58, 0.1)' }}>
              <Search size={20} color="var(--color-brown)" />
              <input type="text" placeholder="Search customers..." style={{ border: 'none', background: 'none', outline: 'none', width: '100%', fontSize: '1rem' }} />
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem 1.5rem', background: 'white', border: '2px solid var(--color-cream)', borderRadius: 'var(--radius-xl)', fontWeight: 700 }}>
              <Filter size={20} /> Filter
            </button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: 'var(--color-cream)' }}>
              <tr style={{ textAlign: 'left' }}>
                <th style={{ padding: '1.5rem 2rem', color: 'var(--color-brown-dark)', fontWeight: 800 }}>Customer</th>
                <th style={{ padding: '1.5rem', color: 'var(--color-brown-dark)', fontWeight: 800 }}>Contact</th>
                <th style={{ padding: '1.5rem', color: 'var(--color-brown-dark)', fontWeight: 800 }}>Orders</th>
                <th style={{ padding: '1.5rem', color: 'var(--color-brown-dark)', fontWeight: 800 }}>Total Spent</th>
                <th style={{ padding: '1.5rem', color: 'var(--color-brown-dark)', fontWeight: 800 }}>Last Order</th>
                <th style={{ padding: '1.5rem 2rem' }}></th>
              </tr>
            </thead>
            <tbody>
              {customers.map(customer => (
                <tr key={customer.id} style={{ borderBottom: '1px solid var(--color-cream)' }}>
                  <td style={{ padding: '1.5rem 2rem' }}>
                    <div style={{ fontWeight: 800, color: 'var(--color-brown-dark)', fontSize: '1.1rem' }}>{customer.name}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-brown)', opacity: 0.6 }}>ID: #CUS-00{customer.id}</div>
                  </td>
                  <td style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', marginBottom: '0.3rem' }}><Mail size={14} /> {customer.email}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem' }}><Phone size={14} /> {customer.phone}</div>
                  </td>
                  <td style={{ padding: '1.5rem', fontWeight: 700 }}>{customer.orders}</td>
                  <td style={{ padding: '1.5rem', fontWeight: 800, color: 'var(--color-pink)' }}>{customer.totalSpent}</td>
                  <td style={{ padding: '1.5rem', fontSize: '0.9rem', fontWeight: 600 }}>{customer.lastOrder}</td>
                  <td style={{ padding: '1.5rem 2rem', textAlign: 'right' }}>
                    <MoreVertical size={20} color="var(--color-brown)" cursor="pointer" opacity={0.5} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminCustomers;
