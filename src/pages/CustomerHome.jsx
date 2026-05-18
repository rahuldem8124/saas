import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, TrendingUp, Sparkles, ChevronRight, Heart, Award, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CustomerHome = () => {
  const { addToCart } = useCart();
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('recently_viewed') || '[]');
    setRecentlyViewed(items);
  }, []);

  const cakes = [
    { id: 1, name: "Velvet Rose Dream", price: "$45", rating: 4.9, image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=600&q=80", tag: "Best Seller" },
    { id: 2, name: "Chocolate Truffle", price: "$38", rating: 4.8, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80", tag: "Fresh Today" },
    { id: 3, name: "Golden Caramel", price: "$42", rating: 4.7, image: "https://images.unsplash.com/photo-1519340333755-5672c2393a83?auto=format&fit=crop&w=600&q=80", tag: "Staff Pick" },
    { id: 4, name: "Berry Vanilla", price: "$50", rating: 5.0, image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=600&q=80", tag: "Luxury" },
    { id: 5, name: "Lemon Zest Bliss", price: "$35", rating: 4.6, image: "https://images.unsplash.com/photo-1519340333755-5672c2393a83?auto=format&fit=crop&w=600&q=80", tag: "Summer Special" },
    { id: 6, name: "Matcha Garden", price: "$48", rating: 4.9, image: "https://images.unsplash.com/photo-1535254973040-607b474cb8c2?auto=format&fit=crop&w=600&q=80", tag: "Trending" },
  ];

  const handleQuickAdd = (e, cake) => {
    e.preventDefault();
    addToCart({ ...cake, weight: '1kg', quantity: 1 });
  };

  return (
    <div style={{ backgroundColor: 'var(--color-cream)' }}>
      {/* Dynamic Hero Section */}
      <section style={{ 
        padding: '120px 5% 60px', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        textAlign: 'center',
        background: 'radial-gradient(circle at top right, rgba(242, 140, 163, 0.1), transparent 40%)'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.8rem', 
            padding: '0.6rem 1.5rem', 
            background: 'var(--color-white)', 
            borderRadius: 'var(--radius-xl)', 
            marginBottom: '2rem',
            boxShadow: 'var(--shadow-soft)',
            color: 'var(--color-pink)',
            fontWeight: 800,
            fontSize: '0.9rem'
          }}>
            <Sparkles size={16} /> 10% OFF ON YOUR FIRST ORDER
          </div>
          <h1 style={{ fontSize: '5rem', fontWeight: 900, marginBottom: '1.5rem', lineHeight: 1.1 }}>
            Life is Short, Make it <br/> <span style={{ color: 'var(--color-pink)' }}>Extraordinarily Sweet.</span>
          </h1>
          <p style={{ fontSize: '1.3rem', color: 'var(--color-brown)', maxWidth: '700px', margin: '0 auto 3rem', opacity: 0.8, fontWeight: 500 }}>
            Handcrafted artisanal cakes delivered with love to your doorstep. Every slice tells a story of premium ingredients and passion.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <Link to="/birthday" className="btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1.1rem' }}>Order Birthday Cake</Link>
            <Link to="/wedding" className="btn-secondary" style={{ padding: '1.2rem 3rem', fontSize: '1.1rem' }}>Wedding Cakes</Link>
          </div>
        </motion.div>
      </section>

      {/* Featured Collections Section */}
      <section style={{ padding: '60px 5%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
          <div>
            <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>Our Masterpieces</h2>
            <p style={{ color: 'var(--color-brown)', fontSize: '1.1rem', opacity: 0.7, fontWeight: 600 }}>Explore our most loved creations from the bakery.</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="chip active">All Cakes</button>
            <button className="chip">Best Sellers</button>
            <button className="chip">New Arrival</button>
          </div>
        </div>

        <div className="responsive-grid">
          {cakes.map((cake, i) => (
            <motion.div 
              key={cake.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="card" 
              style={{ position: 'relative', overflow: 'hidden', padding: 0 }}
            >
              <Link to={`/product/${cake.id}`}>
                <div className="img-zoom-container" style={{ aspectRatio: '1/1', position: 'relative' }}>
                  <img src={cake.image} alt={cake.name} className="img-zoom" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '15px', left: '15px', background: 'white', padding: '0.4rem 1rem', borderRadius: 'var(--radius-xl)', fontSize: '0.75rem', fontWeight: 900, color: 'var(--color-brown-dark)', boxShadow: 'var(--shadow-soft)' }}>
                    {cake.tag}
                  </div>
                  <button style={{ position: 'absolute', top: '15px', right: '15px', background: 'white', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-brown)' }}>
                    <Heart size={18} />
                  </button>
                </div>
                <div style={{ padding: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 900, margin: 0 }}>{cake.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 800, fontSize: '0.9rem' }}>
                      <Star size={14} fill="gold" stroke="gold" /> {cake.rating}
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--color-pink)' }}>{cake.price}</div>
                    <button 
                      onClick={(e) => handleQuickAdd(e, cake)}
                      className="btn-primary" 
                      style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem', borderRadius: '12px' }}
                    >
                      Quick Add
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recently Viewed Section */}
      {recentlyViewed.length > 0 && (
        <section style={{ padding: '60px 5%', background: 'var(--color-white)' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '3rem' }}>Recently Viewed</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
            {recentlyViewed.map((item, i) => (
              <Link key={i} to={`/product/${item.id}`} className="card" style={{ padding: '1rem', display: 'flex', gap: '1.5rem', alignItems: 'center', background: 'var(--color-cream)' }}>
                <img src={item.image} style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }} alt={item.name} />
                <div>
                  <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800 }}>{item.name}</h4>
                  <div style={{ color: 'var(--color-pink)', fontWeight: 900 }}>{item.price}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/yournumber" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: '40px',
          right: '40px',
          width: '70px',
          height: '70px',
          background: '#25D366',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          boxShadow: '0 10px 30px rgba(37, 211, 102, 0.4)',
          zIndex: 1000,
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1) rotate(10deg)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
      >
        <MessageCircle size={35} fill="white" />
      </a>
    </div>
  );
};

export default CustomerHome;
