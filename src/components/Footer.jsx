import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ 
      background: 'var(--color-brown-dark)', 
      color: 'white', 
      padding: '2.5rem 5% 1.5rem',
      marginTop: 'auto'
    }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '2rem',
        marginBottom: '2rem',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 900 }}>
            CakeFlow<span style={{ color: 'var(--color-pink)' }}>.</span>
          </h2>
          <p style={{ opacity: 0.7, lineHeight: '1.8', marginBottom: '2rem', maxWidth: '350px' }}>
            Handcrafting moments of joy since 2010. We use only the finest ingredients to create cakes that taste as good as they look.
          </p>
        </div>

        <div>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '1.8rem', fontWeight: 800 }}>Quick Links</h3>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li><Link to="/home" style={{ color: 'white', textDecoration: 'none', opacity: 0.7, fontWeight: 600 }}>Home</Link></li>
            <li><Link to="/birthday" style={{ color: 'white', textDecoration: 'none', opacity: 0.7, fontWeight: 600 }}>Birthday Cakes</Link></li>
            <li><Link to="/wedding" style={{ color: 'white', textDecoration: 'none', opacity: 0.7, fontWeight: 600 }}>Wedding Collection</Link></li>
            <li><Link to="/custom" style={{ color: 'white', textDecoration: 'none', opacity: 0.7, fontWeight: 600 }}>Custom Orders</Link></li>
          </ul>
        </div>

        <div>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '1.8rem', fontWeight: 800 }}>Support</h3>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li><Link to="/about" style={{ color: 'white', textDecoration: 'none', opacity: 0.7, fontWeight: 600 }}>About Us</Link></li>
            <li><Link to="/contact" style={{ color: 'white', textDecoration: 'none', opacity: 0.7, fontWeight: 600 }}>Contact</Link></li>
            <li><Link to="/faqs" style={{ color: 'white', textDecoration: 'none', opacity: 0.7, fontWeight: 600 }}>FAQs</Link></li>
            <li><Link to="/terms" style={{ color: 'white', textDecoration: 'none', opacity: 0.7, fontWeight: 600 }}>Terms of Service</Link></li>
          </ul>
        </div>

        <div>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '1.8rem', fontWeight: 800 }}>Contact Us</h3>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <li style={{ opacity: 0.7, fontWeight: 600 }}>123 Bakery Lane, New York</li>
            <li style={{ opacity: 0.7, fontWeight: 600 }}>+1 (555) 123-4567</li>
            <li style={{ opacity: 0.7, fontWeight: 600 }}>hello@cakeflow.com</li>
          </ul>
        </div>
      </div>

      <div style={{ 
        borderTop: '1px solid rgba(255,255,255,0.1)', 
        paddingTop: '2.5rem', 
        textAlign: 'center',
        opacity: 0.5,
        fontSize: '0.95rem',
        fontWeight: 600
      }}>
        © 2026 CakeFlow. All rights reserved. Made with love for sweet moments.
      </div>
    </footer>
  );
};

export default Footer;
