import React, { useState } from 'react';
import { Package, LayoutDashboard, ShoppingBag, Users, DollarSign, BarChart2, Truck, Ticket, Settings as SettingsIcon, Search, Filter, Plus, MoreVertical, Eye, MessageSquare, Trash2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTenant } from '../context/TenantContext';

const AdminProducts = () => {
  const { user } = useAuth();
  const { businesses, addProduct, deleteProduct } = useTenant();
  const location = useLocation();

  const activeBizId = user?.businessId || 'cakeflow';
  const biz = businesses[activeBizId] || businesses['cakeflow'];
  const products = biz.products || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("45.00");
  const [newProductCategory, setNewProductCategory] = useState("Trending");
  const [newProductDesc, setNewProductDesc] = useState("");

  const handleAddProduct = () => {
    setIsModalOpen(true);
  };

  const confirmAddProduct = () => {
    if (newProductName.trim()) {
      const defaultImages = {
        Cake: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80",
        Shoes: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80",
        Accessories: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80",
        Handmade: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80",
        Custom: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=400&q=80"
      };

      addProduct(biz.id, {
        name: newProductName,
        price: `$${parseFloat(newProductPrice).toFixed(2)}`,
        rating: 4.8,
        image: defaultImages[biz.category] || defaultImages.Cake,
        category: newProductCategory,
        desc: newProductDesc || "Custom product created via SaaS panel."
      });

      setNewProductName("");
      setNewProductPrice("45.00");
      setNewProductDesc("");
      setIsModalOpen(false);
      alert("Product added and synced successfully!");
    }
  };

  const cancelAddProduct = () => {
    setNewProductName("");
    setIsModalOpen(false);
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
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
          <div>
            <h1 style={{ fontSize: '3rem', fontWeight: 900 }}>Product Catalog</h1>
            <p style={{ color: 'var(--color-brown)', fontSize: '1.1rem', opacity: 0.8 }}>Manage your business-specific catalog and custom parameters.</p>
          </div>
          <button onClick={handleAddProduct} className="btn-primary" style={{ padding: '0.8rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', cursor: 'pointer' }}>
            <Plus size={20} /> Add Scoped Product
          </button>
        </header>

        <div className="card" style={{ padding: '0', background: 'white', overflow: 'hidden' }}>
          
          <div style={{ padding: '2rem', borderBottom: '2px solid var(--color-cream)', display: 'flex', gap: '1.5rem' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: 'var(--color-cream)', padding: '0.8rem 1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid rgba(122, 78, 58, 0.1)' }}>
              <Search size={20} color="var(--color-brown)" />
              <input type="text" placeholder="Search products..." style={{ border: 'none', background: 'none', outline: 'none', width: '100%', fontSize: '1rem' }} />
            </div>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: 'var(--color-cream)' }}>
              <tr style={{ textAlign: 'left' }}>
                <th style={{ padding: '1.5rem 2rem', color: 'var(--color-brown-dark)', fontWeight: 800 }}>Product</th>
                <th style={{ padding: '1.5rem', color: 'var(--color-brown-dark)', fontWeight: 800 }}>Category</th>
                <th style={{ padding: '1.5rem', color: 'var(--color-brown-dark)', fontWeight: 800 }}>Price</th>
                <th style={{ padding: '1.5rem', color: 'var(--color-brown-dark)', fontWeight: 800 }}>Rating</th>
                <th style={{ padding: '1.5rem 2rem' }}></th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ padding: '3rem', textAlign: 'center', opacity: 0.5, fontWeight: 700 }}>No products in this scoped catalog. Click Add Scoped Product to create one!</td>
                </tr>
              ) : (
                products.map(product => (
                  <tr key={product.id} style={{ borderBottom: '1px solid var(--color-cream)' }}>
                    <td style={{ padding: '1.2rem 2rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <img src={product.image} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                        <span style={{ fontWeight: 700, color: 'var(--color-brown-dark)' }}>{product.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '1.2rem' }}>{product.category}</td>
                    <td style={{ padding: '1.2rem', fontWeight: 800, color: 'var(--color-pink)' }}>{product.price}</td>
                    <td style={{ padding: '1.2rem', fontWeight: 600 }}>{product.rating || '4.8'} ⭐</td>
                    <td style={{ padding: '1.2rem 2rem', textAlign: 'right' }}>
                      <button 
                        onClick={() => {
                          deleteProduct(biz.id, product.id);
                          alert("Product removed from catalog!");
                        }}
                        style={{ background: 'transparent', border: 'none', color: '#F44336', cursor: 'pointer' }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* ADD PRODUCT MODAL */}
        {isModalOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="card" style={{ background: 'white', padding: '2.5rem', width: '450px', borderRadius: 'var(--radius-xl)', boxShadow: '0 10px 40px rgba(0,0,0,0.15)' }}>
              <h2 style={{ marginBottom: '1.5rem', fontWeight: 900, color: 'var(--color-brown-dark)' }}>Add Scoped Product</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2rem' }}>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 800 }}>Product Name</label>
                  <input 
                    type="text" 
                    value={newProductName} 
                    onChange={(e) => setNewProductName(e.target.value)} 
                    placeholder="e.g. Velvet Star High Tops"
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid rgba(122, 78, 58, 0.2)', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 800 }}>Price ($)</label>
                    <input 
                      type="number" 
                      value={newProductPrice} 
                      onChange={(e) => setNewProductPrice(e.target.value)} 
                      placeholder="45.00"
                      style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid rgba(122, 78, 58, 0.2)', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 800 }}>Collection Tag</label>
                    <input 
                      type="text" 
                      value={newProductCategory} 
                      onChange={(e) => setNewProductCategory(e.target.value)} 
                      placeholder="e.g. Best Seller"
                      style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid rgba(122, 78, 58, 0.2)', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 800 }}>Description</label>
                  <textarea 
                    value={newProductDesc} 
                    onChange={(e) => setNewProductDesc(e.target.value)} 
                    placeholder="Provide realistic details..."
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid rgba(122, 78, 58, 0.2)', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box', height: '60px', fontFamily: 'inherit' }}
                  />
                </div>
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
