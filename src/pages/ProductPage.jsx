import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Truck, Calendar, Clock, Minus, Plus, Heart, Share2, ChevronLeft, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [weight, setWeight] = useState('1kg');
  const [quantity, setQuantity] = useState(1);
  const [customMessage, setCustomMessage] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Dummy product data
  const cake = {
    id: id || 1,
    name: "Velvet Rose Dream",
    price: 45,
    rating: 4.9,
    reviews: 124,
    description: "A luxurious red velvet cake layered with silky cream cheese frosting and decorated with fresh organic roses. Perfect for romantic gestures and elegant celebrations.",
    ingredients: "Organic Flour, Madagascan Vanilla, Cocoa, Cream Cheese, Fresh Roses",
    images: [
      "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80"
    ]
  };

  useEffect(() => {
    // Add to recently viewed
    const recentlyViewed = JSON.parse(localStorage.getItem('recently_viewed') || '[]');
    const newItem = { id: cake.id, name: cake.name, image: cake.images[0], price: `$${cake.price}` };
    const filtered = recentlyViewed.filter(item => item.id !== cake.id);
    localStorage.setItem('recently_viewed', JSON.stringify([newItem, ...filtered].slice(0, 4)));
  }, [cake.id]);

  const handleAddToCart = () => {
    addToCart({
      id: cake.id,
      name: cake.name,
      price: `$${cake.price}`,
      weight: weight,
      image: cake.images[0]
    });
  };

  const [mainImage, setMainImage] = useState(cake.images[0]);

  return (
    <div style={{ padding: '60px 5% 6rem', maxWidth: '1400px', margin: '0 auto' }}>
      <button 
        onClick={() => navigate(-1)} 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          background: 'none', 
          border: 'none', 
          color: 'var(--color-brown)', 
          fontWeight: 800, 
          cursor: 'pointer',
          marginBottom: '2rem',
          opacity: 0.6,
          marginTop: '60px'
        }}
      >
        <ChevronLeft size={20} /> Back to Collection
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '5rem' }}>
        
        {/* Gallery */}
        <div className="product-gallery">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-medium)', border: '8px solid white' }}
          >
            <motion.img 
              key={mainImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={mainImage} 
              alt={cake.name} 
              style={{ 
                width: '100%', 
                aspectRatio: '1/1',
                objectFit: 'cover',
                display: 'block'
              }} 
            />
            <div style={{ position: 'absolute', top: '20px', left: '20px', background: 'rgba(255,255,255,0.9)', padding: '0.5rem 1rem', borderRadius: '20px', fontWeight: 900, color: 'var(--color-pink)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={14} /> BEST SELLER
            </div>
          </motion.div>
          <div style={{ display: 'flex', gap: '1.2rem', marginTop: '1.5rem' }}>
            {cake.images.map((img, i) => (
              <motion.img 
                key={i} 
                whileHover={{ scale: 1.05 }}
                src={img} 
                onClick={() => setMainImage(img)}
                style={{ 
                  width: '100px', 
                  height: '100px', 
                  borderRadius: 'var(--radius-md)', 
                  cursor: 'pointer',
                  border: mainImage === img ? '3px solid var(--color-pink)' : '2px solid white',
                  boxShadow: mainImage === img ? 'var(--shadow-glow)' : 'var(--shadow-soft)',
                  objectFit: 'cover'
                }} 
              />
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="product-info">
          <header style={{ marginBottom: '2.5rem' }}>
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ color: 'var(--color-pink)', fontWeight: 800, fontSize: '0.9rem', letterSpacing: '2px', marginBottom: '0.5rem' }}
            >
              PREMIUM COLLECTION
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              style={{ fontSize: '4.5rem', marginBottom: '0.8rem', fontWeight: 900, color: 'var(--color-brown-dark)', lineHeight: 1 }}
            >
              {cake.name}
            </motion.h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '1.5rem' }}>
              <div style={{ display: 'flex', color: '#FFD700', alignItems: 'center', gap: '0.4rem', fontSize: '1.2rem' }}>
                <Star size={22} fill="#FFD700" />
                <span style={{ fontWeight: 900, color: 'var(--color-brown-dark)' }}>{cake.rating}</span>
              </div>
              <span style={{ color: 'var(--color-brown)', fontWeight: 600, opacity: 0.6 }}>({cake.reviews} Verified Reviews)</span>
              <div style={{ height: '20px', width: '2px', backgroundColor: 'rgba(122, 78, 58, 0.1)' }}></div>
              <span style={{ color: '#4CAF50', fontWeight: 800, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={18} /> In Stock
              </span>
            </div>
            <div style={{ 
              fontSize: '3.5rem', 
              fontWeight: 900, 
              marginTop: '2.5rem', 
              color: 'var(--color-brown-dark)',
              display: 'flex',
              alignItems: 'baseline',
              gap: '0.8rem'
            }}>
              ${(cake.price * quantity).toFixed(2)}
              <span style={{ fontSize: '1.1rem', color: 'var(--color-brown)', opacity: 0.5, fontWeight: 700 }}>TAX INCLUDED</span>
            </div>
          </header>

          <p style={{ color: 'var(--color-brown)', marginBottom: '3rem', fontSize: '1.2rem', lineHeight: 1.8, fontWeight: 500 }}>
            {cake.description}
          </p>

          {/* Selectors */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h4 style={{ marginBottom: '1.2rem', fontSize: '1.1rem', fontWeight: 900, color: 'var(--color-brown-dark)' }}>1. SELECT WEIGHT</h4>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {['0.5kg', '1kg', '2kg'].map(w => (
                <button 
                  key={w}
                  onClick={() => setWeight(w)}
                  style={{
                    padding: '1rem 2.5rem',
                    borderRadius: '20px',
                    border: weight === w ? 'none' : '2px solid var(--color-cream)',
                    background: weight === w ? 'var(--gradient-pink)' : 'white',
                    color: weight === w ? 'white' : 'var(--color-brown-dark)',
                    fontWeight: 800,
                    fontSize: '1.1rem',
                    boxShadow: weight === w ? 'var(--shadow-glow)' : 'var(--shadow-soft)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h4 style={{ marginBottom: '1.2rem', fontSize: '1.1rem', fontWeight: 900, color: 'var(--color-brown-dark)' }}>2. MESSAGE ON CAKE</h4>
            <input 
              type="text" 
              placeholder="e.g. Happy Birthday Sarah! 🎂" 
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              style={{
                width: '100%',
                padding: '1.2rem 1.5rem',
                borderRadius: '20px',
                border: '2px solid var(--color-cream)',
                fontFamily: 'var(--font-body)',
                fontSize: '1.1rem',
                fontWeight: 600,
                background: 'white',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--color-pink)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--color-cream)'}
            />
          </div>

          <div style={{ display: 'flex', gap: '2rem', marginBottom: '4rem' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1.5rem', 
              padding: '0.8rem 1.8rem', 
              background: 'white',
              border: '2px solid var(--color-cream)',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-soft)'
            }}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ color: 'var(--color-pink)' }}><Minus size={22} strokeWidth={3} /></button>
              <span style={{ fontWeight: 900, width: '40px', textAlign: 'center', fontSize: '1.3rem' }}>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} style={{ color: 'var(--color-pink)' }}><Plus size={22} strokeWidth={3} /></button>
            </div>
            
            <button onClick={handleAddToCart} className="btn-primary" style={{ 
              flex: 1, 
              fontSize: '1.2rem',
              fontWeight: 900,
              padding: '1rem',
              boxShadow: 'var(--shadow-glow)'
            }}>
              Add to Cart
            </button>
            
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              style={{ 
                width: '64px',
                height: '64px',
                border: '2px solid var(--color-cream)', 
                borderRadius: '50%',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-soft)',
                transition: 'all 0.3s ease'
              }}
            >
              <Heart size={28} fill={isFavorite ? "var(--color-pink)" : "none"} color={isFavorite ? "var(--color-pink)" : "var(--color-brown-dark)"} />
            </button>
          </div>

          {/* Trust Badges */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '20px', border: '2px solid var(--color-cream)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ background: 'var(--color-cream)', padding: '0.8rem', borderRadius: '50%' }}>
                <Truck size={24} color="var(--color-pink)" />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1rem' }}>Free Delivery</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>On orders over $50</div>
              </div>
            </div>
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '20px', border: '2px solid var(--color-cream)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ background: 'var(--color-cream)', padding: '0.8rem', borderRadius: '50%' }}>
                <Calendar size={24} color="var(--color-pink)" />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1rem' }}>Freshly Baked</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>Made to order</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
