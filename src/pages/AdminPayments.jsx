import React from 'react';
import { DollarSign, LayoutDashboard, ShoppingBag, Package, Users, BarChart2, Truck, Ticket, Settings as SettingsIcon, Search, Filter, Download, MoreVertical, Eye, CheckCircle2, Clock, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTenant } from '../context/TenantContext';

const AdminPayments = () => {
  const { user, switchRole } = useAuth();
  const { businesses } = useTenant();
  const activeBizId = user?.businessId || 'cakeflow';
  const biz = businesses[activeBizId] || businesses['cakeflow'];

  const transactions = [
    { id: "#TRX-9901", customer: "Alice Green", amount: "$45.00", method: "Credit Card", status: "Completed", date: "Today, 10:45 AM" },
    { id: "#TRX-9900", customer: "Bob Smith", amount: "$38.00", method: "PayPal", status: "Completed", date: "Today, 09:12 AM" },
    { id: "#TRX-9899", customer: "Charlie Brown", amount: "$42.00", method: "Apple Pay", status: "Pending", date: "Today, 08:30 AM" },
    { id: "#TRX-9898", customer: "Diana Prince", amount: "$50.00", method: "Credit Card", status: "Completed", date: "Yesterday" },
    { id: "#TRX-9897", customer: "Edward Norton", amount: "$40.00", method: "Google Pay", status: "Failed", date: "Yesterday" },
  ];

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Transaction ID,Customer,Amount,Method,Status,Date\n"
      + transactions.map(t => `${t.id},${t.customer},${t.amount},${t.method},${t.status},${t.date}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "payments_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin' },
    { name: 'Orders', icon: <ShoppingBag size={20} />, path: '/admin/orders' },
    { name: 'Products', icon: <Package size={20} />, path: '/admin/products' },
    { name: 'Customers', icon: <Users size={20} />, path: '/admin/customers' },
    { name: 'Payments', icon: <DollarSign size={20} />, path: '/admin/payments', active: true },
    { name: 'Analytics', icon: <BarChart2 size={20} />, path: '/admin/analytics' },
    { name: 'Delivery', icon: <Truck size={20} />, path: '/admin/delivery' },
    { name: 'Coupons', icon: <Ticket size={20} />, path: '/admin/coupons' },
    { name: 'Settings', icon: <SettingsIcon size={20} />, path: '/admin/settings' },
    { name: 'Communication', icon: <MessageSquare size={20} />, path: '/admin/communication' }
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
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
          <div>
            <h1 style={{ fontSize: '3rem', fontWeight: 800 }}>Payment Ledger</h1>
            <p style={{ color: 'var(--color-brown)', fontSize: '1.1rem', opacity: 0.8 }}>Track your transactions and revenue flow.</p>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <div className="card" style={{ padding: '0.8rem 2rem', background: 'white', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ color: 'var(--color-brown)', fontWeight: 600 }}>This Month:</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--color-pink)' }}>$12,450</div>
            </div>
          </div>
        </header>

        <div className="card" style={{ padding: '0', background: 'white', overflow: 'hidden' }}>
          <div style={{ padding: '2rem', borderBottom: '2px solid var(--color-cream)', display: 'flex', gap: '1.5rem' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: 'var(--color-cream)', padding: '0.8rem 1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid rgba(122, 78, 58, 0.1)' }}>
              <Search size={20} color="var(--color-brown)" />
              <input type="text" placeholder="Search transactions..." style={{ border: 'none', background: 'none', outline: 'none', width: '100%', fontSize: '1rem' }} />
            </div>
            <button onClick={handleExportCSV} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem 1.5rem', background: 'white', border: '2px solid var(--color-cream)', borderRadius: 'var(--radius-xl)', fontWeight: 700, cursor: 'pointer' }}>
              <Download size={20} /> Export
            </button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: 'var(--color-cream)' }}>
              <tr style={{ textAlign: 'left' }}>
                <th style={{ padding: '1.5rem 2rem', color: 'var(--color-brown-dark)', fontWeight: 800 }}>Transaction ID</th>
                <th style={{ padding: '1.5rem', color: 'var(--color-brown-dark)', fontWeight: 800 }}>Customer</th>
                <th style={{ padding: '1.5rem', color: 'var(--color-brown-dark)', fontWeight: 800 }}>Amount</th>
                <th style={{ padding: '1.5rem', color: 'var(--color-brown-dark)', fontWeight: 800 }}>Method</th>
                <th style={{ padding: '1.5rem', color: 'var(--color-brown-dark)', fontWeight: 800 }}>Status</th>
                <th style={{ padding: '1.5rem', color: 'var(--color-brown-dark)', fontWeight: 800 }}>Date</th>
                <th style={{ padding: '1.5rem 2rem' }}></th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(trx => (
                <tr key={trx.id} style={{ borderBottom: '1px solid var(--color-cream)' }}>
                  <td style={{ padding: '1.5rem 2rem', fontWeight: 700, color: 'var(--color-brown)' }}>{trx.id}</td>
                  <td style={{ padding: '1.5rem', fontWeight: 800, color: 'var(--color-brown-dark)' }}>{trx.customer}</td>
                  <td style={{ padding: '1.5rem', fontWeight: 900, color: 'var(--color-pink)', fontSize: '1.1rem' }}>{trx.amount}</td>
                  <td style={{ padding: '1.5rem', fontWeight: 600 }}>{trx.method}</td>
                  <td style={{ padding: '1.5rem' }}>
                    <span style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem',
                      color: trx.status === 'Completed' ? '#4CAF50' : trx.status === 'Pending' ? '#FF9800' : '#F44336',
                      fontWeight: 800,
                      fontSize: '0.9rem'
                    }}>
                      {trx.status === 'Completed' ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                      {trx.status}
                    </span>
                  </td>
                  <td style={{ padding: '1.5rem', fontSize: '0.9rem', color: 'var(--color-brown)', opacity: 0.7 }}>{trx.date}</td>
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

export default AdminPayments;
