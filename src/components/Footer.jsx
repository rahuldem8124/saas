import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTenant } from '../context/TenantContext';

const Footer = () => {
  const location = useLocation();
  const { activeBusiness } = useTenant();
  const isStorefront = location.pathname.startsWith('/store');
  const isSaaSActive = 
    location.pathname === '/' ||
    location.pathname.startsWith('/saas') || 
    location.pathname.startsWith('/super-admin') || 
    location.pathname.startsWith('/admin') || 
    location.pathname.startsWith('/simulator') || 
    (isStorefront && !location.pathname.startsWith('/store/cakeflow-legacy'));

  if (isSaaSActive) {
    // Return high-tech slate-indigo SaaS footer
    return (
      <footer style={{
        background: '#0F172A', // Slate-900
        color: '#E2E8F0', // Slate-200
        padding: '5rem 5% 3rem',
        marginTop: 'auto',
        borderTop: '1px solid #1E293B',
        fontFamily: 'var(--font-body)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '3rem',
          marginBottom: '4rem',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 950, color: 'white', letterSpacing: '-1.5px' }}>
              ShopFlow<span style={{ color: '#4F46E5' }}>.</span>
            </h2>
            <p style={{ color: '#94A3B8', lineHeight: '1.8', marginBottom: '2rem', maxWidth: '350px', fontSize: '0.95rem', fontWeight: 500 }}>
              The e-commerce OS for Instagram and WhatsApp sellers. Launch storefronts, automate checkouts, and scale social sales in seconds.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.8rem', fontWeight: 800, color: 'white', textTransform: 'uppercase', letterSpacing: '1px' }}>Platform</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.95rem' }}>
              <li><Link to="/saas" style={{ color: '#94A3B8', textDecoration: 'none', fontWeight: 650, transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color = '#FFFFFF'} onMouseOut={e => e.target.style.color = '#94A3B8'}>SaaS Home</Link></li>
              <li><Link to="/store/cakeflow" style={{ color: '#94A3B8', textDecoration: 'none', fontWeight: 650, transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color = '#FFFFFF'} onMouseOut={e => e.target.style.color = '#94A3B8'}>Live Bakery Demo</Link></li>
              <li><Link to="/store/fastfoot" style={{ color: '#94A3B8', textDecoration: 'none', fontWeight: 650, transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color = '#FFFFFF'} onMouseOut={e => e.target.style.color = '#94A3B8'}>Live Sneakers Demo</Link></li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.8rem', fontWeight: 800, color: 'white', textTransform: 'uppercase', letterSpacing: '1px' }}>Resources</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.95rem' }}>
              <li><Link to="/about" style={{ color: '#94A3B8', textDecoration: 'none', fontWeight: 650 }} onMouseOver={e => e.target.style.color = '#FFFFFF'} onMouseOut={e => e.target.style.color = '#94A3B8'}>About Us</Link></li>
              <li><Link to="/contact" style={{ color: '#94A3B8', textDecoration: 'none', fontWeight: 650 }} onMouseOver={e => e.target.style.color = '#FFFFFF'} onMouseOut={e => e.target.style.color = '#94A3B8'}>Contact Support</Link></li>
              <li><Link to="/faqs" style={{ color: '#94A3B8', textDecoration: 'none', fontWeight: 650 }} onMouseOver={e => e.target.style.color = '#FFFFFF'} onMouseOut={e => e.target.style.color = '#94A3B8'}>Platform FAQs</Link></li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.8rem', fontWeight: 800, color: 'white', textTransform: 'uppercase', letterSpacing: '1px' }}>Contact Platform</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem', fontSize: '0.95rem', color: '#94A3B8' }}>
              <li style={{ fontWeight: 650 }}>100 Pine Street, San Francisco, CA</li>
              <li style={{ fontWeight: 650 }}>+1 (800) 555-FLOW</li>
              <li style={{ fontWeight: 650 }}>hello@shopflow.io</li>
            </ul>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid #1E293B',
          paddingTop: '2.5rem',
          textAlign: 'center',
          color: '#64748B',
          fontSize: '0.95rem',
          fontWeight: 600
        }}>
          © 2026 ShopFlow. All rights reserved. Built for multi-tenant e-commerce success.
        </div>
      </footer>
    );
  }

  // Dynamic business content for the storefront footer
  const bizName = activeBusiness?.name || 'CakeFlow Flagship';
  const bizCategory = activeBusiness?.category || 'Cake';
  const bizColor = activeBusiness?.brandColor || 'var(--color-pink)';
  const bizPhone = activeBusiness?.whatsappNumber || '+1 (555) 123-4567';
  const bizEmail = activeBusiness?.instagramUsername ? `${activeBusiness.instagramUsername}@shopflow.io` : `${activeBusiness?.id || 'hello'}@shopflow.io`;
  
  let bizDesc = 'Handcrafting moments of joy since 2010. We use only the finest ingredients to create cakes that taste as good as they look.';
  let link1Label = 'Birthday Cakes';
  let link2Label = 'Wedding Collection';
  let link3Label = 'Custom Orders';
  
  let link1Path = '/birthday';
  let link2Path = '/wedding';
  let link3Path = '/custom';
  
  let bizAddress = '123 Bakery Lane, New York';

  if (bizCategory === 'Shoes') {
    bizDesc = activeBusiness?.tagline || 'Unmatched streetwear, athletic sneakers, and classics engineered for premium style and absolute comfort.';
    bizAddress = '456 Streetwear Plaza, Los Angeles';
    link1Label = 'Runners';
    link2Label = 'Classics';
    link3Label = 'Athletic';
    link1Path = '/birthday?category=Runners';
    link2Path = '/wedding?category=Classics';
    link3Path = '/custom?category=Athletic';
  } else if (bizCategory === 'Accessories') {
    bizDesc = activeBusiness?.tagline || 'Aesthetic minimalist accessories and premium hand-crafted pure jewelry metal bands.';
    bizAddress = '789 Silver Blvd, Paris';
    link1Label = 'Rings';
    link2Label = 'Earrings';
    link3Label = 'Necklaces';
    link1Path = '/birthday?category=Rings';
    link2Path = '/wedding?category=Earrings';
    link3Path = '/custom?category=Necklaces';
  } else if (bizCategory === 'Clothing' || bizCategory === 'Fashion') {
    bizDesc = activeBusiness?.tagline || 'Aesthetic organic clothing & apparel designed for premium, sustainable everyday fashion.';
    bizAddress = '321 Organic Way, Milan';
    link1Label = 'Jackets';
    link2Label = 'Essentials';
    link3Label = 'Custom Sizing';
    link1Path = '/birthday?category=Jackets';
    link2Path = '/wedding?category=Essentials';
    link3Path = '/custom?category=Custom';
  } else if (bizCategory === 'Handmade') {
    bizDesc = activeBusiness?.tagline || 'Artisanal pottery & custom crafts molded and glazed by hand for unique personal expressions.';
    bizAddress = '654 Artisanal Way, Tokyo';
    link1Label = 'Ceramics';
    link2Label = 'Decor';
    link3Label = 'Expedited Crafting';
    link1Path = '/birthday?category=Ceramics';
    link2Path = '/wedding?category=Decor';
    link3Path = '/custom';
  } else if (bizCategory !== 'Cake') {
    bizDesc = activeBusiness?.tagline || activeBusiness?.customRequirements || 'Bespoke custom e-commerce products designed and personalized specifically to your requirements.';
    bizAddress = '100 Pine Street, San Francisco';
    link1Label = 'Latest Products';
    link2Label = 'Best Sellers';
    link3Label = 'Custom Inquiries';
    link1Path = '/birthday';
    link2Path = '/wedding';
    link3Path = '/custom';
  }

  // Original storefront footer, dynamically adapting to multi-tenant business context
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
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 900, color: 'white' }}>
            {bizName}<span style={{ color: bizColor }}>.</span>
          </h2>
          <p style={{ opacity: 0.7, lineHeight: '1.8', marginBottom: '2rem', maxWidth: '350px' }}>
            {bizDesc}
          </p>
        </div>

        <div>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '1.8rem', fontWeight: 800, color: 'white' }}>Quick Links</h3>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li><Link to={`/store/${activeBusiness?.id || 'cakeflow'}`} style={{ color: 'white', textDecoration: 'none', opacity: 0.7, fontWeight: 600 }}>Home</Link></li>
            <li><Link to={link1Path} style={{ color: 'white', textDecoration: 'none', opacity: 0.7, fontWeight: 600 }}>{link1Label}</Link></li>
            <li><Link to={link2Path} style={{ color: 'white', textDecoration: 'none', opacity: 0.7, fontWeight: 600 }}>{link2Label}</Link></li>
            <li><Link to={link3Path} style={{ color: 'white', textDecoration: 'none', opacity: 0.7, fontWeight: 600 }}>{link3Label}</Link></li>
          </ul>
        </div>

        <div>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '1.8rem', fontWeight: 800, color: 'white' }}>Support</h3>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li><Link to="/about" style={{ color: 'white', textDecoration: 'none', opacity: 0.7, fontWeight: 600 }}>About Us</Link></li>
            <li><Link to="/contact" style={{ color: 'white', textDecoration: 'none', opacity: 0.7, fontWeight: 600 }}>Contact</Link></li>
            <li><Link to="/faqs" style={{ color: 'white', textDecoration: 'none', opacity: 0.7, fontWeight: 600 }}>FAQs</Link></li>
            <li><Link to="/terms" style={{ color: 'white', textDecoration: 'none', opacity: 0.7, fontWeight: 600 }}>Terms of Service</Link></li>
          </ul>
        </div>

        <div>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '1.8rem', fontWeight: 800, color: 'white' }}>Contact Us</h3>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <li style={{ opacity: 0.7, fontWeight: 600 }}>{bizAddress}</li>
            <li style={{ opacity: 0.7, fontWeight: 600 }}>{bizPhone}</li>
            <li style={{ opacity: 0.7, fontWeight: 600 }}>{bizEmail}</li>
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
        © 2026 {bizName}. All rights reserved. Built with love for your storefront.
      </div>
    </footer>
  );
};

export default Footer;
