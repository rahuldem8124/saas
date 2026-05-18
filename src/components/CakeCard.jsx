import React from 'react';
import { motion } from 'framer-motion';
import { Star, Plus, Heart, Clock, PenTool } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

const CakeCard = ({ cake }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      ...cake,
      weight: '1kg',
      quantity: 1
    });
  };

  const isFav = isFavorite(cake.id);

  return (
    <motion.div 
      className="card" 
      style={{ padding: '0', overflow: 'hidden', position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', background: 'white' }}
    >
      {/* Top Right Actions */}
      <div style={{ 
        position: 'absolute', 
        top: '1rem', 
        right: '1rem', 
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
      }}>
        <button 
          className="touch-friendly"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(cake); }}
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '0.6rem',
            borderRadius: '50%',
            display: 'flex',
            boxShadow: 'var(--shadow-soft)',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <Heart size={18} fill={isFav ? "var(--color-pink)" : "none"} color={isFav ? "var(--color-pink)" : "var(--color-brown-dark)"} />
        </button>
      </div>

      {/* Fresh Tag */}
      <div style={{
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        zIndex: 10,
        background: 'var(--gradient-pink)',
        color: 'white',
        padding: '0.4rem 1rem',
        borderRadius: '12px',
        fontSize: '0.75rem',
        fontWeight: 900,
        boxShadow: 'var(--shadow-glow)'
      }}>
        FRESH TODAY
      </div>

      <Link to={`/product/${cake.id}`} className="img-zoom-container" style={{ display: 'block' }}>
        <img 
          src={cake.image} 
          alt={cake.name} 
          className="img-zoom"
          style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover' }} 
        />
      </Link>
      
      <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--color-brown-dark)', fontWeight: 800 }}>{cake.name}</h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', color: '#FFD700', alignItems: 'center', gap: '0.3rem' }}>
            <Star size={16} fill="#FFD700" />
            <span style={{ fontWeight: 800, color: 'var(--color-brown-dark)', fontSize: '0.95rem' }}>{cake.rating}</span>
          </div>
          <div style={{ height: '14px', width: '1.5px', background: 'rgba(122, 78, 58, 0.1)' }}></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-brown)', fontSize: '0.85rem', fontWeight: 700, opacity: 0.7 }}>
            <Clock size={14} />
            <span>30-45 mins</span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
          <div style={{ 
            fontSize: '1.8rem', 
            fontWeight: 900, 
            color: 'var(--color-pink)',
          }}>
            {cake.price}
          </div>
          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <Link to="/custom" className="touch-friendly" style={{ 
              width: '45px', 
              height: '45px', 
              borderRadius: '15px', 
              background: 'var(--color-cream)', 
              color: 'var(--color-brown)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              textDecoration: 'none',
              boxShadow: 'var(--shadow-soft)'
            }}>
              <PenTool size={20} />
            </Link>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={handleQuickAdd}
              className="btn-primary touch-friendly" 
              style={{ 
                padding: '0 1.5rem', 
                height: '45px',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '0.6rem',
                fontSize: '0.9rem',
                fontWeight: 800,
                borderRadius: '15px'
              }}
            >
              <Plus size={18} strokeWidth={3} /> Add
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CakeCard;
