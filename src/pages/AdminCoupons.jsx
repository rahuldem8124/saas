import React, { useState } from 'react';
import { Ticket, LayoutDashboard, ShoppingBag, Package, Users, DollarSign, BarChart2, Truck, Settings as SettingsIcon, Eye, Plus, Search, Trash2, Edit2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminCoupons = () => {
  const { switchRole } = useAuth();
  
  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin' },
    { name: 'Orders', icon: <ShoppingBag size={20} />, path: '/admin/orders' },
    { name: 'Products', icon: <Package size={20} />, path: '/admin/products' },
    { name: 'Customers', icon: <Users size={20} />, path: '/admin/customers' },
    { name: 'Payments', icon: <DollarSign size={20} />, path: '/admin/payments' },
    { name: 'Analytics', icon: <BarChart2 size={20} />, path: '/admin/analytics' },
    { name: 'Delivery', icon: <Truck size={20} />, path: '/admin/delivery' },
    { name: 'Coupons', icon: <Ticket size={20} />, path: '/admin/coupons', active: true },
    { name: 'Settings', icon: <SettingsIcon size={20} />, path: '/admin/settings' },
  ];

  const [coupons, setCoupons] = useState([
    { code: "SWEET10", discount: "10% OFF", type: "Percentage", usage: "145/500", status: "Active", expiry: "Dec 31, 2024" },
    { code: "CAKEFLOW50", discount: "$5.00 OFF", type: "Fixed Amount", usage: "89/200", status: "Active", expiry: "Nov 15, 2024" },
    { code: "WEDDING2024", discount: "15% OFF", type: "Wedding Only", usage: "12/50", status: "Active", expiry: "Dec 01, 2024" },
    { code: "WELCOME", discount: "20% OFF", type: "New User", usage: "342/Unlimited", status: "Active", expiry: "Never" },
    { code: "EXPIRED10", discount: "10% OFF", type: "General", usage: "100/100", status: "Expired", expiry: "Oct 01, 2024" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCouponCode, setNewCouponCode] = useState("");
  const [newCouponDiscount, setNewCouponDiscount] = useState("");

  const handleCreateCoupon = () => {
    setIsModalOpen(true);
  };

  const confirmCreateCoupon = () => {
    if (newCouponCode.trim()) {
      setCoupons([{
        code: newCouponCode.toUpperCase(),
        discount: newCouponDiscount || "10% OFF",
        type: "General",
        usage: "0/100",
        status: "Active",
        expiry: "Dec 31, 2025"
      }, ...coupons]);
      setNewCouponCode("");
      setNewCouponDiscount("");
      setIsModalOpen(false);
    }
  };

  const cancelCreateCoupon = () => {
    setNewCouponCode("");
    setNewCouponDiscount("");
    setIsModalOpen(false);
  };

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
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
          <div>
            <h1 style={{ fontSize: '3rem', fontWeight: 800 }}>Promotions & Coupons</h1>
            <p style={{ color: 'var(--color-brown)', fontSize: '1.1rem', opacity: 0.8 }}>Create and manage discount codes for your customers.</p>
          </div>
          <button onClick={handleCreateCoupon} className="btn-primary" style={{ padding: '0.8rem 2rem', display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '1rem' }}>
            <Plus size={20} /> Create New Coupon
          </button>
        </header>

        <div className="card" style={{ padding: '0', background: 'white', overflow: 'hidden' }}>
          <div style={{ padding: '2rem', borderBottom: '2px solid var(--color-cream)', display: 'flex', gap: '1.5rem' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: 'var(--color-cream)', padding: '0.8rem 1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid rgba(122, 78, 58, 0.1)' }}>
              <Search size={20} color="var(--color-brown)" />
              <input type="text" placeholder="Search coupon codes..." style={{ border: 'none', background: 'none', outline: 'none', width: '100%', fontSize: '1rem' }} />
            </div>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: 'var(--color-cream)' }}>
              <tr style={{ textAlign: 'left' }}>
                <th style={{ padding: '1.5rem 2rem', color: 'var(--color-brown-dark)', fontWeight: 800 }}>Coupon Code</th>
                <th style={{ padding: '1.5rem', color: 'var(--color-brown-dark)', fontWeight: 800 }}>Discount</th>
                <th style={{ padding: '1.5rem', color: 'var(--color-brown-dark)', fontWeight: 800 }}>Type</th>
                <th style={{ padding: '1.5rem', color: 'var(--color-brown-dark)', fontWeight: 800 }}>Usage</th>
                <th style={{ padding: '1.5rem', color: 'var(--color-brown-dark)', fontWeight: 800 }}>Status</th>
                <th style={{ padding: '1.5rem', color: 'var(--color-brown-dark)', fontWeight: 800 }}>Expiry</th>
                <th style={{ padding: '1.5rem 2rem' }}></th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--color-cream)' }}>
                  <td style={{ padding: '1.5rem 2rem' }}>
                    <div style={{ padding: '0.5rem 1rem', background: 'var(--color-cream)', borderRadius: '8px', display: 'inline-block', fontWeight: 900, color: 'var(--color-brown-dark)', border: '1px dashed var(--color-pink)' }}>
                      {c.code}
                    </div>
                  </td>
                  <td style={{ padding: '1.5rem', fontWeight: 800, color: 'var(--color-pink)' }}>{c.discount}</td>
                  <td style={{ padding: '1.5rem', fontWeight: 600 }}>{c.type}</td>
                  <td style={{ padding: '1.5rem' }}>
                    <div style={{ fontWeight: 700 }}>{c.usage}</div>
                    <div style={{ height: '6px', background: 'var(--color-cream)', borderRadius: '3px', marginTop: '0.4rem', width: '100px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', background: 'var(--color-pink)', width: `${(parseInt(c.usage) / 500) * 100}%` }}></div>
                    </div>
                  </td>
                  <td style={{ padding: '1.5rem' }}>
                    <span style={{ 
                      padding: '4px 12px', 
                      borderRadius: '12px', 
                      fontSize: '0.8rem', 
                      fontWeight: 800,
                      backgroundColor: c.status === 'Active' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                      color: c.status === 'Active' ? '#2E7D32' : '#C62828'
                    }}>{c.status}</span>
                  </td>
                  <td style={{ padding: '1.5rem', fontWeight: 600, color: 'var(--color-brown)', opacity: 0.7 }}>{c.expiry}</td>
                  <td style={{ padding: '1.5rem 2rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                      <Edit2 size={18} color="var(--color-brown)" cursor="pointer" opacity={0.5} />
                      <Trash2 size={18} color="#F44336" cursor="pointer" opacity={0.5} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {isModalOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="card" style={{ background: 'white', padding: '2.5rem', width: '400px', borderRadius: 'var(--radius-xl)', boxShadow: '0 10px 40px rgba(0,0,0,0.15)' }}>
              <h2 style={{ marginBottom: '1.5rem', fontWeight: 800, color: 'var(--color-brown-dark)' }}>Create New Coupon</h2>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--color-brown)' }}>Coupon Code</label>
                <input 
                  type="text" 
                  value={newCouponCode} 
                  onChange={(e) => setNewCouponCode(e.target.value)} 
                  placeholder="e.g. SUMMER20"
                  style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '12px', border: '1px solid rgba(122, 78, 58, 0.2)', fontSize: '1rem', outline: 'none', color: 'var(--color-brown-dark)', boxSizing: 'border-box' }}
                  autoFocus
                />
              </div>
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--color-brown)' }}>Discount Amount</label>
                <input 
                  type="text" 
                  value={newCouponDiscount} 
                  onChange={(e) => setNewCouponDiscount(e.target.value)} 
                  placeholder="e.g. 20% OFF or $10 OFF"
                  style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '12px', border: '1px solid rgba(122, 78, 58, 0.2)', fontSize: '1rem', outline: 'none', color: 'var(--color-brown-dark)', boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button onClick={cancelCreateCoupon} style={{ padding: '0.8rem 1.5rem', background: 'transparent', color: 'var(--color-brown)', border: '1px solid rgba(122, 78, 58, 0.2)', borderRadius: '12px', cursor: 'pointer', fontWeight: 700, fontSize: '0.95rem' }}>Cancel</button>
                <button onClick={confirmCreateCoupon} className="btn-primary" style={{ padding: '0.8rem 1.5rem', borderRadius: '12px', cursor: 'pointer', border: 'none', fontWeight: 700, fontSize: '0.95rem' }}>Create</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminCoupons;
