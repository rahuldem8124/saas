import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { Search, ShoppingBag, User as UserIcon, Menu, X, Shield, Home, Grid, MapPin, Heart } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount } = useCart();
  const { isAdmin } = useAuth();
  const { favorites } = useFavorites();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isStorefront = location.pathname.startsWith('/store');
  const isSaaSActive = 
    location.pathname === '/' ||
    location.pathname.startsWith('/saas') || 
    location.pathname.startsWith('/super-admin') || 
    location.pathname.startsWith('/admin') || 
    (isStorefront && !location.pathname.startsWith('/store/cakeflow'));
  
  const isRetailStore = !isSaaSActive;
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Birthday', path: '/birthday' },
    { name: 'Wedding', path: '/wedding' },
    { name: 'Exclusives', path: '/exclusives' },
    { name: 'Custom', path: '/custom' }
  ];
  const renderShopFlowNav = true;
  const renderCakeFlowNav = !isSaaSActive;

  return (
    <>
      {/* 1. ShopFlow SaaS Navbar */}
      {renderShopFlowNav && (
        <nav style={{
          position: 'fixed',
          top: isStorefront ? '52px' : 0,
          width: '100%',
          zIndex: 2000,
          padding: scrolled ? '0.6rem 5%' : '1.2rem 5%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxSizing: 'border-box',
          background: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid #E2E8F0',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          <div className="nav-left" style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
            <Link to="/saas" style={{ 
              fontFamily: 'var(--font-heading)', 
              fontSize: '2.2rem', 
              fontWeight: 950, 
              color: '#0F172A',
              letterSpacing: '-1.5px',
              textDecoration: 'none'
            }}>
              ShopFlow<span style={{ color: '#4F46E5' }}>.</span>
            </Link>
            
            <div className="hide-on-mobile" style={{ display: 'flex', gap: '2.5rem' }}>
              {[
                { name: 'SaaS Platform', path: '/saas' },
                { name: 'Bakery Demo', path: '/store/cakeflow' },
                { name: 'Sneakers Demo', path: '/store/fastfoot' },
                { name: 'Apparel Demo', path: '/store/threads-co' }
              ].map(link => (
                <Link key={link.name} to={link.path} className="nav-link" style={{ 
                  fontWeight: 800, 
                  color: location.pathname === link.path ? '#4F46E5' : '#475569',
                  fontSize: '1.05rem',
                  textDecoration: 'none',
                  opacity: location.pathname === link.path ? 1 : 0.7,
                  transition: 'all 0.3s ease'
                }}>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <Link to="/profile" className="hide-on-mobile">
              <UserIcon size={26} color="#475569" />
            </Link>

            {isAdmin && (
              <div style={{ display: 'flex', gap: '8px' }}>
                <Link to="/admin" className="hide-on-mobile" style={{ 
                  fontWeight: 950, 
                  color: 'white',
                  background: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)',
                  padding: '0.6rem 1.2rem',
                  borderRadius: 'var(--radius-xl)',
                  fontSize: '0.85rem',
                  boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  textDecoration: 'none'
                }}>
                  <Shield size={16} /> ADMIN
                </Link>
                <Link to="/super-admin" className="hide-on-mobile" style={{ 
                  fontWeight: 950, 
                  color: 'white',
                  background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
                  padding: '0.6rem 1.2rem',
                  borderRadius: 'var(--radius-xl)',
                  fontSize: '0.85rem',
                  boxShadow: '0 4px 12px rgba(15, 23, 42, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  textDecoration: 'none'
                }}>
                  <Shield size={16} /> SUPER ADMIN
                </Link>
              </div>
            )}

            <button 
              className="mobile-only" 
              onClick={() => setIsOpen(true)}
              style={{ padding: '0.5rem' }}
            >
              <Menu size={28} color="#0F172A" />
            </button>
          </div>
        </nav>
      )}

      {/* 2. CakeFlow Retail Navbar */}
      {renderCakeFlowNav && (
        <nav style={{
          position: 'fixed',
          top: renderShopFlowNav ? (scrolled ? '71px' : '89px') : 0,
          width: '100%',
          zIndex: 1999,
          padding: scrolled ? '0.6rem 5%' : '1.2rem 5%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxSizing: 'border-box',
          background: scrolled ? 'rgba(255, 248, 243, 0.95)' : 'rgba(255, 248, 243, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(122, 78, 58, 0.15)',
          boxShadow: '0 4px 20px rgba(122, 78, 58, 0.05)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          <div className="nav-left" style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
            <Link to="/store/cakeflow" style={{ 
              fontFamily: 'var(--font-heading)', 
              fontSize: '2.2rem', 
              fontWeight: 950, 
              color: 'var(--color-brown-dark)',
              letterSpacing: '-1.5px',
              textDecoration: 'none'
            }}>
              CakeFlow<span style={{ color: 'var(--color-pink)' }}>.</span>
            </Link>
            
            <div className="hide-on-mobile" style={{ display: 'flex', gap: '2.5rem' }}>
              {[
                { name: 'Home', path: '/store/cakeflow' },
                { name: 'Birthday', path: '/birthday' },
                { name: 'Wedding', path: '/wedding' },
                { name: 'Exclusives', path: '/exclusives' },
                { name: 'Custom', path: '/custom' }
              ].map(link => (
                <Link key={link.name} to={link.path} className="nav-link" style={{ 
                  fontWeight: 800, 
                  color: location.pathname === link.path ? 'var(--color-pink)' : 'var(--color-brown-dark)',
                  fontSize: '1.05rem',
                  textDecoration: 'none',
                  opacity: location.pathname === link.path ? 1 : 0.7,
                  transition: 'all 0.3s ease'
                }}>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            {/* Animated Search Bar */}
            <div className="hide-on-mobile" style={{ 
              position: 'relative', 
              display: 'flex', 
              alignItems: 'center',
              background: 'rgba(122, 78, 58, 0.05)',
              padding: '0.6rem 1.2rem',
              borderRadius: 'var(--radius-xl)',
              width: isSearchFocused ? '300px' : '180px',
              transition: 'all 0.4s ease',
              border: isSearchFocused ? '2px solid var(--color-pink)' : '2px solid transparent'
            }}>
              <Search size={18} color="var(--color-brown)" opacity={0.6} />
              <input 
                type="text" 
                placeholder="Search cakes..." 
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  outline: 'none', 
                  paddingLeft: '0.8rem', 
                  width: '100%',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'var(--color-brown-dark)'
                }} 
              />
            </div>

            {/* E-Commerce icons */}
            <Link to="/cart" style={{ position: 'relative' }} className="hide-on-mobile">
              <ShoppingBag size={26} color="var(--color-brown-dark)" />
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    background: 'var(--color-pink)',
                    color: 'white',
                    fontSize: '0.7rem',
                    fontWeight: 900,
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'var(--shadow-glow)'
                  }}>
                  {cartCount}
                </motion.span>
              )}
            </Link>
            
            <Link to="/favorites" className="hide-on-mobile" style={{ position: 'relative' }}>
              <Heart size={26} color="var(--color-brown-dark)" />
              {favorites.length > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    background: 'var(--color-pink)',
                    color: 'white',
                    fontSize: '0.7rem',
                    fontWeight: 900,
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'var(--shadow-glow)'
                  }}>
                  {favorites.length}
                </motion.span>
              )}
            </Link>
            
            <Link to="/profile" className="hide-on-mobile">
              <UserIcon size={26} color="var(--color-brown-dark)" />
            </Link>

            {isAdmin && (
              <Link to="/admin" className="hide-on-mobile" style={{ 
                fontWeight: 950, 
                color: 'white',
                background: 'var(--gradient-pink)',
                padding: '0.6rem 1.2rem',
                borderRadius: 'var(--radius-xl)',
                fontSize: '0.85rem',
                boxShadow: 'var(--shadow-glow)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                textDecoration: 'none'
              }}>
                <Shield size={16} /> ADMIN PANEL
              </Link>
            )}

            <button 
              className="mobile-only" 
              onClick={() => setIsOpen(true)}
              style={{ padding: '0.5rem' }}
            >
              <Menu size={28} color="var(--color-brown-dark)" />
            </button>
          </div>
        </nav>
      )}

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(74, 44, 42, 0.4)', zIndex: 2999, backdropFilter: 'blur(5px)' }}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: '80%',
                background: 'var(--color-cream)',
                zIndex: 3000,
                padding: '2.5rem',
                boxShadow: '-10px 0 50px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
                <span style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--color-brown-dark)' }}>Menu</span>
                <button onClick={() => setIsOpen(false)}><X size={32} color="var(--color-brown-dark)" /></button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { name: 'Home', path: '/store/cakeflow' },
                  { name: 'Birthday', path: '/birthday' },
                  { name: 'Wedding', path: '/wedding' },
                  { name: 'Exclusives', path: '/exclusives' },
                  { name: 'Custom', path: '/custom' }
                ].map(link => (
                  <Link 
                    key={link.name} 
                    to={link.path} 
                    style={{ 
                      fontSize: '1.6rem', 
                      fontWeight: 800, 
                      color: 'var(--color-brown-dark)', 
                      textDecoration: 'none',
                      padding: '1.2rem',
                      background: 'white',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
                {isAdmin && (
                  <Link to="/admin" style={{ padding: '1.2rem', background: 'var(--gradient-pink)', color: 'white', borderRadius: '20px', fontWeight: 900, fontSize: '1.6rem', textAlign: 'center', marginTop: '2rem' }}>
                    ADMIN PANEL
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .mobile-only { display: none; }
        @media (max-width: 1024px) {
          .desktop-only { display: none !important; }
          .mobile-only { display: block; }
        }
      `}</style>

      {/* Mobile Bottom Navigation */}
      <div className="mobile-bottom-nav">
        <Link to="/store/cakeflow" className={location.pathname === '/store/cakeflow' ? 'active' : ''}>
          <Home size={22} />
          <span>Home</span>
        </Link>
        <Link to="/exclusives" className={location.pathname === '/exclusives' ? 'active' : ''}>
          <Grid size={22} />
          <span>Categories</span>
        </Link>
        <Link to="/cart" className={location.pathname === '/cart' ? 'active' : ''} style={{ position: 'relative' }}>
          <ShoppingBag size={22} />
          <span>Cart</span>
          {cartCount > 0 && (
            <span style={{ position: 'absolute', top: '-5px', right: '15px', background: 'var(--color-pink)', color: 'white', fontSize: '0.6rem', fontWeight: 900, width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {cartCount}
            </span>
          )}
        </Link>
        <Link to="/tracking" className={location.pathname === '/tracking' ? 'active' : ''}>
          <MapPin size={22} />
          <span>Track</span>
        </Link>
        <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>
          <UserIcon size={22} />
          <span>Profile</span>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
