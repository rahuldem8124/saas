import React from 'react';
import { LayoutDashboard, ShoppingBag, Users, DollarSign, BarChart2, Truck, Ticket, Settings as SettingsIcon, TrendingUp, Package, ChevronRight, MoreVertical, Eye } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { switchRole } = useAuth();
  const location = useLocation();
  
  const stats = [
    { label: "Today's Orders", value: "24", icon: <ShoppingBag />, color: "rgba(242, 140, 163, 0.1)", trend: "+12%" },
    { label: "Revenue", value: "$1,450", icon: <DollarSign />, color: "rgba(255, 214, 165, 0.15)", trend: "+8%" },
    { label: "Pending Orders", value: "8", icon: <Package />, color: "rgba(122, 78, 58, 0.05)", trend: "-2%" },
    { label: "Completed", value: "118", icon: <TrendingUp />, color: "rgba(232, 180, 184, 0.15)", trend: "+15%" },
  ];

  const recentOrders = [
    { id: "#1024", customer: "Alice Green", cake: "Velvet Rose Dream", amount: "$45", status: "Baking", date: "2 mins ago" },
    { id: "#1023", customer: "Bob Smith", cake: "Chocolate Truffle", amount: "$38", status: "Out for Delivery", date: "15 mins ago" },
    { id: "#1022", customer: "Charlie Brown", cake: "Lemon Zest Bliss", amount: "$42", status: "Placed", date: "1 hour ago" },
    { id: "#1021", customer: "Diana Prince", cake: "Berry Vanilla", amount: "$50", status: "Delivered", date: "3 hours ago" },
  ];

  const handleDownloadReport = () => {
    const reportContent = "CakeFlow Admin Report\n\nGenerated on: " + new Date().toLocaleString() + "\n\nTotal Orders: 24\nRevenue: $1,450\nPending Orders: 8";
    const blob = new Blob([reportContent], { type: "text/plain;charset=utf-8" });
    const encodedUri = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "cakeflow_report.txt");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const topCakes = [
    { name: "Velvet Rose Dream", sales: 45, image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=50&q=80" },
    { name: "Chocolate Truffle", sales: 38, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=50&q=80" },
    { name: "Golden Caramel", sales: 32, image: "https://images.unsplash.com/photo-1519340333755-5672c2393a83?auto=format&fit=crop&w=50&q=80" },
  ];

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
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-cream)' }}>
      
      {/* Sidebar */}
      <aside style={{ 
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
        <div style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', fontWeight: 'bold', marginBottom: '2.5rem', color: 'var(--color-brown-dark)' }}>
          CakeFlow <span style={{ fontSize: '0.9rem', color: 'var(--color-pink)', verticalAlign: 'middle', fontWeight: 800 }}>ADMIN</span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, overflowY: 'auto' }}>
          {navItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.name} to={item.path} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.2rem',
                padding: '1rem 1.2rem',
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

          <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid rgba(122, 78, 58, 0.1)' }}>
            <Link 
              to="/home" 
              onClick={() => switchRole('user')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.2rem',
                padding: '1.2rem',
                borderRadius: 'var(--radius-md)',
                color: 'var(--color-brown)',
                fontWeight: 700,
                textDecoration: 'none',
                opacity: 0.8
              }}
            >
              <Eye size={20} /> Customer View
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ marginLeft: '280px', flex: 1, padding: '40px 4rem 4rem' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
          <div>
            <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem', fontWeight: 800 }}>Bakery Dashboard</h1>
            <p style={{ color: 'var(--color-brown)', fontSize: '1.1rem', opacity: 0.8 }}>Managing your sweet success today.</p>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <button onClick={handleDownloadReport} className="btn-secondary" style={{ padding: '0.8rem 1.5rem', fontSize: '1rem', cursor: 'pointer' }}>Download Report</button>
            <Link to="/admin/products" className="btn-primary" style={{ padding: '0.8rem 1.5rem', fontSize: '1rem', cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}>+ New Product</Link>
          </div>
        </header>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2.5rem', marginBottom: '4rem' }}>
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="card" 
              style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', background: 'white' }}
            >
              <div>
                <div style={{ color: 'var(--color-brown)', fontSize: '1rem', fontWeight: 600, marginBottom: '0.8rem' }}>{stat.label}</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--color-brown-dark)' }}>{stat.value}</div>
                <div style={{ fontSize: '0.9rem', color: stat.trend.startsWith('+') ? '#4CAF50' : '#F44336', marginTop: '0.8rem', fontWeight: 700 }}>
                  {stat.trend} <span style={{ opacity: 0.6, fontWeight: 500 }}>from yesterday</span>
                </div>
              </div>
              <div style={{ 
                width: '60px', 
                height: '60px', 
                borderRadius: '16px', 
                backgroundColor: stat.color, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'var(--color-pink)'
              }}>
                {stat.icon}
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '3rem' }}>
          
          {/* Recent Orders Table */}
          <div className="card" style={{ padding: '2.5rem', background: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Recent Orders</h3>
              <Link to="/admin/orders" style={{ color: 'var(--color-pink)', fontWeight: 800, fontSize: '1rem' }}>View All Orders →</Link>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--color-cream)' }}>
                  <th style={{ padding: '1.2rem 0', color: 'var(--color-brown)', fontWeight: 700 }}>Customer</th>
                  <th style={{ padding: '1.2rem 0', color: 'var(--color-brown)', fontWeight: 700 }}>Cake Type</th>
                  <th style={{ padding: '1.2rem 0', color: 'var(--color-brown)', fontWeight: 700 }}>Status</th>
                  <th style={{ padding: '1.2rem 0', color: 'var(--color-brown)', fontWeight: 700 }}>Amount</th>
                  <th style={{ padding: '1.2rem 0' }}></th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.id} style={{ borderBottom: '1px solid var(--color-cream)' }}>
                    <td style={{ padding: '1.5rem 0' }}>
                      <div style={{ fontWeight: 800, color: 'var(--color-brown-dark)' }}>{order.customer}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--color-brown)', opacity: 0.7 }}>{order.id}</div>
                    </td>
                    <td style={{ padding: '1.5rem 0', fontWeight: 600 }}>{order.cake}</td>
                    <td style={{ padding: '1.5rem 0' }}>
                      <span style={{
                        padding: '6px 16px',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        backgroundColor: order.status === 'Delivered' ? 'rgba(76, 175, 80, 0.1)' : order.status === 'Baking' ? 'rgba(255, 152, 0, 0.1)' : 'rgba(33, 150, 243, 0.1)',
                        color: order.status === 'Delivered' ? '#2E7D32' : order.status === 'Baking' ? '#E65100' : '#1565C0'
                      }}>
                        {order.status}
                      </span>
                    </td>
                    <td style={{ padding: '1.5rem 0', fontWeight: 800, color: 'var(--color-pink)', fontSize: '1.1rem' }}>{order.amount}</td>
                    <td style={{ padding: '1.5rem 0', textAlign: 'right' }}>
                      <MoreVertical size={20} color="var(--color-brown)" cursor="pointer" opacity={0.5} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Visuals Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {/* Sales Chart */}
            <div className="card" style={{ padding: '2.5rem', background: 'white' }}>
              <h3 style={{ marginBottom: '2.5rem', fontSize: '1.5rem', fontWeight: 800 }}>Weekly Performance</h3>
              <div style={{ 
                height: '220px', 
                display: 'flex', 
                alignItems: 'flex-end', 
                justifyContent: 'space-between',
                padding: '0 0.5rem',
                gap: '1.2rem'
              }}>
                {[40, 65, 45, 80, 55, 95, 70].map((h, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 1.2, delay: i * 0.1 }}
                      style={{ 
                        width: '100%', 
                        background: i === 5 ? 'var(--gradient-pink)' : 'var(--color-cream)', 
                        borderRadius: '12px 12px 4px 4px',
                        boxShadow: i === 5 ? 'var(--shadow-glow)' : 'none'
                      }}
                    ></motion.div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-brown)', fontWeight: 700 }}>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Selling */}
            <div className="card" style={{ padding: '2.5rem', background: 'white' }}>
              <h3 style={{ marginBottom: '2.5rem', fontSize: '1.5rem', fontWeight: 800 }}>Popular Items</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {topCakes.map((cake, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                    <div style={{ overflow: 'hidden', borderRadius: '12px', width: '56px', height: '56px' }}>
                      <img src={cake.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, color: 'var(--color-brown-dark)' }}>{cake.name}</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--color-brown)', opacity: 0.7 }}>{cake.sales} orders this week</div>
                    </div>
                    <div style={{ background: 'var(--color-cream)', padding: '0.5rem', borderRadius: '50%' }}>
                      <ChevronRight size={20} color="var(--color-pink)" />
                    </div>
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

export default AdminDashboard;
