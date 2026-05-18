import React, { useState } from 'react';
import { ShoppingBag, ChevronLeft, Search, Filter, MoreVertical, Download, Eye, LayoutDashboard, Package, Users, DollarSign, BarChart2, Truck, Ticket, Settings as SettingsIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const OrderManagement = () => {
  const { switchRole } = useAuth();
  const [orders, setOrders] = useState([
    { id: "#1024", customer: "Alice Green", cake: "Velvet Rose Dream", amount: "$45", status: "Baking", payment: "Paid", delivery: "Today, 4:00 PM" },
    { id: "#1023", customer: "Bob Smith", cake: "Chocolate Truffle", amount: "$38", status: "Out for Delivery", payment: "Paid", delivery: "Today, 2:30 PM" },
    { id: "#1022", customer: "Charlie Brown", cake: "Lemon Zest Bliss", amount: "$42", status: "Placed", payment: "Pending", delivery: "Tomorrow, 10:00 AM" },
    { id: "#1021", customer: "Diana Prince", cake: "Berry Vanilla", amount: "$50", status: "Delivered", payment: "Paid", delivery: "Yesterday" },
    { id: "#1020", customer: "Edward Norton", cake: "Midnight Chocolate", amount: "$40", status: "Delivered", payment: "Paid", delivery: "Yesterday" },
    { id: "#1019", customer: "Fiona Apple", cake: "Lavender Garden", amount: "$45", status: "Placed", payment: "Paid", delivery: "Tomorrow, 12:00 PM" },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order));
    // Persist for tracking page demo
    localStorage.setItem('current_order_status', newStatus);
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "ID,Customer,Order Details,Status,Payment,Delivery\n"
      + orders.map(o => `${o.id},${o.customer},${o.cake} - ${o.amount},${o.status},${o.payment},${o.delivery}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "orders_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin' },
    { name: 'Orders', icon: <ShoppingBag size={20} />, path: '/admin/orders', active: true },
    { name: 'Products', icon: <Package size={20} />, path: '/admin/products' },
    { name: 'Customers', icon: <Users size={20} />, path: '/admin/customers' },
    { name: 'Payments', icon: <DollarSign size={20} />, path: '/admin/payments' },
    { name: 'Analytics', icon: <BarChart2 size={20} />, path: '/admin/analytics' },
    { name: 'Delivery', icon: <Truck size={20} />, path: '/admin/delivery' },
    { name: 'Coupons', icon: <Ticket size={20} />, path: '/admin/coupons' },
    { name: 'Settings', icon: <SettingsIcon size={20} />, path: '/admin/settings' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-cream)' }}>
      
      {/* Sidebar */}
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
            <Link 
              to="/home" 
              onClick={() => switchRole('user')}
              style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', padding: '1.2rem', borderRadius: 'var(--radius-md)', color: 'var(--color-brown)', fontWeight: 700, textDecoration: 'none', opacity: 0.8 }}
            >
              <Eye size={20} /> Customer View
            </Link>
          </div>
        </nav>
      </aside>

      <main style={{ marginLeft: '280px', flex: 1, padding: '40px 4rem 4rem' }}>
        <header style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1rem' }}>
            <Link to="/admin" style={{ color: 'var(--color-brown)', background: 'white', padding: '0.5rem', borderRadius: '50%', boxShadow: 'var(--shadow-soft)' }}><ChevronLeft size={24} /></Link>
            <h1 style={{ fontSize: '3rem', margin: 0, fontWeight: 800 }}>Order Management</h1>
          </div>
          <p style={{ color: 'var(--color-brown)', fontSize: '1.1rem', opacity: 0.8 }}>Efficiently track and update your bakery operations.</p>
        </header>

        <div className="card" style={{ padding: '0', background: 'white', overflow: 'hidden' }}>
          <div style={{ padding: '2rem', borderBottom: '2px solid var(--color-cream)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: 'var(--color-cream)', padding: '0.8rem 1.5rem', borderRadius: 'var(--radius-xl)', width: '350px', border: '1px solid rgba(122, 78, 58, 0.1)' }}>
                <Search size={20} color="var(--color-brown)" />
                <input type="text" placeholder="Search customer or order ID..." style={{ border: 'none', background: 'none', outline: 'none', width: '100%', fontSize: '1rem', fontWeight: 500 }} />
              </div>
              <button style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem 1.5rem', background: 'white', border: '2px solid var(--color-cream)', borderRadius: 'var(--radius-xl)', fontWeight: 700, color: 'var(--color-brown)' }}>
                <Filter size={20} /> Filter
              </button>
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
                <th style={{ padding: '1.5rem', color: 'var(--color-brown-dark)', fontWeight: 800 }}>Order Details</th>
                <th style={{ padding: '1.5rem', color: 'var(--color-brown-dark)', fontWeight: 800 }}>Status</th>
                <th style={{ padding: '1.5rem', color: 'var(--color-brown-dark)', fontWeight: 800 }}>Payment</th>
                <th style={{ padding: '1.5rem', color: 'var(--color-brown-dark)', fontWeight: 800 }}>Delivery Window</th>
                <th style={{ padding: '1.5rem 2rem' }}></th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} style={{ borderBottom: '1px solid var(--color-cream)' }}>
                  <td style={{ padding: '1.8rem 2rem', fontWeight: 800, color: 'var(--color-pink)' }}>{order.id}</td>
                  <td style={{ padding: '1.8rem 1.5rem', fontWeight: 700, color: 'var(--color-brown-dark)' }}>{order.customer}</td>
                  <td style={{ padding: '1.8rem 1.5rem' }}>
                    <div style={{ fontWeight: 600 }}>{order.cake}</div>
                    <div style={{ color: 'var(--color-brown)', fontWeight: 800, fontSize: '1.1rem', marginTop: '0.4rem' }}>{order.amount}</div>
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
                        backgroundColor: order.status === 'Delivered' ? 'rgba(76, 175, 80, 0.1)' : order.status === 'Baking' ? 'rgba(255, 152, 0, 0.1)' : order.status === 'Out for Delivery' ? 'rgba(33, 150, 243, 0.1)' : order.status === 'Cancelled' ? 'rgba(244, 67, 54, 0.1)' : 'var(--color-cream)',
                        color: order.status === 'Delivered' ? '#2E7D32' : order.status === 'Baking' ? '#E65100' : order.status === 'Out for Delivery' ? '#1565C0' : order.status === 'Cancelled' ? '#C62828' : 'var(--color-brown)',
                        border: 'none',
                        cursor: 'pointer',
                        outline: 'none'
                      }}
                    >
                      <option value="Placed">Placed</option>
                      <option value="Payment Confirmed">Payment Confirmed</option>
                      <option value="Baking">Baking</option>
                      <option value="Decorating">Decorating</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td style={{ padding: '1.8rem 1.5rem' }}>
                    <span style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '0.6rem', 
                      color: order.payment === 'Paid' ? '#4CAF50' : '#FF9800',
                      fontSize: '0.95rem',
                      fontWeight: 800
                    }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: order.payment === 'Paid' ? '#4CAF50' : '#FF9800' }}></div>
                      {order.payment}
                    </span>
                  </td>
                  <td style={{ padding: '1.8rem 1.5rem', fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-brown)' }}>{order.delivery}</td>
                  <td style={{ padding: '1.8rem 2rem', textAlign: 'right' }}>
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

export default OrderManagement;
