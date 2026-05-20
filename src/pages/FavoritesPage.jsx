import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import CakeCard from '../components/CakeCard';
import { Heart, Sparkles, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <div style={{ padding: '40px 5% 120px', maxWidth: '1400px', margin: '0 auto' }}>
      <header style={{ marginBottom: '5rem', marginTop: '60px' }}>
        <Link to="/store/cakeflow" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-brown)', textDecoration: 'none', fontWeight: 700, marginBottom: '2rem', opacity: 0.6 }}>
          <ChevronLeft size={20} /> Back to Home
        </Link>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', background: 'var(--color-cream)', padding: '0.6rem 1.5rem', borderRadius: 'var(--radius-xl)', color: 'var(--color-pink)', fontWeight: 800, marginBottom: '1.5rem', fontSize: '0.9rem' }}
          >
            <Sparkles size={18} />
            <span>YOUR TASTEFUL SELECTIONS</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: '4.5rem', marginBottom: '1.2rem', fontWeight: 900, color: 'var(--color-brown-dark)', letterSpacing: '-2px' }}
          >
            My <span style={{ color: 'var(--color-pink)' }}>Favorites</span>
          </motion.h1>
          <p style={{ color: 'var(--color-brown)', fontSize: '1.2rem', opacity: 0.7, maxWidth: '600px', margin: '0 auto' }}>
            Keep track of the custom recipes and signature cakes you love most.
          </p>
        </div>
      </header>

      {favorites.length === 0 ? (
        <div className="empty-cart-container" style={{ minHeight: '50vh' }}>
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{ background: 'var(--color-cream)', padding: '3.5rem', borderRadius: '50%', marginBottom: '2rem' }}
          >
            <Heart size={80} color="var(--color-pink)" strokeWidth={1} fill="none" />
          </motion.div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--color-brown-dark)', marginBottom: '1rem' }}>No favorites saved yet</h2>
          <p style={{ color: 'var(--color-brown)', fontSize: '1.2rem', opacity: 0.7, marginBottom: '3rem', maxWidth: '400px' }}>
            Tap the heart icon on any signature cake or creation to store it here for quick access later.
          </p>
          <Link to="/birthday" className="btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1.1rem', textDecoration: 'none' }}>
            Browse Signature Cakes
          </Link>
        </div>
      ) : (
        <div className="responsive-grid">
          {favorites.map(cake => (
            <CakeCard key={cake.id} cake={cake} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
