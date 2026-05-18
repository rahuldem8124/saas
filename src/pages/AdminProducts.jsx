import React, { useState } from 'react';
import { Package, LayoutDashboard, ShoppingBag, Users, DollarSign, BarChart2, Truck, Ticket, Settings as SettingsIcon, Search, Filter, Plus, MoreVertical, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminProducts = () => {
  const { switchRole } = useAuth();
  const [products, setProducts] = useState([
    { id: 1, name: "Velvet Rose Dream", category: "Birthday", price: "$45", stock: 12, status: "Active", image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=50&q=80" },
    { id: 2, name: "Chocolate Truffle", category: "Birthday", price: "$38", stock: 8, status: "Active", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=50&q=80" },
    { id: 3, name: "Luxury White Lace", category: "Wedding", price: "$450", stock: 5, status: "Active", image: "https://images.unsplash.com/photo-1535254973040-607b474cb8c2?auto=format&fit=crop&w=50&q=80" },
    { id: 4, name: "Rainbow Swirl", category: "Birthday", price: "$40", stock: 15, status: "Active", image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=50&q=80" },
    { id: 5, name: "Berry Vanilla", category: "Trending", price: "$50", stock: 0, status: "Out of Stock", image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=50&q=80" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProductName, setNewProductName] = useState("");

  const handleAddProduct = () => {
    setIsModalOpen(true);
  };

  const confirmAddProduct = () => {
    if (newProductName.trim()) {
      setProducts([...products, {
        id: Date.now(),
        name: newProductName,
        category: "New",
        price: "$45",
        stock: 10,
        status: "Active",
        image: "https://images.unsplash.com/photo-1557308536-ee471ef2c390?auto=format&fit=crop&w=50&q=80"
      }]);
      setNewProductName("");
      setIsModalOpen(false);
    }
  };

  const cancelAddProduct = () => {
    setNewProductName("");
    setIsModalOpen(false);
  };

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin' },
    { name: 'Orders', icon: <ShoppingBag size={20} />, path: '/admin/orders' },
    { name: 'Products', icon: <Package size={20} />, path: '/admin/products', active: true },
    { name: 'Customers', icon: <Users size={20} />, path: '/admin/customers' },
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
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
          <div>
            <h1 style={{ fontSize: '3rem', fontWeight: 800 }}>Product Catalog</h1>
            <p style={{ color: 'var(--color-brown)', fontSize: '1.1rem', opacity: 0.8 }}>Manage your cake inventory and pricing.</p>
          </div>
          <button onClick={handleAddProduct} className="btn-primary" style={{ padding: '0.8rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', cursor: 'pointer' }}>
            <Plus size={20} /> Add New Product
          </button>
        </header>

        <div className="card" style={{ padding: '0', background: 'white', overflow: 'hidden' }}>
          <div style={{ padding: '2rem', borderBottom: '2px solid var(--color-cream)', display: 'flex', gap: '1.5rem' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: 'var(--color-cream)', padding: '0.8rem 1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid rgba(122, 78, 58, 0.1)' }}>
              <Search size={20} color="var(--color-brown)" />
              <input type="text" placeholder="Search products..." style={{ border: 'none', background: 'none', outline: 'none', width: '100%', fontSize: '1rem' }} />
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem 1.5rem', background: 'white', border: '2px solid var(--color-cream)', borderRadius: 'var(--radius-xl)', fontWeight: 700 }}>
              <Filter size={20} /> Filter
            </button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: 'var(--color-cream)' }}>
              <tr style={{ textAlign: 'left' }}>
                <th style={{ padding: '1.5rem 2rem', color: 'var(--color-brown-dark)', fontWeight: 800 }}>Product</th>
                <th style={{ padding: '1.5rem', color: 'var(--color-brown-dark)', fontWeight: 800 }}>Category</th>
                <th style={{ padding: '1.5rem', color: 'var(--color-brown-dark)', fontWeight: 800 }}>Price</th>
                <th style={{ padding: '1.5rem', color: 'var(--color-brown-dark)', fontWeight: 800 }}>Stock</th>
                <th style={{ padding: '1.5rem', color: 'var(--color-brown-dark)', fontWeight: 800 }}>Status</th>
                <th style={{ padding: '1.5rem 2rem' }}></th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} style={{ borderBottom: '1px solid var(--color-cream)' }}>
                  <td style={{ padding: '1.2rem 2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <img src={product.image} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                      <span style={{ fontWeight: 700, color: 'var(--color-brown-dark)' }}>{product.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1.2rem' }}>{product.category}</td>
                  <td style={{ padding: '1.2rem', fontWeight: 800, color: 'var(--color-pink)' }}>{product.price}</td>
                  <td style={{ padding: '1.2rem' }}>
                    <span style={{ color: product.stock === 0 ? '#F44336' : 'inherit', fontWeight: 600 }}>{product.stock} units</span>
                  </td>
                  <td style={{ padding: '1.2rem' }}>
                    <span style={{ 
                      padding: '4px 12px', 
                      borderRadius: '12px', 
                      fontSize: '0.8rem', 
                      fontWeight: 800,
                      backgroundColor: product.status === 'Active' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                      color: product.status === 'Active' ? '#2E7D32' : '#C62828'
                    }}>{product.status}</span>
                  </td>
                  <td style={{ padding: '1.2rem 2rem', textAlign: 'right' }}>
                    <MoreVertical size={20} color="var(--color-brown)" cursor="pointer" opacity={0.5} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {isModalOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="card" style={{ background: 'white', padding: '2.5rem', width: '400px', borderRadius: 'var(--radius-xl)', boxShadow: '0 10px 40px rgba(0,0,0,0.15)' }}>
              <h2 style={{ marginBottom: '1.5rem', fontWeight: 800, color: 'var(--color-brown-dark)' }}>Add New Product</h2>
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--color-brown)' }}>Product Name</label>
                <input 
                  type="text" 
                  value={newProductName} 
                  onChange={(e) => setNewProductName(e.target.value)} 
                  placeholder="e.g. Strawberry Shortcake"
                  style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '12px', border: '1px solid rgba(122, 78, 58, 0.2)', fontSize: '1rem', outline: 'none', color: 'var(--color-brown-dark)', boxSizing: 'border-box' }}
                  autoFocus
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button onClick={cancelAddProduct} style={{ padding: '0.8rem 1.5rem', background: 'transparent', color: 'var(--color-brown)', border: '1px solid rgba(122, 78, 58, 0.2)', borderRadius: '12px', cursor: 'pointer', fontWeight: 700, fontSize: '0.95rem' }}>Cancel</button>
                <button onClick={confirmAddProduct} className="btn-primary" style={{ padding: '0.8rem 1.5rem', borderRadius: '12px', cursor: 'pointer', border: 'none', fontWeight: 700, fontSize: '0.95rem' }}>Add Product</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminProducts;
